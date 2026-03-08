import pandas as pd
import re
import os
from difflib import SequenceMatcher

def clean_text(text):
    if pd.isna(text): return ""
    text = str(text).lower()
    text = re.sub(r'[^a-z0-9\s]', ' ', text)
    return " ".join(text.split())

def get_core_identity(text):
    cleaned = clean_text(text)
    legal = r'\b(llc|inc|corp|ltd|co|pa|pc|incorporated|corporation)\b'
    industry = r'\b(medical|spa|medspa|med|clinic|center|centre|institute|group|physicians|specialists|skin|dermatology|aesthetics|laser)\b'
    grammar = r'\b(the|and|of|at)\b'
    core = re.sub(legal, ' ', cleaned)
    core = re.sub(industry, ' ', core)
    core = re.sub(grammar, ' ', core)
    return " ".join(core.split())

def check_everything(file_path):
    df = pd.read_csv(file_path)
    df['row_num'] = range(2, len(df) + 2)
    df['key_exact'] = df['Name'].apply(clean_text)
    df['key_core'] = df['Name'].apply(get_core_identity)
    
    matches = []
    processed_indices = set()

    exact_groups = df[df['key_exact'] != ""].groupby('key_exact')
    for key, group in exact_groups:
        if len(group) > 1:
            matches.append({
                "Level": "CRITICAL: Exact Match",
                "Names": group['Name'].tolist(),
                "Rows": group['row_num'].tolist(),
                "Note": "Identical names"
            })
            processed_indices.update(group.index)

    remaining_df = df[~df.index.isin(processed_indices)]
    core_groups = remaining_df[remaining_df['key_core'] != ""].groupby('key_core')
    for key, group in core_groups:
        if len(group) > 1:
            matches.append({
                "Level": "HIGH: Potential Brand Duplicate",
                "Names": group['Name'].tolist(),
                "Rows": group['row_num'].tolist(),
                "Note": f"Shared brand: '{key}'"
            })
            processed_indices.update(group.index)

    final_remaining = df[~df.index.isin(processed_indices)].copy()
    names_list = final_remaining['Name'].tolist()
    rows_list = final_remaining['row_num'].tolist()
    
    for i in range(len(names_list)):
        for j in range(i + 1, len(names_list)):
            ratio = SequenceMatcher(None, clean_text(names_list[i]), clean_text(names_list[j])).ratio()
            if ratio > 0.90:
                matches.append({
                    "Level": "MEDIUM: Fuzzy Match",
                    "Names": [names_list[i], names_list[j]],
                    "Rows": [rows_list[i], rows_list[j]],
                    "Note": f"Similarity: {int(ratio*100)}%"
                })

    print("\nPERFECT AUDIT: DUPLICATE DETECTION REPORT")
    print("============================================================")
    print(f"Total Rows Analyzed: {len(df)}")
    print(f"Duplicate Groups Found: {len(matches)}\n")

    for m in matches:
        print(f"[{m['Level']}]")
        print(f"  Rows:  {m['Rows']}")
        print(f"  Names: {m['Names']}")
        print(f"  Info:  {m['Note']}\n")

if __name__ == "__main__":
    path = "../../../../Downloads/afters_list__3rd_march__export_20260303 (2).csv"
    check_everything(path)
