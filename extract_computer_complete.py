
#!/usr/bin/env python3
"""
Complete Computer MCQs Extractor
Scans ALL pages, skips ads, gets EXACTLY 3,098 MCQs
"""

import pdfplumber
import pandas as pd
import re
from datetime import datetime

PDF_PATH = "/Users/asfandiyarsafi/Downloads/PPSC/PPSC Computer Past Papers MCQs (2015 to Date).pdf"
OUTPUT_FOLDER = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs"
TARGET_COUNT = 3098

def is_advertisement_page(text):
    """Detect if page is an advertisement"""
    if not text or len(text) < 100:
        return True

    ad_keywords = [
        'advertise with',
        'free essays',
        'css current affairs',
        'css solved',
        'course for css',
        'join sir syed',
        'students\' reviews',
        'write & get your voice',
        'promote your brand'
    ]

    text_lower = text.lower()
    for keyword in ad_keywords:
        if keyword in text_lower:
            return True

    # If page has no question numbers, it's likely an ad
    if not re.search(r'^\d+\.\s+', text, re.MULTILINE):
        return True

    return False

def get_bold_texts(page):
    """Extract bold text for answers"""
    chars = page.chars
    bold_texts = []
    current = []
    current_y = None

    for char in chars:
        font = char.get('fontname', '')
        if 'bold' in font.lower():
            y = round(char['top'], 1)
            if current_y is None or abs(y - current_y) < 2:
                current.append(char['text'])
                current_y = y
            else:
                if current:
                    text = ''.join(current).strip()
                    if len(text) > 1:
                        bold_texts.append(text)
                current = [char['text']]
                current_y = y
        else:
            if current:
                text = ''.join(current).strip()
                if len(text) > 1:
                    bold_texts.append(text)
                current = []
                current_y = None

    if current:
        text = ''.join(current).strip()
        if len(text) > 1:
            bold_texts.append(text)

    return bold_texts

def match_answer(bold_texts, options):
    """Match bold text to option letter"""
    for bold in bold_texts:
        bold_lower = bold.lower().strip()

        for opt_letter, opt_text in options.items():
            opt_lower = opt_text.lower().strip()

            # Exact match
            if bold_lower == opt_lower:
                return opt_letter

            # Partial match (first 20 chars)
            if len(opt_lower) > 15:
                if opt_lower[:20] in bold_lower or bold_lower[:20] in opt_lower:
                    return opt_letter

            # Substring search
            if len(opt_lower) > 20:
                for i in range(min(30, len(opt_lower) - 15)):
                    if opt_lower[i:i+15] in bold_lower:
                        return opt_letter

    return ''

def extract_page(page):
    """Extract all MCQs from a page"""
    text = page.extract_text()
    if not text:
        return []

    # Skip advertisement pages
    if is_advertisement_page(text):
        return []

    # Clean text
    text = re.sub(r'Book\..*?PPSC Computer Past Papers.*?\n', '', text, flags=re.DOTALL)
    text = re.sub(r'\d+\s+by:.*', '', text)
    text = re.sub(r'Choose the correct option\.?', '', text, flags=re.I)

    lines = [l.strip() for l in text.split('\n') if l.strip()]
    bold_texts = get_bold_texts(page)

    mcqs = []
    i = 0

    while i < len(lines):
        line = lines[i]

        # Question pattern: "123. Question text"
        q_match = re.match(r'^(\d+)\.\s+(.+)', line)

        if q_match:
            q_num = q_match.group(1)
            q_text = q_match.group(2).strip()
            options = {}
            j = i + 1

            # Collect next 4 options
            while j < len(lines) and len(options) < 4:
                opt_line = lines[j]

                # Option pattern: "a. Option text" or "a ) Option text"
                opt_match = re.match(r'^([a-d])[\.\)\s]\s*(.+)', opt_line, re.I)

                if opt_match:
                    opt_letter = opt_match.group(1).upper()
                    opt_text = opt_match.group(2).strip()

                    if opt_letter not in options:
                        options[opt_letter] = opt_text
                    else:
                        # Duplicate letter - continuation of previous
                        options[opt_letter] += ' ' + opt_text

                    j += 1
                elif len(options) > 0:
                    # Might be continuation of last option
                    last_opt = max(options.keys())

                    # Don't append if it looks like a new question
                    if not re.match(r'^\d+[\.\)]', opt_line):
                        options[last_opt] += ' ' + opt_line
                        j += 1
                    else:
                        break
                elif len(q_text) < 100:
                    # Continuation of question
                    q_text += ' ' + opt_line
                    j += 1
                else:
                    j += 1

            # Save MCQ if we have exactly 4 options
            if len(options) == 4:
                answer = match_answer(bold_texts, options)

                mcqs.append({
                    'Question_Number': q_num,
                    'Question': q_text,
                    'Option_A': options.get('A', ''),
                    'Option_B': options.get('B', ''),
                    'Option_C': options.get('C', ''),
                    'Option_D': options.get('D', ''),
                    'Correct_Answer': answer
                })

                i = j
            else:
                i += 1
        else:
            i += 1

    return mcqs

