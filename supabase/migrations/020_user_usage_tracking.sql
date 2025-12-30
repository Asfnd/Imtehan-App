-- User Usage Tracking Table
-- Stores free trial usage per user (cannot be bypassed by clearing browser)

CREATE TABLE IF NOT EXISTS user_usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Usage counters (same as localStorage structure)
  css_subject_quizzes INTEGER DEFAULT 0,
  css_idioms_quizzes INTEGER DEFAULT 0,
  css_idioms_random INTEGER DEFAULT 0,
  mpt_mock_tests INTEGER DEFAULT 0,
  mpt_past_papers INTEGER DEFAULT 0,
  official_past_papers INTEGER DEFAULT 0,
  solved_papers INTEGER DEFAULT 0,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Ensure one record per user
  CONSTRAINT unique_user_usage UNIQUE(user_id)
);

-- Add index for fast lookups
CREATE INDEX IF NOT EXISTS idx_user_usage_user_id ON user_usage_tracking(user_id);

-- RLS Policies
ALTER TABLE user_usage_tracking ENABLE ROW LEVEL SECURITY;

-- Users can read their own usage
CREATE POLICY "Users can read own usage"
  ON user_usage_tracking
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own usage (first time)
CREATE POLICY "Users can insert own usage"
  ON user_usage_tracking
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own usage
CREATE POLICY "Users can update own usage"
  ON user_usage_tracking
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_user_usage_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at
DROP TRIGGER IF EXISTS user_usage_updated_at ON user_usage_tracking;
CREATE TRIGGER user_usage_updated_at
  BEFORE UPDATE ON user_usage_tracking
  FOR EACH ROW
  EXECUTE FUNCTION update_user_usage_updated_at();

-- Function to get or create user usage
CREATE OR REPLACE FUNCTION get_or_create_user_usage(p_user_id UUID)
RETURNS user_usage_tracking AS $$
DECLARE
  v_usage user_usage_tracking;
BEGIN
  -- Try to get existing usage
  SELECT * INTO v_usage
  FROM user_usage_tracking
  WHERE user_id = p_user_id;

  -- If not found, create new record
  IF NOT FOUND THEN
    INSERT INTO user_usage_tracking (user_id)
    VALUES (p_user_id)
    RETURNING * INTO v_usage;
  END IF;

  RETURN v_usage;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_or_create_user_usage(UUID) TO authenticated;

COMMENT ON TABLE user_usage_tracking IS 'Tracks free trial usage per user - persists across devices and browsers';
COMMENT ON COLUMN user_usage_tracking.user_id IS 'References auth.users - ensures limits cannot be bypassed';
COMMENT ON COLUMN user_usage_tracking.css_subject_quizzes IS 'Number of CSS subject quizzes taken';
COMMENT ON COLUMN user_usage_tracking.css_idioms_quizzes IS 'Number of CSS idioms quizzes taken';
