import Link from 'next/link'
import type { ReactNode } from 'react'
import { getExamConfig } from '@/lib/exam-configs'
import { getSubjectSeoContent } from '@/lib/seo/examContent'
import { getRelatedExamSlugs } from '@/lib/seo/related-exams'
import { SeoDiscoverDetails, SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'

export function SubjectSeoShell({
  examSlug,
  subjectSlug,
  children,
}: {
  examSlug: string
  subjectSlug: string
  children: ReactNode
}) {
  const config = getExamConfig(examSlug)
  if (!config) return <>{children}</>
  const hasSection = config.sections.some((s) => s.slug === subjectSlug)
  if (!hasSection) return <>{children}</>

  const { h1, examName, subjectName, intro, modes, faqs } = getSubjectSeoContent(
    examSlug,
    subjectSlug,
    config,
  )
  const subjectBase = `/exams/${examSlug}/${subjectSlug}`
  const related = getRelatedExamSlugs(examSlug, config.category, 5).filter((exam) =>
    getExamConfig(exam.slug)?.sections.some((s) => s.slug === subjectSlug),
  )

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const shortIntro = intro.length > 160 ? `${intro.slice(0, 157)}…` : intro

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SeoPageHeader title={h1} subtitle={shortIntro} />

      <nav aria-label="Practice modes" className="border-b border-gray-100 bg-white">
        <ul className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-2.5 sm:px-6">
          {modes.map((m) => (
            <li key={m.slug}>
              <Link
                href={`${subjectBase}/${m.slug}`}
                className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
              >
                {m.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {children}

      <SeoDiscoverDetails label={`${subjectName} guide`} hint="Practice modes & FAQs">
        <p className="text-sm leading-relaxed text-gray-600">{intro}</p>

        {related.length > 0 && (
          <div className="mt-5">
            <h2 className="text-sm font-semibold text-gray-900">Same subject, other exams</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {related.map((exam) => (
                <li key={exam.slug}>
                  <Link
                    href={`/exams/${exam.slug}/${subjectSlug}`}
                    className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {exam.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-5 divide-y divide-gray-100">
          {faqs.map((f) => (
            <div key={f.question} className="py-3 first:pt-0">
              <h3 className="text-sm font-semibold text-gray-900">{f.question}</h3>
              <p className="mt-1 text-sm text-gray-600">{f.answer}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-gray-500">
          <Link href={`/exams/${examSlug}`} className="text-blue-600 hover:underline">
            {examName} subjects
          </Link>
          {' · '}
          <Link href="/exams" className="text-blue-600 hover:underline">
            All exams
          </Link>
        </p>
      </SeoDiscoverDetails>
    </>
  )
}

export default function SubjectSeoSection({
  examSlug,
  subjectSlug,
}: {
  examSlug: string
  subjectSlug: string
}) {
  return <SubjectSeoShell examSlug={examSlug} subjectSlug={subjectSlug}>{null}</SubjectSeoShell>
}
