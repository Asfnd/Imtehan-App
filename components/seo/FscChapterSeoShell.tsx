import Link from 'next/link'
import type { ReactNode } from 'react'
import { SeoCrawlNav, SeoCrawlOnly, SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'
import { breadcrumbListNode, jsonLdString } from '@/lib/seo/jsonld'

const SUBJECT_NAMES: Record<string, string> = {
  biology: 'Biology',
  chemistry: 'Chemistry',
  physics: 'Physics',
}

export function FscChapterSeoShell({
  subject,
  subjectName,
  chapterSlug,
  chapterLabel,
  children,
}: {
  subject: string
  subjectName: string
  chapterSlug: string
  chapterLabel: string
  children: ReactNode
}) {
  const base = `/fsc/${subject}/${chapterSlug}`
  const h1 = `FSc ${subjectName}: ${chapterLabel} MCQs`
  const maxSet = 3

  const graphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbListNode([
        { name: 'Home', url: '/' },
        { name: 'FSc', url: '/fsc' },
        { name: subjectName, url: `/fsc/${subject}` },
        { name: chapterLabel },
      ]),
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(graphJsonLd) }} />
      <SeoCrawlOnly>
        <SeoPageHeader
          title={h1}
          subtitle={`Practice FSc ${subjectName} ${chapterLabel} chapter MCQs in sets of 20 with answers.`}
        />

        <SeoCrawlNav label="Chapter practice sets">
          <ul>
            {Array.from({ length: maxSet }, (_, i) => i + 1).map((n) => (
              <li key={n}>
                <Link href={`${base}/set/${n}`}>Set {n}</Link>
              </li>
            ))}
          </ul>
        </SeoCrawlNav>

        <SeoCrawlNav label="FSc subjects">
          <ul>
            {Object.entries(SUBJECT_NAMES).map(([slug, name]) => (
              <li key={slug}>
                <Link href={`/fsc/${slug}`}>{name}</Link>
              </li>
            ))}
          </ul>
        </SeoCrawlNav>
      </SeoCrawlOnly>

      {children}
    </>
  )
}
