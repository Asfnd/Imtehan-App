'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export const WHATSAPP_REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🙏'] as const

type ReactionChip = { emoji: string; count: number; mine: boolean }

type Props = {
  message: string
  isOwn: boolean
  messageId: number
  reactions: ReactionChip[]
  loggedIn: boolean
  onReact: (msgId: number, emoji: string) => void
}

function groupedReactions(reactions: ReactionChip[]) {
  return reactions.filter((r) => r.count > 0)
}

export function WhatsAppMessageBubble({ message, isOwn, messageId, reactions, loggedIn, onReact }: Props) {
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
    longTimer.current = setTimeout(openPicker, 420)
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

  const chips = groupedReactions(reactions)
  const barWidth = WHATSAPP_REACTIONS.length * 44 + 52
  const barLeft = anchor ? Math.min(Math.max(12, anchor.left + anchor.width / 2 - barWidth / 2), window.innerWidth - barWidth - 12) : 0

  return (
    <div className={`relative max-w-xl ${isOwn ? 'ml-auto' : ''}`}>
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
        className={`rounded-2xl px-4 py-3 shadow-sm select-none touch-none transition-transform ${
          isOwn ? 'bg-blue-600 rounded-tr-sm text-white' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
        } ${pickerOpen ? 'scale-[1.02] ring-2 ring-blue-200' : ''}`}
      >
        <p className="text-sm leading-relaxed break-words">{message}</p>
      </div>

      {chips.length > 0 && (
        <div className={`absolute -bottom-2 flex flex-wrap gap-1 ${isOwn ? 'right-2' : 'left-2'}`}>
          {chips.map(({ emoji, count, mine }) => (
            <button
              key={emoji}
              type="button"
              onClick={() => loggedIn && onReact(messageId, emoji)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border shadow-sm transition-transform hover:scale-105 ${
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
          <div className="fixed inset-0 z-40 bg-black/30" onClick={closePicker} aria-hidden />
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
                className={`w-11 h-11 flex items-center justify-center rounded-full text-2xl transition-transform ${
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
