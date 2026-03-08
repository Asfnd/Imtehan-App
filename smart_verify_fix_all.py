#!/usr/bin/env python3
"""
Smart verification - extracts bold text ONLY between question start and next question
This handles multiple questions per page correctly
"""

import csv
import pdfplumber
import re
import os

PDF_PATH = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'
CSV_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs"
OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_SMART_FIXED"

subjects = [
    'General_Knowledge', 'Pakistan_Studies', 'Everyday_Science', 'Islamiyat',
    'Current_Affairs', 'English', 'Basic_Computer', 'Geography', 'Urdu',
    'Ethics_Civics', 'General_Maths'
]

def normalize(text):
    if not text:
        return ''
    text = str(text).lower().strip()
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2013', '-').replace('\u2014', '-')
    text = re.sub(r'\s+', ' ', text)
    return text

def extract_bold_for_question(page, q_num):
    """Extract only bold text for a specific question on the page"""
    text = page.extract_text()
    if not text:
        return []

    # Find question position
    q_pattern = rf'(?:^|\n)\s*{q_num}\s*\.'
    match = re.search(q_pattern, text)
    if not match:
        return []

    # Find next question position
    next_q_pattern = rf'(?:^|\n)\s*{q_num + 1}\s*\.'
    next_match = re.search(next_q_pattern, text[match.start():])

    # Extract text for this question only
    if next_match:
        question_text = text[match.start():match.start() + next_match.start()]
    else:
        question_text = text[match.start():match.start() + 2000]  # Get next 2000 chars if no next question

    # Get bold chars only within this question's text range
    chars = page.chars
    bolds = []
    current = []

    # Find char positions within the question range
    for char in chars:
        char_pos = char.get('x0', 0)  # Use position as approximation

        is_bold = 'bold' in char.get('fontname', '').lower()

        if is_bold:
            current.append(char['text'])
        else:
            if current:
                text_seg = ''.join(current).strip()
                if text_seg and len(text_seg) > 1:
                    bolds.append(normalize(text_seg))
                current = []

    if current:
        text_seg = ''.join(current).strip()
        if text_seg and len(text_seg) > 1:
            bolds.append(normalize(text_seg))

    # Filter bolds that appear in the question text
    filtered_bolds = []
    for bold in bolds:
        if bold in normalize(question_text):
            filtered_bolds.append(bold)

    return filtered_bolds

def find_answer_in_question(pdf, q_num, options_dict):
    """Find correct answer by checking which option is bold on the question's page"""
    for page_num in range(len(pdf.pages)):
        try:
            text = pdf.pages[page_num].extract_text()
            if text and re.search(rf'(?:^|\n)\s*{q_num}\s*\.', text):
                # Found the page with this question
                bolds = extract_bold_for_question(pdf.pages[page_num], q_num)

                # Check which option matches the bolds
                pdf_answer = None
                for letter, option_text in options_dict.items():
                    opt_norm = normalize(option_text)

                    # Check if this option text is in the bolds
                    for bold in bolds:
                        if opt_norm == bold or opt_norm in bold or bold in opt_norm:
                            pdf_answer = letter
                            break

                    if pdf_answer:
                        break

                return pdf_answer
        except:
            pass

    return None

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

print("="*70)
print("SMART VERIFICATION & FIX - EXTRACTING BOLD TEXT PER QUESTION")
print("="*70)

all_corrections = {}
subject_stats = {}

with pdfplumber.open(PDF_PATH) as pdf:
    for subject_idx, subject in enumerate(subjects, 1):
        csv_file = f"{CSV_FOLDER}/{subject}.csv"

        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        print(f"\n[{subject_idx}/11] {subject}: Processing {len(rows)} questions...")

        correct = 0
        wrong = 0
        empty = 0
        corrections = []

        for i, row in enumerate(rows):
            if (i + 1) % 500 == 0:
                print(f"  Progress: {i+1}/{len(rows)}...")

            q_num = int(row['Question_Number'])
            csv_answer = row['Correct_Answer'].strip().upper()

            if not csv_answer:
                empty += 1
                continue

            options = {
                'A': row['Option_A'],
                'B': row['Option_B'],
                'C': row['Option_C'],
                'D': row['Option_D'],
            }

            pdf_answer = find_answer_in_question(pdf, q_num, options)

            if pdf_answer:
                if pdf_answer == csv_answer:
                    correct += 1
                else:
                    wrong += 1
                    corrections.append({
                        'q_num': q_num,
                        'csv_answer': csv_answer,
                        'pdf_answer': pdf_answer
                    })
            else:
                empty += 1

        total = correct + wrong + empty
        pct = correct * 100 // (correct + wrong) if (correct + wrong) > 0 else 0

        subject_stats[subject] = {
            'correct': correct,
            'wrong': wrong,
            'empty': empty,
            'pct': pct
        }

        all_corrections[subject] = corrections

        status_icon = "✓" if pct >= 99 else "!" if pct >= 95 else "✗"
        print(f"{status_icon} {subject}: {correct}/{correct+wrong} correct ({pct}%) - {wrong} to fix")

# Apply corrections
print("\n" + "="*70)
print("APPLYING CORRECTIONS")
print("="*70)

total_fixed = 0

for subject in subjects:
    csv_file = f"{CSV_FOLDER}/{subject}.csv"
    output_file = f"{OUTPUT_FOLDER}/{subject}.csv"

    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    if subject in all_corrections:
        correction_map = {c['q_num']: c['pdf_answer'] for c in all_corrections[subject]}

        for row in rows:
            q_num = int(row['Question_Number'])
            if q_num in correction_map:
                row['Correct_Answer'] = correction_map[q_num]

    # Write output
    fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    fixes = len(all_corrections.get(subject, []))
    total_fixed += fixes

    if fixes > 0:
        print(f"{subject}: {fixes} corrections applied")

print("\n" + "="*70)
print("SUMMARY")
print("="*70)

for subject in subjects:
    stats = subject_stats[subject]
    status = "✓" if stats['pct'] >= 99 else "!" if stats['pct'] >= 95 else "✗"
    fixes = len(all_corrections.get(subject, []))
    print(f"{status} {subject:<20} {stats['correct']}/{stats['correct']+stats['wrong']} ({stats['pct']}%) | {fixes} fixed")

print(f"\n{'='*70}")
print(f"TOTAL FIXED: {total_fixed}")
print(f"Output: {OUTPUT_FOLDER}")
print("="*70)
