import pandas as pd
import re
import os

def normalize_name(name):
    if pd.isna(name): return ""
    # Remove punctuation, extra spaces, and common suffixes
    name = str(name).lower()
    name = re.sub(r'[^\w\s]', '', name)
    name = re.sub(r'\b(inc|llc|corp|ltd|co|corporation|incorporated)\b', '', name)
    return " ".join(name.split())

def deep_cleanup(file_path):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    df = pd.read_csv(file_path)
    original_count = len(df)
    
    # Pre-processing: Count non-null values per row to prioritize keeping better data
    df['info_count'] = df.notna().sum(axis=1)
    # Sort so that rows with more info come first (keep='first' will then pick the best one)
    df = df.sort_values(by='info_count', ascending=False)

    # 1. Exact URL Duplicates (Strongest indicator)
    url_dupes = df[df.duplicated('URL', keep='first') & df['URL'].notna()]
    df_no_url_dupes = df.drop_duplicates('URL', keep='first').copy()

    # 2. Exact Domain Duplicates
    domain_dupes = df_no_url_dupes[df_no_url_dupes.duplicated('Domain', keep='first') & df_no_url_dupes['Domain'].notna()]
    df_no_domain_dupes = df_no_url_dupes.drop_duplicates('Domain', keep='first').copy()

    # 3. Deep Name Check (Normalized)
    df_no_domain_dupes['norm_name'] = df_no_domain_dupes['Name'].apply(normalize_name)
    name_dupes = df_no_domain_dupes[df_no_domain_dupes.duplicated('norm_name', keep='first') & (df_no_domain_dupes['norm_name'] != "")]
    
    final_df = df_no_domain_dupes.drop_duplicates('norm_name', keep='first').copy()

    # Prepare Detailed Report
    report = []
    report.append("="*60)
    report.append("DEEP DUPLICATE CLEANUP REPORT")
    report.append("="*60)
    report.append(f"Original Row Count: {original_count}")
    report.append(f"Final Row Count:    {len(final_df)}")
    report.append(f"Total Removed:      {original_count - len(final_df)}")
    report.append("\n" + "-"*40)
    report.append("REMOVAL BREAKDOWN")
    report.append("-"*40)
    report.append(f"1. Exact URL Duplicates:    {len(url_dupes)}")
    report.append(f"2. Shared Domain Duplicates: {len(domain_dupes)}")
    report.append(f"3. Normalized Name Matches:  {len(name_dupes)}")

    if len(url_dupes) > 0:
        report.append("\nSample of Removed URLs:")
        for url in url_dupes['URL'].unique()[:5]:
            report.append(f"  - {url}")

    if len(name_dupes) > 0:
        report.append("\nSample of Removed Names (Normalized matches):")
        for name in name_dupes['Name'].unique()[:5]:
            report.append(f"  - {name}")

    # Save outputs
    output_csv = "cleaned_afters_list.csv"
    final_df.drop(columns=['info_count', 'norm_name']).to_csv(output_csv, index=False)
    
    with open("cleanup_report.txt", "w") as f:
        f.write("\n".join(report))

    print("\n".join(report))
    print(f"\n[Success] Cleaned file saved as: {output_csv}")
    print(f"[Success] Detailed report saved as: cleanup_report.txt")

if __name__ == "__main__":
    path = "../../../../Downloads/afters_list__3rd_march__export_20260303 (2).csv"
    deep_cleanup(path)
