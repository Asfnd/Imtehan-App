#!/usr/bin/env python3
"""
Import all CSV files from 3 folders into Supabase
Handles all 11 subjects × 3 types = 33 CSV files
"""

import pandas as pd
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase credentials (add to .env file)
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Error: SUPABASE_URL and SUPABASE_KEY must be set in .env file")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Folder to type mapping
FOLDER_TO_TYPE = {
    'PPSC_Extracted_MCQs': 'practice',
    'PPSC_MOST_IMPORTANT_MCQS': 'most_important',
    'PPSC_Most_Repeated_MCQs': 'most_repeated'
}

# CSV filename variations to table name mapping
CSV_TO_TABLE = {
    # Pakistan Studies
    'Pakistan_Studies.csv': 'pakistan_studies',

    # General Knowledge
    'General_Knowledge.csv': 'general_knowledge',

    # Everyday Science
    'Everyday_Science.csv': 'everyday_science',

    # Current Affairs
    'Current_Affairs.csv': 'current_affairs',

    # Computer (handles both Basic_Computer and Computer variations)
    'Basic_Computer.csv': 'basic_computer',
    'Computer.csv': 'basic_computer',

    # Math (handles General_Math and General_Maths variations)
    'General_Math.csv': 'general_math',
    'General_Maths.csv': 'general_math',

    # English
    'English.csv': 'english',

    # Urdu
    'Urdu.csv': 'urdu',

    # Islamiat (handles Islamiat and Islamiyat variations)
    'Islamiat.csv': 'islamiat',
    'Islamiyat.csv': 'islamiat',

    # Geography (handles General_Geography and Geography variations)
    'General_Geography.csv': 'geography',
    'Geography.csv': 'geography',

    # Ethics & Civics
    'Ethics_Civics.csv': 'ethics_civics'
}

def clean_dataframe(df: pd.DataFrame, type_value: str) -> pd.DataFrame:
    """Clean and standardize DataFrame columns"""

    # Rename columns to match database schema
    column_mapping = {
        'Question_Number': 'question_number',
        'Question': 'question',
        'Option_A': 'option_a',
        'Option_B': 'option_b',
        'Option_C': 'option_c',
        'Option_D': 'option_d',
        'Correct_Answer': 'correct_answer'
    }

    df = df.rename(columns=column_mapping)

    # Add type column
    df['type'] = type_value

    # Select only required columns
    required_columns = [
        'question_number', 'question',
        'option_a', 'option_b', 'option_c', 'option_d',
        'correct_answer', 'type'
    ]

    # Filter to only required columns that exist
    df = df[[col for col in required_columns if col in df.columns]]

    # Remove rows with missing critical data
    df = df.dropna(subset=['question', 'correct_answer'])

    # Clean correct_answer (ensure it's A, B, C, or D)
    df['correct_answer'] = df['correct_answer'].str.upper().str.strip()
    df = df[df['correct_answer'].isin(['A', 'B', 'C', 'D'])]

    return df

def upload_to_supabase(table_name: str, records: list, batch_size: int = 1000):
    """Upload records to Supabase in batches"""

    total = len(records)

    for i in range(0, total, batch_size):
        batch = records[i:i+batch_size]

        try:
            supabase.table(table_name).insert(batch).execute()
            print(f"  ✓ Uploaded {min(i+batch_size, total)}/{total} records")
        except Exception as e:
            print(f"  ❌ Error uploading batch {i}-{i+batch_size}: {str(e)}")
            # Continue with next batch
            continue

def import_all_csvs():
    """Main import function"""

    print("Starting CSV import to Supabase...\n")

    total_imported = 0

    for folder_name, type_value in FOLDER_TO_TYPE.items():
        print(f"\n{'='*60}")
        print(f"Processing folder: {folder_name} (type: {type_value})")
        print(f"{'='*60}\n")

        if not os.path.exists(folder_name):
            print(f"⚠️  Folder not found: {folder_name}, skipping...\n")
            continue

        # Get all CSV files in folder
        csv_files = [f for f in os.listdir(folder_name) if f.endswith('.csv')]

        for csv_file in csv_files:
            # Get table name for this CSV
            table_name = CSV_TO_TABLE.get(csv_file)

            if not table_name:
                print(f"⚠️  Unknown CSV file: {csv_file}, skipping...")
                continue

            csv_path = os.path.join(folder_name, csv_file)

            print(f"📄 {csv_file} → {table_name}")

            try:
                # Read CSV
                df = pd.read_csv(csv_path)
                original_count = len(df)
                print(f"  Read {original_count} rows")

                # Clean dataframe
                df = clean_dataframe(df, type_value)
                cleaned_count = len(df)
                print(f"  Cleaned to {cleaned_count} rows")

                if cleaned_count == 0:
                    print(f"  ⚠️  No valid records after cleaning, skipping...")
                    continue

                # Convert to records
                records = df.to_dict('records')

                # Upload to Supabase
                upload_to_supabase(table_name, records)

                total_imported += cleaned_count
                print(f"  ✅ Successfully imported {cleaned_count} records\n")

            except Exception as e:
                print(f"  ❌ Error processing {csv_file}: {str(e)}\n")
                continue

    print(f"\n{'='*60}")
    print(f"Import Complete!")
    print(f"{'='*60}")
    print(f"Total records imported: {total_imported}")
    print(f"\nYou can verify by running this SQL in Supabase:")
    print(f"SELECT * FROM subject_summary;")

if __name__ == "__main__":
    import_all_csvs()
