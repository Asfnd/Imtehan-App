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
 * Homepage crawl relay — category hubs & top exam URLs for Googlebot.
 * sr-only: zero visual change to the homepage.
 */
export function HomeIndexingRelay() {
  const featured = getFeaturedExams()

  return (
    <section aria-label="Exam preparation categories" className="sr-only">
      <h2>Practice by exam commission</h2>
      <p>
        200+ recruitment tests — PPSC, FPSC, FIA, NTS, police, military, banks, MDCAT and
        engineering entry tests.
      </p>

      <nav aria-label="Exam categories">
        <ul>
          {CATEGORY_SLUGS.map((slug) => (
            <li key={slug}>
              <Link href={`/exams/category/${slug}`}>
                {CATEGORY_LABELS[slug] ?? slug.toUpperCase()} MCQs
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Popular practice tests">
        <ul>
          {featured.map((exam) => (
            <li key={exam.slug}>
              <Link href={`/exams/${exam.slug}`}>{exam.name}</Link>
            </li>
          ))}
          <li>
            <Link href="/exams/ppsc-assistant/general-knowledge/past-papers">PPSC GK Past Papers</Link>
          </li>
          <li>
            <Link href="/exams/fia-constable/urdu/most-repeated">FIA Urdu MCQs</Link>
          </li>
          <li>
            <Link href="/exams/css-mpt/pakistan-affairs/practice">CSS MPT Pakistan Affairs</Link>
          </li>
        </ul>
      </nav>

      <p>
        <Link href="/exams">Browse all 200+ exams</Link>
      </p>
    </section>
  )
}
