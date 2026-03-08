#!/usr/bin/env python3
"""
Engineering MCQ Import Script
Reads all CSVs from Engineering_Master_Bank and bulk-inserts into Supabase.

Split logic per (topic, target_exam):
  First 30%  → type = 'most_important'
  Next  30%  → type = 'most_repeated'
  Last  40%  → type = 'practice'

Usage:
  pip install supabase python-dotenv
  SUPABASE_URL=... SUPABASE_SERVICE_KEY=... python scripts/import-engineering.py
  OR: place .env.local in project root with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
"""

import csv
import os
import sys
import math
import time
from pathlib import Path

# ── Load env ──────────────────────────────────────────────────────────────────
try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).parent.parent / '.env.local')
except ImportError:
    pass  # dotenv optional if env vars are already set

SUPABASE_URL = os.environ.get('NEXT_PUBLIC_SUPABASE_URL') or os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY') or os.environ.get('SUPABASE_SERVICE_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("ERROR: Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local")
    sys.exit(1)

try:
    from supabase import create_client
except ImportError:
    print("ERROR: Run: pip install supabase")
    sys.exit(1)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ── Config ────────────────────────────────────────────────────────────────────
BASE_DIR = Path(__file__).parent.parent / 'Engineering_Master_Bank'
BATCH_SIZE = 500  # rows per Supabase insert

# CSV Subject folder → DB table name
SUBJECT_TABLE_MAP = {
    'Physics':          'engineering_physics',
    'Mathematics':      'engineering_mathematics',
    'Chemistry':        'engineering_chemistry',
    'Computer_Science': 'engineering_computer_science',
    'English':          'engineering_english',
    'Intelligence':     'engineering_intelligence',
}

VALID_EXAMS = {'NET', 'ECAT', 'GIKI_PIEAS', 'LUMS_SAT'}

# ── Helpers ───────────────────────────────────────────────────────────────────
def assign_type(index: int, total: int) -> str:
    """Assign type based on row position within (topic, exam) group."""
    pct = index / total
    if pct < 0.30:
        return 'most_important'
    elif pct < 0.60:
        return 'most_repeated'
    else:
        return 'practice'

def insert_batch(table: str, rows: list, attempt: int = 1):
    """Insert a batch with simple retry."""
    try:
        supabase.table(table).insert(rows).execute()
    except Exception as e:
        if attempt < 3:
            print(f"    Retry {attempt} for {table}...")
            time.sleep(2 ** attempt)
            insert_batch(table, rows, attempt + 1)
        else:
            raise e

# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    total_inserted = 0
    total_skipped  = 0

    for subject_folder, table_name in SUBJECT_TABLE_MAP.items():
        subject_path = BASE_DIR / subject_folder
        if not subject_path.exists():
            print(f"SKIP: {subject_folder} folder not found")
            continue

        print(f"\n{'='*60}")
        print(f"Processing {subject_folder} → {table_name}")
        print(f"{'='*60}")

        subject_rows = []

        for topic_folder in sorted(subject_path.iterdir()):
            if not topic_folder.is_dir():
                continue
            csv_path = topic_folder / 'mcqs.csv'
            if not csv_path.exists():
                continue

            topic_name = topic_folder.name.replace('_', ' ')

            # Read all rows for this topic, group by target_exam
            by_exam: dict[str, list] = {}
            with open(csv_path, encoding='utf-8-sig') as f:
                for row in csv.DictReader(f):
                    exam = row.get('Target_exam', '').strip()
                    if exam not in VALID_EXAMS:
                        total_skipped += 1
                        continue
                    if exam not in by_exam:
                        by_exam[exam] = []
                    by_exam[exam].append(row)

            # Assign types within each (topic, exam) group
            for exam, rows in by_exam.items():
                total = len(rows)
                for i, row in enumerate(rows):
                    q = row.get('Question', '').strip()
                    a = row.get('Option_a', '').strip()
                    b = row.get('Option_b', '').strip()
                    c = row.get('Option_c', '').strip()
                    d = row.get('Option_d', '').strip()
                    ans = row.get('Correct_answer', '').strip().upper()
                    exp = row.get('Explanation', '').strip()

                    # Skip blank/invalid rows
                    if not q or not a or not b or not c or not d or ans not in 'ABCD':
                        total_skipped += 1
                        continue

                    subject_rows.append({
                        'question':       q,
                        'option_a':       a,
                        'option_b':       b,
                        'option_c':       c,
                        'option_d':       d,
                        'correct_answer': ans,
                        'explanation':    exp or 'See correct answer.',
                        'topic':          topic_name,
                        'difficulty':     'Medium',
                        'type':           assign_type(i, total),
                        'target_exam':    exam,
                    })

        # Insert in batches
        print(f"  Inserting {len(subject_rows)} rows in batches of {BATCH_SIZE}...")
        for i in range(0, len(subject_rows), BATCH_SIZE):
            batch = subject_rows[i:i + BATCH_SIZE]
            insert_batch(table_name, batch)
            total_inserted += len(batch)
            print(f"  ✓ {min(i + BATCH_SIZE, len(subject_rows))}/{len(subject_rows)}")

    print(f"\n{'='*60}")
    print(f"DONE: {total_inserted} rows inserted, {total_skipped} skipped")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
