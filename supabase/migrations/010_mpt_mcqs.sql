-- Create MPT MCQs table for Management Professional Test practice
CREATE TABLE IF NOT EXISTS mpt_mcqs (
  id BIGSERIAL PRIMARY KEY,
  test_number INTEGER NOT NULL,
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for efficient querying by test number
CREATE INDEX IF NOT EXISTS idx_mpt_mcqs_test_number ON mpt_mcqs(test_number);

-- Create index for ordering by question number
CREATE INDEX IF NOT EXISTS idx_mpt_mcqs_question_number ON mpt_mcqs(test_number, question_number);

-- Enable Row Level Security
ALTER TABLE mpt_mcqs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to MPT MCQs"
  ON mpt_mcqs
  FOR SELECT
  TO public
  USING (true);

-- Create policy for authenticated insert (for admin uploads)
CREATE POLICY "Allow authenticated insert to MPT MCQs"
  ON mpt_mcqs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create function to get MPT test stats
CREATE OR REPLACE FUNCTION get_mpt_test_stats()
RETURNS TABLE (
  test_number INTEGER,
  question_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.test_number,
    COUNT(*) as question_count
  FROM mpt_mcqs m
  GROUP BY m.test_number
  ORDER BY m.test_number;
END;
$$ LANGUAGE plpgsql STABLE;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_mpt_test_stats() TO public;

COMMENT ON TABLE mpt_mcqs IS 'Management Professional Test (MPT) multiple choice questions';
COMMENT ON COLUMN mpt_mcqs.test_number IS 'Mock test number (1, 2, 3, etc.)';
COMMENT ON COLUMN mpt_mcqs.question_number IS 'Question number within the test';
COMMENT ON COLUMN mpt_mcqs.correct_answer IS 'Correct option: A, B, C, or D';
