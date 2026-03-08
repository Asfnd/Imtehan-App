#!/usr/bin/env python3
"""
Comprehensive verification of all answers across all subjects
Checks multiple questions per subject to identify pattern of incorrect answers
"""

import csv
import pdfplumber
import re
from collections import defaultdict

CSV_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_Final"
PDF_PATH = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'

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
    """Extract all bold text from a page"""
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

def verify_answer(pdf, q_num, options_dict, csv_answer):
    """
    Verify a single answer by finding it in PDF
    Returns: ('correct', answer) or ('wrong', pdf_answer) or ('inconclusive', None)
    """
    # Search for question in PDF
    for page_num in range(len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if text and re.search(rf'(?:^|\n)\s*{q_num}\s*\.', text):
                # Found question page
                bolds = find_bold_text_on_page(pdf.pages[page_num])

                # Check which option is bold
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

print("="*70)
print("COMPREHENSIVE VERIFICATION - ALL SUBJECTS")
print("="*70)

issues = defaultdict(list)
verification_summary = {}

with pdfplumber.open(PDF_PATH) as pdf:
    for subject in subjects:
        csv_file = f"{CSV_FOLDER}/{subject}.csv"

        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        print(f"\n{subject}: Verifying {min(100, len(rows))} questions...")

        correct = 0
        wrong = 0
        inconclusive = 0

        # Check first 100 questions or all if fewer
        check_count = min(100, len(rows))
        for row in rows[:check_count]:
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

            status, pdf_answer = verify_answer(pdf, q_num, options, csv_answer)

            if status == 'correct':
                correct += 1
            elif status == 'wrong':
                wrong += 1
                issues[subject].append((q_num, csv_answer, pdf_answer))
                print(f"  ✗ Q{q_num}: CSV={csv_answer} PDF={pdf_answer}")
            else:
                inconclusive += 1

        total_checked = correct + wrong + inconclusive
        correct_pct = correct * 100 // total_checked if total_checked > 0 else 0

        verification_summary[subject] = {
            'correct': correct,
            'wrong': wrong,
            'inconclusive': inconclusive,
            'total': total_checked,
            'pct': correct_pct
        }

        status_icon = "✓" if correct_pct >= 95 else "!" if correct_pct >= 80 else "✗"
        print(f"{status_icon} Result: {correct}/{total_checked} correct ({correct_pct}%)")

print("\n" + "="*70)
print("SUMMARY")
print("="*70)

total_correct = 0
total_wrong = 0
total_checked = 0

for subject in subjects:
    stats = verification_summary[subject]
    total_correct += stats['correct']
    total_wrong += stats['wrong']
    total_checked += stats['total']

    status = "✓" if stats['pct'] >= 95 else "!" if stats['pct'] >= 80 else "✗"
    wrong_count = stats['wrong']
    if wrong_count > 0:
        print(f"{status} {subject:<20} {stats['correct']}/{stats['total']} ({stats['pct']}%) [{wrong_count} WRONG]")
    else:
        print(f"{status} {subject:<20} {stats['correct']}/{stats['total']} ({stats['pct']}%)")

overall_pct = total_correct * 100 // total_checked if total_checked > 0 else 0
print(f"\n{'='*70}")
print(f"OVERALL: {total_correct}/{total_checked} correct ({overall_pct}%)")
print(f"TOTAL WRONG: {total_wrong}")
print(f"{'='*70}")

if total_wrong > 0:
    print("\nINCORRECT ANSWERS FOUND - NEED FIXING:")
    print("="*70)
    for subject in subjects:
        if issues[subject]:
            print(f"\n{subject}: {len(issues[subject])} incorrect")
            for q_num, csv_ans, pdf_ans in issues[subject][:10]:
                print(f"  Q{q_num}: {csv_ans} → {pdf_ans}")
            if len(issues[subject]) > 10:
                print(f"  ... and {len(issues[subject]) - 10} more")
