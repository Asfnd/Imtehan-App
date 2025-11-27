-- Login attempt tracking for security monitoring
CREATE TABLE IF NOT EXISTS login_attempts (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT,
  ip_address INET NOT NULL,
  user_agent TEXT,
  success BOOLEAN NOT NULL,
  failure_reason TEXT,
  location JSONB,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for fast queries
CREATE INDEX idx_login_attempts_ip ON login_attempts(ip_address, attempted_at DESC);
CREATE INDEX idx_login_attempts_user ON login_attempts(user_id, attempted_at DESC) WHERE user_id IS NOT NULL;
CREATE INDEX idx_login_attempts_email ON login_attempts(email, attempted_at DESC) WHERE email IS NOT NULL;
CREATE INDEX idx_login_attempts_success ON login_attempts(success, attempted_at DESC);
CREATE INDEX idx_login_attempts_time ON login_attempts(attempted_at DESC);

-- Enable RLS
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;

-- Users can view their own login attempts
CREATE POLICY "Users can view own login attempts"
  ON login_attempts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all login attempts
CREATE POLICY "Admins can view all login attempts"
  ON login_attempts
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- System can insert login attempts (no RLS for inserts from server)
CREATE POLICY "System can insert login attempts"
  ON login_attempts
  FOR INSERT
  WITH CHECK (true);

-- Function to clean up old login attempts (keep last 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_login_attempts()
RETURNS void AS $$
BEGIN
  DELETE FROM login_attempts
  WHERE attempted_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get failed login count for user/IP
CREATE OR REPLACE FUNCTION get_failed_login_count(
  p_identifier TEXT,
  p_identifier_type TEXT, -- 'email', 'ip', or 'user_id'
  p_time_window INTERVAL DEFAULT '1 hour'
)
RETURNS INTEGER AS $$
DECLARE
  failed_count INTEGER;
BEGIN
  IF p_identifier_type = 'email' THEN
    SELECT COUNT(*) INTO failed_count
    FROM login_attempts
    WHERE email = p_identifier
      AND success = false
      AND attempted_at > NOW() - p_time_window;
  ELSIF p_identifier_type = 'ip' THEN
    SELECT COUNT(*) INTO failed_count
    FROM login_attempts
    WHERE ip_address = p_identifier::INET
      AND success = false
      AND attempted_at > NOW() - p_time_window;
  ELSIF p_identifier_type = 'user_id' THEN
    SELECT COUNT(*) INTO failed_count
    FROM login_attempts
    WHERE user_id = p_identifier::UUID
      AND success = false
      AND attempted_at > NOW() - p_time_window;
  ELSE
    failed_count := 0;
  END IF;
  
  RETURN COALESCE(failed_count, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON TABLE login_attempts IS 'Tracks all login attempts for security monitoring and rate limiting';
COMMENT ON FUNCTION get_failed_login_count IS 'Returns count of failed login attempts within time window';
