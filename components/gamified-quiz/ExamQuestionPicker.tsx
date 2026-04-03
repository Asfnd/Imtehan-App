'use client'

import { LayoutGrid, X } from 'lucide-react'

export interface ExamQuestionPickerModalProps {
  open: boolean
  onClose: () => void
  total: number
  currentIndex: number
  answeredIndices: Set<number>
  onJump: (index: number) => void
  /** MDCAT-style flags */
  flaggedIndices?: Set<number>
}

export function ExamQuestionPickerModal({
  open,
  onClose,
  total,
  currentIndex,
  answeredIndices,
  onJump,
  flaggedIndices,
}: ExamQuestionPickerModalProps) {
  if (!open) return null
  const flagged = flaggedIndices ?? new Set()

  const handlePick = (i: number) => {
    onJump(i)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exam-q-picker-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-label="Close"
      />
      <div
        className="relative z-10 flex max-h-[88dvh] w-full max-w-lg animate-in flex-col rounded-t-[1.25rem] bg-white shadow-[0_-8px_40px_rgba(15,23,42,0.12)] duration-200 fade-in zoom-in-95 sm:max-h-[min(560px,85vh)] sm:rounded-2xl sm:shadow-2xl sm:ring-1 sm:ring-slate-200/90"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5 sm:px-5">
          <div>
            <h2 id="exam-q-picker-title" className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              All questions
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm bg-indigo-600" /> Current
              </span>
              <span className="mx-2 text-slate-300">·</span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm bg-emerald-500" /> Answered
              </span>
              {flagged.size > 0 ? (
                <>
                  <span className="mx-2 text-slate-300">·</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-sm bg-amber-400" /> Flagged
                  </span>
                </>
              ) : null}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-5 pt-2 sm:px-5">
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-8">
            {Array.from({ length: total }, (_, i) => {
              const isCurrent = i === currentIndex
              const isDone = answeredIndices.has(i)
              const isFlag = flagged.has(i)
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handlePick(i)}
                  className={`flex h-11 items-center justify-center rounded-xl text-sm font-semibold tabular-nums transition active:scale-[0.97] sm:h-12 sm:text-base ${
                    isCurrent
                      ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300 ring-offset-2'
                      : isFlag
                        ? 'bg-amber-400 text-white hover:bg-amber-500'
                        : isDone
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Opens the picker; use next to the question area. */
export function ExamQuestionPickerTrigger({
  onClick,
  total,
  currentIndex,
}: {
  onClick: () => void
  total: number
  currentIndex: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-indigo-200/90 bg-indigo-50/90 px-3.5 text-sm font-semibold text-indigo-900 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-100/90 active:scale-[0.98] sm:h-11 sm:gap-2.5 sm:px-4 sm:text-base"
      title="Jump to any question"
    >
      <LayoutGrid className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" strokeWidth={2} />
      <span className="tabular-nums">
        {currentIndex + 1}/{total}
      </span>
    </button>
  )
}
