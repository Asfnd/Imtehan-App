#!/usr/bin/env python3
"""
Verify that all 408 fixes are correct by checking against PDF
"""

import csv
import pdfplumber
import re

CSV_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs"
PDF_PATH = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'
ERROR_FILE = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/ERRORS_TO_FIX.csv"

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

def verify_answer(pdf, q_num, options_dict, csv_answer):
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

# Load fixed questions
fixed_q_nums = set()
with open(ERROR_FILE, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        fixed_q_nums.add((row['subject'], int(row['q_num'])))

print("="*70)
print("VERIFYING ALL 408 FIXES")
print("="*70)

all_correct = 0
all_wrong = 0
all_inconclusive = 0

with pdfplumber.open(PDF_PATH) as pdf:
    for subject in subjects:
        csv_file = f"{CSV_FOLDER}/{subject}.csv"

        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        # Only check the fixed questions for this subject
        subject_fixed = [(s, q) for s, q in fixed_q_nums if s == subject]

        if not subject_fixed:
            print(f"{subject}: no fixes to verify")
            continue

        print(f"\n{subject}: Verifying {len(subject_fixed)} fixes...")

        correct = 0
        wrong = 0
        inconclusive = 0

        for row in rows:
            q_num = int(row['Question_Number'])
            if (subject, q_num) not in subject_fixed:
                continue

            csv_answer = row['Correct_Answer'].strip().upper()

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
                print(f"  ✗ Q{q_num}: Still wrong! CSV={csv_answer} PDF={pdf_answer}")
            else:
                inconclusive += 1

        total = correct + wrong + inconclusive
        pct = correct * 100 // total if total > 0 else 0

        print(f"  Result: {correct}/{total} verified correct ({pct}%)")

        all_correct += correct
        all_wrong += wrong
        all_inconclusive += inconclusive

total_verified = all_correct + all_wrong + all_inconclusive
verified_pct = all_correct * 100 // total_verified if total_verified > 0 else 0

print("\n" + "="*70)
print(f"TOTAL VERIFICATION: {all_correct}/{total_verified} fixes verified correct ({verified_pct}%)")
if all_wrong > 0:
    print(f"⚠ STILL WRONG: {all_wrong}")
else:
    print("✓ ALL FIXES VERIFIED CORRECT!")
print("="*70)
