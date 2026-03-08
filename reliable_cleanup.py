import pandas as pd
import re
import os
from difflib import SequenceMatcher

def aggressive_normalize(name):
    if pd.isna(name): return ""
    name = str(name).lower()
    # Remove common stop words that don't help identify a unique business
    stop_words = [
        r'\bmedspa\b', r'\bmed\b', r'\bspa\b', r'\bmedical\b', r'\bclinic\b', 
        r'\bcenter\b', r'\bcentre\b', r'\binstitute\b', r'\bassociates\b', 
        r'\bgroup\b', r'\bphysicians\b', r'\bspecialists\b', r'\bskin\b', 
        r'\bdermatology\b', r'\baesthetics\b', r'\bthe\b', r'\band\b', r'\bof\b',
        r'\bllc\b', r'\binc\b', r'\bcorp\b', r'\bltd\b', r'\bco\b', r'\bpa\b', r'\bpc\b'
    ]
    name = re.sub(r'[^a-z0-9\s]', ' ', name)
    for word in stop_words:
        name = re.sub(word, ' ', name)
    return " ".join(name.split())

def reliable_name_cleanup(file_path):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    df = pd.read_csv(file_path)
    original_count = len(df)
    
    # 1. Prepare Data
    df['info_score'] = df.notna().sum(axis=1)
    df['norm_name'] = df['Name'].apply(aggressive_normalize)
    
    # Priority: Keep rows with more info
    df = df.sort_values(by='info_score', ascending=False)
    
    removed_indices = set()
    report_details = []

    # 2. Level 1: Aggressive Normalized Match (e.g., "Skin Clique" vs "The Skin Clique")
    groups = df[df['norm_name'] != ""].groupby('norm_name')
    for norm, group in groups:
        if len(group) > 1:
            best_idx = group.index[0]
            for idx in group.index[1:]:
                if idx not in removed_indices:
                    removed_indices.add(idx)
                    report_details.append({
                        "Type": "Normalized Match",
                        "Kept": df.loc[best_idx, 'Name'],
                        "Removed": df.loc[idx, 'Name'],
                        "Reason": f"Normalized names matched: '{norm}'"
                    })

    # 3. Level 2: Cross-Check Remaining with URL/Domain
    # (If names are slightly different but URL is the same, they are duplicates)
    remaining_df = df.drop(index=list(removed_indices))
    for col in ['URL', 'Domain']:
        if col in remaining_df.columns:
            groups = remaining_df[remaining_df[col].notna()].groupby(col)
            for val, group in groups:
                if len(group) > 1:
                    best_idx = group.index[0]
                    for idx in group.index[1:]:
                        if idx not in removed_indices:
                            removed_indices.add(idx)
                            report_details.append({
                                "Type": f"Shared {col}",
                                "Kept": df.loc[best_idx, 'Name'],
                                "Removed": df.loc[idx, 'Name'],
                                "Reason": f"Shared the same {col}: {val}"
                            })

    # 4. Final Data Assembly
    final_df = df.drop(index=list(removed_indices))
    
    # 5. Output Results
    print("="*60)
    print("RELIABLE DEEP-CHECK NAME REPORT")
    print("="*60)
    print(f"Starting Rows:    {original_count}")
    print(f"Final Unique Rows: {len(final_df)}")
    print(f"Total Duplicates Removed: {len(removed_indices)}")
    print("-" * 40)
    
    for item in report_details:
        print(f"[{item['Type']}]")
        print(f"  KEEP: {item['Kept']}")
        print(f"  REMOVE: {item['Removed']}")
        print(f"  WHY: {item['Reason']}\n")

    output_csv = "final_reliable_list.csv"
    final_df.drop(columns=['info_score', 'norm_name']).to_csv(output_csv, index=False)
    
    with open("reliable_report.txt", "w") as f:
        f.write("RELIABLE CLEANUP REPORT\n")
        f.write(f"Original: {original_count}, Final: {len(final_df)}, Removed: {len(removed_indices)}\n\n")
        for item in report_details:
            f.write(f"[{item['Type']}] Kept: {item['Kept']} | Removed: {item['Removed']} | Reason: {item['Reason']}\n")

if __name__ == "__main__":
    path = "../../../../Downloads/afters_list__3rd_march__export_20260303 (2).csv"
    reliable_name_cleanup(path)
