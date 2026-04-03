'use client'

import { Check, X } from 'lucide-react'
import { useState, useEffect, memo } from 'react'

export type AnswerOptionAppearance =
  | 'default'
  | 'wrong'
  | 'correct'
  | 'dimmed'

const FLOW_OPTION: Record<AnswerOptionAppearance, string> = {
  default: 'btn-3d border-slate-200 bg-white cursor-pointer group',
  wrong: 'btn-3d incorrect cursor-default',
  correct: 'btn-3d correct cursor-default',
  dimmed: 'btn-3d dimmed cursor-default',
}

const FLOW_BADGE: Record<AnswerOptionAppearance, string> = {
  default: 'border-slate-200 text-slate-400 bg-slate-50 group-hover:border-indigo-300 group-hover:text-indigo-500',
  wrong: 'border-rose-300 bg-rose-100 text-rose-600',
  correct: 'border-emerald-400 bg-emerald-100 text-emerald-700',
  dimmed: 'border-slate-100 text-slate-300 bg-slate-50',
}

interface AnswerOptionProps {
  label: string
  text: string
  /** When set, styling follows check-flow states (overrides legacy flags below). */
  appearance?: AnswerOptionAppearance
  isSelected: boolean
  isCorrect: boolean
  isRevealed: boolean
  isWrong?: boolean
  showCorrectAnswer?: boolean
  onSelect: () => void
  disabled: boolean
  explanation?: string
}

export const AnswerOption = memo(function AnswerOption({
  label,
  text,
  appearance,
  isSelected,
  isCorrect,
  isRevealed,
  isWrong = false,
  showCorrectAnswer = false,
  onSelect,
  disabled,
}: AnswerOptionProps) {
  const [showShake, setShowShake] = useState(false)
  const showCorrectState = isCorrect && (isRevealed || showCorrectAnswer)
  const showIncorrect = isWrong || (isSelected && !isCorrect)
  const isDimmed = disabled && !showCorrectState && !showIncorrect

  useEffect(() => {
    if (appearance === 'wrong' || showIncorrect) {
      setShowShake(true)
      const timer = setTimeout(() => setShowShake(false), 500)
      return () => clearTimeout(timer)
    }
  }, [appearance, showIncorrect])

  if (appearance) {
    const showIcons = appearance === 'correct' || appearance === 'wrong'
    return (
      <button
        type="button"
        onClick={onSelect}
        disabled={disabled}
        className={`group relative flex min-h-[48px] w-full items-center gap-3 overflow-hidden rounded-xl border-2 p-3 text-left text-base font-semibold text-slate-700 sm:gap-4 sm:rounded-2xl sm:p-4 sm:text-lg sm:font-bold ${FLOW_OPTION[appearance]} ${disabled ? 'cursor-default' : 'cursor-pointer'} ${showShake ? 'animate-shake' : ''}`}
      >
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 text-sm transition-colors sm:rounded-lg ${FLOW_BADGE[appearance]}`}>
          {showIcons && appearance === 'correct' ? (
            <Check className="h-4 w-4" strokeWidth={3} />
          ) : showIcons && appearance === 'wrong' ? (
            <X className="h-4 w-4" strokeWidth={3} />
          ) : (
            label
          )}
        </div>
        <span className="min-w-0 flex-1 leading-snug">{text}</span>
      </button>
    )
  }

  const btnClasses = () => {
    const base =
      'btn-3d group relative flex min-h-[48px] w-full items-center gap-3 overflow-hidden rounded-xl border-2 p-3 text-left text-base font-semibold text-slate-700 sm:gap-4 sm:rounded-2xl sm:p-4 sm:text-lg sm:font-bold'
    if (showCorrectState) return `${base} correct`
    if (showIncorrect) return `${base} incorrect`
    if (isDimmed) return `${base} dimmed`
    return base
  }

  const badgeClasses = () => {
    const base =
      'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 text-sm transition-colors sm:rounded-lg'
    if (showCorrectState) return `${base} border-emerald-400 bg-emerald-100 text-emerald-700`
    if (showIncorrect) return `${base} border-rose-300 bg-rose-100 text-rose-600`
    if (isDimmed) return `${base} border-slate-100 text-slate-300 bg-slate-50`
    return `${base} border-slate-200 text-slate-400 bg-slate-50 group-hover:border-indigo-300 group-hover:text-indigo-500`
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`${btnClasses()} ${disabled ? 'cursor-default' : 'cursor-pointer'} ${showShake ? 'animate-shake' : ''}`}
    >
      <div className={badgeClasses()}>
        {showCorrectState ? (
          <Check className="h-4 w-4" strokeWidth={3} />
        ) : showIncorrect ? (
          <X className="h-4 w-4" strokeWidth={3} />
        ) : (
          label
        )}
      </div>
      <span className="min-w-0 flex-1 leading-snug">{text}</span>
    </button>
  )
})
