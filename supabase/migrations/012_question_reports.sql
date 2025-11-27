-- Create question_reports table to track reported questions
CREATE TABLE IF NOT EXISTS question_reports (
  id BIGSERIAL PRIMARY KEY,
  question_id INTEGER NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('css', 'mpt', 'islamic_history')),
  subject TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'fixed', 'dismissed')),
  admin_notes TEXT
);

-- Create index for faster queries
CREATE INDEX idx_question_reports_question ON question_reports(question_id, question_type);
CREATE INDEX idx_question_reports_status ON question_reports(status);
CREATE INDEX idx_question_reports_date ON question_reports(reported_at DESC);

-- Enable RLS
ALTER TABLE question_reports ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert a report (even anonymous users)
CREATE POLICY "Anyone can report questions"
  ON question_reports
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users can view their own reports
CREATE POLICY "Users can view own reports"
  ON question_reports
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Policy: Admins can view all reports (you can add admin role check later)
CREATE POLICY "Admins can view all reports"
  ON question_reports
  FOR SELECT
  USING (true);

-- Policy: Admins can update reports (you can add admin role check later)
CREATE POLICY "Admins can update reports"
  ON question_reports
  FOR UPDATE
  USING (true);

-- Add comment for documentation
COMMENT ON TABLE question_reports IS 'Stores user reports for problematic questions across all quiz types';
