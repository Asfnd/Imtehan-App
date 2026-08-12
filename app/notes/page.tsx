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
          Imtehan Notes · Demo
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
          Notes built for how aspirants actually win
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
          Not PDF dumps. Dual-sourced topic pages with analytical scaffolds, one-page revision,
          past-paper angles, and practice MCQs.
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
            Pakistan Affairs · CSS / PMS / One-paper · Demo
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
            Objectives Resolution & Article 2A
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 15,
              color: '#52525B',
              lineHeight: 1.5,
            }}
          >
            Open the pilot page — verified facts, examiner angle, one-pager, writing prompt, MCQ
            CTA.
          </p>
        </Link>
      </main>
    </div>
  )
}
