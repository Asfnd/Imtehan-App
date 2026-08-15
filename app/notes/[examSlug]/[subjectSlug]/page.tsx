import Link from 'next/link'
import { notFound } from 'next/navigation'
import NavigationBar from '@/components/NavigationBar'
import { NoteTopicRows } from '@/components/notes/NoteTopicRows'
import {
  getNotesModule,
  listSyllabusTopicsForSection,
} from '@/lib/notes/modules'

type Props = {
  params: Promise<{ examSlug: string; subjectSlug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { examSlug, subjectSlug } = await params
  const mod = getNotesModule(examSlug)
  const section = mod?.sections.find((s) => s.slug === subjectSlug)
  if (!mod || !section) return { title: 'Notes' }
  return {
    title: `${section.label} Notes · ${mod.name} | Imtehan`,
    description: `Syllabus topics for ${section.label} in ${mod.name}.`,
    alternates: {
      canonical: `https://imtehan.com/notes/${examSlug}/${subjectSlug}`,
    },
  }
}

export default async function NotesSubjectPage({ params }: Props) {
  const { examSlug, subjectSlug } = await params
  const mod = getNotesModule(examSlug)
  if (!mod) notFound()
  const section = mod.sections.find((s) => s.slug === subjectSlug)
  if (!section) notFound()

  const topics = listSyllabusTopicsForSection(examSlug, subjectSlug)

  return (
    <div className="note-hub">
      <NavigationBar />
      <main className="note-hub-main">
        <p className="note-crumb">
          <Link href="/notes">Notes</Link>
          {' / '}
          <Link href={`/notes/${examSlug}`}>{mod.name}</Link>
          {' / '}
          {section.label}
        </p>
        <p className="note-hub-kicker">Syllabus topics</p>
        <h1 className="note-hub-title">{section.label}</h1>
        <p className="note-hub-lead">
          Topics below follow this exam module. Green means a full revision kit is ready. A thin
          bar shows how far you have read — signed-in progress is saved to your account.
        </p>

        <NoteTopicRows examSlug={examSlug} subjectSlug={subjectSlug} topics={topics} />

        {mod.hasMcqPractice ? (
          <p style={{ marginTop: 28 }}>
            <Link href={`/exams/${examSlug}/${subjectSlug}`} className="note-cta-link">
              Practice {section.label} MCQs
            </Link>
          </p>
        ) : null}
      </main>
    </div>
  )
}
