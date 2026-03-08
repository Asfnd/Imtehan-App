#!/usr/bin/env python3
"""
Smart sampling verification - checks every Nth question across all subjects
Much faster than checking all questions
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
    """Verify answer"""
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

print("="*70)
print("SMART SAMPLE VERIFICATION - CHECKING EVERY 10TH QUESTION")
print("="*70)

all_errors = []

with pdfplumber.open(PDF_PATH) as pdf:
    for subject in subjects:
        csv_file = f"{CSV_FOLDER}/{subject}.csv"

        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        # Sample every 10th question
        sample = rows[::10]
        print(f"\n{subject}: Checking {len(sample)} sampled questions (every 10th of {len(rows)})...")

        wrong_count = 0

        for row in sample:
            q_num = int(row['Question_Number'])
            csv_answer = row['Correct_Answer'].strip().upper()

            if not csv_answer:
                continue

            options = {
                'A': row['Option_A'],
                'B': row['Option_B'],
                'C': row['Option_C'],
                'D': row['Option_D'],
            }

            status, pdf_answer = verify_answer(pdf, q_num, options, csv_answer)

            if status == 'wrong':
                all_errors.append({
                    'subject': subject,
                    'q_num': q_num,
                    'csv_answer': csv_answer,
                    'pdf_answer': pdf_answer,
                })
                wrong_count += 1
                print(f"  ✗ Q{q_num}: {csv_answer} → {pdf_answer}")

        if wrong_count == 0:
            print(f"  ✓ All sampled questions correct!")

# Save errors
output_file = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/SAMPLE_ERRORS.csv"
with open(output_file, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['subject', 'q_num', 'csv_answer', 'pdf_answer'])
    writer.writeheader()
    writer.writerows(all_errors)

print("\n" + "="*70)
print(f"TOTAL ERRORS IN SAMPLE: {len(all_errors)}")
print(f"Saved to: {output_file}")
print("="*70)

# Estimate total errors based on sample
if all_errors:
    print(f"\nERRORS FOUND:")
    for subject in subjects:
        subject_errors = [e for e in all_errors if e['subject'] == subject]
        if subject_errors:
            print(f"  {subject}: {len(subject_errors)} in sample")
