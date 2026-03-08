#!/usr/bin/env python3
"""
Debug why answer matching fails for some questions
"""

import pdfplumber
import pandas as pd
import re

PDF_PATH = "/Users/asfandiyarsafi/Downloads/PPSC/PPSC Everyday Science Past Papers MCQs (2015 to Date).pdf"
CSV_PATH = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Everyday_Science.csv"


def get_page_bolds_detailed(page):
    """Get bold texts with detailed info"""
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


def find_question_page(pdf, q_num):
    """Find page for question"""
    pattern = rf'(?:^|\s){q_num}\.\s+'
    for page_num in range(7, len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if text and re.search(pattern, text):
                return page_num
        except:
            continue
    return None


def debug_questions():
    """Debug specific questions that should have answers but don't"""
    df = pd.read_csv(CSV_PATH)

    # Find questions WITHOUT answers
    no_answer = df[df['Correct_Answer'].isna() | (df['Correct_Answer'] == '')]

    print(f"Questions without answers: {len(no_answer)}")
    print(f"\nDebugging first 10 questions without answers...\n")

    with pdfplumber.open(PDF_PATH) as pdf:
        count = 0
        for _, row in no_answer.head(20).iterrows():
            q_num = row['Question_Number']
            options = {
                'A': str(row['Option_A']),
                'B': str(row['Option_B']),
                'C': str(row['Option_C']),
                'D': str(row['Option_D']),
            }

            page_num = find_question_page(pdf, q_num)
            if page_num is None:
                continue

            # Get bold texts from this page and next
            bolds = get_page_bolds_detailed(pdf.pages[page_num])
            if page_num + 1 < len(pdf.pages):
                bolds.extend(get_page_bolds_detailed(pdf.pages[page_num + 1]))

            print(f"{'='*60}")
            print(f"Q{q_num} (page {page_num + 1})")
            print(f"{'='*60}")
            print(f"Options:")
            for letter, text in options.items():
                print(f"  {letter}: {text[:50]}")

            print(f"\nBold texts on page:")
            for b in bolds[:15]:
                print(f"  '{b}'")

            # Try to find match
            print(f"\nMatching analysis:")
            for letter, opt_text in options.items():
                opt_lower = opt_text.lower().strip()
                for bold in bolds:
                    bold_lower = bold.lower().strip()

                    # Check various match conditions
                    exact = bold_lower == opt_lower
                    partial1 = len(opt_lower) > 15 and opt_lower[:18] in bold_lower
                    partial2 = len(bold_lower) > 15 and bold_lower[:18] in opt_lower
                    contains = opt_lower in bold_lower or bold_lower in opt_lower

                    if exact or partial1 or partial2:
                        print(f"  SHOULD MATCH: {letter}='{opt_lower[:30]}' vs bold='{bold_lower[:30]}'")
                        print(f"    exact={exact}, partial1={partial1}, partial2={partial2}")
                    elif contains and len(opt_lower) > 3:
                        print(f"  COULD MATCH: {letter}='{opt_lower[:30]}' vs bold='{bold_lower[:30]}'")

            print()
            count += 1
            if count >= 5:
                break


if __name__ == "__main__":
    debug_questions()
