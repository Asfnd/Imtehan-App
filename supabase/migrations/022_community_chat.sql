CREATE TABLE IF NOT EXISTS public.community_messages (
  id          BIGSERIAL PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name   TEXT NOT NULL,
  user_avatar TEXT,
  message     TEXT NOT NULL CHECK (char_length(message) >= 1 AND char_length(message) <= 500),
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_community_messages_created_at ON public.community_messages(created_at DESC);
CREATE INDEX idx_community_messages_user_id ON public.community_messages(user_id);

ALTER TABLE public.community_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read community messages"
  ON public.community_messages FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Authenticated users can send messages"
  ON public.community_messages FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own messages"
  ON public.community_messages FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

GRANT SELECT ON public.community_messages TO anon;
GRANT SELECT, INSERT, DELETE ON public.community_messages TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.community_messages_id_seq TO authenticated;

ALTER PUBLICATION supabase_realtime ADD TABLE public.community_messages;
