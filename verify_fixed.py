#!/usr/bin/env python3
"""
Comprehensive verification of fixed extraction
"""

import pdfplumber
import pandas as pd
import re
from extract_fixed_v2 import extract_all_mcqs_fixed, get_page_bold_texts

PDF_PATH = "/Users/asfandiyarsafi/Downloads/PPSC/PPSC Current Affairs Past Papers MCQs (2015 to Date).pdf"

def verify_answers(mcqs, pdf, sample_size=100):
    """Verify answers by cross-checking with PDF bold text"""

    page_bolds = get_page_bold_texts(pdf)

    total = len(mcqs)
    step = max(1, total // sample_size)
    sample_indices = list(range(0, total, step))[:sample_size]

    verified = 0
    issues = 0
    no_answer = 0

    print(f"\nVerifying {len(sample_indices)} samples...")

    for idx in sample_indices:
        mcq = mcqs[idx]
        q_num = mcq['Question_Number']
        answer = mcq['Correct_Answer']

        if not answer:
            no_answer += 1
            continue

        options = {
            'A': mcq['Option_A'].lower().strip(),
            'B': mcq['Option_B'].lower().strip(),
            'C': mcq['Option_C'].lower().strip(),
            'D': mcq['Option_D'].lower().strip(),
        }

        answer_text = options.get(answer, '')

        # Find page for this question
        pattern = rf'(?:^|\s){q_num}\.\s+'
        q_page = None
        for page_num in range(7, len(pdf.pages)):
            try:
                text = pdf.pages[page_num].extract_text()
                if text and re.search(pattern, text):
                    q_page = page_num
                    break
            except:
                continue

        if q_page is None:
            continue

        # Get bold texts from question's page and next page
        relevant_bolds = []
        for p in [q_page, q_page + 1]:
            if p in page_bolds:
                relevant_bolds.extend(page_bolds[p])

        # Check if answer matches any bold on those pages
        found = False
        for bold in relevant_bolds:
            if (answer_text == bold or
                (len(answer_text) > 10 and answer_text[:15] in bold) or
                (len(bold) > 10 and bold[:15] in answer_text)):
                found = True
                break

        if found:
            verified += 1
        else:
            issues += 1
            if issues <= 10:  # Show first 10 issues
                print(f"  ⚠️ Q{q_num}: Answer={answer} ({answer_text[:30]})")
                print(f"     Bold on page: {relevant_bolds[:5]}")

    accuracy = verified * 100 // (verified + issues) if (verified + issues) > 0 else 0

    print(f"\n{'='*60}")
    print(f"VERIFICATION RESULTS")
    print(f"{'='*60}")
    print(f"Verified correct: {verified}/{verified + issues} ({accuracy}%)")
    print(f"No answer: {no_answer}")
    print(f"Potential issues: {issues}")

    return accuracy


def main():
    print("="*60)
    print("COMPREHENSIVE VERIFICATION - Fixed Extraction")
    print("="*60)

    with pdfplumber.open(PDF_PATH) as pdf:
        print(f"Pages: {len(pdf.pages)}")

        # Extract
        mcqs = extract_all_mcqs_fixed(pdf)
        mcqs.sort(key=lambda x: x['Question_Number'])

        print(f"Extracted: {len(mcqs)} MCQs")

        # Verify
        accuracy = verify_answers(mcqs, pdf, sample_size=100)

        if accuracy >= 95:
            print("\n✅ ACCURACY ACCEPTABLE - Ready for full extraction")
        else:
            print(f"\n❌ ACCURACY TOO LOW ({accuracy}%) - Need more fixes")


if __name__ == "__main__":
    main()
