'use client'

import type { ReactNode } from 'react'

interface GamifiedQuizShellProps {
  children: ReactNode
  journey: ReactNode
  mobileRail?: ReactNode
  className?: string
}

export function GamifiedQuizShell({
  children,
  journey,
  mobileRail,
  className = '',
}: GamifiedQuizShellProps) {
  return (
    <div
      className={`flex h-[100dvh] max-h-[100dvh] w-screen min-w-0 flex-col overflow-hidden bg-slate-50 text-slate-800 md:flex-row ${className}`}
    >
      {mobileRail && (
        <div className="sm:hidden border-b border-indigo-100/80 bg-white px-3 pb-2 pt-[max(0.5rem,env(safe-area-inset-top,0px))]">
          {mobileRail}
        </div>
      )}

      <div className="relative z-10 flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-white shadow-[4px_0_24px_rgba(0,0,0,0.05)] sm:w-[60%] lg:w-[50%]">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
      </div>

      <aside className="hidden flex-1 sm:flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply blur-2xl opacity-50 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply blur-2xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="w-full max-w-md p-8 relative z-10">
          {journey}
        </div>
      </aside>
    </div>
  )
}
