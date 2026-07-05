#!/usr/bin/env python3
"""Validate expansion JSON batches before Supabase insert. Exit 1 if any fail."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
EXP = REPO / "data" / "expansion"
ISSB = {
    "issb_english", "issb_mathematics", "issb_general_knowledge",
    "issb_pakistan_affairs", "issb_intelligence",
}
DASH = re.compile(r"[\u2013\u2014]")
AI = re.compile(r"\b(it is worth noting|delve|landscape|leverage|multifaceted)\b", re.I)


def check_issb(row: dict, path: str, i: int) -> list[str]:
    errs = []
    for f in ("question", "option_a", "option_b", "option_c", "option_d", "explanation", "topic"):
        if not (row.get(f) or "").strip():
            errs.append(f"{path}[{i}] missing {f}")
    if row.get("table") not in ISSB:
        errs.append(f"{path}[{i}] bad table {row.get('table')}")
    ans = (row.get("correct_answer") or "").strip().upper()[:1]
    if ans not in "ABCD":
        errs.append(f"{path}[{i}] bad answer {ans}")
    opts = [row.get(f"option_{c}", "").strip().lower() for c in "abcd"]
    if len(set(opts)) < 4:
        errs.append(f"{path}[{i}] duplicate options")
    expl = row.get("explanation") or ""
    if len(expl.split()) < 5:
        errs.append(f"{path}[{i}] explanation too short")
    if DASH.search(expl) or DASH.search(row.get("question") or ""):
        errs.append(f"{path}[{i}] en/em dash found")
    if AI.search(expl):
        errs.append(f"{path}[{i}] AI fluff in explanation")
    return errs


MDCAT_ENGLISH_TOPICS = {
    "Vocabulary and Lexical Aspects",
    "Direct and Indirect Speech",
    "Active and Passive Voice",
    "Transitional Devices",
    "Sentence Inversion",
    "Reading and Thinking Skills",
}

MDCAT_LR_TOPICS = {
    "Analytical Reasoning",
    "Logical Deduction",
    "Pattern Recognition",
    "Syllogisms",
    "Critical Thinking",
}

ENGINEERING_ENGLISH_TOPICS = {
    "Vocabulary and Synonyms",
    "Grammar and Parts of Speech",
    "Sentence Completion",
    "Reading Comprehension",
    "Analogies",
}


def check_mdcat(row: dict, path: str, i: int) -> list[str]:
    errs = []
    for f in ("question", "option_a", "option_b", "option_c", "option_d", "explanation", "topic"):
        if not (row.get(f) or "").strip():
            errs.append(f"{path}[{i}] missing {f}")
    ans = (row.get("correct_answer") or "").strip().upper()[:1]
    if ans not in "ABCD":
        errs.append(f"{path}[{i}] bad answer")
    opts = [row.get(f"option_{c}", "").strip().lower() for c in "abcd"]
    if len(set(opts)) < 4:
        errs.append(f"{path}[{i}] duplicate options")
    expl = row.get("explanation") or ""
    if len(expl.split()) < 6:
        errs.append(f"{path}[{i}] explanation too short")
    if DASH.search(expl) or DASH.search(row.get("question") or ""):
        errs.append(f"{path}[{i}] en/em dash")
    if AI.search(expl):
        errs.append(f"{path}[{i}] AI fluff")
    if row.get("difficulty") not in ("Easy", "Medium", "Hard"):
        errs.append(f"{path}[{i}] difficulty must be Easy|Medium|Hard")
    if row.get("topic") not in MDCAT_ENGLISH_TOPICS:
        errs.append(f"{path}[{i}] unknown MDCAT topic {row.get('topic')}")
    return errs


def check_mdcat_lr(row: dict, path: str, i: int) -> list[str]:
    errs = []
    for f in ("question", "option_a", "option_b", "option_c", "option_d", "explanation", "topic", "subtopic"):
        if not (row.get(f) or "").strip():
            errs.append(f"{path}[{i}] missing {f}")
    ans = (row.get("correct_answer") or "").strip().upper()[:1]
    if ans not in "ABCD":
        errs.append(f"{path}[{i}] bad answer")
    opts = [row.get(f"option_{c}", "").strip().lower() for c in "abcd"]
    if len(set(opts)) < 4:
        errs.append(f"{path}[{i}] duplicate options")
    expl = row.get("explanation") or ""
    if len(expl.split()) < 6:
        errs.append(f"{path}[{i}] explanation too short")
    if DASH.search(expl) or DASH.search(row.get("question") or ""):
        errs.append(f"{path}[{i}] en/em dash")
    if AI.search(expl):
        errs.append(f"{path}[{i}] AI fluff")
    if row.get("difficulty") not in ("Easy", "Medium", "Hard"):
        errs.append(f"{path}[{i}] difficulty must be Easy|Medium|Hard")
    if row.get("topic") not in MDCAT_LR_TOPICS:
        errs.append(f"{path}[{i}] unknown MDCAT LR topic {row.get('topic')}")
    return errs


def check_engineering_english(row: dict, path: str, i: int) -> list[str]:
    errs = []
    for f in ("question", "option_a", "option_b", "option_c", "option_d", "explanation", "topic"):
        if not (row.get(f) or "").strip():
            errs.append(f"{path}[{i}] missing {f}")
    ans = (row.get("correct_answer") or "").strip().upper()[:1]
    if ans not in "ABCD":
        errs.append(f"{path}[{i}] bad answer")
    opts = [row.get(f"option_{c}", "").strip().lower() for c in "abcd"]
    if len(set(opts)) < 4:
        errs.append(f"{path}[{i}] duplicate options")
    expl = row.get("explanation") or ""
    if len(expl.split()) < 6:
        errs.append(f"{path}[{i}] explanation too short")
    if DASH.search(expl) or DASH.search(row.get("question") or ""):
        errs.append(f"{path}[{i}] en/em dash")
    if AI.search(expl):
        errs.append(f"{path}[{i}] AI fluff")
    if row.get("difficulty") not in ("Easy", "Medium", "Hard"):
        errs.append(f"{path}[{i}] difficulty must be Easy|Medium|Hard")
    if row.get("topic") not in ENGINEERING_ENGLISH_TOPICS:
        errs.append(f"{path}[{i}] unknown engineering English topic {row.get('topic')}")
    return errs


def check_css(row: dict, path: str, i: int) -> list[str]:
    errs = []
    if row.get("year") is not None:
        errs.append(f"{path}[{i}] year must be null for practice")
    for f in ("subject", "question_text", "option_a", "option_b", "option_c", "option_d", "explanation_detailed"):
        if not (row.get(f) or "").strip():
            errs.append(f"{path}[{i}] missing {f}")
    ans = (row.get("correct_answer") or "").strip().upper()[:1]
    if ans not in "ABCD":
        errs.append(f"{path}[{i}] bad answer")
    opts = [row.get(f"option_{c}", "").strip().lower() for c in "abcd"]
    if len(set(opts)) < 4:
        errs.append(f"{path}[{i}] duplicate options")
    expl = row.get("explanation_detailed") or ""
    if DASH.search(expl):
        errs.append(f"{path}[{i}] en/em dash")
    if AI.search(expl):
        errs.append(f"{path}[{i}] AI fluff")
    return errs


def main() -> None:
    manifest = EXP / ".applied-manifest.json"
    applied: set[str] = set()
    if manifest.exists():
        applied = set(json.loads(manifest.read_text()).get("applied", []))

    pending = [
        p for p in sorted(EXP.glob("*.json"))
        if p.name != ".applied-manifest.json" and p.name not in applied
    ]
    if not pending:
        print("No pending expansion batches to validate.")
        return

    all_errs: list[str] = []
    total = 0
    for path in pending:
        rows = json.loads(path.read_text())
        if not isinstance(rows, list):
            all_errs.append(f"{path.name}: not a list")
            continue
        total += len(rows)
        for i, row in enumerate(rows):
            if path.name.startswith("css-practice"):
                all_errs.extend(check_css(row, path.name, i))
            elif path.name.startswith("mdcat-english"):
                all_errs.extend(check_mdcat(row, path.name, i))
            elif path.name.startswith("mdcat-logical-reasoning"):
                all_errs.extend(check_mdcat_lr(row, path.name, i))
            elif path.name.startswith("engineering-english"):
                all_errs.extend(check_engineering_english(row, path.name, i))
            else:
                all_errs.extend(check_issb(row, path.name, i))

    if all_errs:
        print(f"FAIL {len(all_errs)} issues in {len(pending)} files ({total} rows):")
        for e in all_errs[:30]:
            print(" ", e)
        if len(all_errs) > 30:
            print(f"  ... and {len(all_errs) - 30} more")
        sys.exit(1)
    print(f"OK {len(pending)} pending files, {total} MCQs passed quality checks.")


if __name__ == "__main__":
    main()
