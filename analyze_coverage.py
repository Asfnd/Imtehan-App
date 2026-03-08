#!/usr/bin/env python3
"""
Analyze bold text coverage across all PDFs
"""

import pdfplumber

PDFS = [
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Current Affairs Past Papers MCQs (2015 to Date).pdf', 'Current Affairs', 850),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Everyday Science Past Papers MCQs (2015 to Date).pdf', 'Everyday Science', 9137),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC General Knowledge Past Papers MCQs from (2015 to Date).pdf', 'General Knowledge', 8323),
    ('/Users/asfandiyarsafi/Downloads/PPSC/PPSC Pakistan Studies Past Papers MCQs (2015 to Date).pdf', 'Pakistan Studies', 6855),
]

print("="*70)
print("BOLD TEXT COVERAGE ANALYSIS")
print("="*70)

for pdf_path, name, target in PDFS:
    with pdfplumber.open(pdf_path) as pdf:
        total_bold_segments = 0

        for page_num in range(7, len(pdf.pages)):
            try:
                chars = pdf.pages[page_num].chars
                current = []

                for char in chars:
                    if 'bold' in char.get('fontname', '').lower():
                        current.append(char['text'])
                    else:
                        if current:
                            text = ''.join(current).strip()
                            # Filter out headers/ads
                            if text and len(text) < 100:
                                if not any(x in text.lower() for x in ['book.', 'edition', 'mcqs', 'past papers', 'sir', 'course', 'essay']):
                                    total_bold_segments += 1
                            current = []

                if current:
                    text = ''.join(current).strip()
                    if text and len(text) < 100:
                        if not any(x in text.lower() for x in ['book.', 'edition', 'mcqs', 'past papers', 'sir', 'course', 'essay']):
                            total_bold_segments += 1
            except:
                continue

        coverage = total_bold_segments * 100 // target if target > 0 else 0
        print(f"\n{name}:")
        print(f"  Questions: {target:,}")
        print(f"  Bold segments (answers): {total_bold_segments:,}")
        print(f"  Coverage: {coverage}%")
        print(f"  Missing: {target - total_bold_segments:,} answers not marked bold")
