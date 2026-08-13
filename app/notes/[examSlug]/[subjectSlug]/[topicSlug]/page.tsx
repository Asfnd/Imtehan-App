import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { NoteKitShell } from '@/components/notes/NoteKitPanels'
import {
  getNotesModule,
  listNotesModules,
  listSyllabusTopicsForSection,
} from '@/lib/notes/modules'
import { resolveTopicKit } from '@/lib/notes/topic-registry'
import { PMS_WRITING_COACH_PATH } from '@/lib/routes'

type Props = {
  params: Promise<{ examSlug: string; subjectSlug: string; topicSlug: string }>
}

/** Priority exam modules that surface the shared PA kits. */
const PRIORITY_KIT_EXAMS = [
  'css-mpt',
  'css-written',
  'pms-competitive',
  'ppsc-assistant',
  'fpsc-general',
  'nts-general',
] as const

export function generateStaticParams() {
  const params: Array<{ examSlug: string; subjectSlug: string; topicSlug: string }> = []
  for (const examSlug of PRIORITY_KIT_EXAMS) {
    const mod = listNotesModules().find((m) => m.slug === examSlug)
    if (!mod) continue
    for (const section of mod.sections) {
      const topics = listSyllabusTopicsForSection(mod.slug, section.slug)
      for (const topic of topics) {
        if (topic.hasKit) {
          params.push({
            examSlug: mod.slug,
            subjectSlug: section.slug,
            topicSlug: topic.slug,
          })
        }
      }
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examSlug, subjectSlug, topicSlug } = await params
  const mod = getNotesModule(examSlug)
  const resolved = resolveTopicKit(topicSlug)
  const section = mod?.sections.find((s) => s.slug === subjectSlug)
  if (!mod || !section) return { title: 'Notes' }
  if (resolved) {
    return {
      title: `${resolved.kit.title} | ${mod.name} Notes`,
      description: resolved.kit.subtitle,
      alternates: {
        canonical: `https://imtehan.com/notes/${examSlug}/${subjectSlug}/${topicSlug}`,
      },
    }
  }
  const row = listSyllabusTopicsForSection(examSlug, subjectSlug).find((t) => t.slug === topicSlug)
  return {
    title: `${row?.title ?? topicSlug} | ${mod.name} Notes`,
    description: `Syllabus topic for ${section.label} in ${mod.name}.`,
  }
}

export default async function NotesTopicPage({ params }: Props) {
  const { examSlug, subjectSlug, topicSlug } = await params
  const mod = getNotesModule(examSlug)
  if (!mod) notFound()
  const section = mod.sections.find((s) => s.slug === subjectSlug)
  if (!section) notFound()

  const resolved = resolveTopicKit(topicSlug)
  const syllabusRow = listSyllabusTopicsForSection(examSlug, subjectSlug).find(
    (t) => t.slug === topicSlug
  )

  if (!resolved) {
    if (!syllabusRow) notFound()
    return (
      <div className="note-hub">
        <main className="note-hub-main">
          <p className="note-crumb">
            <Link href="/notes">Notes</Link>
            {' / '}
            <Link href={`/notes/${examSlug}`}>{mod.name}</Link>
            {' / '}
            <Link href={`/notes/${examSlug}/${subjectSlug}`}>{section.label}</Link>
          </p>
          <div className="note-empty">
            <h2>{syllabusRow.title}</h2>
            <p>
              Full revision kit is not published for this topic yet. The topic stays on your exam
              syllabus list so you can still practice.
            </p>
            {mod.hasMcqPractice ? (
              <Link href={`/exams/${examSlug}/${subjectSlug}`} className="note-cta-btn">
                Practice {section.label} MCQs
              </Link>
            ) : (
              <Link href={PMS_WRITING_COACH_PATH} className="note-cta-btn">
                Open Writing Coach
              </Link>
            )}
            <p style={{ marginTop: 16 }}>
              <Link href={`/notes/${examSlug}/${subjectSlug}`} className="note-cta-link">
                Back to topics
              </Link>
            </p>
          </div>
        </main>
      </div>
    )
  }

  const { kit, meta } = resolved
  const writingHref =
    mod.track === 'written' || examSlug === 'css-written' ? PMS_WRITING_COACH_PATH : null

  const headings = [
    { id: 'one-pager', text: 'One-pager' },
    { id: 'overview', text: 'Overview' },
    { id: 'answer-flow', text: 'Answer flow' },
    { id: 'variants', text: 'Question variants' },
    { id: 'citations', text: 'Citations' },
    { id: 'flashcards', text: 'Fact cards' },
    { id: 'revision-path', text: '7-day path' },
  ]

  return (
    <BlogPostShell
      title={kit.title}
      subtitle={kit.subtitle}
      author="Imtehan Notes"
      authorBio="Study notes for CSS, PMS, and one-paper exams. Written for clear understanding and fast revision."
      date={kit.updated}
      readTime="14 min read"
      category={section.label}
      tags={[mod.name, section.label, ...kit.syllabusTags.slice(0, 2)]}
      slug={`notes-${examSlug}-${meta.slug}`}
      headings={headings}
      otherPosts={[]}
    >
      <p className="note-crumb" style={{ marginTop: 0 }}>
        <Link href="/notes">Notes</Link>
        {' / '}
        <Link href={`/notes/${examSlug}`}>{mod.name}</Link>
        {' / '}
        <Link href={`/notes/${examSlug}/${subjectSlug}`}>{section.label}</Link>
      </p>

      <NoteKitShell
        kit={kit}
        track={mod.track}
        examLabel={mod.name}
        examSlug={examSlug}
        subjectSlug={meta.mcqSubjectSlug}
        hasMcq={mod.hasMcqPractice}
        writingHref={writingHref}
      />
    </BlogPostShell>
  )
}
