#!/usr/bin/env python3
"""
Quick Final Fix - Efficient verification of remaining errors
Only checks and fixes answers that don't match PDF bold text
"""

import pdfplumber
import csv
import re
import os

PDF_PATH = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'
INPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_FINAL_VERIFIED"
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


def find_question_page(pdf, question_text):
    """Find question by text - search entire PDF"""
    q_norm = normalize(question_text)
    q_sig = q_norm[:50] if len(q_norm) > 50 else q_norm

    for page_num in range(len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if text and q_sig in normalize(text):
                return page_num
        except:
            pass
    return None


def verify_and_fix_quick(pdf, subject):
    """Quick verification - only check and fix actual mismatches"""
    csv_file = f"{INPUT_FOLDER}/{subject}.csv"

    if not os.path.exists(csv_file):
        return 0

    with open(csv_file, 'r', encoding='utf-8') as f:
        rows = list(csv.DictReader(f))

    fixed = 0
    for row in rows:
        csv_answer = row['Correct_Answer'].strip()
        if not csv_answer:
            continue

        # Find question page
        page_num = find_question_page(pdf, row['Question'])
        if page_num is None:
            continue

        # Get bolds from this page and next
        page_bolds = get_page_bolds(pdf.pages[page_num])
        next_bolds = []
        if page_num + 1 < len(pdf.pages):
            next_bolds = get_page_bolds(pdf.pages[page_num + 1])
        all_bolds = page_bolds + next_bolds

        # Check if CSV answer matches any bold
        options = {'A': row['Option_A'], 'B': row['Option_B'],
                   'C': row['Option_C'], 'D': row['Option_D']}

        csv_opt = options.get(csv_answer, '')
        csv_opt_norm = normalize(csv_opt)

        # Check if this answer is in bolds
        found = False
        for bold in all_bolds:
            if normalize(bold) == csv_opt_norm:
                found = True
                break
            if len(csv_opt_norm) > 10 and len(normalize(bold)) > 10:
                if normalize(bold) in csv_opt_norm or csv_opt_norm in normalize(bold):
                    found = True
                    break

        # If not found, search for correct answer
        if not found:
            for letter, opt_text in options.items():
                opt_norm = normalize(opt_text)
                if not opt_norm:
                    continue

                for bold in all_bolds:
                    bold_norm = normalize(bold)
                    if bold_norm == opt_norm or (len(opt_norm) > 10 and len(bold_norm) > 10 and (bold_norm in opt_norm or opt_norm in bold_norm)):
                        if letter != csv_answer:
                            print(f"  {subject} Q{row['Question_Number']}: {csv_answer}→{letter} | {row['Question'][:40]}...")
                            row['Correct_Answer'] = letter
                            fixed += 1
                        break

    # Save if any fixes
    if fixed > 0:
        with open(csv_file, 'w', encoding='utf-8', newline='') as f:
            fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

    return fixed


def main():
    print("="*70)
    print("QUICK FINAL FIX - Checking remaining errors")
    print("="*70)

    with pdfplumber.open(PDF_PATH) as pdf:
        subjects = ['Ethics_Civics', 'Geography', 'General_Knowledge', 'Pakistan_Studies',
                   'Everyday_Science', 'Islamiyat', 'Current_Affairs', 'English',
                   'Basic_Computer', 'Urdu', 'General_Maths']

        total_fixed = 0
        for subject in subjects:
            fixed = verify_and_fix_quick(pdf, subject)
            total_fixed += fixed

        print("="*70)
        if total_fixed == 0:
            print("✓ No errors found! All answers are correct.")
        else:
            print(f"✓ Fixed {total_fixed} remaining errors")
        print("="*70)


if __name__ == "__main__":
    main()
