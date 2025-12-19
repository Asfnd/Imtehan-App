-- Initial Database Schema for CSS Practice Hub

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  avatar_url TEXT,
  total_xp INTEGER DEFAULT 0 CHECK (total_xp >= 0),
  level INTEGER DEFAULT 1 CHECK (level >= 1),
  current_streak INTEGER DEFAULT 0 CHECK (current_streak >= 0),
  longest_streak INTEGER DEFAULT 0 CHECK (longest_streak >= 0),
  total_quizzes INTEGER DEFAULT 0 CHECK (total_quizzes >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for users table
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_username ON public.users(username);
CREATE INDEX idx_users_total_xp ON public.users(total_xp DESC);
CREATE INDEX idx_users_level ON public.users(level DESC);

-- Quizzes table
CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic VARCHAR(100) NOT NULL,
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  questions JSONB NOT NULL,
  generated_by VARCHAR(20) DEFAULT 'ai' CHECK (generated_by IN ('ai', 'manual')),
  cache_key VARCHAR(255),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for quizzes table
CREATE INDEX idx_quizzes_topic ON public.quizzes(topic);
CREATE INDEX idx_quizzes_cache_key ON public.quizzes(cache_key) WHERE cache_key IS NOT NULL;
CREATE INDEX idx_quizzes_expires_at ON public.quizzes(expires_at) WHERE expires_at IS NOT NULL;
CREATE INDEX idx_quizzes_difficulty ON public.quizzes(difficulty);

-- Quiz history table
CREATE TABLE IF NOT EXISTS public.quiz_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE SET NULL,
  topic VARCHAR(100) NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0),
  total_questions INTEGER NOT NULL CHECK (total_questions > 0),
  time_taken INTEGER NOT NULL CHECK (time_taken >= 0),
  answers JSONB NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for quiz_history table
CREATE INDEX idx_quiz_history_user ON public.quiz_history(user_id, completed_at DESC);
CREATE INDEX idx_quiz_history_topic ON public.quiz_history(user_id, topic);
CREATE INDEX idx_quiz_history_completed ON public.quiz_history(completed_at DESC);

-- User topic performance materialized view
CREATE MATERIALIZED VIEW IF NOT EXISTS public.user_topic_performance AS
SELECT 
  user_id,
  topic,
  COUNT(*) as total_quizzes,
  ROUND(CAST(AVG(score::float / total_questions * 100) AS numeric), 2) as accuracy,
  ROUND(CAST(AVG(score::float) AS numeric), 2) as avg_score,
  MAX(completed_at) as last_quiz_at
FROM public.quiz_history
GROUP BY user_id, topic;

-- Create index on materialized view
CREATE UNIQUE INDEX idx_user_topic_perf ON public.user_topic_performance(user_id, topic);

-- Insights cache table
CREATE TABLE IF NOT EXISTS public.insights_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  insights JSONB NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for insights_cache table
CREATE INDEX idx_insights_user ON public.insights_cache(user_id);
CREATE INDEX idx_insights_expires ON public.insights_cache(expires_at);

-- Quiz packs table (for offline mode)
CREATE TABLE IF NOT EXISTS public.quiz_packs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic VARCHAR(100) NOT NULL,
  questions JSONB NOT NULL,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for quiz_packs table
CREATE INDEX idx_quiz_packs_topic ON public.quiz_packs(topic);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at for users
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to refresh user_topic_performance materialized view
CREATE OR REPLACE FUNCTION refresh_user_performance()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.user_topic_performance;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_packs ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Quizzes table policies (public read, service role write)
CREATE POLICY "Anyone can view quizzes"
  ON public.quizzes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service role can insert quizzes"
  ON public.quizzes FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Quiz history policies
CREATE POLICY "Users can view their own quiz history"
  ON public.quiz_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz history"
  ON public.quiz_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Insights cache policies
CREATE POLICY "Users can view their own insights"
  ON public.insights_cache FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own insights"
  ON public.insights_cache FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own insights"
  ON public.insights_cache FOR UPDATE
  USING (auth.uid() = user_id);

-- Quiz packs policies (public read)
CREATE POLICY "Anyone can view quiz packs"
  ON public.quiz_packs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service role can manage quiz packs"
  ON public.quiz_packs FOR ALL
  TO service_role
  USING (true);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;

GRANT SELECT, INSERT, UPDATE ON public.users TO authenticated;
GRANT SELECT ON public.quizzes TO authenticated;
GRANT SELECT, INSERT ON public.quiz_history TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.insights_cache TO authenticated;
GRANT SELECT ON public.quiz_packs TO authenticated;

GRANT ALL ON public.user_topic_performance TO authenticated;

-- Comments for documentation
COMMENT ON TABLE public.users IS 'User profiles with gamification stats';
COMMENT ON TABLE public.quizzes IS 'Generated quizzes with caching support';
COMMENT ON TABLE public.quiz_history IS 'User quiz completion history';
COMMENT ON TABLE public.insights_cache IS 'Cached AI-generated insights';
COMMENT ON TABLE public.quiz_packs IS 'Pre-generated quiz packs for offline mode';
COMMENT ON MATERIALIZED VIEW public.user_topic_performance IS 'Aggregated user performance by topic';
