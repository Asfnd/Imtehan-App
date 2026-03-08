import os, re

BASE_DIR = "Engineering_Master_Bank"
REPORT_FILE = "SPAM_AND_ARTIFACT_REPORT.txt"

# Targeted deletion of the most common intro patterns
PATTERNS = [
    r'(?i)certainly! here are \d+ high-yield mcqs for.*:',
    r'(?i)here are \d+ high-yield mcqs for.*:',
    r'(?i)here are \d+ mcqs for.*:',
    r'(?i)certainly! here are the mcqs for.*:',
    r'(?i)here are the mcqs for.*:',
    r'(?i)sure! here are \d+ high-yield mcqs for.*:',
    r'(?i)sure! here are the mcqs for.*:',
    r'(?i)as an ai.*model,.*:',
]

def nuclear_cleanup():
    print("☢️ Starting nuclear cleanup...")
    
    # Get files from report
    targets = set()
    with open(REPORT_FILE, 'r') as f:
        for line in f:
            if "in Engineering_Master_Bank" in line:
                path = "Engineering_Master_Bank" + line.split("Engineering_Master_Bank")[1].strip()
                targets.add(path)

    for path in targets:
        if not os.path.exists(path): continue
        print(f"  Cleaning: {path}")
        with open(path, 'r', encoding='utf-8-sig') as f:
            content = f.read()
            
        for pat in PATTERNS:
            content = re.sub(pat, "", content)
        
        with open(path, 'w', encoding='utf-8-sig') as f:
            f.write(content)
            
    print("✅ Nuclear cleanup finished.")

if __name__ == "__main__":
    nuclear_cleanup()
