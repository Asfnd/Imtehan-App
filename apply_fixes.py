#!/usr/bin/env python3
"""
Apply fixes to incorrect answers based on error report
"""

import csv
import os
from collections import defaultdict

CSV_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_Final"
ERROR_FILE = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/ERRORS_TO_FIX.csv"
OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_FIXED"

def apply_fixes():
    """Apply all fixes from error report"""

    if not os.path.exists(ERROR_FILE):
        print(f"Error file not found: {ERROR_FILE}")
        print("Run detailed_error_report.py first")
        return

    # Load errors
    errors_by_q = {}
    with open(ERROR_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            key = (row['subject'], int(row['q_num']))
            errors_by_q[key] = row['pdf_answer']

    print("="*70)
    print(f"APPLYING FIXES: {len(errors_by_q)} corrections")
    print("="*70)

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    subjects = [
        'General_Knowledge', 'Pakistan_Studies', 'Everyday_Science', 'Islamiyat',
        'Current_Affairs', 'English', 'Basic_Computer', 'Geography', 'Urdu',
        'Ethics_Civics', 'General_Maths'
    ]

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

            if key in errors_by_q:
                old_answer = row['Correct_Answer']
                new_answer = errors_by_q[key]
                row['Correct_Answer'] = new_answer
                fixes_applied += 1

        # Write fixed CSV
        fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
        with open(output_file, 'w', encoding='utf-8', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

        if fixes_applied > 0:
            print(f"{subject}: {fixes_applied} answers fixed")
        else:
            print(f"{subject}: no fixes needed")

    print("\n" + "="*70)
    print(f"Fixed CSVs saved to: {OUTPUT_FOLDER}")
    print("="*70)

if __name__ == "__main__":
    apply_fixes()
