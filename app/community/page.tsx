'use client'

import { useState, useEffect, useRef, Suspense, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/lib/contexts/AuthContext'
import NavigationBar from '@/components/NavigationBar'
import { WhatsAppMessageBubble } from '@/components/community/WhatsAppMessageBubble'
import { buildChatListItems, avatarGradient } from '@/lib/community-chat-utils'
import { Paperclip, Send, Trash2, ChevronDown } from 'lucide-react'
import { FollowUsCard } from '@/components/social/FollowUs'
import { softMode } from '@/lib/supabase-soft'

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

function OwnMessage({ msg, reactions, myId, onDelete, isDeleting, onReaction, group, showInlineTime }: {
  msg: CommunityMessage; reactions: Reaction[]; myId: string | undefined
  onDelete: (id: number) => void; isDeleting: boolean; onReaction: (msgId: number, emoji: string) => void
  group: 'single' | 'first' | 'middle' | 'last'; showInlineTime: boolean
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

      <div className={`max-w-[min(100%,32rem)] transition-opacity ${isDeleting ? 'opacity-40' : 'opacity-100'}`}>
        <WhatsAppMessageBubble
          message={msg.message}
          isOwn
          messageId={msg.id}
          group={group}
          createdAt={msg.created_at}
          showInlineTime={showInlineTime}
          reactions={reactionChips(msg.id, reactions, myId)}
          loggedIn={!!myId}
          onReact={onReaction}
        />
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
  const [atBottom, setAtBottom] = useState(true)
  const [pendingNew, setPendingNew] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const activeChannelRef = useRef(activeChannel)
  const atBottomRef = useRef(true)
  const prevMsgCountRef = useRef(0)
  activeChannelRef.current = activeChannel
  atBottomRef.current = atBottom

  const scrollToEnd = useCallback((smooth = true) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' })
    setAtBottom(true)
    setPendingNew(0)
  }, [])

  const checkAtBottom = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const near = el.scrollHeight - el.scrollTop - el.clientHeight < 80
    setAtBottom(near)
    if (near) setPendingNew(0)
  }, [])

  // Fetch messages + reactions when channel changes
  useEffect(() => {
    setIsLoading(true)
    setMessages([])
    setReactions([])

    if (softMode()) {
      setIsLoading(false)
      return
    }

    supabase
      .from('community_messages')
      .select('id, user_id, user_name, user_avatar, message, channel, created_at')
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
            .select('id, message_id, user_id, emoji')
            .in('message_id', msgList.map((m) => m.id))
          setReactions(rxns ?? [])
        }
      })
  }, [activeChannel])

  useEffect(() => {
    prevMsgCountRef.current = 0
    setPendingNew(0)
    setAtBottom(true)
    requestAnimationFrame(() => scrollToEnd(false))
  }, [activeChannel, scrollToEnd])

  // Realtime: messages + reactions (skip in soft mode — Realtime burns Free Nano)
  useEffect(() => {
    if (softMode()) return
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

  // Auto-scroll when pinned to bottom; count new messages otherwise
  useEffect(() => {
    const count = messages.length
    const prev = prevMsgCountRef.current
    prevMsgCountRef.current = count

    if (count === 0) return
    if (count <= prev) return

    const added = count - prev
    if (atBottomRef.current) {
      requestAnimationFrame(() => scrollToEnd(true))
    } else {
      setPendingNew((n) => n + added)
    }
  }, [messages, scrollToEnd])

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
    requestAnimationFrame(() => scrollToEnd(true))

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
  const myId = user?.id
  const myName = user?.user_metadata?.name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'U'
  const myAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null

  const listItems = useMemo(() => buildChatListItems(messages, myId), [messages, myId])
  const channelLabel = CHANNELS.find(c => c.key === activeChannel)?.label ?? 'Community'

  return (
    <div className="flex flex-col bg-white" style={{ height: '100dvh' }}>
      <NavigationBar />

      {/* Channel header strip */}
      <div className="bg-white border-b border-gray-100 flex-shrink-0 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-sm font-semibold text-gray-800">{channelLabel}</span>
          <span className="text-xs text-gray-400">· live</span>
        </div>
        {messages.length > 0 && (
          <span className="text-xs font-medium text-gray-400">{messages.length} messages</span>
        )}
      </div>

      {/* Channel tabs */}
      <nav className="bg-white border-b border-gray-100 flex-shrink-0 overflow-x-auto">
        <div className="flex gap-2 px-4 py-2">
          {CHANNELS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveChannel(key)}
              className={`px-4 py-2 text-sm font-semibold whitespace-nowrap rounded-full transition-all ${
                activeChannel === key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Messages — WhatsApp-style wallpaper */}
      <div className="relative flex-1 min-h-0">
      <div
        ref={scrollRef}
        onScroll={checkAtBottom}
        className="absolute inset-0 overflow-y-auto px-3 sm:px-5 py-4 scroll-smooth"
        style={{
          backgroundColor: '#ECE9E4',
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-500 px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-base font-bold text-gray-800">Start the conversation</p>
            <p className="text-sm text-gray-500 max-w-sm">Be the first in #{channelLabel}. Ask a question, share a tip, or say hi.</p>
            <FollowUsCard compact className="mt-2 max-w-sm w-full" title="Join us outside chat" subtitle="Tips & updates on Instagram & Facebook" />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-1">
            {listItems.map((item) => {
              if (item.kind === 'date') {
                return (
                  <div key={item.key} className="flex justify-center my-3">
                    <span className="bg-white/90 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm border border-gray-200/80">
                      {item.label}
                    </span>
                  </div>
                )
              }

              const msg = item.message as CommunityMessage
              const msgReactions = reactions.filter((r) => r.message_id === msg.id)
              const showInlineTime = item.group === 'single' || item.group === 'last'
              const marginClass = item.compact ? 'mb-0.5' : 'mb-2'

              if (item.mine) {
                return (
                  <div key={item.key} className={`${marginClass} animate-in fade-in slide-in-from-bottom-2 duration-200`}>
                    <OwnMessage
                      msg={msg}
                      reactions={msgReactions}
                      myId={myId}
                      onDelete={handleDelete}
                      isDeleting={deletingId === msg.id}
                      onReaction={handleReaction}
                      group={item.group}
                      showInlineTime={showInlineTime}
                    />
                  </div>
                )
              }

              const grad = avatarGradient(msg.user_name)
              return (
                <div key={item.key} className={`flex gap-2 ${marginClass} animate-in fade-in slide-in-from-bottom-2 duration-200`}>
                  <div className="w-9 flex-shrink-0">
                    {item.showAvatar ? (
                      msg.user_avatar ? (
                        <img src={msg.user_avatar} alt="" className="w-9 h-9 rounded-full object-cover shadow-sm" />
                      ) : (
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${grad.bg} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                          {msg.user_name.charAt(0).toUpperCase()}
                        </div>
                      )
                    ) : null}
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    {item.showName && (
                      <p className="text-[12px] font-bold text-gray-700 mb-1 ml-0.5">{msg.user_name}</p>
                    )}
                    <WhatsAppMessageBubble
                      message={msg.message}
                      isOwn={false}
                      messageId={msg.id}
                      group={item.group}
                      createdAt={msg.created_at}
                      showInlineTime={showInlineTime}
                      reactions={reactionChips(msg.id, msgReactions, myId)}
                      loggedIn={!!user}
                      onReact={handleReaction}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {!atBottom && messages.length > 0 && (
        <button
          type="button"
          onClick={() => scrollToEnd(true)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold pl-3 pr-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <ChevronDown className="w-4 h-4 text-blue-600" />
          {pendingNew > 0 ? `${pendingNew} new message${pendingNew === 1 ? '' : 's'}` : 'Jump to latest'}
        </button>
      )}
      </div>

      {/* Input bar */}
      {user ? (
        <div className="bg-white/95 backdrop-blur border-t border-gray-200 px-4 sm:px-6 py-3 flex-shrink-0">
          <div className="flex items-end gap-3 max-w-3xl mx-auto">
            <Avatar name={myName} src={myAvatar} size="sm" />
            <div className="flex-1 flex items-end bg-gray-50 border border-gray-200 rounded-3xl px-4 py-2.5 gap-2 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white transition-all shadow-sm">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value); autoResize() }}
                onKeyDown={handleKeyDown}
                placeholder={`Message ${channelLabel}…`}
                maxLength={500}
                rows={1}
                className="flex-1 bg-transparent text-[15px] text-gray-800 placeholder-gray-400 resize-none focus:outline-none leading-relaxed"
                style={{ maxHeight: '120px' }}
              />
              <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors pb-1 flex-shrink-0" aria-label="Attach">
                <Paperclip className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isSending}
              className={`w-12 h-12 text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md transition-all active:scale-95 disabled:opacity-40 disabled:scale-95 ${
                inputValue.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300'
              }`}
            >
              <Send className="w-4 h-4 translate-x-0.5 -translate-y-0.5" />
            </button>
          </div>
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
