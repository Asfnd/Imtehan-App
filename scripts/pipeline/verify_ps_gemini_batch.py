#!/usr/bin/env python3
"""Fetch unverified pakistan_studies MCQs and append verifier JSONL via Gemini CLI.

Usage:
  python3 -m scripts.pipeline.verify_ps_gemini_batch --start-offset 70 --batch-mcqs 8

Requires `gemini` CLI on PATH (headless: gemini -p "...").
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

from scripts.pipeline.db import sb  # noqa: E402

BANK = "pakistan_studies"
LIMIT_FETCH = 35


def fetch_batch(offset: int) -> list[dict]:
    r = (
        sb.table(BANK)
        .select("id, question, option_a, option_b, option_c, option_d, correct_answer")
        .in_("verification_status", ["unverified", "needs_tier2"])
        .order("id")
        .range(offset, offset + LIMIT_FETCH - 1)
        .execute()
    )
    out = []
    for row in r.data or []:
        out.append({
            "bank": BANK,
            "id": row["id"],
            "question": row["question"],
            "options": {
                "A": row["option_a"],
                "B": row["option_b"],
                "C": row["option_c"],
                "D": row["option_d"],
            },
            "stored_correct": row["correct_answer"],
        })
    return out


def build_prompt(chunk: list[dict]) -> str:
    payload = []
    for r in chunk:
        payload.append({
            "mcq_id": r["id"],
            "question": r["question"],
            "options": r["options"],
            "stored_correct": r["stored_correct"],
        })
    return f"""You verify factual MCQs for Pakistan Studies / PPSC style exams.

For EACH item below, output EXACTLY one line of minified JSON (JSONL) with keys:
bank (string "{BANK}"), mcq_id (int), verdict (correct|wrong|outdated|ambiguous|none_of_options),
actual_answer (A|B|C|D|none), reason (short), confidence (0.0-1.0), time_sensitive (boolean).

Rules:
- High confidence only when sure; otherwise use lower confidence.
- If the stored key is right: verdict correct, actual_answer matches stored.
- If wrong key: verdict wrong, actual_answer is the best letter.
- none_of_options if no option is satisfactory; use actual_answer "none".
- outdated for obsolete dates/figures that may have changed.
- Do not wrap in markdown. No preamble. Only JSON lines, one per MCQ, same order as input.

INPUT:
{json.dumps(payload, ensure_ascii=False, indent=2)}
"""


def parse_jsonl_from_gemini(stdout: str) -> list[dict]:
    text = stdout
    if "```" in text:
        parts = re.findall(r"```(?:json)?\s*([\s\S]*?)```", text, re.I)
        if parts:
            text = "\n".join(parts)
    lines = []
    for line in text.splitlines():
        line = line.strip()
        if not line or line.startswith("[") or "ERROR" in line or line.startswith("Loaded"):
            continue
        if line.startswith("{"):
            try:
                lines.append(json.loads(line))
            except json.JSONDecodeError:
                continue
    # also try to find {...} blocks
    if len(lines) < 1:
        for m in re.finditer(r"\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}", stdout):
            try:
                lines.append(json.loads(m.group()))
            except json.JSONDecodeError:
                pass
    return lines


def normalize_row(obj: dict, by_id: dict[int, dict]) -> dict | None:
    mid = obj.get("mcq_id")
    if mid is None:
        return None
    try:
        mid = int(mid)
    except (TypeError, ValueError):
        return None
    if mid not in by_id:
        return None
    verdict = str(obj.get("verdict", "ambiguous")).lower().strip()
    if verdict not in ("correct", "wrong", "outdated", "ambiguous", "none_of_options"):
        verdict = "ambiguous"
    aa = str(obj.get("actual_answer") or "").strip().upper()
    if aa not in ("A", "B", "C", "D", "NONE", ""):
        if len(aa) >= 1 and aa[0] in "ABCD":
            aa = aa[0]
        else:
            aa = "none"
    if aa == "":
        aa = "none"
    if aa == "NONE":
        aa = "none"
    conf = obj.get("confidence")
    try:
        conf = float(conf) if conf is not None else 0.55
    except (TypeError, ValueError):
        conf = 0.55
    conf = max(0.0, min(1.0, conf))
    ts = bool(obj.get("time_sensitive", False))
    return {
        "bank": BANK,
        "mcq_id": mid,
        "verdict": verdict,
        "actual_answer": aa if aa != "none" else "none",
        "reason": str(obj.get("reason") or "")[:1000],
        "confidence": conf,
        "time_sensitive": ts,
    }


def run_gemini(prompt: str, timeout: int) -> str:
    p = subprocess.run(
        ["gemini", "-p", prompt],
        capture_output=True,
        text=True,
        timeout=timeout,
        cwd=str(ROOT),
    )
    return (p.stdout or "") + "\n" + (p.stderr or "")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--start-offset", type=int, default=0, help="Skip first N rows from ordered unverified list")
    ap.add_argument("--batch-mcqs", type=int, default=8, help="MCQs per Gemini call")
    ap.add_argument("--out", type=Path, default=Path("/tmp/verify_ps.jsonl"))
    ap.add_argument("--timeout", type=int, default=180)
    ap.add_argument("--max-mcqs", type=int, default=0, help="Process at most N MCQs (0 = all remaining)")
    args = ap.parse_args()

    offset = max(0, args.start_offset)
    pending = []
    while True:
        chunk = fetch_batch(offset)
        if not chunk:
            break
        pending.extend(chunk)
        offset += len(chunk)

    by_id = {r["id"]: r for r in pending}
    written = set()
    # Load existing mcq_ids in outfile to allow resume
    if args.out.exists():
        with open(args.out, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    o = json.loads(line)
                    written.add(int(o.get("mcq_id")))
                except (json.JSONDecodeError, TypeError, ValueError):
                    continue

    batch_n = args.batch_mcqs
    buf = [r for r in pending if r["id"] not in written]
    if args.max_mcqs > 0:
        buf = buf[: args.max_mcqs]

    with open(args.out, "a", encoding="utf-8") as outf:
        for i in range(0, len(buf), batch_n):
            sub = buf[i : i + batch_n]
            prompt = build_prompt(sub)
            raw = run_gemini(prompt, args.timeout)
            decoded = parse_jsonl_from_gemini(raw)
            normed = []
            for d in decoded:
                n = normalize_row(d, by_id)
                if n:
                    normed.append(n)
            # Match count — if short, retry singles for missing ids
            got_ids = {n["mcq_id"] for n in normed}
            want_ids = {r["id"] for r in sub}
            missing = want_ids - got_ids
            for mid in missing:
                one = [r for r in sub if r["id"] == mid]
                if not one:
                    continue
                raw2 = run_gemini(build_prompt(one), args.timeout)
                for d in parse_jsonl_from_gemini(raw2):
                    n = normalize_row(d, by_id)
                    if n and n["mcq_id"] == mid:
                        normed.append(n)
                        break
            for n in normed:
                if n["mcq_id"] in written:
                    continue
                outf.write(json.dumps(n, ensure_ascii=False) + "\n")
                outf.flush()
                written.add(n["mcq_id"])
            print(f"batch {i//batch_n + 1}: wrote {len(normed)} (missing_after_retry {len(want_ids - {x['mcq_id'] for x in normed})})", flush=True)

    nlines = sum(1 for _ in open(args.out, encoding="utf-8")) if args.out.exists() else 0
    print(f"done total lines outfile: {nlines}")


if __name__ == "__main__":
    main()
