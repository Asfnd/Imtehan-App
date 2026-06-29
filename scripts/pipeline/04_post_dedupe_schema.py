"""S1 cleanup + schema for S3/S4/S5.

1. Rewrite question_reports.question_id from deleted ids to the kept survivor.
2. Add verification + tagging columns to each subject bank.
3. Add GIN index on target_exams (so .contains([slug]) is fast).
"""
from __future__ import annotations

from scripts.pipeline.db import pg_query

BANKS = [
    "current_affairs", "ethics_civics", "geography", "urdu", "english",
    "general_math", "islamiat", "basic_computer", "pakistan_studies",
    "general_knowledge", "everyday_science",
]


def add_columns(bank: str) -> None:
    pg_query(
        f"""
        ALTER TABLE {bank}
          ADD COLUMN IF NOT EXISTS target_exams         text[]      NOT NULL DEFAULT '{{}}'::text[],
          ADD COLUMN IF NOT EXISTS verified_at          timestamptz,
          ADD COLUMN IF NOT EXISTS verification_status  text        NOT NULL DEFAULT 'unverified',
          ADD COLUMN IF NOT EXISTS verifier_model       text,
          ADD COLUMN IF NOT EXISTS time_sensitive       boolean     NOT NULL DEFAULT false,
          ADD COLUMN IF NOT EXISTS generated_by         text,
          ADD COLUMN IF NOT EXISTS source_topic         text,
          ADD COLUMN IF NOT EXISTS source_ref           text,
          ADD COLUMN IF NOT EXISTS style_score          smallint;
        CREATE INDEX IF NOT EXISTS {bank}_target_exams_idx ON {bank} USING gin(target_exams);
        CREATE INDEX IF NOT EXISTS {bank}_verification_status_idx ON {bank}(verification_status);
        """
    )


def rewrite_question_reports() -> int:
    """Point question_reports.question_id at the surviving row for any deleted id.

    The subject field in question_reports is messy (e.g. 'current-affairs',
    'Current Affairs', 'Pakistan Affairs'). We don't filter by subject — we
    just rewrite any question_id that appears as a deleted_id in the dedupe map,
    regardless of source_table. Collisions are not a concern because each id is
    unique within its bank, and a single report row points at exactly one bank.
    """
    rows = pg_query(
        """
        WITH map AS (
          SELECT DISTINCT ON (deleted_id) deleted_id, kept_id
          FROM mcq_dedupe_map
        ),
        upd AS (
          UPDATE question_reports r
             SET question_id = m.kept_id
            FROM map m
           WHERE r.question_id = m.deleted_id
          RETURNING r.id
        )
        SELECT count(*) AS n FROM upd;
        """
    )
    return int(rows[0]["n"])


def main() -> None:
    print("== S1 cleanup ==")
    rewritten = rewrite_question_reports()
    print(f"question_reports.question_id rewrites: {rewritten}")

    print("\n== schema columns + indexes ==")
    for b in BANKS:
        add_columns(b)
        print(f"  [{b}] columns + indexes ready")

    # Verify
    rows = pg_query(
        """SELECT table_name, column_name FROM information_schema.columns
           WHERE table_schema='public'
             AND column_name IN ('target_exams','verified_at','verification_status','time_sensitive','generated_by')
           ORDER BY table_name, column_name;"""
    )
    by_table: dict[str, list[str]] = {}
    for r in rows:
        by_table.setdefault(r["table_name"], []).append(r["column_name"])
    print("\n== verification ==")
    for t, cols in sorted(by_table.items()):
        if t in BANKS:
            print(f"  {t:<20} cols: {sorted(cols)}")


if __name__ == "__main__":
    main()
