'use client'

import { Lock, CheckCircle, type LucideIcon } from 'lucide-react'

export type ExamPracticeGridCardProps = {
  onClick: () => void
  icon: LucideIcon
  title: string
  subtitle: string
  statPrimary: string
  statSecondary: string
  actionLabel: string
  locked?: boolean
  completed?: boolean
  completedScore?: number
}

/**
 * Compact tile shared by mock tiers, mocks, and subject practice — matches original subject card scale.
 */
export default function ExamPracticeGridCard({
  onClick,
  icon: Icon,
  title,
  subtitle,
  statPrimary,
  statSecondary,
  actionLabel,
  locked = false,
  completed = false,
  completedScore,
}: ExamPracticeGridCardProps) {
  const borderBase = locked
    ? 'border-gray-200 bg-white'
    : completed
      ? 'border-emerald-200 bg-emerald-50/30'
      : 'border-gray-200 bg-white'

  const hoverBase = locked
    ? 'hover:border-gray-300 hover:shadow-md'
    : completed
      ? 'hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-500/10'
      : 'hover:-translate-y-1 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/10'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-lg border text-center shadow-sm transition-all duration-300 ${borderBase} ${hoverBase}`}
    >
      <div
        className={[
          'pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300',
          locked
            ? 'from-transparent group-hover:opacity-0'
            : completed
              ? 'from-emerald-50/40 group-hover:opacity-100'
              : 'from-blue-50/30 group-hover:opacity-100',
        ].join(' ')}
      />

      <div className="relative flex flex-1 flex-col p-3 text-center sm:p-3.5">
        {/* Top-right badge: lock or completed check */}
        {locked && (
          <div className="absolute right-1.5 top-1.5 rounded-full bg-gray-100 p-0.5">
            <Lock className="h-2.5 w-2.5 text-gray-400" aria-hidden />
          </div>
        )}
        {!locked && completed && (
          <div className="absolute right-1.5 top-1.5">
            <CheckCircle className="h-4 w-4 text-emerald-500" aria-hidden />
          </div>
        )}

        <div
          className={[
            'mx-auto mb-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105',
            locked
              ? 'border border-gray-200 bg-gray-100'
              : completed
                ? 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                : 'bg-gradient-to-br from-blue-600 to-blue-700',
          ].join(' ')}
        >
          <Icon className={['h-3.5 w-3.5', locked ? 'text-gray-400' : 'text-white'].join(' ')} />
        </div>

        <div className="mb-2 flex min-h-[2.75rem] flex-col justify-start gap-0.5">
          <h3
            className={[
              'line-clamp-2 text-sm font-semibold leading-snug transition-colors',
              locked
                ? 'text-gray-500'
                : completed
                  ? 'text-gray-900 group-hover:text-emerald-900'
                  : 'text-gray-900 group-hover:text-blue-900',
            ].join(' ')}
          >
            {title}
          </h3>
          <p className="line-clamp-2 text-[10px] leading-snug text-gray-500 sm:text-[11px]">
            {subtitle}
          </p>
        </div>

        <div
          className={[
            'mb-2 shrink-0 rounded-lg border p-1.5',
            locked
              ? 'border-gray-100 bg-gray-50'
              : completed
                ? 'border-emerald-100 bg-emerald-50'
                : 'border-blue-100 bg-blue-50',
          ].join(' ')}
        >
          {completed && completedScore != null ? (
            <>
              <div className="text-sm font-bold tabular-nums leading-tight text-emerald-600">
                {completedScore}%
              </div>
              <div className="text-[10px] leading-tight text-gray-500">best score</div>
            </>
          ) : (
            <>
              <div
                className={[
                  'text-sm font-bold tabular-nums leading-tight',
                  locked ? 'text-gray-400' : 'text-blue-600',
                ].join(' ')}
              >
                {statPrimary}
              </div>
              <div className={['text-[10px] leading-tight', locked ? 'text-gray-400' : 'text-gray-500'].join(' ')}>
                {statSecondary}
              </div>
            </>
          )}
        </div>

        <span
          className={[
            'mt-auto block w-full shrink-0 rounded-md py-1.5 text-xs font-medium transition-all',
            locked
              ? 'border border-gray-200 bg-gray-100 text-gray-500'
              : completed
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800',
          ].join(' ')}
        >
          {completed ? 'Retake' : actionLabel}
        </span>
      </div>
    </button>
  )
}
