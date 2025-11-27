-- Security events logging
CREATE TABLE IF NOT EXISTS security_logs (
  id BIGSERIAL PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address INET,
  user_agent TEXT,
  location JSONB,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX idx_security_logs_timestamp ON security_logs(timestamp DESC);
CREATE INDEX idx_security_logs_user ON security_logs(user_id, timestamp DESC) WHERE user_id IS NOT NULL;
CREATE INDEX idx_security_logs_ip ON security_logs(ip_address, timestamp DESC) WHERE ip_address IS NOT NULL;
CREATE INDEX idx_security_logs_severity ON security_logs(severity, timestamp DESC);
CREATE INDEX idx_security_logs_event_type ON security_logs(event_type, timestamp DESC);

-- Enable RLS
ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view security logs
CREATE POLICY "Admins can view security logs"
  ON security_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- System can insert security logs
CREATE POLICY "System can insert security logs"
  ON security_logs
  FOR INSERT
  WITH CHECK (true);

-- Bot detection scores
CREATE TABLE IF NOT EXISTS bot_scores (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  fingerprint TEXT NOT NULL,
  score DECIMAL(3,2) NOT NULL CHECK (score >= 0 AND score <= 1),
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_bot_scores_fingerprint ON bot_scores(fingerprint, created_at DESC);
CREATE INDEX idx_bot_scores_user ON bot_scores(user_id, created_at DESC) WHERE user_id IS NOT NULL;
CREATE INDEX idx_bot_scores_score ON bot_scores(score DESC, created_at DESC);

-- Enable RLS
ALTER TABLE bot_scores ENABLE ROW LEVEL SECURITY;

-- Admins can view bot scores
CREATE POLICY "Admins can view bot scores"
  ON bot_scores
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- System can insert bot scores
CREATE POLICY "System can insert bot scores"
  ON bot_scores
  FOR INSERT
  WITH CHECK (true);

-- Function to clean up old security logs (keep last 180 days)
CREATE OR REPLACE FUNCTION cleanup_old_security_logs()
RETURNS void AS $$
BEGIN
  DELETE FROM security_logs
  WHERE created_at < NOW() - INTERVAL '180 days';
  
  DELETE FROM bot_scores
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log security event
CREATE OR REPLACE FUNCTION log_security_event(
  p_event_type TEXT,
  p_severity TEXT,
  p_user_id UUID DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_details JSONB DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
  log_id BIGINT;
BEGIN
  INSERT INTO security_logs (
    event_type,
    severity,
    user_id,
    ip_address,
    user_agent,
    details
  ) VALUES (
    p_event_type,
    p_severity,
    p_user_id,
    p_ip_address,
    p_user_agent,
    p_details
  )
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON TABLE security_logs IS 'Comprehensive security event logging';
COMMENT ON TABLE bot_scores IS 'Bot detection scores for users and fingerprints';
COMMENT ON FUNCTION log_security_event IS 'Helper function to log security events';
