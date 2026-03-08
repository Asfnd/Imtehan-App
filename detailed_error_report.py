#!/usr/bin/env python3
"""
Detailed error report - finds ALL incorrect answers and saves them
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
    """Verify answer and return (status, pdf_answer, options_bold_status)"""
    for page_num in range(len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if text and re.search(rf'(?:^|\n)\s*{q_num}\s*\.', text):
                bolds = find_bold_text_on_page(pdf.pages[page_num])

                pdf_answer = None
                bold_options = {}

                for letter, option_text in options_dict.items():
                    option_norm = normalize(option_text)
                    if option_norm:
                        # Check if this option is in bolds
                        is_bold = any(option_norm in b or b in option_norm for b in bolds)
                        bold_options[letter] = is_bold

                        if is_bold:
                            pdf_answer = letter

                if pdf_answer:
                    if normalize(csv_answer) == normalize(pdf_answer):
                        return ('correct', pdf_answer, bold_options)
                    else:
                        return ('wrong', pdf_answer, bold_options)
                else:
                    # No bold found - try to infer from context
                    return ('inconclusive', None, bold_options)
        except:
            pass

    return ('inconclusive', None, {})

print("="*70)
print("DETAILED ERROR ANALYSIS - FULL REPORT")
print("="*70)

all_errors = []

with pdfplumber.open(PDF_PATH) as pdf:
    for subject in subjects:
        csv_file = f"{CSV_FOLDER}/{subject}.csv"

        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        print(f"\n{subject}: Checking ALL {len(rows)} questions...")

        subject_errors = []
        checked = 0
        wrong_found = 0

        for row in rows:
            q_num = int(row['Question_Number'])
            csv_answer = row['Correct_Answer'].strip().upper()

            if not csv_answer:
                continue

            checked += 1

            options = {
                'A': row['Option_A'],
                'B': row['Option_B'],
                'C': row['Option_C'],
                'D': row['Option_D'],
            }

            status, pdf_answer, bold_options = verify_answer(pdf, q_num, options, csv_answer)

            if status == 'wrong':
                subject_errors.append({
                    'subject': subject,
                    'q_num': q_num,
                    'csv_answer': csv_answer,
                    'pdf_answer': pdf_answer,
                    'question': row['Question'][:80]
                })
                all_errors.append({
                    'subject': subject,
                    'q_num': q_num,
                    'csv_answer': csv_answer,
                    'pdf_answer': pdf_answer,
                    'question': row['Question'][:80]
                })
                wrong_found += 1

                if wrong_found <= 5:  # Show first 5 errors per subject
                    print(f"  ✗ Q{q_num}: CSV={csv_answer} PDF={pdf_answer}")

        if wrong_found > 5:
            print(f"  ... and {wrong_found - 5} more errors")

        print(f"  Progress: {wrong_found} errors found in {checked} questions")

print("\n" + "="*70)
print(f"TOTAL ERRORS FOUND: {len(all_errors)}")
print("="*70)

# Group by subject
errors_by_subject = defaultdict(list)
for error in all_errors:
    errors_by_subject[error['subject']].append(error)

print("\nERROR SUMMARY BY SUBJECT:")
for subject in subjects:
    if errors_by_subject[subject]:
        errors = errors_by_subject[subject]
        print(f"\n{subject}: {len(errors)} errors")
        for e in errors[:5]:
            print(f"  Q{e['q_num']}: {e['csv_answer']} → {e['pdf_answer']}")
        if len(errors) > 5:
            print(f"  ... and {len(errors) - 5} more")

# Save to file for reference
output_file = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/ERRORS_TO_FIX.csv"
with open(output_file, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['subject', 'q_num', 'csv_answer', 'pdf_answer', 'question'])
    writer.writeheader()
    writer.writerows(all_errors)

print(f"\nDetailed error list saved to: {output_file}")
