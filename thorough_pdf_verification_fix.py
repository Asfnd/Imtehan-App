#!/usr/bin/env python3
"""
Thorough PDF verification - same proven methodology from separate PDFs
Checks EVERY question against PDF, page by page
"""

import csv
import pdfplumber
import re
import os
from collections import defaultdict

PDF_PATH = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'
CSV_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs"
OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_THOROUGHLY_VERIFIED"

subjects = [
    'General_Maths',  # Start with General_Maths since user found error
    'General_Knowledge', 'Pakistan_Studies', 'Everyday_Science', 'Islamiyat',
    'Current_Affairs', 'English', 'Basic_Computer', 'Geography', 'Urdu',
    'Ethics_Civics'
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

def build_bold_index(pdf, start_page=0, end_page=None):
    """Build index of all bold text across pages"""
    if end_page is None:
        end_page = len(pdf.pages)

    bold_index = defaultdict(list)

    for page_num in range(start_page, min(end_page, len(pdf.pages))):
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
    """Find the page containing this question"""
    if cache is not None and q_num in cache:
        return cache[q_num]

    pattern = rf'(?:^|\n)\s*{q_num}\s*\.'

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
    Find answer using hybrid approach with page distance scoring
    Same proven method from separate PDFs
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

        # Check partial match for longer text
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

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

print("="*70)
print("THOROUGH PDF VERIFICATION - PROVEN METHODOLOGY")
print("="*70)

# Build global bold index once
print("\nBuilding global bold text index...")
with pdfplumber.open(PDF_PATH) as pdf:
    bold_index = build_bold_index(pdf)
print(f"Found {len(bold_index):,} unique bold texts")

all_errors = {}
all_stats = {}

with pdfplumber.open(PDF_PATH) as pdf:
    for subject_idx, subject in enumerate(subjects, 1):
        csv_file = f"{CSV_FOLDER}/{subject}.csv"

        if not os.path.exists(csv_file):
            print(f"\n[{subject_idx}/{len(subjects)}] {subject}: File not found, skipping")
            continue

        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        print(f"\n[{subject_idx}/{len(subjects)}] {subject}: Verifying {len(rows)} questions...")

        correct = 0
        wrong = 0
        no_answer = 0
        errors = []
        page_cache = {}

        for i, row in enumerate(rows):
            if (i + 1) % 100 == 0:
                print(f"  Progress: {i+1}/{len(rows)}...")

            q_num = int(row['Question_Number'])
            csv_answer = row['Correct_Answer'].strip().upper()

            if not csv_answer:
                no_answer += 1
                continue

            options = {
                'A': row['Option_A'],
                'B': row['Option_B'],
                'C': row['Option_C'],
                'D': row['Option_D'],
            }

            # Find question page
            q_page = find_question_page(pdf, q_num, page_cache)

            # Find answer using bold index
            pdf_answer = find_answer_hybrid(options, bold_index, q_page)

            if pdf_answer:
                if pdf_answer == csv_answer:
                    correct += 1
                else:
                    wrong += 1
                    errors.append({
                        'q_num': q_num,
                        'csv_answer': csv_answer,
                        'pdf_answer': pdf_answer,
                        'question': row['Question'][:80]
                    })
            else:
                no_answer += 1

        total = correct + wrong + no_answer
        correct_pct = correct * 100 // (correct + wrong) if (correct + wrong) > 0 else 0

        all_stats[subject] = {
            'correct': correct,
            'wrong': wrong,
            'no_answer': no_answer,
            'total': total,
            'pct': correct_pct
        }

        all_errors[subject] = errors

        status = "✓" if correct_pct >= 99 else "!" if correct_pct >= 95 else "✗"
        print(f"{status} {subject}: {correct}/{correct+wrong} verified ({correct_pct}%) - {wrong} errors found")

        # Show first 5 errors
        if wrong > 0 and wrong <= 5:
            for err in errors:
                print(f"    Q{err['q_num']}: {err['csv_answer']} → {err['pdf_answer']}")
        elif wrong > 5:
            for err in errors[:5]:
                print(f"    Q{err['q_num']}: {err['csv_answer']} → {err['pdf_answer']}")
            print(f"    ... and {wrong - 5} more")

# Apply all corrections
print("\n" + "="*70)
print("APPLYING ALL CORRECTIONS")
print("="*70)

total_corrections = 0

for subject in subjects:
    csv_file = f"{CSV_FOLDER}/{subject}.csv"

    if not os.path.exists(csv_file):
        continue

    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    # Apply corrections
    if subject in all_errors and all_errors[subject]:
        correction_map = {e['q_num']: e['pdf_answer'] for e in all_errors[subject]}

        for row in rows:
            q_num = int(row['Question_Number'])
            if q_num in correction_map:
                row['Correct_Answer'] = correction_map[q_num]

        total_corrections += len(all_errors[subject])

    # Write corrected CSV
    output_file = f"{OUTPUT_FOLDER}/{subject}.csv"
    fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']

    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    if subject in all_errors and all_errors[subject]:
        print(f"{subject}: {len(all_errors[subject])} corrections applied")

print("\n" + "="*70)
print("SUMMARY")
print("="*70)

for subject in subjects:
    if subject in all_stats:
        stats = all_stats[subject]
        errors_count = len(all_errors.get(subject, []))
        status = "✓" if stats['pct'] >= 99 else "!" if stats['pct'] >= 95 else "✗"
        print(f"{status} {subject:<20} {stats['correct']}/{stats['correct']+stats['wrong']} ({stats['pct']}%) | {errors_count} fixed")

print(f"\n{'='*70}")
print(f"TOTAL CORRECTIONS: {total_corrections}")
print(f"Output: {OUTPUT_FOLDER}")
print("="*70)
