#!/usr/bin/env python3
"""
Final comprehensive fix for all subjects
Uses the same methodology that worked well for individual PDFs
Verifies each answer and fixes incorrect ones
"""

import csv
import pdfplumber
import re
import os
from collections import defaultdict

PDF_PATH = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'
CSV_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs"
OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_FINAL"

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

def find_answer_hybrid(pdf, q_num, options, csv_answer):
    """Find correct answer using bold text detection"""
    for page_num in range(len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if text and re.search(rf'(?:^|\n)\s*{q_num}\s*\.', text):
                # Found the question page
                bolds = get_page_bolds(pdf.pages[page_num])

                # Check which option is bold
                pdf_answer = None
                candidates = []

                for letter, option_text in options.items():
                    norm = normalize(option_text)
                    if not norm:
                        continue

                    # Exact match
                    if norm in [normalize(b) for b in bolds]:
                        candidates.append((letter, 'exact'))

                    # Partial match for longer text
                    elif len(norm) > 10:
                        for bold_text in bolds:
                            bold_norm = normalize(bold_text)
                            if len(bold_norm) > 10:
                                if norm in bold_norm or bold_norm in norm:
                                    candidates.append((letter, 'partial'))
                                    break

                if candidates:
                    # Prefer exact matches
                    exact = [c for c in candidates if c[1] == 'exact']
                    pdf_answer = exact[0][0] if exact else candidates[0][0]

                    if normalize(csv_answer) == normalize(pdf_answer):
                        return ('correct', pdf_answer)
                    else:
                        return ('wrong', pdf_answer)
                else:
                    return ('inconclusive', None)
        except:
            pass

    return ('inconclusive', None)

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

print("="*70)
print("COMPREHENSIVE FIX - ALL SUBJECTS")
print("="*70)

all_corrections = {}
subject_stats = {}

with pdfplumber.open(PDF_PATH) as pdf:
    for subject_idx, subject in enumerate(subjects, 1):
        csv_file = f"{CSV_FOLDER}/{subject}.csv"

        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        print(f"\n[{subject_idx}/11] {subject}: Verifying {len(rows)} questions...")

        correct = 0
        wrong = 0
        inconclusive = 0
        corrections = []

        for i, row in enumerate(rows):
            if (i + 1) % 500 == 0:
                print(f"  Progress: {i+1}/{len(rows)}...")

            q_num = int(row['Question_Number'])
            csv_answer = row['Correct_Answer'].strip().upper()

            if not csv_answer:
                inconclusive += 1
                continue

            options = {
                'A': row['Option_A'],
                'B': row['Option_B'],
                'C': row['Option_C'],
                'D': row['Option_D'],
            }

            status, pdf_answer = find_answer_hybrid(pdf, q_num, options, csv_answer)

            if status == 'correct':
                correct += 1
            elif status == 'wrong':
                wrong += 1
                corrections.append({
                    'q_num': q_num,
                    'csv_answer': csv_answer,
                    'pdf_answer': pdf_answer
                })
            else:
                inconclusive += 1

        total = correct + wrong + inconclusive
        pct = correct * 100 // total if total > 0 else 0

        subject_stats[subject] = {
            'correct': correct,
            'wrong': wrong,
            'total': total,
            'pct': pct
        }

        all_corrections[subject] = corrections

        status_icon = "✓" if pct >= 99 else "!" if pct >= 95 else "✗"
        print(f"{status_icon} {subject}: {correct}/{total} correct ({pct}%) - {wrong} to fix")

        if wrong > 0 and wrong <= 10:
            for corr in corrections:
                print(f"    Q{corr['q_num']}: {corr['csv_answer']} → {corr['pdf_answer']}")
        elif wrong > 10:
            for corr in corrections[:5]:
                print(f"    Q{corr['q_num']}: {corr['csv_answer']} → {corr['pdf_answer']}")
            print(f"    ... and {wrong - 5} more")

# Apply all corrections
print("\n" + "="*70)
print("APPLYING ALL CORRECTIONS")
print("="*70)

total_corrections = 0

for subject in subjects:
    csv_file = f"{CSV_FOLDER}/{subject}.csv"
    output_file = f"{OUTPUT_FOLDER}/{subject}.csv"

    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    # Apply corrections
    if subject in all_corrections:
        correction_map = {c['q_num']: c['pdf_answer'] for c in all_corrections[subject]}

        for row in rows:
            q_num = int(row['Question_Number'])
            if q_num in correction_map:
                row['Correct_Answer'] = correction_map[q_num]

    # Write corrected CSV
    fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    corrections_count = len(all_corrections.get(subject, []))
    total_corrections += corrections_count

    if corrections_count > 0:
        print(f"{subject}: {corrections_count} corrections applied")

print("\n" + "="*70)
print("SUMMARY")
print("="*70)

for subject in subjects:
    stats = subject_stats[subject]
    corr_count = len(all_corrections.get(subject, []))
    status = "✓" if stats['pct'] >= 99 else "!" if stats['pct'] >= 95 else "✗"
    print(f"{status} {subject:<20} {stats['correct']}/{stats['total']} ({stats['pct']}%) | {corr_count} fixed")

print(f"\n{'='*70}")
print(f"TOTAL CORRECTIONS APPLIED: {total_corrections}")
print(f"Output saved to: {OUTPUT_FOLDER}")
print(f"{'='*70}")
