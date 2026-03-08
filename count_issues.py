#!/usr/bin/env python3
"""
Count potential answer mismatches across all subjects
"""

import pdfplumber
import pandas as pd
import re

SUBJECTS = [
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Current Affairs Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Current_Affairs.csv', 'Current Affairs'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC English Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/English.csv', 'English'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Ethics &amp; Civics Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Ethics_Civics.csv', 'Ethics & Civics'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Everyday Science Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Everyday_Science.csv', 'Everyday Science'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC General Geography Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/General_Geography.csv', 'General Geography'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC General Knowledge Past Papers MCQs from (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/General_Knowledge.csv', 'General Knowledge'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC General Math Past Paper MCQs from 2015 to 2025.pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/General_Math.csv', 'General Math'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Islamiat Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Islamiat.csv', 'Islamiat'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Pakistan Studies Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Pakistan_Studies.csv', 'Pakistan Studies'),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Urdu Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Urdu.csv', 'Urdu'),
]

def check_subject_answers(pdf_path, csv_path, name, sample_size=50):
    """Check random sample of answers"""
    df = pd.read_csv(csv_path)
    total = len(df)

    # Sample evenly across the dataset
    step = max(1, total // sample_size)
    sample_indices = list(range(0, total, step))[:sample_size]

    issues = 0
    verified = 0
    no_answer = 0

    with pdfplumber.open(pdf_path) as pdf:
        for idx in sample_indices:
            row = df.iloc[idx]
            q_num = row['Question_Number']
            extracted_answer = row['Correct_Answer']

            if pd.isna(extracted_answer) or extracted_answer == '':
                no_answer += 1
                continue

            options = {
                'A': str(row['Option_A']).lower().strip(),
                'B': str(row['Option_B']).lower().strip(),
                'C': str(row['Option_C']).lower().strip(),
                'D': str(row['Option_D']).lower().strip()
            }

            # Find page
            pattern = rf'\b{q_num}\.\s+'
            for page_num in range(7, len(pdf.pages)):
                try:
                    text = pdf.pages[page_num].extract_text()
                    if text and re.search(pattern, text):
                        # Get bold on this page
                        chars = pdf.pages[page_num].chars
                        bolds = []
                        current = []
                        for char in chars:
                            if 'bold' in char.get('fontname', '').lower():
                                current.append(char['text'])
                            else:
                                if current:
                                    bolds.append(''.join(current).strip().lower())
                                    current = []
                        if current:
                            bolds.append(''.join(current).strip().lower())

                        bolds = [b for b in bolds if len(b) > 1]

                        # Check if extracted answer matches bold
                        answer_text = options.get(extracted_answer, '').lower()

                        found = False
                        for bold in bolds:
                            if (answer_text == bold or
                                (len(answer_text) > 5 and answer_text in bold) or
                                (len(bold) > 5 and bold in answer_text)):
                                found = True
                                break

                        if found:
                            verified += 1
                        else:
                            issues += 1
                        break
                except:
                    continue

    return verified, issues, no_answer, len(sample_indices)

print("="*70)
print("ANSWER ACCURACY CHECK - Sampling 50 questions per subject")
print("="*70)

total_verified = 0
total_issues = 0
total_no_answer = 0
total_samples = 0

for pdf_path, csv_path, name in SUBJECTS:
    verified, issues, no_answer, samples = check_subject_answers(pdf_path, csv_path, name)

    accuracy = verified * 100 // (verified + issues) if (verified + issues) > 0 else 0

    status = "✅" if accuracy >= 90 else "⚠️" if accuracy >= 70 else "❌"

    print(f"{status} {name}: {verified}/{verified+issues} verified ({accuracy}%), {no_answer} no answer, {issues} potential issues")

    total_verified += verified
    total_issues += issues
    total_no_answer += no_answer
    total_samples += samples

print("="*70)
overall = total_verified * 100 // (total_verified + total_issues) if (total_verified + total_issues) > 0 else 0
print(f"OVERALL: {total_verified}/{total_verified+total_issues} verified ({overall}%)")
print(f"No answer detected: {total_no_answer}")
print(f"Potential issues: {total_issues}")
print("="*70)
