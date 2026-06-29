#!/usr/bin/env python3
"""
ISSB + CSS practice expansion via Cursor CLI agents (low CPU, quality gates).

Flow per batch:
  1. Generate MCQs (agent -p, nice -n 19)
  2. Local QC (options, keys, explanations, no en-dash, no AI fluff)
  3. Agent verify pass (optional, on by default)
  4. Append to data/expansion/{issb|css}-batch-N.json (staging)
  5. After all batches: npx tsx scripts/expand-mcqs-safe.ts (insert-only, year-safe)

Usage:
  python3 scripts/agent_expansion_pipeline.py test --bank issb_english --topic "Idioms" --count 8
  python3 scripts/agent_expansion_pipeline.py run --plan scripts/pipeline/expansion-round38.json
  python3 scripts/agent_expansion_pipeline.py deploy   # apply staged JSON only

Env:
  AGENT_LOW_CPU=1          nice -n 19 on agent CLI (default on)
  AGENT_SKIP_VERIFY=0      second agent pass (default verify ON)
  AGENT_COOLDOWN_SEC=12    pause between batches
  AGENT_CLAMP_BATCH_SIZE=15 cap per batch when lite mode
"""
from __future__ import annotations

import argparse
import json
import math
import os
import re
import subprocess
import sys
import time
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
EXPANSION = REPO / "data" / "expansion"
LOG_PATH = REPO / "logs" / "agent_expansion_pipeline.log"

ISSB_TABLES = {
    "issb_english",
    "issb_mathematics",
    "issb_general_knowledge",
    "issb_pakistan_affairs",
    "issb_intelligence",
}

ISSB_TYPES = {"practice", "most_important", "most_repeated"}

CURSOR_MODEL = os.environ.get("CURSOR_AGENT_MODEL", "composer-2.5-fast")
AGENT_TIMEOUT_GEN = int(os.environ.get("AGENT_TIMEOUT_GEN", "360"))
AGENT_TIMEOUT_VERIFY = int(os.environ.get("AGENT_TIMEOUT_VERIFY", "200"))
AGENT_SKIP_VERIFY = os.environ.get("AGENT_SKIP_VERIFY", "0") == "1"
AGENT_COOLDOWN_SEC = int(os.environ.get("AGENT_COOLDOWN_SEC", "12"))
AGENT_MIN_YIELD_RATIO = float(os.environ.get("AGENT_MIN_YIELD_RATIO", "0.75"))

_AI_FLUFF = re.compile(
    r"\b(it is worth noting|delve|landscape|leverage|comprehensive|in conclusion|"
    r"it's important to note|crucial to understand|multifaceted)\b",
    re.I,
)
_DASH = re.compile(r"[\u2013\u2014]")
_JSON_OBJ = re.compile(r"\{.*\}", re.DOTALL)


def log(msg: str) -> None:
    line = f"[{time.strftime('%Y-%m-%d %H:%M:%S UTC', time.gmtime())}] {msg}"
    print(line, flush=True)
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with LOG_PATH.open("a", encoding="utf-8") as f:
        f.write(line + "\n")


def clean_text(s: str) -> str:
    s = _DASH.sub(", ", s or "")
    s = re.sub(r"\s+", " ", s).strip()
    return s


def run_agent(prompt: str, timeout: int) -> str:
    cmd = ["agent", "-p", "--trust", "--output-format", "text", "--model", CURSOR_MODEL, prompt]
    if os.environ.get("AGENT_LOW_CPU", "1") == "1":
        cmd = ["nice", "-n", "19", *cmd]
    try:
        p = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout, cwd=str(REPO))
    except subprocess.TimeoutExpired:
        return ""
    return (p.stdout or "") + "\n" + (p.stderr or "")


def parse_mcqs(raw: str) -> list[dict]:
    if not raw.strip():
        return []
    m = _JSON_OBJ.search(raw.strip())
    if m:
        try:
            data = json.loads(m.group(0))
            if isinstance(data, dict) and "mcqs" in data:
                return data["mcqs"]
        except json.JSONDecodeError:
            pass
    out = []
    for line in raw.splitlines():
        line = line.strip()
        if not line.startswith("{"):
            continue
        try:
            obj = json.loads(line)
            if isinstance(obj, dict):
                out.append(obj)
        except json.JSONDecodeError:
            continue
    return out


