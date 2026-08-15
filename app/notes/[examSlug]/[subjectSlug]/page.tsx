import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import NavigationBar from '@/components/NavigationBar'
import { NotesSubjectJsonLd } from '@/components/notes/NotesJsonLd'
import { NoteTopicRows } from '@/components/notes/NoteTopicRows'
import {
  getNotesModule,
  listNotesModules,
  listReadyKitsForExam,
  listSyllabusTopicsForSection,
} from '@/lib/notes/modules'
import { NOTES_INDEX_EXAMS, notesSubjectMetadata } from '@/lib/seo/notes-seo'

type Props = {
  params: Promise<{ examSlug: string; subjectSlug: string }>
}

export function generateStaticParams() {
  const params: Array<{ examSlug: string; subjectSlug: string }> = []
  for (const examSlug of NOTES_INDEX_EXAMS) {
    const mod = listNotesModules().find((m) => m.slug === examSlug)
    if (!mod) continue
    for (const section of mod.sections) {
      params.push({ examSlug, subjectSlug: section.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examSlug, subjectSlug } = await params
  return notesSubjectMetadata(examSlug, subjectSlug)
}

export default async function NotesSubjectPage({ params }: Props) {
  const { examSlug, subjectSlug } = await params
  const mod = getNotesModule(examSlug)
  if (!mod) notFound()
  const section = mod.sections.find((s) => s.slug === subjectSlug)
  if (!section) notFound()

  const topics = listSyllabusTopicsForSection(examSlug, subjectSlug)
  const kits = listReadyKitsForExam(examSlug, subjectSlug)

  return (
    <div className="note-hub">
      <NotesSubjectJsonLd
        mod={mod}
        subjectLabel={section.label}
        subjectSlug={subjectSlug}
        kits={kits}
      />
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
