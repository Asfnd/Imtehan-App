#!/usr/bin/env python3
"""
Verify extracted answers against PDF bold text
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

def get_bold_on_page(pdf, page_num):
    """Get bold text segments on a specific page"""
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
                        bolds.append(text)
                    current = []

        if current:
            text = ''.join(current).strip()
            if len(text) > 1:
                bolds.append(text)

        return bolds
    except:
        return []

def find_question_page(pdf, q_num, start_page=7):
    """Find which page contains a specific question number"""
    pattern = rf'\b{q_num}\.\s+'

    for page_num in range(start_page, len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if text and re.search(pattern, text):
                return page_num
        except:
            continue
    return None

def verify_subject(pdf_path, csv_path, subject_name, sample_questions=[1, 5, 10, 50, 100]):
    """Verify sample answers for a subject"""
    print(f"\n{'='*60}")
    print(f"VERIFYING: {subject_name}")
    print(f"{'='*60}")

    df = pd.read_csv(csv_path)

    issues = []
    verified = 0

    with pdfplumber.open(pdf_path) as pdf:
        # Check specific question numbers
        for q_num in sample_questions:
            if q_num > len(df):
                continue

            row = df[df['Question_Number'] == q_num]
            if row.empty:
                continue

            row = row.iloc[0]
            extracted_answer = row['Correct_Answer']

            # Get options
            options = {
                'A': str(row['Option_A']),
                'B': str(row['Option_B']),
                'C': str(row['Option_C']),
                'D': str(row['Option_D'])
            }

            # Find page with this question
            page_num = find_question_page(pdf, q_num)

            if page_num:
                bolds = get_bold_on_page(pdf, page_num)

                # Check if extracted answer matches a bold option
                if extracted_answer and extracted_answer in options:
                    answer_text = options[extracted_answer].lower().strip()

                    # Check if this text is in bold
                    found_bold = False
                    for bold in bolds:
                        bold_lower = bold.lower().strip()
                        if (answer_text == bold_lower or
                            (len(answer_text) > 10 and answer_text[:15] in bold_lower) or
                            (len(bold_lower) > 10 and bold_lower[:15] in answer_text)):
                            found_bold = True
                            break

                    if found_bold:
                        verified += 1
                        print(f"  Q{q_num}: ✅ Answer '{extracted_answer}' = '{options[extracted_answer][:40]}...' verified as BOLD")
                    else:
                        # Check what IS bold on this page
                        print(f"  Q{q_num}: ⚠️  Answer '{extracted_answer}' = '{options[extracted_answer][:40]}...'")
                        print(f"         Bold texts found: {bolds[:5]}")
                        issues.append((q_num, extracted_answer, options[extracted_answer], bolds[:3]))
                elif not extracted_answer:
                    print(f"  Q{q_num}: ❓ No answer extracted")
                    print(f"         Bold texts: {bolds[:3]}")
            else:
                print(f"  Q{q_num}: ⚠️  Could not find page")

    print(f"\nVerified: {verified}/{len(sample_questions)} samples")

    if issues:
        print(f"Potential issues: {len(issues)}")

    return issues

def main():
    print("="*60)
    print("ANSWER VERIFICATION - Cross-checking with PDFs")
    print("="*60)

    all_issues = {}

    # Sample questions to check from each subject
    samples = [1, 2, 3, 10, 25, 50, 100, 200, 500]

    for pdf_path, csv_path, name in SUBJECTS:
        issues = verify_subject(pdf_path, csv_path, name, samples)
        if issues:
            all_issues[name] = issues

    print("\n" + "="*60)
    print("VERIFICATION SUMMARY")
    print("="*60)

    if all_issues:
        print("Subjects with potential issues:")
        for subject, issues in all_issues.items():
            print(f"  - {subject}: {len(issues)} questions to review")
    else:
        print("All sampled answers appear correctly matched to bold text!")

if __name__ == "__main__":
    main()
