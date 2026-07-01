'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { bubbleRadiusClass, formatMessageTime, type MessageGroupPos } from '@/lib/community-chat-utils'

export const WHATSAPP_REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🙏', '👏', '🔥'] as const

type ReactionChip = { emoji: string; count: number; mine: boolean }

type Props = {
  message: string
  isOwn: boolean
  messageId: number
  group?: MessageGroupPos
  createdAt?: string
  showInlineTime?: boolean
  reactions: ReactionChip[]
  loggedIn: boolean
  onReact: (msgId: number, emoji: string) => void
}

export function WhatsAppMessageBubble({
  message,
  isOwn,
  messageId,
  group = 'single',
  createdAt,
  showInlineTime = true,
  reactions,
  loggedIn,
  onReact,
}: Props) {
  const bubbleRef = useRef<HTMLDivElement>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [anchor, setAnchor] = useState<{ top: number; left: number; width: number } | null>(null)
  const [hoverIdx, setHoverIdx] = useState(-1)
  const longTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const picking = useRef(false)
  const lastTap = useRef(0)

  const clearTimer = () => {
    if (longTimer.current) {
      clearTimeout(longTimer.current)
      longTimer.current = null
    }
  }

  const openPicker = useCallback(() => {
    if (!loggedIn || !bubbleRef.current) return
    const rect = bubbleRef.current.getBoundingClientRect()
    setAnchor({ top: rect.top, left: rect.left, width: rect.width })
    setPickerOpen(true)
    picking.current = true
    if (navigator.vibrate) navigator.vibrate(12)
  }, [loggedIn])

  const closePicker = useCallback(() => {
    setPickerOpen(false)
    setAnchor(null)
    setHoverIdx(-1)
    picking.current = false
  }, [])

  const pick = (emoji: string) => {
    onReact(messageId, emoji)
    closePicker()
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (!loggedIn || e.button !== 0) return
    clearTimer()
    longTimer.current = setTimeout(openPicker, 400)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pickerOpen || !anchor) return
    const bar = document.getElementById(`rxn-bar-${messageId}`)
    if (!bar) return
    const rect = bar.getBoundingClientRect()
    const rel = e.clientX - rect.left
    const idx = Math.floor(rel / 44)
    const next = idx >= 0 && idx < WHATSAPP_REACTIONS.length ? idx : -1
    if (next !== hoverIdx) setHoverIdx(next)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    clearTimer()
    if (pickerOpen) {
      if (hoverIdx >= 0) pick(WHATSAPP_REACTIONS[hoverIdx])
      else closePicker()
      return
    }
    const now = Date.now()
    if (now - lastTap.current < 300) pick('❤️')
    lastTap.current = now
  }

  useEffect(() => {
    if (!pickerOpen) return
    const onDoc = (ev: MouseEvent) => {
      const bar = document.getElementById(`rxn-bar-${messageId}`)
      if (bar && !bar.contains(ev.target as Node) && bubbleRef.current && !bubbleRef.current.contains(ev.target as Node)) {
        closePicker()
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [pickerOpen, messageId, closePicker])

  const chips = reactions.filter((r) => r.count > 0)
  const barWidth = WHATSAPP_REACTIONS.length * 44 + 52
  const barLeft = anchor ? Math.min(Math.max(12, anchor.left + anchor.width / 2 - barWidth / 2), window.innerWidth - barWidth - 12) : 0
  const radius = bubbleRadiusClass(isOwn, group)
  const timeStr = createdAt && showInlineTime ? formatMessageTime(createdAt) : ''

  return (
    <div className={`relative max-w-[min(100%,28rem)] ${isOwn ? 'ml-auto' : ''}`}>
      <div
        ref={bubbleRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={clearTimer}
        onContextMenu={(e) => {
          if (!loggedIn) return
          e.preventDefault()
          openPicker()
        }}
        className={`relative px-3.5 py-2.5 shadow-sm select-none touch-none transition-all duration-150 ${radius} ${
          isOwn
            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
            : 'bg-white border border-gray-200/90 text-gray-800'
        } ${pickerOpen ? 'scale-[1.02] ring-2 ring-blue-300/60 shadow-md' : 'hover:shadow-md'}`}
      >
        <p className={`text-[15px] leading-relaxed break-words ${timeStr ? 'pr-12' : ''}`}>{message}</p>
        {timeStr && (
          <span
            className={`absolute bottom-1.5 right-2.5 text-[10px] font-semibold tabular-nums ${
              isOwn ? 'text-white/70' : 'text-gray-400'
            }`}
          >
            {timeStr}
          </span>
        )}
      </div>

      {chips.length > 0 && (
        <div className={`absolute -bottom-2.5 flex flex-wrap gap-1 ${isOwn ? 'right-2' : 'left-2'}`}>
          {chips.map(({ emoji, count, mine }) => (
            <button
              key={emoji}
              type="button"
              onClick={() => loggedIn && onReact(messageId, emoji)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border shadow-sm transition-all hover:scale-105 active:scale-95 ${
                mine ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-200 text-gray-600'
              }`}
            >
              <span>{emoji}</span>
              {count > 1 && <span className="font-semibold">{count}</span>}
            </button>
          ))}
        </div>
      )}

      {pickerOpen && anchor && (
        <>
          <div className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[1px]" onClick={closePicker} aria-hidden />
          <div
            id={`rxn-bar-${messageId}`}
            className="fixed z-50 flex items-center gap-0.5 bg-white border border-gray-200 rounded-full shadow-2xl px-2 py-1.5 animate-in fade-in zoom-in-95 duration-150"
            style={{ top: Math.max(72, anchor.top - 58), left: barLeft, width: barWidth }}
          >
            {WHATSAPP_REACTIONS.map((emoji, i) => (
              <button
                key={emoji}
                type="button"
                onClick={() => pick(emoji)}
                className={`w-11 h-11 flex items-center justify-center rounded-full text-2xl transition-transform duration-150 ${
                  hoverIdx === i ? 'scale-125 bg-blue-50' : 'hover:bg-gray-100 hover:scale-110'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
