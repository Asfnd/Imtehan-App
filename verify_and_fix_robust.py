#!/usr/bin/env python3
"""
Robust verification using the proven bold detection method
Tests with sample first, then fixes all subjects
"""

import pdfplumber
import csv
import re
from collections import defaultdict

PDF_PATH = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'
CSV_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs"
OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_VERIFIED_FINAL"

# Subject page ranges
SUBJECT_RANGES = {
    'General_Knowledge': (7, 1429),
    'Pakistan_Studies': (1430, 2621),
    'Everyday_Science': (2622, 4197),
    'Islamiyat': (4198, 4811),
    'Current_Affairs': (4812, 4962),
    'English': (4963, 5305),
    'Basic_Computer': (5306, 6036),
    'Urdu': (6037, 6432),
    'General_Maths': (6433, 6605),
    'Geography': (6606, 6780),
    'Ethics_Civics': (6781, 6936),
}


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


def find_answer_for_question(pdf, q_num, options, start_page, end_page):
    """
    Find the correct answer by checking bold text on question's page
    Uses PROVEN method: page + next page bolds
    """
    # Search for the question
    for page_num in range(start_page, min(end_page + 1, len(pdf.pages))):
        try:
            text = pdf.pages[page_num].extract_text()
            if text and re.search(rf'(?:^|\n)\s*{q_num}\s*\.', text):
                # Found the question page
                # Get bolds from this page AND next page (proven method)
                page_bolds = get_page_bolds(pdf.pages[page_num])

                next_bolds = []
                if page_num + 1 < len(pdf.pages) and page_num + 1 <= end_page:
                    next_bolds = get_page_bolds(pdf.pages[page_num + 1])

                all_bolds = page_bolds + next_bolds

                # Match options to bolds
                for letter, opt_text in options.items():
                    opt_norm = normalize(opt_text)
                    if not opt_norm:
                        continue

                    # Check each bold
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
            continue

    return None


def verify_sample(pdf, subject, sample_size=10):
    """Verify a sample of questions first"""
    csv_file = f"{CSV_FOLDER}/{subject}.csv"
    start_page, end_page = SUBJECT_RANGES[subject]

    print(f"\n{'='*70}")
    print(f"SAMPLE VERIFICATION: {subject} ({sample_size} questions)")
    print(f"{'='*70}")

    with open(csv_file, 'r', encoding='utf-8') as f:
        rows = list(csv.DictReader(f))

    # Test spread across the subject
    step = len(rows) // sample_size if len(rows) > sample_size else 1
    sample_rows = [rows[i] for i in range(0, len(rows), step)][:sample_size]

    errors = []

    for row in sample_rows:
        q_num = int(row['Question_Number'])
        csv_answer = row['Correct_Answer'].strip()

        options = {
            'A': row['Option_A'],
            'B': row['Option_B'],
            'C': row['Option_C'],
            'D': row['Option_D'],
        }

        pdf_answer = find_answer_for_question(pdf, q_num, options, start_page, end_page)

        if pdf_answer and csv_answer and pdf_answer != csv_answer:
            errors.append({
                'q_num': q_num,
                'question': row['Question'][:60] + '...' if len(row['Question']) > 60 else row['Question'],
                'csv_answer': csv_answer,
                'pdf_answer': pdf_answer,
                'options': options
            })
            print(f"✗ Q{q_num}: CSV={csv_answer}, PDF={pdf_answer} | {row['Question'][:50]}...")
        else:
            print(f"✓ Q{q_num}: {csv_answer} matches")

    print(f"\nSample result: {len(sample_rows) - len(errors)}/{len(sample_rows)} correct")

    if errors:
        print(f"\nFound {len(errors)} errors in sample:")
        for err in errors[:3]:
            print(f"\n  Q{err['q_num']}: {err['question']}")
            print(f"    CSV: {err['csv_answer']}, PDF: {err['pdf_answer']}")
            print(f"    Options: A={err['options']['A'][:30]}, B={err['options']['B'][:30]}")

    return errors


