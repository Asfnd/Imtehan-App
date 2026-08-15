import Link from 'next/link'
import NavigationBar from '@/components/NavigationBar'
import { NotesHubJsonLd } from '@/components/notes/NotesJsonLd'
import {
  categoryLabel,
  countKitsForModule,
  listNotesModulesByCategory,
} from '@/lib/notes/modules'
import { NOTES_INDEX_EXAMS, notesHubMetadata } from '@/lib/seo/notes-seo'

export const metadata = notesHubMetadata()
export const dynamic = 'force-static'
export const revalidate = 604800

const FEATURED = new Set<string>(NOTES_INDEX_EXAMS)

export default function NotesHubPage() {
  const groups = listNotesModulesByCategory()

  return (
    <div className="note-hub">
      <NotesHubJsonLd />
      <NavigationBar />
      <main className="note-hub-main">
        <p className="note-hub-kicker">Imtehan Notes</p>
        <h1 className="note-hub-title">Pick your exam. Then open syllabus notes.</h1>
        <p className="note-hub-lead">
          Each exam has its own module. Topics follow that exam syllabus. Full revision kits ship
          topic by topic. Start with your exam, not a random blog list.
        </p>

        {groups.map(({ category, modules }) => (
          <section key={category}>
            <h2 className="note-hub-cat">{categoryLabel(category)}</h2>
            <div className="note-hub-list">
              {modules.map((mod) => {
                const featured = FEATURED.has(mod.slug)
                const kits = featured ? countKitsForModule(mod.slug) : 0
                return (
                  <Link
                    key={mod.slug}
                    href={`/notes/${mod.slug}`}
                    prefetch={false}
                    className="note-hub-card"
                  >
                    <p className="note-hub-card-title">{mod.name}</p>
                    <p className="note-hub-card-meta">
                      {mod.sections.length} subjects
                      {kits > 0
                        ? ` · ${kits} kit${kits === 1 ? '' : 's'} ready`
                        : featured
                          ? ' · syllabus listed'
                          : ''}
                      {mod.track === 'written' ? ' · written focus' : ''}
                    </p>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
