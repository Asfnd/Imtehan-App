"""Pre-stage unverified MCQs as /tmp/batch_<bank>_<idx>.jsonl files.

Subagents can read /tmp directly (no venv access required, no worktree issue).
After agents write decisions to /tmp/decisions_<bank>_<idx>.jsonl, the
14_collect_persist.py script runs the helper to insert them.

Usage:
  python -m scripts.pipeline.13_stage_batches            # all banks, 100/batch
  python -m scripts.pipeline.13_stage_batches --size 150
  python -m scripts.pipeline.13_stage_batches current_affairs ethics_civics
"""
from __future__ import annotations

import argparse
import json
import shutil
import sys
from pathlib import Path

from scripts.pipeline.db import sb

BANKS = [
    "current_affairs", "ethics_civics", "geography", "urdu", "english",
    "general_math", "islamiat", "basic_computer", "pakistan_studies",
    "general_knowledge", "everyday_science",
]

STAGE_DIR = Path("/tmp/imtehan_verify")


def fetch_all_unverified(bank: str) -> list[dict]:
    """Fetch every unverified or needs_tier2 row from the bank."""
    out: list[dict] = []
    start = 0
    page = 1000
    while True:
        r = (
            sb.table(bank)
            .select("id, question, option_a, option_b, option_c, option_d, correct_answer")
            .in_("verification_status", ["unverified", "needs_tier2"])
            .order("id")
            .range(start, start + page - 1)
            .execute()
        )
        rows = r.data or []
        if not rows:
            break
        out.extend(rows)
        if len(rows) < page:
            break
        start += page
    return out


def stage_bank(bank: str, size: int) -> int:
    rows = fetch_all_unverified(bank)
    if not rows:
        return 0
    bank_dir = STAGE_DIR / bank
    # Clear any prior staging for this bank
    if bank_dir.exists():
        shutil.rmtree(bank_dir)
    bank_dir.mkdir(parents=True, exist_ok=True)
    n_batches = 0
    for i in range(0, len(rows), size):
        chunk = rows[i:i + size]
        path = bank_dir / f"batch_{n_batches:04d}.jsonl"
        with path.open("w", encoding="utf-8") as f:
            for row in chunk:
                f.write(json.dumps({
                    "bank": bank,
                    "id": row["id"],
                    "question": row["question"],
                    "options": {
                        "A": row["option_a"],
                        "B": row["option_b"],
                        "C": row["option_c"],
                        "D": row["option_d"],
                    },
                    "stored_correct": row["correct_answer"],
                }, ensure_ascii=False))
                f.write("\n")
        n_batches += 1
    return n_batches


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("banks", nargs="*", default=[])
    ap.add_argument("--size", type=int, default=100)
    args = ap.parse_args()
    banks = args.banks if args.banks else BANKS

    STAGE_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Staging dir: {STAGE_DIR}")
    print(f"Batch size : {args.size}\n")

    total_batches = 0
    total_rows = 0
    for b in banks:
        n = stage_bank(b, args.size)
        if n:
            count = sum(1 for _ in (STAGE_DIR / b).glob("*.jsonl")) * args.size  # upper bound
            actual = sum(1 for batch in (STAGE_DIR / b).glob("*.jsonl") for _ in batch.open())
            total_batches += n
            total_rows += actual
            print(f"  [{b:<20}] {actual:>5} rows  in  {n:>3} batches")
        else:
            print(f"  [{b:<20}]   0 rows (already done)")

    print()
    print(f"== staged {total_rows:,} rows across {total_batches} batch files ==")
    print(f"   files live at {STAGE_DIR}/<bank>/batch_<n>.jsonl")


if __name__ == "__main__":
    main()
