#!/usr/bin/env python3
"""
Build ready-to-paste Cursor Agent prompts for parallel MCP MCQ workers.

One output file per batch = one Agent tab. Concatenates:
  - docs/prompts/agent-dispatch-header.txt (with table/topic/type filled)
  - docs/prompts/MCP_MCQ_MASTER_PROMPT.md (your full self-contained rules)

Usage:
  python3 scripts/pipeline/generate_mcp_agent_prompts.py
  python3 scripts/pipeline/generate_mcp_agent_prompts.py --plan scripts/pipeline/mcp_agent_batches.json
  python3 scripts/pipeline/generate_mcp_agent_prompts.py --limit 4

Output: logs/mcp_agent_dispatches/batch_XX_{table}_{slug}.txt
"""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
HEADER = REPO / "docs/prompts/agent-dispatch-header.txt"
MASTER = REPO / "docs/prompts/MCP_MCQ_MASTER_PROMPT.md"
DEFAULT_PLAN = REPO / "scripts/pipeline/mcp_agent_batches.json"
OUT_DIR = REPO / "logs/mcp_agent_dispatches"


def slug(s: str, max_len: int = 40) -> str:
    s = re.sub(r"[^a-z0-9]+", "_", s.lower()).strip("_")
    return s[:max_len] or "topic"


def main() -> None:
    ap = argparse.ArgumentParser(description="Generate MCP agent dispatch prompt files")
    ap.add_argument("--plan", type=Path, default=DEFAULT_PLAN)
    ap.add_argument("--master", type=Path, default=MASTER, help="Full MCQ master prompt markdown")
    ap.add_argument("--limit", type=int, default=0, help="Max batches to generate (0 = all)")
    args = ap.parse_args()

    if not HEADER.exists():
        raise SystemExit(f"Missing header: {HEADER}")
    if not args.plan.exists():
        raise SystemExit(f"Missing plan: {args.plan}")

    header_tpl = HEADER.read_text(encoding="utf-8")
    if args.master.exists():
        master_body = args.master.read_text(encoding="utf-8")
    else:
        master_body = (
            "(Paste your full MCP master prompt into "
            f"{args.master.relative_to(REPO)} then re-run this script.)\n"
        )

    batches = json.loads(args.plan.read_text(encoding="utf-8"))
    if args.limit > 0:
        batches = batches[: args.limit]

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    written: list[str] = []

    for b in batches:
        bid = b.get("id", "00")
        table = b["table"]
        topic = b["topic"]
        mtype = b["type"]
        header = (
            header_tpl.replace("{{TABLE}}", table)
            .replace("{{TOPIC}}", topic)
            .replace("{{TYPE}}", mtype)
        )
        content = header + "\n" + master_body.strip() + "\n"
        fname = f"batch_{bid}_{table}_{slug(topic)}.txt"
        path = OUT_DIR / fname
        path.write_text(content, encoding="utf-8")
        written.append(str(path.relative_to(REPO)))

    print(f"Generated {len(written)} dispatch files in {OUT_DIR.relative_to(REPO)}/")
    print()
    print("Next steps:")
    print("  1. Ensure docs/prompts/MCP_MCQ_MASTER_PROMPT.md contains your full Sections 1-11 prompt")
    print("  2. Enable Supabase MCP (execute_sql) in Cursor")
    print("  3. Open one Agent tab per file; paste contents; run in parallel (up to 12)")
    print()
    for w in written:
        print(f"  - {w}")


if __name__ == "__main__":
    main()
