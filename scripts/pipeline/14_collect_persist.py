"""Collect decision files written by subagents and persist via the helper.

After an agent processes /tmp/imtehan_verify/<bank>/batch_NNNN.jsonl, it writes
/tmp/imtehan_verify/<bank>/decisions_NNNN.jsonl. This script picks all decision
files up, runs the same write_decisions() the verify_helper uses, and reports.

Usage:
  python -m scripts.pipeline.14_collect_persist              # persist all
  python -m scripts.pipeline.14_collect_persist current_affairs
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

from scripts.pipeline.db import sb
from scripts.pipeline.__init__ import *  # noqa
from scripts.pipeline import __init__  # noqa

# Re-use the helper's write_decisions implementation
import importlib
_helper = importlib.import_module("scripts.pipeline.11_verify_helper")

STAGE_DIR = Path("/tmp/imtehan_verify")


def main() -> None:
    banks = sys.argv[1:] or None
    if not STAGE_DIR.exists():
        print("no staging dir; nothing to persist")
        return

    grand = {"audited": 0, "verified": 0, "quarantined": 0, "auto_fixed": 0, "needs_review": 0, "errors": 0}
    for bank_dir in sorted(STAGE_DIR.iterdir()):
        if not bank_dir.is_dir():
            continue
        if banks and bank_dir.name not in banks:
            continue
        files = sorted(bank_dir.glob("decisions_*.jsonl"))
        if not files:
            continue
        print(f"\n[{bank_dir.name}] {len(files)} decision file(s) found")
        for f in files:
            rows = []
            try:
                for line in f.read_text(encoding="utf-8").splitlines():
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        rows.append(json.loads(line))
                    except json.JSONDecodeError:
                        pass
            except Exception as e:
                print(f"   {f.name}: read error {e}")
                continue
            if not rows:
                continue
            summary = _helper.write_decisions(rows)
            for k in grand:
                grand[k] += summary.get(k, 0)
            print(f"   {f.name}: {summary}")
            # Mark file as processed by renaming
            f.rename(f.with_suffix(".jsonl.persisted"))

    print()
    print(f"== grand total ==\n{json.dumps(grand, indent=2)}")


if __name__ == "__main__":
    main()
