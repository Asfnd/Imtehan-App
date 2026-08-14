'use client'

import Link from 'next/link'
import { BookMarked, ChevronRight } from 'lucide-react'
import { listReadyKitsForExam, type ReadyKitButton } from '@/lib/notes/modules'

type ExamNotesBannerProps = {
  examSlug: string
  examName: string
  /** When set, deep-link to that subject’s notes and filter kit buttons */
  subjectSlug?: string
  subjectLabel?: string
  kitHint?: string
}

function groupBySubject(kits: ReadyKitButton[]): Array<[string, ReadyKitButton[]]> {
  const map = new Map<string, ReadyKitButton[]>()
  for (const kit of kits) {
    const list = map.get(kit.subjectLabel) ?? []
    list.push(kit)
    map.set(kit.subjectLabel, list)
  }
  return [...map.entries()]
}

/**
 * Exam-scoped notes entry: module link + one crisp button per ready kit.
 */
export function ExamNotesBanner({
  examSlug,
  examName,
  subjectSlug,
  subjectLabel,
  kitHint,
}: ExamNotesBannerProps) {
  const moduleHref = subjectSlug
    ? `/notes/${examSlug}/${subjectSlug}`
    : `/notes/${examSlug}`

  const kits = listReadyKitsForExam(examSlug, subjectSlug)
  const groups = subjectSlug ? [[subjectLabel ?? 'Notes', kits] as [string, ReadyKitButton[]]] : groupBySubject(kits)
  const showGroupLabels = !subjectSlug && groups.length > 1

  const title = subjectLabel ? `${subjectLabel} notes` : `Notes for ${examName}`
  const subtitle =
    kitHint ??
    (kits.length > 0
      ? `${kits.length} revision kit${kits.length === 1 ? '' : 's'} ready. Tap a topic.`
      : subjectLabel
        ? 'Syllabus notes for this subject.'
        : 'Syllabus notes mapped to this exam.')

  return (
    <section className="mb-8 rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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
        <Link
          href={moduleHref}
          className="inline-flex shrink-0 items-center justify-center gap-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black sm:ml-2"
        >
          All notes
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      {kits.length > 0 ? (
        <div className={showGroupLabels ? 'mt-4 space-y-4' : 'mt-4'}>
          {groups.map(([label, items]) => (
            <div key={label}>
              {showGroupLabels ? (
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {label}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {items.map((kit) => (
                  <Link
                    key={kit.slug}
                    href={`/notes/${examSlug}/${kit.subjectSlug}/${kit.slug}`}
                    title={kit.title}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                  >
                    {kit.shortTitle}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}
