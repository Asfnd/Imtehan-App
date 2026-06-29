"""S4 — Authoritative per-exam tagging from extracted past-paper CSVs.

For each CSV folder we know the originating commission/exam set. We exact-match
each CSV row against the deduped DB and append the relevant exam slugs to
target_exams[].

Per the README files:
  PPSC_*_MCQs/  are used as the canonical past-paper bank for PPSC and shared
                with CSS MPT and PMS Competitive (PMS_*_MCQs folders are legacy
                placeholders).

Subject-CSV → DB-table mapping is the standard set; minor filename variants are
covered (General_Maths vs General_Math, Islamiyat vs Islamiat, etc.).
"""
from __future__ import annotations

import csv
import sys
from pathlib import Path

from scripts.pipeline.db import pg_query, sb

ROOT = Path(__file__).resolve().parents[2]

# (folder, exam_slugs_to_add)
SOURCES = [
    ("PPSC_Extracted_MCQs",       ["ppsc", "css-mpt", "pms-competitive"]),
    ("PPSC_Most_Repeated_MCQs",   ["ppsc", "css-mpt", "pms-competitive"]),
    ("PPSC_MOST_IMPORTANT_MCQS",  ["ppsc", "css-mpt", "pms-competitive"]),
]

# Filename stem → DB table
SUBJECT_MAP = {
    "Basic_Computer":      "basic_computer",
    "Current_Affairs":     "current_affairs",
    "English":             "english",
    "Ethics_Civics":       "ethics_civics",
    "Everyday_Science":    "everyday_science",
    "General_Knowledge":   "general_knowledge",
    "General_Math":        "general_math",
    "General_Maths":       "general_math",
    "General_Geography":   "geography",
    "Geography":           "geography",
    "Islamiat":            "islamiat",
    "Islamiyat":           "islamiat",
    "Pakistan_Studies":    "pakistan_studies",
    "Urdu":                "urdu",
}


