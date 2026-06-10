'use client'

import type { ReactNode } from 'react'
import { Star, Clock, CircleCheck, Trophy } from 'lucide-react'

export const quizResultFooterButtonClass =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-slate-200/90 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-px hover:border-slate-300 hover:bg-slate-50/95 hover:shadow-md active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 focus-visible:ring-offset-2'

export const quizResultPrimaryCtaClass =
  'w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_8px_28px_-10px_rgba(234,88,12,0.55)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-10px_rgba(234,88,12,0.5)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/45 focus-visible:ring-offset-2'

export function formatQuizDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2, '0')}`
}

/** Rounded percent correct (e.g. first-try score ÷ question count). */
export function quizAccuracyPercent(correct: number, total: number): number {
  if (total <= 0) return 0
  return Math.round((correct / total) * 100)
}

const COMPOSITE_SCORE_MAX = 1000
const COMPOSITE_XP_CAP = 500
const COMPOSITE_XP_WEIGHT = 0.35

/**
 * Single source of truth: blends first-try accuracy (50-1000 band from accuracy alone)
 * with a capped XP contribution. Same formula everywhere results are shown.
 */
export function computeCompositeQuizScore(
  correct: number,
  total: number,
  totalXp: number | undefined
): number {
  if (total <= 0) return 0
  const pct = correct / total
  const base = Math.round(pct * 950 + 50)
  const xpBoost =
    totalXp != null ? Math.round(Math.min(totalXp, COMPOSITE_XP_CAP) * COMPOSITE_XP_WEIGHT) : 0
  return Math.min(COMPOSITE_SCORE_MAX, base + xpBoost)
}

/** Decorative standing when no real leaderboard exists */
export function pseudoGlobalStanding(correct: number, total: number, percentage: number): string {
  const seed = (correct * 47 + total * 19 + percentage * 3) % 42
  const rank = 8 + seed
  return `#${rank}`
}

interface MetricCardProps {
  eyebrow: string
  icon: ReactNode
  value: string
  label?: string
  className: string
  animationDelayMs: number
}

function MetricCard({
  eyebrow,
  icon,
  value,
  label,
  className,
  animationDelayMs,
}: MetricCardProps) {
  return (
    <div
      className={`quiz-results-metric-animate flex flex-col rounded-2xl p-5 sm:p-6 ${
        label ? 'min-h-[136px] sm:min-h-[152px]' : 'min-h-[118px] sm:min-h-[132px]'
      } ${className}`}
      style={{ animationDelay: `${animationDelayMs}ms` }}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="text-[11px] font-medium tracking-wide text-slate-700/80">{eyebrow}</span>
        <div className="shrink-0 text-slate-800/90 [&_svg]:h-[18px] [&_svg]:w-[18px] sm:[&_svg]:h-5 sm:[&_svg]:w-5">
          {icon}
        </div>
      </div>
      <div className="mt-auto">
        <div className="text-[1.95rem] font-semibold leading-none tracking-tight text-slate-900 sm:text-[2.35rem]">
          {value}
        </div>
        {label ? (
          <div className="mt-2.5 text-[12px] font-medium leading-snug tracking-wide text-slate-600/95">
            {label}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export interface QuizResultDashboardProps {
  title?: string
  subtitle?: string
  finalScore: number
  completionTimeLabel: string
  accuracyPercent: number
  globalStandingLabel: string
  children?: ReactNode
  secondaryFooter?: ReactNode
}

export function QuizResultDashboard({
  title = 'Your results',
  subtitle,
  finalScore,
  completionTimeLabel,
  accuracyPercent,
  globalStandingLabel,
  children,
  secondaryFooter,
}: QuizResultDashboardProps) {
  return (
    <div className="min-h-screen bg-[#ececee] px-4 py-12 sm:px-6 sm:py-16">
      <div className="relative mx-auto w-full max-w-[640px]">
        <div className="quiz-results-shell-animate rounded-[24px] bg-white px-5 py-8 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/[0.04] sm:rounded-[28px] sm:px-9 sm:py-10">
          <header className="mb-8 sm:mb-9">
            <h1 className="text-[1.65rem] font-semibold tracking-tight text-slate-900 sm:text-[1.85rem]">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-slate-500 sm:text-base">
                {subtitle}
              </p>
            ) : null}
          </header>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <MetricCard
              eyebrow="Score"
              icon={<Star className="stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round" />}
              value={String(finalScore)}
              label={`Up to ${COMPOSITE_SCORE_MAX} · accuracy + XP`}
              className="bg-[#c5ebe7]"
              animationDelayMs={70}
            />
            <MetricCard
              eyebrow="Time"
              icon={<Clock className="stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round" />}
              value={completionTimeLabel}
              label="How long you took"
              className="bg-[#fde047]/90"
              animationDelayMs={120}
            />
            <MetricCard
              eyebrow="Accuracy"
              icon={<CircleCheck className="stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round" />}
              value={`${accuracyPercent}%`}
              label="Right on first try"
              className="bg-[#e9d5ff]"
              animationDelayMs={170}
            />
            <MetricCard
              eyebrow="Standing"
              icon={<Trophy className="stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round" />}
              value={globalStandingLabel}
              className="bg-[#d4f87c]"
              animationDelayMs={220}
            />
          </div>

          {children ? (
            <div className="quiz-results-children-animate mt-7 space-y-3 sm:mt-8">{children}</div>
          ) : null}
        </div>
      </div>
      {secondaryFooter ? (
        <div className="quiz-results-secondary-footer-animate mx-auto mt-6 flex w-full max-w-[640px] flex-wrap items-center justify-center gap-3 px-2 sm:mt-8">
          {secondaryFooter}
        </div>
      ) : null}
    </div>
  )
}
