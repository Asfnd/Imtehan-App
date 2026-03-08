#!/usr/bin/env python3
"""
ULTIMATE MCQ Extractor - Maximum answer detection
Key insight: Bold segments exist but matching fails
Solution: More aggressive matching + wider page range
"""

import pdfplumber
import pandas as pd
import re
import os
from datetime import datetime
from difflib import SequenceMatcher

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


def normalize_text(text):
    """Normalize text for comparison"""
    if not text:
        return ''
    # Lowercase, remove extra spaces, normalize quotes
    text = str(text).lower().strip()
    text = re.sub(r'\s+', ' ', text)
    text = text.replace('"', '"').replace('"', '"').replace("'", "'").replace("'", "'")
    text = text.replace('–', '-').replace('—', '-')
    return text


def get_all_bold_texts(pdf, start_page=7):
    """Get ALL bold texts from entire PDF as a flat list"""
    all_bolds = []

    for page_num in range(start_page, len(pdf.pages)):
        try:
            page = pdf.pages[page_num]
            chars = page.chars
            current = []

            for char in chars:
                if 'bold' in char.get('fontname', '').lower():
                    current.append(char['text'])
                else:
                    if current:
                        text = ''.join(current).strip()
                        if text:
                            # Filter out headers/footers
                            text_lower = text.lower()
                            if not any(skip in text_lower for skip in [
                                'book.', 'edition', 'past papers', 'www.howtests',
                                'by: sir', 'by: miss', 'course for css', 'free essays', 'reviews on sir'
                            ]):
                                all_bolds.append({
                                    'text': text,
                                    'normalized': normalize_text(text),
                                    'page': page_num
                                })
                        current = []

            if current:
                text = ''.join(current).strip()
                if text:
                    text_lower = text.lower()
                    if not any(skip in text_lower for skip in [
                        'book.', 'edition', 'past papers', 'www.howtests',
                        'by: sir', 'by: miss', 'course for css', 'free essays', 'reviews on sir'
                    ]):
                        all_bolds.append({
                            'text': text,
                            'normalized': normalize_text(text),
                            'page': page_num
                        })
        except:
            continue

    return all_bolds


def get_page_bold_map(all_bolds):
    """Create a page -> bolds mapping"""
    page_map = {}
    for bold in all_bolds:
        page = bold['page']
        if page not in page_map:
            page_map[page] = []
        page_map[page].append(bold)
    return page_map


