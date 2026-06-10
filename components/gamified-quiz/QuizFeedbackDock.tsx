'use client'

import { Check, X } from 'lucide-react'

export type QuizDockPhase = 'hidden' | 'wrong' | 'correct'

interface QuizFeedbackDockProps {
  phase: QuizDockPhase
  /** Correct / Continue flow */
  correct?: boolean
  title?: string
  subtitle?: string
  continueLabel?: string
  onContinue?: () => void
  isLastStep?: boolean
  /** Wrong attempt (optional); omit for Khan-style (pick another option immediately) */
  onTryAgain?: () => void
}

export function QuizFeedbackDock({
  phase,
  correct = false,
  title = '',
  subtitle,
  continueLabel = 'Continue',
  onContinue,
  isLastStep = false,
  onTryAgain,
}: QuizFeedbackDockProps) {
  if (phase === 'hidden') return null

  if (phase === 'wrong') {
    return (
      <div
        className="fixed inset-x-0 bottom-0 z-[100] border-t-2 border-rose-200 bg-rose-50 px-4 py-5 sm:px-6 shadow-[0_-10px_30px_rgba(244,63,94,0.12)] slide-up"
        role="status"
        aria-live="polite"
      >
        <div
          className={`mx-auto flex max-w-2xl flex-col gap-4 ${onTryAgain ? 'sm:flex-row sm:items-center sm:justify-between' : ''}`}
        >
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-rose-500 shadow-sm">
              <X className="h-6 w-6" strokeWidth={3} />
            </div>
            <div className="min-w-0 text-left">
              <h2 className="text-xl font-extrabold text-rose-900 sm:text-2xl">
                {title || 'Not quite. Try another option'}
              </h2>
              {subtitle && (
                <p className="mt-1 text-sm font-medium text-rose-700 sm:text-base">{subtitle}</p>
              )}
            </div>
          </div>
          {onTryAgain && (
            <button
              type="button"
              onClick={onTryAgain}
              className="shrink-0 rounded-2xl bg-rose-500 px-8 py-3 text-lg font-bold text-white shadow-[0_4px_0_0_#be123c] transition active:translate-y-1 active:shadow-none sm:min-w-[140px]"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    )
  }

  // correct
  const isCorrect = correct
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[100] border-t-2 px-4 py-6 sm:px-6 ${
        isCorrect
          ? 'border-emerald-200 bg-emerald-50 shadow-[0_-10px_30px_rgba(16,185,129,0.1)]'
          : 'border-rose-200 bg-rose-50 shadow-[0_-10px_30px_rgba(244,63,94,0.1)]'
      } slide-up`}
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm ${
                isCorrect ? 'text-emerald-500' : 'text-rose-500'
              }`}
            >
              {isCorrect ? <Check className="h-6 w-6" strokeWidth={3} /> : <X className="h-6 w-6" strokeWidth={3} />}
            </div>
            <h2 className={`text-2xl font-extrabold ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className={`text-sm font-medium sm:text-base ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
              {subtitle}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onContinue}
          className={`w-full shrink-0 rounded-2xl px-8 py-3 text-lg font-bold text-white transition active:translate-y-1 sm:w-auto ${
            isCorrect
              ? 'bg-emerald-500 shadow-[0_4px_0_0_#059669] active:shadow-[0_0_0_0_#059669]'
              : 'bg-rose-500 shadow-[0_4px_0_0_#e11d48] active:shadow-[0_0_0_0_#e11d48]'
          }`}
        >
          {isLastStep ? 'Finish' : continueLabel}
        </button>
      </div>
    </div>
  )
}
