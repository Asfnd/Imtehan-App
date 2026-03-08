#!/usr/bin/env python3
"""
Detailed verification - shows ALL bold texts on each page to identify correct answers
"""

import csv
import pdfplumber
import re

PDF_PATH = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'
CSV_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs"

# Start with General_Maths for detailed inspection
subject = "General_Maths"

def normalize(text):
    if not text:
        return ''
    text = str(text).lower().strip()
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2013', '-').replace('\u2014', '-')
    text = re.sub(r'\s+', ' ', text)
    return text

def get_page_bolds_detailed(page):
    """Extract bold text with positions"""
    chars = page.chars
    bolds = []
    current = []
    current_start = None

    for char in chars:
        is_bold = 'bold' in char.get('fontname', '').lower()

        if is_bold:
            if not current:
                current_start = char.get('x0', 0)
            current.append(char['text'])
        else:
            if current:
                text = ''.join(current).strip()
                if text and len(text) > 1:
                    bolds.append({
                        'text': text,
                        'norm': normalize(text),
                        'length': len(text)
                    })
                current = []
                current_start = None

    if current:
        text = ''.join(current).strip()
        if text and len(text) > 1:
            bolds.append({
                'text': text,
                'norm': normalize(text),
                'length': len(text)
            })

    return bolds

print("="*70)
print(f"DETAILED VERIFICATION - {subject}")
print("="*70)

csv_file = f"{CSV_FOLDER}/{subject}.csv"

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

print(f"Total questions: {len(rows)}\n")

# Check first 30 questions in detail
errors = []

with pdfplumber.open(PDF_PATH) as pdf:
    for idx, row in enumerate(rows[:30]):
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

        # Find question in PDF
        found = False
        for page_num in range(len(pdf.pages)):
            try:
                text = pdf.pages[page_num].extract_text()
                if text and re.search(rf'(?:^|\n)\s*{q_num}\s*\.', text):
                    # Found the question
                    bolds = get_page_bolds_detailed(pdf.pages[page_num])

                    # Find which option matches each bold
                    matches = {}
                    for letter, opt_norm in options.items():
                        for bold_item in bolds:
                            if opt_norm and (opt_norm == bold_item['norm'] or
                                           opt_norm in bold_item['norm'] or
                                           bold_item['norm'] in opt_norm):
                                matches[letter] = bold_item['text']
                                break

                    print(f"Q{q_num}:")
                    print(f"  CSV Answer: {csv_answer}")
                    print(f"  All bold texts on page: {[b['text'][:40] for b in bolds[:5]]}")
                    print(f"  Option matches found:")
                    for letter, opt in options.items():
                        if letter in matches:
                            print(f"    {letter}: ✓ BOLD - {matches[letter][:50]}")
                        else:
                            print(f"    {letter}: {opt[:40]}...")

                    # Determine correct answer
                    if matches:
                        pdf_answer = list(matches.keys())[0]
                        if pdf_answer != csv_answer:
                            print(f"  ⚠ MISMATCH: CSV={csv_answer} PDF={pdf_answer}")
                            errors.append({'q_num': q_num, 'csv': csv_answer, 'pdf': pdf_answer})
                        else:
                            print(f"  ✓ CORRECT")
                    else:
                        print(f"  ? No bold matches found")

                    print()
                    found = True
                    break
            except:
                pass

        if not found:
            print(f"Q{q_num}: NOT FOUND IN PDF")

print("\n" + "="*70)
print(f"ERRORS FOUND IN FIRST 30: {len(errors)}")
if errors:
    for e in errors:
        print(f"  Q{e['q_num']}: {e['csv']} → {e['pdf']}")

EOF
