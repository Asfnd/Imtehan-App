#!/usr/bin/env python3
"""
Analyze font properties in PDFs with low answer detection
to find alternative signals for correct answers
"""

import pdfplumber
from collections import defaultdict

# PDFs with low answer detection
LOW_DETECTION = [
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Everyday Science Past Papers MCQs (2015 to Date).pdf', 'Everyday Science', 43),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC General Knowledge Past Papers MCQs from (2015 to Date).pdf', 'General Knowledge', 45),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Pakistan Studies Past Papers MCQs (2015 to Date).pdf', 'Pakistan Studies', 48),
]

# PDF with high answer detection for comparison
HIGH_DETECTION = [
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Current Affairs Past Papers MCQs (2015 to Date).pdf', 'Current Affairs', 99),
]


def analyze_pdf_fonts(pdf_path, name, pages_to_check=[10, 50, 100, 200]):
    """Analyze all font properties used in a PDF"""
    print(f"\n{'='*70}")
    print(f"ANALYZING: {name}")
    print(f"{'='*70}")

    with pdfplumber.open(pdf_path) as pdf:
        all_fonts = defaultdict(lambda: {'count': 0, 'sample': '', 'sizes': set()})

        for page_num in pages_to_check:
            if page_num >= len(pdf.pages):
                continue

            page = pdf.pages[page_num]
            chars = page.chars

            # Group by font properties
            for char in chars:
                font_name = char.get('fontname', 'unknown')
                size = round(char.get('size', 0), 1)

                key = f"{font_name}"
                all_fonts[key]['count'] += 1
                all_fonts[key]['sizes'].add(size)
                if len(all_fonts[key]['sample']) < 100:
                    all_fonts[key]['sample'] += char.get('text', '')

        print(f"\nFonts found (across pages {pages_to_check}):")
        for font, info in sorted(all_fonts.items(), key=lambda x: -x[1]['count']):
            sizes = sorted(info['sizes'])
            is_bold = 'bold' in font.lower()
            sample = info['sample'][:60].replace('\n', ' ')
            print(f"\n  Font: {font}")
            print(f"    Bold in name: {'YES' if is_bold else 'no'}")
            print(f"    Sizes: {sizes}")
            print(f"    Count: {info['count']}")
            print(f"    Sample: '{sample}...'")


def deep_analyze_page(pdf_path, name, page_num=10):
    """Deep analysis of a single page to understand answer formatting"""
    print(f"\n{'='*70}")
    print(f"DEEP ANALYSIS: {name} - Page {page_num + 1}")
    print(f"{'='*70}")

    with pdfplumber.open(pdf_path) as pdf:
        page = pdf.pages[page_num]
        text = page.extract_text()

        print(f"\nPage text (first 500 chars):")
        print(text[:500] if text else "No text")

        # Get ALL unique char properties
        chars = page.chars
        props = defaultdict(set)

        for char in chars:
            for key, value in char.items():
                if key in ['text', 'x0', 'x1', 'y0', 'y1', 'top', 'bottom', 'doctop', 'matrix']:
                    continue
                props[key].add(str(value)[:50])

        print(f"\nChar properties found:")
        for key, values in sorted(props.items()):
            print(f"  {key}: {list(values)[:5]}")


# Analyze low detection PDFs
for pdf_path, name, pct in LOW_DETECTION:
    analyze_pdf_fonts(pdf_path, name)
    deep_analyze_page(pdf_path, name)

# Compare with high detection PDF
for pdf_path, name, pct in HIGH_DETECTION:
    analyze_pdf_fonts(pdf_path, name)
    deep_analyze_page(pdf_path, name)