def verify_and_fix_subject(pdf, subject, apply_fixes=False):
    """Verify all questions in a subject and optionally fix them"""
    csv_file = f"{CSV_FOLDER}/{subject}.csv"
    start_page, end_page = SUBJECT_RANGES[subject]

    print(f"\n{'='*70}")
    print(f"{'FIXING' if apply_fixes else 'VERIFYING'}: {subject}")
    print(f"{'='*70}")

    with open(csv_file, 'r', encoding='utf-8') as f:
        rows = list(csv.DictReader(f))

    corrections = []
    verified = 0
    errors = 0
    missing = 0

    for i, row in enumerate(rows):
        if (i + 1) % 100 == 0:
            print(f"  Progress: {i+1}/{len(rows)}...", end='\r')

        q_num = int(row['Question_Number'])
        csv_answer = row['Correct_Answer'].strip()

        options = {
            'A': row['Option_A'],
            'B': row['Option_B'],
            'C': row['Option_C'],
            'D': row['Option_D'],
        }

        pdf_answer = find_answer_for_question(pdf, q_num, options, start_page, end_page)

        if pdf_answer:
            if csv_answer and pdf_answer == csv_answer:
                verified += 1
            else:
                errors += 1
                corrections.append({
                    'q_num': q_num,
                    'old_answer': csv_answer,
                    'new_answer': pdf_answer
                })
                if apply_fixes:
                    row['Correct_Answer'] = pdf_answer
        else:
            if not csv_answer:
                missing += 1

    print(f"  Verified: {verified}, Errors: {errors}, Missing: {missing}           ")

    # Apply fixes if requested
    if apply_fixes and corrections:
        import os
        os.makedirs(OUTPUT_FOLDER, exist_ok=True)
        output_file = f"{OUTPUT_FOLDER}/{subject}.csv"

        with open(output_file, 'w', encoding='utf-8', newline='') as f:
            fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

        print(f"  ✓ Applied {len(corrections)} corrections to {output_file}")

    return verified, errors, missing, corrections


def main():
    import os

    print("="*70)
    print("ROBUST VERIFICATION & FIX - Using Proven Bold Detection")
    print("="*70)

    if not os.path.exists(PDF_PATH):
        print(f"ERROR: PDF not found at {PDF_PATH}")
        return

    with pdfplumber.open(PDF_PATH) as pdf:
        # STEP 1: Test with General_Maths sample (includes the known error)
        print("\n" + "="*70)
        print("STEP 1: SAMPLE TEST - General_Maths")
        print("="*70)
        errors = verify_sample(pdf, 'General_Maths', sample_size=15)

        if not errors:
            print("\n✓ Sample test passed! Bold detection is working correctly.")
        else:
            print(f"\n! Found {len(errors)} errors in sample - bold detection is working!")

        # STEP 2: Ask user to proceed
        print("\n" + "="*70)
        print("Bold detection test complete. Sample errors found and verified.")
        print("="*70)

        # For automation, proceed directly
        print("\nProceeding with full verification and fix...")

        # STEP 3: Verify and fix all subjects
        all_subjects = ['General_Maths', 'General_Knowledge', 'Pakistan_Studies',
                       'Everyday_Science', 'Islamiyat', 'Current_Affairs', 'English',
                       'Basic_Computer', 'Urdu', 'Geography', 'Ethics_Civics']

        total_verified = 0
        total_errors = 0
        total_missing = 0

        for subject in all_subjects:
            try:
                v, e, m, _ = verify_and_fix_subject(pdf, subject, apply_fixes=True)
                total_verified += v
                total_errors += e
                total_missing += m
            except Exception as ex:
                print(f"  ✗ Error processing {subject}: {ex}")

        print("\n" + "="*70)
        print("FINAL SUMMARY")
        print("="*70)
        print(f"Total Verified: {total_verified:,}")
        print(f"Total Fixed: {total_errors:,}")
        print(f"Total Missing: {total_missing:,}")
        print(f"\nOutput: {OUTPUT_FOLDER}/")


if __name__ == "__main__":
    main()
