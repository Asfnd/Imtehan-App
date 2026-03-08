import os, re, csv

BASE_DIR = "Engineering_Master_Bank"
REPORT_FILE = "MASTER_AUDIT_REPORT.txt"

def audit():
    total_files = 0
    total_mcqs = 0
    errors = []
    
    csv_paths = []
    for root, dirs, files in os.walk(BASE_DIR):
        for f in files:
            if f.endswith(".csv"):
                csv_paths.append(os.path.join(root, f))
    
    for path in csv_paths:
        total_files += 1
        with open(path, 'r', encoding='utf-8-sig') as f:
            reader = csv.DictReader(f)
            for i, row in enumerate(reader):
                total_mcqs += 1
                row_id = f"Line {i+2} in {path}"
                
                # Check 1: Empty Fields
                for key, val in row.items():
                    if not val or str(val).strip() == "":
                        errors.append(f"[EMPTY FIELD] {key} is missing at {row_id}")

                # Check 2: Correct Answer
                ans = str(row.get("Correct_answer", "")).strip().upper()
                if ans not in ["A", "B", "C", "D"]:
                    errors.append(f"[INVALID ANSWER] '{ans}' at {row_id}")

                # Check 3: Date Glitch
                # Note: We look for strings that Excel would turn into dates (like "1 / 4" or "Apr-04")
                # But since we prepended a space, the auditor should look for that space too.
                # Common patterns: "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                for key in ["Option_a", "Option_b", "Option_c", "Option_d"]:
                    val = str(row.get(key, ""))
                    if any(m in val for m in months) and "-" in val:
                        errors.append(f"[DATE GLITCH] '{val}' at {row_id}")

                # Check 4: LaTeX Remnants
                q_text = str(row.get("Question", ""))
                if "$" in q_text or "\\frac" in q_text or "\\sqrt" in q_text:
                    errors.append(f"[LATEX DETECTED] at {row_id}")

                # Check 5: Duplicate Options
                opts = [str(row.get(f"Option_{x}", "")).strip().lower() for x in ['a','b','c','d']]
                if len(set(opts)) < 4:
                    errors.append(f"[DUPLICATE OPTIONS] at {row_id}")

    with open(REPORT_FILE, 'w', encoding='utf-8') as f:
        f.write("ENGINEERING MASTER BANK AUDIT REPORT\n")
        f.write(f"Total CSV Files Scanned: {total_files}\n")
        f.write(f"Total MCQs Scanned: {total_mcqs}\n")
        f.write(f"Total Issues Flagged: {len(errors)}\n")
        f.write("-" * 50 + "\n")
        for err in errors[:1000]:
            f.write(err + "\n")
        if len(errors) > 1000:
            f.write("\n... and more issues.\n")

    print(f"✅ Audit Complete. Scanned {total_mcqs} MCQs. {len(errors)} issues found.")

if __name__ == "__main__":
    audit()
