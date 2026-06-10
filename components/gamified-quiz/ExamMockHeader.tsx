'use client'

import { Clock, Pause, Play } from 'lucide-react'

export interface ExamMockHeaderProps {
  onExit: () => void
  /** 0-100, typically (currentIndex + 1) / total * 100 */
  progressPct: number
  /** e.g. "12 / 180" */
  progressLabel: string
  /** Optional second line, e.g. "45 answered · 135 left" */
  metaLine?: string
  timeLeftSeconds: number
  totalDurationSeconds: number
  /** When true, timer area shows answered count instead (e.g. review practice) */
  reviewMeta?: string | null
  /** Called when user clicks pause/resume */
  onPause?: () => void
  isPaused?: boolean
}

function formatCountdown(s: number): string {
  const t = Math.max(0, Math.floor(s))
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const sec = t % 60
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function ExamMockHeader({
  onExit,
  progressPct,
  progressLabel,
  metaLine,
  timeLeftSeconds,
  totalDurationSeconds,
  reviewMeta,
  onPause,
  isPaused = false,
}: ExamMockHeaderProps) {
  const pct = Math.min(100, Math.max(0, progressPct))
  const timeRatio = totalDurationSeconds > 0 ? timeLeftSeconds / totalDurationSeconds : 1
  const timerClass =
    reviewMeta != null
      ? 'text-slate-500'
      : timeRatio > 0.5
        ? 'text-emerald-700'
        : timeRatio > 0.2
          ? 'text-amber-600'
          : 'text-rose-600'

  const showSecondRow = !!(onPause || metaLine)

  return (
    <header className="flex w-full shrink-0 flex-col gap-1.5 border-b border-slate-100 bg-white px-3 py-2.5 sm:px-5 sm:py-3">
      {/* Row 1: exit · progress · timer */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onExit}
          className="-ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 sm:h-11 sm:w-11"
          aria-label="Exit test"
        >
          <span className="text-[1.65rem] leading-none sm:text-[1.75rem]">×</span>
        </button>
        <span
          className="shrink-0 pt-0.5 text-xs font-bold tabular-nums tracking-wide text-slate-500 sm:text-sm sm:text-slate-600"
          aria-live="polite"
        >
          {progressLabel}
        </span>
        <div className="min-w-0 flex-1">
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200/80 sm:h-3.5">
            <div
              className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600 transition-transform duration-500 ease-out"
              style={{ transform: `scaleX(${pct / 100})` }}
              aria-hidden
            />
          </div>
        </div>
        {reviewMeta != null ? (
          <div className="shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-center text-xs font-semibold text-slate-600 sm:px-3 sm:text-sm">
            {reviewMeta}
          </div>
        ) : (
          <div
            className={`flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-xs font-bold tabular-nums sm:gap-2 sm:px-3 sm:text-sm ${timerClass} ${timeRatio <= 0.2 ? 'animate-pulse border-rose-200 bg-rose-50/80' : ''}`}
          >
            <Clock className="h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem]" aria-hidden />
            <span>{formatCountdown(timeLeftSeconds)}</span>
          </div>
        )}
      </div>

      {/* Row 2: meta text (left) + pause button (centered, absolute) */}
      {showSecondRow && (
        <div className="relative flex min-h-[1.625rem] items-center">
          {metaLine && (
            <p className="pl-9 text-xs font-medium text-slate-400 sm:pl-11 sm:text-sm">
              {metaLine}
            </p>
          )}
          {onPause && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={onPause}
                aria-label={isPaused ? 'Resume test' : 'Pause test'}
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md active:scale-[0.97]"
              >
                {isPaused ? (
                  <Play className="h-3.5 w-3.5 shrink-0 fill-current" />
                ) : (
                  <Pause className="h-3.5 w-3.5 shrink-0" />
                )}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
