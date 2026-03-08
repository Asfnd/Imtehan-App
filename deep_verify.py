#!/usr/bin/env python3
"""
Deep verification of flagged questions - check multiple pages around question
"""

import pdfplumber
import pandas as pd
import re

def get_page_content_with_bold(pdf, page_num):
    """Get page text and mark bold portions"""
    try:
        page = pdf.pages[page_num]
        text = page.extract_text()

        # Get bold chars
        chars = page.chars
        bold_chars = []
        current = []

        for char in chars:
            if 'bold' in char.get('fontname', '').lower():
                current.append(char['text'])
            else:
                if current:
                    bold_chars.append(''.join(current).strip())
                    current = []
        if current:
            bold_chars.append(''.join(current).strip())

        # Filter empty
        bold_chars = [b for b in bold_chars if len(b) > 1]

        return text, bold_chars
    except Exception as e:
        return None, []

def check_specific_question(pdf_path, csv_path, q_num, pages_to_check=3):
    """Deeply check a specific question"""
    print(f"\n{'='*70}")
    print(f"CHECKING Question {q_num}")
    print(f"{'='*70}")

    df = pd.read_csv(csv_path)
    row = df[df['Question_Number'] == q_num].iloc[0]

    print(f"\nExtracted Data:")
    print(f"  Question: {row['Question'][:80]}...")
    print(f"  A: {row['Option_A']}")
    print(f"  B: {row['Option_B']}")
    print(f"  C: {row['Option_C']}")
    print(f"  D: {row['Option_D']}")
    print(f"  Extracted Answer: {row['Correct_Answer']}")

    with pdfplumber.open(pdf_path) as pdf:
        # Find page with question
        pattern = rf'\b{q_num}\.\s+'

        for page_num in range(7, len(pdf.pages)):
            text, bolds = get_page_content_with_bold(pdf, page_num)

            if text and re.search(pattern, text):
                print(f"\n--- Found on Page {page_num + 1} ---")

                # Extract just this question's section
                lines = text.split('\n')
                in_question = False
                q_lines = []

                for line in lines:
                    if re.match(rf'^\s*{q_num}\.\s+', line):
                        in_question = True
                    elif in_question and re.match(r'^\s*\d+\.\s+', line):
                        break

                    if in_question:
                        q_lines.append(line)

                print("\nPDF Text for this question:")
                for line in q_lines[:10]:
                    print(f"  {line}")

                print(f"\nBold text on this page:")
                for bold in bolds[:15]:
                    print(f"  [BOLD] {bold}")

                # Check which option matches bold
                options = {
                    'A': str(row['Option_A']).lower().strip(),
                    'B': str(row['Option_B']).lower().strip(),
                    'C': str(row['Option_C']).lower().strip(),
                    'D': str(row['Option_D']).lower().strip()
                }

                print(f"\nMatching options to bold:")
                for letter, opt_text in options.items():
                    for bold in bolds:
                        bold_lower = bold.lower().strip()
                        if (opt_text == bold_lower or
                            (len(opt_text) > 5 and opt_text in bold_lower) or
                            (len(bold_lower) > 5 and bold_lower in opt_text)):
                            print(f"  {letter}: '{opt_text[:40]}' MATCHES bold '{bold}'")
                            break

                break

# Check flagged questions from each subject
CHECKS = [
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Current Affairs Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Current_Affairs.csv',
     [100, 200]),

    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Ethics &amp; Civics Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Ethics_Civics.csv',
     [10]),

    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Islamiat Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Islamiat.csv',
     [10, 200, 500]),

    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Urdu Past Papers MCQs (2015 to Date).pdf',
     '/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Urdu.csv',
     [50, 100]),
]

for pdf_path, csv_path, questions in CHECKS:
    for q in questions:
        check_specific_question(pdf_path, csv_path, q)
