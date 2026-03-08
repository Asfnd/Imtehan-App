#!/usr/bin/env python3
"""
Examine PDF structure to understand how answers are marked
"""

import pdfplumber

# Check one PDF closely
PDF = "/Users/asfandiyarsafi/Downloads/PPSC/PPSC Current Affairs Past Papers MCQs (2015 to Date).pdf"

with pdfplumber.open(PDF) as pdf:
    # Look at page 10 (should have first few questions)
    for page_num in [8, 9, 10]:
        print(f"\n{'='*70}")
        print(f"PAGE {page_num + 1}")
        print(f"{'='*70}")

        page = pdf.pages[page_num]
        chars = page.chars

        # Group chars by their properties
        fonts_used = {}
        for char in chars:
            font = char.get('fontname', 'unknown')
            if font not in fonts_used:
                fonts_used[font] = []
            fonts_used[font].append(char['text'])

        print("\nFonts used on this page:")
        for font, chars_list in fonts_used.items():
            sample = ''.join(chars_list[:100])
            is_bold = 'bold' in font.lower()
            print(f"  {font} ({'BOLD' if is_bold else 'regular'}): {sample[:80]}...")

        # Get text
        text = page.extract_text()
        print(f"\nPage text preview:")
        lines = text.split('\n')[:20]
        for line in lines:
            print(f"  {line}")
