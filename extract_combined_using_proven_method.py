#!/usr/bin/env python3
"""
Combined PDF Extraction - Using PROVEN method from extract_precise.py
This is the EXACT same approach that successfully created PPSC_Extracted_MCQs
"""

import pdfplumber
import csv
import re
import os
from datetime import datetime

OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_FINAL"

# Subject boundaries in the combined PDF
SUBJECTS = [
    ('General_Knowledge', 7, 1429, 4162),
    ('Pakistan_Studies', 1430, 2621, 3428),
    ('Everyday_Science', 2622, 4197, 4569),
    ('Islamiyat', 4198, 4811, 1753),
    ('Current_Affairs', 4812, 4962, 425),
    ('English', 4963, 5305, 993),
    ('Basic_Computer', 5306, 6036, 1549),
    ('Urdu', 6037, 6432, 632),
    ('General_Maths', 6433, 6605, 478),
    ('Geography', 6606, 6780, 549),
    ('Ethics_Civics', 6781, 6936, 491),
]


def clean_text(text):
    """Remove metadata/junk from text"""
    if not text:
        return ''
    # Remove "Book. ... MCQs" pattern
    text = re.sub(r'Book\..*?MCQs.*?(?:Edition|PPSC).*', '', text, flags=re.DOTALL)
    # Remove page numbers and credits
    text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
    # Clean whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def get_page_bolds(page):
    """Get all bold text segments from a page"""
    chars = page.chars
    bolds = []
    current = []

    for char in chars:
        if 'bold' in char.get('fontname', '').lower():
            current.append(char['text'])
        else:
            if current:
                text = ''.join(current).strip()
                if text:
                    bolds.append(text)
                current = []

    if current:
        text = ''.join(current).strip()
        if text:
            bolds.append(text)

    return bolds


def find_answer_on_page(options, page_bolds):
    """Find answer by exact matching with page bolds"""
    for bold in page_bolds:
        bold_clean = clean_text(bold).lower().strip()
        if not bold_clean or len(bold_clean) < 1:
            continue

        for letter, opt_text in options.items():
            opt_clean = clean_text(opt_text).lower().strip()
            if not opt_clean:
                continue

            # Exact match
            if bold_clean == opt_clean:
                return letter

            # Partial match for longer texts
            if len(bold_clean) > 10 and len(opt_clean) > 10:
                if bold_clean in opt_clean or opt_clean in bold_clean:
                    return letter

    return ''


def extract_mcqs_from_range(pdf, start_page, end_page):
    """Extract MCQs with precise page-based answer detection"""

    mcqs = []

    for page_num in range(start_page, min(end_page + 1, len(pdf.pages))):
        try:
            page = pdf.pages[page_num]
            text = page.extract_text()

            if not text or len(text) < 50:
                continue

            # Get bold texts for this page AND next page (proven method)
            page_bolds = get_page_bolds(page)

            next_bolds = []
            if page_num + 1 < len(pdf.pages) and page_num + 1 <= end_page:
                next_bolds = get_page_bolds(pdf.pages[page_num + 1])

            all_bolds = page_bolds + next_bolds

            # Clean text
            text = re.sub(r'Book\..*?Past Papers.*?\n', '', text, flags=re.DOTALL)
            text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
            text = re.sub(r'Choose the correct (option|answer)\.?\s*', '\n', text, flags=re.I)

            lines = text.split('\n')
            lines = [l.strip() for l in lines if l.strip()]

            i = 0
            while i < len(lines):
                line = lines[i]

                q_match = re.match(r'^\s*(\d+)\s*\.\s*(.+)?', line)

                if q_match:
                    q_num = int(q_match.group(1))
                    q_text = (q_match.group(2) or '').strip()

                    # Skip if already extracted
                    if any(m['Question_Number'] == q_num for m in mcqs):
                        i += 1
                        continue

                    options = {}
                    j = i + 1
                    max_look = min(i + 30, len(lines))

                    while j < max_look:
                        opt_line = lines[j]
                        opt_match = re.match(r'^\s*([a-d])\s*[\.\)\:\s]\s*(.+)', opt_line, re.I)

                        if opt_match:
                            opt_letter = opt_match.group(1).upper()
                            opt_text = opt_match.group(2).strip()

                            if opt_letter not in options:
                                options[opt_letter] = opt_text
                            else:
                                options[opt_letter] += ' ' + opt_text

                            j += 1
                            if len(options) == 4:
                                break
                        elif len(options) > 0:
                            if re.match(r'^\s*\d+\s*\.', opt_line):
                                break
                            else:
                                last_opt = max(options.keys())
                                options[last_opt] += ' ' + opt_line
                                j += 1
                        elif q_text == '' or len(q_text) < 200:
                            q_text += ' ' + opt_line
                            j += 1
                        else:
                            j += 1

                    if len(options) == 4 and all(k in options for k in ['A', 'B', 'C', 'D']):
                        # Clean options
                        clean_options = {k: clean_text(v) for k, v in options.items()}

                        # Find answer from THIS page's bolds (proven method)
                        answer = find_answer_on_page(clean_options, all_bolds)

                        mcqs.append({
                            'Question_Number': q_num,
                            'Question': clean_text(q_text),
                            'Option_A': clean_options['A'],
                            'Option_B': clean_options['B'],
                            'Option_C': clean_options['C'],
                            'Option_D': clean_options['D'],
                            'Correct_Answer': answer
                        })

                        i = j
                    else:
                        i += 1
                else:
                    i += 1

        except Exception as e:
            continue

    return mcqs


def process_subject(pdf, subject_name, start_page, end_page, target):
    """Process single subject"""
    print(f"\n{subject_name}:", end=" ")

    start = datetime.now()

    mcqs = extract_mcqs_from_range(pdf, start_page, end_page)
    mcqs.sort(key=lambda x: x['Question_Number'])

    extracted = len(mcqs)
    answers = sum(1 for m in mcqs if m['Correct_Answer'])

    # Save to CSV
    if mcqs:
        with open(f"{OUTPUT_FOLDER}/{subject_name}.csv", 'w', encoding='utf-8', newline='') as f:
            fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(mcqs)

    ans_pct = answers * 100 // extracted if extracted > 0 else 0
    status = "✓" if ans_pct >= 95 else "!" if ans_pct >= 80 else "✗"
    print(f"{status} {extracted} MCQs, {answers} answers ({ans_pct}%) - {datetime.now() - start}")

    return extracted, answers


def main():
    print("PRECISE EXTRACTION - Using proven method from extract_precise.py")
    print("="*70)

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    pdf_path = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'

    if not os.path.exists(pdf_path):
        print(f"ERROR: PDF not found at {pdf_path}")
        return

    total_e = 0
    total_a = 0

    with pdfplumber.open(pdf_path) as pdf:
        for pdf_path, name, start_page, end_page, target in [(None, s[0], s[1], s[2], s[3]) for s in SUBJECTS]:
            try:
                e, a = process_subject(pdf, name, start_page, end_page, target)
                total_e += e
                total_a += a
            except Exception as e:
                print(f"{name}: ERROR - {e}")

    print(f"\nTOTAL: {total_e} MCQs, {total_a} answers ({total_a*100//total_e if total_e else 0}%)")


if __name__ == "__main__":
    main()
