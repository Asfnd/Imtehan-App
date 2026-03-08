import os, re, pandas as pd

BASE_DIR = "Engineering_Master_Bank"

def surgical_wipe():
    print("🧹 Starting Final Surgical Wipe...")
    csv_paths = []
    for root, dirs, files in os.walk(BASE_DIR):
        for f in files:
            if f.endswith(".csv"):
                csv_paths.append(os.path.join(root, f))

    for path in csv_paths:
        df = pd.read_csv(path)
        modified = False
        for idx, row in df.iterrows():
            # 1. Explanation Cleaning
            expl = str(row['Explanation'])
            clean_expl = re.sub(r'(?i)^(certainly|sure|here are|questions:|mcqs:).*?[:\.]', '', expl).strip()
            if len(clean_expl.split()) < 5: clean_expl = expl
            phrases = ["as an ai language model", "the correct answer is", "i hope this helps"]
            for p in phrases: clean_expl = re.sub(r'(?i)' + p + r'[,]?\s*', '', clean_expl).strip()
            if clean_expl != expl:
                df.at[idx, 'Explanation'] = clean_expl
                modified = True

            # 2. LaTeX & Symbols
            for col in ['Question', 'Option_a', 'Option_b', 'Option_c', 'Option_d', 'Explanation']:
                val = str(row[col])
                if "$" in val:
                    val = val.replace("$", "")
                    modified = True
                if "\\" in val and any(cmd in val for cmd in ["frac", "sqrt", "int", "pi", "alpha"]):
                    val = val.replace("\\frac", "/").replace("\\sqrt", "√").replace("\\int", "∫").replace("\\pi", "π")
                    val = val.replace("{", "(").replace("}", ")").replace("\\", "")
                    modified = True
                df.at[idx, col] = val

            # 3. Fraction Date Fix
            for col in ['Option_a', 'Option_b', 'Option_c', 'Option_d']:
                val = str(df.at[idx, col]).strip()
                if re.search(r'^\d+\s*/\s*\d+$', val) and not str(df.at[idx, col]).startswith(" "):
                    df.at[idx, col] = " " + val
                    modified = True

        if modified:
            df.to_csv(path, index=False, encoding='utf-8-sig')
    print("✅ Wipe Complete.")

if __name__ == "__main__":
    surgical_wipe()
