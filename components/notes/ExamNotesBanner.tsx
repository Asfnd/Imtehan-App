'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BookMarked, ArrowRight } from 'lucide-react'

type ExamNotesBannerProps = {
  examSlug: string
  examName: string
  subjectSlug?: string
  subjectLabel?: string
  variant?: 'banner' | 'grid'
  kitHint?: string
  /** Pass from a server parent. Never compute kit lists in this client island. */
  kitCount?: number
  subjectCount?: number
}

/**
 * Single Study Notes entry. Counts are optional props so exam dashboards
 * do not pull the notes registry into the client bundle.
 */
export function ExamNotesBanner({
  examSlug,
  examName,
  subjectSlug,
  subjectLabel,
  variant = 'banner',
  kitHint,
  kitCount,
  subjectCount,
}: ExamNotesBannerProps) {
  const router = useRouter()
  const href = subjectSlug
    ? `/notes/${examSlug}/${subjectSlug}`
    : `/notes/${examSlug}`

  const title = subjectLabel ? `${subjectLabel} Notes` : 'Study Notes'
  const subtitle =
    kitHint ??
    (subjectLabel
      ? `Revision kits for ${subjectLabel}, organised by topic.`
      : `Subject-wise revision kits for ${examName}.`)
  const readyLine =
    kitCount && kitCount > 0 ? ` ${kitCount} kits ready.` : ''

  if (variant === 'grid') {
    return (
      <div className="group relative rounded-xl bg-slate-950 border-2 border-slate-900 hover:border-black shadow-lg hover:shadow-xl hover:shadow-slate-900/30 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative p-5 flex-1 flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-white text-slate-950 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
            <BookMarked className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold mb-2 text-white">{title}</h3>
          <p className="text-slate-300 text-xs leading-relaxed mb-3 flex-1 break-words">{subtitle}</p>
          {kitCount != null || subjectCount != null ? (
            <div className="flex items-center justify-between text-xs mb-4 pb-3 border-b border-white/15">
              <div className="text-center">
                <span className="font-bold text-white block">{kitCount ?? '—'}</span>
                <span className="text-slate-400">Kits</span>
              </div>
              <div className="w-px h-6 bg-white/20" />
              <div className="text-center">
                <span className="font-bold text-white block">{subjectCount ?? '—'}</span>
                <span className="text-slate-400">Subjects</span>
              </div>
            </div>
          ) : (
            <div className="mb-4 pb-3 border-b border-white/15" />
          )}
          <button
            type="button"
            onClick={() => router.push(href)}
            className="w-full bg-white hover:bg-slate-100 text-slate-950 font-semibold py-2.5 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 text-sm shadow-md overflow-hidden"
          >
            <span className="truncate">Open Notes</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <Link
      href={href}
      prefetch={false}
      className="mb-8 flex flex-col gap-3 rounded-2xl border border-slate-900 bg-slate-950 p-4 shadow-sm transition hover:bg-black hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-slate-950">
          <BookMarked className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Study notes
          </p>
          <h3 className="text-base font-bold text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-300">
            {subtitle}
            {readyLine}
          </p>
        </div>
      </div>
      <span className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 sm:ml-2">
        Open notes
        <ArrowRight className="h-4 h-4" aria-hidden />
      </span>
    </Link>
  )
}
