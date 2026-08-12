import Link from 'next/link'
import NavigationBar from '@/components/NavigationBar'

export default function NotesHubPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      <main className="mx-auto max-w-2xl px-6 py-16">
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 13,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#71717A',
            marginBottom: 12,
          }}
        >
          Imtehan Notes
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-libre-baskerville), Georgia, serif',
            fontSize: 40,
            lineHeight: 1.2,
            fontWeight: 700,
            color: '#111',
            marginBottom: 16,
          }}
        >
          Clear notes. Easy revision. Real exam help.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 18,
            lineHeight: 1.6,
            color: '#52525B',
            marginBottom: 40,
          }}
        >
          Short topic pages with key facts, answer shapes, and a one-page revision sheet. Built to
          understand and remember, not to copy.
        </p>

        <Link
          href="/notes/pakistan-affairs/objectives-resolution-article-2a"
          className="block border border-gray-200 px-6 py-5 transition-colors hover:border-gray-400"
        >
          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 12,
              color: '#71717A',
              marginBottom: 8,
            }}
          >
            Pakistan Affairs · Demo
          </p>
          <p
            style={{
              fontFamily: 'var(--font-libre-baskerville), Georgia, serif',
              fontSize: 22,
              fontWeight: 700,
              color: '#111',
              marginBottom: 8,
            }}
          >
            Objectives Resolution and Article 2A
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 15,
              color: '#52525B',
              lineHeight: 1.5,
            }}
          >
            One-minute summary, key facts, answer shape, and a quick revision sheet.
          </p>
        </Link>
      </main>
    </div>
  )
}
