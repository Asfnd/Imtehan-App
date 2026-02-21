-- Add channel column to existing messages
ALTER TABLE public.community_messages
  ADD COLUMN IF NOT EXISTS channel TEXT NOT NULL DEFAULT 'css-exam';

CREATE INDEX IF NOT EXISTS idx_community_messages_channel
  ON public.community_messages(channel);

-- Reactions table
CREATE TABLE IF NOT EXISTS public.community_reactions (
  id          BIGSERIAL PRIMARY KEY,
  message_id  BIGINT NOT NULL REFERENCES public.community_messages(id) ON DELETE CASCADE,
  user_id     UUID   NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  emoji       TEXT   NOT NULL,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (message_id, user_id, emoji)
);

CREATE INDEX IF NOT EXISTS idx_community_reactions_message_id
  ON public.community_reactions(message_id);

ALTER TABLE public.community_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reactions"
  ON public.community_reactions FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Authenticated users can add reactions"
  ON public.community_reactions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own reactions"
  ON public.community_reactions FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

GRANT SELECT ON public.community_reactions TO anon;
GRANT SELECT, INSERT, DELETE ON public.community_reactions TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.community_reactions_id_seq TO authenticated;

ALTER PUBLICATION supabase_realtime ADD TABLE public.community_reactions;