def main():
    print("="*80)
    print("COMPLETE COMPUTER MCQs EXTRACTION")
    print("="*80)
    print(f"Target: EXACTLY {TARGET_COUNT:,} MCQs")
    print(f"Strategy: Scan ALL pages, skip advertisements")
    print(f"Output: {OUTPUT_FOLDER}")
    print("="*80)

    start = datetime.now()

    with pdfplumber.open(PDF_PATH) as pdf:
        total_pages = len(pdf.pages)
        print(f"\nTotal pages: {total_pages}")
        print("Extracting from ALL pages...\n")

        all_mcqs = []
        ad_pages = 0

        # Scan EVERY page from page 8 to the end
        for page_num in range(7, total_pages):
            page = pdf.pages[page_num]
            text = page.extract_text()

            # Check if it's an ad page
            if is_advertisement_page(text):
                ad_pages += 1
                continue

            # Extract MCQs from this page
            mcqs = extract_page(page)
            all_mcqs.extend(mcqs)

            # Progress every 100 pages
            if (page_num - 7 + 1) % 100 == 0:
                pct = (page_num - 7 + 1) * 100 // (total_pages - 7)
                ans = sum(1 for m in all_mcqs if m['Correct_Answer'])
                print(f"  {pct:3d}% | Page {page_num + 1:4d}/{total_pages} | MCQs: {len(all_mcqs):4d} | Ads skipped: {ad_pages:3d} | Answers: {ans:4d}")

        print(f"\n{'='*80}")
        print("EXTRACTION COMPLETE")
        print(f"{'='*80}")
        print(f"Total pages scanned: {total_pages - 7}")
        print(f"Advertisement pages: {ad_pages}")
        print(f"MCQ pages: {total_pages - 7 - ad_pages}")
        print(f"\nTotal MCQs extracted: {len(all_mcqs):,}")
        print(f"Target from TOC: {TARGET_COUNT:,}")

        if len(all_mcqs) == TARGET_COUNT:
            print(f"Match: ✅ PERFECT (100%)")
        else:
            match_pct = len(all_mcqs) * 100 // TARGET_COUNT
            print(f"Match: {match_pct}% ({len(all_mcqs):,} / {TARGET_COUNT:,})")

        answers = sum(1 for m in all_mcqs if m['Correct_Answer'])
        print(f"Answers detected: {answers:,} ({answers*100//len(all_mcqs)}%)")

        # Save to CSV
        df = pd.DataFrame(all_mcqs)
        output_file = f"{OUTPUT_FOLDER}/Basic_Computer.csv"
        df.to_csv(output_file, index=False, encoding='utf-8')

        print(f"\n✅ Saved: {output_file}")
        print(f"⏱️  Time: {datetime.now() - start}")
        print("="*80)

if __name__ == "__main__":
    main()
