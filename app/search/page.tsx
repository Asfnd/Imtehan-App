import type { Metadata } from 'next'
import Link from 'next/link'
import NavigationBar from '@/components/NavigationBar'
import { searchNotesAndExams } from '@/lib/seo/notes-seo'

type Props = {
  searchParams: Promise<{ q?: string }>
}

export const metadata: Metadata = {
  title: 'Search',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://imtehan.com/search' },
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams
  const query = q.trim()
  const hits = searchNotesAndExams(query)

  return (
    <div className="note-hub">
      <NavigationBar />
      <main className="note-hub-main">
        <p className="note-hub-kicker">Search</p>
        <h1 className="note-hub-title">
          {query ? `Results for “${query}”` : 'Search notes and exams'}
        </h1>
        <form action="/search" method="get" style={{ margin: '16px 0 28px' }}>
          <label htmlFor="q" className="sr-only">
            Search
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Try constitution, CSS, or essay"
            autoComplete="off"
            style={{
              width: '100%',
              maxWidth: 480,
              padding: '10px 14px',
              border: '1px solid #e4e4e7',
              borderRadius: 10,
              fontSize: 16,
            }}
          />
        </form>

        {query.length > 0 && query.length < 2 ? (
          <p className="note-hub-lead">Type at least two characters.</p>
        ) : null}

        {query.length >= 2 && hits.length === 0 ? (
          <p className="note-hub-lead">No matching notes or exams.</p>
        ) : null}

        {hits.length > 0 ? (
          <div className="note-hub-list">
            {hits.map((hit) => (
              <Link key={`${hit.kind}-${hit.href}`} href={hit.href} className="note-hub-card">
                <p className="note-hub-card-title">{hit.title}</p>
                <p className="note-hub-card-meta">
                  {hit.kind === 'note' ? 'Notes' : 'Exam'} · {hit.meta}
                </p>
              </Link>
            ))}
          </div>
        ) : null}

        <p className="note-hub-lead" style={{ marginTop: 32 }}>
          <Link href="/notes" className="note-cta-link">
            Browse all notes
          </Link>
        </p>
      </main>
    </div>
  )
}
