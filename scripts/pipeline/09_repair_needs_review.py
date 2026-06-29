"""Repair all needs_review MCQs: audit replay + fast Cursor/OpenRouter verify.

Phase 1 — Replay latest valid mcq_verification rows (no API).
Phase 2 — Batched verify via Cursor agent (default: composer-2-fast) or Gemini CLI.

  python -m scripts.pipeline.09_repair_needs_review
  python -m scripts.pipeline.09_repair_needs_review --engine cursor --batch 12
  python -m scripts.pipeline.09_repair_needs_review --audit-only

Logs: logs/repair_review.log
"""
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

import importlib

from scripts.pipeline.db import pg_query, sb

vh = importlib.import_module("scripts.pipeline.11_verify_helper")
write_decisions = vh.write_decisions
VALID_VERDICTS = vh.VALID_VERDICTS
BANKS = list(vh.BANKS)

CURSOR_MODEL = os.environ.get("CURSOR_REPAIR_MODEL", "composer-2-fast")
VERIFY_CONF = 0.78
FIX_CONF = 0.80
VERIFY_CONF_RELAXED = 0.70
FIX_CONF_RELAXED = 0.72
TEXT_CAP = 220
LOG_PATH = ROOT / "logs" / "repair_review.log"


def _clip(s: str | None) -> str:
    s = (s or "").strip().replace("\n", " ")
    return (s[: TEXT_CAP - 3] + "...") if len(s) > TEXT_CAP else (s or "?")


def log(msg: str) -> None:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts} UTC] {msg}"
    print(line, flush=True)
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(line + "\n")


def fetch_needs_review(bank: str) -> list[dict]:
    rows: list[dict] = []
    offset = 0
    while True:
        r = (
            sb.table(bank)
            .select("id, question, option_a, option_b, option_c, option_d, correct_answer")
            .eq("verification_status", "needs_review")
            .order("id")
            .range(offset, offset + 999)
            .execute()
        )
        chunk = r.data or []
        if not chunk:
            break
        rows.extend(chunk)
        offset += len(chunk)
        if len(chunk) < 1000:
            break
    return rows


def latest_verification(bank: str, mcq_id: int) -> dict | None:
    r = (
        sb.table("mcq_verification")
        .select("verdict, actual_answer, confidence, reason, model")
        .eq("source_table", bank)
        .eq("mcq_id", mcq_id)
        .order("verified_at", desc=True)
        .limit(5)
        .execute()
    )
    for row in r.data or []:
        v = (row.get("verdict") or "").lower().strip()
        if v not in VALID_VERDICTS:
            continue
        reason = (row.get("reason") or "")
        if v == "error" or "openrouter" in reason.lower():
            continue
        try:
            conf = float(row["confidence"]) if row.get("confidence") is not None else 0.0
        except (TypeError, ValueError):
            conf = 0.0
        aa = (row.get("actual_answer") or "").strip().upper()[:1]
        if aa and aa not in "ABCD":
            aa = None
        return {
            "bank": bank,
            "mcq_id": mcq_id,
            "verdict": v,
            "actual_answer": aa,
            "confidence": conf,
            "reason": f"audit-replay: {reason[:200]}",
            "time_sensitive": False,
        }
    return None


