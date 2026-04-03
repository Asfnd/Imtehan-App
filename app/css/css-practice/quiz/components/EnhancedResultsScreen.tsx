'use client'

import { useEffect, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { soundManager } from '@/lib/sounds/soundManager'
import {
  QuizResultDashboard,
  formatQuizDuration,
  pseudoGlobalStanding,
  quizAccuracyPercent,
  computeCompositeQuizScore,
  quizResultFooterButtonClass,
  quizResultPrimaryCtaClass,
} from '@/components/gamified-quiz'

interface EnhancedResultsScreenProps {
  score: number
  total: number
  maxStreak: number
  totalPoints: number
  wrongQuestionIds: number[]
  onRestart: () => void
  onPracticeMistakes: () => void
  onExit: () => void
  reviewMode?: boolean
  originalScore?: { correct: number; total: number } | null
  quizDurationSeconds: number
}

export function EnhancedResultsScreen({
  score,
  total,
  maxStreak,
  totalPoints,
  wrongQuestionIds,
  onRestart,
  onPracticeMistakes,
  onExit,
  reviewMode = false,
  originalScore = null,
  quizDurationSeconds,
}: EnhancedResultsScreenProps) {
  const [mounted, setMounted] = useState(false)
  const percentage = quizAccuracyPercent(score, total)
  const wrongCount = wrongQuestionIds.length
  const missedOnFirstTry = Math.max(0, total - score)

  const improvement =
    reviewMode && originalScore
      ? (() => {
          const beforePct = quizAccuracyPercent(originalScore.correct, originalScore.total)
          return {
            originalPercentage: beforePct,
            newPercentage: percentage,
            improved: percentage > beforePct,
            difference: percentage - beforePct,
          }
        })()
      : null

  const finalScore = computeCompositeQuizScore(score, total, totalPoints)

  useEffect(() => {
    setMounted(true)
    if (percentage >= 70) {
      setTimeout(() => soundManager.play('correct'), 100)
    }
    if (maxStreak >= 5) {
      setTimeout(() => soundManager.play('streakMilestone'), 400)
    }
  }, [maxStreak, percentage])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#ececee]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-300 border-t-slate-800" />
      </div>
    )
  }

  const subtitleParts = [
    reviewMode ? 'Review session' : 'CSS practice',
    `${total} questions`,
    maxStreak > 0 ? `Best streak ${maxStreak}×` : null,
  ].filter(Boolean)

  return (
    <QuizResultDashboard
      title={reviewMode ? 'Practice complete' : 'Nice work'}
      subtitle={subtitleParts.join(' · ')}
      finalScore={finalScore}
      completionTimeLabel={formatQuizDuration(quizDurationSeconds)}
      accuracyPercent={percentage}
      globalStandingLabel={pseudoGlobalStanding(score, total, percentage)}
      secondaryFooter={
        <>
          <button type="button" onClick={onRestart} className={quizResultFooterButtonClass}>
            <RotateCcw className="h-4 w-4 opacity-70" aria-hidden />
            Try again
          </button>
          <button type="button" onClick={onExit} className={quizResultFooterButtonClass}>
            Exit
          </button>
        </>
      }
    >
      {improvement ? (
        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 sm:p-5">
          <p className="mb-3 text-center text-[13px] font-medium text-slate-600">
            {improvement.improved
              ? `First-try accuracy up ${improvement.difference}% vs last run`
              : 'First-try accuracy vs your last run'}
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-lg bg-white p-3 text-center ring-1 ring-slate-100">
              <div className="text-[12px] font-medium text-slate-400">Last run</div>
              <div className="mt-0.5 text-lg font-semibold text-slate-800">
                {improvement.originalPercentage}%
              </div>
            </div>
            <div className="rounded-lg bg-white p-3 text-center ring-1 ring-slate-100">
              <div className="text-[12px] font-medium text-slate-400">This run</div>
              <div className="mt-0.5 text-lg font-semibold text-emerald-700">
                {improvement.newPercentage}%
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {wrongCount > 0 && !reviewMode ? (
        <button type="button" onClick={onPracticeMistakes} className={quizResultPrimaryCtaClass}>
          Practice {wrongCount} missed {wrongCount === 1 ? 'question' : 'questions'}
        </button>
      ) : null}

      <div className="rounded-xl bg-slate-50 px-4 py-3.5 text-center text-[14px] leading-relaxed text-slate-600 sm:text-[15px]">
        <span className="font-semibold text-slate-800">{score}</span> right first try
        <span className="mx-2 text-slate-300">·</span>
        <span className="font-semibold text-rose-600">{missedOnFirstTry}</span> needed another try
        <span className="mx-2 text-slate-300">·</span>
        <span className="font-semibold text-slate-800">{totalPoints}</span> XP this run
      </div>
    </QuizResultDashboard>
  )
}
