-- Create enhanced CSS MCQs table with detailed explanations and learning features
CREATE TABLE IF NOT EXISTS css_mcqs_enhanced (
  id BIGSERIAL PRIMARY KEY,
  subject TEXT NOT NULL,
  year INTEGER,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  
  -- Learning enhancement fields
  topic TEXT,
  difficulty TEXT,
  tags TEXT,
  
  -- Explanations for each option
  explanation_a TEXT,
  explanation_b TEXT,
  explanation_c TEXT,
  explanation_d TEXT,
  explanation_detailed TEXT,
  
  -- Progressive hints
  hint_1 TEXT,
  hint_2 TEXT,
  hint_3 TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_css_mcqs_enhanced_subject ON css_mcqs_enhanced(subject);
CREATE INDEX IF NOT EXISTS idx_css_mcqs_enhanced_year ON css_mcqs_enhanced(year);
CREATE INDEX IF NOT EXISTS idx_css_mcqs_enhanced_difficulty ON css_mcqs_enhanced(difficulty);
CREATE INDEX IF NOT EXISTS idx_css_mcqs_enhanced_topic ON css_mcqs_enhanced(topic);

-- Enable Row Level Security
ALTER TABLE css_mcqs_enhanced ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to enhanced CSS MCQs"
  ON css_mcqs_enhanced
  FOR SELECT
  TO public
  USING (true);

-- Create policy for authenticated insert (for admin uploads)
CREATE POLICY "Allow authenticated insert to enhanced CSS MCQs"
  ON css_mcqs_enhanced
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create function to get subject stats
CREATE OR REPLACE FUNCTION get_enhanced_css_subject_stats()
RETURNS TABLE (
  subject TEXT,
  question_count BIGINT,
  years INTEGER[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.subject,
    COUNT(*) as question_count,
    ARRAY_AGG(DISTINCT m.year ORDER BY m.year DESC) FILTER (WHERE m.year IS NOT NULL AND m.year >= 2007) as years
  FROM css_mcqs_enhanced m
  WHERE m.year >= 2007
    AND m.year IS NOT NULL
    AND LOWER(m.subject) NOT LIKE '%mpt%'
    AND LOWER(m.subject) NOT LIKE '%management%'
  GROUP BY m.subject
  ORDER BY m.subject;
END;
$$ LANGUAGE plpgsql STABLE;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_enhanced_css_subject_stats() TO public;

COMMENT ON TABLE css_mcqs_enhanced IS 'Enhanced CSS MCQs with detailed explanations, hints, topics, and difficulty levels';
COMMENT ON COLUMN css_mcqs_enhanced.explanation_detailed IS 'Comprehensive explanation with bullet points and exam tips';
COMMENT ON COLUMN css_mcqs_enhanced.hint_1 IS 'First hint for progressive learning';
COMMENT ON COLUMN css_mcqs_enhanced.hint_2 IS 'Second hint for progressive learning';
COMMENT ON COLUMN css_mcqs_enhanced.hint_3 IS 'Third hint for progressive learning';
