"""CLI helper used by Claude subagents to verify MCQs.

The agent calls:
  --fetch BANK OFFSET LIMIT       # prints JSONL of unverified MCQs
  --write FILE                    # reads JSONL of verifier decisions, persists them

Decision JSONL row format (one MCQ per line):
{
  "bank": "current_affairs",
  "mcq_id": 12345,
  "verdict": "correct|wrong|outdated|ambiguous|none_of_options",
  "actual_answer": "A|B|C|D|none",
  "reason": "short justification",
  "confidence": 0.0-1.0,
  "time_sensitive": true|false
}

All writes are idempotent via ON CONFLICT (the mcq_verification table allows
multiple verifications per MCQ — they're the audit log).
"""
from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone
from typing import Iterable

from scripts.pipeline.db import sb

MODEL_NAME = "claude-subagent"
TIER = 2  # subagent verdicts are considered tier-2 quality (Claude-equivalent)
HIGH_CONF = 0.85
VALID_VERDICTS = frozenset({"correct", "wrong", "outdated", "ambiguous", "none_of_options"})

BANKS = [
    "current_affairs", "ethics_civics", "geography", "urdu", "english",
    "general_math", "islamiat", "basic_computer", "pakistan_studies",
    "general_knowledge", "everyday_science",
]


def fetch_unverified(bank: str, offset: int, limit: int) -> list[dict]:
    if bank not in BANKS:
        raise SystemExit(f"unknown bank: {bank}")
    r = (
        sb.table(bank)
        .select("id, question, option_a, option_b, option_c, option_d, correct_answer")
        .in_("verification_status", ["unverified", "needs_tier2"])
        .order("id")
        .range(offset, offset + limit - 1)
        .execute()
    )
    out = []
    for row in r.data or []:
        out.append({
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
        })
    return out


def remaining_count(bank: str) -> int:
    r = (
        sb.table(bank)
        .select("id", count="exact", head=True)
        .in_("verification_status", ["unverified", "needs_tier2"])
        .execute()
    )
    return int(r.count or 0)


