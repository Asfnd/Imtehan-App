import pandas as pd
import re
import os

def normalize(text):
    if pd.isna(text) or str(text).strip() == "": return ""
    text = str(text).lower()
    text = re.sub(r'[^a-z0-9\s]', '', text)
    noise = [r'\bllc\b', r'\binc\b', r'\bcorp\b', r'\bltd\b', r'\bco\b', r'\bpa\b', r'\bpc\b', 
             r'\bmedical\b', r'\bspa\b', r'\bmedspa\b', r'\bclinic\b', r'\bcenter\b', r'\bgroup\b']
    for word in noise:
        text = re.sub(word, '', text)
    return " ".join(text.split())

def final_deep_check(file_path):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    df = pd.read_csv(file_path)
    original_count = len(df)
    
    df['norm_name'] = df['Name'].apply(normalize)
    df['norm_profile'] = df['Profile'].apply(normalize)
    df['info_score'] = df.notna().sum(axis=1)
    df = df.sort_values(by='info_score', ascending=False)

    removed_indices = set()
    log = []
    seen_identities = {}

    for idx, row in df.iterrows():
        identities = [row['norm_name'], row['norm_profile']]
        is_duplicate = False
        for identity in identities:
            if identity == "": continue
            if identity in seen_identities:
                parent_idx = seen_identities[identity]
                removed_indices.add(idx)
                log.append(f"REMOVED: '{row['Name']}' (Row {idx+2}) | MATCHED: '{df.loc[parent_idx, 'Name']}' (Row {parent_idx+2}) via identifier '{identity}'")
                is_duplicate = True
                break
        
        if not is_duplicate:
            if row['norm_name'] != "": seen_identities[row['norm_name']] = idx
            if row['norm_profile'] != "": seen_identities[row['norm_profile']] = idx

    final_df = df.drop(index=list(removed_indices))
    
    report_lines = [
        "FINAL COMPREHENSIVE DUPLICATE REPORT",
        "========================================",
        f"Initial rows: {original_count}",
        f"Duplicates removed: {len(removed_indices)}",
        f"Final unique rows: {len(final_df)}",
        "",
        "Detailed Removal Log:",
        "--------------------"
    ] + log

    output_csv = "final_no_duplicates.csv"
    final_df.drop(columns=['norm_name', 'norm_profile', 'info_score']).to_csv(output_csv, index=False)
    
    with open("final_report.txt", "w") as f:
        f.write("\n".join(report_lines))

    # Print summary to console
    for line in report_lines[:10]:
        print(line)
    if len(log) > 10:
        print(f"... and {len(log)-10} more.")
    
    print(f"\n[Success] Cleaned file: {output_csv}")
    print(f"[Success] Full report: final_report.txt")

if __name__ == "__main__":
    path = "../../../../Downloads/afters_list__3rd_march__export_20260303 (2).csv"
    final_deep_check(path)
