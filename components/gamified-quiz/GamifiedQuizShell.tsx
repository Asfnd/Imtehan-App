'use client'

import type { ReactNode } from 'react'

interface GamifiedQuizShellProps {
  children: ReactNode
  /** Right-rail panel (journey / question map). Omitted when variant is `single`. */
  journey?: ReactNode
  mobileRail?: ReactNode
  className?: string
  /**
   * `split` — main column + right panel (practice quizzes).
   * `single` — one centered column, full width (timed mocks).
   */
  variant?: 'split' | 'single'
}

export function GamifiedQuizShell({
  children,
  journey,
  mobileRail,
  className = '',
  variant = 'split',
}: GamifiedQuizShellProps) {
  if (variant === 'single') {
    return (
      <div
        className={`flex h-[100dvh] max-h-[100dvh] w-screen min-w-0 flex-col overflow-hidden bg-slate-50 text-slate-800 ${className}`}
      >
        {mobileRail && (
          <div className="border-b border-indigo-100/80 bg-white px-3 pb-2 pt-[max(0.5rem,env(safe-area-inset-top,0px))] sm:hidden">
            {mobileRail}
          </div>
        )}
        <div className="relative z-10 flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white ring-1 ring-slate-100/90">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
        </div>
      </div>
    )
  }

  const splitSideBySide = !!journey

  return (
    <div
      className={`flex h-[100dvh] max-h-[100dvh] w-screen min-w-0 bg-slate-50 text-slate-800 ${
        splitSideBySide ? 'flex-row overflow-hidden' : 'flex-col overflow-hidden'
      } ${className}`}
    >
      {mobileRail && !journey && (
        <div className="border-b border-indigo-100/80 bg-white px-3 pb-2 pt-[max(0.5rem,env(safe-area-inset-top,0px))] sm:hidden">
          {mobileRail}
        </div>
      )}

      <div
        className={`relative z-10 flex h-full min-h-0 flex-col overflow-hidden bg-white shadow-[4px_0_24px_rgba(0,0,0,0.05)] ${
          journey
            ? 'w-[60%] min-w-0 shrink-0 lg:w-[50%]'
            : 'w-full min-h-0 flex-1'
        }`}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
      </div>

      {journey ? (
        <aside className="relative flex h-full min-h-0 min-w-0 flex-1 flex-col items-center justify-center overflow-x-hidden overflow-y-auto border-l border-indigo-100/60 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
          <div className="absolute left-10 top-10 h-32 w-32 animate-pulse rounded-full bg-purple-200 opacity-50 mix-blend-multiply blur-2xl" />
          <div
            className="absolute bottom-10 right-10 h-40 w-40 animate-pulse rounded-full bg-indigo-200 opacity-50 mix-blend-multiply blur-2xl"
            style={{ animationDelay: '1s' }}
          />
          <div className="relative z-10 w-full max-w-md p-4 md:p-8">{journey}</div>
        </aside>
      ) : null}
    </div>
  )
}
