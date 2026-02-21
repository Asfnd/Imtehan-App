-- Comments on individual blog posts (moderated before showing)
CREATE TABLE IF NOT EXISTS blog_comments (
  id          BIGSERIAL PRIMARY KEY,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  post_slug   TEXT NOT NULL,
  user_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  comment     TEXT NOT NULL,
  approved    BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX idx_blog_comments_slug    ON blog_comments(post_slug, approved);
CREATE INDEX idx_blog_comments_created ON blog_comments(created_at DESC);
CREATE INDEX idx_blog_comments_user    ON blog_comments(user_id);

ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a comment
CREATE POLICY "Anyone can insert blog_comments"
  ON blog_comments FOR INSERT
  WITH CHECK (true);

-- Only approved comments are publicly visible
CREATE POLICY "Anyone can view approved blog_comments"
  ON blog_comments FOR SELECT
  USING (approved = true);

COMMENT ON TABLE blog_comments IS 'Reader comments on blog posts — require manual approval before display';
