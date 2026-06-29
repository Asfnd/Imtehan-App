#!/usr/bin/env python3
"""
MCQ generation via Cursor CLI agents (no Anthropic API).

Same workflow Claude used with direct_mcq_insert, but:
  1. Generate  → Cursor `agent -p --model composer-2-fast`
  2. Quality   → local filters + optional agent verify pass
  3. Upload    → Supabase (verified rows only)

  python scripts/agent_mcq_pipeline.py test --table english --topic "Parts of speech" --count 10
  python scripts/agent_mcq_pipeline.py run --plan scripts/pipeline/round17.json --workers 4
  python scripts/agent_mcq_pipeline.py run --plan scripts/pipeline/round17.json --workers 6 --skip-verify
  python scripts/agent_mcq_pipeline.py count-check

Light mode (small batches + extra metrics + QC pulse each topic): `./scripts/run_light_quality_round.sh`

Logs: logs/agent_mcq_pipeline.log
"""
from __future__ import annotations

import argparse
import json
import math
import os
import re
import subprocess
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from collections import Counter
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO))

try:
    from dotenv import load_dotenv
    load_dotenv(REPO / ".env.local")
except ImportError:
    pass

# Reuse battle-tested prompts + filters from direct insert script
from scripts.direct_mcq_insert import (  # noqa: E402
    TABLES,
    MCQ_TYPES,
    TARGET_EXAMS,
    build_prompt,
    quality_filter,
    get_supabase,
    make_distribution,
    make_difficulty_distribution,
)
from scripts.mcq_student_standard import STUDENT_RECALL_STYLE, SKIP_EXPLANATIONS  # noqa: E402

CURSOR_MODEL = os.environ.get("CURSOR_AGENT_MODEL", "composer-2.5-fast")
AGENT_TIMEOUT_GEN = int(os.environ.get("AGENT_TIMEOUT_GEN", "420"))
AGENT_TIMEOUT_VERIFY = int(os.environ.get("AGENT_TIMEOUT_VERIFY", "240"))
DEFAULT_COUNT = int(os.environ.get("AGENT_MCQ_PER_TOPIC", "30"))
AGENT_COOLDOWN_SEC = int(os.environ.get("AGENT_COOLDOWN_SEC", "15"))
# Quality-first: always verify unless explicitly disabled
AGENT_SKIP_VERIFY = os.environ.get("AGENT_SKIP_VERIFY", "0") == "1"
# Target at least 80% of batch size after verify (e.g. 40/50); top-up gen if below
AGENT_MIN_YIELD_RATIO = float(os.environ.get("AGENT_MIN_YIELD_RATIO", "0.80"))
AGENT_TOPUP_MAX = int(os.environ.get("AGENT_TOPUP_MAX", "3"))
# If verifier omits JSON, accept QC-only rows (legacy; disables strict QA)
VERIFY_FAIL_OPEN = os.environ.get("AGENT_VERIFY_FAIL_OPEN", "0") == "1"


def effective_plan_count(plan_count: int) -> int:
    """Cap plan batch size via AGENT_CLAMP_BATCH_SIZE or AGENT_LITE_MODE=1 (default cap 18 when lite)."""
    cap_raw = os.environ.get("AGENT_CLAMP_BATCH_SIZE", "").strip()
    if cap_raw.isdigit():
        cap = int(cap_raw)
    elif os.environ.get("AGENT_LITE_MODE", "0") == "1":
        cap = 18
    else:
        return plan_count
    return max(8, min(plan_count, cap))


