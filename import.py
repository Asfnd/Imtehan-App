#!/usr/bin/env python3
"""Import all CSVs to Supabase - matches actual CSV structure"""

import pandas as pd
import os
from supabase import create_client

# TODO: Add your Supabase credentials
SUPABASE_URL = "YOUR_SUPABASE_URL"
SUPABASE_KEY = "YOUR_SUPABASE_KEY"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Folder → type mapping
FOLDERS = {
    'PPSC_Extracted_MCQs': 'practice',
    'PPSC_MOST_IMPORTANT_MCQS': 'most_important',
    'PPSC_Most_Repeated_MCQs': 'most_repeated'
}

# CSV file → table name (handles naming variations)
CSV_MAPPING = {
    'Pakistan_Studies.csv': 'pakistan_studies',
    'General_Knowledge.csv': 'general_knowledge',
    'Everyday_Science.csv': 'everyday_science',
    'Current_Affairs.csv': 'current_affairs',
    'Basic_Computer.csv': 'basic_computer',
    'General_Math.csv': 'general_math',
    'General_Maths.csv': 'general_math',  # handles variation
    'English.csv': 'english',
    'Urdu.csv': 'urdu',
    'Islamiat.csv': 'islamiat',
    'Islamiyat.csv': 'islamiat',  # handles variation
    'General_Geography.csv': 'geography',
    'Geography.csv': 'geography',  # handles variation
    'Ethics_Civics.csv': 'ethics_civics'
}

def import_csv(folder, csv_file, type_value):
    """Import one CSV file"""

    table_name = CSV_MAPPING.get(csv_file)
    if not table_name:
        print(f"  ⚠️  Skipping unknown file: {csv_file}")
        return 0

    filepath = os.path.join(folder, csv_file)

    print(f"\n📄 {folder}/{csv_file} → {table_name}")

    # Read CSV
    df = pd.read_csv(filepath)
    print(f"  Read {len(df)} rows")

    # Rename columns to match database
    df = df.rename(columns={
        'Question_Number': 'question_number',
        'Question': 'question',
        'Option_A': 'option_a',
        'Option_B': 'option_b',
        'Option_C': 'option_c',
        'Option_D': 'option_d',
        'Correct_Answer': 'correct_answer'
    })

    # Add type
    df['type'] = type_value

    # Keep only valid columns
    df = df[['question_number', 'question', 'option_a', 'option_b',
             'option_c', 'option_d', 'correct_answer', 'type']]

    # Remove invalid rows
    df = df.dropna(subset=['question', 'correct_answer'])
    df['correct_answer'] = df['correct_answer'].str.upper().str.strip()
    df = df[df['correct_answer'].isin(['A', 'B', 'C', 'D'])]

    print(f"  Cleaned to {len(df)} valid rows")

    # Upload in batches
    records = df.to_dict('records')
    batch_size = 1000

    for i in range(0, len(records), batch_size):
        batch = records[i:i+batch_size]
        try:
            supabase.table(table_name).insert(batch).execute()
            print(f"  ✓ Uploaded {min(i+batch_size, len(records))}/{len(records)}")
        except Exception as e:
            print(f"  ❌ Error: {str(e)}")

    return len(df)

def main():
    """Main import"""
    print("="*60)
    print("IMPORTING CSVs TO SUPABASE")
    print("="*60)

    total = 0

    for folder, type_value in FOLDERS.items():
        print(f"\n{'='*60}")
        print(f"Folder: {folder} (type={type_value})")
        print(f"{'='*60}")

        if not os.path.exists(folder):
            print(f"⚠️  Folder not found, skipping")
            continue

        csv_files = [f for f in os.listdir(folder) if f.endswith('.csv')]

        for csv_file in csv_files:
            count = import_csv(folder, csv_file, type_value)
            total += count

    print(f"\n{'='*60}")
    print(f"✅ IMPORT COMPLETE")
    print(f"{'='*60}")
    print(f"Total MCQs imported: {total}")

if __name__ == '__main__':
    main()