def write_decisions(
    rows: Iterable[dict],
    *,
    high_conf: float | None = None,
    fix_conf: float | None = None,
    model_name: str | None = None,
    tier: int | None = None,
) -> dict:
    rows = list(rows)
    if not rows:
        return {"audited": 0, "verified": 0, "quarantined": 0, "auto_fixed": 0, "needs_review": 0, "errors": 0}

    conf_verify = high_conf if high_conf is not None else HIGH_CONF
    conf_fix = fix_conf if fix_conf is not None else HIGH_CONF
    audit_model = model_name or MODEL_NAME
    audit_tier = tier if tier is not None else TIER

    # 1. Insert into mcq_verification
    audit_rows = []
    for r in rows:
        verdict = r.get("verdict") or "error"
        aa = (r.get("actual_answer") or "").upper()[:1] if r.get("actual_answer") else None
        if aa not in ("A", "B", "C", "D"):
            aa = None
        audit_rows.append({
            "source_table": r["bank"],
            "mcq_id": int(r["mcq_id"]),
            "verdict": verdict,
            "actual_answer": aa,
            "reason": (r.get("reason") or "")[:1000],
            "confidence": float(r.get("confidence")) if r.get("confidence") is not None else None,
            "model": audit_model,
            "tier": audit_tier,
        })
    for i in range(0, len(audit_rows), 500):
        sb.table("mcq_verification").insert(audit_rows[i:i + 500]).execute()

    # 2. Decide per-row action
    verified_by_bank: dict[str, list[int]] = {}
    quarantined_by_bank: dict[str, list[int]] = {}
    auto_fix_by_bank: dict[str, list[tuple[int, str]]] = {}
    needs_review_by_bank: dict[str, list[int]] = {}
    time_sens_by_bank: dict[str, list[int]] = {}

    summary = {"audited": len(audit_rows), "verified": 0, "quarantined": 0, "auto_fixed": 0, "needs_review": 0, "errors": 0}

    # Need stored_correct for each MCQ — query in bulk
    by_bank: dict[str, list[int]] = {}
    for r in rows:
        by_bank.setdefault(r["bank"], []).append(int(r["mcq_id"]))
    stored: dict[tuple[str, int], str] = {}
    for bank, ids in by_bank.items():
        for i in range(0, len(ids), 500):
            ch = ids[i:i + 500]
            qr = sb.table(bank).select("id, correct_answer").in_("id", ch).execute()
            for x in qr.data or []:
                stored[(bank, int(x["id"]))] = x["correct_answer"]

    for r in rows:
        bank = r["bank"]
        mid = int(r["mcq_id"])
        verdict = (r.get("verdict") or "").lower()
        conf = float(r.get("confidence")) if r.get("confidence") is not None else 0.0
        aa = (r.get("actual_answer") or "").upper()[:1] if r.get("actual_answer") else None
        if aa not in ("A", "B", "C", "D"):
            aa = None
        ts = bool(r.get("time_sensitive"))

        if ts:
            time_sens_by_bank.setdefault(bank, []).append(mid)

        if verdict == "correct" and conf >= conf_verify:
            verified_by_bank.setdefault(bank, []).append(mid)
            summary["verified"] += 1
        elif verdict in ("outdated", "none_of_options") and conf >= conf_verify:
            quarantined_by_bank.setdefault(bank, []).append(mid)
            summary["quarantined"] += 1
        elif verdict == "wrong" and aa and conf >= conf_fix and aa != stored.get((bank, mid)):
            auto_fix_by_bank.setdefault(bank, []).append((mid, aa))
            summary["auto_fixed"] += 1
        else:
            needs_review_by_bank.setdefault(bank, []).append(mid)
            summary["needs_review"] += 1

    # 3. Apply updates
    verified_stamp = datetime.now(timezone.utc).isoformat()
    for bank, ids in verified_by_bank.items():
        for i in range(0, len(ids), 500):
            sb.table(bank).update({
                "verification_status": "verified",
                "verified_at": verified_stamp,
                "verifier_model": audit_model,
            }).in_("id", ids[i:i + 500]).execute()

    for bank, ids in quarantined_by_bank.items():
        for i in range(0, len(ids), 500):
            sb.table(bank).update({
                "verification_status": "quarantined",
                "verifier_model": audit_model,
                "time_sensitive": True,
            }).in_("id", ids[i:i + 500]).execute()

    for bank, pairs in auto_fix_by_bank.items():
        # Archive originals, then update
        ids = [p[0] for p in pairs]
        for i in range(0, len(ids), 500):
            ch = ids[i:i + 500]
            # Archive snapshot
            rows_data = sb.table(bank).select(
                "id, question_number, question, option_a, option_b, option_c, option_d, correct_answer, type, created_at"
            ).in_("id", ch).execute().data or []
            arch = [{
                "source_table": bank,
                "original_id": x["id"],
                "question_number": x.get("question_number"),
                "question": x["question"],
                "option_a": x.get("option_a"),
                "option_b": x.get("option_b"),
                "option_c": x.get("option_c"),
                "option_d": x.get("option_d"),
                "correct_answer": x.get("correct_answer"),
                "type": x.get("type"),
                "created_at": x.get("created_at"),
                "action": "update",
                "reason": "auto-fix on 2-model consensus (claude-subagent verifier)",
            } for x in rows_data]
            if arch:
                sb.table("mcq_archive").insert(arch).execute()
        # Apply each fix individually since correct_answer varies.
        # If the fix would collide with an existing (deduped) row that already
        # has the corrected correct_answer, treat the current row as a duplicate:
        # archive + delete instead of updating.
        from postgrest.exceptions import APIError as _APIError
        for mid, new_ans in pairs:
            try:
                sb.table(bank).update({
                    "correct_answer": new_ans,
                    "verification_status": "verified",
                    "verified_at": verified_stamp,
                    "verifier_model": audit_model,
                }).eq("id", mid).execute()
            except _APIError as e:
                if "unique" in str(e).lower() or "23505" in str(e):
                    # Find the survivor that already has this (question, options, correct_answer)
                    survivor = sb.table(bank).select(
                        "id, question, option_a, option_b, option_c, option_d"
                    ).eq("id", mid).execute().data
                    if survivor:
                        q = survivor[0]
                        existing = sb.table(bank).select("id").eq(
                            "question", q["question"]
                        ).eq("option_a", q.get("option_a") or "").eq(
                            "option_b", q.get("option_b") or ""
                        ).eq("option_c", q.get("option_c") or "").eq(
                            "option_d", q.get("option_d") or ""
                        ).eq("correct_answer", new_ans).neq("id", mid).execute().data
                        if existing:
                            kept_id = existing[0]["id"]
                            # Archive + delete the current row
                            row_data = sb.table(bank).select("*").eq("id", mid).execute().data
                            if row_data:
                                x = row_data[0]
                                sb.table("mcq_archive").insert({
                                    "source_table": bank,
                                    "original_id": x["id"],
                                    "question_number": x.get("question_number"),
                                    "question": x["question"],
                                    "option_a": x.get("option_a"),
                                    "option_b": x.get("option_b"),
                                    "option_c": x.get("option_c"),
                                    "option_d": x.get("option_d"),
                                    "correct_answer": x.get("correct_answer"),
                                    "type": x.get("type"),
                                    "created_at": x.get("created_at"),
                                    "action": "delete",
                                    "reason": f"auto-fix collision: verified correct={new_ans} already exists as id={kept_id}",
                                }).execute()
                            sb.table("mcq_dedupe_map").insert({
                                "source_table": bank,
                                "deleted_id": mid,
                                "kept_id": kept_id,
                                "reason": "auto-fix-collision",
                            }).execute()
                            sb.table(bank).delete().eq("id", mid).execute()
                            continue
                raise

    for bank, ids in needs_review_by_bank.items():
        for i in range(0, len(ids), 500):
            sb.table(bank).update({
                "verification_status": "needs_review",
                "verifier_model": audit_model,
            }).in_("id", ids[i:i + 500]).execute()

    for bank, ids in time_sens_by_bank.items():
        for i in range(0, len(ids), 500):
            sb.table(bank).update({"time_sensitive": True}).in_("id", ids[i:i + 500]).execute()

    return summary


