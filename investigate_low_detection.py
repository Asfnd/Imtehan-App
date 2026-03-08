#!/usr/bin/env python3
"""
Investigate why some PDFs have low answer detection
Check if answers exist but aren't being matched
"""

import pdfplumber
import pandas as pd
import re

# Focus on Everyday Science - 43% detection
PDF_PATH = "/Users/asfandiyarsafi/Downloads/PPSC/PPSC Everyday Science Past Papers MCQs (2015 to Date).pdf"
CSV_PATH = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Everyday_Science.csv"


def get_all_chars_on_page(page):
    """Get all characters with their properties"""
    chars = page.chars
    bold_chars = []
    regular_chars = []

    for char in chars:
        fontname = char.get('fontname', '')
        is_bold = 'bold' in fontname.lower()

        if is_bold:
            bold_chars.append(char)
        else:
            regular_chars.append(char)

    return bold_chars, regular_chars


def examine_question_without_answer(pdf, df, q_num):
    """Examine why a specific question has no answer"""
    row = df[df['Question_Number'] == q_num].iloc[0]

    print(f"\n{'='*70}")
    print(f"Q{q_num}: {row['Question'][:60]}...")
    print(f"{'='*70}")
    print(f"A: {row['Option_A']}")
    print(f"B: {row['Option_B']}")
    print(f"C: {row['Option_C']}")
    print(f"D: {row['Option_D']}")
    print(f"Detected Answer: '{row['Correct_Answer']}'")

    # Find page
    pattern = rf'(?:^|\s){q_num}\.\s+'
    for page_num in range(7, len(pdf.pages)):
        text = pdf.pages[page_num].extract_text()
        if text and re.search(pattern, text):
            print(f"\nPage: {page_num + 1}")

            # Get bold characters
            bold_chars, _ = get_all_chars_on_page(pdf.pages[page_num])

            # Reconstruct bold text segments
            bold_segments = []
            current = []
            for char in bold_chars:
                current.append(char['text'])

            bold_text = ''.join(current)
            print(f"\nAll bold text on page (raw): '{bold_text[:200]}...'")

            # Get properly segmented bold texts
            chars = pdf.pages[page_num].chars
            segments = []
            current_seg = []

            for char in chars:
                if 'bold' in char.get('fontname', '').lower():
                    current_seg.append(char['text'])
                else:
                    if current_seg:
                        seg = ''.join(current_seg).strip()
                        if seg:
                            segments.append(seg)
                        current_seg = []

            if current_seg:
                seg = ''.join(current_seg).strip()
                if seg:
                    segments.append(seg)

            print(f"\nBold segments: {segments[:20]}")

            # Check if any option matches
            options = {
                'A': row['Option_A'],
                'B': row['Option_B'],
                'C': row['Option_C'],
                'D': row['Option_D'],
            }

            print(f"\nChecking matches:")
            for letter, opt in options.items():
                opt_lower = str(opt).lower().strip()
                for seg in segments:
                    seg_lower = seg.lower()
                    if opt_lower == seg_lower:
                        print(f"  EXACT: {letter}='{opt}' matches '{seg}'")
                    elif opt_lower in seg_lower or seg_lower in opt_lower:
                        if len(opt_lower) > 2 and len(seg_lower) > 2:
                            print(f"  PARTIAL: {letter}='{opt}' vs '{seg}'")

            break


# Load data
df = pd.read_csv(CSV_PATH)

# Find questions without answers
no_answer = df[df['Correct_Answer'].isna() | (df['Correct_Answer'] == '')]
print(f"Questions without answers: {len(no_answer)}")

with pdfplumber.open(PDF_PATH) as pdf:
    # Check first 5 questions without answers
    for _, row in no_answer.head(10).iterrows():
        examine_question_without_answer(pdf, df, row['Question_Number'])
