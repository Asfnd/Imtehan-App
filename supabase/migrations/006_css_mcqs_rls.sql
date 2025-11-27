-- Enable RLS on css_mcqs table
ALTER TABLE css_mcqs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read CSS MCQs (they're public educational content)
CREATE POLICY "Anyone can read CSS MCQs"
ON css_mcqs
FOR SELECT
TO public
USING (true);

-- Only authenticated users can insert (for admin purposes)
CREATE POLICY "Authenticated users can insert CSS MCQs"
ON css_mcqs
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_css_mcqs_subject ON css_mcqs(subject);
CREATE INDEX IF NOT EXISTS idx_css_mcqs_year ON css_mcqs(year);
CREATE INDEX IF NOT EXISTS idx_css_mcqs_paper ON css_mcqs(paper);
CREATE INDEX IF NOT EXISTS idx_css_mcqs_type ON css_mcqs(mcq_type);
CREATE INDEX IF NOT EXISTS idx_css_mcqs_subject_year ON css_mcqs(subject, year);
CREATE INDEX IF NOT EXISTS idx_css_mcqs_type_subject ON css_mcqs(mcq_type, subject);