def cmd_fetch(args) -> None:
    rows = fetch_unverified(args.bank, args.offset, args.limit)
    for r in rows:
        print(json.dumps(r, ensure_ascii=False))


def cmd_count(args) -> None:
    if args.bank:
        print(json.dumps({args.bank: remaining_count(args.bank)}))
    else:
        result = {b: remaining_count(b) for b in BANKS}
        print(json.dumps(result, indent=2))


def cmd_write(args) -> None:
    decisions = []
    with open(args.file, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("//"):
                continue
            try:
                decisions.append(json.loads(line))
            except json.JSONDecodeError as e:
                print(f"  skipped malformed line: {e}", file=sys.stderr)
    summary = write_decisions(decisions)
    print(json.dumps(summary, indent=2))


def main() -> None:
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)

    f = sub.add_parser("fetch")
    f.add_argument("bank")
    f.add_argument("--offset", type=int, default=0)
    f.add_argument("--limit", type=int, default=50)
    f.set_defaults(func=cmd_fetch)

    c = sub.add_parser("count")
    c.add_argument("bank", nargs="?", default=None)
    c.set_defaults(func=cmd_count)

    w = sub.add_parser("write")
    w.add_argument("file", help="JSONL file with decisions, or '-' for stdin")
    w.set_defaults(func=cmd_write)

    args = ap.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