def clamp_count(n: int) -> int:
    cap = os.environ.get("AGENT_CLAMP_BATCH_SIZE", "").strip()
    if cap.isdigit():
        return max(6, min(n, int(cap)))
    if os.environ.get("AGENT_LITE_MODE", "1") == "1":
        return max(6, min(n, 15))
    return n


def issb_prompt(table: str, topic: str, mcq_type: str, count: int) -> str:
    section = table.replace("issb_", "").replace("_", " ").title()
    return f"""You write ISSB (Pakistan military selection) academic MCQs for {section}.

TOPIC: {topic}
TYPE: {mcq_type}
COUNT: {count}

Rules:
- Pakistani exam context (Army/Navy/PAF officer candidates).
- Each MCQ: question, option_a, option_b, option_c, option_d, correct_answer (A|B|C|D).
- explanation: 1-2 plain sentences. Say why the answer fits. No em dash or en dash. No AI filler.
- topic: short snake_case label matching the skill (e.g. synonyms, ratios, analogies).
- difficulty: easy | medium | hard (mix realistically).
- type: "{mcq_type}"
- table: "{table}"
- Four distinct plausible options. One clearly correct answer.
- Vary question shapes across the batch.

Return ONLY JSON: {{"mcqs":[...]}} with exactly {count} items. No markdown."""


def css_prompt(subject: str, topic: str, count: int) -> str:
    return f"""You write CSS optional-subject PRACTICE MCQs (not past papers).

SUBJECT (exact string): {subject}
TOPIC: {topic}
COUNT: {count}

Rules:
- year must be null in every object (practice only, never a past-paper year).
- Fields: subject, question_text, option_a, option_b, option_c, option_d, correct_answer (A|B|C|D).
- explanation_detailed: 1-3 plain sentences for students. No em dash or en dash. Sound like a teacher, not AI.
- topic, difficulty (Easy|Medium|Hard).
- Accurate facts for Pakistani competitive exams.
- Four distinct options.

Return ONLY JSON: {{"mcqs":[...]}} with exactly {count} items. No markdown."""


def local_qc_issb(mcqs: list[dict], table: str) -> tuple[list[dict], int]:
    good, dropped = [], 0
    seen: set[str] = set()
    for m in mcqs:
        if m.get("table") and m["table"] != table:
            dropped += 1
            continue
        q = clean_text(m.get("question") or "")
        expl = clean_text(m.get("explanation") or "")
        ans = (m.get("correct_answer") or "").strip().upper()[:1]
        opts = [clean_text(m.get(f"option_{c}") or "") for c in "abcd"]
        if len(q.split()) < 5 or ans not in "ABCD":
            dropped += 1
            continue
        if len(set(o.lower() for o in opts)) < 4:
            dropped += 1
            continue
        if not expl or len(expl.split()) < 6 or _AI_FLUFF.search(expl):
            dropped += 1
            continue
        opt_text = opts["ABCD".index(ans)]
        if len(opt_text) < 1:
            dropped += 1
            continue
        diff = (m.get("difficulty") or "medium").lower()
        if diff not in ("easy", "medium", "hard"):
            diff = "medium"
        typ = (m.get("type") or "practice").lower()
        if typ not in ISSB_TYPES:
            typ = "practice"
        topic = clean_text(m.get("topic") or "general")[:60] or "general"
        key = q.lower()[:72]
        if key in seen:
            dropped += 1
            continue
        seen.add(key)
        good.append({
            "table": table,
            "question": q,
            "option_a": opts[0],
            "option_b": opts[1],
            "option_c": opts[2],
            "option_d": opts[3],
            "correct_answer": ans,
            "explanation": expl,
            "topic": topic.replace(" ", "_").lower(),
            "difficulty": diff,
            "type": typ,
        })
    return good, dropped


