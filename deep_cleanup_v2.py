import pandas as pd
import re
import os

def normalize_name(name):
    if pd.isna(name) or str(name).strip() == "": return ""
    name = str(name).lower()
    name = re.sub(r'[^\w\s]', '', name)
    name = re.sub(r'\b(inc|llc|corp|ltd|co|corporation|incorporated)\b', '', name)
    return " ".join(name.split())

def smart_cleanup(file_path):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    df = pd.read_csv(file_path)
    original_count = len(df)
    
    # Priority: Keep rows with the most data
    df['info_score'] = df.notna().sum(axis=1)
    df = df.sort_values(by='info_score', ascending=False)

    # Dictionary to keep track of removals for the report
    reasons = {
        "LinkedIn URL Match": 0,
        "Domain/Website Match": 0,
        "Name + Location Match": 0
    }
    
    removed_indices = set()
    
    # 1. Matching URLs (LinkedIn URLs are unique identifiers)
    url_groups = df[df['URL'].notna()].groupby('URL')
    for url, group in url_groups:
        if len(group) > 1:
            indices = list(group.index[1:])
            removed_indices.update(indices)
            reasons["LinkedIn URL Match"] += len(indices)

    # 2. Matching Domains (Websites)
    remaining_df = df.drop(index=list(removed_indices))
    domain_groups = remaining_df[remaining_df['Domain'].notna()].groupby('Domain')
    for domain, group in domain_groups:
        if len(group) > 1:
            indices = list(group.index[1:])
            removed_indices.update(indices)
            reasons["Domain/Website Match"] += len(indices)

    # 3. Normalized Name + Location Match (Very safe)
    remaining_df = df.drop(index=list(removed_indices))
    remaining_df['norm_name'] = remaining_df['Name'].apply(normalize_name)
    remaining_df['location_lower'] = remaining_df['Location'].astype(str).str.lower().str.strip()
    
    name_loc_groups = remaining_df[remaining_df['norm_name'] != ""].groupby(['norm_name', 'location_lower'])
    for keys, group in name_loc_groups:
        if len(group) > 1:
            indices = list(group.index[1:])
            removed_indices.update(indices)
            reasons["Name + Location Match"] += len(indices)

    final_df = df.drop(index=list(removed_indices))

    # Prepare Detailed Report
    report = []
    report.append("="*60)
    report.append("DETAILED DUPLICATE FILTERING REPORT")
    report.append("="*60)
    report.append(f"Starting Rows:    {original_count}")
    report.append(f"Duplicate Rows Removed: {len(removed_indices)}")
    report.append(f"Cleaned Rows Remaining: {len(final_df)}")
    report.append("\nREMOVAL BREAKDOWN:")
    for reason, count in reasons.items():
        report.append(f"- {reason}: {count}")

    report.append("\n" + "-"*40)
    report.append("FILTERING LOGIC USED:")
    report.append("-"*40)
    report.append("1. IDENTICAL LINKEDIN URLs: Rows sharing the same LinkedIn profile were merged.")
    report.append("2. IDENTICAL DOMAINS: Rows sharing the same website domain were merged.")
    report.append("3. NAME + LOCATION MATCH: Rows with nearly identical names in the same city.")
    report.append("4. DATA QUALITY: For every duplicate found, the row with the most filled columns was kept.")
    report.append("5. EMPTY FIELDS IGNORED: Missing URLs or domains were NOT treated as duplicates.")

    # Save outputs
    output_csv = "deep_cleaned_list.csv"
    final_df.drop(columns=['info_score']).to_csv(output_csv, index=False)
    
    with open("detailed_cleanup_report.txt", "w") as f:
        f.write("\n".join(report))

    print("\n".join(report))
    print(f"\n[Success] Deep cleaned file: {output_csv}")

if __name__ == "__main__":
    path = "../../../../Downloads/afters_list__3rd_march__export_20260303 (2).csv"
    smart_cleanup(path)