def log_batch_quality_metrics(label: str, mcqs: list[dict]) -> None:
    """Lightweight batch-level checks pre-insert (see AGENT_BATCH_METRICS)."""
    if os.environ.get("AGENT_BATCH_METRICS", "0") != "1" or not mcqs:
        return
    heads = [(m.get("question") or "")[:72].strip().lower() for m in mcqs]
    uniq_heads = len(set(heads))
    key_counts = Counter(
        ((m.get("correct_answer") or "?").strip().upper()[:1] or "?") for m in mcqs
    )
    letters = {x: key_counts[x] for x in "ABCD" if key_counts[x]}
    peak = max(letters.values()) if letters else 0
    denom = sum(letters.values())
    peak_pct = round(100 * peak / denom, 1) if denom else 0.0
    poor_opts = sum(
        1
        for m in mcqs
        if len(
            {
                (m.get("option_a") or "").strip().lower(),
                (m.get("option_b") or "").strip().lower(),
                (m.get("option_c") or "").strip().lower(),
                (m.get("option_d") or "").strip().lower(),
            }
        )
        < 4
    )
    log(
        f"  METRICS [{label}] n={len(mcqs)} uniq_stem_heads={uniq_heads}/{len(mcqs)} "
        f"A/B/C/D={dict(key_counts)} key_peak_pct={peak_pct}% poor_opts={poor_opts}"
    )
    if denom >= 12 and peak_pct >= 45:
        log(
            f"  METRICS WARN [{label}] answer-key skew (>{peak_pct}% one letter) — "
            "regenerate or tighten prompt distribution if this repeats."
        )


# Extra tail merged in build_prompt via STUDENT_RECALL_RULES — keep empty to avoid duplicate/conflicting rules.
PROMPT_TAIL = ""
LOG_PATH = REPO / "logs" / "agent_mcq_pipeline.log"
STATE_DIR = REPO / "logs" / "agent_rounds"

_print_lock = threading.Lock()


def log(msg: str) -> None:
    line = f"[{time.strftime('%Y-%m-%d %H:%M:%S UTC', time.gmtime())}] {msg}"
    with _print_lock:
        print(line, flush=True)
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with LOG_PATH.open("a", encoding="utf-8") as f:
        f.write(line + "\n")


def run_agent(prompt: str, timeout: int) -> str:
    agent_cmd = ["agent", "-p", "--trust", "--output-format", "text", "--model", CURSOR_MODEL, prompt]
    if os.environ.get("AGENT_LOW_CPU", "1") == "1":
        agent_cmd = ["nice", "-n", "19", *agent_cmd]
    try:
        p = subprocess.run(
            agent_cmd,
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=str(REPO),
        )
    except subprocess.TimeoutExpired:
        return ""
    return (p.stdout or "") + "\n" + (p.stderr or "")


_JSON_RE = re.compile(r"\{.*\}", re.DOTALL)


def parse_mcqs(raw: str) -> list[dict]:
    if not raw.strip():
        return []
    text = raw.strip()
    m = _JSON_RE.search(text)
    if m:
        try:
            data = json.loads(m.group(0))
            if isinstance(data, dict) and "mcqs" in data:
                return data["mcqs"]
        except json.JSONDecodeError:
            pass
    out = []
    for line in text.splitlines():
        line = line.strip()
        if not line.startswith("{"):
            continue
        try:
            obj = json.loads(line)
            if "question" in obj and "option_a" in obj:
                out.append(obj)
        except json.JSONDecodeError:
            continue
    return out


def generate_mcqs(table: str, topic: str, mcq_type: str, count: int) -> list[dict]:
    distribution = make_distribution(count, mcq_type)
    diff_dist = make_difficulty_distribution(count, mcq_type)
    prompt = build_prompt(table, topic, mcq_type, count, distribution, diff_dist)
    prompt += PROMPT_TAIL
    prompt += (
        f"\n\nOUTPUT: Return ONLY JSON {{\"mcqs\":[...]}} with exactly {count} items. "
        "No markdown fences."
    )
    for attempt in range(1, 4):
        raw = run_agent(prompt, AGENT_TIMEOUT_GEN)
        mcqs = parse_mcqs(raw)
        if mcqs:
            return mcqs
        log(f"  retry gen {attempt}/3 (empty/parse fail) {table}/{topic[:30]}")
        time.sleep(3 * attempt)
    return []


