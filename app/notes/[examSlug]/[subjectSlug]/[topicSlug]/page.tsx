import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { NoteKitShell } from '@/components/notes/NoteKitPanels'
import { NotesTopicJsonLd } from '@/components/notes/NotesJsonLd'
import {
  getNotesModule,
  listSyllabusTopicsForSection,
} from '@/lib/notes/modules'
import { resolveTopicKit } from '@/lib/notes/topic-registry'
import { notesReadItem } from '@/lib/notes/reading-progress'
import { PMS_WRITING_COACH_PATH } from '@/lib/routes'
import {
  listPrimaryKitStaticParams,
  notesPath,
  notesReadTime,
  notesTopicMetadata,
  primaryNotesLocation,
  relatedNotePosts,
} from '@/lib/seo/notes-seo'

type Props = {
  params: Promise<{ examSlug: string; subjectSlug: string; topicSlug: string }>
}

export const dynamic = 'force-static'
export const revalidate = 604800
export const dynamicParams = true

export function generateStaticParams() {
  return listPrimaryKitStaticParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examSlug, subjectSlug, topicSlug } = await params
  return notesTopicMetadata(examSlug, subjectSlug, topicSlug)
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
            <h1 className="note-hub-title">{syllabusRow.title}</h1>
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
  const loc = primaryNotesLocation(meta)
  if (examSlug !== loc.examSlug || subjectSlug !== loc.subjectSlug) {
    permanentRedirect(notesPath([loc.examSlug, loc.subjectSlug, loc.topicSlug]))
  }
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
    <>
      <NotesTopicJsonLd
        examSlug={examSlug}
        examName={mod.name}
        subjectSlug={subjectSlug}
        subjectLabel={section.label}
        kit={kit}
        meta={meta}
      />
      <BlogPostShell
        title={kit.title}
        subtitle={kit.subtitle}
        author="Imtehan Notes"
        authorBio="Study notes for CSS, PMS, and one-paper exams. Written for clear understanding and fast revision."
        date={kit.updated}
        readTime={notesReadTime(kit)}
        category={section.label}
        tags={[mod.name, section.label, ...kit.syllabusTags.slice(0, 2)]}
        slug={`notes-${examSlug}-${meta.slug}`}
        headings={headings}
        otherPosts={relatedNotePosts(meta.slug, examSlug, subjectSlug)}
        notesProgressItem={notesReadItem(meta.slug)}
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
    </>
  )
}
