import pandas as pd
import sys
import os

def find_duplicates(file_path):
    if not os.path.exists(file_path):
        print(f"Error: File '{file_path}' not found.")
        return

    print(f"Analyzing: {file_path}")
    
    # Load the CSV
    try:
        df = pd.read_csv(file_path)
    except Exception as e:
        print(f"Error reading CSV: {e}")
        return

    if 'Name' not in df.columns:
        print("Error: 'Name' column not found in CSV.")
        return

    # 1. Exact Name Duplicates
    exact_duplicates = df[df.duplicated('Name', keep=False)].sort_values('Name')
    
    # 2. Case-Insensitive Name Duplicates
    df['name_lower'] = df['Name'].astype(str).str.strip().str.lower()
    case_insensitive_duplicates = df[df.duplicated('name_lower', keep=False)].sort_values('name_lower')

    # 3. URL/Domain Duplicates (Often a better unique identifier)
    url_duplicates = pd.DataFrame()
    if 'URL' in df.columns:
        url_duplicates = df[df.duplicated('URL', keep=False)].dropna(subset=['URL']).sort_values('URL')

    print("\n" + "="*50)
    print(f"SUMMARY FOR '{os.path.basename(file_path)}'")
    print("="*50)
    print(f"Total Rows: {len(df)}")
    print(f"Exact Name Duplicates: {len(exact_duplicates['Name'].unique())} names repeated ({len(exact_duplicates)} rows)")
    print(f"Case-Insensitive Name Duplicates: {len(case_insensitive_duplicates['name_lower'].unique())} names repeated ({len(case_insensitive_duplicates)} rows)")
    
    if not url_duplicates.empty:
        print(f"Exact URL Duplicates: {len(url_duplicates['URL'].unique())} URLs repeated ({len(url_duplicates)} rows)")

    # Detailed Output
    if not case_insensitive_duplicates.empty:
        print("\n" + "-"*50)
        print("DETAILED DUPLICATES (Case-Insensitive Name)")
        print("-"*50)
        
        grouped = case_insensitive_duplicates.groupby('name_lower')
        for name, group in grouped:
            # Safely handle the grouped output
            print(f"\nName: '{group['Name'].iloc[0]}'")
            for idx, row in group.iterrows():
                location = row.get('Location', 'N/A')
                url = row.get('URL', 'N/A')
                print(f"  - Row {idx+2}: {location} | {url}")

    # Exporting results for you
    report_file = "duplicates_report.csv"
    case_insensitive_duplicates.drop(columns=['name_lower']).to_csv(report_file, index=False)
    print(f"\n[Done] A detailed list of all duplicate rows has been saved to: {report_file}")

if __name__ == "__main__":
    # Path relative to script execution
    default_path = "../../../../Downloads/afters_list__3rd_march__export_20260303 (2).csv"
    
    target_path = sys.argv[1] if len(sys.argv) > 1 else default_path
    find_duplicates(target_path)