def verify_mcqs_agent(table: str, topic: str, mcqs: list[dict]) -> list[dict]:
    """Second agent pass: drop wrong/reject stems before DB insert."""
    if not mcqs:
        return []
    lines = [
        f"You verify MCQs for table={table}, topic={topic}.",
        "Output ONLY a JSON array, one object per MCQ index:",
        '[{"idx":0,"verdict":"accept|reject","actual_answer":"A|B|C|D","reason":"≤8 words"}]',
        "ACCEPT if: fact is exam-relevant, stem is clear, exactly one defensible answer, "
        "options are plausible (real dates/names/laws), helps a Pakistani student memorize or apply for CSS PPSC FPSC NTS.",
        "Each wrong option must be something a serious student might plausibly pick — reject lazy distractors.",
        "REJECT if: wrong answer key, ambiguous stem, nonsense option, pure fluff or generic filler stems, "
        "trick 'which is incorrect', off-topic vs topic/table, fabricated institution/fact.",
        "REJECT cliché tautology stems that add no discriminative recall value.",
        "Do NOT reject solely for length or formal exam phrasing if still clear and useful.",
        "",
    ]
    for i, m in enumerate(mcqs):
        k = (m.get("correct_answer") or "?").strip().upper()[:1]
        lines.append(
            f"{i}) Q:{m.get('question','')[:200]} "
            f"A){m.get('option_a','')[:60]} B){m.get('option_b','')[:60]} "
            f"C){m.get('option_c','')[:60]} D){m.get('option_d','')[:60]} Key:{k}"
        )
    raw = run_agent("\n".join(lines), AGENT_TIMEOUT_VERIFY)
    m = re.search(r"\[.*\]", raw, re.DOTALL)
    if not m:
        if VERIFY_FAIL_OPEN:
            log(f"  VERIFY: no verdict JSON ({table}|{topic[:30]}) → fail-open, keep QC batch")
            return mcqs
        log(f"  VERIFY: no verdict JSON ({table}|{topic[:30]}) → drop QC batch")
        return []
    try:
        verdicts = json.loads(m.group(0))
    except json.JSONDecodeError:
        if VERIFY_FAIL_OPEN:
            log(f"  VERIFY: invalid verdict JSON ({table}|{topic[:30]}) → fail-open")
            return mcqs
        log(f"  VERIFY: invalid verdict JSON ({table}|{topic[:30]}) → drop QC batch")
        return []
    accept_idx = set()
    for v in verdicts:
        if not isinstance(v, dict):
            continue
        idx = v.get("idx")
        if v.get("verdict") == "accept" and isinstance(idx, int) and 0 <= idx < len(mcqs):
            accept_idx.add(idx)
    if not accept_idx:
        return []
    return [mcqs[i] for i in sorted(accept_idx)]


def to_db_rows(mcqs: list[dict], table: str, mcq_type: str, topic: str) -> list[dict]:
    rows = []
    for m in mcqs:
        ans = (m.get("correct_answer") or "").strip().upper()
        if ans not in ("A", "B", "C", "D"):
            continue
        rows.append({
            "question": m["question"].strip(),
            "option_a": m["option_a"].strip(),
            "option_b": m["option_b"].strip(),
            "option_c": m["option_c"].strip(),
            "option_d": m["option_d"].strip(),
            "correct_answer": ans,
            "explanation": None,
            "type": mcq_type,
            "difficulty": (m.get("difficulty") or "medium").lower(),
            "tags": (m.get("tags") or ["general"])[:5],
            "source_topic": (m.get("subtopic") or topic).strip()[:200],
            "verification_status": "verified",
            "verifier_model": f"cursor-{CURSOR_MODEL}-{STUDENT_RECALL_STYLE}",
            "time_sensitive": mcq_type == "current_affairs" or table == "current_affairs",
            "target_exams": TARGET_EXAMS,
        })
    return rows


def insert_rows(table: str, rows: list[dict]) -> int:
    if not rows:
        return 0
    sb = get_supabase()
    inserted = 0
    try:
        result = sb.table(table).insert(rows).execute()
        inserted = len(result.data) if result.data else len(rows)
    except Exception as e:
        err = str(e).lower()
        if "duplicate" in err or "unique" in err or "conflict" in err:
            for row in rows:
                try:
                    sb.table(table).insert(row).execute()
                    inserted += 1
                except Exception:
                    pass
        else:
            log(f"  INSERT ERROR: {e}")
    return inserted


