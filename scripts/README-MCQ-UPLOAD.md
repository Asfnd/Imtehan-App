# MCQ Upload Guide

This guide explains how to upload new MCQs from the `extracted_mcqs_ultra_clean` folder to your Supabase database.

## Overview

The upload process will:
- ✅ Read all CSV files from subject folders
- ✅ Handle paper types (Paper 1, Paper 2)
- ✅ Check for duplicates before uploading
- ✅ Convert subject names to kebab-case for database consistency
- ✅ Preserve year and paper type information

## Subjects to be Uploaded

From `/Users/asfandiyarsafi/Downloads/CSS/extracted_mcqs_ultra_clean`:

1. **Gender Studies**
2. **History of USA**
3. **International Law**
4. **International Relations** (many papers from 1991-2025)
5. **Political Science**
6. **Public Administration**
7. **Sociology**

## Step-by-Step Process

### Step 1: Setup Database Schema

First, add the `paper_type` column to the `css_mcqs` table.

**Go to Supabase SQL Editor:**
https://supabase.com/dashboard/project/qsrkkvrrxorbgvbgekew/sql/new

**Run this SQL:**

\`\`\`sql
-- Add paper_type column
ALTER TABLE css_mcqs
ADD COLUMN IF NOT EXISTS paper_type TEXT DEFAULT NULL;

-- Add comment
COMMENT ON COLUMN css_mcqs.paper_type IS 'Paper type (e.g., "Paper 1", "Paper 2")';

-- Drop old unique constraint if exists
ALTER TABLE css_mcqs DROP CONSTRAINT IF EXISTS css_mcqs_unique_question;

-- Add new unique constraint including paper_type
ALTER TABLE css_mcqs
ADD CONSTRAINT css_mcqs_unique_question
UNIQUE (subject, year, paper_type, question_text);

-- Create index
CREATE INDEX IF NOT EXISTS idx_css_mcqs_subject_year_paper
ON css_mcqs(subject, year, paper_type);
\`\`\`

### Step 2: Verify Setup

Run the setup script to verify the column was added:

\`\`\`bash
npm run setup-paper-type
\`\`\`

You should see:
- ✅ paper_type column exists!
- Sample data showing the column

### Step 3: Upload MCQs

Now upload all the MCQs:

\`\`\`bash
npm run upload-mcqs
\`\`\`

This will:
1. Process each subject folder
2. Read all CSV files (handling different year formats)
3. Parse paper types from filenames (e.g., `2025_Paper(1).csv` → Paper 1)
4. Check for duplicates
5. Upload only new MCQs in batches of 100
6. Show progress and statistics

## Expected Output

\`\`\`
🚀 Starting MCQ Upload Process
================================

Found 7 subjects:
  - Gender_Studies
  - History_of_USA
  - International_Law
  - International_Relations_Paper
  - Political Science
  - Public_Administration
  - Sociology

📚 Processing subject: international-relations (International_Relations_Paper)
   Found 39 CSV files

   📄 Processing: 2025_Paper(1).csv (2025 - Paper 1)
      Found 25 MCQs
      ✅ Uploaded batch: 25 MCQs
      ✅ Completed: 2025 - Paper 1

   📄 Processing: 2025_Paper(2).csv (2025 - Paper 2)
      Found 23 MCQs
      ⏭️  Skipped 5 duplicate MCQs
      ✅ Uploaded batch: 18 MCQs
      ✅ Completed: 2025 - Paper 2

   ...

   📊 Subject Summary for international-relations:
      ✅ Total uploaded: 650
      ⏭️  Total skipped: 25

...

🎉 Upload Complete!
\`\`\`

## Filename Formats Supported

The script handles these filename formats:

1. **Simple year:** `2015.csv` → year: 2015, paper_type: null
2. **With paper type:** `2025_Paper(1).csv` → year: 2025, paper_type: "Paper 1"
3. **With paper type:** `2025_Paper(2).csv` → year: 2025, paper_type: "Paper 2"

## Subject Name Conversion

Folder names are converted to kebab-case for database:

- `International_Relations_Paper` → `international-relations`
- `History_of_USA` → `history-of-usa`
- `Political Science` → `political-science`
- `Gender_Studies` → `gender-studies`

## Duplicate Handling

The script checks for duplicates using:
- Subject name
- Year
- Paper type
- Question text (case-insensitive)

If a duplicate is found, it's skipped and counted in the "skipped" statistics.

## Troubleshooting

### Issue: "paper_type column does not exist"

**Solution:** Run Step 1 again in Supabase SQL Editor

### Issue: Upload fails with "unique constraint violation"

**Solution:** This means the same question already exists. The script should handle this automatically by checking for duplicates first. If it persists, there may be a slight variation in the question text.

### Issue: CSV parsing error

**Solution:** Check the CSV format. Expected columns:
- question
- option_a
- option_b
- option_c
- option_d
- correct_answer

## Verification After Upload

Check your database:

\`\`\`sql
-- Count total MCQs
SELECT COUNT(*) FROM css_mcqs;

-- Count by subject
SELECT subject, COUNT(*) as count
FROM css_mcqs
GROUP BY subject
ORDER BY count DESC;

-- Count by subject and year with paper types
SELECT subject, year, paper_type, COUNT(*) as count
FROM css_mcqs
GROUP BY subject, year, paper_type
ORDER BY subject, year, paper_type;

-- Check papers with multiple types
SELECT subject, year, COUNT(DISTINCT paper_type) as paper_count
FROM css_mcqs
WHERE paper_type IS NOT NULL
GROUP BY subject, year
HAVING COUNT(DISTINCT paper_type) > 1
ORDER BY year DESC;
\`\`\`

## Notes

- The upload process is **idempotent** - you can run it multiple times safely
- Duplicates are automatically skipped
- Progress is shown in real-time
- Each batch uploads max 100 MCQs at a time to avoid timeouts
- All timestamps are recorded automatically

---

**Total Expected MCQs:** ~2000-3000 new MCQs across 7 subjects
