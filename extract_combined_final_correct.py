#!/usr/bin/env python3
"""
FINAL CORRECT Combined PDF Extractor
Uses question-specific bold text extraction (not page-wide)
This matches the methodology used to create the verified PPSC_Combined_MCQs data
"""

import pdfplumber
import csv
import re
import os
from datetime import datetime

OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_FINAL_CORRECT"

# Subject boundaries in the combined PDF
SUBJECTS = [
    ('General_Knowledge', 7, 1429, 4162),
    ('Pakistan_Studies', 1430, 2621, 3428),
    ('Everyday_Science', 2622, 4197, 4569),
    ('Islamiyat', 4198, 4811, 1753),
    ('Current_Affairs', 4812, 4962, 425),
    ('English', 4963, 5305, 993),
    ('Basic_Computer', 5306, 6036, 1549),
    ('Urdu', 6037, 6432, 632),
    ('General_Maths', 6433, 6605, 478),
    ('Geography', 6606, 6780, 549),
    ('Ethics_Civics', 6781, 6936, 491),
]


def normalize(text):
    """Normalize text for comparison"""
    if not text:
        return ''
    text = str(text).lower().strip()
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2013', '-').replace('\u2014', '-')
    text = re.sub(r'\s+', ' ', text)
    return text


def clean_text(text):
    """Clean extracted text"""
    if not text:
        return ''
    text = re.sub(r'Book\..*?MCQs.*?(?:Edition|Date).*', '', text, flags=re.DOTALL)
    text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2013', '-').replace('\u2014', '-')
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def extract_bold_for_question(page, q_num):
    """
    Extract bold text ONLY for a specific question
    Not the entire page - just the section between this question and the next
    """
    text = page.extract_text()
    if not text:
        return []

    # Find this question's position
    q_pattern = rf'(?:^|\n)\s*{q_num}\s*\.'
    match = re.search(q_pattern, text)
    if not match:
        return []

    # Find next question's position (to know where this question ends)
    next_q_pattern = rf'(?:^|\n)\s*{q_num + 1}\s*\.'
    next_match = re.search(next_q_pattern, text[match.start():])

    # Extract text for THIS question only
    if next_match:
        question_text = text[match.start():match.start() + next_match.start()]
    else:
        # No next question on this page - take next 2000 chars
        question_text = text[match.start():match.start() + 2000]

    # Get all bold text from page
    chars = page.chars
    bolds = []
    current = []

    for char in chars:
        if 'bold' in char.get('fontname', '').lower():
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

    # FILTER: Only keep bolds that appear within this question's text
    filtered_bolds = []
    question_norm = normalize(question_text)
    for bold in bolds:
        if bold in question_norm:
            filtered_bolds.append(bold)

    return filtered_bolds


def find_answer_for_question(pdf, q_num, options, start_page, end_page):
    """
    Find answer by extracting bold text specifically for this question
    Not from the entire page - only from the question's section
    """
    # Search for the question within the subject's page range
    for page_num in range(start_page, min(end_page + 1, len(pdf.pages))):
        try:
            text = pdf.pages[page_num].extract_text()
            if text and re.search(rf'(?:^|\n)\s*{q_num}\s*\.', text):
                # Found the question's page
                bolds = extract_bold_for_question(pdf.pages[page_num], q_num)

                # Match options to bolds
                for letter, option_text in options.items():
                    opt_norm = normalize(option_text)
                    if not opt_norm:
                        continue

                    # Check if this option matches any bold
                    for bold in bolds:
                        # Exact match
                        if opt_norm == bold:
                            return letter
                        # Partial match for longer text
                        elif len(opt_norm) > 10 and len(bold) > 10:
                            if opt_norm in bold or bold in opt_norm:
                                return letter

                return ''
        except:
            pass

    return ''


