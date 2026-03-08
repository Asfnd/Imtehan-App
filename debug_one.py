#!/usr/bin/env python3
"""Debug one specific question in detail"""

import pdfplumber
import re

PDF = "/Users/asfandiyarsafi/Downloads/PPSC/PPSC Everyday Science Past Papers MCQs (2015 to Date).pdf"

# Q2000 had no answer - let's trace exactly what happens
Q_NUM = 2000

with pdfplumber.open(PDF) as pdf:
    # Find the page
    for page_num in range(7, len(pdf.pages)):
        text = pdf.pages[page_num].extract_text()
        if text and re.search(rf'\b{Q_NUM}\.\s+', text):
            print(f"Found Q{Q_NUM} on page {page_num + 1}")
            print(f"\n{'='*60}")
            print("PAGE TEXT:")
            print(f"{'='*60}")
            print(text[:1500])

            print(f"\n{'='*60}")
            print("ALL BOLD TEXT ON THIS PAGE:")
            print(f"{'='*60}")

            chars = pdf.pages[page_num].chars
            bolds = []
            current = []

            for char in chars:
                fontname = char.get('fontname', '')
                is_bold = 'bold' in fontname.lower()

                if is_bold:
                    current.append(char['text'])
                else:
                    if current:
                        text_seg = ''.join(current).strip()
                        if text_seg:
                            bolds.append(text_seg)
                        current = []

            if current:
                text_seg = ''.join(current).strip()
                if text_seg:
                    bolds.append(text_seg)

            for i, b in enumerate(bolds):
                print(f"  {i}: '{b}'")

            # Check next page too
            print(f"\n{'='*60}")
            print(f"BOLD TEXT ON NEXT PAGE ({page_num + 2}):")
            print(f"{'='*60}")

            next_chars = pdf.pages[page_num + 1].chars
            next_bolds = []
            current = []

            for char in next_chars:
                if 'bold' in char.get('fontname', '').lower():
                    current.append(char['text'])
                else:
                    if current:
                        text_seg = ''.join(current).strip()
                        if text_seg:
                            next_bolds.append(text_seg)
                        current = []

            if current:
                text_seg = ''.join(current).strip()
                if text_seg:
                    next_bolds.append(text_seg)

            for i, b in enumerate(next_bolds[:10]):
                print(f"  {i}: '{b}'")

            break
