'use client'

import { useEffect, useRef, useState } from 'react'
import { markCompleted, useCompletions } from '@/lib/completion'
import { NOTES_READ_DONE, NOTES_READ_SCOPE } from '@/lib/notes/reading-progress'

function clampPct(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)))
}

function articleScrollPct(): number {
  const article = document.querySelector<HTMLElement>('article.article-body')
  if (!article) return 0
  const top = article.getBoundingClientRect().top + window.scrollY
  const height = article.offsetHeight
  if (height < 80) return 0
  const seen = window.scrollY + window.innerHeight - top
  return clampPct((seen / height) * 100)
}

export function NoteReadingProgress({ item }: { item: string }) {
  const savedMap = useCompletions(NOTES_READ_SCOPE)
  const saved = savedMap[item] ?? 0
  const [live, setLive] = useState(0)
  const lastWritten = useRef(saved)
  const lastSaveAt = useRef(0)

  useEffect(() => {
    lastWritten.current = Math.max(lastWritten.current, saved)
  }, [saved])

  useEffect(() => {
    if (!item) return
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const pct = articleScrollPct()
        setLive(pct)
        const best = Math.max(lastWritten.current, pct)
        const now = Date.now()
        const jumped = best >= NOTES_READ_DONE && lastWritten.current < NOTES_READ_DONE
        if (best > lastWritten.current && (jumped || best - lastWritten.current >= 3 || now - lastSaveAt.current > 2500)) {
          lastWritten.current = best
          lastSaveAt.current = now
          markCompleted(NOTES_READ_SCOPE, item, best)
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
      const finalPct = Math.max(lastWritten.current, articleScrollPct())
      if (finalPct > (savedMap[item] ?? 0)) markCompleted(NOTES_READ_SCOPE, item, finalPct)
    }
    // savedMap is read on unmount only; item is the identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  const pct = Math.max(saved, live)
  const done = pct >= NOTES_READ_DONE

  return (
    <div
      className={`note-read-bar${done ? ' is-done' : ''}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={done ? 'Notes kit finished' : 'Notes reading progress'}
    >
      <div className="note-read-bar-fill" style={{ transform: `scaleX(${pct / 100})` }} />
    </div>
  )
}
