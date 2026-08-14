'use client'

import Link from 'next/link'
import { BookMarked } from 'lucide-react'

type ExamNotesBannerProps = {
  examSlug: string
  examName: string
  /** When set, deep-link to that subject’s notes */
  subjectSlug?: string
  subjectLabel?: string
  kitHint?: string
}

/**
 * Entry from MCQ exam UI into the matching notes module.
 * Same exam slug so students stay in context.
 */
export function ExamNotesBanner({
  examSlug,
  examName,
  subjectSlug,
  subjectLabel,
  kitHint,
}: ExamNotesBannerProps) {
  const href = subjectSlug
    ? `/notes/${examSlug}/${subjectSlug}`
    : `/notes/${examSlug}`

  const title = subjectLabel
    ? `${subjectLabel} notes`
    : `Notes for ${examName}`

  const subtitle =
    kitHint ??
    (subjectLabel
      ? 'Syllabus notes for this subject. One-pagers, past-paper angles, and fact cards.'
      : 'Syllabus notes mapped to this exam. One-pagers, past-paper angles, and fact cards.')

  return (
    <Link
      href={href}
      className="mb-8 flex flex-col gap-3 rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
          <BookMarked className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Study notes
          </p>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
      <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white sm:ml-2">
        Open notes
      </span>
    </Link>
  )
}
