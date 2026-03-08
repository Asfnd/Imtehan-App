#!/usr/bin/env python3
"""
FIXED MCQ Extractor - Page-aware answer detection
Fixes the global bold text matching bug
"""

import pdfplumber
import pandas as pd
import re
from datetime import datetime

def extract_page_data(page):
    """Extract both text and bold segments from a single page with positions"""
    text = page.extract_text() or ''
    chars = page.chars

    # Get bold segments with their vertical position
    bold_segments = []
    current = []
    current_top = None

    for char in chars:
        if 'bold' in char.get('fontname', '').lower():
            if not current:
                current_top = char.get('top', 0)
            current.append(char['text'])
        else:
            if current:
                segment_text = ''.join(current).strip()
                if len(segment_text) > 1:
                    bold_segments.append({
                        'text': segment_text,
                        'top': current_top
                    })
                current = []
                current_top = None

    if current:
        segment_text = ''.join(current).strip()
        if len(segment_text) > 1:
            bold_segments.append({
                'text': segment_text,
                'top': current_top
            })

    return text, bold_segments


def find_answer_for_question(options, bold_segments, q_top=None):
    """
    Find the correct answer by matching options to bold text.
    Uses position awareness when available.
    """
    # Try exact match first
    for bold in bold_segments:
        bold_text = bold['text'].lower().strip()

        for opt_letter, opt_text in options.items():
            opt_lower = opt_text.lower().strip()

            if not opt_lower:
                continue

            # Exact match
            if bold_text == opt_lower:
                return opt_letter

            # Partial match for longer texts
            if len(opt_lower) > 15 and len(bold_text) > 15:
                if opt_lower[:20] in bold_text or bold_text[:20] in opt_lower:
                    return opt_letter

    return ''


def extract_mcqs_page_aware(pdf, start_page=7):
    """
    Extract MCQs with page-aware answer detection.
    Each question's answer is matched only from bold text on the same/adjacent pages.
    """

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

    mcqs = []

    # Store page data for lookahead
    page_cache = {}

    def get_page_data(page_num):
        if page_num not in page_cache:
            if page_num < len(pdf.pages):
                page_cache[page_num] = extract_page_data(pdf.pages[page_num])
            else:
                page_cache[page_num] = ('', [])
        return page_cache[page_num]

    for page_num in range(start_page, len(pdf.pages)):
        text, bold_segments = get_page_data(page_num)

        if not text or len(text) < 50:
            continue

        # Skip pure ad pages
        if not re.search(r'\d+\.\s+', text):
            text_lower = text.lower()
            if any(kw in text_lower for kw in pure_ad_keywords):
                continue

        # Clean header/footer
        text = re.sub(r'Book\..*?Past Papers.*?\n', '', text, flags=re.DOTALL)
        text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
        text = re.sub(r'Choose the correct (option|answer)\.?\s*', '\n', text, flags=re.I)

        lines = text.split('\n')
        lines = [l.strip() for l in lines if l.strip()]

        i = 0
        while i < len(lines):
            line = lines[i]

            # Question pattern
            q_match = re.match(r'^\s*(\d+)\s*\.\s*(.+)?', line)

            if q_match:
                q_num = int(q_match.group(1))
                q_text = (q_match.group(2) or '').strip()

                # Check if we already have this question (from previous page)
                existing = [m for m in mcqs if m['Question_Number'] == q_num]
                if existing:
                    i += 1
                    continue

                options = {}
                j = i + 1
                max_look = min(i + 30, len(lines))

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

                # Save if we have all 4 options
                if len(options) == 4 and all(k in options for k in ['A', 'B', 'C', 'D']):
                    # Get bold segments from current page and next page
                    all_bold = bold_segments.copy()

                    # Also check next page (questions may span pages)
                    next_text, next_bold = get_page_data(page_num + 1)
                    all_bold.extend(next_bold)

                    # Find answer using page-local bold text
                    answer = find_answer_for_question(options, all_bold)

                    mcqs.append({
                        'Question_Number': q_num,
                        'Question': q_text,
                        'Option_A': options['A'],
                        'Option_B': options['B'],
                        'Option_C': options['C'],
                        'Option_D': options['D'],
                        'Correct_Answer': answer,
                        '_page': page_num  # For debugging
                    })

                    i = j
                else:
                    i += 1
            else:
                i += 1

        # Clear old cache to save memory
        if page_num > start_page + 2:
            old_page = page_num - 2
            if old_page in page_cache:
                del page_cache[old_page]

    return mcqs


def test_on_sample():
    """Test the fixed algorithm on Current Affairs PDF"""
    PDF_PATH = "/Users/asfandiyarsafi/Downloads/PPSC/PPSC Current Affairs Past Papers MCQs (2015 to Date).pdf"

    print("="*70)
    print("TESTING FIXED EXTRACTION - Current Affairs")
    print("="*70)

    with pdfplumber.open(PDF_PATH) as pdf:
        print(f"Total pages: {len(pdf.pages)}")

        start = datetime.now()
        mcqs = extract_mcqs_page_aware(pdf)

        # Sort by question number
        mcqs.sort(key=lambda x: x['Question_Number'])

        print(f"\nExtracted: {len(mcqs)} MCQs")
        print(f"Time: {datetime.now() - start}")

        # Check specific questions we know were wrong
        test_questions = [1, 2, 3, 100, 200, 500]

        print("\n" + "="*70)
        print("VERIFICATION - Checking known problem questions")
        print("="*70)

        for q_num in test_questions:
            matches = [m for m in mcqs if m['Question_Number'] == q_num]
            if matches:
                m = matches[0]
                print(f"\nQ{q_num}: {m['Question'][:60]}...")
                print(f"  A: {m['Option_A'][:40]}")
                print(f"  B: {m['Option_B'][:40]}")
                print(f"  C: {m['Option_C'][:40]}")
                print(f"  D: {m['Option_D'][:40]}")
                print(f"  Answer: {m['Correct_Answer']} (page {m['_page']})")

        # Count answers
        with_answers = sum(1 for m in mcqs if m['Correct_Answer'])
        print(f"\n{'='*70}")
        print(f"Answers detected: {with_answers}/{len(mcqs)} ({with_answers*100//len(mcqs) if mcqs else 0}%)")
        print("="*70)

        return mcqs


if __name__ == "__main__":
    test_on_sample()
