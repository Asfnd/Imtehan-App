#!/usr/bin/env python3
"""
Extract MCQs from combined PDF with all 11 subjects
Fixed version with correct page boundaries
"""

import pdfplumber
import csv
import re
import os
from collections import defaultdict
from datetime import datetime

OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_Fixed"

# Correct subjects and expected counts from TOC (page 7)
# Page boundaries are estimates - actual boundaries are detected during extraction
SUBJECTS = [
    ('General_Knowledge', 7, 1429, 4162),
    ('Pakistan_Studies', 1430, 2621, 3428),
    ('Everyday_Science', 2622, 4197, 4569),
    ('Islamiyat', 4198, 4811, 1753),
    ('Current_Affairs', 4812, 4962, 425),
    ('English', 4963, 5305, 993),
    ('Basic_Computer', 5306, 5850, 1549),      # CORRECTED: was 6036
    ('Geography', 5851, 6000, 549),            # NEW: was missing
    ('Urdu', 6001, 6400, 632),                 # CORRECTED: was 6037-6432
    ('Ethics_Civics', 6401, 6432, 491),        # NEW: was missing
    ('General_Maths', 6433, 6605, 478),
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


def clean_text(text):
    if not text:
        return ''
    text = re.sub(r'Book\..*?MCQs.*?(?:Edition|Date).*', '', text, flags=re.DOTALL)
    text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2013', '-').replace('\u2014', '-')
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def get_page_bolds(page):
    """Extract bold text from page"""
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


def build_bold_index(pdf, start_page, end_page):
    """Build index of bold text: normalized -> list of page numbers"""
    bold_index = defaultdict(list)

    for page_num in range(start_page, min(end_page + 1, len(pdf.pages))):
        try:
            bolds = get_page_bolds(pdf.pages[page_num])
            for bold in bolds:
                norm = normalize(bold)
                if norm:
                    bold_index[norm].append(page_num)
        except:
            continue

    return bold_index


def find_answer(options, bold_index, q_page):
    """Find correct answer by matching options to bold text"""
    candidates = []

    for letter, text in options.items():
        norm = normalize(text)

        if not norm:
            continue

        # Exact match
        if norm in bold_index:
            pages = bold_index[norm]
            if q_page is not None:
                min_dist = min(abs(p - q_page) for p in pages)
            else:
                min_dist = 1000
            candidates.append((letter, min_dist, 'exact'))

        # Partial match for longer text
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

    candidates.sort(key=lambda x: (x[1], 0 if x[2] == 'exact' else 1))
    return candidates[0][0]


def extract_mcqs_from_range(pdf, start_page, end_page):
    """Extract MCQs from a page range (for one subject)"""

    # Build bold index for this range
    bold_index = build_bold_index(pdf, start_page, end_page)

    # Extract all text from range
    all_text = []
    for page_num in range(start_page, min(end_page + 1, len(pdf.pages))):
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

    combined_text = '\n'.join(all_text)
    lines = [l.strip() for l in combined_text.split('\n') if l.strip()]

    mcqs = []
    i = 0
    page_cache = {}

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
                # Find question page for answer matching
                q_page = start_page + 10  # Approximate

                # Try to find exact page
                for page_num in range(start_page, min(end_page + 1, len(pdf.pages))):
                    try:
                        text = pdf.pages[page_num].extract_text()
                        if text and re.search(rf'(?:^|\n)\s*{q_num}\s*\.', text):
                            q_page = page_num
                            break
                    except:
                        continue

                answer = find_answer(options, bold_index, q_page)

                mcqs.append({
                    'Question_Number': q_num,
                    'Question': clean_text(q_text),
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


def process_subject(pdf_path, subject_name, start_page, end_page, expected_count):
    """Extract and save MCQs for one subject"""
    print(f"\n{'='*60}")
    print(f"{subject_name} (pages {start_page}-{end_page})")
    print(f"{'='*60}")

    start_time = datetime.now()

    with pdfplumber.open(pdf_path) as pdf:
        mcqs = extract_mcqs_from_range(pdf, start_page, end_page)
        mcqs.sort(key=lambda x: x['Question_Number'])

        extracted = len(mcqs)
        answers = sum(1 for m in mcqs if m['Correct_Answer'])
        ans_pct = answers * 100 // extracted if extracted > 0 else 0

        status = "✓" if ans_pct >= 95 else "!" if ans_pct >= 80 else "✗"

        print(f"{status} {extracted:,} MCQs, {answers:,} answers ({ans_pct}%)")
        print(f"Expected: {expected_count} | Extracted: {extracted} | Match: {extracted == expected_count}")

        # Save CSV
        fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
        output_file = f"{OUTPUT_FOLDER}/{subject_name}.csv"

        with open(output_file, 'w', encoding='utf-8', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(mcqs)

        print(f"Time: {datetime.now() - start_time}")

        return extracted, answers, expected_count


def main():
    print("="*60)
    print("EXTRACTING FROM COMBINED PDF - FIXED VERSION")
    print("="*60)

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    results = []
    for subject_name, start_page, end_page, expected_count in SUBJECTS:
        try:
            extracted, answers, expected = process_subject(
                '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf',
                subject_name, start_page, end_page, expected_count
            )
            results.append((subject_name, extracted, answers, expected))
        except Exception as e:
            print(f"✗ {subject_name}: {e}")
            results.append((subject_name, 0, 0, expected_count))

    # Summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)

    total_e = sum(r[1] for r in results)
    total_a = sum(r[2] for r in results)
    total_ex = sum(r[3] for r in results)

    for name, ext, ans, exp in results:
        pct = ans * 100 // ext if ext > 0 else 0
        status = "✓" if pct >= 95 else "!" if pct >= 80 else "✗"
        match = "✓" if ext == exp else f"! {ext}/{exp}"
        print(f"{status} {name:<20} {ans:,}/{ext:,} ({pct}%) [{match}]")

    print(f"\nTOTAL: {total_a:,}/{total_e:,} ({total_a*100//total_e if total_e else 0}%)")
    print(f"Expected: {total_ex:,} | Extracted: {total_e:,}")


if __name__ == "__main__":
    main()
