#!/usr/bin/env python3
"""
FINAL CORRECT Extractor
- Full MCQ count (combined text extraction)
- Accurate answers (strict page-based matching, no bad filters)
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
    """Remove metadata from text"""
    if not text:
        return ''
    text = re.sub(r'Book\..*?MCQs\s*\([^)]+\).*?(?=\s*[A-D]\.|\s*$)', '', text, flags=re.DOTALL)
    text = re.sub(r'Edition.*?(?:PPSC|MCQs).*', '', text, flags=re.DOTALL)
    text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def get_page_bolds(page):
    """Get bold texts from page - NO filtering"""
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


def build_page_bold_map(pdf, start_page=7):
    """Build page -> bolds mapping"""
    page_bolds = {}
    for page_num in range(start_page, len(pdf.pages)):
        try:
            page_bolds[page_num] = get_page_bolds(pdf.pages[page_num])
        except:
            page_bolds[page_num] = []
    return page_bolds


def find_question_page(pdf, q_num, start_page=7, cache=None):
    """Find page containing question"""
    if cache and q_num in cache:
        return cache[q_num]

    pattern = rf'(?:^|\s){q_num}\.\s+'
    for page_num in range(start_page, len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if text and re.search(pattern, text):
                if cache is not None:
                    cache[q_num] = page_num
                return page_num
        except:
            pass

    if cache is not None:
        cache[q_num] = None
    return None


def find_answer(options, bolds):
    """Match options to bold text"""
    for bold in bolds:
        bold_lower = bold.lower().strip()
        if not bold_lower:
            continue

        for letter, opt in options.items():
            opt_lower = opt.lower().strip()
            if not opt_lower:
                continue

            # Exact match
            if bold_lower == opt_lower:
                return letter

            # Partial for longer texts
            if len(bold_lower) > 8 and len(opt_lower) > 8:
                if bold_lower in opt_lower or opt_lower in bold_lower:
                    return letter

    return ''


def extract_text(pdf, start_page=7):
    """Extract combined text"""
    all_text = []
    for page_num in range(start_page, len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if not text or len(text) < 50:
                continue
            text = re.sub(r'Book\..*?Past Papers.*?\n', '', text, flags=re.DOTALL)
            text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
            text = re.sub(r'Choose the correct (option|answer)\.?\s*', '\n', text, flags=re.I)
            all_text.append(text)
        except:
            pass
    return '\n'.join(all_text)


def extract_mcqs(pdf, start_page=7):
    """Extract MCQs with page-accurate answers"""

    page_bolds = build_page_bold_map(pdf, start_page)
    combined_text = extract_text(pdf, start_page)

    lines = combined_text.split('\n')
    lines = [l.strip() for l in lines if l.strip()]

    mcqs = []
    page_cache = {}
    i = 0

    while i < len(lines):
        line = lines[i]
        q_match = re.match(r'^\s*(\d+)\s*\.\s*(.+)?', line)

        if q_match:
            q_num = int(q_match.group(1))
            q_text = (q_match.group(2) or '').strip()

            options = {}
            j = i + 1
            max_look = min(i + 40, len(lines))

            while j < max_look:
                opt_line = lines[j]
                opt_match = re.match(r'^\s*([a-d])\s*[\.\)\:\s]\s*(.+)', opt_line, re.I)

                if opt_match:
                    letter = opt_match.group(1).upper()
                    text = opt_match.group(2).strip()
                    if letter not in options:
                        options[letter] = text
                    else:
                        options[letter] += ' ' + text
                    j += 1
                    if len(options) == 4:
                        break
                elif len(options) > 0:
                    if re.match(r'^\s*\d+\s*\.', opt_line):
                        break
                    else:
                        last = max(options.keys())
                        options[last] += ' ' + opt_line
                        j += 1
                elif q_text == '' or len(q_text) < 200:
                    q_text += ' ' + opt_line
                    j += 1
                else:
                    j += 1

            if len(options) == 4 and all(k in options for k in ['A', 'B', 'C', 'D']):
                # Clean
                q_text = clean_text(q_text)
                options = {k: clean_text(v) for k, v in options.items()}

                # Find page and get bolds from that page + next
                q_page = find_question_page(pdf, q_num, start_page, page_cache)
                answer = ''

                if q_page is not None:
                    bolds = page_bolds.get(q_page, [])
                    if q_page + 1 in page_bolds:
                        bolds = bolds + page_bolds[q_page + 1]
                    answer = find_answer(options, bolds)

                mcqs.append({
                    'Question_Number': q_num,
                    'Question': q_text,
                    'Option_A': options['A'],
                    'Option_B': options['B'],
                    'Option_C': options['C'],
                    'Option_D': options['D'],
                    'Correct_Answer': answer
                })
                i = j
            else:
                i += 1
        else:
            i += 1

    return mcqs


def process(pdf_path, name, target):
    print(f"{name}:", end=" ", flush=True)
    start = datetime.now()

    with pdfplumber.open(pdf_path) as pdf:
        mcqs = extract_mcqs(pdf)
        mcqs.sort(key=lambda x: x['Question_Number'])

        n = len(mcqs)
        a = sum(1 for m in mcqs if m['Correct_Answer'])

        df = pd.DataFrame(mcqs)
        df.to_csv(f"{OUTPUT_FOLDER}/{name}.csv", index=False, encoding='utf-8')

        print(f"{n}/{target} MCQs, {a} answers ({a*100//n}%) - {datetime.now()-start}")
        return n, a


def main():
    print("="*60)
    print("FINAL CORRECT EXTRACTION")
    print("="*60)

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    te, ta = 0, 0
    for path, name, target in SUBJECTS:
        try:
            e, a = process(path, name, target)
            te += e
            ta += a
        except Exception as ex:
            print(f"{name}: ERROR {ex}")

    print(f"\nTOTAL: {te} MCQs, {ta} answers ({ta*100//te}%)")


if __name__ == "__main__":
    main()
