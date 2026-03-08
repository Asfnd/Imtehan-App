#!/usr/bin/env python3
"""
FIXED MCQ Extractor v2 - Page-aware answer detection
- Extracts all MCQs (combined text approach)
- Matches answers page-by-page (fixed approach)
"""

import pdfplumber
import pandas as pd
import re
from datetime import datetime

def get_page_bold_texts(pdf, start_page=7):
    """Get bold texts organized by page number"""
    page_bolds = {}

    for page_num in range(start_page, len(pdf.pages)):
        try:
            page = pdf.pages[page_num]
            chars = page.chars
            bolds = []
            current = []

            for char in chars:
                if 'bold' in char.get('fontname', '').lower():
                    current.append(char['text'])
                else:
                    if current:
                        text = ''.join(current).strip()
                        if len(text) > 1:
                            bolds.append(text.lower())
                        current = []

            if current:
                text = ''.join(current).strip()
                if len(text) > 1:
                    bolds.append(text.lower())

            page_bolds[page_num] = bolds
        except:
            page_bolds[page_num] = []

    return page_bolds


def find_question_page(pdf, q_num, start_page=7):
    """Find which page contains a specific question number"""
    pattern = rf'(?:^|\s){q_num}\.\s+'

    for page_num in range(start_page, len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if text and re.search(pattern, text):
                return page_num
        except:
            continue
    return None


def extract_complete_text(pdf, start_page=7):
    """Get ALL text from PDF (original working approach)"""
    pure_ad_keywords = [
        '500 free essays for css',
        'css current affairs solved past papers',
        'css solved gsa past papers',
        'css solved islamiat past papers',
        'css solved pakistan affairs past papers',
        'english essay & precis course',
        'students\' reviews on sir syed kazim',
        'write & get your voice of knowledge'
    ]

    all_text = []

    for page_num in range(start_page, len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()

            if not text or len(text) < 50:
                continue

            # Skip ONLY pure ad pages
            if not re.search(r'\d+\.\s+', text):
                text_lower = text.lower()
                if any(kw in text_lower for kw in pure_ad_keywords):
                    continue

            # Clean
            text = re.sub(r'Book\..*?Past Papers.*?\n', '', text, flags=re.DOTALL)
            text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
            text = re.sub(r'Choose the correct (option|answer)\.?\s*', '\n', text, flags=re.I)

            all_text.append(text)
        except:
            continue

    return '\n'.join(all_text)


def find_answer_on_page(options, page_bolds):
    """Find answer by matching options to bold text on a specific page"""
    for bold_text in page_bolds:
        for opt_letter, opt_text in options.items():
            opt_lower = opt_text.lower().strip()

            if not opt_lower:
                continue

            # Exact match
            if bold_text == opt_lower:
                return opt_letter

            # Partial match for longer texts (at least 15 chars)
            if len(opt_lower) > 15 and len(bold_text) > 15:
                if opt_lower[:18] in bold_text or bold_text[:18] in opt_lower:
                    return opt_letter

            # Shorter but meaningful match
            if len(opt_lower) > 5 and len(bold_text) > 5:
                if opt_lower == bold_text or bold_text == opt_lower:
                    return opt_letter

    return ''


def extract_all_mcqs_fixed(pdf, start_page=7):
    """
    Extract ALL MCQs using combined text (for count accuracy)
    but match answers page-by-page (for answer accuracy)
    """

    print("  Step 1: Building page-to-bold mapping...")
    page_bolds = get_page_bold_texts(pdf, start_page)
    print(f"    Pages with bold text: {len(page_bolds)}")

    print("  Step 2: Extracting combined text...")
    combined_text = extract_complete_text(pdf, start_page)
    print(f"    Combined text: {len(combined_text):,} chars")

    print("  Step 3: Parsing MCQs...")
    lines = combined_text.split('\n')
    lines = [l.strip() for l in lines if l.strip()]

    mcqs = []
    i = 0

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
                    opt_letter = opt_match.group(1).upper()
                    opt_text = opt_match.group(2).strip()

                    if opt_letter not in options:
                        options[opt_letter] = opt_text
                    else:
                        options[opt_letter] += ' ' + opt_text

                    j += 1

                    if len(options) == 4:
                        break
                elif len(options) > 0:
                    if re.match(r'^\s*\d+\s*\.', opt_line):
                        break
                    else:
                        last_opt = max(options.keys())
                        options[last_opt] += ' ' + opt_line
                        j += 1
                elif q_text == '' or len(q_text) < 200:
                    q_text += ' ' + opt_line
                    j += 1
                else:
                    j += 1

            if len(options) == 4 and all(k in options for k in ['A', 'B', 'C', 'D']):
                # FIXED: Find the page for this question
                q_page = find_question_page(pdf, q_num, start_page)

                answer = ''
                if q_page is not None:
                    # Check current page and next page
                    pages_to_check = [q_page]
                    if q_page + 1 in page_bolds:
                        pages_to_check.append(q_page + 1)

                    # Combine bold texts from relevant pages
                    relevant_bolds = []
                    for p in pages_to_check:
                        if p in page_bolds:
                            relevant_bolds.extend(page_bolds[p])

                    answer = find_answer_on_page(options, relevant_bolds)

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


def test_extraction():
    """Test on Current Affairs PDF"""
    PDF_PATH = "/Users/asfandiyarsafi/Downloads/PPSC/PPSC Current Affairs Past Papers MCQs (2015 to Date).pdf"

    print("="*70)
    print("TESTING FIXED EXTRACTION v2 - Current Affairs")
    print("="*70)

    with pdfplumber.open(PDF_PATH) as pdf:
        print(f"Total pages: {len(pdf.pages)}")

        start = datetime.now()
        mcqs = extract_all_mcqs_fixed(pdf)

        mcqs.sort(key=lambda x: x['Question_Number'])

        print(f"\n  Extracted: {len(mcqs)} MCQs (target: 850)")
        print(f"  Time: {datetime.now() - start}")

        # Verify specific questions
        print("\n" + "="*70)
        print("VERIFICATION - Checking problem questions")
        print("="*70)

        test_cases = [
            (1, 'C'),   # CHINA
            (2, 'A'),   # Switzerland
            (3, 'D'),   # Mars
            (100, ''),  # Unknown - need to check PDF
            (200, 'B'), # North Korea (was wrongly D before)
            (500, 'A'), # 5 Trillion
        ]

        all_correct = True
        for q_num, expected in test_cases:
            matches = [m for m in mcqs if m['Question_Number'] == q_num]
            if matches:
                m = matches[0]
                actual = m['Correct_Answer']
                status = "✅" if (expected == '' or actual == expected) else "❌"
                if actual != expected and expected != '':
                    all_correct = False
                print(f"{status} Q{q_num}: Answer={actual} (expected={expected})")
                print(f"   Q: {m['Question'][:50]}...")
                print(f"   Options: A={m['Option_A'][:20]}, B={m['Option_B'][:20]}, C={m['Option_C'][:20]}, D={m['Option_D'][:20]}")

        with_answers = sum(1 for m in mcqs if m['Correct_Answer'])
        print(f"\n{'='*70}")
        print(f"Total: {len(mcqs)} MCQs, {with_answers} with answers ({with_answers*100//len(mcqs) if mcqs else 0}%)")

        if all_correct:
            print("✅ All test cases passed!")
        else:
            print("❌ Some test cases failed")
        print("="*70)

        return mcqs


if __name__ == "__main__":
    test_extraction()
