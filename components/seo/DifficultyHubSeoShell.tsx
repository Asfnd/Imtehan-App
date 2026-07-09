import Link from 'next/link'
import type { ReactNode } from 'react'
import { DIFFICULTY_LEVELS } from '@/lib/seo/topic-indexing'
import { SeoCrawlNav, SeoCrawlOnly, SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'
import { breadcrumbListNode, jsonLdString } from '@/lib/seo/jsonld'

const LEVEL_LABELS: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

export function DifficultyHubSeoShell({
  examSlug,
  examName,
  subjectSlug,
  subjectName,
  level,
  children,
}: {
  examSlug: string
  examName: string
  subjectSlug: string
  subjectName: string
  level: string
  children: ReactNode
}) {
  const base = `/exams/${examSlug}/${subjectSlug}`
  const levelLabel = LEVEL_LABELS[level] ?? level
  const h1 = `${examName} ${subjectName} ${levelLabel} MCQs`

  const graphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbListNode([
        { name: 'Home', url: '/' },
        { name: 'Exams', url: '/exams' },
        { name: examName, url: `/exams/${examSlug}` },
        { name: subjectName, url: base },
        { name: `${levelLabel} MCQs` },
      ]),
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(graphJsonLd) }} />
      <SeoCrawlOnly>
        <SeoPageHeader
          title={h1}
          subtitle={`Practice ${levelLabel.toLowerCase()} ${examName} ${subjectName} MCQs in timed sets of 20.`}
        />

        <SeoCrawlNav label="Difficulty levels">
          <ul>
            {DIFFICULTY_LEVELS.map((l) => (
              <li key={l}>
                <Link href={`${base}/difficulty/${l}`}>{LEVEL_LABELS[l] ?? l} MCQs</Link>
              </li>
            ))}
          </ul>
        </SeoCrawlNav>

        <SeoCrawlNav label="Practice sets">
          <ul>
            <li>
              <Link href={`${base}/difficulty/${level}/set/1`}>Set 1</Link>
            </li>
            <li>
              <Link href={`${base}/topics`}>All topics</Link>
            </li>
            <li>
              <Link href={base}>All modes</Link>
            </li>
          </ul>
        </SeoCrawlNav>
      </SeoCrawlOnly>

      {children}
    </>
  )
}
