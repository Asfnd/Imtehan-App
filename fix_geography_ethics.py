#!/usr/bin/env python3
"""
Targeted fix for Geography and Ethics_Civics
Searches by question TEXT to handle duplicate question numbers
"""

import pdfplumber
import csv
import re
import os

PDF_PATH = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'
INPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_VERIFIED_FINAL"
OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_FINAL_VERIFIED"


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


def find_question_by_text(pdf, question_text, q_num):
    """Search entire PDF for a question by its text content"""
    # Normalize for searching
    q_norm = normalize(question_text)
    # Use first 30 chars as signature
    q_signature = q_norm[:50] if len(q_norm) > 50 else q_norm

    for page_num in range(len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if not text:
                continue

            # Check if this page has our question
            text_norm = normalize(text)
            if q_signature in text_norm:
                # Verify it's the right question number too
                if re.search(rf'(?:^|\n)\s*{q_num}\s*\.', text):
                    return page_num
        except:
            continue

    return None


def fix_subject(pdf, subject):
    """Fix a specific subject by searching questions by text"""
    csv_file = f"{INPUT_FOLDER}/{subject}.csv"

    if not os.path.exists(csv_file):
        print(f"  ✗ File not found: {csv_file}")
        return

    print(f"\nProcessing {subject}...")

    with open(csv_file, 'r', encoding='utf-8') as f:
        rows = list(csv.DictReader(f))

    corrections = []

    for i, row in enumerate(rows):
        if (i + 1) % 100 == 0:
            print(f"  Progress: {i+1}/{len(rows)}...", end='\r')

        q_num = int(row['Question_Number'])
        csv_answer = row['Correct_Answer'].strip()
        question_text = row['Question']

        options = {
            'A': row['Option_A'],
            'B': row['Option_B'],
            'C': row['Option_C'],
            'D': row['Option_D'],
        }

        # Find question by text
        page_num = find_question_by_text(pdf, question_text, q_num)

        if page_num is None:
            continue

        # Get bolds from question's page and next page
        page_bolds = get_page_bolds(pdf.pages[page_num])
        next_bolds = []
        if page_num + 1 < len(pdf.pages):
            next_bolds = get_page_bolds(pdf.pages[page_num + 1])
        all_bolds = page_bolds + next_bolds

        # Match options to bolds
        pdf_answer = None
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
                    pdf_answer = letter
                    break

                # Partial match for longer text
                if len(bold_norm) > 10 and len(opt_norm) > 10:
                    if bold_norm in opt_norm or opt_norm in bold_norm:
                        pdf_answer = letter
                        break

            if pdf_answer:
                break

        # Check if correction needed
        if pdf_answer and csv_answer and pdf_answer != csv_answer:
            corrections.append({
                'q_num': q_num,
                'old': csv_answer,
                'new': pdf_answer,
                'question': question_text[:60]
            })
            row['Correct_Answer'] = pdf_answer

    print(f"  Found {len(corrections)} corrections                    ")

    # Show corrections
    for c in corrections[:5]:
        print(f"    Q{c['q_num']}: {c['old']} → {c['new']} | {c['question']}...")
    if len(corrections) > 5:
        print(f"    ... and {len(corrections)-5} more")

    # Save
    if corrections:
        os.makedirs(OUTPUT_FOLDER, exist_ok=True)
        output_file = f"{OUTPUT_FOLDER}/{subject}.csv"

        with open(output_file, 'w', encoding='utf-8', newline='') as f:
            fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

        print(f"  ✓ Saved to {output_file}")
    else:
        print(f"  ✓ No corrections needed")

    return corrections


def main():
    print("="*70)
    print("TARGETED FIX - Geography & Ethics_Civics")
    print("="*70)
    print("Using question text matching to handle duplicate question numbers")
    print("="*70)

    if not os.path.exists(PDF_PATH):
        print(f"ERROR: PDF not found")
        return

    with pdfplumber.open(PDF_PATH) as pdf:
        print(f"PDF has {len(pdf.pages)} pages")

        # Fix both subjects
        geo_corrections = fix_subject(pdf, 'Geography')
        ethics_corrections = fix_subject(pdf, 'Ethics_Civics')

        total = len(geo_corrections or []) + len(ethics_corrections or [])

        print("\n" + "="*70)
        print(f"✓ Applied {total} corrections total")
        print(f"Output: {OUTPUT_FOLDER}/")


if __name__ == "__main__":
    main()
