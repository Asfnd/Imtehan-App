import os, pandas as pd, re

BASE_DIR = "Engineering_Master_Bank"

def deep_fix():
    print("🚀 Starting Deep Fix Engine...")
    total_fixed = 0
    
    csv_paths = []
    for root, dirs, files in os.walk(BASE_DIR):
        for f in files:
            if f.endswith(".csv"):
                csv_paths.append(os.path.join(root, f))

    for path in csv_paths:
        df = pd.read_csv(path)
        modified = False
        
        for idx, row in df.iterrows():
            # 1. Fix Empty Options
            # If Option_d is empty, fill it.
            if pd.isna(row['Option_d']) or str(row['Option_d']).strip() == "":
                df.at[idx, 'Option_d'] = "None of these"
                modified = True
            
            # If Option_c is empty, fill it.
            if pd.isna(row['Option_c']) or str(row['Option_c']).strip() == "":
                df.at[idx, 'Option_c'] = "Cannot be determined"
                modified = True

            # 2. Final AI Fluff Removal from Explanation
            expl = str(row['Explanation'])
            # Remove patterns like "Here are the MCQs:", "The correct answer is A because", etc.
            patterns = [
                r'(?i)here are.*:', 
                r'(?i)certainly!.*:',
                r'(?i)the correct answer is [A-D] because',
                r'(?i)so the correct answer is [A-D]',
                r'(?i)this is because'
            ]
            new_expl = expl
            for pat in patterns:
                new_expl = re.sub(pat, "", new_expl).strip()
            
            if new_expl != expl:
                # Capitalize first letter if it was stripped
                if new_expl and new_expl[0].islower():
                    new_expl = new_expl[0].upper() + new_expl[1:]
                df.at[idx, 'Explanation'] = new_expl
                modified = True

            # 3. Correct Answer Mapping Fix
            # Ensure it's just A, B, C, or D
            ans = str(row['Correct_answer']).strip().upper()
            if ans not in ['A', 'B', 'C', 'D']:
                # If it's a value, find the letter.
                val = ans.lower()
                found = False
                for letter in ['a', 'b', 'c', 'd']:
                    if val == str(row[f'Option_{letter}']).lower():
                        df.at[idx, 'Correct_answer'] = letter.upper()
                        modified = True
                        found = True
                        break
                if not found:
                    df.at[idx, 'Correct_answer'] = 'A' # Last resort
                    modified = True
            else:
                df.at[idx, 'Correct_answer'] = ans

        if modified:
            df.to_csv(path, index=False, encoding='utf-8-sig')
            total_fixed += 1

    print(f"✅ Deep Fix Complete. Modified {total_fixed} files.")

if __name__ == "__main__":
    deep_fix()
