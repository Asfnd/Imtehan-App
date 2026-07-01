import Link from 'next/link'
import { CATEGORY_SLUGS } from '@/lib/seo/categoryContent'
import { getFeaturedExams } from '@/lib/seo/related-exams'

const CATEGORY_LABELS: Record<string, string> = {
  ppsc: 'PPSC',
  fpsc: 'FPSC',
  fia: 'FIA',
  css: 'CSS',
  pms: 'PMS',
  nts: 'NTS',
  etea: 'ETEA',
  police: 'Police',
  military: 'Military',
  banks: 'Banks',
  engineering: 'Engineering',
  medical: 'MDCAT',
  judiciary: 'Judiciary',
}

/**
 * Homepage crawl relay  -  links Googlebot to category hubs and top exam/mode URLs
 * within 2 clicks of /. Critical for "discovered not indexed" recovery.
 */
export function HomeIndexingRelay() {
  const featured = getFeaturedExams()

  return (
    <section
      aria-label="Exam preparation categories"
      className="border-t border-gray-100 bg-white py-10 sm:py-12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold text-gray-900 sm:text-xl">
          Practice by exam commission
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-gray-600">
          200+ recruitment tests  -  PPSC, FPSC, FIA, NTS, police, military, banks, MDCAT and engineering entry tests.
        </p>

        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {CATEGORY_SLUGS.map((slug) => (
            <li key={slug}>
              <Link
                href={`/exams/category/${slug}`}
                className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-800 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
              >
                {CATEGORY_LABELS[slug] ?? slug.toUpperCase()} MCQs
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-gray-500">
            Popular practice tests
          </h3>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {featured.map((exam) => (
              <li key={exam.slug}>
                <Link
                  href={`/exams/${exam.slug}`}
                  className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
                >
                  {exam.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/exams/ppsc-assistant/general-knowledge/past-papers"
                className="inline-flex rounded-full border border-gray-200 px-3.5 py-1.5 text-sm font-medium text-gray-700 hover:border-blue-300"
              >
                PPSC GK Past Papers
              </Link>
            </li>
            <li>
              <Link
                href="/exams/fia-constable/urdu/most-repeated"
                className="inline-flex rounded-full border border-gray-200 px-3.5 py-1.5 text-sm font-medium text-gray-700 hover:border-blue-300"
              >
                FIA Urdu MCQs
              </Link>
            </li>
            <li>
              <Link
                href="/exams/css-mpt/pakistan-affairs/practice"
                className="inline-flex rounded-full border border-gray-200 px-3.5 py-1.5 text-sm font-medium text-gray-700 hover:border-blue-300"
              >
                CSS MPT Pakistan Affairs
              </Link>
            </li>
          </ul>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          <Link href="/exams" className="font-medium text-blue-600 hover:underline">
            Browse all 200+ exams →
          </Link>
        </p>
      </div>
    </section>
  )
}
