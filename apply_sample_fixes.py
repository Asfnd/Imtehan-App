#!/usr/bin/env python3
"""
Apply fixes for all sampled errors found
"""

import csv
import os
from collections import defaultdict

CSV_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_Final"
ERROR_FILE = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/SAMPLE_ERRORS.csv"
OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_CORRECTED"

# Load all errors
errors = {}
with open(ERROR_FILE, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        key = (row['subject'], int(row['q_num']))
        errors[key] = row['pdf_answer']

print("="*70)
print(f"APPLYING {len(errors)} FIXES TO CSVs")
print("="*70)

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

subjects = [
    'General_Knowledge', 'Pakistan_Studies', 'Everyday_Science', 'Islamiyat',
    'Current_Affairs', 'English', 'Basic_Computer', 'Geography', 'Urdu',
    'Ethics_Civics', 'General_Maths'
]

total_fixes = 0

for subject in subjects:
    csv_file = f"{CSV_FOLDER}/{subject}.csv"
    output_file = f"{OUTPUT_FOLDER}/{subject}.csv"

    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    fixes_applied = 0
    for row in rows:
        q_num = int(row['Question_Number'])
        key = (subject, q_num)

        if key in errors:
            old_answer = row['Correct_Answer']
            new_answer = errors[key]
            row['Correct_Answer'] = new_answer
            fixes_applied += 1
            print(f"  {subject} Q{q_num}: {old_answer} → {new_answer}")

    total_fixes += fixes_applied

    # Write fixed CSV
    fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    if fixes_applied > 0:
        print(f"\n{subject}: {fixes_applied} answers fixed")
    else:
        print(f"{subject}: no fixes needed")

print("\n" + "="*70)
print(f"TOTAL FIXES APPLIED: {total_fixes}")
print(f"Fixed CSVs saved to: {OUTPUT_FOLDER}")
print("="*70)

# Summary
print("\nSummary by subject:")
for subject in subjects:
    subject_errors = [e for e in errors if e[0] == subject]
    if subject_errors:
        print(f"  {subject}: {len(subject_errors)} fixes")
