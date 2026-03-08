import pandas as pd
import re
import os
from difflib import SequenceMatcher

def clean(text):
    if pd.isna(text): return ""
    return str(text).lower().strip()

def normalize(text):
    t = clean(text)
    t = re.sub(r'[^a-z0-9\s]', ' ', t)
    t = re.sub(r'\b(llc|inc|corp|ltd|co|pa|pc|pllc|incorporated|corporation)\b', ' ', t)
    return " ".join(t.split())

def get_brand_core(text):
    t = normalize(text)
    noise = r'\b(medical|spa|medspa|med|clinic|center|centre|institute|group|physicians|specialists|skin|dermatology|aesthetics|laser|wellness|and|the|of|at)\b'
    t = re.sub(noise, ' ', t)
    return " ".join(t.split())

def final_audit(file_path):
    df = pd.read_csv(file_path)
    df['row_num'] = range(2, len(df) + 2)
    
    df['key_norm'] = df['Name'].apply(normalize)
    df['key_brand'] = df['Name'].apply(get_brand_core)
    
    findings = []
    seen_indices = set()

    for col in ['URL', 'Domain']:
        groups = df[df[col].notna()].groupby(col)
        for val, group in groups:
            if len(group) > 1:
                findings.append({
                    "Confidence": "CERTAIN (Validated by " + col + ")",
                    "Rows": group['row_num'].tolist(),
                    "Names": group['Name'].tolist(),
                    "Reason": f"Shared unique {col}: {val}"
                })
                seen_indices.update(group.index)

    remaining_df = df[~df.index.isin(seen_indices)]
    brand_groups = remaining_df[remaining_df['key_brand'] != ""].groupby('key_brand')
    for brand, group in brand_groups:
        if len(group) > 1:
            findings.append({
                "Confidence": "HIGH (Brand Identity Match)",
                "Rows": group['row_num'].tolist(),
                "Names": group['Name'].tolist(),
                "Reason": f"Matched on brand core: '{brand}'"
            })
            seen_indices.update(group.index)

    remaining_df = df[~df.index.isin(seen_indices)].copy()
    names = remaining_df['Name'].tolist()
    rows = remaining_df['row_num'].tolist()
    for i in range(len(names)):
        for j in range(i + 1, len(names)):
            ratio = SequenceMatcher(None, normalize(names[i]), normalize(names[j])).ratio()
            if ratio > 0.88:
                findings.append({
                    "Confidence": "POTENTIAL (Fuzzy Name Match)",
                    "Rows": [rows[i], rows[j]],
                    "Names": [names[i], names[j]],
                    "Reason": f"Names are {int(ratio*100)}% similar"
                })

    print("\nFINAL DEFINITIVE DUPLICATE AUDIT")
    print("======================================================================")
    print(f"Total Rows Checked: {len(df)}")
    print(f"Duplicate Groups Found: {len(findings)}\n")
    
    for f in findings:
        print(f"[{f['Confidence']}]")
        print(f"  Rows:  {f['Rows']}")
        print(f"  Names: {f['Names']}")
        print(f"  Proof: {f['Reason']}\n")

if __name__ == "__main__":
    path = "../../../../Downloads/afters_list__3rd_march__export_20260303 (2).csv"
    final_audit(path)
