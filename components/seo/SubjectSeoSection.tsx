import Link from 'next/link'
import { getExamConfig } from '@/lib/exam-configs'
import { getSubjectSeoContent } from '@/lib/seo/examContent'
import { getRelatedExamSlugs } from '@/lib/seo/related-exams'

/**
 * Server-rendered, exam+subject-specific SEO content for each exam subject page.
 *
 * These ~1,000 pages were client-only, so Google's first-pass HTML was a thin
 * shell. This adds a crawlable <h1>, unique intro, internal links to each
 * practice mode, and a subject FAQ (FAQPage schema) in the initial HTML so the
 * pages can be indexed and ranked instead of dropped as thin duplicates.
 */
export default function SubjectSeoSection({
  examSlug,
  subjectSlug,
}: {
  examSlug: string
  subjectSlug: string
}) {
  const config = getExamConfig(examSlug)
  if (!config) return null
  const hasSection = config.sections.some((s) => s.slug === subjectSlug)
  if (!hasSection) return null

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

  return (
    <section aria-label={`${examName} ${subjectName} guide`} className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{h1}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-gray-600">{intro}</p>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Ways to practise {examName} {subjectName}
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {modes.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`${subjectBase}/${m.slug}`}
                  className="block rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <span className="text-sm font-semibold text-blue-700">{m.label}</span>
                  <span className="mt-0.5 block text-xs text-gray-600">{m.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {related.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">Similar exams</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {related.map((exam) => (
                <li key={exam.slug}>
                  <Link
                    href={`/exams/${exam.slug}/${subjectSlug}`}
                    className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                  >
                    {exam.name} {subjectName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {examName} {subjectName}: frequently asked questions
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

        <p className="mt-8 text-sm text-gray-500">
          Back to{' '}
          <Link href={`/exams/${examSlug}`} className="font-medium text-blue-600 hover:underline">
            all {examName} subjects
          </Link>
          {' '}or browse{' '}
          <Link href="/exams" className="font-medium text-blue-600 hover:underline">
            other competitive exams
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