def batch_artifact_path(table: str, topic: str, mcq_type: str) -> Path:
    slug = re.sub(r"[^a-z0-9]+", "_", topic.lower())[:40]
    return STATE_DIR / f"{table}_{slug}_{mcq_type}_{STUDENT_RECALL_STYLE}.json"


def batch_already_done(table: str, topic: str, mcq_type: str, count: int) -> bool:
    art = batch_artifact_path(table, topic, mcq_type)
    if not art.exists():
        return False
    try:
        data = json.loads(art.read_text(encoding="utf-8"))
        min_ok = max(10, int(count * AGENT_MIN_YIELD_RATIO))
        return int(data.get("inserted") or 0) >= min_ok
    except (json.JSONDecodeError, TypeError, ValueError):
        return False


def _answer_matches_option(m: dict) -> bool:
    ans = (m.get("correct_answer") or "").strip().upper()
    if ans not in ("A", "B", "C", "D"):
        return False
    text = (m.get(f"option_{ans.lower()}") or "").strip()
    return len(text) >= 2


def _final_quality_gate(mcqs: list[dict]) -> list[dict]:
    """Last local check before DB — key must match a real option."""
    return [m for m in mcqs if _answer_matches_option(m)]


def _dedupe_mcqs(mcqs: list[dict]) -> list[dict]:
    seen: set[str] = set()
    out: list[dict] = []
    for m in mcqs:
        key = (m.get("question") or "").strip().lower()[:80]
        if not key or key in seen:
            continue
        seen.add(key)
        out.append(m)
    return out


def log_stem_qc(label: str, mcqs: list[dict]) -> None:
    if not mcqs:
        return
    stems = [len((m.get("question") or "").split()) for m in mcqs]
    log(f"  {label}: stem words avg={sum(stems)/len(stems):.1f}")


def process_batch(
    table: str,
    topic: str,
    mcq_type: str,
    count: int,
    *,
    dry_run: bool = False,
    skip_verify: bool = False,
    resume: bool = False,
) -> dict:
    label = f"{table}|{topic[:40]}|{mcq_type}"
    stats = {"label": label, "generated": 0, "after_qc": 0, "after_verify": 0, "inserted": 0, "skipped": False}

    if resume and batch_already_done(table, topic, mcq_type, count):
        stats["skipped"] = True
        log(f"  {label}: SKIP (resume — already inserted)")
        return stats

    min_target = min(count, max(8, int(math.ceil(count * AGENT_MIN_YIELD_RATIO))))
    verified: list[dict] = []
    total_generated = 0

    for pass_n in range(1 + AGENT_TOPUP_MAX):
        need = count if pass_n == 1 else max(0, min_target - len(verified))
        if need <= 0:
            break
        gen_count = max(need + 8, min(count + 10, need + 15)) if pass_n > 1 else count + 5
        raw = generate_mcqs(table, topic, mcq_type, gen_count)
        total_generated += len(raw)
        good, dropped = quality_filter(raw, topic=topic, table=table, mcq_type=mcq_type)
        log(f"  {label}: pass={pass_n} gen={len(raw)} qc={len(good)} (dropped {dropped})")
        log_stem_qc(label, good)
        if not good:
            continue
        if pass_n == 1 and good:
            tags_ok = sum(1 for m in good if len(m.get("tags") or []) >= 2)
            log(f"  {label}: tags_ok={tags_ok}/{len(good)} expl={'off' if SKIP_EXPLANATIONS else 'on'}")

        if skip_verify or AGENT_SKIP_VERIFY:
            batch_verified = good
        else:
            batch_verified = verify_mcqs_agent(table, topic, good)
            log(f"  {label}: agent-verify pass={pass_n} → {len(batch_verified)}/{len(good)}")

        verified = _final_quality_gate(_dedupe_mcqs(verified + batch_verified))[: count + 5]
        if len(verified) >= min_target:
            break
        if pass_n < AGENT_TOPUP_MAX:
            log(f"  {label}: top-up (have {len(verified)}, need {min_target})")
            time.sleep(2)

    stats["generated"] = total_generated
    stats["after_qc"] = len(verified)
    stats["after_verify"] = len(verified)

    if not verified:
        return stats

    if not dry_run and not (skip_verify or AGENT_SKIP_VERIFY):
        log(f"  {label}: pre-insert QC+verify OK → {len(verified)} items (target {min_target})")

    if dry_run:
        for m in verified[:2]:
            log(f"    Q: {m.get('question','')[:70]}…")
        return stats

    log_batch_quality_metrics(label, verified[:count])

    rows = to_db_rows(verified[:count], table, mcq_type, topic)
    stats["inserted"] = insert_rows(table, rows)
    log(f"  {label}: inserted {stats['inserted']}/{len(rows)}")

    STATE_DIR.mkdir(parents=True, exist_ok=True)
    art = batch_artifact_path(table, topic, mcq_type)
    art.write_text(
        json.dumps({"topic": topic, "mcqs": verified, "inserted": stats["inserted"]}, indent=2),
        encoding="utf-8",
    )

    return stats


