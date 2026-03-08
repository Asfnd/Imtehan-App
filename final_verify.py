#!/usr/bin/env python3
"""
Final verification of all subjects
"""

import pdfplumber
import pandas as pd
import re
from extract_all_fixed import get_page_bold_texts

SUBJECTS = [
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Current Affairs Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Current_Affairs.csv', 'Current Affairs'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC English Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/English.csv', 'English'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Islamiat Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Islamiat.csv', 'Islamiat'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Pakistan Studies Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Pakistan_Studies.csv', 'Pakistan Studies'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Urdu Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Urdu.csv', 'Urdu'),
]


def verify_subject(pdf_path, csv_path, name, sample_size=30):
    """Verify sample answers"""
    df = pd.read_csv(csv_path)

    # Only check rows with answers
    df_with_answers = df[df['Correct_Answer'].notna() & (df['Correct_Answer'] != '')]

    if len(df_with_answers) == 0:
        return 0, 0

    step = max(1, len(df_with_answers) // sample_size)
    samples = list(range(0, len(df_with_answers), step))[:sample_size]

    with pdfplumber.open(pdf_path) as pdf:
        page_bolds = get_page_bold_texts(pdf)

        verified = 0
        issues = 0

        for idx in samples:
            row = df_with_answers.iloc[idx]
            q_num = row['Question_Number']
            answer = row['Correct_Answer']

            options = {
                'A': str(row['Option_A']).lower().strip(),
                'B': str(row['Option_B']).lower().strip(),
                'C': str(row['Option_C']).lower().strip(),
                'D': str(row['Option_D']).lower().strip(),
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


print("="*60)
print("FINAL VERIFICATION - Answer Accuracy")
print("="*60)

total_v = 0
total_i = 0

for pdf_path, csv_path, name in SUBJECTS:
    verified, issues = verify_subject(pdf_path, csv_path, name)
    acc = verified * 100 // (verified + issues) if (verified + issues) > 0 else 0
    status = "✅" if acc >= 95 else "❌"
    print(f"{status} {name}: {verified}/{verified + issues} ({acc}%)")
    total_v += verified
    total_i += issues

print(f"\n{'='*60}")
overall = total_v * 100 // (total_v + total_i) if (total_v + total_i) > 0 else 0
print(f"OVERALL ACCURACY: {total_v}/{total_v + total_i} ({overall}%)")
print("="*60)
