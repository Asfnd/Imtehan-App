#!/usr/bin/env python3
"""
PRECISE Combined PDF Extractor - Accurate answer detection
Combines good page boundary logic with page-local answer matching
Fixes the 73% error rate from previous extraction
"""

import pdfplumber
import csv
import re
import os
from datetime import datetime

OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_PRECISE"

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


def get_page_bolds(page):
    """Extract all bold text from a page"""
    chars = page.chars
    bolds = []
    current = []

    for char in chars:
        if 'bold' in char.get('fontname', '').lower():
            current.append(char['text'])
        else:
            if current:
                text = ''.join(current).strip()
                if text:
                    bolds.append(text)
                current = []

    if current:
        text = ''.join(current).strip()
        if text:
            bolds.append(text)

    return bolds


def find_answer_precise(options, page_bolds, next_page_bolds=None):
    """
    Find answer using ONLY bolds from current and next page
    This prevents false matches from distant pages
    """
    all_bolds = page_bolds[:]
    if next_page_bolds:
        all_bolds.extend(next_page_bolds)

    # First pass: exact matches
    for bold in all_bolds:
        bold_norm = normalize(bold)
        if not bold_norm or len(bold_norm) < 1:
            continue

        for letter, opt_text in options.items():
            opt_norm = normalize(opt_text)
            if not opt_norm:
                continue

            # Exact match
            if bold_norm == opt_norm:
                return letter

    # Second pass: partial matches for longer text (>15 chars to avoid short false matches)
    for bold in all_bolds:
        bold_norm = normalize(bold)
        if len(bold_norm) < 15:
            continue

        for letter, opt_text in options.items():
            opt_norm = normalize(opt_text)
            if len(opt_norm) < 15:
                continue

            # Both texts are long enough - check partial match
            if bold_norm in opt_norm or opt_norm in bold_norm:
                return letter

    return ''


def find_question_page(pdf, q_num, start_page, end_page):
    """Find exact page where a question appears"""
    # Search in a reasonable window (questions usually don't span 100+ pages)
    search_start = max(start_page, start_page)
    search_end = min(end_page, start_page + 500)

    for page_num in range(search_start, search_end):
        try:
            if page_num >= len(pdf.pages):
                break
            text = pdf.pages[page_num].extract_text()
            if text and re.search(rf'(?:^|\n)\s*{q_num}\s*\.', text):
                return page_num
        except:
            continue

    return None


def extract_mcqs_from_range(pdf, start_page, end_page):
    """Extract MCQs from a page range with precise answer detection"""

    # First, extract all text to find questions and options
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
                # Find exact page for this question
                q_page = find_question_page(pdf, q_num, start_page, end_page)

                answer = ''
                if q_page is not None:
                    try:
                        # Get bolds ONLY from question's page and next page
                        page_bolds = get_page_bolds(pdf.pages[q_page])
                        next_bolds = None
                        if q_page + 1 < len(pdf.pages):
                            next_bolds = get_page_bolds(pdf.pages[q_page + 1])

                        # Clean options before matching
                        clean_options = {k: clean_text(v) for k, v in options.items()}

                        # Find answer using precise page-local matching
                        answer = find_answer_precise(clean_options, page_bolds, next_bolds)
                    except Exception as e:
                        pass

                mcqs.append({
                    'Question_Number': q_num,
                    'Question': clean_text(q_text),
                    'Option_A': clean_text(options['A']),
                    'Option_B': clean_text(options['B']),
                    'Option_C': clean_text(options['C']),
                    'Option_D': clean_text(options['D']),
                    'Correct_Answer': answer
                })
                i = j
            else:
                i += 1
        else:
            i += 1

    return mcqs


def process_subject(pdf_path, subject_name, start_page, end_page, expected_count):
    """Extract and save MCQs for one subject"""
    print(f"\n{subject_name} (pages {start_page}-{end_page})", end=" ", flush=True)

    start_time = datetime.now()

    with pdfplumber.open(pdf_path) as pdf:
        mcqs = extract_mcqs_from_range(pdf, start_page, end_page)
        mcqs.sort(key=lambda x: x['Question_Number'])

        extracted = len(mcqs)
        answers = sum(1 for m in mcqs if m['Correct_Answer'])
        ans_pct = answers * 100 // extracted if extracted > 0 else 0

        status = "✓" if ans_pct >= 95 else "!" if ans_pct >= 85 else "✗"

        print(f"- {status} {extracted:,} MCQs, {answers:,} answers ({ans_pct}%)", flush=True)

        # Save CSV
        fieldnames = ['Question_Number', 'Question', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer']
        output_file = f"{OUTPUT_FOLDER}/{subject_name}.csv"

        with open(output_file, 'w', encoding='utf-8', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(mcqs)

        return extracted, answers, expected_count


def main():
    print("="*60)
    print("PRECISE COMBINED PDF EXTRACTION")
    print("="*60)
    print("\nUsing page-local answer detection to fix 73% error rate")

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    pdf_path = '/Users/asfandiyarsafi/Downloads/PPSC/PPSC Most Important MCQs (With Explanation).pdf'

    # Check if PDF exists
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
            print(f"\n✗ {subject_name}: {e}")
            results.append((subject_name, 0, 0, expected_count))

    # Summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)

    total_e = sum(r[1] for r in results)
    total_a = sum(r[2] for r in results)
    total_ex = sum(r[3] for r in results)

    for name, ext, ans, exp in results:
        pct = ans * 100 // ext if ext > 0 else 0
        status = "✓" if pct >= 95 else "!" if pct >= 85 else "✗"
        match = "✓" if ext == exp else f"{ext}/{exp}"
        print(f"{status} {name:<20} {ans:,}/{ext:,} ({pct:>3}%) [{match}]")

    print(f"\nTOTAL: {total_a:,}/{total_e:,} ({total_a*100//total_e if total_e else 0}%)")
    print(f"Expected: {total_ex:,} | Extracted: {total_e:,}")
    print(f"\nTotal time: {datetime.now() - total_time}")
    print(f"\nOutput: {OUTPUT_FOLDER}/")


if __name__ == "__main__":
    main()
