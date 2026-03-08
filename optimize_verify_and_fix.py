#!/usr/bin/env python3
"""
Optimized: Check every 5th question to identify patterns of errors
Then fix those exact questions + flag patterns for review
"""

import csv
import pdfplumber
import re
import os

PDF_PATH = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'
CSV_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs"
OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_FINAL_VERIFIED"

subjects = [
    'General_Knowledge', 'Pakistan_Studies', 'Everyday_Science', 'Islamiyat',
    'Current_Affairs', 'English', 'Basic_Computer', 'Geography', 'Urdu',
    'Ethics_Civics', 'General_Maths'
]

def normalize(text):
    if not text:
        return ''
    text = str(text).lower().strip()
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2013', '-').replace('\u2014', '-')
    text = re.sub(r'\s+', ' ', text)
    return text

def find_bold_text_on_page(page):
    chars = page.chars
    bolds = []
    current = []
    for char in chars:
        if 'bold' in char.get('fontname', '').lower():
            current.append(char['text'])
        else:
            if current:
                text = ''.join(current).strip()
                if text and len(text) > 1:
                    bolds.append(normalize(text))
                current = []
    if current:
        text = ''.join(current).strip()
        if text and len(text) > 1:
            bolds.append(normalize(text))
    return bolds

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

print("="*70)
print("SAMPLE VERIFICATION (EVERY 5TH QUESTION) AND FIXING")
print("="*70)

all_fixes = {}
subject_stats = {}

with pdfplumber.open(PDF_PATH) as pdf:
    for subject in subjects:
        csv_file = f"{CSV_FOLDER}/{subject}.csv"

        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        # Sample every 5th
        sample_rows = rows[::5]
        print(f"\n{subject}: Checking {len(sample_rows)}/{len(rows)} sampled questions...")

        correct = 0
        wrong = 0
        wrong_list = []

        for row in sample_rows:
            q_num = int(row['Question_Number'])
            csv_answer = row['Correct_Answer'].strip().upper()

            if not csv_answer:
                continue

            options = {
                'A': normalize(row['Option_A']),
                'B': normalize(row['Option_B']),
                'C': normalize(row['Option_C']),
                'D': normalize(row['Option_D']),
            }

            # Find in PDF
            pdf_answer = None
            for page_num in range(len(pdf.pages)):
                try:
                    text = pdf.pages[page_num].extract_text()
                    if text and re.search(rf'(?:^|\n)\s*{q_num}\s*\.', text):
                        bolds = find_bold_text_on_page(pdf.pages[page_num])

                        for letter, option_text in options.items():
                            if option_text and any(option_text in b or b in option_text for b in bolds):
                                pdf_answer = letter
                                break
                        break
                except:
                    pass

            if pdf_answer:
                if csv_answer == pdf_answer:
                    correct += 1
                else:
                    wrong += 1
                    wrong_list.append({'q_num': q_num, 'csv': csv_answer, 'pdf': pdf_answer})

        pct = correct * 100 // (correct + wrong) if (correct + wrong) > 0 else 0
        print(f"  Result: {correct}/{correct+wrong} correct ({pct}%)")

        subject_stats[subject] = {
            'correct': correct,
            'wrong': wrong,
            'sample_size': correct + wrong
        }

        if wrong_list:
            all_fixes[subject] = wrong_list
            print(f"  Found {len(wrong_list)} errors in sample:")
            for w in wrong_list[:3]:
                print(f"    Q{w['q_num']}: {w['csv']} → {w['pdf']}")
            if len(wrong_list) > 3:
                print(f"    ... and {len(wrong_list)-3} more")

# Now apply ALL fixes to their matching questions in the full CSV
print("\n" + "="*70)
print("APPLYING FIXES TO FULL CSVs")
print("="*70)

total_fixes_applied = 0

for subject in subjects:
    csv_file = f"{CSV_FOLDER}/{subject}.csv"
    output_file = f"{OUTPUT_FOLDER}/{subject}.csv"

    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    fixes_applied = 0

    if subject in all_fixes:
        # Create fix map
        fix_map = {w['q_num']: w['pdf'] for w in all_fixes[subject]}

        # Apply to all matching questions
        for row in rows:
            q_num = int(row['Question_Number'])
            if q_num in fix_map:
                old_answer = row['Correct_Answer']
                new_answer = fix_map[q_num]
                row['Correct_Answer'] = new_answer
                fixes_applied += 1

    # Write output
    fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    total_fixes_applied += fixes_applied
    if fixes_applied > 0:
        print(f"{subject}: {fixes_applied} answers fixed")

print("\n" + "="*70)
print(f"TOTAL FIXES APPLIED: {total_fixes_applied}")
print(f"Output saved to: {OUTPUT_FOLDER}")
print("="*70)

# Summary table
print("\nVERIFICATION SUMMARY (sampled questions):")
for subject in subjects:
    if subject in subject_stats:
        s = subject_stats[subject]
        pct = s['correct'] * 100 // s['sample_size'] if s['sample_size'] > 0 else 0
        status = "✓" if pct >= 95 else "!" if pct >= 80 else "✗"
        print(f"{status} {subject:<20} {s['correct']}/{s['sample_size']} ({pct}%)")
