import Link from 'next/link'
import { CATEGORY_SLUGS, getCategorySeoContent } from '@/lib/seo/categoryContent'
import { getFeaturedExams } from '@/lib/seo/related-exams'

const CATEGORY_LABELS: Record<string, string> = {
  medical: 'MDCAT',
  engineering: 'Engineering',
  css: 'CSS',
  pms: 'PMS',
  ppsc: 'PPSC',
  fpsc: 'FPSC',
  fia: 'FIA',
  provincial: 'Provincial',
  police: 'Police',
  military: 'Military',
  nts: 'NTS',
  ots: 'OTS',
  etea: 'ETEA',
  railways: 'Railways',
  banks: 'Banks',
  judiciary: 'Judiciary',
  devauth: 'Dev Authority',
  rescue: 'Rescue 1122',
  revenue: 'Revenue',
}

/** Server-rendered SEO block for /exams browse — category hubs + featured exams. */
export default function ExamsBrowseSeoSection() {
  const featured = getFeaturedExams()

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many competitive exams can I practice on Imtehan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Imtehan covers 200+ Pakistani competitive exams including CSS, PMS, MDCAT, PPSC, FPSC, FIA, NTS, police, military, banking and engineering entry tests with 150,000+ MCQs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are MCQs free to practice on Imtehan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. You can practise MCQs, past papers and mock tests for free. Premium unlocks detailed analytics and unlimited mock attempts.',
        },
      },
    ],
  }

  return (
    <section aria-label="Competitive exam preparation guide" className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          200+ Competitive Exams — MCQs, Past Papers &amp; Mock Tests
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
          Imtehan is Pakistan&apos;s all-in-one exam preparation platform. Practice CSS, PMS, MDCAT, PPSC One Paper,
          FPSC, FIA, NTS, ETEA, police, military, banking and engineering entry tests with subject-wise MCQs,
          most-repeated questions, solved past papers and timed mock exams — all free to start.
        </p>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">Browse by commission &amp; category</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_SLUGS.map((slug) => {
              const content = getCategorySeoContent(slug)
              if (!content) return null
              return (
                <li key={slug}>
                  <Link
                    href={`/exams/category/${slug}`}
                    className="block rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    <span className="text-sm font-semibold text-blue-700">
                      {CATEGORY_LABELS[slug] ?? content.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-gray-500">
                      {content.exams.length} exams · MCQs + mocks
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900">Most searched exams</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {featured.map((exam) => (
              <li key={exam.slug}>
                <Link
                  href={`/exams/${exam.slug}`}
                  className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
                >
                  {exam.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/css/past-papers"
                className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
              >
                CSS Past Papers
              </Link>
            </li>
            <li>
              <Link
                href="/mpt-practice"
                className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
              >
                CSS MPT Practice
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
