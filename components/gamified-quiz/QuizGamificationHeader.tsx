'use client'

import type { ReactNode } from 'react'
import { Flame, Zap } from 'lucide-react'

interface QuizGamificationHeaderProps {
  progressPct: number
  streak: number
  totalXp: number
  lastXpGain?: number | null
  showXpPop?: boolean
  onExit?: () => void
  exitLabel?: string
  centerLabel?: string
  endSlot?: ReactNode
  className?: string
  /** e.g. "3 / 20" for alignment with bar */
  progressLabel?: string
}

export function QuizGamificationHeader({
  progressPct,
  streak,
  totalXp,
  lastXpGain,
  showXpPop,
  onExit,
  className = '',
  endSlot,
  progressLabel,
}: QuizGamificationHeaderProps) {
  const pct = Math.min(100, Math.max(0, progressPct))

  return (
    <header
      className={`flex w-full items-center gap-1.5 bg-white py-2 sm:gap-3 sm:py-3.5 ${className}`}
    >
      {onExit ? (
        <button
          type="button"
          onClick={onExit}
          className="-ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 sm:-ml-2 sm:h-10 sm:w-10"
          aria-label="Close quiz"
        >
          <span className="text-2xl leading-none">×</span>
        </button>
      ) : (
        <span className="w-9 shrink-0 sm:w-10" />
      )}

      {progressLabel ? (
        <span
          className="shrink-0 pt-0.5 text-[10px] font-semibold tabular-nums tracking-wide text-slate-400 sm:text-[11px]"
          aria-label="Question progress"
        >
          {progressLabel}
        </span>
      ) : null}

      <div className="min-w-0 flex-1">
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100/90 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70 sm:h-3.5">
          <div
            className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{ transform: `scaleX(${pct / 100})` }}
            aria-hidden
          >
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
            <div className="pointer-events-none absolute inset-0 w-full rounded-full bg-white/15 -skew-x-12 animate-[shimmer_2.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 font-bold sm:gap-3">
        <div
          className="relative flex items-center gap-0.5 rounded-lg border border-orange-100 bg-orange-50 px-2 py-1 text-orange-500 sm:gap-1 sm:rounded-xl sm:px-3 sm:py-1.5"
          title="Streak"
        >
          <Flame className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
          <span className="min-w-[1rem] text-xs tabular-nums sm:text-sm">{streak}</span>
          {showXpPop && lastXpGain != null && lastXpGain > 0 && streak > 1 && (
            <span className="absolute -top-5 right-0 animate-float-up pointer-events-none whitespace-nowrap text-sm font-bold text-orange-500">
              +1
            </span>
          )}
        </div>

        <div
          className="relative flex items-center gap-0.5 rounded-lg border border-indigo-100 bg-indigo-50 px-2 py-1 text-indigo-600 sm:gap-1 sm:rounded-xl sm:px-3 sm:py-1.5"
          title="Experience points"
        >
          <Zap className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
          <span className="text-xs tabular-nums sm:text-sm">{totalXp}</span>
          {showXpPop && lastXpGain != null && lastXpGain > 0 && (
            <span className="absolute -top-5 right-0 animate-float-up pointer-events-none whitespace-nowrap text-sm font-bold text-indigo-500">
              +{lastXpGain} XP
            </span>
          )}
        </div>

        {endSlot}
      </div>
    </header>
  )
}
