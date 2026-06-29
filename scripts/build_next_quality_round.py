#!/usr/bin/env python3
"""Build the next round{N}_quality_sprint.json, skipping topics from all prior round* plans."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
PIPELINE = REPO / "scripts" / "pipeline"

TABLES = [
    "english", "general_knowledge", "general_math", "pakistan_studies",
    "islamiat", "everyday_science", "current_affairs", "basic_computer",
    "urdu", "geography", "ethics_civics",
]
TYPE_ROT = ["practice", "most_repeated", "most_important"]


def clean(t: str) -> str:
    x = re.sub(r"\s*\([^)]*\)\s*", " ", t)
    return re.sub(r"\s+", " ", x).strip()


def load_used() -> set[tuple[str, str, str]]:
    """(table, topic, type) — same topic may repeat with a different MCQ type."""
    used: set[tuple[str, str, str]] = set()
    for path in sorted(PIPELINE.glob("round*_quality_sprint.json")):
        try:
            batches = json.loads(path.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            continue
        for b in batches:
            used.add((b["table"], clean(b["topic"]).lower(), b.get("type", "practice")))
    return used


def plan_already_finished(plan_path: Path) -> bool:
    log_path = REPO / "logs" / "agent_mcq_pipeline.log"
    if not log_path.exists():
        return False
    name = plan_path.name
    text = log_path.read_text(encoding="utf-8", errors="replace")
    run_marker = f"== RUN plan={name}"
    done_marker = "== DONE inserted"
    start = text.rfind(run_marker)
    if start < 0:
        return False
    tail = text[start:]
    return done_marker in tail


def next_round_number() -> int:
    nums = []
    for path in PIPELINE.glob("round*_quality_sprint.json"):
        m = re.match(r"round(\d+)_quality_sprint\.json$", path.name)
        if m:
            nums.append(int(m.group(1)))
    return (max(nums) if nums else 20) + 1


def pick_plan_to_run() -> Path:
    """Prefer an existing plan file that has not finished yet."""
    for path in sorted(PIPELINE.glob("round*_quality_sprint.json"), key=lambda p: p.name):
        if not plan_already_finished(path):
            return path
    return Path()


def main() -> None:
    pending = pick_plan_to_run()
    if pending and pending.name:
        print(pending)
        return

    used = load_used()
    data = json.loads((REPO / "data" / "syllabus" / "exam_syllabus_map.json").read_text(encoding="utf-8"))
    tmap = data.get("topics_by_db_table", {})

    n = next_round_number()
    rng = (n * 13) % 97

    batches: list[dict] = []
    for ti, table in enumerate(TABLES):
        topics = [clean(x) for x in tmap.get(table, [])]
        if not topics:
            continue
        taken = 0
        idx = (ti * 11 + rng) % len(topics)
        rounds = 0
        while taken < 2 and rounds < len(topics) * 3 + 15:
            cand = topics[idx % len(topics)]
            rounds += 1
            idx += 1
            mtype = TYPE_ROT[(ti + taken + n) % len(TYPE_ROT)]
            key = (table, cand.lower(), mtype)
            if key in used:
                continue
            batches.append({"table": table, "topic": cand, "type": mtype, "count": 26})
            used.add(key)
            taken += 1

    if len(batches) < 22:
        print(f"WARN: only {len(batches)} batches (syllabus slots may be exhausted)", file=sys.stderr)

    out = PIPELINE / f"round{n}_quality_sprint.json"
    out.write_text(json.dumps(batches, indent=2), encoding="utf-8")
    print(out)


if __name__ == "__main__":
    main()
