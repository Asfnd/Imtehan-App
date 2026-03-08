#!/usr/bin/env python3
"""
PRECISE MCQ Extractor - Page-accurate answer detection
Each question's answer comes ONLY from bold text on the same page
"""

import pdfplumber
import pandas as pd
import re
import os
from datetime import datetime

OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs"

SUBJECTS = [
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Computer Past Papers MCQs (2015 to Date).pdf', 'Basic_Computer', 3098),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Current Affairs Past Papers MCQs (2015 to Date).pdf', 'Current_Affairs', 850),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC English Past Papers MCQs (2015 to Date).pdf', 'English', 1985),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Ethics &amp; Civics Past Papers MCQs (2015 to Date).pdf', 'Ethics_Civics', 982),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Everyday Science Past Papers MCQs (2015 to Date).pdf', 'Everyday_Science', 9137),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC General Geography Past Papers MCQs (2015 to Date).pdf', 'General_Geography', 1097),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC General Knowledge Past Papers MCQs from (2015 to Date).pdf', 'General_Knowledge', 8323),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC General Math Past Paper MCQs from 2015 to 2025.pdf', 'General_Math', 2789),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Islamiat Past Papers MCQs (2015 to Date).pdf', 'Islamiat', 3507),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Pakistan Studies Past Papers MCQs (2015 to Date).pdf', 'Pakistan_Studies', 6855),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Urdu Past Papers MCQs (2015 to Date).pdf', 'Urdu', 1264),
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


def extract_mcqs_precise(pdf, start_page=7):
    """Extract MCQs with precise page-based answer detection"""

    mcqs = []

    for page_num in range(start_page, len(pdf.pages)):
        try:
            page = pdf.pages[page_num]
            text = page.extract_text()

            if not text or len(text) < 50:
                continue

            # Get bold texts for this page
            page_bolds = get_page_bolds(page)

            # Also get bolds from next page (questions may span)
            next_bolds = []
            if page_num + 1 < len(pdf.pages):
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

                        # Find answer from THIS page's bolds only
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


def process_subject(pdf_path, subject_name, target):
    """Process single subject"""
    print(f"\n{subject_name}:", end=" ")

    start = datetime.now()

    with pdfplumber.open(pdf_path) as pdf:
        mcqs = extract_mcqs_precise(pdf)
        mcqs.sort(key=lambda x: x['Question_Number'])

        extracted = len(mcqs)
        answers = sum(1 for m in mcqs if m['Correct_Answer'])

        df = pd.DataFrame(mcqs)
        df.to_csv(f"{OUTPUT_FOLDER}/{subject_name}.csv", index=False, encoding='utf-8')

        ans_pct = answers * 100 // extracted if extracted > 0 else 0
        print(f"{extracted} MCQs, {answers} answers ({ans_pct}%) - {datetime.now() - start}")

        return extracted, answers


def main():
    print("PRECISE EXTRACTION - Page-accurate answers")
    print("="*50)

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    total_e = 0
    total_a = 0

    for pdf_path, name, target in SUBJECTS:
        try:
            e, a = process_subject(pdf_path, name, target)
            total_e += e
            total_a += a
        except Exception as e:
            print(f"{name}: ERROR - {e}")

    print(f"\nTOTAL: {total_e} MCQs, {total_a} answers ({total_a*100//total_e}%)")


if __name__ == "__main__":
    main()
