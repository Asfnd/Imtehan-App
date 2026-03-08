#!/usr/bin/env python3
"""
VERIFIED Combined PDF Extractor
Uses the same answer detection method from the verification script
that achieved 100% accuracy
"""

import pdfplumber
import csv
import re
import os
from datetime import datetime

OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Combined_MCQs_VERIFIED"

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


def find_answer_verified(pdf, q_num, options, start_page, end_page):
    """
    Find answer using the verified method from final_comprehensive_fix_all.py
    Searches for the question page and checks which option is bold
    """
    # Search in subject's page range
    for page_num in range(start_page, min(end_page + 1, len(pdf.pages))):
        try:
            text = pdf.pages[page_num].extract_text()
            if text and re.search(rf'(?:^|\n)\s*{q_num}\s*\.', text):
                # Found the question page
                bolds = get_page_bolds(pdf.pages[page_num])

                # Check which option is bold
                candidates = []

                for letter, option_text in options.items():
                    norm = normalize(option_text)
                    if not norm:
                        continue

                    # Exact match
                    if norm in [normalize(b) for b in bolds]:
                        candidates.append((letter, 'exact'))

                    # Partial match for longer text
                    elif len(norm) > 10:
                        for bold_text in bolds:
                            bold_norm = normalize(bold_text)
                            if len(bold_norm) > 10:
                                if norm in bold_norm or bold_norm in norm:
                                    candidates.append((letter, 'partial'))
                                    break

                if candidates:
                    # Prefer exact matches
                    exact = [c for c in candidates if c[1] == 'exact']
                    return exact[0][0] if exact else candidates[0][0]
                else:
                    return ''
        except:
            pass

    return ''


def extract_mcqs_from_range(pdf, start_page, end_page):
    """Extract MCQs from a page range with verified answer detection"""

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

                # Find answer using VERIFIED method
                answer = find_answer_verified(pdf, q_num, clean_options, start_page, end_page)

                mcqs.append({
                    'Question_Number': q_num,
                    'Question': clean_text(q_text),
                    'Option_A': clean_options['A'],
                    'Option_B': clean_options['B'],
                    'Option_C': clean_options['C'],
                    'Option_D': clean_options['D'],
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
    print(f"{subject_name:20} ", end="", flush=True)

    start_time = datetime.now()

    with pdfplumber.open(pdf_path) as pdf:
        mcqs = extract_mcqs_from_range(pdf, start_page, end_page)
        mcqs.sort(key=lambda x: x['Question_Number'])

        extracted = len(mcqs)
        answers = sum(1 for m in mcqs if m['Correct_Answer'])
        ans_pct = answers * 100 // extracted if extracted > 0 else 0

        status = "✓" if ans_pct >= 95 else "!" if ans_pct >= 85 else "✗"

        elapsed = (datetime.now() - start_time).total_seconds()
        print(f"{status} {extracted:4} MCQs | {answers:4} ans ({ans_pct:3}%) | {elapsed:.1f}s")

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
    print("VERIFIED COMBINED PDF EXTRACTION")
    print("="*70)
    print("Using proven verification method for answer detection\n")

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
            print(f"{subject_name:20} ✗ Error: {e}")
            results.append((subject_name, 0, 0, expected_count))

    # Summary
    print("\n" + "="*70)
    print("SUMMARY")
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
    print(f"\nTotal time: {datetime.now() - total_time}")
    print(f"Output: {OUTPUT_FOLDER}/")


if __name__ == "__main__":
    main()
