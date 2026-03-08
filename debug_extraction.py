#!/usr/bin/env python3
"""
Debug the actual extraction to see why matching fails
"""

import pdfplumber
import re

PDF_PATH = "/Users/asfandiyarsafi/Downloads/PPSC/PPSC Everyday Science Past Papers MCQs (2015 to Date).pdf"


def get_page_bold_texts(pdf, start_page=7):
    """Same function as in extractor"""
    page_bolds = {}

    for page_num in range(start_page, len(pdf.pages)):
        try:
            page = pdf.pages[page_num]
            chars = page.chars
            bolds = []
            current = []

            for char in chars:
                if 'bold' in char.get('fontname', '').lower():
                    current.append(char['text'])
                else:
                    if current:
                        text = ''.join(current).strip()
                        if len(text) > 1:  # <-- THIS IS THE ISSUE!
                            bolds.append(text.lower())
                        current = []

            if current:
                text = ''.join(current).strip()
                if len(text) > 1:  # <-- Single chars like '8' are SKIPPED!
                    bolds.append(text.lower())

            page_bolds[page_num] = bolds
        except:
            page_bolds[page_num] = []

    return page_bolds


with pdfplumber.open(PDF_PATH) as pdf:
    page_bolds = get_page_bold_texts(pdf)

    # Check page 20 (Q37)
    page_num = 19  # 0-indexed

    print(f"Page {page_num + 1} bolds (current logic - len > 1):")
    print(page_bolds.get(page_num, []))

    # Now get ALL bolds including single chars
    page = pdf.pages[page_num]
    chars = page.chars
    all_bolds = []
    current = []

    for char in chars:
        if 'bold' in char.get('fontname', '').lower():
            current.append(char['text'])
        else:
            if current:
                text = ''.join(current).strip()
                if text:  # Include ALL, even single chars
                    all_bolds.append(text)
                current = []

    if current:
        text = ''.join(current).strip()
        if text:
            all_bolds.append(text)

    print(f"\nPage {page_num + 1} bolds (ALL including single chars):")
    print(all_bolds)

    # Count single-char bolds we're missing
    single_char = [b for b in all_bolds if len(b) == 1]
    print(f"\nSingle-char bolds being SKIPPED: {single_char}")
