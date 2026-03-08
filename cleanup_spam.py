import os, csv, pandas as pd, re

SPAM_REPORT = "SPAM_AND_ARTIFACT_REPORT.txt"

AI_MARKERS = [
    "as an ai", "ai language model", "certainly", "here are some", 
    "here are 20", "here are 10", "json", "mcqs:", "questions:", 
    "i hope this helps", "the correct answer is", "let me know"
]

def cleanup():
    print("🧹 Starting final cleanup...")
    targets = set()
    with open(SPAM_REPORT, 'r') as f:
        for line in f:
            if "in Engineering_Master_Bank" in line:
                path = "Engineering_Master_Bank" + line.split("Engineering_Master_Bank")[1].strip()
                targets.add(path)

    for path in targets:
        if not os.path.exists(path): continue
        df = pd.read_csv(path)
        
        for idx, row in df.iterrows():
            # 1. Clean Explanation from AI leakage
            expl = str(row['Explanation'])
            low_expl = expl.lower()
            if any(marker in low_expl for marker in AI_MARKERS):
                # Aggressive strip: if it contains "here are" or "mcqs:", usually it's in the intro
                # We'll split by the first period or colon and take the rest
                if ":" in expl:
                    expl = expl.split(":", 1)[1].strip()
                elif ". " in expl:
                    # If it starts with "Certainly! Here are... [Sentence 1]. [Sentence 2]"
                    # We want Sentence 2.
                    parts = expl.split(". ", 1)
                    if len(parts) > 1: expl = parts[1].strip()
            
            # Remove leftovers like "Here are some more..."
            expl = re.sub(r'(?i)here are.*(mcqs|questions|high-yield)', '', expl).strip()
            df.at[idx, 'Explanation'] = expl

            # 2. Fix persistent Date Glitches in Options
            months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            for opt in ['Option_a', 'Option_b', 'Option_c', 'Option_d']:
                val = str(row[opt])
                if any(m in val for m in months) and ("-" in val or "/" in val):
                    if "Markovnikov" not in val and "priority" not in val:
                        # If it's a date-glitch, replace with a generic placeholder or attempt fix
                        df.at[idx, opt] = val.replace("-", " / ")

        df.to_csv(path, index=False, encoding='utf-8-sig')
    print("✅ Cleanup complete.")

if __name__ == "__main__":
    cleanup()