def cmd_test(args: argparse.Namespace) -> None:
    log(f"== TEST model={CURSOR_MODEL} ==")
    process_batch(
        args.table, args.topic, args.type, args.count,
        dry_run=True, skip_verify=args.skip_verify,
    )


def cmd_run(args: argparse.Namespace) -> None:
    plan_path = Path(args.plan)
    if not plan_path.exists():
        print(f"Missing plan: {plan_path}")
        sys.exit(1)
    plan = json.loads(plan_path.read_text())
    batches = plan if isinstance(plan, list) else plan.get("batches", [])
    cap = int(os.environ.get("AGENT_MAX_WORKERS", "1"))
    workers = max(1, min(args.workers, cap, 12))
    sequential = workers == 1 or os.environ.get("AGENT_SEQUENTIAL", "1") == "1"
    clamp_h = (
        effective_plan_count(int(batches[0].get("count", DEFAULT_COUNT)))
        != int(batches[0].get("count", DEFAULT_COUNT))
        if batches
        else False
    )
    log(f"== RUN plan={plan_path.name} batches={len(batches)} workers={workers} "
        f"sequential={sequential} skip_verify={AGENT_SKIP_VERIFY} cooldown={AGENT_COOLDOWN_SEC}s "
        f"model={CURSOR_MODEL} qc_pulse_every={int(os.environ.get('AGENT_QC_PULSE_EVERY', '10'))} "
        f"metrics={os.environ.get('AGENT_BATCH_METRICS','0')} "
        f"lite={os.environ.get('AGENT_LITE_MODE','0')} clamp_bs={os.environ.get('AGENT_CLAMP_BATCH_SIZE','')} "
        f"sample_clamped={clamp_h} ==")

    total_inserted = 0
    done = 0
    qc_every = int(os.environ.get("AGENT_QC_PULSE_EVERY", "10"))

    def run_one(b: dict) -> dict:
        raw_c = int(b.get("count", DEFAULT_COUNT))
        eff_c = effective_plan_count(raw_c)
        if eff_c != raw_c:
            log(f"  plan count clamp: {raw_c} → {eff_c}")
        return process_batch(
            b["table"],
            b["topic"],
            b.get("type", "most_repeated"),
            eff_c,
            dry_run=False,
            skip_verify=args.skip_verify,
            resume=args.resume,
        )

    if sequential:
        for b in batches:
            try:
                st = run_one(b)
                total_inserted += st.get("inserted", 0)
                done += 1
                if done % qc_every == 0:
                    log(f"== QC pulse {done}/{len(batches)} | +{total_inserted} ==")
                    cmd_count_check(args)
            except Exception as e:
                log(f"  BATCH FAIL {b.get('table')}/{b.get('topic','')[:30]}: {e}")
            if AGENT_COOLDOWN_SEC > 0:
                time.sleep(AGENT_COOLDOWN_SEC)
    else:
        with ThreadPoolExecutor(max_workers=workers) as ex:
            futs = {ex.submit(run_one, b): b for b in batches}
            for fut in as_completed(futs):
                batch = futs[fut]
                try:
                    st = fut.result()
                    total_inserted += st.get("inserted", 0)
                    done += 1
                    if done % qc_every == 0:
                        log(f"== QC pulse {done}/{len(batches)} | +{total_inserted} ==")
                        cmd_count_check(args)
                except Exception as e:
                    log(f"  BATCH FAIL {batch.get('table')}/{batch.get('topic','')[:30]}: {e}")

    log(f"== DONE inserted {total_inserted} MCQs ({done} batches) ==")
    cmd_count_check(args)


