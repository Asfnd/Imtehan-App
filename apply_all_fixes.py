#!/usr/bin/env python3
"""
Apply ALL 407 fixes from comprehensive verification
"""

import csv
import os
import shutil

CSV_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs"
ERROR_FILE = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/ERRORS_TO_FIX.csv"
OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_COMPREHENSIVE_FIXED"

# Load ALL errors
print("="*70)
print("LOADING ALL ERRORS FROM COMPREHENSIVE VERIFICATION")
print("="*70)

errors = {}
subject_errors = {}

with open(ERROR_FILE, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        key = (row['subject'], int(row['q_num']))
        errors[key] = row['pdf_answer']

        if row['subject'] not in subject_errors:
            subject_errors[row['subject']] = 0
        subject_errors[row['subject']] += 1

print(f"Loaded {len(errors)} total errors\n")
for subject, count in sorted(subject_errors.items(), key=lambda x: x[1], reverse=True):
    print(f"  {subject}: {count} errors")

print("\n" + "="*70)
print("APPLYING ALL FIXES TO CSVs")
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
    fix_details = []

    for row in rows:
        q_num = int(row['Question_Number'])
        key = (subject, q_num)

        if key in errors:
            old_answer = row['Correct_Answer']
            new_answer = errors[key]
            row['Correct_Answer'] = new_answer
            fixes_applied += 1
            fix_details.append(f"    Q{q_num}: {old_answer} → {new_answer}")

    total_fixes += fixes_applied

    # Write fixed CSV
    fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    if fixes_applied > 0:
        print(f"\n{subject}: {fixes_applied} answers fixed")
        # Show first 5 fixes
        for detail in fix_details[:5]:
            print(detail)
        if len(fix_details) > 5:
            print(f"    ... and {len(fix_details) - 5} more")
    else:
        print(f"{subject}: no fixes needed")

print("\n" + "="*70)
print(f"TOTAL FIXES APPLIED: {total_fixes}")
print(f"Fixed CSVs saved to: {OUTPUT_FOLDER}")
print("="*70)

# Replace final folder
print("\nUpdating final output folder...")
FINAL = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs"
if os.path.exists(FINAL):
    shutil.rmtree(FINAL)
shutil.copytree(OUTPUT_FOLDER, FINAL)

print(f"✓ Updated: {FINAL}")
