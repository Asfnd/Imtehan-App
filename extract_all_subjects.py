#!/usr/bin/env python3
"""
Universal PPSC MCQs Extractor
Extracts 100% of MCQs from all subject PDFs
"""

import pdfplumber
import pandas as pd
import re
from datetime import datetime
import os

OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs"

SUBJECTS = [
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Current Affairs Past Papers MCQs (2015 to Date).pdf', 'Current_Affairs', 850),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC English Past Papers MCQs (2015 to Date).pdf', 'English', 1985),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Ethics &amp; Civics Past Papers MCQs (2015 to Date).pdf', 'Ethics_Civics', 982),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Everyday Science Past Papers MCQs (2015 to Date).pdf', 'Everyday_Science', 9137),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC General Geography Past Papers MCQs (2015 to Date).pdf', 'General_Geography', 1097),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC General Knowledge Past Papers MCQs from (2015 to Date).pdf', 'General_Knowledge', 8323),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC General Math Past Paper MCQs from 2015 to 2025.pdf', 'General_Math', 2789),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Islamiat Past Papers MCQs (2015 to Date).pdf', 'Islamiat', 3507),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Pakistan Studies Past Papers MCQs (2015 to Date).pdf', 'Pakistan_Studies', 6855),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Urdu Past Papers MCQs (2015 to Date).pdf', 'Urdu', 1264),
]

def get_all_bold_texts(pdf, start_page=7):
    """Get ALL bold text from entire PDF for answer detection"""
    all_bolds = []

    for page_num in range(start_page, len(pdf.pages)):
        try:
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
        except:
            continue

    return all_bolds

def extract_complete_text(pdf, start_page=7):
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

    for page_num in range(start_page, len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()

            if not text or len(text) < 50:
                continue

            # Skip ONLY pure ad pages (pages with NO question numbers)
            if not re.search(r'\d+\.\s+', text):
                text_lower = text.lower()
                if any(keyword in text_lower for keyword in pure_ad_keywords):
                    continue

            # Clean
            text = re.sub(r'Book\..*?Past Papers.*?\n', '', text, flags=re.DOTALL)
            text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
            text = re.sub(r'Choose the correct (option|answer)\.?\s*', '\n', text, flags=re.I)

            all_text.append(text)
        except:
            continue

    return '\n'.join(all_text)

def extract_all_mcqs(combined_text, bold_texts):
    """Extract ALL MCQs from combined text"""

    lines = combined_text.split('\n')
    lines = [l.strip() for l in lines if l.strip()]

    mcqs = []
    i = 0

    while i < len(lines):
        line = lines[i]

        # Question pattern - very flexible
        q_match = re.match(r'^\s*(\d+)\s*\.\s*(.+)?', line)

        if q_match:
            q_num = q_match.group(1)
            q_text = (q_match.group(2) or '').strip()

            options = {}
            j = i + 1

            # Look ahead up to 40 lines for options
            max_look = min(i + 40, len(lines))

            while j < max_look:
                opt_line = lines[j]

                # Option: "a." or "a)" or "a :" or "  a."
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

def process_subject(pdf_path, subject_name, target):
    """Process a single subject PDF"""
    print(f"\n{'='*60}")
    print(f"Processing: {subject_name}")
    print(f"Target: {target:,} MCQs")
    print(f"{'='*60}")

    start = datetime.now()

    with pdfplumber.open(pdf_path) as pdf:
        print(f"Pages: {len(pdf.pages)}")

        print("Extracting bold text for answers...")
        bold_texts = get_all_bold_texts(pdf)
        print(f"  Bold segments: {len(bold_texts):,}")

        print("Extracting all text...")
        combined_text = extract_complete_text(pdf)
        print(f"  Text length: {len(combined_text):,} chars")

        print("Parsing MCQs...")
        mcqs = extract_all_mcqs(combined_text, bold_texts)

        # Sort by question number
        mcqs.sort(key=lambda x: int(x['Question_Number']))

        extracted = len(mcqs)
        pct = extracted * 100 // target if target > 0 else 0
        answers = sum(1 for m in mcqs if m['Correct_Answer'])

        status = "✅ PERFECT" if extracted == target else f"⚠️ {pct}%"

        print(f"\nResults: {extracted:,} / {target:,} ({status})")
        print(f"Answers: {answers:,} ({answers*100//extracted if extracted else 0}%)")

        # Save
        df = pd.DataFrame(mcqs)
        output_file = f"{OUTPUT_FOLDER}/{subject_name}.csv"
        df.to_csv(output_file, index=False, encoding='utf-8')

        print(f"Saved: {output_file}")
        print(f"Time: {datetime.now() - start}")

        return extracted, target, answers

def main():
    print("="*60)
    print("PPSC MCQs EXTRACTION - ALL SUBJECTS")
    print("="*60)

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    total_start = datetime.now()
    results = []

    for pdf_path, subject_name, target in SUBJECTS:
        try:
            extracted, target, answers = process_subject(pdf_path, subject_name, target)
            results.append((subject_name, extracted, target, answers))
        except Exception as e:
            print(f"\nERROR processing {subject_name}: {e}")
            results.append((subject_name, 0, target, 0))

    # Summary
    print("\n" + "="*60)
    print("EXTRACTION SUMMARY")
    print("="*60)

    total_extracted = 0
    total_target = 0
    total_answers = 0

    for subject, extracted, target, answers in results:
        status = "✅" if extracted == target else "⚠️"
        pct = extracted * 100 // target if target > 0 else 0
        print(f"{status} {subject}: {extracted:,}/{target:,} ({pct}%) - {answers:,} answers")
        total_extracted += extracted
        total_target += target
        total_answers += answers

    print(f"\n{'='*60}")
    print(f"TOTAL: {total_extracted:,} / {total_target:,} MCQs")
    print(f"Answers: {total_answers:,}")
    print(f"Total time: {datetime.now() - total_start}")
    print("="*60)

if __name__ == "__main__":
    main()
