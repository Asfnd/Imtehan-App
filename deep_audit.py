import os, re, csv

BASE_DIR = "Engineering_Master_Bank"
SPAM_REPORT = "SPAM_AND_ARTIFACT_REPORT.txt"

AI_MARKERS = [
    "as an ai", "ai language model", "certainly", "here are", 
    "json", "mcqs:", "questions:", "i hope this helps",
    "the correct answer is", "let me know"
]

def deep_audit():
    print("🔍 Starting Deep Audit...")
    total_mcqs = 0
    issues = []
    
    csv_paths = []
    for root, dirs, files in os.walk(BASE_DIR):
        for f in files:
            if f.endswith(".csv"):
                csv_paths.append(os.path.join(root, f))
    
    for path in csv_paths:
        with open(path, 'r', encoding='utf-8-sig') as f:
            reader = csv.DictReader(f)
            for i, row in enumerate(reader):
                total_mcqs += 1
                row_id = f"Line {i+2} in {path}"
                all_text = " ".join([str(v).lower() for v in row.values() if v])
                for marker in AI_MARKERS:
                    if marker in all_text:
                        issues.append(f"[AI MARKER] Found '{marker}' at {row_id}")
                
                # Repeated Chars
                for key, val in row.items():
                    if val and re.search(r'(.)\1{10,}', str(val)):
                        issues.append(f"[REPEATED CHARS] at {row_id}")

                # Date Glitch check
                months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                for key in ["Option_a", "Option_b", "Option_c", "Option_d"]:
                    val = str(row.get(key, ""))
                    if any(m in val for m in months) and ("-" in val or "/" in val):
                        if "Markovnikov" not in val and "priority" not in val:
                            issues.append(f"[DATE GLITCH] Potential date '{val}' at {row_id}")

    with open(SPAM_REPORT, 'w', encoding='utf-8') as f:
        f.write("SPAM AND ARTIFACT AUDIT REPORT\n")
        f.write(f"Total MCQs Scanned: {total_mcqs}\n")
        f.write(f"Total Quality Issues: {len(issues)}\n")
        f.write("-" * 50 + "\n")
        for iss in issues[:1000]:
            f.write(iss + "\n")

    print(f"✅ Deep Audit Complete. Issues found: {len(issues)}.")

if __name__ == "__main__":
    deep_audit()
