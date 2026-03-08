#!/usr/bin/env python3
"""
100% COMPLETE Computer MCQs Extractor
Extract ALL 3,098 MCQs - handles ALL edge cases
"""

import pdfplumber
import pandas as pd
import re
from datetime import datetime

PDF_PATH = "/Users/asfandiyarsafi/Downloads/PPSC/PPSC Computer Past Papers MCQs (2015 to Date).pdf"
OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs"
TARGET = 3098

def get_all_bold_texts(pdf):
    """Get ALL bold text from entire PDF"""
    all_bolds = []

    for page_num in range(7, len(pdf.pages)):
        page = pdf.pages[page_num]
        chars = page.chars
        current = []

        for char in chars:
            if 'bold' in char.get('fontname', '').lower():
                current.append(char['text'])
            else:
                if current:
                    text = ''.join(current).strip()
                    if len(text) > 1:
                        all_bolds.append(text)
                    current = []

        if current:
            text = ''.join(current).strip()
            if len(text) > 1:
                all_bolds.append(text)

    return all_bolds

def extract_complete_text(pdf):
    """Get ALL text from PDF (skip only pure ad pages)"""
    pure_ad_keywords = [
        '500 free essays for css',
        'css current affairs solved past papers by sir ammar',
        'css solved gsa past papers by miss iqra',
        'css solved islamiat past papers by miss ayesha',
        'css solved pakistan affairs past papers from',
        'english essay & precis course for css & pms by sir kazim',
        'students\' reviews on sir syed kazim ali',
        'write & get your voice of knowledge heard'
    ]

    all_text = []

    for page_num in range(7, len(pdf.pages)):
        text = pdf.pages[page_num].extract_text()

        if not text or len(text) < 50:
            continue

        # Skip ONLY pure ad pages (pages with NO question numbers)
        if not re.search(r'\d+\.\s+', text):
            text_lower = text.lower()
            if any(keyword in text_lower for keyword in pure_ad_keywords):
                continue

        # Clean
        text = re.sub(r'Book\..*?PPSC Computer Past Papers.*?\n', '', text, flags=re.DOTALL)
        text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
        text = re.sub(r'Choose the correct option\.?\s*', '\n', text, flags=re.I)

        all_text.append(text)

    return '\n'.join(all_text)

def extract_all_mcqs(combined_text, bold_texts):
    """Extract ALL MCQs from combined text"""

    lines = combined_text.split('\n')
    lines = [l.strip() for l in lines if l.strip()]

    mcqs = []
    i = 0

    while i < len(lines):
        line = lines[i]

        # Question pattern - be very flexible
        # Match: "3098." or "3098 ." or " 3098." etc
        q_match = re.match(r'^\s*(\d+)\s*\.\s*(.+)?', line)

        if q_match:
            q_num = q_match.group(1)
            q_text = (q_match.group(2) or '').strip()

            # Collect question text and options
            options = {}
            j = i + 1

            # Look ahead up to 40 lines for options
            max_look = min(i + 40, len(lines))

            while j < max_look:
                opt_line = lines[j]

                # Option: "a." or "a)" or "a :" or "  a."
                opt_match = re.match(r'^\s*([a-d])\s*[\.\):\s]\s*(.+)', opt_line, re.I)

                if opt_match:
                    opt_letter = opt_match.group(1).upper()
                    opt_text = opt_match.group(2).strip()

                    if opt_letter not in options:
                        options[opt_letter] = opt_text
                    else:
                        options[opt_letter] += ' ' + opt_text

                    j += 1

                    # If we have all 4, we're done
                    if len(options) == 4:
                        break
                elif len(options) > 0:
                    # Continuation of last option OR new question
                    if re.match(r'^\s*\d+\s*\.', opt_line):
                        # New question, stop
                        break
                    else:
                        # Continuation
                        last_opt = max(options.keys())
                        options[last_opt] += ' ' + opt_line
                        j += 1
                elif q_text == '' or len(q_text) < 200:
                    # Continuation of question
                    q_text += ' ' + opt_line
                    j += 1
                else:
                    j += 1

            # Save if we have all 4 options
            if len(options) == 4 and all(k in options for k in ['A', 'B', 'C', 'D']):
                # Find answer
                answer = ''
                for bold in bold_texts:
                    bold_lower = bold.lower().strip()
                    for opt_letter, opt_text in options.items():
                        opt_lower = opt_text.lower().strip()

                        if opt_lower and (
                            bold_lower == opt_lower or
                            (len(opt_lower) > 20 and opt_lower[:25] in bold_lower) or
                            (len(bold_lower) > 20 and bold_lower[:25] in opt_lower)
                        ):
                            answer = opt_letter
                            break

                    if answer:
                        break

                mcqs.append({
                    'Question_Number': q_num,
                    'Question': q_text,
                    'Option_A': options['A'],
                    'Option_B': options['B'],
                    'Option_C': options['C'],
                    'Option_D': options['D'],
                    'Correct_Answer': answer
                })

                i = j
            else:
                i += 1
        else:
            i += 1

    return mcqs

def main():
    print("="*80)
    print("100% COMPLETE EXTRACTION - ALL 3,098 MCQs")
    print("="*80)
    print(f"Target: EXACTLY {TARGET:,} MCQs")
    print("="*80 + "\n")

    start = datetime.now()

    with pdfplumber.open(PDF_PATH) as pdf:
        print(f"Total pages: {len(pdf.pages)}\n")

        print("Step 1: Extracting all bold text for answers...")
        bold_texts = get_all_bold_texts(pdf)
        print(f"  Bold text segments: {len(bold_texts):,}\n")

        print("Step 2: Combining all page text...")
        combined_text = extract_complete_text(pdf)
        print(f"  Combined text length: {len(combined_text):,} characters\n")

        print("Step 3: Extracting all MCQs...")
        mcqs = extract_all_mcqs(combined_text, bold_texts)

        # Sort by question number
        mcqs.sort(key=lambda x: int(x['Question_Number']))

        print(f"\n{'='*80}")
        print("EXTRACTION COMPLETE")
        print(f"{'='*80}")
        print(f"Total MCQs extracted: {len(mcqs):,}")
        print(f"Target: {TARGET:,}")

        if len(mcqs) == TARGET:
            print(f"Match: ✅ PERFECT 100%!")
        else:
            pct = len(mcqs) * 100 // TARGET
            diff = abs(TARGET - len(mcqs))
            print(f"Match: {pct}% ({len(mcqs):,} / {TARGET:,})")
            print(f"{'Missing' if len(mcqs) < TARGET else 'Extra'}: {diff:,} MCQs")

            # Show question number range
            q_nums = sorted([int(m['Question_Number']) for m in mcqs])
            print(f"\nQuestion range: {min(q_nums)} to {max(q_nums)}")

        answers = sum(1 for m in mcqs if m['Correct_Answer'])
        print(f"Answers detected: {answers:,} ({answers*100//len(mcqs) if mcqs else 0}%)")

        # Save
        df = pd.DataFrame(mcqs)
        output_file = f"{OUTPUT_FOLDER}/Basic_Computer.csv"
        df.to_csv(output_file, index=False, encoding='utf-8')

        print(f"\n✅ Saved: {output_file}")
        print(f"⏱️  Time: {datetime.now() - start}")
        print("="*80)

if __name__ == "__main__":
    main()