def local_qc_css(mcqs: list[dict], subject: str) -> tuple[list[dict], int]:
    good, dropped = [], 0
    seen: set[str] = set()
    for m in mcqs:
        q = clean_text(m.get("question_text") or m.get("question") or "")
        expl = clean_text(m.get("explanation_detailed") or m.get("explanation") or "")
        ans = (m.get("correct_answer") or "").strip().upper()[:1]
        opts = [clean_text(m.get(f"option_{c}") or "") for c in "abcd"]
        if len(q.split()) < 5 or ans not in "ABCD":
            dropped += 1
            continue
        if len(set(o.lower() for o in opts)) < 4:
            dropped += 1
            continue
        if not expl or len(expl.split()) < 6 or _AI_FLUFF.search(expl):
            dropped += 1
            continue
        if m.get("year") not in (None, "null", ""):
            dropped += 1
            continue
        diff = (m.get("difficulty") or "Medium").strip().title()
        if diff not in ("Easy", "Medium", "Hard"):
            diff = "Medium"
        key = q.lower()[:72]
        if key in seen:
            dropped += 1
            continue
        seen.add(key)
        good.append({
            "subject": subject,
            "question_text": q,
            "option_a": opts[0],
            "option_b": opts[1],
            "option_c": opts[2],
            "option_d": opts[3],
            "correct_answer": ans,
            "explanation_detailed": expl,
            "topic": clean_text(m.get("topic") or "General")[:80],
            "difficulty": diff,
            "year": None,
        })
    return good, dropped


def verify_agent(bank: str, topic: str, mcqs: list[dict]) -> list[dict]:
    if not mcqs:
        return []
    lines = [
        f"Verify MCQs for {bank}, topic={topic}.",
        'Output JSON array: [{"idx":0,"verdict":"accept|reject"}]',
        "REJECT wrong key, ambiguous stem, fake facts, lazy distractors, AI-sounding explanation.",
        "ACCEPT only clear exam-useful items.",
        "",
    ]
    for i, m in enumerate(mcqs):
        q = (m.get("question") or m.get("question_text") or "")[:180]
        k = (m.get("correct_answer") or "?")[:1]
        lines.append(f"{i}) {q} Key:{k}")
    raw = run_agent("\n".join(lines), AGENT_TIMEOUT_VERIFY)
    m = re.search(r"\[.*\]", raw, re.DOTALL)
    if not m:
        log(f"  verify: no JSON for {bank}|{topic[:30]} -> drop batch")
        return []
    try:
        verdicts = json.loads(m.group(0))
    except json.JSONDecodeError:
        return []
    ok = set()
    for v in verdicts:
        if isinstance(v, dict) and v.get("verdict") == "accept":
            idx = v.get("idx")
            if isinstance(idx, int) and 0 <= idx < len(mcqs):
                ok.add(idx)
    return [mcqs[i] for i in sorted(ok)]


def next_staging_file(prefix: str) -> Path:
    nums = []
    for p in EXPANSION.glob(f"{prefix}-batch-*.json"):
        m = re.search(r"batch-(\d+)\.json$", p.name)
        if m:
            nums.append(int(m.group(1)))
    n = (max(nums) if nums else 1) + 1
    return EXPANSION / f"{prefix}-batch-{n}.json"


def load_manifest_applied() -> set[str]:
    mf = EXPANSION / ".applied-manifest.json"
    if not mf.exists():
        return set()
    try:
        return set(json.loads(mf.read_text()).get("applied", []))
    except (json.JSONDecodeError, OSError):
        return set()


