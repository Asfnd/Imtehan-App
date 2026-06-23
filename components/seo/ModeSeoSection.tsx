import Link from 'next/link'
import { getExamConfig } from '@/lib/exam-configs'
import { getModeSeoContent, subjectLabel } from '@/lib/seo/examContent'
import type { SampleMcq } from '@/lib/seo/fetch-sample-mcqs'
import { correctOptionText } from '@/lib/seo/fetch-sample-mcqs'
import { breadcrumbListNode, jsonLdString } from '@/lib/seo/jsonld'
import { PRACTICE_MODES } from '@/lib/seo/sitemap-tiers'

const MODE_LABELS: Record<string, string> = {
  'most-repeated': 'Most Repeated',
  'most-important': 'Most Important',
  'past-papers': 'Past Papers',
  practice: 'Practice',
}

export default function ModeSeoSection({
  examSlug,
  subjectSlug,
  mode,
  sampleMcqs,
}: {
  examSlug: string
  subjectSlug: string
  mode: string
  sampleMcqs: SampleMcq[]
}) {
  const config = getExamConfig(examSlug)
  if (!config) return null
  const section = config.sections.find((s) => s.slug === subjectSlug)
  if (!section) return null

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
        about: {
          '@type': 'EducationalOccupationalProgram',
          name: examName,
          provider: { '@type': 'Organization', name: 'Imtehan' },
        },
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
                suggestedAnswer: [
                  { '@type': 'Answer', text: mcq.option_a },
                  { '@type': 'Answer', text: mcq.option_b },
                  { '@type': 'Answer', text: mcq.option_c },
                  { '@type': 'Answer', text: mcq.option_d },
                ],
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <section aria-label={`${examName} ${subjectName} ${modeLabel} guide`} className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(graphJsonLd) }} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/exams" className="hover:text-blue-600">Exams</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/exams/${examSlug}`} className="hover:text-blue-600">{examName}</Link>
        <span className="mx-1.5">/</span>
        <Link href={subjectUrl} className="hover:text-blue-600">{subjectName}</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">{modeLabel}</span>
      </nav>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{h1}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-gray-600">{intro}</p>

        <div className="mt-6">
          <h2 className="text-sm font-semibold text-gray-900">Other {examName} {subjectName} modes</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {siblingModes.map((m) => (
              <li key={m}>
                <Link
                  href={`${subjectUrl}/${m}`}
                  className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                >
                  {MODE_LABELS[m] ?? m}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {relatedSubjects.length > 0 && (
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-gray-900">More {examName} subjects</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {relatedSubjects.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/exams/${examSlug}/${s.slug}/${mode}`}
                    className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 hover:border-blue-300"
                  >
                    {s.label} {MODE_LABELS[mode] ?? mode}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {sampleMcqs.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Sample {examName} {subjectName} {modeLabel.toLowerCase()} questions
            </h2>
            <ol className="mt-4 space-y-6">
              {sampleMcqs.map((mcq, i) => (
                <li key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-sm font-medium text-gray-900">
                    <span className="text-gray-500">Q{i + 1}.</span> {mcq.question}
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>A) {mcq.option_a}</li>
                    <li>B) {mcq.option_b}</li>
                    <li>C) {mcq.option_c}</li>
                    <li>D) {mcq.option_d}</li>
                  </ul>
                  <p className="mt-2 text-xs font-medium text-green-700">
                    Answer: {correctOptionText(mcq)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900">Frequently asked questions</h2>
          <div className="mt-4 divide-y divide-gray-100">
            {faqs.map((f) => (
              <div key={f.question} className="py-4">
                <h3 className="text-[15px] font-semibold text-gray-900">{f.question}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          <Link href={subjectUrl} className="font-medium text-blue-600 hover:underline">
            All {examName} {subjectName} modes
          </Link>
          {' · '}
          <Link href={`/exams/category/${config.category}`} className="font-medium text-blue-600 hover:underline">
            {config.category.toUpperCase()} exam guide
          </Link>
          {' · '}
          <Link href={`/exams/${examSlug}`} className="font-medium text-blue-600 hover:underline">
            {examName} subjects
          </Link>
        </p>
      </div>
    </section>
  )
}
