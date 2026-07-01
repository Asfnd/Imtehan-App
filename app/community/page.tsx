'use client'

import { useState, useEffect, useRef, Suspense, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/lib/contexts/AuthContext'
import NavigationBar from '@/components/NavigationBar'
import { WhatsAppMessageBubble } from '@/components/community/WhatsAppMessageBubble'
import { Paperclip, Send, Trash2 } from 'lucide-react'

// Singleton client: created once, not on every render
const supabase = createClient()

// ─── Types ────────────────────────────────────────────────────────────────────

interface CommunityMessage {
  id: number
  user_id: string
  user_name: string
  user_avatar: string | null
  message: string
  channel: string
  created_at: string
}

interface Reaction {
  id: number
  message_id: number
  user_id: string
  emoji: string
}

// ─── Config ───────────────────────────────────────────────────────────────────

const CHANNELS = [
  { key: 'general',  label: 'General' },
  { key: 'css-exam', label: 'CSS Exam' },
  { key: 'mdcat',    label: 'MDCAT Prep' },
  { key: 'ppsc',     label: 'PPSC' },
]

const QUICK_REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🙏']

const EMOJI_CATEGORIES = [
  {
    label: '😊 Smileys',
    emojis: ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','😊','😇','🥰','😍','🤩','😘','😗','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🫡','🤔','😐','😑','😶','🙄','😏','😒','🙃','😔','😪','🤤','😴','😷','🤒','🤕','🥴','😵','🤯','🤠','🥳','😎','🤓'],
  },
  {
    label: '👋 Hands',
    emojis: ['👍','👎','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','👇','☝️','👋','🤚','🖐️','✋','🖖','🫶','🤝','👏','🙌','🫙','🤲','🙏','✍️','💪','🦾','🫰'],
  },
  {
    label: '❤️ Hearts',
    emojis: ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❤️‍🔥','❤️‍🩹','💕','💞','💓','💗','💖','💘','💝','💟','♥️'],
  },
  {
    label: '🎉 Celebration',
    emojis: ['🎉','🎊','🎈','🎁','🏆','🥇','🥈','🥉','🎖️','🏅','🎗️','🎀','🎯','🎮','🕹️','🎲','🃏','🎴','🎭','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎸','🎹','🥁','🎺','🎷'],
  },
  {
    label: '🔥 Popular',
    emojis: ['🔥','💯','✨','⭐','🌟','💫','⚡','💥','🎯','🚀','💡','🙈','🙉','🙊','💀','👻','👽','🤖','💩','🫠','😈','👿','🤡','💃','🕺','🫶'],
  },
]

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ name, src, size = 'md' }: { name: string; src: string | null; size?: 'sm' | 'md' }) {
  const [imgFailed, setImgFailed] = useState(false)
  const dim = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
  return (
    <div className={`relative ${dim} rounded-full overflow-hidden flex-shrink-0`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
        {name.charAt(0).toUpperCase()}
      </div>
      {src && !imgFailed && (
        <img src={src} alt={name} className="absolute inset-0 w-full h-full object-cover" onError={() => setImgFailed(true)} />
      )}
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function formatDateLabel(iso: string) {
  const d = new Date(iso)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return d.toLocaleDateString([], { month: 'long', day: 'numeric' })
}

// ─── Full emoji picker ────────────────────────────────────────────────────────

function FullEmojiPicker({ onPick, onClose }: { onPick: (e: string) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div ref={ref} className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-40 overflow-hidden" style={{ width: 288 }}>
      <div className="flex border-b border-gray-100 px-1 pt-1.5 gap-0.5">
        {EMOJI_CATEGORIES.map((cat, i) => (
          <button key={i} onClick={() => setActiveTab(i)} title={cat.label}
            className={`flex-shrink-0 text-lg px-2.5 py-1.5 rounded-lg transition-colors ${activeTab === i ? 'bg-blue-50 scale-110' : 'hover:bg-gray-100'}`}>
            {cat.label.split(' ')[0]}
          </button>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 px-3 py-1 font-medium">{EMOJI_CATEGORIES[activeTab].label.split(' ').slice(1).join(' ')}</p>
      <div className="px-2 pb-2 grid grid-cols-8 gap-0.5 max-h-48 overflow-y-auto">
        {EMOJI_CATEGORIES[activeTab].emojis.map((emoji) => (
          <button key={emoji} onClick={() => { onPick(emoji); onClose() }}
            className="text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 hover:scale-110 transition-all">
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Reactions bar ────────────────────────────────────────────────────────────

function ReactionsBar({ msgId, reactions, myId, onToggle, loggedIn }: {
  msgId: number; reactions: Reaction[]; myId: string | undefined
  onToggle: (msgId: number, emoji: string) => void; loggedIn: boolean
}) {
  const [mode, setMode] = useState<'closed' | 'quick' | 'full'>('closed')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mode === 'closed') return
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setMode('closed')
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mode])

  const grouped: { emoji: string; count: number; mine: boolean }[] = []
  reactions.filter((r) => r.message_id === msgId).forEach((r) => {
    const existing = grouped.find((g) => g.emoji === r.emoji)
    if (existing) { existing.count++; if (r.user_id === myId) existing.mine = true }
    else grouped.push({ emoji: r.emoji, count: 1, mine: r.user_id === myId })
  })

  if (grouped.length === 0 && !loggedIn) return null

  return (
    <div className="flex items-center gap-1 mt-1.5 overflow-x-auto max-w-sm" style={{ scrollbarWidth: 'none' }}>
      {grouped.map(({ emoji, count, mine }) => (
        <button key={emoji} onClick={() => loggedIn && onToggle(msgId, emoji)}
          className={`flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border transition-all hover:scale-105 ${
            mine ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
          } ${!loggedIn ? 'cursor-default' : ''}`}>
          <span>{emoji}</span><span>{count}</span>
        </button>
      ))}

      {loggedIn && (
        <div className="relative flex-shrink-0" ref={ref}>
          <button onClick={() => setMode((m) => m === 'closed' ? 'quick' : 'closed')}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-colors" title="Add reaction">
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
              <circle cx="8.5" cy="10" r="6.5" stroke="#9ca3af" strokeWidth="1.5"/>
              <path d="M6 12c.5 1 1.5 1.5 2.5 1.5S10.5 13 11 12" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round"/>
              <circle cx="7" cy="9" r="0.7" fill="#9ca3af"/>
              <circle cx="10" cy="9" r="0.7" fill="#9ca3af"/>
              <path d="M15 5v4M13 7h4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {mode === 'quick' && (
            <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-full shadow-xl px-2 py-1.5 flex items-center gap-0.5 z-30 whitespace-nowrap">
              {QUICK_REACTIONS.map((emoji) => (
                <button key={emoji} onClick={() => { onToggle(msgId, emoji); setMode('closed') }}
                  className="text-xl w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 hover:scale-125 transition-all">
                  {emoji}
                </button>
              ))}
              <span className="w-px h-5 bg-gray-200 mx-1" />
              <button onClick={() => setMode('full')}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500 font-bold text-base" title="More emojis">
                +
              </button>
            </div>
          )}

          {mode === 'full' && (
            <FullEmojiPicker onPick={(e) => { onToggle(msgId, e); setMode('closed') }} onClose={() => setMode('closed')} />
          )}
        </div>
      )}
    </div>
  )
}

function reactionChips(msgId: number, reactions: Reaction[], myId?: string) {
  const grouped: { emoji: string; count: number; mine: boolean }[] = []
  reactions.filter((r) => r.message_id === msgId).forEach((r) => {
    const existing = grouped.find((g) => g.emoji === r.emoji)
    if (existing) {
      existing.count++
      if (r.user_id === myId) existing.mine = true
    } else {
      grouped.push({ emoji: r.emoji, count: 1, mine: r.user_id === myId })
    }
  })
  return grouped
}

// ─── Own message ──────────────────────────────────────────────────────────────

function OwnMessage({ msg, reactions, myId, onDelete, isDeleting, onReaction }: {
  msg: CommunityMessage; reactions: Reaction[]; myId: string | undefined
  onDelete: (id: number) => void; isDeleting: boolean; onReaction: (msgId: number, emoji: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  return (
    <div className="flex justify-end items-end gap-2" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative" ref={menuRef}>
        <button onClick={() => setMenuOpen((v) => !v)}
          className={`p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all ${hovered || menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="4" r="1.5"/><circle cx="10" cy="10" r="1.5"/><circle cx="10" cy="16" r="1.5"/>
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute bottom-full right-0 mb-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-20 min-w-[120px]">
            <button onClick={() => { setMenuOpen(false); onDelete(msg.id) }} disabled={isDeleting}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50">
              <Trash2 className="w-3.5 h-3.5" />Delete
            </button>
          </div>
        )}
      </div>

      <div className={`max-w-[70%] transition-opacity ${isDeleting ? 'opacity-40' : 'opacity-100'}`}>
        <WhatsAppMessageBubble
          message={msg.message}
          isOwn
          messageId={msg.id}
          reactions={reactionChips(msg.id, reactions, myId)}
          loggedIn={!!myId}
          onReact={onReaction}
        />
        <p className="text-[11px] text-gray-400 mt-3 text-right">{formatTime(msg.created_at)}</p>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function CommunityChatContent() {
  const { user } = useAuth()

  const [activeChannel, setActiveChannel] = useState('css-exam')
  const [messages, setMessages] = useState<CommunityMessage[]>([])
  const [reactions, setReactions] = useState<Reaction[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [lastSentAt, setLastSentAt] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const activeChannelRef = useRef(activeChannel)
  activeChannelRef.current = activeChannel

  // Fetch messages + reactions when channel changes
  useEffect(() => {
    setIsLoading(true)
    setMessages([])
    setReactions([])

    supabase
      .from('community_messages')
      .select('*')
      .eq('channel', activeChannel)
      .order('created_at', { ascending: true })
      .limit(50)
      .then(async ({ data: msgs }) => {
        const msgList = msgs ?? []
        setMessages(msgList)
        setIsLoading(false)
        if (msgList.length > 0) {
          const { data: rxns } = await supabase
            .from('community_reactions')
            .select('*')
            .in('message_id', msgList.map((m) => m.id))
          setReactions(rxns ?? [])
        }
      })
  }, [activeChannel])

  // Realtime: messages + reactions
  useEffect(() => {
    const channel = supabase
      .channel('community_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'community_messages' }, (payload) => {
        const msg = payload.new as CommunityMessage
        if (msg.channel !== activeChannelRef.current) return
        setMessages((prev) => prev.find((m) => m.id === msg.id) ? prev : [...prev, msg])
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'community_messages' }, (payload) => {
        const id = (payload.old as { id: number }).id
        setMessages((prev) => prev.filter((m) => m.id !== id))
        setReactions((prev) => prev.filter((r) => r.message_id !== id))
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'community_reactions' }, (payload) => {
        const rxn = payload.new as Reaction
        setReactions((prev) => {
          // Replace optimistic temp entry (same user + message + emoji) or add if new
          const withoutTemp = prev.filter((r) => !(r.id > 1e12 && r.message_id === rxn.message_id && r.user_id === rxn.user_id && r.emoji === rxn.emoji))
          return withoutTemp.find((r) => r.id === rxn.id) ? withoutTemp : [...withoutTemp, rxn]
        })
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'community_reactions' }, (payload) => {
        const id = (payload.old as { id: number }).id
        setReactions((prev) => prev.filter((r) => r.id !== id))
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const autoResize = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }, [])

  const handleSend = async () => {
    const text = inputValue.trim()
    if (!text || !user || isSending) return
    const now = Date.now()
    if (now - lastSentAt < 2000) return

    setIsSending(true)
    setLastSentAt(now)

    const userName = user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous'
    const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || null

    // Optimistic: show message instantly
    const tempId = Date.now()
    const optimisticMsg: CommunityMessage = {
      id: tempId,
      user_id: user.id,
      user_name: userName,
      user_avatar: avatarUrl,
      message: text,
      channel: activeChannel,
      created_at: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, optimisticMsg])
    setInputValue('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    const { data, error } = await supabase
      .from('community_messages')
      .insert({ user_id: user.id, user_name: userName, user_avatar: avatarUrl, message: text, channel: activeChannel })
      .select()
      .single()

    if (error) {
      // Revert on failure
      setMessages((prev) => prev.filter((m) => m.id !== tempId))
    } else if (data) {
      // Replace temp with real (realtime may also fire; deduplication handles it)
      setMessages((prev) => prev.map((m) => m.id === tempId ? data : m))
    }

    setIsSending(false)
  }

  const handleDelete = async (id: number) => {
    // Optimistic: remove instantly
    setDeletingId(id)
    setMessages((prev) => prev.filter((m) => m.id !== id))
    setReactions((prev) => prev.filter((r) => r.message_id !== id))
    await supabase.from('community_messages').delete().eq('id', id)
    setDeletingId(null)
  }

  const handleReaction = async (msgId: number, emoji: string) => {
    if (!user) return
    const existing = reactions.find((r) => r.message_id === msgId && r.user_id === user.id && r.emoji === emoji)

    if (existing) {
      setReactions((prev) => prev.filter((r) => r.id !== existing.id))
      const { error } = await supabase.from('community_reactions').delete().eq('id', existing.id)
      if (error) setReactions((prev) => [...prev, existing])
    } else {
      const tempId = Date.now()
      setReactions((prev) => [...prev, { id: tempId, message_id: msgId, user_id: user.id, emoji }])
      const { data, error } = await supabase
        .from('community_reactions')
        .insert({ message_id: msgId, user_id: user.id, emoji })
        .select().single()
      if (error) {
        setReactions((prev) => prev.filter((r) => r.id !== tempId))
      } else if (data) {
        setReactions((prev) => prev.map((r) => r.id === tempId ? data : r))
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const handleGoogleSignIn = async () => {
    const baseUrl = window.location.origin
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${baseUrl}/auth/callback?next=/community`,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    })
  }

  // Group messages by date
  const grouped: { label: string; messages: CommunityMessage[] }[] = []
  messages.forEach((msg) => {
    const label = formatDateLabel(msg.created_at)
    const last = grouped[grouped.length - 1]
    if (last && last.label === label) last.messages.push(msg)
    else grouped.push({ label, messages: [msg] })
  })

  const myId = user?.id
  const myName = user?.user_metadata?.name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'U'
  const myAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null

  return (
    <div className="flex flex-col bg-white" style={{ height: '100dvh' }}>
      <NavigationBar />

      {/* Channel tabs */}
      <nav className="bg-white border-b border-gray-100 flex-shrink-0 overflow-x-auto">
        <div className="flex">
          {CHANNELS.map(({ key, label }) => (
            <button key={key} onClick={() => setActiveChannel(key)}
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeChannel === key ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4" style={{ backgroundColor: '#f8f9fb' }}>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-sm">No messages yet in #{CHANNELS.find(c => c.key === activeChannel)?.label}. Be the first!</p>
          </div>
        ) : (
          grouped.map((group) => (
            <div key={group.label} className="space-y-4">
              <div className="flex justify-center">
                <span className="bg-gray-200/70 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">{group.label}</span>
              </div>
              {group.messages.map((msg) => {
                const msgReactions = reactions.filter((r) => r.message_id === msg.id)
                const isOwn = msg.user_id === myId
                return isOwn ? (
                  <OwnMessage key={msg.id} msg={msg} reactions={msgReactions} myId={myId}
                    onDelete={handleDelete} isDeleting={deletingId === msg.id} onReaction={handleReaction} />
                ) : (
                  <div key={msg.id} className="flex gap-3">
                    <Avatar name={msg.user_name} src={msg.user_avatar} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-gray-900 mb-1">{msg.user_name}</p>
                      <WhatsAppMessageBubble
                        message={msg.message}
                        isOwn={false}
                        messageId={msg.id}
                        reactions={reactionChips(msg.id, msgReactions, myId)}
                        loggedIn={!!user}
                        onReact={handleReaction}
                      />
                      <p className="text-[11px] text-gray-400 mt-3">{formatTime(msg.created_at)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      {user ? (
        <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4 flex-shrink-0">
          <div className="flex items-end gap-3 max-w-3xl mx-auto">
            <Avatar name={myName} src={myAvatar} size="sm" />
            <div className="flex-1 flex items-end bg-white border-2 border-gray-200 rounded-2xl px-4 py-3 gap-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-sm">
              <textarea ref={textareaRef} value={inputValue}
                onChange={(e) => { setInputValue(e.target.value); autoResize() }}
                onKeyDown={handleKeyDown}
                placeholder={`Message #${CHANNELS.find(c => c.key === activeChannel)?.label}…`}
                maxLength={500} rows={1}
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none"
                style={{ maxHeight: '120px', lineHeight: '1.5' }} />
              <button className="text-gray-400 hover:text-gray-600 transition-colors pb-0.5 flex-shrink-0">
                <Paperclip className="w-4 h-4" />
              </button>
            </div>
            <button onClick={handleSend} disabled={!inputValue.trim() || isSending}
              className="w-11 h-11 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center flex-shrink-0 shadow transition-all active:scale-95">
              <Send className="w-4 h-4 translate-x-0.5 -translate-y-0.5" />
            </button>
          </div>
          <p className="text-center text-[11px] text-gray-400 mt-2">
            Press <kbd className="bg-gray-100 border border-gray-300 rounded px-1 text-gray-500 text-[10px]">Enter</kbd> to send &middot; <kbd className="bg-gray-100 border border-gray-300 rounded px-1 text-gray-500 text-[10px]">Shift+Enter</kbd> for new line
          </p>
        </div>
      ) : (
        <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Sign in to join the conversation
            </div>
            <button onClick={handleGoogleSignIn}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors">
              Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CommunityPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CommunityChatContent />
    </Suspense>
  )
}
