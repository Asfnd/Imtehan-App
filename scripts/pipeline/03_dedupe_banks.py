"""S1 — Strict-key dedupe across all 11 subject banks.

For each bank:
  1. Pick the surviving row per duplicate group using priority:
       type='most_repeated' > 'most_important' > 'practice' > anything else,
       then min(id) as tiebreaker. This preserves the highest-priority tag.
  2. Archive every losing row to mcq_archive (action='delete', reason='duplicate').
  3. Record (deleted_id → kept_id) in mcq_dedupe_map for foreign-key rewrites.
  4. Delete the losing rows.
  5. Build a hash column + unique index so future imports cannot re-introduce
     duplicate (question, options A-D, correct_answer) tuples.

All steps for one bank run inside a single SQL statement = atomic per bank.
Banks process sequentially in ascending size to fail fast on the smallest first.

Usage:
  python -m scripts.pipeline.03_dedupe_banks                # all banks
  python -m scripts.pipeline.03_dedupe_banks current_affairs  # just one
  python -m scripts.pipeline.03_dedupe_banks --dry           # plan only, no writes
"""
from __future__ import annotations

import sys

from scripts.pipeline.db import pg_query

BANKS_BY_SIZE = [
    "ethics_civics",     # 5,166
    "geography",         # 6,024
    "urdu",              # 6,786
    "english",           # 9,159
    "general_math",      # 10,512
    "islamiat",          # 15,861
    "basic_computer",    # 16,230
    "pakistan_studies",  # 35,946
    "general_knowledge", # 43,548
    "everyday_science",  # 48,255
    "current_affairs",   # 4,464 — pilot first (smallest, highest user pain)
]

# Process current_affairs first (pilot), then by size ascending.
ORDERED = ["current_affairs"] + [b for b in BANKS_BY_SIZE if b != "current_affairs"]


def preview(bank: str) -> dict:
    rows = pg_query(
        f"""
        WITH ranked AS (
          SELECT id, type,
                 row_number() OVER (
                   PARTITION BY question, COALESCE(option_a,''), COALESCE(option_b,''),
                                COALESCE(option_c,''), COALESCE(option_d,''),
                                COALESCE(correct_answer,'?')
                   ORDER BY CASE type
                              WHEN 'most_repeated'  THEN 1
                              WHEN 'most_important' THEN 2
                              WHEN 'practice'       THEN 3
                              ELSE 4
                            END, id
                 ) AS rn
          FROM {bank}
        )
        SELECT
          (SELECT count(*) FROM {bank})        AS rows_total,
          (SELECT count(*) FROM ranked WHERE rn = 1) AS rows_keep,
          (SELECT count(*) FROM ranked WHERE rn > 1) AS rows_drop;
        """
    )
    return rows[0]


def dedupe(bank: str) -> dict:
    rows = pg_query(
        f"""
        WITH ranked AS (
          SELECT id, type, question, option_a, option_b, option_c, option_d,
                 correct_answer, question_number, created_at,
                 row_number() OVER (
                   PARTITION BY question, COALESCE(option_a,''), COALESCE(option_b,''),
                                COALESCE(option_c,''), COALESCE(option_d,''),
                                COALESCE(correct_answer,'?')
                   ORDER BY CASE type
                              WHEN 'most_repeated'  THEN 1
                              WHEN 'most_important' THEN 2
                              WHEN 'practice'       THEN 3
                              ELSE 4
                            END, id
                 ) AS rn,
                 first_value(id) OVER (
                   PARTITION BY question, COALESCE(option_a,''), COALESCE(option_b,''),
                                COALESCE(option_c,''), COALESCE(option_d,''),
                                COALESCE(correct_answer,'?')
                   ORDER BY CASE type
                              WHEN 'most_repeated'  THEN 1
                              WHEN 'most_important' THEN 2
                              WHEN 'practice'       THEN 3
                              ELSE 4
                            END, id
                 ) AS keep_id
          FROM {bank}
        ),
        losers AS (
          SELECT id, keep_id, question_number, question,
                 option_a, option_b, option_c, option_d,
                 correct_answer, type, created_at
          FROM ranked WHERE rn > 1
        ),
        archived AS (
          INSERT INTO mcq_archive (
            source_table, original_id, question_number, question,
            option_a, option_b, option_c, option_d, correct_answer,
            type, created_at, action, reason
          )
          SELECT '{bank}', id, question_number, question,
                 option_a, option_b, option_c, option_d, correct_answer,
                 type, created_at, 'delete', 'duplicate (S1 dedupe)'
          FROM losers
          RETURNING original_id
        ),
        mapped AS (
          INSERT INTO mcq_dedupe_map (source_table, deleted_id, kept_id, reason)
          SELECT '{bank}', id, keep_id, 'duplicate' FROM losers
          ON CONFLICT (source_table, deleted_id) DO NOTHING
          RETURNING deleted_id
        ),
        deleted AS (
          DELETE FROM {bank}
          WHERE id IN (SELECT id FROM losers)
          RETURNING id
        )
        SELECT
          (SELECT count(*) FROM losers)   AS losers,
          (SELECT count(*) FROM archived) AS archived,
          (SELECT count(*) FROM mapped)   AS mapped,
          (SELECT count(*) FROM deleted)  AS deleted;
        """
    )
    return rows[0]


def add_unique_index(bank: str) -> None:
    pg_query(
        f"""
        CREATE UNIQUE INDEX IF NOT EXISTS {bank}_unique_mcq
        ON {bank} ((md5(
          COALESCE(question,'') || '|' ||
          COALESCE(option_a,'') || '|' ||
          COALESCE(option_b,'') || '|' ||
          COALESCE(option_c,'') || '|' ||
          COALESCE(option_d,'') || '|' ||
          COALESCE(correct_answer,'')
        )));
        """
    )


def remaining_counts() -> list[dict]:
    parts = [
        f"SELECT '{b}' AS bank, count(*)::bigint AS n FROM {b}" for b in ORDERED
    ]
    return pg_query(" UNION ALL ".join(parts) + " ORDER BY bank;")


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    dry = "--dry" in sys.argv
    banks = args if args else ORDERED

    print("== S1 dedupe ==")
    print("Banks:", banks)
    print("Dry-run:", dry)
    print()

    if dry:
        for b in banks:
            p = preview(b)
            print(f"  [{b}] total={p['rows_total']:>7}  keep={p['rows_keep']:>7}  drop={p['rows_drop']:>7}")
        return

    grand_archived = 0
    grand_deleted = 0
    for b in banks:
        p = preview(b)
        if p["rows_drop"] == 0:
            print(f"  [{b}] already deduped (drop=0)  total={p['rows_total']}")
            add_unique_index(b)
            print(f"  [{b}] unique index ensured")
            continue
        print(f"  [{b}] starting  total={p['rows_total']:>7}  drop={p['rows_drop']:>7} ...", flush=True)
        r = dedupe(b)
        print(f"  [{b}] done      archived={r['archived']:>7}  deleted={r['deleted']:>7}  mapped={r['mapped']:>7}")
        grand_archived += int(r["archived"])
        grand_deleted += int(r["deleted"])
        add_unique_index(b)
        print(f"  [{b}] unique index added")

    print()
    print(f"== summary: archived={grand_archived}  deleted={grand_deleted}  ==")
    print()
    print("== remaining counts ==")
    for r in remaining_counts():
        print(f"  {r['bank']:<20} {r['n']:>7}")


if __name__ == "__main__":
    main()
