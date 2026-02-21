-- Claps on blog posts — one clap per anonymous session per post
CREATE TABLE IF NOT EXISTS blog_claps (
  id         BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  post_slug  TEXT NOT NULL,
  session_id TEXT NOT NULL,
  UNIQUE(post_slug, session_id)
);

CREATE INDEX idx_blog_claps_slug ON blog_claps(post_slug);

ALTER TABLE blog_claps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view blog_claps"
  ON blog_claps FOR SELECT USING (true);

CREATE POLICY "Anyone can insert blog_claps"
  ON blog_claps FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can delete their clap"
  ON blog_claps FOR DELETE USING (true);
