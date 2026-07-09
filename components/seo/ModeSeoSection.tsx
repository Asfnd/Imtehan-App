import Link from 'next/link'
import type { ReactNode } from 'react'
import { getExamConfig } from '@/lib/exam-configs'
import { getModeSeoContent, subjectLabel } from '@/lib/seo/examContent'
import type { SampleMcq } from '@/lib/seo/fetch-sample-mcqs'
import { buildQuizJsonLd } from '@/lib/seo/quiz-jsonld'
import { breadcrumbListNode, jsonLdString } from '@/lib/seo/jsonld'
import { PRACTICE_MODES } from '@/lib/seo/sitemap-tiers'
import { McqCrawlBlock } from '@/components/seo/McqCrawlBlock'
import { SeoDiscoverDetails, SeoCrawlNav, SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'

const MODE_LABELS: Record<string, string> = {
  'most-repeated': 'Most Repeated',
  'most-important': 'Most Important',
  'past-papers': 'Past Papers',
  practice: 'Practice',
}

export function ModeSeoShell({
  examSlug,
  subjectSlug,
  mode,
  sampleMcqs,
  dbTable,
  children,
}: {
  examSlug: string
  subjectSlug: string
  mode: string
  sampleMcqs: SampleMcq[]
  dbTable?: string
  children: ReactNode
}) {
  const config = getExamConfig(examSlug)
  if (!config) return <>{children}</>
  const section = config.sections.find((s) => s.slug === subjectSlug)
  if (!section) return <>{children}</>

  const subjectName = subjectLabel(subjectSlug)
  const { h1, examName, modeLabel, intro, faqs } = getModeSeoContent(
    examSlug,
    subjectSlug,
    mode,
    config,
  )

  const subjectUrl = `/exams/${examSlug}/${subjectSlug}`
  const modeUrl = `${subjectUrl}/${mode}`
  const canonical = `https://imtehan.com${modeUrl}`
  const siblingModes = PRACTICE_MODES.filter((m) => m !== mode)
  const relatedSubjects = config.sections.filter((s) => s.slug !== subjectSlug).slice(0, 4)

  const graphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbListNode([
        { name: 'Home', url: '/' },
        { name: 'Exams', url: '/exams' },
        { name: examName, url: `/exams/${examSlug}` },
        { name: subjectName, url: subjectUrl },
        { name: modeLabel },
      ]),
      {
        '@type': 'WebPage',
        '@id': canonical,
        url: canonical,
        name: h1,
        description: intro,
        inLanguage: 'en-PK',
        isPartOf: { '@id': 'https://imtehan.com/#website' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
      ...(sampleMcqs.length > 0
        ? [
            buildQuizJsonLd({
              name: h1,
              description: intro,
              url: canonical,
              mcqs: sampleMcqs,
              bare: true,
            }),
          ]
        : []),
    ],
  }

  const shortIntro = intro.length > 160 ? `${intro.slice(0, 157)}…` : intro

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(graphJsonLd) }} />
      <SeoPageHeader title={h1} subtitle={shortIntro} />

      <SeoCrawlNav label="Breadcrumb">
        <Link href="/exams">Exams</Link>
        <span> / </span>
        <Link href={`/exams/${examSlug}`}>{examName}</Link>
        <span> / </span>
        <Link href={subjectUrl}>{subjectName}</Link>
        <span> / </span>
        <span>{modeLabel}</span>
      </SeoCrawlNav>

      {children}

      <McqCrawlBlock
        mcqs={sampleMcqs}
        heading={`${examName} ${subjectName} ${modeLabel} sample MCQs`}
        dbTable={dbTable}
      />

      <SeoDiscoverDetails label="Sample questions and FAQs">
        <ul>
          {siblingModes.map((m) => (
            <li key={m}>
              <Link href={`${subjectUrl}/${m}`}>{MODE_LABELS[m] ?? m}</Link>
            </li>
          ))}
        </ul>

        {relatedSubjects.length > 0 && (
          <ul>
            {relatedSubjects.map((s) => (
              <li key={s.slug}>
                <Link href={`/exams/${examSlug}/${s.slug}/${mode}`}>{s.label}</Link>
              </li>
            ))}
          </ul>
        )}

        <div>
          {faqs.map((f) => (
            <div key={f.question}>
              <h3>{f.question}</h3>
              <p>{f.answer}</p>
            </div>
          ))}
        </div>
      </SeoDiscoverDetails>
    </>
  )
}

export default function ModeSeoSection(props: {
  examSlug: string
  subjectSlug: string
  mode: string
  sampleMcqs: SampleMcq[]
}) {
  return <ModeSeoShell {...props}>{null}</ModeSeoShell>
}
