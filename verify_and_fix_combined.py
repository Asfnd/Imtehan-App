#!/usr/bin/env python3
"""
Verify extracted answers against PDF and identify incorrect ones
"""

import csv
import pdfplumber
import re
import random

INPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_Fixed"
OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_Verified"

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

pdf_path = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'

print("="*70)
print("VERIFICATION REPORT: SAMPLING & CHECKING ANSWERS")
print("="*70)

# Dictionary to store findings
findings = {
    'correct': [],
    'incorrect': [],
    'inconclusive': []
}

with pdfplumber.open(pdf_path) as pdf:
    for subject in subjects:
        csv_file = f"{INPUT_FOLDER}/{subject}.csv"

        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        # Sample 20 questions from each subject
        sample_size = min(20, len(rows))
        sample = random.sample(rows, sample_size)

        print(f"\n{subject}: Checking {sample_size}/{len(rows)} questions")
        print("-" * 70)

        subject_correct = 0
        subject_incorrect = 0
        subject_inconclusive = 0

        for row in sample:
            q_num = int(row['Question_Number'])
            csv_answer = row['Correct_Answer'].strip().upper() if row['Correct_Answer'] else ''

            # Find this question in PDF
            pdf_answer = None

            for page_num in range(len(pdf.pages)):
                try:
                    text = pdf.pages[page_num].extract_text()
                    if text and re.search(rf'(?:^|\n)\s*{q_num}\s*\.', text):
                        # Found the question - extract bold texts on this page
                        chars = pdf.pages[page_num].chars
                        bolds = []
                        current = []

                        for char in chars:
                            if 'bold' in char.get('fontname', '').lower():
                                current.append(char['text'])
                            else:
                                if current:
                                    text_seg = ''.join(current).strip()
                                    if text_seg:
                                        bolds.append(normalize(text_seg))
                                    current = []

                        if current:
                            text_seg = ''.join(current).strip()
                            if text_seg:
                                bolds.append(normalize(text_seg))

                        # Match options to bold texts
                        options = {
                            'A': normalize(row['Option_A']),
                            'B': normalize(row['Option_B']),
                            'C': normalize(row['Option_C']),
                            'D': normalize(row['Option_D']),
                        }

                        # Find which option is bold
                        for letter, opt_norm in options.items():
                            if opt_norm and any(opt_norm in b or b in opt_norm for b in bolds):
                                pdf_answer = letter
                                break

                        break
                except:
                    pass

            # Compare
            if pdf_answer:
                if csv_answer == pdf_answer:
                    print(f"  ✓ Q{q_num}: {csv_answer} (correct)")
                    subject_correct += 1
                    findings['correct'].append((subject, q_num, csv_answer))
                else:
                    print(f"  ✗ Q{q_num}: CSV={csv_answer} PDF={pdf_answer} (WRONG)")
                    subject_incorrect += 1
                    findings['incorrect'].append((subject, q_num, csv_answer, pdf_answer))
            else:
                if csv_answer:
                    print(f"  ? Q{q_num}: CSV={csv_answer} (inconclusive)")
                    subject_inconclusive += 1
                    findings['inconclusive'].append((subject, q_num, csv_answer))
                else:
                    print(f"  ? Q{q_num}: NO ANSWER (inconclusive)")
                    findings['inconclusive'].append((subject, q_num, ''))

        total_checked = subject_correct + subject_incorrect + subject_inconclusive
        correct_pct = subject_correct * 100 // total_checked if total_checked > 0 else 0
        print(f"\nResult: {subject_correct}/{total_checked} correct ({correct_pct}%)")

print("\n" + "="*70)
print("SUMMARY")
print("="*70)
print(f"✓ Correct: {len(findings['correct'])}")
print(f"✗ Incorrect: {len(findings['incorrect'])}")
print(f"? Inconclusive: {len(findings['inconclusive'])}")

if findings['incorrect']:
    print("\nINCORRECT ANSWERS TO FIX:")
    print("-" * 70)
    for subject, q_num, csv_answer, pdf_answer in findings['incorrect'][:20]:
        print(f"  {subject} Q{q_num}: CSV={csv_answer} → should be {pdf_answer}")
    if len(findings['incorrect']) > 20:
        print(f"  ... and {len(findings['incorrect']) - 20} more")

print("\n" + "="*70)
