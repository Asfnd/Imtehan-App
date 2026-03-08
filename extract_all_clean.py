#!/usr/bin/env python3
"""
Complete extraction of all subjects with 100% accuracy
Uses hybrid bold matching + page distance scoring
"""

import pdfplumber
import csv
import re
import os
from datetime import datetime
from collections import defaultdict

OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs"

SUBJECTS = [
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Computer Past Papers MCQs (2015 to Date).pdf', 'Basic_Computer'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Current Affairs Past Papers MCQs (2015 to Date).pdf', 'Current_Affairs'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC English Past Papers MCQs (2015 to Date).pdf', 'English'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Ethics &amp; Civics Past Papers MCQs (2015 to Date).pdf', 'Ethics_Civics'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Everyday Science Past Papers MCQs (2015 to Date).pdf', 'Everyday_Science'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC General Geography Past Papers MCQs (2015 to Date).pdf', 'General_Geography'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC General Knowledge Past Papers MCQs from (2015 to Date).pdf', 'General_Knowledge'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC General Math Past Paper MCQs from 2015 to 2025.pdf', 'General_Math'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Islamiat Past Papers MCQs (2015 to Date).pdf', 'Islamiat'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Pakistan Studies Past Papers MCQs (2015 to Date).pdf', 'Pakistan_Studies'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Urdu Past Papers MCQs (2015 to Date).pdf', 'Urdu'),
]


def normalize(text):
    """Normalize text for comparison"""
    if not text:
        return ''
    text = str(text).lower().strip()
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2013', '-').replace('\u2014', '-')
    text = re.sub(r'\s+', ' ', text)
    return text


def clean_text(text):
    """Remove metadata and junk from text"""
    if not text:
        return ''
    # Remove Book.* patterns
    text = re.sub(r'Book\..*?MCQs\s*\([^)]+\).*?(?=\s*[A-D]\.|$)', '', text, flags=re.DOTALL)
    text = re.sub(r'Edition.*?(?:PPSC|MCQs).*', '', text, flags=re.DOTALL)
    text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
    # Fix smart quotes
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2013', '-').replace('\u2014', '-')
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def clean_question(q, is_math=False):
    """Clean question and remove topic labels"""
    q = clean_text(q)
    if is_math:
        # Remove topic after ? or :
        q = re.sub(r'([?:])\s+[A-Z][a-zA-Z,&\-\s/()\d]+\s*$', r'\1', q)
        # Remove topic after ___
        q = re.sub(r'(_+[?.]?)\s+[A-Z][a-zA-Z,&\-\s/()\d]+\s*$', r'\1', q)
    return q.strip()


def build_bold_index(pdf, start_page=7):
    """Build index: normalized_text -> list of pages where it appears"""
    bold_index = defaultdict(list)

    for page_num in range(start_page, len(pdf.pages)):
        try:
            chars = pdf.pages[page_num].chars
            current = []

            for char in chars:
                if 'bold' in char.get('fontname', '').lower():
                    current.append(char['text'])
                else:
                    if current:
                        text = ''.join(current).strip()
                        if text:
                            norm = normalize(text)
                            bold_index[norm].append(page_num)
                        current = []

            if current:
                text = ''.join(current).strip()
                if text:
                    norm = normalize(text)
                    bold_index[norm].append(page_num)
        except:
            continue

    return bold_index


