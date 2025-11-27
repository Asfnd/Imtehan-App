-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id BIGSERIAL PRIMARY KEY,
  page TEXT NOT NULL,
  rating DECIMAL(2,1) CHECK (rating >= 0.5 AND rating <= 5),
  message TEXT NOT NULL,
  user_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_feedback_page ON feedback(page);
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX idx_feedback_rating ON feedback(rating);

-- Enable RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert feedback
CREATE POLICY "Anyone can submit feedback"
  ON feedback
  FOR INSERT
  WITH CHECK (true);

-- Policy: Anyone can view feedback (for admin dashboard)
CREATE POLICY "Anyone can view feedback"
  ON feedback
  FOR SELECT
  USING (true);

-- Add comment
COMMENT ON TABLE feedback IS 'Stores user feedback from different pages';
