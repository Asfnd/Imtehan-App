-- Create quiz_attempts table to track user performance
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_slug TEXT NOT NULL,
  subject_slug TEXT NOT NULL,
  mode TEXT NOT NULL,
  set_number INTEGER NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_taken INTEGER, -- in seconds
  answers JSONB, -- Store detailed answer data
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_exam_slug ON quiz_attempts(exam_slug);
CREATE INDEX idx_quiz_attempts_subject_slug ON quiz_attempts(subject_slug);
CREATE INDEX idx_quiz_attempts_created_at ON quiz_attempts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own attempts
CREATE POLICY "Users can view own quiz attempts"
  ON quiz_attempts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own attempts
CREATE POLICY "Users can insert own quiz attempts"
  ON quiz_attempts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add comments
COMMENT ON TABLE quiz_attempts IS 'Stores quiz attempt history for analytics and progress tracking';
COMMENT ON COLUMN quiz_attempts.answers IS 'JSON array storing detailed answer data for each question';
