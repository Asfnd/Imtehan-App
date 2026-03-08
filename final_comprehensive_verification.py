#!/usr/bin/env python3
"""
FINAL COMPREHENSIVE VERIFICATION
Searches ENTIRE PDF for each question (not just expected page ranges)
This fixes Geography and Ethics_Civics where questions are scattered
"""

import pdfplumber
import csv
import re
import os
from collections import defaultdict

PDF_PATH = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'
INPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_VERIFIED_FINAL"
OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_FINAL_VERIFIED"


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


def get_page_bolds(page):
    """Get all bold text from a page - PROVEN METHOD"""
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


def build_question_page_index(pdf):
    """Build index of question number -> page number for ENTIRE PDF"""
    print("Building question index across entire PDF...")
    q_index = {}

    for page_num in range(len(pdf.pages)):
        if page_num % 500 == 0:
            print(f"  Indexing page {page_num}/{len(pdf.pages)}...", end='\r')

        try:
            text = pdf.pages[page_num].extract_text()
            if not text:
                continue

            # Find all question numbers on this page
            q_nums = re.findall(r'(?:^|\n)\s*(\d+)\s*\.', text)
            for q_num in q_nums:
                q_num_int = int(q_num)
                # Store first occurrence of each question number
                if q_num_int not in q_index:
                    q_index[q_num_int] = page_num
        except:
            continue

    print(f"  Indexed {len(q_index):,} questions across {len(pdf.pages):,} pages")
    return q_index


def find_answer_for_question(pdf, q_num, options, q_index):
    """
    Find answer using question index (searches entire PDF)
    """
    if q_num not in q_index:
        return None

    page_num = q_index[q_num]

    try:
        # Get bolds from question's page AND next page (proven method)
        page_bolds = get_page_bolds(pdf.pages[page_num])

        next_bolds = []
        if page_num + 1 < len(pdf.pages):
            next_bolds = get_page_bolds(pdf.pages[page_num + 1])

        all_bolds = page_bolds + next_bolds

        # Match options to bolds
        for letter, opt_text in options.items():
            opt_norm = normalize(opt_text)
            if not opt_norm:
                continue

            for bold in all_bolds:
                bold_norm = normalize(bold)
                if not bold_norm:
                    continue

                # Exact match
                if bold_norm == opt_norm:
                    return letter

                # Partial match for longer text
                if len(bold_norm) > 10 and len(opt_norm) > 10:
                    if bold_norm in opt_norm or opt_norm in bold_norm:
                        return letter

        return None
    except:
        return None


def verify_and_fix_subject(pdf, subject, q_index, apply_fixes=True):
    """Verify all questions in a subject using question index"""
    csv_file = f"{INPUT_FOLDER}/{subject}.csv"

    if not os.path.exists(csv_file):
        print(f"  ✗ File not found: {csv_file}")
        return 0, 0, 0, []

    print(f"\n{subject}:", end=" ", flush=True)

    with open(csv_file, 'r', encoding='utf-8') as f:
        rows = list(csv.DictReader(f))

    corrections = []
    verified = 0
    errors = 0
    missing = 0

    for row in rows:
        q_num = int(row['Question_Number'])
        csv_answer = row['Correct_Answer'].strip()

        options = {
            'A': row['Option_A'],
            'B': row['Option_B'],
            'C': row['Option_C'],
            'D': row['Option_D'],
        }

        pdf_answer = find_answer_for_question(pdf, q_num, options, q_index)

        if pdf_answer:
            if csv_answer and pdf_answer == csv_answer:
                verified += 1
            else:
                errors += 1
                corrections.append({
                    'q_num': q_num,
                    'old_answer': csv_answer,
                    'new_answer': pdf_answer,
                    'question': row['Question'][:50]
                })
                if apply_fixes:
                    row['Correct_Answer'] = pdf_answer
        else:
            if not csv_answer:
                missing += 1

    # Report
    total = len(rows)
    pct = verified * 100 // (verified + errors) if (verified + errors) > 0 else 0
    status = "✓" if errors == 0 else "!"
    print(f"{status} {verified}/{total} verified, {errors} fixed")

    # Show sample corrections
    if corrections and len(corrections) <= 3:
        for c in corrections:
            print(f"    Q{c['q_num']}: {c['old_answer']} → {c['new_answer']} | {c['question']}...")
    elif corrections:
        for c in corrections[:3]:
            print(f"    Q{c['q_num']}: {c['old_answer']} → {c['new_answer']} | {c['question']}...")
        print(f"    ... and {len(corrections)-3} more")

    # Apply fixes
    if apply_fixes and corrections:
        os.makedirs(OUTPUT_FOLDER, exist_ok=True)
        output_file = f"{OUTPUT_FOLDER}/{subject}.csv"

        with open(output_file, 'w', encoding='utf-8', newline='') as f:
            fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

    return verified, errors, missing, corrections


def main():
    print("="*70)
    print("FINAL COMPREHENSIVE VERIFICATION")
    print("="*70)
    print("Searching ENTIRE PDF for all questions")
    print("="*70)

    if not os.path.exists(PDF_PATH):
        print(f"ERROR: PDF not found at {PDF_PATH}")
        return

    with pdfplumber.open(PDF_PATH) as pdf:
        # Build question index ONCE for entire PDF
        q_index = build_question_page_index(pdf)

        # Verify all subjects
        subjects = [
            'General_Knowledge', 'Pakistan_Studies', 'Everyday_Science', 'Islamiyat',
            'Current_Affairs', 'English', 'Basic_Computer', 'Urdu', 'General_Maths',
            'Geography', 'Ethics_Civics'
        ]

        total_verified = 0
        total_errors = 0
        total_missing = 0

        for subject in subjects:
            try:
                v, e, m, _ = verify_and_fix_subject(pdf, subject, q_index, apply_fixes=True)
                total_verified += v
                total_errors += e
                total_missing += m
            except Exception as ex:
                print(f"\n  ✗ Error processing {subject}: {ex}")

        print("\n" + "="*70)
        print("FINAL SUMMARY")
        print("="*70)
        print(f"Total Verified: {total_verified:,}")
        print(f"Total Fixed: {total_errors:,}")
        print(f"Total Missing: {total_missing:,}")

        if total_errors > 0:
            print(f"\n✓ Applied {total_errors:,} corrections")
            print(f"Output: {OUTPUT_FOLDER}/")
        else:
            print("\n✓ All answers already correct!")


if __name__ == "__main__":
    main()
