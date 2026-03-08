#!/usr/bin/env python3
"""
Check if answers are actually bold in the PDF
"""

import pdfplumber

PDF_PATH = "/Users/asfandiyarsafi/Downloads/PPSC/PPSC Everyday Science Past Papers MCQs (2015 to Date).pdf"

with pdfplumber.open(PDF_PATH) as pdf:
    # Check several pages to understand the pattern
    pages_to_check = [450, 700, 1000, 1500, 2000, 2500]

    for page_num in pages_to_check:
        if page_num >= len(pdf.pages):
            continue

        page = pdf.pages[page_num]
        text = page.extract_text()
        chars = page.chars

        # Count bold vs regular
        bold_count = sum(1 for c in chars if 'bold' in c.get('fontname', '').lower())
        total_count = len(chars)

        # Get bold segments
        segments = []
        current = []
        for char in chars:
            if 'bold' in char.get('fontname', '').lower():
                current.append(char['text'])
            else:
                if current:
                    segments.append(''.join(current).strip())
                    current = []
        if current:
            segments.append(''.join(current).strip())

        segments = [s for s in segments if s]

        print(f"\n{'='*60}")
        print(f"Page {page_num + 1}")
        print(f"{'='*60}")
        print(f"Bold chars: {bold_count}/{total_count} ({bold_count*100//total_count if total_count else 0}%)")
        print(f"Bold segments: {len(segments)}")
        if segments:
            print(f"Samples: {segments[:5]}")
        else:
            print("NO BOLD TEXT ON THIS PAGE!")

        # Show first few lines
        lines = text.split('\n')[:6] if text else []
        print(f"\nPage content preview:")
        for line in lines:
            print(f"  {line}")
