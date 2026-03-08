import os, re, csv, pandas as pd

BASE_DIR = "Engineering_Master_Bank"
LOG_FILE = "FINAL_SUPER_AUDIT_LOG.txt"

# Comprehensive AI Marker list
AI_ARTIFACTS = [
    "certainly", "as an ai", "i hope this", "here are", "here's", 
    "sure!", "let me know", "questions:", "mcqs:", "json", 
    "the correct answer is", "explanation:", "step-by-step"
]

def super_audit():
    print("🔬 Initializing Super Audit of all 24,476 rows...")
    errors = []
    total_rows = 0
    
    csv_paths = []
    for root, dirs, files in os.walk(BASE_DIR):
        for f in files:
            if f.endswith(".csv"):
                csv_paths.append(os.path.join(root, f))

    for path in csv_paths:
        try:
            df = pd.read_csv(path)
        except Exception as e:
            errors.append(f"[FILE CRASH] Could not read {path}: {e}")
            continue

        for idx, row in df.iterrows():
            total_rows += 1
            line_id = f"{path} | Row {idx+2}"
            
            # 1. Missing Column Check
            expected_cols = ["Question", "Option_a", "Option_b", "Option_c", "Option_d", "Correct_answer", "Explanation"]
            for col in expected_cols:
                if col not in row or pd.isna(row[col]) or str(row[col]).strip() == "":
                    errors.append(f"[MISSING DATA] Column '{col}' is empty at {line_id}")

            # 2. Answer Key Validity
            ans = str(row.get("Correct_answer", "")).strip().upper()
            if ans not in ["A", "B", "C", "D"]:
                errors.append(f"[INVALID ANS KEY] '{ans}' at {line_id}")

            # 3. Duplicate Options Check
            opts = [str(row.get(f"Option_{x}", "")).strip().lower() for x in ['a','b','c','d']]
            if len(set(opts)) < 4:
                errors.append(f"[DUPLICATE OPTIONS] {opts} at {line_id}")

            # 4. LaTeX Detection
            q_text = str(row.get("Question", ""))
            if "$" in q_text or "" in q_text or "{" in q_text:
                errors.append(f"[LATEX REMNANT] in Question at {line_id}")

            # 5. AI Artifact Detection (Explanation)
            expl = str(row.get("Explanation", "")).lower()
            for artifact in AI_ARTIFACTS:
                if artifact in expl:
                    # Check if it's a false positive (some words like 'certainly' might be rare but valid)
                    if artifact in ["certainly", "as an ai", "here are", "json"]:
                        errors.append(f"[AI ARTIFACT] Found '{artifact}' in explanation at {line_id}")

            # 6. Question Quality (Too short)
            if len(q_text.split()) < 5:
                errors.append(f"[TRUNCATED QUESTION] at {line_id}")

            # 7. Excel Date Glitch (Fractions check)
            for opt_key in ["Option_a", "Option_b", "Option_c", "Option_d"]:
                opt_val = str(row.get(opt_key, ""))
                if "/" in opt_val and not opt_val.startswith(" "):
                    # Check if it's a numeric fraction like "3/4"
                    if re.search(r'\d/\d', opt_val):
                        errors.append(f"[DATE DANGER] Fraction '{opt_val}' missing leading space at {line_id}")

    # Write detailed log
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        f.write("FINAL SUPER AUDIT REPORT\n")
        f.write(f"Total MCQs Scanned: {total_rows}\n")
        f.write(f"Total Errors Found: {len(errors)}\n")
        f.write("-" * 60 + "\n")
        for err in errors:
            f.write(err + "\n")

    print(f"✅ Super Audit Complete. Found {len(errors)} potential issues.")
    print(f"Detailed log saved to: {LOG_FILE}")

if __name__ == "__main__":
    super_audit()
