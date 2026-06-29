#!/usr/bin/env python3
"""Audit composer-generated MCQs in Supabase for student-ready quality."""
from __future__ import annotations

import os
import re
import statistics
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(REPO))

from dotenv import load_dotenv

load_dotenv(REPO / ".env.local")

from scripts.direct_mcq_insert import TABLES, get_supabase, normalize_explanation  # noqa: E402

TRAP = re.compile(r"\b(trap|distractor|students often|common mistake)\b", re.I)


def audit_table(sb, table: str, limit: int = 200) -> dict:
    rows = (
        sb.table(table)
        .select("question,explanation,source_topic,tags")
        .like("verifier_model", "cursor%")
        .order("created_at", desc=True)
        .limit(limit)
        .execute()
        .data
        or []
    )
    if not rows:
        return {"table": table, "n": 0}

    words = []
    traps = 0
    long_stem = 0
    fixable = 0
    sweet = 0
    for r in rows:
        expl = r.get("explanation") or ""
        w = len(expl.split())
        words.append(w)
        if TRAP.search(expl):
            traps += 1
        if 15 <= w <= 25 and not TRAP.search(expl):
            sweet += 1
        cleaned = normalize_explanation(expl)
        if cleaned != expl and 15 <= len(cleaned.split()) <= 25 and not TRAP.search(cleaned):
            fixable += 1
        if len((r.get("question") or "").split()) > 55:
            long_stem += 1

    return {
        "table": table,
        "n": len(rows),
        "median_words": statistics.median(words) if words else 0,
        "sweet_pct": round(100 * sweet / len(rows), 1),
        "trap_pct": round(100 * traps / len(rows), 1),
        "long_stem_pct": round(100 * long_stem / len(rows), 1),
        "fixable_expl_pct": round(100 * fixable / len(rows), 1),
    }


def main() -> None:
    sb = get_supabase()
    print(f"Quality audit — verifier_model like cursor%\n")
    print(f"{'table':<22} {'n':>5} {'med_w':>6} {'15-25%':>8} {'trap%':>7} {'longQ%':>7}")
    for table in TABLES:
        s = audit_table(sb, table, limit=150)
        if s["n"] == 0:
            continue
        print(
            f"{s['table']:<22} {s['n']:>5} {s['median_words']:>6.0f} "
            f"{s['sweet_pct']:>7.1f}% {s['trap_pct']:>6.1f}% {s['long_stem_pct']:>6.1f}%"
        )
    print("\nTarget for new batches: 15-25 words ≥90%, trap% = 0")


if __name__ == "__main__":
    main()
