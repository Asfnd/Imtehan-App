import Link from 'next/link'
import { notFound } from 'next/navigation'
import NavigationBar from '@/components/NavigationBar'
import {
  countKitsForModule,
  getNotesModule,
  listReadyKitsForExam,
  listSyllabusTopicsForSection,
} from '@/lib/notes/modules'

type Props = { params: Promise<{ examSlug: string }> }

export async function generateMetadata({ params }: Props) {
  const { examSlug } = await params
  const mod = getNotesModule(examSlug)
  if (!mod) return { title: 'Notes' }
  return {
    title: `${mod.name} Notes | Imtehan`,
    description: `Subject-wise syllabus notes for ${mod.name}.`,
    alternates: { canonical: `https://imtehan.com/notes/${examSlug}` },
  }
}

export default async function NotesExamModulePage({ params }: Props) {
  const { examSlug } = await params
  const mod = getNotesModule(examSlug)
  if (!mod) notFound()

  const kitTotal = countKitsForModule(examSlug)
  const allKits = listReadyKitsForExam(examSlug)

  const sectionsWithKits = mod.sections
    .map((section) => {
      const kits = allKits.filter((k) => k.subjectSlug === section.slug)
      const syllabus = listSyllabusTopicsForSection(examSlug, section.slug)
      const upcoming = syllabus.filter((t) => !t.hasKit)
      return { section, kits, upcoming }
    })
    .filter((row) => row.kits.length > 0 || row.upcoming.length > 0)

  return (
    <div className="note-hub">
      <NavigationBar />
      <main className="note-hub-main note-hub-main-wide">
        <p className="note-crumb">
          <Link href="/notes">Notes</Link>
          {' / '}
          {mod.name}
        </p>
        <p className="note-hub-kicker">
          {mod.track === 'written' ? 'Written module' : 'Exam module'}
        </p>
        <h1 className="note-hub-title">{mod.name} Notes</h1>
        <p className="note-hub-lead">
          Organised by subject. Open a topic for one-pagers, past-paper angles, and fact cards.
          {kitTotal > 0 ? ` ${kitTotal} kits ready.` : ''}
        </p>

        <nav className="note-subject-jump" aria-label="Jump to subject">
          {sectionsWithKits.map(({ section, kits }) => (
            <a key={section.slug} href={`#subject-${section.slug}`} className="note-subject-jump-chip">
              {section.label}
              {kits.length > 0 ? ` (${kits.length})` : ''}
            </a>
          ))}
        </nav>

        {sectionsWithKits.map(({ section, kits, upcoming }) => (
          <section
            key={section.slug}
            id={`subject-${section.slug}`}
            className="note-subject-block"
          >
            <div className="note-subject-head">
              <div>
                <h2 className="note-subject-title">{section.label}</h2>
                <p className="note-subject-meta">
                  {kits.length} kit{kits.length === 1 ? '' : 's'} ready
                  {upcoming.length > 0 ? ` · ${upcoming.length} more on syllabus` : ''}
                </p>
              </div>
              <Link href={`/notes/${examSlug}/${section.slug}`} className="note-subject-all">
                Subject page
              </Link>
            </div>

            {kits.length > 0 ? (
              <div className="note-topic-grid">
                {kits.map((kit) => (
                  <Link
                    key={kit.slug}
                    href={`/notes/${examSlug}/${kit.subjectSlug}/${kit.slug}`}
                    className="note-topic-card"
                  >
                    <span className="note-topic-card-label">Revision kit</span>
                    <span className="note-topic-card-title">{kit.shortTitle}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="note-hub-lead" style={{ marginBottom: 12 }}>
                Kits for this subject are coming. Syllabus topics stay listed on the subject page.
              </p>
            )}
          </section>
        ))}

        {mod.hasMcqPractice ? (
          <p className="note-hub-lead" style={{ marginTop: 40, marginBottom: 0 }}>
            <Link href={`/exams/${examSlug}`} className="note-cta-link">
              Back to MCQ practice for this exam
            </Link>
          </p>
        ) : (
          <p className="note-hub-lead" style={{ marginTop: 40, marginBottom: 0 }}>
            Written-paper module. For essay and précis drills, open{' '}
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