def build_plan_from_syllabus(
    mcq_type: str = "practice",
    per_topic: int = 35,
    tables: list[str] | None = None,
) -> list[dict]:
    path = REPO / "data" / "syllabus" / "exam_syllabus_map.json"
    data = json.loads(path.read_text())
    topics_map = data.get("topics_by_db_table", {})
    use_tables = tables or TABLES
    plan = []
    for table in use_tables:
        for topic in topics_map.get(table, []):
            # strip parenthetical hints for cleaner topic label
            clean = re.sub(r"\s*\([^)]*\)\s*", " ", topic).strip()
            clean = re.sub(r"\s+", " ", clean)
            plan.append({
                "table": table,
                "topic": clean,
                "type": mcq_type,
                "count": per_topic,
            })
    return plan


def cmd_build_plan(args: argparse.Namespace) -> None:
    plan = build_plan_from_syllabus(
        mcq_type=args.type,
        per_topic=args.per_topic,
        tables=[args.table] if args.table else None,
    )
    out = Path(args.output)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(plan, indent=2), encoding="utf-8")
    est = sum(b["count"] for b in plan)
    log(f"Wrote {len(plan)} batches ({est:,} MCQs est.) → {out}")


def cmd_count_check(_args: argparse.Namespace) -> None:
    sb = get_supabase()
    log("\nVerified counts:")
    grand = 0
    for table in TABLES:
        n = sb.table(table).select("id", count="exact").eq("verification_status", "verified").limit(1).execute().count or 0
        grand += n
        log(f"  {table:<22} {n:>7,}")
    log(f"  {'TOTAL':<22} {grand:>7,}")


def main() -> None:
    ap = argparse.ArgumentParser(description="Cursor-agent MCQ generate → verify → Supabase")
    sub = ap.add_subparsers(dest="cmd", required=True)

    t = sub.add_parser("test")
    t.add_argument("--table", required=True, choices=TABLES)
    t.add_argument("--topic", required=True)
    t.add_argument("--count", type=int, default=10)
    t.add_argument("--type", choices=MCQ_TYPES, default="most_important")
    t.add_argument("--skip-verify", action="store_true")
    t.set_defaults(func=cmd_test)

    r = sub.add_parser("run")
    r.add_argument("--plan", required=True)
    r.add_argument("--workers", type=int, default=4)
    r.add_argument("--skip-verify", action="store_true", help="Faster: QC only, no 2nd agent pass")
    r.add_argument("--resume", action="store_true", help="Skip topics already inserted this round")
    r.set_defaults(func=cmd_run)

    bp = sub.add_parser("build-plan", help="Build round JSON from syllabus map")
    bp.add_argument("--output", default="scripts/pipeline/round18_practice.json")
    bp.add_argument("--type", choices=MCQ_TYPES, default="practice")
    bp.add_argument("--per-topic", type=int, default=DEFAULT_COUNT)
    bp.add_argument("--table", choices=TABLES, help="Single table only")
    bp.set_defaults(func=cmd_build_plan)

    c = sub.add_parser("count-check")
    c.set_defaults(func=cmd_count_check)

    q = sub.add_parser("audit", help="Run quality_audit on recent composer inserts")
    q.set_defaults(func=lambda a: __import__("subprocess").run(
        [sys.executable, str(REPO / "scripts/pipeline/quality_audit.py")], check=False))

    d = sub.add_parser("demo", help="Full-column demo (all 11 subjects, no explanations)")
    d.add_argument("--insert-test", action="store_true")
    d.set_defaults(func=lambda a: __import__("subprocess").run(
        [
            sys.executable,
            str(REPO / "scripts/demo_full_columns.py"),
            *(["--insert-test"] if a.insert_test else []),
        ],
        check=False,
    ))

    args = ap.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
