import Link from 'next/link'
import type { ReactNode } from 'react'
import type { QuizMcqRow } from '@/lib/set-integrity'
import { McqCrawlBlock } from '@/components/seo/McqCrawlBlock'
import { SeoCrawlNav, SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'
import { SeoSiblingSetLinks } from '@/components/seo/SeoSiblingSetLinks'
import { buildQuizJsonLd } from '@/lib/seo/quiz-jsonld'
import { jsonLdString, breadcrumbListNode } from '@/lib/seo/jsonld'

const MODE_LABELS: Record<string, string> = {
  'most-repeated': 'Most Repeated',
  'most-important': 'Most Important',
  'past-papers': 'Past Papers',
  practice: 'Practice',
}

export function SetSeoShell({
  examSlug,
  examName,
  subjectSlug,
  subjectName,
  mode,
  setNumber,
  dbTable,
  maxSiblingSets = 3,
  mcqs,
  children,
}: {
  examSlug: string
  examName: string
  subjectSlug: string
  subjectName: string
  mode: string
  setNumber: number
  dbTable?: string
  maxSiblingSets?: number
  mcqs: QuizMcqRow[]
  children: ReactNode
}) {
  const modeLabel = MODE_LABELS[mode] ?? mode
  const modeUrl = `/exams/${examSlug}/${subjectSlug}/${mode}`
  const setUrl = `${modeUrl}/set/${setNumber}`
  const canonical = `https://imtehan.com${setUrl}`

  const h1 = `${examName} ${subjectName} ${modeLabel} — Set ${setNumber} (${mcqs.length} MCQs)`
  const subtitle = `Solved ${modeLabel.toLowerCase()} MCQs for ${examName} ${subjectName} — set ${setNumber} of ${mcqs.length} questions with answers.`

  const quizJsonLd = buildQuizJsonLd({
    name: h1,
    description: subtitle,
    url: canonical,
    // Cap JSON-LD size — full answers stay in crawl HTML for Google.
    mcqs: mcqs.slice(0, 5),
    bare: true,
  })

  const graphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbListNode([
        { name: 'Home', url: '/' },
        { name: 'Exams', url: '/exams' },
        { name: examName, url: `/exams/${examSlug}` },
        { name: subjectName, url: `/exams/${examSlug}/${subjectSlug}` },
        { name: modeLabel, url: modeUrl },
        { name: `Set ${setNumber}` },
      ]),
      quizJsonLd,
      {
        '@type': 'LearningResource',
        '@id': canonical,
        name: h1,
        description: subtitle,
        url: canonical,
        learningResourceType: 'Quiz',
        educationalLevel: 'intermediate',
        inLanguage: 'en-PK',
        isPartOf: { '@type': 'WebSite', name: 'Imtehan', url: 'https://imtehan.com' },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(graphJsonLd) }} />
      <SeoPageHeader title={h1} subtitle={subtitle} />
      <SeoCrawlNav label="Breadcrumb">
        <Link href="/exams">Exams</Link>
        {' / '}
        <Link href={`/exams/${examSlug}`}>{examName}</Link>
        {' / '}
        <Link href={`/exams/${examSlug}/${subjectSlug}`}>{subjectName}</Link>
        {' / '}
        <Link href={modeUrl}>{modeLabel}</Link>
        {' / '}
        <span>Set {setNumber}</span>
      </SeoCrawlNav>
      <McqCrawlBlock mcqs={mcqs} heading={`${h1} — questions and answers`} dbTable={dbTable} />
      <SeoSiblingSetLinks
        basePath={`/exams/${examSlug}/${subjectSlug}/${mode}`}
        currentSet={setNumber}
        maxSet={maxSiblingSets}
      />
      {children}
    </>
  )
}
