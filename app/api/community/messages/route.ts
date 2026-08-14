import { NextRequest, NextResponse } from 'next/server'
import { createPublicSupabaseClient } from '@/lib/supabase/public'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CHANNELS = new Set(['general', 'css-exam', 'mdcat', 'ppsc'])

/**
 * Same-origin chat history. The browser used to query Supabase REST directly,
 * which went blank whenever Docker-baked soft mode skipped the client fetch.
 */
export async function GET(request: NextRequest) {
  const channel = request.nextUrl.searchParams.get('channel') || 'css-exam'
  if (!CHANNELS.has(channel)) {
    return NextResponse.json({ error: 'Unknown channel' }, { status: 400 })
  }

  const supabase = createPublicSupabaseClient()
  const { data: msgs, error } = await supabase
    .from('community_messages')
    .select('id, user_id, user_name, user_avatar, message, channel, created_at')
    .eq('channel', channel)
    .order('created_at', { ascending: true })
    .limit(50)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const messages = msgs ?? []
  let reactions: Array<{ id: number; message_id: number; user_id: string; emoji: string }> = []
  if (messages.length > 0) {
    const { data: rxns } = await supabase
      .from('community_reactions')
      .select('id, message_id, user_id, emoji')
      .in('message_id', messages.map((m) => m.id))
    reactions = rxns ?? []
  }

  return NextResponse.json(
    { messages, reactions },
    {
      headers: {
        'Cache-Control': 'private, no-store',
      },
    }
  )
}
