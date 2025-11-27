-- Migration: CSS General Science & Ability MCQs
-- Create table for CSS GSA past paper MCQs

-- Create css_gsa_mcqs table
CREATE TABLE IF NOT EXISTS css_gsa_mcqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT,
  option_d TEXT,
  correct_answer VARCHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('multiple_choice', 'true_false')),
  year VARCHAR(4) NOT NULL,
  page_number INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_css_gsa_year ON css_gsa_mcqs(year);
CREATE INDEX IF NOT EXISTS idx_css_gsa_type ON css_gsa_mcqs(question_type);
CREATE INDEX IF NOT EXISTS idx_css_gsa_year_type ON css_gsa_mcqs(year, question_type);

-- Enable Row Level Security
ALTER TABLE css_gsa_mcqs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read CSS GSA MCQs
CREATE POLICY "Anyone can read CSS GSA MCQs"
  ON css_gsa_mcqs
  FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert (for admin uploads)
CREATE POLICY "Authenticated users can insert CSS GSA MCQs"
  ON css_gsa_mcqs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_css_gsa_mcqs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_css_gsa_mcqs_timestamp
  BEFORE UPDATE ON css_gsa_mcqs
  FOR EACH ROW
  EXECUTE FUNCTION update_css_gsa_mcqs_updated_at();

-- Create view for year statistics
CREATE OR REPLACE VIEW css_gsa_year_stats AS
SELECT 
  year,
  COUNT(*) as total_questions,
  COUNT(CASE WHEN question_type = 'multiple_choice' THEN 1 END) as mcq_count,
  COUNT(CASE WHEN question_type = 'true_false' THEN 1 END) as true_false_count
FROM css_gsa_mcqs
GROUP BY year
ORDER BY year DESC;

-- Grant access to view
GRANT SELECT ON css_gsa_year_stats TO anon, authenticated;

-- Add comment
COMMENT ON TABLE css_gsa_mcqs IS 'CSS General Science and Ability Past Paper MCQs (1973-2025)';
