import Link from 'next/link'
import type { ReactNode } from 'react'
import type { QuizMcqRow } from '@/lib/set-integrity'
import { McqCrawlBlock } from '@/components/seo/McqCrawlBlock'
import { SeoCrawlNav, SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'
import { SeoSiblingSetLinks } from '@/components/seo/SeoSiblingSetLinks'
import { buildQuizJsonLd } from '@/lib/seo/quiz-jsonld'
import { jsonLdString, breadcrumbListNode } from '@/lib/seo/jsonld'

export function TopicSeoShell({
  examSlug,
  examName,
  subjectSlug,
  subjectName,
  tagSlug,
  topicLabel,
  dbTable,
  sampleMcqs,
  children,
}: {
  examSlug: string
  examName: string
  subjectSlug: string
  subjectName: string
  tagSlug: string
  topicLabel: string
  dbTable: string
  sampleMcqs: QuizMcqRow[]
  children: ReactNode
}) {
  const topicUrl = `/exams/${examSlug}/${subjectSlug}/topic/${tagSlug}`
  const canonical = `https://imtehan.com${topicUrl}`
  const h1 = `${examName} ${subjectName}: ${topicLabel} MCQs`
  const subtitle = `Practice ${topicLabel} MCQs for ${examName} ${subjectName} — topic-wise sets with solved answers.`

  const graphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbListNode([
        { name: 'Home', url: '/' },
        { name: 'Exams', url: '/exams' },
        { name: examName, url: `/exams/${examSlug}` },
        { name: subjectName, url: `/exams/${examSlug}/${subjectSlug}` },
        { name: topicLabel },
      ]),
      ...(sampleMcqs.length > 0
        ? [
            buildQuizJsonLd({
              name: h1,
              description: subtitle,
              url: canonical,
              mcqs: sampleMcqs,
              bare: true,
            }),
          ]
        : []),
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
        <span>{topicLabel}</span>
      </SeoCrawlNav>
      <McqCrawlBlock
        mcqs={sampleMcqs}
        heading={`${h1} — sample questions`}
        dbTable={dbTable}
      />
      <SeoSiblingSetLinks basePath={topicUrl} currentSet={0} maxSet={3} label="Topic sets" />
      {children}
    </>
  )
}

export function TopicSetSeoShell({
  examSlug,
  examName,
  subjectSlug,
  subjectName,
  tagSlug,
  topicLabel,
  setNumber,
  dbTable,
  mcqs,
  children,
}: {
  examSlug: string
  examName: string
  subjectSlug: string
  subjectName: string
  tagSlug: string
  topicLabel: string
  setNumber: number
  dbTable: string
  mcqs: QuizMcqRow[]
  children: ReactNode
}) {
  const topicUrl = `/exams/${examSlug}/${subjectSlug}/topic/${tagSlug}`
  const setUrl = `${topicUrl}/set/${setNumber}`
  const canonical = `https://imtehan.com${setUrl}`
  const h1 = `${examName} ${subjectName} ${topicLabel} — Set ${setNumber}`
  const subtitle = `${topicLabel} MCQs set ${setNumber} for ${examName} ${subjectName} — ${mcqs.length} solved questions.`

  const graphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbListNode([
        { name: 'Home', url: '/' },
        { name: 'Exams', url: '/exams' },
        { name: examName, url: `/exams/${examSlug}` },
        { name: subjectName, url: `/exams/${examSlug}/${subjectSlug}` },
        { name: topicLabel, url: topicUrl },
        { name: `Set ${setNumber}` },
      ]),
      buildQuizJsonLd({
        name: h1,
        description: subtitle,
        url: canonical,
        mcqs: mcqs.slice(0, 5),
        bare: true,
      }),
      {
        '@type': 'LearningResource',
        '@id': canonical,
        name: h1,
        description: subtitle,
        url: canonical,
        learningResourceType: 'Quiz',
        inLanguage: 'en-PK',
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(graphJsonLd) }} />
      <SeoPageHeader title={h1} subtitle={subtitle} />
      <McqCrawlBlock mcqs={mcqs} heading={h1} dbTable={dbTable} />
      <SeoSiblingSetLinks basePath={topicUrl} currentSet={setNumber} maxSet={3} />
      {children}
    </>
  )
}
