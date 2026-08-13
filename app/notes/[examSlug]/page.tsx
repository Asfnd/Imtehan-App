import Link from 'next/link'
import { notFound } from 'next/navigation'
import NavigationBar from '@/components/NavigationBar'
import {
  countKitsForModule,
  getNotesModule,
  listSyllabusTopicsForSection,
} from '@/lib/notes/modules'

type Props = { params: Promise<{ examSlug: string }> }

export async function generateMetadata({ params }: Props) {
  const { examSlug } = await params
  const mod = getNotesModule(examSlug)
  if (!mod) return { title: 'Notes' }
  return {
    title: `${mod.name} Notes | Imtehan`,
    description: `Syllabus-aligned notes module for ${mod.name}.`,
    alternates: { canonical: `https://imtehan.com/notes/${examSlug}` },
  }
}

export default async function NotesExamModulePage({ params }: Props) {
  const { examSlug } = await params
  const mod = getNotesModule(examSlug)
  if (!mod) notFound()

  const kitTotal = countKitsForModule(examSlug)

  return (
    <div className="note-hub">
      <NavigationBar />
      <main className="note-hub-main">
        <p className="note-crumb">
          <Link href="/notes">Notes</Link>
          {' / '}
          {mod.name}
        </p>
        <p className="note-hub-kicker">
          {mod.track === 'written' ? 'Written module' : 'Exam module'}
        </p>
        <h1 className="note-hub-title">{mod.name}</h1>
        <p className="note-hub-lead">
          Subjects match this exam. Open a subject to see syllabus topics.
          {kitTotal > 0
            ? ` ${kitTotal} full revision kit${kitTotal === 1 ? '' : 's'} ready so far.`
            : ' Kits will appear here as we publish them. Practice MCQs are linked from each topic.'}
        </p>

        <div className="note-hub-list">
          {mod.sections.map((section) => {
            const topics = listSyllabusTopicsForSection(examSlug, section.slug)
            const ready = topics.filter((t) => t.hasKit).length
            return (
              <Link
                key={section.slug}
                href={`/notes/${examSlug}/${section.slug}`}
                className="note-hub-card"
              >
                <p className="note-hub-card-title">{section.label}</p>
                <p className="note-hub-card-meta">
                  {topics.length} syllabus topics
                  {ready > 0 ? ` · ${ready} kit${ready === 1 ? '' : 's'} ready` : ''}
                </p>
              </Link>
            )
          })}
        </div>

        {mod.hasMcqPractice ? (
          <p className="note-hub-lead" style={{ marginTop: 32, marginBottom: 0 }}>
            <Link href={`/exams/${examSlug}`} className="note-cta-link">
              Open MCQ practice for this exam
            </Link>
          </p>
        ) : (
          <p className="note-hub-lead" style={{ marginTop: 32, marginBottom: 0 }}>
            This is a written-paper module. Use answer scaffolds inside topic kits. For essay and
            precis drills, open{' '}
            <Link href="/exams/pms-competitive/essay-grader" className="note-cta-link">
              Writing Coach
            </Link>
            .
          </p>
        )}
      </main>
    </div>
  )
}