def load_csv_rows(path: Path) -> list[dict]:
    out = []
    with path.open(encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            q = (row.get("Question") or "").strip()
            if not q:
                continue
            out.append({
                "question": q,
                "option_a": (row.get("Option_A") or "").strip(),
                "option_b": (row.get("Option_B") or "").strip(),
                "option_c": (row.get("Option_C") or "").strip(),
                "option_d": (row.get("Option_D") or "").strip(),
                "correct_answer": (row.get("Correct_Answer") or "").strip()[:1].upper(),
            })
    return out


def make_hash_payload(rows: list[dict]) -> list[tuple[str, list[str]]]:
    """Compute the md5 key matching the DB unique index, paired with slugs."""
    # The unique index hashes:
    #   COALESCE(question,'') || '|' || COALESCE(option_a,'') || '|' || ... || correct_answer
    out = []
    for r in rows:
        key = (
            (r["question"] or "") + "|" +
            (r["option_a"] or "") + "|" +
            (r["option_b"] or "") + "|" +
            (r["option_c"] or "") + "|" +
            (r["option_d"] or "") + "|" +
            (r["correct_answer"] or "")
        )
        out.append(key)
    return out


def tag_bank(bank: str, csv_keys: list[str], slugs: list[str]) -> dict:
    """Apply slugs to every row in `bank` whose key matches an entry in csv_keys.

    Uses a temp staging table because passing 850+ keys in a VALUES list is fine
    but >5000 rows causes statement-size issues. We instead load to a temp table
    and JOIN.
    """
    if not csv_keys:
        return {"matched": 0, "updated": 0}

    # Build a single UPDATE using ANY (VALUES (...)) which Postgres handles fine
    # for ~10k strings. For safety chunk it.
    CHUNK = 2000
    total_updated = 0
    total_matched = 0
    slug_array = "ARRAY[" + ",".join(f"'{s}'" for s in slugs) + "]::text[]"

    for i in range(0, len(csv_keys), CHUNK):
        chunk = csv_keys[i:i + CHUNK]
        values = ",".join(
            "($$" + k.replace("$$", "$$ || chr(36) || chr(36) || $$") + "$$)"
            for k in chunk
        )
        sql = f"""
        WITH src(k) AS (VALUES {values}),
        keyed AS (
          SELECT md5(k) AS h FROM src
        ),
        upd AS (
          UPDATE {bank} b
             SET target_exams = (
               SELECT array_agg(DISTINCT x ORDER BY x)
                 FROM unnest(b.target_exams || {slug_array}) AS x
             )
            FROM keyed k
           WHERE md5(
             COALESCE(b.question,'') || '|' ||
             COALESCE(b.option_a,'') || '|' ||
             COALESCE(b.option_b,'') || '|' ||
             COALESCE(b.option_c,'') || '|' ||
             COALESCE(b.option_d,'') || '|' ||
             COALESCE(b.correct_answer,'')
           ) = k.h
          RETURNING b.id
        )
        SELECT (SELECT count(*) FROM keyed) AS keys_in,
               (SELECT count(*) FROM upd)   AS updated;
        """
        r = pg_query(sql)
        total_matched += int(r[0]["keys_in"])
        total_updated += int(r[0]["updated"])

    return {"matched": total_matched, "updated": total_updated}


def main() -> None:
    print("== S4 authoritative tagging from past-paper CSVs ==\n")
    grand_seen = grand_tagged = 0

    # Group CSV rows by bank across all source folders.
    # We tag each (bank, slug-set) at once so we minimize round trips.
    for folder, slugs in SOURCES:
        folder_path = ROOT / folder
        if not folder_path.is_dir():
            print(f"  [skip] {folder} not found")
            continue
        print(f"  [{folder}] → slugs={slugs}")

        for csv_path in sorted(folder_path.glob("*.csv")):
            stem = csv_path.stem
            bank = SUBJECT_MAP.get(stem)
            if not bank:
                print(f"    [skip] {csv_path.name} — no DB mapping")
                continue

            rows = load_csv_rows(csv_path)
            keys = make_hash_payload(rows)
            r = tag_bank(bank, keys, slugs)
            grand_seen += r["matched"]
            grand_tagged += r["updated"]
            print(f"    [{csv_path.name:<30}] → {bank:<18}  csv_rows={len(rows):>4}  tagged={r['updated']:>5}")

    print()
    print(f"== summary: csv_rows_seen={grand_seen}  rows_tagged={grand_tagged} ==")

    # Show distribution after tagging
    print()
    print("== target_exams distribution per bank ==")
    rows = pg_query(
        """
        SELECT bank, exam_slug, count(*) AS n FROM (
          SELECT 'current_affairs'  AS bank, unnest(target_exams) AS exam_slug FROM current_affairs WHERE array_length(target_exams,1) > 0
          UNION ALL SELECT 'pakistan_studies',  unnest(target_exams) FROM pakistan_studies   WHERE array_length(target_exams,1) > 0
          UNION ALL SELECT 'general_knowledge', unnest(target_exams) FROM general_knowledge  WHERE array_length(target_exams,1) > 0
          UNION ALL SELECT 'english',           unnest(target_exams) FROM english            WHERE array_length(target_exams,1) > 0
          UNION ALL SELECT 'islamiat',          unnest(target_exams) FROM islamiat           WHERE array_length(target_exams,1) > 0
          UNION ALL SELECT 'everyday_science',  unnest(target_exams) FROM everyday_science   WHERE array_length(target_exams,1) > 0
          UNION ALL SELECT 'basic_computer',    unnest(target_exams) FROM basic_computer     WHERE array_length(target_exams,1) > 0
          UNION ALL SELECT 'general_math',      unnest(target_exams) FROM general_math       WHERE array_length(target_exams,1) > 0
          UNION ALL SELECT 'urdu',              unnest(target_exams) FROM urdu               WHERE array_length(target_exams,1) > 0
          UNION ALL SELECT 'geography',         unnest(target_exams) FROM geography          WHERE array_length(target_exams,1) > 0
          UNION ALL SELECT 'ethics_civics',     unnest(target_exams) FROM ethics_civics      WHERE array_length(target_exams,1) > 0
        ) sub
        GROUP BY bank, exam_slug
        ORDER BY bank, exam_slug;
        """
    )
    for r in rows:
        print(f"  {r['bank']:<20} {r['exam_slug']:<20} {r['n']:>5}")


if __name__ == "__main__":
    main()
