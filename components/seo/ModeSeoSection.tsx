import Link from 'next/link'
import type { ReactNode } from 'react'
import { getExamConfig } from '@/lib/exam-configs'
import { getModeSeoContent, subjectLabel } from '@/lib/seo/examContent'
import type { SampleMcq } from '@/lib/seo/fetch-sample-mcqs'
import { correctOptionText } from '@/lib/seo/fetch-sample-mcqs'
import { breadcrumbListNode, jsonLdString } from '@/lib/seo/jsonld'
import { PRACTICE_MODES } from '@/lib/seo/sitemap-tiers'
import { SeoDiscoverDetails, SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'

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
  children,
}: {
  examSlug: string
  subjectSlug: string
  mode: string
  sampleMcqs: SampleMcq[]
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
            {
              '@type': 'Quiz',
              name: h1,
              description: intro,
              url: canonical,
              provider: { '@type': 'Organization', name: 'Imtehan', url: 'https://imtehan.com' },
              educationalUse: 'practice',
              inLanguage: 'en-PK',
              hasPart: sampleMcqs.map((mcq) => ({
                '@type': 'Question',
                eduQuestionType: 'Multiple choice',
                text: mcq.question,
                acceptedAnswer: { '@type': 'Answer', text: correctOptionText(mcq) },
              })),
            },
          ]
        : []),
    ],
  }

  const shortIntro = intro.length > 160 ? `${intro.slice(0, 157)}…` : intro

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(graphJsonLd) }} />
      <SeoPageHeader title={h1} subtitle={shortIntro} />

      <nav aria-label="Breadcrumb" className="border-b border-gray-100 bg-white px-4 py-2 text-xs text-gray-500 sm:px-6">
        <Link href="/exams" className="hover:text-blue-600">Exams</Link>
        <span className="mx-1">/</span>
        <Link href={`/exams/${examSlug}`} className="hover:text-blue-600">{examName}</Link>
        <span className="mx-1">/</span>
        <Link href={subjectUrl} className="hover:text-blue-600">{subjectName}</Link>
        <span className="mx-1">/</span>
        <span className="text-gray-800">{modeLabel}</span>
      </nav>

      {children}

      <SeoDiscoverDetails label="Sample questions & FAQs" hint={`${sampleMcqs.length} preview MCQs`}>
        <ul className="mb-4 flex flex-wrap gap-2">
          {siblingModes.map((m) => (
            <li key={m}>
              <Link
                href={`${subjectUrl}/${m}`}
                className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
              >
                {MODE_LABELS[m] ?? m}
              </Link>
            </li>
          ))}
        </ul>

        {sampleMcqs.length > 0 && (
          <ol className="space-y-4">
            {sampleMcqs.map((mcq, i) => (
              <li key={i} className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm">
                <p className="font-medium text-gray-900">
                  Q{i + 1}. {mcq.question}
                </p>
                <ul className="mt-1.5 space-y-0.5 text-gray-600">
                  <li>A) {mcq.option_a}</li>
                  <li>B) {mcq.option_b}</li>
                  <li>C) {mcq.option_c}</li>
                  <li>D) {mcq.option_d}</li>
                </ul>
                <p className="mt-1.5 text-xs font-medium text-green-700">
                  Answer: {correctOptionText(mcq)}
                </p>
              </li>
            ))}
          </ol>
        )}

        {relatedSubjects.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {relatedSubjects.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/exams/${examSlug}/${s.slug}/${mode}`}
                  className="inline-flex rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 divide-y divide-gray-100">
          {faqs.map((f) => (
            <div key={f.question} className="py-3 first:pt-0">
              <h3 className="text-sm font-semibold text-gray-900">{f.question}</h3>
              <p className="mt-1 text-sm text-gray-600">{f.answer}</p>
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
