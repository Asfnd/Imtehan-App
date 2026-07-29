import Link from 'next/link'
import type { ReactNode } from 'react'
import type { ExamConfig } from '@/lib/exam-configs'
import { getExamSeoContent } from '@/lib/seo/examContent'
import { getRelatedExamSlugs } from '@/lib/seo/related-exams'
import { SeoDiscoverDetails, SeoCrawlNav, SeoCrawlOnly, SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'

export function ExamSeoShell({
  slug,
  config,
  children,
}: {
  slug: string
  config: ExamConfig
  children: ReactNode
}) {
  const { h1, intro, facts, subjects, faqs, highlights, prep } = getExamSeoContent(slug, config)
  // Must be relative — absolute hrefs in Link can concatenate onto the current path.
  const base = `/exams/${slug}`
  const related = getRelatedExamSlugs(slug, config.category)
  const categoryHub = `/exams/category/${config.category}`

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
      <SeoCrawlOnly>
        <SeoPageHeader title={h1} subtitle={shortIntro} />

        {subjects.length > 0 && (
          <SeoCrawlNav label={`${config.name} subjects`}>
            <ul>
              {subjects.map((s) => (
                <li key={s.slug}>
                  <Link href={`/exams/${slug}/${s.slug}`}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </SeoCrawlNav>
        )}

        <SeoCrawlNav label="Full mock tests">
          <ul>
            <li>
              <Link href={`/exams/${slug}/mocks`}>{config.name} mock tests</Link>
            </li>
          </ul>
        </SeoCrawlNav>
      </SeoCrawlOnly>

      {children}

      <SeoDiscoverDetails label={`About ${config.name}`}>
        <p className="text-sm leading-relaxed text-gray-600">{intro}</p>

        {facts.length > 0 && (
          <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5">
                <dt className="text-[10px] font-medium uppercase tracking-wide text-gray-500">{f.label}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-gray-900">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {highlights && highlights.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-900">Key facts</h2>
            <ul className="mt-2 space-y-1.5">
              {highlights.map((h) => (
                <li key={h} className="text-sm text-gray-600">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {prep && prep.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-900">How to prepare</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm text-gray-600">
              {prep.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-900">Related exams</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {related.map((exam) => (
                <li key={exam.slug}>
                  <Link
                    href={`/exams/${exam.slug}`}
                    className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 hover:border-blue-300"
                  >
                    {exam.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={categoryHub}
                  className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                >
                  All {config.category.toUpperCase()} →
                </Link>
              </li>
            </ul>
          </div>
        )}

        {faqs.length > 0 && (
          <div className="mt-6 divide-y divide-gray-100">
            {faqs.map((f) => (
              <div key={f.question} className="py-3 first:pt-0">
                <h3 className="text-sm font-semibold text-gray-900">{f.question}</h3>
                <p className="mt-1 text-sm text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-5 text-xs text-gray-500">
          <Link href="/exams" className="text-blue-600 hover:underline">
            All exams
          </Link>
          {' · '}
          <Link href={base} className="text-blue-600 hover:underline">
            {config.name}
          </Link>
        </p>
      </SeoDiscoverDetails>
    </>
  )
}

/** @deprecated Use ExamSeoShell — kept for imports that expect standalone section */
export default function ExamSeoSection({ slug, config }: { slug: string; config: ExamConfig }) {
  return <ExamSeoShell slug={slug} config={config}>{null}</ExamSeoShell>
}
