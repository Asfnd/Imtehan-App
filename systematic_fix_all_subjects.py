#!/usr/bin/env python3
"""
Systematic verification and fixing of each subject
Goes through each subject, identifies incorrect answers, and fixes them
"""

import csv
import pdfplumber
import re
from collections import defaultdict

CSV_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs"
PDF_PATH = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'
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

def verify_answer_detailed(pdf, q_num, options_dict, csv_answer):
    """Verify answer and return detailed info"""
    for page_num in range(len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if text and re.search(rf'(?:^|\n)\s*{q_num}\s*\.', text):
                bolds = find_bold_text_on_page(pdf.pages[page_num])

                pdf_answer = None
                for letter, option_text in options_dict.items():
                    option_norm = normalize(option_text)
                    if option_norm and any(option_norm in b or b in option_norm for b in bolds):
                        pdf_answer = letter
                        break

                if pdf_answer:
                    if normalize(csv_answer) == normalize(pdf_answer):
                        return ('correct', pdf_answer)
                    else:
                        return ('wrong', pdf_answer)
                else:
                    return ('inconclusive', None)
        except:
            pass

    return ('inconclusive', None)

import os
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

print("="*70)
print("SYSTEMATIC VERIFICATION AND FIXING - ALL SUBJECTS")
print("="*70)

# Track all fixes needed
all_fixes = {}
subject_results = {}

with pdfplumber.open(PDF_PATH) as pdf:
    for subject in subjects:
        csv_file = f"{CSV_FOLDER}/{subject}.csv"

        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        print(f"\n{subject}: Checking ALL {len(rows)} questions...")

        # Check every question
        correct = 0
        wrong = 0
        inconclusive = 0
        wrong_questions = []

        for row in rows:
            q_num = int(row['Question_Number'])
            csv_answer = row['Correct_Answer'].strip().upper()

            if not csv_answer:
                inconclusive += 1
                continue

            options = {
                'A': row['Option_A'],
                'B': row['Option_B'],
                'C': row['Option_C'],
                'D': row['Option_D'],
            }

            status, pdf_answer = verify_answer_detailed(pdf, q_num, options, csv_answer)

            if status == 'correct':
                correct += 1
            elif status == 'wrong':
                wrong += 1
                wrong_questions.append({
                    'q_num': q_num,
                    'csv_answer': csv_answer,
                    'pdf_answer': pdf_answer
                })
            else:
                inconclusive += 1

        total = correct + wrong + inconclusive
        pct = correct * 100 // total if total > 0 else 0

        subject_results[subject] = {
            'correct': correct,
            'wrong': wrong,
            'inconclusive': inconclusive,
            'wrong_questions': wrong_questions
        }

        status_icon = "✓" if pct >= 95 else "!" if pct >= 80 else "✗"
        print(f"{status_icon} {subject}: {correct}/{total} correct ({pct}%) - {wrong} to fix")

        # Store fixes
        if wrong_questions:
            all_fixes[subject] = wrong_questions

# Apply all fixes
print("\n" + "="*70)
print("APPLYING ALL FIXES")
print("="*70)

total_fixes_applied = 0

for subject in subjects:
    csv_file = f"{CSV_FOLDER}/{subject}.csv"
    output_file = f"{OUTPUT_FOLDER}/{subject}.csv"

    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    fixes = 0
    if subject in all_fixes:
        # Create fix map
        fix_map = {q['q_num']: q['pdf_answer'] for q in all_fixes[subject]}

        # Apply fixes
        for row in rows:
            q_num = int(row['Question_Number'])
            if q_num in fix_map:
                old_answer = row['Correct_Answer']
                new_answer = fix_map[q_num]
                row['Correct_Answer'] = new_answer
                fixes += 1

    # Write output
    fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    if fixes > 0:
        print(f"{subject}: {fixes} answers fixed")
        total_fixes_applied += fixes
        # Show first 3 fixes
        for q in all_fixes[subject][:3]:
            print(f"  Q{q['q_num']}: {q['csv_answer']} → {q['pdf_answer']}")
        if len(all_fixes[subject]) > 3:
            print(f"  ... and {len(all_fixes[subject]) - 3} more")
    else:
        print(f"{subject}: no fixes needed")

print("\n" + "="*70)
print(f"TOTAL FIXES APPLIED: {total_fixes_applied}")
print(f"Output saved to: {OUTPUT_FOLDER}")
print("="*70)

# Summary
print("\nSUMMARY BY SUBJECT:")
for subject in subjects:
    if subject in subject_results:
        res = subject_results[subject]
        pct = res['correct'] * 100 // (res['correct'] + res['wrong'] + res['inconclusive']) if (res['correct'] + res['wrong'] + res['inconclusive']) > 0 else 0
        print(f"  {subject:<20} {res['correct']}/{res['correct']+res['wrong']+res['inconclusive']} correct ({pct}%) - {res['wrong']} wrong")
