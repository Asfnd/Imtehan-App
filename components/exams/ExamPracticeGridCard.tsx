'use client'

import { Lock, type LucideIcon } from 'lucide-react'

export type ExamPracticeGridCardProps = {
  onClick: () => void
  icon: LucideIcon
  title: string
  subtitle: string
  statPrimary: string
  statSecondary: string
  actionLabel: string
  locked?: boolean
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
}: ExamPracticeGridCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'group relative flex h-full w-full flex-col overflow-hidden rounded-lg border text-center transition-all duration-300',
        locked
          ? 'cursor-pointer border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:shadow-md'
          : 'border-gray-200 bg-white shadow-sm hover:-translate-y-1 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/10',
      ].join(' ')}
    >
      <div
        className={[
          'pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-transparent opacity-0 transition-opacity duration-300',
          locked ? 'group-hover:opacity-0' : 'group-hover:opacity-100',
        ].join(' ')}
      />

      <div className="relative flex flex-1 flex-col p-3 text-center sm:p-3.5">
        {locked && (
          <div className="absolute right-1.5 top-1.5 rounded-full bg-gray-100 p-0.5">
            <Lock className="h-2.5 w-2.5 text-gray-400" aria-hidden />
          </div>
        )}

        <div
          className={[
            'mx-auto mb-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105',
            locked
              ? 'border border-gray-200 bg-gray-100'
              : 'bg-gradient-to-br from-blue-600 to-blue-700',
          ].join(' ')}
        >
          <Icon className={['h-3.5 w-3.5', locked ? 'text-gray-400' : 'text-white'].join(' ')} />
        </div>

        <div className="mb-2 flex min-h-[2.75rem] flex-col justify-start gap-0.5">
          <h3
            className={[
              'line-clamp-2 text-sm font-semibold leading-snug transition-colors',
              locked ? 'text-gray-500' : 'text-gray-900 group-hover:text-blue-900',
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
            locked ? 'border-gray-100 bg-gray-50' : 'border-blue-100 bg-blue-50',
          ].join(' ')}
        >
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
        </div>

        <span
          className={[
            'mt-auto block w-full shrink-0 rounded-md py-1.5 text-xs font-medium transition-all',
            locked
              ? 'border border-gray-200 bg-gray-100 text-gray-500'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800',
          ].join(' ')}
        >
          {actionLabel}
        </span>
      </div>
    </button>
  )
}
