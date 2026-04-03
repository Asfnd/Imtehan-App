'use client'

import type { ReactNode } from 'react'
import {
  QuizResultDashboard,
  formatQuizDuration,
  pseudoGlobalStanding,
  quizAccuracyPercent,
  computeCompositeQuizScore,
  quizResultFooterButtonClass,
  quizResultPrimaryCtaClass,
} from './QuizResultDashboard'

export interface QuizResultsImprovement {
  original: number
  current: number
  improved: boolean
  diff: number
}

interface QuizResultsCardProps {
  title?: string
  subtitle: string
  correct: number
  total: number
  timeElapsedSeconds: number
  totalXp?: number
  finalScore?: number
  globalStandingLabel?: string
  improvement?: QuizResultsImprovement | null
  wrongPracticeCount?: number
  onPracticeMistakes?: () => void
  practiceCtaLabel?: string
  footerExtra?: ReactNode
  backLabel: string
  onBack: () => void
  analyticsLabel?: string
  onAnalytics?: () => void
}

export function QuizResultsCard({
  title,
  subtitle,
  correct,
  total,
  timeElapsedSeconds,
  totalXp,
  finalScore: finalScoreProp,
  globalStandingLabel: standingProp,
  improvement,
  wrongPracticeCount = 0,
  onPracticeMistakes,
  practiceCtaLabel,
  footerExtra,
  backLabel,
  onBack,
  analyticsLabel = 'Analytics',
  onAnalytics,
}: QuizResultsCardProps) {
  const percentage = quizAccuracyPercent(correct, total)
  const incorrect = Math.max(0, total - correct)
  const finalScore = finalScoreProp ?? computeCompositeQuizScore(correct, total, totalXp)
  const standing = standingProp ?? pseudoGlobalStanding(correct, total, percentage)
  const timeLabel = formatQuizDuration(timeElapsedSeconds)

  return (
    <QuizResultDashboard
      title={title}
      subtitle={subtitle}
      finalScore={finalScore}
      completionTimeLabel={timeLabel}
      accuracyPercent={percentage}
      globalStandingLabel={standing}
      secondaryFooter={
        <>
          <button type="button" onClick={onBack} className={quizResultFooterButtonClass}>
            {backLabel}
          </button>
          {onAnalytics ? (
            <button type="button" onClick={onAnalytics} className={quizResultFooterButtonClass}>
              {analyticsLabel}
            </button>
          ) : null}
        </>
      }
    >
      {improvement ? (
        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 sm:p-5">
          <p className="mb-3 text-center text-[13px] font-medium text-slate-600">
            {improvement.improved
              ? `First-try accuracy up ${improvement.diff}% vs last run`
              : 'First-try accuracy vs your last run'}
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-lg bg-white p-3 text-center ring-1 ring-slate-100">
              <div className="text-[12px] font-medium text-slate-400">Last run</div>
              <div className="mt-0.5 text-lg font-semibold text-slate-800">{improvement.original}%</div>
            </div>
            <div className="rounded-lg bg-white p-3 text-center ring-1 ring-slate-100">
              <div className="text-[12px] font-medium text-slate-400">This run</div>
              <div className="mt-0.5 text-lg font-semibold text-emerald-700">{improvement.current}%</div>
            </div>
          </div>
        </div>
      ) : null}

      {wrongPracticeCount > 0 && onPracticeMistakes ? (
        <button type="button" onClick={onPracticeMistakes} className={quizResultPrimaryCtaClass}>
          {practiceCtaLabel ??
            `Practice ${wrongPracticeCount} incorrect ${wrongPracticeCount === 1 ? 'question' : 'questions'}`}
        </button>
      ) : null}

      {footerExtra}

      <div className="rounded-xl bg-slate-50 px-4 py-3.5 text-center text-[14px] leading-relaxed text-slate-600 sm:text-[15px]">
        <span className="font-semibold text-slate-800">{correct}</span> right first try
        <span className="mx-2 text-slate-300">·</span>
        <span className="font-semibold text-rose-600">{incorrect}</span> needed another try
        <span className="mx-2 text-slate-300">·</span>
        <span className="text-slate-500">{total} questions</span>
        {totalXp != null ? (
          <>
            <span className="mx-2 text-slate-300">·</span>
            <span className="font-semibold text-slate-800">{totalXp}</span> XP this run
          </>
        ) : null}
      </div>
    </QuizResultDashboard>
  )
}
