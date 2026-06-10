'use client'

import { useMemo, useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react'

interface QuizJourneyPanelProps {
  totalSteps: number
  currentIndex: number
  /** 0-1 path fill (sync with top bar); only grows on correct completions */
  pathProgress: number
  isQuestionSolved?: boolean
  title?: string
  footnote?: string
  className?: string
}

const NODE_COUNT_MAX = 8
const MAP_HEIGHT = 380
const NODE_SIZE = 40
/** Slightly larger than node so the owl sits centered on checkpoints */
const AVATAR_SIZE = 52
const X_OFFSET = 20

export function QuizJourneyPanel({
  totalSteps,
  currentIndex,
  pathProgress,
  isQuestionSolved = false,
  title = 'Your Journey',
  footnote,
  className = '',
}: QuizJourneyPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  /** Geometry for getTotalLength / getPointAtLength: same `d` as visible paths */
  const measurePathRef = useRef<SVGPathElement>(null)
  const [avatarPos, setAvatarPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const [pathLen, setPathLen] = useState(0)

  const displayTotal = useMemo(() => {
    if (totalSteps <= 1) return 1
    return Math.min(Math.max(totalSteps, 3), NODE_COUNT_MAX)
  }, [totalSteps])

  const completedQuestions = Math.min(
    totalSteps,
    currentIndex + (isQuestionSolved ? 1 : 0)
  )
  const allQuestionsDone =
    totalSteps > 0 && currentIndex === totalSteps - 1 && isQuestionSolved

  /** Visual nodes turn green in proportion to completed / total (aligned with path fill). */
  const visualPastThreshold =
    totalSteps <= 1 || displayTotal <= 1
      ? 0
      : (completedQuestions / totalSteps) * (displayTotal - 1)

  const path01 = Math.min(1, Math.max(0, pathProgress))

  const nodePositions = useMemo(() => {
    return Array.from({ length: displayTotal }).map((_, i) => {
      const yRatio = displayTotal <= 1 ? 0 : i / (displayTotal - 1)
      const top = yRatio * (MAP_HEIGHT - NODE_SIZE)
      const xDir = i % 2 === 0 ? -1 : 1
      return { top, xDir, index: i }
    })
  }, [displayTotal])

  const svgPath = useMemo(() => {
    if (nodePositions.length < 2) return ''
    const points = nodePositions.map((n) => ({
      x: 50 + n.xDir * X_OFFSET,
      y: ((n.top + NODE_SIZE / 2) / MAP_HEIGHT) * 100,
    }))

    let d = `M${points[0].x},${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const midY = (prev.y + curr.y) / 2
      d += ` C${prev.x},${midY} ${curr.x},${midY} ${curr.x},${curr.y}`
    }
    return d
  }, [nodePositions])

  const progressRatio = displayTotal <= 1 ? 1 : path01

  const updateAvatarPosition = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const placeOnNode = (visualIndex: number) => {
      const el = container.querySelector(`[data-node="${visualIndex}"]`) as HTMLElement | null
      if (!el) return false
      const cr = container.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      setAvatarPos({
        top: r.top - cr.top + r.height / 2 - AVATAR_SIZE / 2,
        left: r.left - cr.left + r.width / 2 - AVATAR_SIZE / 2,
      })
      return true
    }

    if (!svgPath || displayTotal <= 1) {
      placeOnNode(0)
      return
    }

    const pathEl = measurePathRef.current
    if (!pathEl) return

    const len = pathEl.getTotalLength()
    if (len <= 0) {
      placeOnNode(0)
      return
    }

    const t = Math.min(1, Math.max(0, path01))
    const pt = pathEl.getPointAtLength(len * t)

    const w = container.clientWidth
    const h = container.clientHeight
    setAvatarPos({
      left: (pt.x / 100) * w - AVATAR_SIZE / 2,
      top: (pt.y / 100) * h - AVATAR_SIZE / 2,
    })
  }, [displayTotal, path01, svgPath])

  useLayoutEffect(() => {
    const pathEl = measurePathRef.current
    if (!pathEl || !svgPath) {
      setPathLen(0)
      return
    }
    const len = pathEl.getTotalLength()
    setPathLen(len > 0 ? len : 0)
  }, [svgPath])

  useEffect(() => {
    updateAvatarPosition()
    window.addEventListener('resize', updateAvatarPosition)
    return () => window.removeEventListener('resize', updateAvatarPosition)
  }, [updateAvatarPosition])

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => updateAvatarPosition())
    ro.observe(el)
    return () => ro.disconnect()
  }, [updateAvatarPosition])

  useLayoutEffect(() => {
    updateAvatarPosition()
  }, [updateAvatarPosition, pathLen])

  useEffect(() => {
    const id = requestAnimationFrame(updateAvatarPosition)
    return () => cancelAnimationFrame(id)
  }, [updateAvatarPosition])

  const dashLen = pathLen > 0 ? pathLen : 0
  const dashOffset = dashLen > 0 ? dashLen * (1 - progressRatio) : 0

  return (
    <div className={className}>
      <h3 className="mb-8 text-center text-2xl font-extrabold tracking-wide text-indigo-900">
        {title}
      </h3>

      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-sm"
        style={{ height: MAP_HEIGHT }}
      >
        {svgPath ? (
          <svg
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {/* Invisible geometry: same length as visible paths for owl + dash math */}
            <path
              ref={measurePathRef}
              d={svgPath}
              fill="none"
              stroke="none"
              strokeWidth={0}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={svgPath}
              fill="none"
              stroke="#c7d2fe"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />
            {dashLen > 0 && progressRatio > 0 ? (
              <path
                d={svgPath}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={`${dashLen} ${dashLen}`}
                strokeDashoffset={dashOffset}
                style={{
                  transition:
                    'stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1) 120ms',
                }}
              />
            ) : null}
          </svg>
        ) : null}

        <div className="absolute inset-0 z-10">
          {nodePositions.map(({ top, xDir, index: i }) => {
            const isPast =
              allQuestionsDone ||
              (displayTotal <= 1
                ? completedQuestions > 0
                : i < visualPastThreshold - 1e-9)

            return (
              <div
                key={i}
                data-node={i}
                className="absolute left-1/2"
                style={{
                  top,
                  transform: `translateX(calc(-50% + ${xDir * X_OFFSET}px))`,
                  transition: 'transform 0.5s ease, top 0.5s ease',
                }}
              >
                <div
                  className={[
                    'flex h-10 w-10 items-center justify-center rounded-full border-4 border-white shadow-md transition-all duration-500',
                    isPast
                      ? 'scale-100 bg-emerald-400 text-white'
                      : 'bg-slate-200 text-slate-400',
                  ].join(' ')}
                >
                  {isPast ? (
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 opacity-50" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )}
                </div>
              </div>
            )
          })}

          <div
            className="pointer-events-none absolute z-30 transition-[top,left] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[top,left]"
            style={{
              top: avatarPos.top,
              left: avatarPos.left,
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
            }}
          >
            <div className="flex h-full w-full items-center justify-center rounded-full border-[3px] border-indigo-500 bg-white shadow-[0_6px_22px_rgba(79,70,229,0.38)] ring-4 ring-indigo-400/20">
              <span className="select-none text-[26px] leading-none" aria-hidden>
                🦉
              </span>
            </div>
          </div>
        </div>
      </div>

      {footnote && (
        <div className="mt-2 w-full px-4 text-center">
          <div className="inline-block rounded-2xl border border-white/50 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
            <p className="text-lg font-bold text-indigo-800">{footnote}</p>
          </div>
        </div>
      )}
    </div>
  )
}
