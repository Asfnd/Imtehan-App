import pandas as pd
import re
import os

def normalize_name(name):
    if pd.isna(name) or str(name).strip() == "": return ""
    name = str(name).lower()
    # Remove all non-alphanumeric characters
    name = re.sub(r'[^a-z0-9\s]', '', name)
    # Remove common business suffixes
    suffixes = [r'\binc\b', r'\bllc\b', r'\bcorp\b', r'\bltd\b', r'\bco\b', r'\bpa\b', r'\bpc\b']
    for suffix in suffixes:
        name = re.sub(suffix, '', name)
    return " ".join(name.split())

def name_wise_cleanup(file_path):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    df = pd.read_csv(file_path)
    original_count = len(df)
    
    # Calculate info score to keep the best row
    df['info_score'] = df.notna().sum(axis=1)
    df['norm_name'] = df['Name'].apply(normalize_name)
    
    # Sort by info score so the most complete row is "first" in each group
    df = df.sort_values(by='info_score', ascending=False)

    # Dictionary to track the merges for reporting
    merged_info = []
    
    # Identify duplicate groups
    groups = df[df['norm_name'] != ""].groupby('norm_name')
    for norm, group in groups:
        if len(group) > 1:
            merged_info.append((norm, group))

    # Keep only the row with the highest info_score for each norm_name
    final_df = df.drop_duplicates(subset=['norm_name'], keep='first')
    
    final_count = len(final_df)

    # Detailed Report Generation
    report = []
    report.append("="*60)
    report.append("NAME-WISE DEDUPLICATION REPORT")
    report.append("="*60)
    report.append(f"Starting Rows:    {original_count}")
    report.append(f"Unique Names:     {final_count}")
    report.append(f"Duplicates Removed: {original_count - final_count}")
    
    if merged_info:
        report.append("\n" + "-"*40)
        report.append("DETAILED LIST OF MERGED ENTITIES:")
        report.append("-"*40)
        
        for norm, group in merged_info:
            primary_name = group.iloc[0]['Name']
            report.append(f"\n[GROUP] {primary_name}")
            for idx, row in group.iterrows():
                loc = row.get('Location', 'No Location')
                url = row.get('URL', 'No URL')
                report.append(f"  - Row {idx+2}: {loc} | {url}")

    # Save outputs
    output_csv = "name_cleaned_list.csv"
    final_df.drop(columns=['info_score', 'norm_name']).to_csv(output_csv, index=False)
    
    with open("name_cleanup_report.txt", "w") as f:
        f.write("\n".join(report))

    print("\n".join(report))
    print(f"\n[Success] Name-cleaned file saved as: {output_csv}")

if __name__ == "__main__":
    path = "../../../../Downloads/afters_list__3rd_march__export_20260303 (2).csv"
    name_wise_cleanup(path)