def phase_audit_replay(bank: str, *, verify_conf: float, fix_conf: float, label: str) -> dict:
    """Bulk-replay latest valid verifier rows for needs_review MCQs in this bank."""
    sql = f"""
    WITH rev AS (
      SELECT id, UPPER(LEFT(correct_answer, 1)) AS stored
      FROM {bank}
      WHERE verification_status = 'needs_review'
    ),
    latest AS (
      SELECT DISTINCT ON (mcq_id)
        mcq_id, verdict, actual_answer, confidence, reason
      FROM mcq_verification
      WHERE source_table = '{bank}'
        AND verdict IN ('correct','wrong','outdated','ambiguous','none_of_options')
        AND (reason IS NULL OR reason NOT ILIKE '%OpenRouter%')
      ORDER BY mcq_id, verified_at DESC
    )
    SELECT
      l.mcq_id,
      l.verdict,
      l.actual_answer,
      l.confidence,
      l.reason,
      r.stored
    FROM latest l
    JOIN rev r ON r.id = l.mcq_id
    WHERE
      (l.verdict = 'correct' AND l.confidence >= {verify_conf})
      OR (l.verdict IN ('outdated','none_of_options') AND l.confidence >= {verify_conf})
      OR (
        l.verdict = 'wrong' AND l.confidence >= {fix_conf}
        AND l.actual_answer IN ('A','B','C','D')
        AND l.actual_answer <> r.stored
      )
      OR (
        l.verdict = 'ambiguous' AND l.confidence >= {verify_conf}
        AND l.actual_answer IN ('A','B','C','D')
        AND l.actual_answer = r.stored
      );
    """
    try:
        hits = pg_query(sql)
    except Exception as e:
        log(f"[audit] {bank}: SQL skip ({e!r}) — falling back to row-wise")
        hits = []
        for row in fetch_needs_review(bank):
            d = latest_verification(bank, int(row["id"]))
            if d:
                hits.append({
                    "mcq_id": d["mcq_id"],
                    "verdict": d["verdict"],
                    "actual_answer": d.get("actual_answer"),
                    "confidence": d["confidence"],
                    "reason": d["reason"],
                    "stored": (row.get("correct_answer") or "").strip().upper()[:1],
                })

    decisions = []
    for h in hits:
        try:
            conf = float(h["confidence"])
        except (TypeError, ValueError):
            continue
        aa = (h.get("actual_answer") or "").strip().upper()[:1]
        if aa and aa not in "ABCD":
            aa = None
        verdict = h["verdict"]
        stored = (h.get("stored") or "").strip().upper()[:1]
        if verdict == "ambiguous" and aa in "ABCD" and aa == stored:
            verdict = "correct"
        decisions.append({
            "bank": bank,
            "mcq_id": int(h["mcq_id"]),
            "verdict": verdict,
            "actual_answer": aa,
            "confidence": conf,
            "reason": f"audit-replay: {(h.get('reason') or '')[:200]}",
            "time_sensitive": False,
        })

    if not decisions:
        return {"bank": bank, "audited": 0, "verified": 0, "auto_fixed": 0, "quarantined": 0, "needs_review": 0}
    s = write_decisions(
        decisions,
        high_conf=verify_conf,
        fix_conf=fix_conf,
        model_name=f"audit-replay-{label}",
        tier=2,
    )
    s["bank"] = bank
    log(f"[audit:{label}] {bank}: replayed {len(decisions)} → {s}")
    return s


def phase_audit_all(bank: str) -> dict:
    a = phase_audit_replay(bank, verify_conf=VERIFY_CONF, fix_conf=FIX_CONF, label="strict")
    b = phase_audit_replay(bank, verify_conf=VERIFY_CONF_RELAXED, fix_conf=FIX_CONF_RELAXED, label="relaxed")
    out = {"bank": bank}
    for k in ("audited", "verified", "quarantined", "auto_fixed", "needs_review"):
        out[k] = a.get(k, 0) + b.get(k, 0)
    return out


def build_gemini_prompt(bank: str, chunk: list[dict]) -> str:
    payload = []
    for r in chunk:
        payload.append({
            "mcq_id": r["id"],
            "question": r["question"],
            "options": {
                "A": r.get("option_a"),
                "B": r.get("option_b"),
                "C": r.get("option_c"),
                "D": r.get("option_d"),
            },
            "stored_correct": r.get("correct_answer"),
        })
    return f"""You are a senior examiner for Pakistan CSS/PPSC/FPSC multiple-choice exams.
Resolve each MCQ decisively. Prefer verifying the stored key when it is factually right.

Output EXACTLY one minified JSON object per line (JSONL), same order as input:
{{"bank":"{bank}","mcq_id":<int>,"verdict":"correct|wrong|outdated|ambiguous|none_of_options","actual_answer":"A|B|C|D|none","reason":"<short>","confidence":0.0-1.0,"time_sensitive":false}}

Rules:
- verdict=correct when stored key is right (actual_answer must match stored letter).
- verdict=wrong when a different option is clearly right; set actual_answer to that letter.
- verdict=none_of_options when all options are wrong; actual_answer "none".
- verdict=outdated for time-sensitive facts that changed (elections, office-holders, rankings).
- verdict=ambiguous only if genuinely unresolvable; keep confidence ≤ 0.55.
- Use confidence ≥ 0.85 when certain, 0.78–0.84 when fairly sure, below 0.78 if unsure.
- No markdown, no preamble.

INPUT:
{json.dumps(payload, ensure_ascii=False, indent=2)}
"""


