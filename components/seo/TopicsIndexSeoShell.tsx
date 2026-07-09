import Link from 'next/link'
import type { ReactNode } from 'react'
import { TABLE_POPULAR_TAGS, tagSlugToLabel } from '@/lib/topic-tags'
import { isTopicBankSupported } from '@/lib/seo/topic-indexing'
import { SeoCrawlNav, SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'
import { breadcrumbListNode, jsonLdString } from '@/lib/seo/jsonld'

export function TopicsIndexSeoShell({
  examSlug,
  examName,
  subjectSlug,
  subjectName,
  dbTable,
  children,
}: {
  examSlug: string
  examName: string
  subjectSlug: string
  subjectName: string
  dbTable: string
  children: ReactNode
}) {
  const base = `/exams/${examSlug}/${subjectSlug}`
  const h1 = `${examName} ${subjectName} Topics — MCQ Practice`
  const tags = isTopicBankSupported(dbTable) ? (TABLE_POPULAR_TAGS[dbTable] ?? []) : []

  const graphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbListNode([
        { name: 'Home', url: '/' },
        { name: 'Exams', url: '/exams' },
        { name: examName, url: `/exams/${examSlug}` },
        { name: subjectName, url: base },
        { name: 'Topics' },
      ]),
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(graphJsonLd) }} />
      <SeoPageHeader
        title={h1}
        subtitle={`Browse all ${examName} ${subjectName} topics — past papers, most repeated, and topic-wise MCQ sets.`}
      />

      {tags.length > 0 && (
        <SeoCrawlNav label={`${subjectName} topics`}>
          <ul>
            {tags.map((tag) => (
              <li key={tag}>
                <Link href={`${base}/topic/${tag}`}>{tagSlugToLabel(tag)}</Link>
              </li>
            ))}
          </ul>
        </SeoCrawlNav>
      )}

      <SeoCrawlNav label="Related practice">
        <ul>
          <li>
            <Link href={base}>All {subjectName} modes</Link>
          </li>
          <li>
            <Link href={`${base}/difficulty/easy`}>Easy MCQs</Link>
          </li>
          <li>
            <Link href={`${base}/difficulty/medium`}>Medium MCQs</Link>
          </li>
          <li>
            <Link href={`${base}/difficulty/hard`}>Hard MCQs</Link>
          </li>
        </ul>
      </SeoCrawlNav>

      {children}
    </>
  )
}
