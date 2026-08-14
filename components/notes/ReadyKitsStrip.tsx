'use client'

import Link from 'next/link'
import { getNotesModule, listSyllabusTopicsForSection } from '@/lib/notes/modules'

type ReadyKitsStripProps = {
  examSlug: string
}

/**
 * Lists published revision kits inside exam UIs so students see the notes,
 * not only a generic banner.
 */
export function ReadyKitsStrip({ examSlug }: ReadyKitsStripProps) {
  const mod = getNotesModule(examSlug)
  if (!mod) return null

  const seen = new Set<string>()
  const kits: Array<{ slug: string; title: string; subjectSlug: string; subjectLabel: string }> = []
  for (const section of mod.sections) {
    for (const topic of listSyllabusTopicsForSection(examSlug, section.slug)) {
      if (!topic.hasKit || seen.has(topic.slug)) continue
      seen.add(topic.slug)
      kits.push({
        slug: topic.slug,
        title: topic.title,
        subjectSlug: section.slug,
        subjectLabel: section.label,
      })
    }
  }

  if (kits.length === 0) return null

  return (
    <section className="mb-8">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Study notes
          </p>
          <h2 className="text-lg font-bold text-gray-900">Ready revision kits</h2>
        </div>
        <Link
          href={`/notes/${examSlug}`}
          className="text-sm font-semibold text-slate-700 hover:text-slate-900"
        >
          All notes
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {kits.map((kit) => (
          <Link
            key={kit.slug}
            href={`/notes/${examSlug}/${kit.subjectSlug}/${kit.slug}`}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            <p className="text-sm font-bold text-gray-900">{kit.title}</p>
            <p className="mt-1 text-xs text-gray-500">
              {kit.subjectLabel} · one-pager, past papers, fact cards
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