def parse_jsonl_gemini(stdout: str) -> list[dict]:
    text = stdout
    if "```" in text:
        parts = re.findall(r"```(?:json)?\s*([\s\S]*?)```", text, re.I)
        if parts:
            text = "\n".join(parts)
    out = []
    for line in text.splitlines():
        line = line.strip()
        if not line.startswith("{"):
            continue
        try:
            out.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    return out


def persist_batch(bank: str, normed: list[dict], *, model_label: str) -> dict:
    if not normed:
        return {"verified": 0, "auto_fixed": 0, "quarantined": 0, "needs_review": 0}
    try:
        return write_decisions(
            normed,
            high_conf=VERIFY_CONF,
            fix_conf=FIX_CONF,
            model_name=model_label,
            tier=2,
        )
    except Exception as e:
        log(f"[{bank}] persist error: {e!r} — singles")
        s = {"verified": 0, "auto_fixed": 0, "quarantined": 0, "needs_review": 0}
        for one in normed:
            try:
                s2 = write_decisions(
                    [one],
                    high_conf=VERIFY_CONF,
                    fix_conf=FIX_CONF,
                    model_name=model_label,
                    tier=2,
                )
                for k in s:
                    s[k] += s2.get(k, 0)
            except Exception as e2:
                log(f"  skip mcq {one['mcq_id']}: {e2!r}")
        return s


def normalize_decision_row(obj: dict, bank: str, by_id: dict[int, dict], *, reason_tag: str) -> dict | None:
    try:
        mid = int(obj.get("mcq_id"))
    except (TypeError, ValueError):
        return None
    if mid not in by_id:
        return None
    verdict = str(obj.get("verdict", "ambiguous")).lower().strip()
    if verdict not in VALID_VERDICTS:
        verdict = "ambiguous"
    aa = str(obj.get("actual_answer") or "").strip().upper()
    if aa in ("NONE", ""):
        aa = "none"
    elif aa and aa[0] in "ABCD":
        aa = aa[0]
    else:
        aa = "none"
    try:
        conf = float(obj.get("confidence", 0.55))
    except (TypeError, ValueError):
        conf = 0.55
    conf = max(0.0, min(1.0, conf))
    return {
        "bank": bank,
        "mcq_id": mid,
        "verdict": verdict,
        "actual_answer": aa,
        "reason": str(obj.get("reason") or reason_tag)[:1000],
        "confidence": conf,
        "time_sensitive": bool(obj.get("time_sensitive", False)),
    }


def build_cursor_prompt(bank: str, chunk: list[dict]) -> str:
    lines = [
        f'CSS MCQ verify. Output ONLY {len(chunk)} minified JSON lines (no markdown/tools).',
        'Each line: {"bank":"' + bank + '","mcq_id":N,"verdict":"correct|wrong|outdated|ambiguous|none_of_options",'
        '"actual_answer":"A|B|C|D|none","confidence":0.0-1.0,"reason":"≤6w","time_sensitive":false}',
        "If stored key is right: verdict correct + matching letter. Wrong key: verdict wrong + right letter.",
    ]
    for i, r in enumerate(chunk, 1):
        k = (r.get("correct_answer") or "?").strip().upper()[:1]
        lines.append(
            f"{i}) id={r['id']} Q:{_clip(r.get('question'))} "
            f"A){_clip(r.get('option_a'))} B){_clip(r.get('option_b'))} "
            f"C){_clip(r.get('option_c'))} D){_clip(r.get('option_d'))} Key:{k}"
        )
    return "\n".join(lines)


