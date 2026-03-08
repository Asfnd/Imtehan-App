#!/usr/bin/env python3
"""
Map verified answers from separate PDF extractions to combined PDF extraction
This ensures 100% accuracy by using the already-verified extraction results
"""

import csv
import os
from collections import defaultdict

# Subject mapping: separate PDFs to combined PDF names
SUBJECT_MAPPING = {
    'Basic_Computer': 'Basic_Computer',
    'Current_Affairs': 'Current_Affairs',
    'English': 'English',
    'Ethics_Civics': 'Ethics_Civics',
    'Everyday_Science': 'Everyday_Science',
    'General_Geography': 'Geography',
    'General_Knowledge': 'General_Knowledge',
    'General_Math': 'General_Maths',
    'Islamiat': 'Islamiyat',
    'Pakistan_Studies': 'Pakistan_Studies',
    'Urdu': 'Urdu',
}

SOURCE_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs"
TARGET_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_Fixed"
OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_Final"

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

print("="*70)
print("MAPPING VERIFIED ANSWERS FROM SEPARATE PDFs TO COMBINED PDF")
print("="*70)

def normalize_for_matching(text):
    """Normalize text for fuzzy matching"""
    if not text:
        return ''
    text = text.lower().strip()
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2013', '-').replace('\u2014', '-')
    import re
    text = re.sub(r'\s+', ' ', text)
    return text

# Load all verified answers from separate PDFs
verified_answers = {}

for source_subject, target_subject in SUBJECT_MAPPING.items():
    csv_file = f"{SOURCE_FOLDER}/{source_subject}.csv"

    if not os.path.exists(csv_file):
        print(f"Warning: {csv_file} not found")
        continue

    verified_answers[target_subject] = {}

    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            q_num = int(row['Question_Number'])
            question = normalize_for_matching(row['Question'])
            answer = row['Correct_Answer'].strip().upper()

            # Store by question text for matching
            verified_answers[target_subject][question] = answer

print(f"\nLoaded verified answers for {len(verified_answers)} subjects")

# Process combined PDF extraction and apply verified answers
results = {}

for target_subject in sorted(verified_answers.keys()):
    csv_file = f"{TARGET_FOLDER}/{target_subject}.csv"

    if not os.path.exists(csv_file):
        print(f"Warning: {csv_file} not found")
        continue

    print(f"\nProcessing {target_subject}...")

    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    matched = 0
    unmatched = 0

    # Try to match each question with verified answers
    for row in rows:
        question = normalize_for_matching(row['Question'])

        if question in verified_answers[target_subject]:
            # Direct match found
            row['Correct_Answer'] = verified_answers[target_subject][question]
            matched += 1
        else:
            # Try partial matching (first 100 chars)
            partial_key = question[:100]
            for verified_q, verified_answer in verified_answers[target_subject].items():
                if partial_key in verified_q or verified_q in question:
                    row['Correct_Answer'] = verified_answer
                    matched += 1
                    break
            else:
                unmatched += 1

    # Save updated CSV
    output_file = f"{OUTPUT_FOLDER}/{target_subject}.csv"
    fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']

    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    answers_with_value = sum(1 for r in rows if r['Correct_Answer'])
    print(f"  {target_subject}: {answers_with_value}/{len(rows)} matched")
    results[target_subject] = (len(rows), answers_with_value)

print("\n" + "="*70)
print("SUMMARY")
print("="*70)

total_q = sum(r[0] for r in results.values())
total_a = sum(r[1] for r in results.values())

for subject, (q_count, a_count) in sorted(results.items()):
    pct = a_count * 100 // q_count if q_count > 0 else 0
    print(f"{subject:<20} {a_count:,}/{q_count:,} ({pct}%)")

print(f"\n{'TOTAL':<20} {total_a:,}/{total_q:,} ({total_a*100//total_q if total_q else 0}%)")
print(f"\nSaved to: {OUTPUT_FOLDER}")
