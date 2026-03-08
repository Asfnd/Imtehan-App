#!/usr/bin/env python3
"""
Extract MCQs from combined PDF using hybrid bold matching + page distance
Based on the successful extract_all_clean.py approach
"""

import pdfplumber
import csv
import re
import os
from datetime import datetime
from collections import defaultdict

OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_Final"

# All 11 subjects with expected counts from TOC
SUBJECTS_EXPECTED = {
    'General_Knowledge': 4162,
    'Pakistan_Studies': 3428,
    'Everyday_Science': 4569,
    'Islamiyat': 1753,
    'Current_Affairs': 425,
    'English': 993,
    'Basic_Computer': 1549,
    'Geography': 549,
    'Urdu': 632,
    'Ethics_Civics': 491,
    'General_Maths': 478,
}

SUBJECTS_ORDER = [
    'General_Knowledge', 'Pakistan_Studies', 'Everyday_Science', 'Islamiyat',
    'Current_Affairs', 'English', 'Basic_Computer', 'Geography', 'Urdu',
    'Ethics_Civics', 'General_Maths'
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
    text = re.sub(r'Book\..*?MCQs\s*\([^)]+\).*?(?=\s*[A-D]\.|$)', '', text, flags=re.DOTALL)
    text = re.sub(r'Edition.*?(?:PPSC|MCQs).*', '', text, flags=re.DOTALL)
    text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2013', '-').replace('\u2014', '-')
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def build_bold_index(pdf):
    """Build index: normalized_text -> list of pages where it appears"""
    bold_index = defaultdict(list)

    for page_num in range(len(pdf.pages)):
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


def find_question_page(pdf, q_num, cache=None):
    """Find page containing question"""
    if cache is not None and q_num in cache:
        return cache[q_num]

    pattern = rf'(?:^|\n)\s*{q_num}\.\s+'

    for page_num in range(len(pdf.pages)):
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
    1. Check if option exists in bold_index
    2. Score by page distance
    3. Pick closest to question page
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


def extract_complete_text(pdf):
    """Get ALL text from PDF"""
    all_text = []

    for page_num in range(len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if not text or len(text) < 50:
                continue

            text = re.sub(r'Book\..*?Past Papers.*?\n', '', text, flags=re.DOTALL)
            text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
            text = re.sub(r'Choose the correct (option|answer)\.?\s*', '\n', text, flags=re.I)

            all_text.append(text)
        except:
            continue

    return '\n'.join(all_text)


def extract_all_questions(pdf):
    """Extract all questions as single stream"""
    combined_text = extract_complete_text(pdf)
    lines = [l.strip() for l in combined_text.split('\n') if l.strip()]

    mcqs = []
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
                mcqs.append({
                    'Question_Number': q_num,
                    'Question': clean_text(q_text),
                    'Option_A': clean_text(options['A']),
                    'Option_B': clean_text(options['B']),
                    'Option_C': clean_text(options['C']),
                    'Option_D': clean_text(options['D']),
                })
                i = j
            else:
                i += 1
        else:
            i += 1

    return mcqs


def partition_and_save(all_mcqs, pdf_path):
    """
    Partition questions into subjects and save CSVs
    Uses expected counts to determine subject boundaries
    """
    # Build bold index once for all answer matching
    print("\nBuilding bold text index...")
    with pdfplumber.open(pdf_path) as pdf:
        bold_index = build_bold_index(pdf)
        print(f"  Found {len(bold_index):,} unique bold texts")

    # Sort questions by number
    all_mcqs.sort(key=lambda x: x['Question_Number'])

    # Partition by expected counts
    subject_mcqs = {}
    q_idx = 0
    page_cache = {}

    for subject in SUBJECTS_ORDER:
        expected = SUBJECTS_EXPECTED[subject]
        subject_mcqs[subject] = []

        for _ in range(expected):
            if q_idx < len(all_mcqs):
                subject_mcqs[subject].append(all_mcqs[q_idx])
                q_idx += 1

    print("\nFinding answers and saving CSVs...")
    print("=" * 70)

    results = []

    with pdfplumber.open(pdf_path) as pdf:
        for subject in SUBJECTS_ORDER:
            mcqs = subject_mcqs[subject]

            # Find answers
            for mcq in mcqs:
                q_page = find_question_page(pdf, mcq['Question_Number'], page_cache)
                answer = find_answer_hybrid(
                    {
                        'A': mcq['Option_A'],
                        'B': mcq['Option_B'],
                        'C': mcq['Option_C'],
                        'D': mcq['Option_D'],
                    },
                    bold_index,
                    q_page
                )
                mcq['Correct_Answer'] = answer

            # Save CSV
            fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
            output_file = f"{OUTPUT_FOLDER}/{subject}.csv"

            with open(output_file, 'w', encoding='utf-8', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                for mcq in mcqs:
                    writer.writerow({k: mcq.get(k, '') for k in fieldnames})

            extracted = len(mcqs)
            answers = sum(1 for m in mcqs if m['Correct_Answer'])
            expected = SUBJECTS_EXPECTED[subject]
            ans_pct = answers * 100 // extracted if extracted > 0 else 0

            status = "✓" if ans_pct >= 95 else "!" if ans_pct >= 80 else "✗"
            match = "✓" if extracted == expected else f"! {extracted}/{expected}"

            print(f"{status} {subject:<20} {answers:,}/{extracted:,} ({ans_pct}%) [{match}]")
            results.append((subject, extracted, answers, expected))

    # Summary
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)

    total_e = sum(r[1] for r in results)
    total_a = sum(r[2] for r in results)
    total_ex = sum(r[3] for r in results)

    print(f"\nTOTAL: {total_a:,}/{total_e:,} ({total_a*100//total_e if total_e else 0}%)")
    print(f"Expected: {total_ex:,} | Extracted: {total_e:,}")


def main():
    print("=" * 70)
    print("EXTRACTING FROM COMBINED PDF - USING HYBRID MATCHING")
    print("=" * 70)

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    pdf_path = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'

    print("\nStep 1: Extracting all questions...")
    all_mcqs = extract_all_questions(pdfplumber.open(pdf_path))
    print(f"  Extracted {len(all_mcqs):,} questions")

    print("\nStep 2: Partitioning and saving...")
    partition_and_save(all_mcqs, pdf_path)


if __name__ == "__main__":
    main()