def find_question_page(pdf, q_num, start_page=7, page_cache=None):
    """Find which page contains a specific question number"""
    if page_cache is None:
        page_cache = {}

    if q_num in page_cache:
        return page_cache[q_num]

    pattern = rf'(?:^|\s){q_num}\.\s+'

    for page_num in range(start_page, len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if text and re.search(pattern, text):
                page_cache[q_num] = page_num
                return page_num
        except:
            continue

    page_cache[q_num] = None
    return None


def similarity(a, b):
    """Calculate string similarity"""
    return SequenceMatcher(None, a, b).ratio()


def find_answer(options, page_bolds, all_bolds=None, q_page=None):
    """
    Find answer using multiple strategies:
    1. Exact match on page
    2. Partial/contains match on page
    3. Fuzzy match on page
    4. Search in nearby pages
    5. Search in all bolds as fallback
    """

    # Normalize options
    norm_options = {}
    for letter, text in options.items():
        norm_options[letter] = normalize_text(text)

    # Strategy 1 & 2: Check page bolds (exact and contains)
    for bold in page_bolds:
        bold_norm = bold['normalized']

        for letter, opt_norm in norm_options.items():
            if not opt_norm:
                continue

            # Exact match
            if bold_norm == opt_norm:
                return letter

            # Contains match (for longer texts)
            if len(opt_norm) > 3 and len(bold_norm) > 3:
                if bold_norm in opt_norm or opt_norm in bold_norm:
                    # Ensure meaningful match
                    shorter = min(len(opt_norm), len(bold_norm))
                    longer = max(len(opt_norm), len(bold_norm))
                    if shorter >= longer * 0.4:  # At least 40% overlap
                        return letter

    # Strategy 3: Fuzzy match on page bolds
    for bold in page_bolds:
        bold_norm = bold['normalized']

        for letter, opt_norm in norm_options.items():
            if not opt_norm or len(opt_norm) < 4:
                continue

            # Check similarity
            if len(bold_norm) >= 4 and similarity(bold_norm, opt_norm) > 0.85:
                return letter

    # Strategy 4: Check nearby pages (questions might span pages)
    if all_bolds and q_page is not None:
        nearby_bolds = [b for b in all_bolds
                       if abs(b['page'] - q_page) <= 3 and b not in page_bolds]

        for bold in nearby_bolds:
            bold_norm = bold['normalized']

            for letter, opt_norm in norm_options.items():
                if not opt_norm:
                    continue

                if bold_norm == opt_norm:
                    return letter

                if len(opt_norm) > 5 and len(bold_norm) > 5:
                    if similarity(bold_norm, opt_norm) > 0.9:
                        return letter

    return ''


def extract_complete_text(pdf, start_page=7):
    """Get ALL text from PDF"""
    pure_ad_keywords = [
        '500 free essays for css',
        'css current affairs solved past papers',
        'css solved gsa past papers',
        'css solved islamiat past papers',
        'css solved pakistan affairs past papers',
        'english essay & precis course',
        'students\' reviews on sir syed kazim',
        'write & get your voice of knowledge'
    ]

    all_text = []

    for page_num in range(start_page, len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()

            if not text or len(text) < 50:
                continue

            if not re.search(r'\d+\.\s+', text):
                text_lower = text.lower()
                if any(kw in text_lower for kw in pure_ad_keywords):
                    continue

            text = re.sub(r'Book\..*?Past Papers.*?\n', '', text, flags=re.DOTALL)
            text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
            text = re.sub(r'Choose the correct (option|answer)\.?\s*', '\n', text, flags=re.I)

            all_text.append(text)
        except:
            continue

    return '\n'.join(all_text)


def extract_all_mcqs_ultimate(pdf, start_page=7):
    """Extract MCQs with maximum answer detection"""

    # Get all bolds
    all_bolds = get_all_bold_texts(pdf, start_page)
    page_bold_map = get_page_bold_map(all_bolds)

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

                answer = ''
                if q_page is not None:
                    # Get bolds from this page and adjacent pages
                    page_bolds = []
                    for p in range(max(start_page, q_page - 1), min(len(pdf.pages), q_page + 3)):
                        if p in page_bold_map:
                            page_bolds.extend(page_bold_map[p])

                    answer = find_answer(options, page_bolds, all_bolds, q_page)

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


def process_subject(pdf_path, subject_name, target):
    """Process a single subject PDF"""
    print(f"\n{'='*60}")
    print(f"Processing: {subject_name}")
    print(f"{'='*60}")

    start = datetime.now()

    with pdfplumber.open(pdf_path) as pdf:
        print(f"Pages: {len(pdf.pages)}, Target: {target:,}")

        mcqs = extract_all_mcqs_ultimate(pdf)
        mcqs.sort(key=lambda x: x['Question_Number'])

        extracted = len(mcqs)
        answers = sum(1 for m in mcqs if m['Correct_Answer'])

        ans_pct = answers * 100 // extracted if extracted > 0 else 0

        status = "✅" if ans_pct >= 95 else "⚠️" if ans_pct >= 80 else "❓"

        print(f"{status} MCQs: {extracted:,}, Answers: {answers:,} ({ans_pct}%)")

        # Save
        df = pd.DataFrame(mcqs)
        output_file = f"{OUTPUT_FOLDER}/{subject_name}.csv"
        df.to_csv(output_file, index=False, encoding='utf-8')

        print(f"Time: {datetime.now() - start}")

        return extracted, target, answers


def main():
    print("="*60)
    print("ULTIMATE MCQ EXTRACTION")
    print("Maximum answer detection with fuzzy matching")
    print("="*60)

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    total_start = datetime.now()
    results = []

    for pdf_path, subject_name, target in SUBJECTS:
        try:
            extracted, target, answers = process_subject(pdf_path, subject_name, target)
            results.append((subject_name, extracted, target, answers))
        except Exception as e:
            print(f"\n❌ ERROR: {subject_name}: {e}")
            import traceback
            traceback.print_exc()
            results.append((subject_name, 0, target, 0))

    # Summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)

    total_extracted = 0
    total_answers = 0

    for subject, extracted, target, answers in results:
        ans_pct = answers * 100 // extracted if extracted > 0 else 0
        status = "✅" if ans_pct >= 95 else "⚠️" if ans_pct >= 80 else "❓"
        print(f"{status} {subject}: {answers:,}/{extracted:,} ({ans_pct}%)")
        total_extracted += extracted
        total_answers += answers

    total_pct = total_answers * 100 // total_extracted if total_extracted > 0 else 0
    print(f"\n{'='*60}")
    print(f"TOTAL: {total_answers:,}/{total_extracted:,} answers ({total_pct}%)")
    print(f"Time: {datetime.now() - total_start}")
    print("="*60)


if __name__ == "__main__":
    main()
