"""Stage 0: Create pipeline infrastructure tables.

Idempotent — safe to re-run. Creates:
- mcq_archive          : every destructive change is archived here (for rollback)
- mcq_verification     : audit log of every AI verifier call
- mcq_dedupe_map       : deleted_id → kept_id mapping (S1)
- mcq_generation_runs  : per-batch generation metadata (S5)
"""
from __future__ import annotations

from scripts.pipeline.db import pg_query

SQL = r"""
-- 1. Archive of every destructive change (full row + reason).
CREATE TABLE IF NOT EXISTS mcq_archive (
  archive_id      bigserial PRIMARY KEY,
  source_table    text        NOT NULL,
  original_id     bigint      NOT NULL,
  question_number integer,
  question        text        NOT NULL,
  option_a        text,
  option_b        text,
  option_c        text,
  option_d        text,
  correct_answer  character(1),
  type            text,
  created_at      timestamp without time zone,
  action          text        NOT NULL CHECK (action IN ('delete','update')),
  reason          text        NOT NULL,
  archived_at     timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS mcq_archive_source_id_idx
  ON mcq_archive(source_table, original_id);

-- 2. Audit log of every AI verifier call.
CREATE TABLE IF NOT EXISTS mcq_verification (
  id              bigserial PRIMARY KEY,
  source_table    text        NOT NULL,
  mcq_id          bigint      NOT NULL,
  verdict         text        NOT NULL,
  actual_answer   text,                   -- 'A','B','C','D','none_of_options'
  reason          text,
  confidence      real,
  source_ref      text,                   -- citation URL / textbook for web-grounded
  model           text        NOT NULL,
  tier            smallint    NOT NULL,   -- 1=Flash, 2=Sonnet, 3=Web-grounded
  verified_at     timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS mcq_verification_lookup
  ON mcq_verification(source_table, mcq_id, verified_at DESC);

-- 3. Dedupe mapping (S1). Lets us rewrite foreign references to surviving id.
CREATE TABLE IF NOT EXISTS mcq_dedupe_map (
  source_table  text   NOT NULL,
  deleted_id    bigint NOT NULL,
  kept_id       bigint NOT NULL,
  reason        text   NOT NULL DEFAULT 'duplicate',
  mapped_at     timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (source_table, deleted_id)
);
CREATE INDEX IF NOT EXISTS mcq_dedupe_kept_idx
  ON mcq_dedupe_map(source_table, kept_id);

-- 4. Per-batch generation metadata (S5).
CREATE TABLE IF NOT EXISTS mcq_generation_runs (
  id              bigserial PRIMARY KEY,
  exam_slug       text        NOT NULL,
  subject         text        NOT NULL,
  topic           text,
  generator_model text        NOT NULL,
  verifier_model  text,
  prompt_version  text,
  attempts        integer     NOT NULL DEFAULT 0,
  accepted        integer     NOT NULL DEFAULT 0,
  rejected_dedupe integer     NOT NULL DEFAULT 0,
  rejected_verify integer     NOT NULL DEFAULT 0,
  rejected_style  integer     NOT NULL DEFAULT 0,
  cost_usd        numeric(10,4) NOT NULL DEFAULT 0,
  started_at      timestamptz NOT NULL DEFAULT now(),
  finished_at     timestamptz
);
"""


def main() -> None:
    for i, stmt in enumerate(
        [s.strip() for s in SQL.split(";\n\n") if s.strip()]
    ):
        if not stmt.endswith(";"):
            stmt += ";"
        pg_query(stmt)
    rows = pg_query(
        """SELECT table_name FROM information_schema.tables
           WHERE table_schema='public'
             AND table_name IN
               ('mcq_archive','mcq_verification','mcq_dedupe_map','mcq_generation_runs')
           ORDER BY table_name;"""
    )
    print("Tables present:", [r["table_name"] for r in rows])


if __name__ == "__main__":
    main()
