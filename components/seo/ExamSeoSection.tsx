import Link from 'next/link'
import type { ExamConfig } from '@/lib/exam-configs'
import { getExamSeoContent } from '@/lib/seo/examContent'
import { getRelatedExamSlugs } from '@/lib/seo/related-exams'

/**
 * Server-rendered, exam-specific SEO content for each exam hub page.
 *
 * Renders a real <h1>, a unique intro, the paper pattern, internal links to
 * every subject, and an exam FAQ (with FAQPage structured data). This is the
 * crawlable, differentiated content that lets each exam page get indexed and
 * rank, instead of being treated as a thin duplicate of the others.
 */
export default function ExamSeoSection({ slug, config }: { slug: string; config: ExamConfig }) {
  const { h1, intro, facts, subjects, faqs, highlights, prep } = getExamSeoContent(slug, config)
  const base = `https://imtehan.com/exams/${slug}`
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

  return (
    <section
      aria-label={`${config.name} preparation guide`}
      className="mx-auto max-w-5xl px-4 py-10 sm:px-6"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{h1}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-gray-600">{intro}</p>

        {facts.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">{f.label}</dt>
                <dd className="mt-0.5 text-base font-semibold text-gray-900">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {highlights && highlights.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">{config.name}: key facts</h2>
            <ul className="mt-3 space-y-2">
              {highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm leading-relaxed text-gray-600">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {prep && prep.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">How to prepare for {config.name}</h2>
            <ol className="mt-3 space-y-2">
              {prep.map((p, i) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-gray-600">
                  <span aria-hidden className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">{i + 1}</span>
                  <span>{p}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {subjects.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">
              {config.name} subjects to practice
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {subjects.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/exams/${slug}/${s.slug}`}
                    className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                  >
                    {s.label} MCQs
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-gray-500">
              Each subject has most repeated, past paper and practice mode sets  -  open any subject above to start.
            </p>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">Related exams</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {related.map((exam) => (
                <li key={exam.slug}>
                  <Link
                    href={`/exams/${exam.slug}`}
                    className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-sm font-medium text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                  >
                    {exam.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={categoryHub}
                  className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
                >
                  All {config.category.toUpperCase()} exams →
                </Link>
              </li>
            </ul>
          </div>
        )}

        {faqs.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-900">
              {config.name} preparation: frequently asked questions
            </h2>
            <div className="mt-4 divide-y divide-gray-100">
              {faqs.map((f) => (
                <div key={f.question} className="py-4">
                  <h3 className="text-[15px] font-semibold text-gray-900">{f.question}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mt-8 text-sm text-gray-500">
          Explore more on{' '}
          <Link href="/exams" className="font-medium text-blue-600 hover:underline">
            all competitive exams
          </Link>
          {' '}or jump back to{' '}
          <Link href={base} className="font-medium text-blue-600 hover:underline">
            {config.name} practice
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
