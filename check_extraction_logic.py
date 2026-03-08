#!/usr/bin/env python3
"""
Check how the extraction matches bold text to questions
The issue: bold text is collected globally, then matched to options
This can cause cross-contamination between questions
"""

import pdfplumber
import pandas as pd

# Let's look at how bold texts appear and how matching works
PDF = "/Users/asfandiyarsafi/Downloads/PPSC/PPSC Current Affairs Past Papers MCQs (2015 to Date).pdf"
CSV = "/Users/asfandiyarsafi/Desktop/CSS App/Claude/quiz-app/PPSC_Extracted_MCQs/Current_Affairs.csv"

df = pd.read_csv(CSV)

# Check Q200 which was flagged
row = df[df['Question_Number'] == 200].iloc[0]

print("="*70)
print("CHECKING Q200 - Current Affairs")
print("="*70)
print(f"Question: {row['Question']}")
print(f"A: {row['Option_A']}")
print(f"B: {row['Option_B']}")
print(f"C: {row['Option_C']}")
print(f"D: {row['Option_D']}")
print(f"Extracted Answer: {row['Correct_Answer']}")

# Now let's see what bold texts exist around this question
with pdfplumber.open(PDF) as pdf:
    # Get ALL bold texts (like the extractor does)
    all_bolds = []
    for page_num in range(7, len(pdf.pages)):
        page = pdf.pages[page_num]
        chars = page.chars
        current = []

        for char in chars:
            if 'bold' in char.get('fontname', '').lower():
                current.append(char['text'])
            else:
                if current:
                    text = ''.join(current).strip()
                    if len(text) > 1:
                        all_bolds.append(text)
                    current = []

    print(f"\nTotal bold texts collected: {len(all_bolds)}")

    # Check which options match
    options = {
        'A': row['Option_A'].lower().strip(),
        'B': row['Option_B'].lower().strip(),
        'C': row['Option_C'].lower().strip(),
        'D': row['Option_D'].lower().strip(),
    }

    print("\nSearching for option matches in bold texts:")
    for opt, text in options.items():
        matches = []
        for bold in all_bolds:
            bold_lower = bold.lower().strip()
            if (text == bold_lower or
                (len(text) > 20 and text[:25] in bold_lower) or
                (len(bold_lower) > 20 and bold_lower[:25] in text)):
                matches.append(bold)

        if matches:
            print(f"  {opt} ('{text[:30]}...'): FOUND - {matches[0]}")
        else:
            print(f"  {opt} ('{text[:30]}...'): NOT found in bold")

    # The extractor picks the FIRST match - let's see what that is
    print("\n" + "="*70)
    print("THE PROBLEM: First match wins")
    print("="*70)

    # Show first 10 bold texts
    print("First 20 bold texts in document:")
    for i, b in enumerate(all_bolds[:20]):
        print(f"  {i}: {b}")

    # Check option B (North Korea)
    print("\nSearching for 'North Korea' in bold texts:")
    for i, bold in enumerate(all_bolds):
        if 'north korea' in bold.lower():
            print(f"  Found at index {i}: {bold}")
            break

    # Check option D (Iran)
    print("\nSearching for 'Iran' in bold texts:")
    for i, bold in enumerate(all_bolds):
        if bold.lower().strip() == 'iran':
            print(f"  Found at index {i}: {bold}")
            break