def run_cursor(prompt: str, model: str, timeout: int) -> str:
    try:
        p = subprocess.run(
            [
                "agent", "-p", "--trust", "--output-format", "text",
                "--model", model,
                prompt,
            ],
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=str(ROOT),
        )
    except subprocess.TimeoutExpired:
        log(f"cursor TIMEOUT after {timeout}s model={model}")
        return ""
    if p.returncode != 0 and not (p.stdout or "").strip():
        log(f"cursor exit {p.returncode}: {(p.stderr or '')[:200]}")
    return (p.stdout or "") + "\n" + (p.stderr or "")


def phase_cursor_bank(bank: str, batch_size: int, timeout: int, max_mcqs: int, model: str) -> dict:
    rows = fetch_needs_review(bank)
    if max_mcqs > 0:
        rows = rows[:max_mcqs]
    if not rows:
        log(f"[cursor] {bank}: 0 needs_review")
        return {"bank": bank, "audited": 0}

    by_id = {int(r["id"]): r for r in rows}
    model_label = f"cursor-{model}"
    grand = {"audited": 0, "verified": 0, "quarantined": 0, "auto_fixed": 0, "needs_review": 0}
    t0 = time.time()
    nb = (len(rows) + batch_size - 1) // batch_size

    for i in range(0, len(rows), batch_size):
        sub = rows[i : i + batch_size]
        bi = i // batch_size + 1
        log(f"[cursor] {bank} batch {bi}/{nb} n={len(sub)} model={model}")
        raw = run_cursor(build_cursor_prompt(bank, sub), model, timeout)
        decoded = parse_jsonl_gemini(raw)
        normed = []
        for d in decoded:
            n = normalize_decision_row(d, bank, by_id, reason_tag="cursor-repair")
            if n:
                normed.append(n)
        want = {int(r["id"]) for r in sub}
        got = {n["mcq_id"] for n in normed}
        for mid in want - got:
            one = [r for r in sub if int(r["id"]) == mid]
            if not one:
                continue
            raw2 = run_cursor(build_cursor_prompt(bank, one), model, timeout)
            for d in parse_jsonl_gemini(raw2):
                n = normalize_decision_row(d, bank, by_id, reason_tag="cursor-repair")
                if n and n["mcq_id"] == mid:
                    normed.append(n)
                    break
        s = persist_batch(bank, normed, model_label=model_label)
        for k in grand:
            if k in s:
                grand[k] += s[k]
        done = min(i + batch_size, len(rows))
        rate = done / max(time.time() - t0, 0.1)
        log(
            f"[cursor] {bank} {done}/{len(rows)} "
            f"v={grand['verified']} fix={grand['auto_fixed']} q={grand['quarantined']} "
            f"rev={grand['needs_review']} {rate:.2f}/s"
        )

    grand["bank"] = bank
    return grand


def run_gemini(prompt: str, timeout: int) -> str:
    try:
        p = subprocess.run(
            ["gemini", "-p", prompt],
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=str(ROOT),
        )
    except subprocess.TimeoutExpired:
        log(f"gemini TIMEOUT after {timeout}s")
        return ""
    return (p.stdout or "") + "\n" + (p.stderr or "")


