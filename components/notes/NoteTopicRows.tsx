'use client'

import Link from 'next/link'
import { useCompletions } from '@/lib/completion'
import { NOTES_READ_DONE, NOTES_READ_SCOPE, notesReadItem, notesReadLabel } from '@/lib/notes/reading-progress'

type Topic = {
  slug: string
  title: string
  hasKit: boolean
}

export function NoteTopicRows({
  examSlug,
  subjectSlug,
  topics,
  kitHrefs,
}: {
  examSlug: string
  subjectSlug: string
  topics: Topic[]
  /** Canonical kit paths (server-computed). Avoids duplicate exam URLs. */
  kitHrefs?: Record<string, string>
}) {
  const map = useCompletions(NOTES_READ_SCOPE)

  return (
    <div>
      {topics.map((topic) => {
        const pct = topic.hasKit ? map[notesReadItem(topic.slug)] ?? 0 : 0
        const done = topic.hasKit && pct >= NOTES_READ_DONE
        const label = notesReadLabel(topic.hasKit ? pct : undefined, topic.hasKit)
        return (
          <Link
            key={topic.slug}
            href={kitHrefs?.[topic.slug] ?? `/notes/${examSlug}/${subjectSlug}/${topic.slug}`}
            prefetch={false}
            className={`note-topic-row${done ? ' is-read' : ''}`}
          >
            <p className="note-topic-title">{topic.title}</p>
            <span
              className={`note-topic-status${topic.hasKit ? ' is-ready' : ''}${done ? ' is-read' : ''}`}
            >
              {label}
            </span>
            {topic.hasKit && pct > 0 ? (
              <span className="note-topic-read-track" aria-hidden>
                <span className="note-topic-read-fill" style={{ width: `${Math.min(100, pct)}%` }} />
              </span>
            ) : null}
          </Link>
        )
      })}
    </div>
  )
}

export function NoteReadyKitCards({
  examSlug,
  kits,
  kitHrefs,
}: {
  examSlug: string
  kits: Array<{ slug: string; title: string; subjectSlug: string; subjectLabel: string }>
  kitHrefs?: Record<string, string>
}) {
  const map = useCompletions(NOTES_READ_SCOPE)

  return (
    <div className="note-hub-list">
      {kits.map((kit) => {
        const pct = map[notesReadItem(kit.slug)] ?? 0
        const done = pct >= NOTES_READ_DONE
        return (
          <Link
            key={kit.slug}
            href={kitHrefs?.[kit.slug] ?? `/notes/${examSlug}/${kit.subjectSlug}/${kit.slug}`}
            prefetch={false}
            className={`note-hub-card${done ? ' is-read' : ''}`}
          >
            <p className="note-hub-card-title">{kit.title}</p>
            <p className="note-hub-card-meta">
              {kit.subjectLabel}
              {done ? ' · Read' : pct > 0 ? ` · ${pct}% read` : ' · one-pager, past papers, fact cards'}
            </p>
            {pct > 0 ? (
              <span className="note-topic-read-track" aria-hidden>
                <span className="note-topic-read-fill" style={{ width: `${Math.min(100, pct)}%` }} />
              </span>
            ) : null}
          </Link>
        )
      })}
    </div>
  )
}
