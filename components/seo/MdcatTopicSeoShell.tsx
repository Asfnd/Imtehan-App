import Link from 'next/link'
import type { ReactNode } from 'react'
import type { QuizMcqRow } from '@/lib/set-integrity'
import { McqCrawlBlock } from '@/components/seo/McqCrawlBlock'
import { SeoCrawlOnly, SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'
import { buildQuizJsonLd } from '@/lib/seo/quiz-jsonld'
import { jsonLdString, breadcrumbListNode } from '@/lib/seo/jsonld'

const SUBJECT_NAMES: Record<string, string> = {
  biology: 'Biology',
  chemistry: 'Chemistry',
  physics: 'Physics',
  english: 'English',
  'logical-reasoning': 'Logical Reasoning',
}

const DIFF_LABELS: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

export function MdcatTopicSeoShell({
  subject,
  topicLabel,
  isDifficulty,
  dbTable,
  sampleMcqs,
  children,
}: {
  subject: string
  topicLabel: string
  isDifficulty: boolean
  dbTable: string
  sampleMcqs: QuizMcqRow[]
  children: ReactNode
}) {
  const subjectName = SUBJECT_NAMES[subject] ?? subject
  const encodedTopic = encodeURIComponent(topicLabel)
  const topicUrl = `/mdcat/${subject}/${encodedTopic}`
  const canonical = `https://imtehan.com${topicUrl}`

  const h1 = isDifficulty
    ? `MDCAT ${subjectName} ${topicLabel} Questions`
    : `MDCAT ${subjectName}: ${topicLabel} MCQs`
  const subtitle = `Practice MDCAT ${subjectName} ${topicLabel} MCQs with explanations — PMC, ETEA, NUMS entry test preparation.`

  const graphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbListNode([
        { name: 'Home', url: '/' },
        { name: 'MDCAT', url: '/mdcat' },
        { name: subjectName, url: `/mdcat/${subject}` },
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
      <SeoCrawlOnly>
        <SeoPageHeader title={h1} subtitle={subtitle} />
        <nav aria-label="MDCAT breadcrumb">
          <Link href="/mdcat">MDCAT</Link>
          {' / '}
          <Link href={`/mdcat/${subject}`}>{subjectName}</Link>
          {' / '}
          <span>{topicLabel}</span>
        </nav>
        <McqCrawlBlock mcqs={sampleMcqs} heading={h1} dbTable={dbTable} />
      </SeoCrawlOnly>
      {children}
    </>
  )
}

export function MdcatSetSeoShell({
  subject,
  topicLabel,
  isDifficulty,
  setNumber,
  dbTable,
  mcqs,
  children,
}: {
  subject: string
  topicLabel: string
  isDifficulty: boolean
  setNumber: number
  dbTable: string
  mcqs: QuizMcqRow[]
  children: ReactNode
}) {
  const subjectName = SUBJECT_NAMES[subject] ?? subject
  const diffLabel = DIFF_LABELS[topicLabel.toLowerCase()]
  const displayLabel = isDifficulty && diffLabel ? diffLabel : topicLabel
  const encodedTopic = encodeURIComponent(topicLabel)
  const setUrl = `/mdcat/${subject}/${encodedTopic}/set/${setNumber}`
  const canonical = `https://imtehan.com${setUrl}`

  const h1 = `MDCAT ${subjectName} ${displayLabel} — Set ${setNumber}`
  const subtitle = `${mcqs.length} MDCAT ${subjectName} ${displayLabel} MCQs with detailed explanations.`

  const graphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbListNode([
        { name: 'Home', url: '/' },
        { name: 'MDCAT', url: '/mdcat' },
        { name: subjectName, url: `/mdcat/${subject}` },
        { name: displayLabel, url: `/mdcat/${subject}/${encodedTopic}` },
        { name: `Set ${setNumber}` },
      ]),
      buildQuizJsonLd({ name: h1, description: subtitle, url: canonical, mcqs, bare: true }),
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(graphJsonLd) }} />
      <SeoCrawlOnly>
        <SeoPageHeader title={h1} subtitle={subtitle} />
        <McqCrawlBlock mcqs={mcqs} heading={h1} dbTable={dbTable} />
      </SeoCrawlOnly>
      {children}
    </>
  )
}