def phase_gemini_bank(bank: str, batch_size: int, timeout: int, max_mcqs: int) -> dict:
    rows = fetch_needs_review(bank)
    if max_mcqs > 0:
        rows = rows[:max_mcqs]
    if not rows:
        log(f"[gemini] {bank}: 0 needs_review")
        return {"bank": bank, "audited": 0}

    by_id = {int(r["id"]): r for r in rows}
    grand = {"audited": 0, "verified": 0, "quarantined": 0, "auto_fixed": 0, "needs_review": 0}
    t0 = time.time()

    for i in range(0, len(rows), batch_size):
        sub = rows[i : i + batch_size]
        log(f"[gemini] {bank} batch {i//batch_size + 1}/{(len(rows) + batch_size - 1)//batch_size} n={len(sub)}")
        prompt = build_gemini_prompt(bank, sub)
        raw = run_gemini(prompt, timeout)
        decoded = parse_jsonl_gemini(raw)
        normed = []
        for d in decoded:
            n = normalize_decision_row(d, bank, by_id, reason_tag="gemini-repair")
            if n:
                normed.append(n)
        want = {int(r["id"]) for r in sub}
        got = {n["mcq_id"] for n in normed}
        for mid in want - got:
            one = [r for r in sub if int(r["id"]) == mid]
            if not one:
                continue
            raw2 = run_gemini(build_gemini_prompt(bank, one), timeout)
            for d in parse_jsonl_gemini(raw2):
                n = normalize_decision_row(d, bank, by_id, reason_tag="gemini-repair")
                if n and n["mcq_id"] == mid:
                    normed.append(n)
                    break
        s = persist_batch(bank, normed, model_label="gemini-repair-v1")
        for k in grand:
            if k in s:
                grand[k] += s[k]
        done = min(i + batch_size, len(rows))
        rate = done / max(time.time() - t0, 0.1)
        log(
            f"[gemini] {bank} {done}/{len(rows)} "
            f"v={grand['verified']} fix={grand['auto_fixed']} q={grand['quarantined']} "
            f"rev={grand['needs_review']} {rate:.2f} mcq/s"
        )

    grand["bank"] = bank
    return grand


def count_needs_review() -> int:
    unions = " UNION ALL ".join(
        f"SELECT count(*)::int AS n FROM {b} WHERE verification_status='needs_review'"
        for b in BANKS
    )
    try:
        rows = pg_query(f"SELECT coalesce(sum(n),0) AS n FROM ({unions}) t;")
        return int(rows[0]["n"])
    except Exception:
        n = 0
        for bank in BANKS:
            r = (
                sb.table(bank)
                .select("id", count="exact")
                .eq("verification_status", "needs_review")
                .limit(1)
                .execute()
            )
            n += int(r.count or 0)
        return n


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--bank", action="append", default=[])
    ap.add_argument("--audit-only", action="store_true")
    ap.add_argument("--gemini-only", action="store_true", help="Use Gemini CLI (slow)")
    ap.add_argument(
        "--engine",
        choices=("cursor", "gemini"),
        default=os.environ.get("REPAIR_ENGINE", "cursor"),
    )
    ap.add_argument("--batch", type=int, default=12)
    ap.add_argument("--timeout", type=int, default=120)
    ap.add_argument("--model", default=None, help=f"Cursor model (default {CURSOR_MODEL})")
    ap.add_argument("--max-mcqs", type=int, default=0, help="Cap per bank (0=all)")
    args = ap.parse_args()
    engine = "gemini" if args.gemini_only else args.engine
    cursor_model = args.model or CURSOR_MODEL

    # Largest banks first (avoid N Supabase count calls at startup).
    default_order = [
        "pakistan_studies", "general_knowledge", "general_math", "islamiat",
        "ethics_civics", "everyday_science", "urdu", "basic_computer",
        "english", "geography", "current_affairs",
    ]
    banks = args.bank or default_order

    before = count_needs_review()
    log(f"== REPAIR START needs_review={before} engine={engine} banks={banks} ==")

    if not args.gemini_only and engine == "cursor":
        for bank in banks:
            phase_audit_all(bank)

    if not args.audit_only:
        for bank in banks:
            if engine == "cursor":
                phase_cursor_bank(bank, args.batch, args.timeout, args.max_mcqs, cursor_model)
            else:
                phase_gemini_bank(bank, args.batch, args.timeout, args.max_mcqs)

    after = count_needs_review()
    log(f"== REPAIR DONE needs_review {before} -> {after} ==")


if __name__ == "__main__":
    main()
