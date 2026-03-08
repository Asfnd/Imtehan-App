#!/usr/bin/env python3
"""
Test fixed extraction on all subjects
"""

import pdfplumber
import re
from datetime import datetime
from extract_fixed_v2 import extract_all_mcqs_fixed, get_page_bold_texts

SUBJECTS = [
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Current Affairs Past Papers MCQs (2015 to Date).pdf', 'Current Affairs', 850),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC English Past Papers MCQs (2015 to Date).pdf', 'English', 1985),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Ethics &amp; Civics Past Papers MCQs (2015 to Date).pdf', 'Ethics & Civics', 982),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Islamiat Past Papers MCQs (2015 to Date).pdf', 'Islamiat', 3507),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Urdu Past Papers MCQs (2015 to Date).pdf', 'Urdu', 1264),
]


def verify_sample(mcqs, pdf, sample_size=50):
    """Quick verification of answers"""
    page_bolds = get_page_bold_texts(pdf)

    total = len(mcqs)
    step = max(1, total // sample_size)
    samples = list(range(0, total, step))[:sample_size]

    verified = 0
    issues = 0

    for idx in samples:
        mcq = mcqs[idx]
        q_num = mcq['Question_Number']
        answer = mcq['Correct_Answer']

        if not answer:
            continue

        options = {
            'A': mcq['Option_A'].lower().strip(),
            'B': mcq['Option_B'].lower().strip(),
            'C': mcq['Option_C'].lower().strip(),
            'D': mcq['Option_D'].lower().strip(),
        }

        answer_text = options.get(answer, '')

        # Find page
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

        # Check bold
        relevant_bolds = []
        for p in [q_page, q_page + 1]:
            if p in page_bolds:
                relevant_bolds.extend(page_bolds[p])

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

    return verified, issues


def main():
    print("="*70)
    print("TESTING FIXED EXTRACTION ON MULTIPLE SUBJECTS")
    print("="*70)

    results = []

    for pdf_path, name, target in SUBJECTS:
        print(f"\n{'='*50}")
        print(f"Testing: {name}")
        print(f"{'='*50}")

        try:
            with pdfplumber.open(pdf_path) as pdf:
                start = datetime.now()
                mcqs = extract_all_mcqs_fixed(pdf)
                mcqs.sort(key=lambda x: x['Question_Number'])

                extracted = len(mcqs)
                with_answers = sum(1 for m in mcqs if m['Correct_Answer'])

                verified, issues = verify_sample(mcqs, pdf, 50)
                accuracy = verified * 100 // (verified + issues) if (verified + issues) > 0 else 0

                count_status = "✅" if extracted >= target * 0.99 else "⚠️"
                acc_status = "✅" if accuracy >= 95 else "⚠️" if accuracy >= 80 else "❌"

                print(f"  {count_status} Count: {extracted}/{target}")
                print(f"  {acc_status} Accuracy: {accuracy}% ({verified}/{verified+issues} verified)")
                print(f"  Answers: {with_answers}/{extracted}")
                print(f"  Time: {datetime.now() - start}")

                results.append((name, extracted, target, accuracy, with_answers))

        except Exception as e:
            print(f"  ❌ Error: {e}")
            results.append((name, 0, target, 0, 0))

    print("\n" + "="*70)
    print("SUMMARY")
    print("="*70)

    for name, extracted, target, accuracy, answers in results:
        count_pct = extracted * 100 // target if target > 0 else 0
        print(f"{name}: {extracted}/{target} ({count_pct}%), Accuracy: {accuracy}%, Answers: {answers}")


if __name__ == "__main__":
    main()