def extract_mcqs_from_range(pdf, start_page, end_page):
    """Extract MCQs from a page range with question-specific bold detection"""

    # Extract all text to find questions and options
    all_text = []
    for page_num in range(start_page, min(end_page + 1, len(pdf.pages))):
        try:
            text = pdf.pages[page_num].extract_text()
            if not text or len(text) < 50:
                continue

            text = re.sub(r'Book\..*?Past Papers.*?\n', '', text, flags=re.DOTALL)
            text = re.sub(r'\d+\s+by:.*?www\.howtests\.com', '', text)
            text = re.sub(r'Choose the correct (option|answer)\.?\s*', '\n', text, flags=re.I)

            all_text.append(text)
        except:
            continue

    combined_text = '\n'.join(all_text)
    lines = [l.strip() for l in combined_text.split('\n') if l.strip()]

    mcqs = []
    i = 0

    print(".", end="", flush=True)

    while i < len(lines):
        line = lines[i]
        q_match = re.match(r'^\s*(\d+)\s*\.\s*(.+)?', line)

        if q_match:
            q_num = int(q_match.group(1))
            q_text = (q_match.group(2) or '').strip()

            # Skip if already extracted
            if any(m['Question_Number'] == q_num for m in mcqs):
                i += 1
                continue

            options = {}
            j = i + 1
            max_look = min(i + 40, len(lines))

            # Extract options
            while j < max_look:
                opt_line = lines[j]
                opt_match = re.match(r'^\s*([a-d])\s*[\.\)\:\s]\s*(.+)', opt_line, re.I)

                if opt_match:
                    letter = opt_match.group(1).upper()
                    text = opt_match.group(2).strip()
                    if letter not in options:
                        options[letter] = text
                    else:
                        options[letter] += ' ' + text
                    j += 1
                    if len(options) == 4:
                        break
                elif len(options) > 0:
                    if re.match(r'^\s*\d+\s*\.', opt_line):
                        break
                    else:
                        last = max(options.keys())
                        options[last] += ' ' + opt_line
                        j += 1
                elif q_text == '' or len(q_text) < 200:
                    q_text += ' ' + opt_line
                    j += 1
                else:
                    j += 1

            if len(options) == 4 and all(k in options for k in ['A', 'B', 'C', 'D']):
                # Clean options
                clean_options = {k: clean_text(v) for k, v in options.items()}

                # Find answer using question-specific bold extraction
                answer = find_answer_for_question(pdf, q_num, clean_options, start_page, end_page)

                mcqs.append({
                    'Question_Number': q_num,
                    'Question': clean_text(q_text),
                    'Option_A': clean_options['A'],
                    'Option_B': clean_options['B'],
                    'Option_C': clean_options['C'],
                    'Option_D': clean_options['D'],
                    'Correct_Answer': answer
                })

                # Progress indicator
                if len(mcqs) % 100 == 0:
                    print(".", end="", flush=True)

                i = j
            else:
                i += 1
        else:
            i += 1

    return mcqs


def process_subject(pdf_path, subject_name, start_page, end_page, expected_count):
    """Extract and save MCQs for one subject"""
    print(f"\n{subject_name:20} ", end="", flush=True)

    start_time = datetime.now()

    with pdfplumber.open(pdf_path) as pdf:
        mcqs = extract_mcqs_from_range(pdf, start_page, end_page)
        mcqs.sort(key=lambda x: x['Question_Number'])

        extracted = len(mcqs)
        answers = sum(1 for m in mcqs if m['Correct_Answer'])
        ans_pct = answers * 100 // extracted if extracted > 0 else 0

        status = "✓" if ans_pct >= 95 else "!" if ans_pct >= 85 else "✗"

        elapsed = (datetime.now() - start_time).total_seconds()
        print(f" {status} {extracted:4} MCQs | {answers:4} ans ({ans_pct:3}%) | {elapsed:.0f}s")

        # Save CSV
        fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
        output_file = f"{OUTPUT_FOLDER}/{subject_name}.csv"

        with open(output_file, 'w', encoding='utf-8', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(mcqs)

        return extracted, answers, expected_count


def main():
    print("="*70)
    print("FINAL CORRECT COMBINED PDF EXTRACTION")
    print("="*70)
    print("Using question-specific bold text extraction")
    print("="*70)

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    pdf_path = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'

    if not os.path.exists(pdf_path):
        print(f"\nERROR: PDF not found at {pdf_path}")
        return

    results = []
    total_time = datetime.now()

    for subject_name, start_page, end_page, expected_count in SUBJECTS:
        try:
            extracted, answers, expected = process_subject(
                pdf_path, subject_name, start_page, end_page, expected_count
            )
            results.append((subject_name, extracted, answers, expected))
        except Exception as e:
            print(f"\n{subject_name:20} ✗ Error: {e}")
            results.append((subject_name, 0, 0, expected_count))

    # Summary
    print("\n" + "="*70)
    print("EXTRACTION COMPLETE - SUMMARY")
    print("="*70)

    total_e = sum(r[1] for r in results)
    total_a = sum(r[2] for r in results)
    total_ex = sum(r[3] for r in results)

    for name, ext, ans, exp in results:
        pct = ans * 100 // ext if ext > 0 else 0
        status = "✓" if pct >= 95 else "!" if pct >= 85 else "✗"
        match = "✓" if ext == exp else f"{ext}/{exp}"
        print(f"{status} {name:20} {ans:4}/{ext:4} ({pct:3}%) | Expected: {match}")

    ans_pct = total_a*100//total_e if total_e else 0
    print(f"\nTOTAL: {total_a:,}/{total_e:,} ({ans_pct}%)")
    print(f"Expected: {total_ex:,} | Extracted: {total_e:,}")
    print(f"Total time: {datetime.now() - total_time}")
    print(f"\nOutput: {OUTPUT_FOLDER}/")


if __name__ == "__main__":
    main()