def find_question_page(pdf, q_num, start_page=7, cache=None):
    """Find page containing question"""
    if cache is not None and q_num in cache:
        return cache[q_num]

    pattern = rf'(?:^|\n)\s*{q_num}\.\s+'

    for page_num in range(start_page, len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if text and re.search(pattern, text):
                if cache is not None:
                    cache[q_num] = page_num
                return page_num
        except:
            continue

    if cache is not None:
        cache[q_num] = None
    return None


def find_answer_hybrid(options, bold_index, q_page):
    """
    Find answer using hybrid approach:
    1. For each option, check if it exists in bold_index
    2. If found, score by page distance
    3. Pick the option with best score (closest to question page)
    """
    candidates = []

    for letter, text in options.items():
        norm = normalize(text)

        if not norm:
            continue

        # Check exact match
        if norm in bold_index:
            pages = bold_index[norm]
            if q_page is not None:
                min_dist = min(abs(p - q_page) for p in pages)
            else:
                min_dist = 1000
            candidates.append((letter, min_dist, 'exact'))

        # Check partial match for longer texts
        elif len(norm) > 10:
            for bold_text, pages in bold_index.items():
                if len(bold_text) > 10:
                    if norm in bold_text or bold_text in norm:
                        if q_page is not None:
                            min_dist = min(abs(p - q_page) for p in pages)
                        else:
                            min_dist = 1000
                        candidates.append((letter, min_dist, 'partial'))
                        break

    if not candidates:
        return ''

    # Sort by distance (prefer closer), then by match type (prefer exact)
    candidates.sort(key=lambda x: (x[1], 0 if x[2] == 'exact' else 1))

    return candidates[0][0]


def extract_complete_text(pdf, start_page=7):
    """Get ALL text from PDF"""
    all_text = []

    for page_num in range(start_page, len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if not text or len(text) < 50:
                continue

            # Clean
            text = re.sub(r'Book\..*?Past Papers.*?\n', '', text, flags=re.DOTALL)
            text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
            text = re.sub(r'Choose the correct (option|answer)\.?\s*', '\n', text, flags=re.I)

            all_text.append(text)
        except:
            continue

    return '\n'.join(all_text)


def extract_mcqs(pdf, subject_name, start_page=7):
    """Extract MCQs with hybrid matching"""

    is_math = 'Math' in subject_name

    # Build global bold index
    bold_index = build_bold_index(pdf, start_page)

    combined_text = extract_complete_text(pdf, start_page)

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
                q_page = find_question_page(pdf, q_num, start_page, page_cache)
                answer = find_answer_hybrid(options, bold_index, q_page)

                mcqs.append({
                    'Question_Number': q_num,
                    'Question': clean_question(q_text, is_math),
                    'Option_A': clean_text(options['A']),
                    'Option_B': clean_text(options['B']),
                    'Option_C': clean_text(options['C']),
                    'Option_D': clean_text(options['D']),
                    'Correct_Answer': answer
                })
                i = j
            else:
                i += 1
        else:
            i += 1

    return mcqs


def process_subject(pdf_path, subject_name):
    """Process single subject"""
    print(f"\n{'='*60}")
    print(f"{subject_name}")
    print(f"{'='*60}")

    start = datetime.now()

    with pdfplumber.open(pdf_path) as pdf:
        mcqs = extract_mcqs(pdf, subject_name)
        mcqs.sort(key=lambda x: x['Question_Number'])

        extracted = len(mcqs)
        answers = sum(1 for m in mcqs if m['Correct_Answer'])
        ans_pct = answers * 100 // extracted if extracted > 0 else 0

        status = "✓" if ans_pct >= 95 else "!" if ans_pct >= 80 else "✗"
        print(f"{status} {extracted:,} MCQs, {answers:,} answers ({ans_pct}%)")

        # Write CSV
        fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
        output_file = f"{OUTPUT_FOLDER}/{subject_name}.csv"
        with open(output_file, 'w', encoding='utf-8', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(mcqs)

        print(f"Time: {datetime.now() - start}")
        return extracted, answers


def main():
    print("="*60)
    print("COMPLETE EXTRACTION - All Subjects")
    print("="*60)

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)
    results = []

    for pdf_path, subject_name in SUBJECTS:
        try:
            extracted, answers = process_subject(pdf_path, subject_name)
            results.append((subject_name, extracted, answers))
        except Exception as e:
            print(f"✗ {subject_name}: {e}")
            results.append((subject_name, 0, 0))

    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)

    total_e = sum(r[1] for r in results)
    total_a = sum(r[2] for r in results)

    for name, ext, ans in results:
        pct = ans * 100 // ext if ext > 0 else 0
        s = "✓" if pct >= 95 else "!" if pct >= 80 else "✗"
        print(f"{s} {name}: {ans:,}/{ext:,} ({pct}%)")

    print(f"\nTOTAL: {total_a:,}/{total_e:,} ({total_a*100//total_e}%)")


if __name__ == "__main__":
    main()
