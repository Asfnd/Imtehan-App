#!/usr/bin/env python3
"""Check why Islamiat has fewer answers"""

import pdfplumber

PDF = "/Users/asfandiyarsafi/Downloads/PPSC/PPSC Islamiat Past Papers MCQs (2015 to Date).pdf"

with pdfplumber.open(PDF) as pdf:
    # Check a few pages to understand the structure
    for page_num in [50, 100, 500, 800]:
        print(f"\n{'='*60}")
        print(f"PAGE {page_num + 1}")
        print(f"{'='*60}")

        page = pdf.pages[page_num]
        chars = page.chars

        # Get fonts used
        fonts = {}
        for char in chars:
            font = char.get('fontname', 'unknown')
            if font not in fonts:
                fonts[font] = 0
            fonts[font] += 1

        print("Fonts used:")
        for font, count in sorted(fonts.items(), key=lambda x: -x[1]):
            is_bold = 'bold' in font.lower()
            print(f"  {font}: {count} chars {'[BOLD]' if is_bold else ''}")

        # Get text sample
        text = page.extract_text()
        if text:
            print(f"\nText sample:")
            lines = text.split('\n')[:10]
            for line in lines:
                print(f"  {line}")