def process_batch(batch: dict, *, dry_run: bool = False) -> dict:
    mode = batch.get("mode", "issb")
    count = clamp_count(int(batch.get("count", 12)))
    topic = batch["topic"]
    stats = {"topic": topic, "generated": 0, "qc": 0, "verified": 0, "written": 0}

    if mode == "issb":
        table = batch["table"]
        mcq_type = batch.get("type", "practice")
        prompt = issb_prompt(table, topic, mcq_type, count + 4)
        label = f"ISSB {table}|{topic[:35]}"
    else:
        subject = batch["subject"]
        prompt = css_prompt(subject, topic, count + 4)
        label = f"CSS {subject}|{topic[:35]}"
        table = subject

    for attempt in range(1, 4):
        raw = run_agent(prompt, AGENT_TIMEOUT_GEN)
        raw_mcqs = parse_mcqs(raw)
        if raw_mcqs:
            break
        log(f"  {label}: gen retry {attempt}/3")
        time.sleep(3 * attempt)
    else:
        raw_mcqs = []
    stats["generated"] = len(raw_mcqs)
    if not raw_mcqs:
        log(f"  {label}: gen failed (empty)")
        return stats

    if mode == "issb":
        good, dropped = local_qc_issb(raw_mcqs, batch["table"])
    else:
        good, dropped = local_qc_css(raw_mcqs, batch["subject"])
    log(f"  {label}: gen={len(raw_mcqs)} local_qc={len(good)} dropped={dropped}")

    if not good:
        return stats
    stats["qc"] = len(good)

    if AGENT_SKIP_VERIFY:
        verified = good
    else:
        verified = verify_agent(table, topic, good)
        log(f"  {label}: verify -> {len(verified)}/{len(good)}")
    min_ok = max(4, int(math.ceil(count * AGENT_MIN_YIELD_RATIO)))
    verified = verified[: count + 2]
    if len(verified) < min_ok:
        log(f"  {label}: below yield {len(verified)}<{min_ok}, skip write")
        return stats
    stats["verified"] = len(verified)

    if dry_run:
        for m in verified[:2]:
            q = m.get("question") or m.get("question_text", "")
            log(f"    sample: {q[:70]}...")
        return stats

    prefix = "issb" if mode == "issb" else "css-practice"
    out = next_staging_file(prefix)
    while out.name in load_manifest_applied():
        n = int(re.search(r"(\d+)", out.stem).group(1)) + 1
        out = EXPANSION / f"{prefix}-batch-{n}.json"

    out.write_text(json.dumps(verified[:count], indent=2) + "\n", encoding="utf-8")
    stats["written"] = len(verified[:count])
    stats["file"] = out.name
    log(f"  {label}: staged {stats['written']} -> {out.name}")
    return stats


def deploy_staged() -> None:
    log("== DEPLOY expand-mcqs-safe.ts ==")
    env = os.environ.copy()
    dotenv = REPO / ".env.local"
    if dotenv.exists():
        for line in dotenv.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                env.setdefault(k.strip(), v.strip().strip('"').strip("'"))
    subprocess.run(["python3", "scripts/validate-expansion-batch.py"], cwd=str(REPO), check=True)
    subprocess.run(["npx", "tsx", "scripts/expand-mcqs-safe.ts"], cwd=str(REPO), env=env, check=False)


def cmd_run(args: argparse.Namespace) -> None:
    plan = json.loads(Path(args.plan).read_text(encoding="utf-8"))
    batches = plan if isinstance(plan, list) else plan.get("batches", [])
    log(f"== EXPANSION RUN batches={len(batches)} verify={not AGENT_SKIP_VERIFY} "
        f"cooldown={AGENT_COOLDOWN_SEC}s lite={os.environ.get('AGENT_LITE_MODE','1')} ==")
    total_written = 0
    for i, b in enumerate(batches, 1):
        try:
            st = process_batch(b, dry_run=args.dry_run)
            total_written += st.get("written", 0)
        except Exception as e:
            log(f"  BATCH FAIL: {e}")
        if AGENT_COOLDOWN_SEC > 0 and i < len(batches):
            time.sleep(AGENT_COOLDOWN_SEC)
    log(f"== STAGED {total_written} MCQs ==")
    if total_written and not args.dry_run and not args.no_deploy:
        deploy_staged()


def cmd_test(args: argparse.Namespace) -> None:
    batch = {
        "mode": args.mode,
        "topic": args.topic,
        "count": args.count,
    }
    if args.mode == "issb":
        batch["table"] = args.table
        batch["type"] = args.type
    else:
        batch["subject"] = args.subject
    process_batch(batch, dry_run=True)


def main() -> None:
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)

    t = sub.add_parser("test")
    t.add_argument("--mode", choices=["issb", "css"], default="issb")
    t.add_argument("--table", default="issb_english")
    t.add_argument("--subject", default="Philosophy")
    t.add_argument("--topic", required=True)
    t.add_argument("--type", default="practice")
    t.add_argument("--count", type=int, default=8)
    t.set_defaults(func=cmd_test)

    r = sub.add_parser("run")
    r.add_argument("--plan", required=True)
    r.add_argument("--dry-run", action="store_true")
    r.add_argument("--no-deploy", action="store_true")
    r.set_defaults(func=cmd_run)

    d = sub.add_parser("deploy")
    d.set_defaults(func=lambda a: deploy_staged())

    args = ap.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
