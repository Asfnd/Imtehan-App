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

export function HomeIndexingRelay() {
  const featured = getFeaturedExams()

  return (
    <section aria-label="Exam preparation categories" className="sr-only">
      <h2>Practice by exam commission</h2>
      <p>
        200+ recruitment tests — PPSC, FPSC, FIA, NTS, police, military, banks, MDCAT, FSc and
        engineering entry tests.
      </p>

      <nav aria-label="Product hubs">
        <ul>
          <li><Link href="/exams">All exams</Link></li>
          <li><Link href="/mdcat">MDCAT preparation</Link></li>
          <li><Link href="/fsc">FSc Pre-Medical MCQs</Link></li>
          <li><Link href="/css">CSS exam preparation</Link></li>
          <li><Link href="/mpt-practice">CSS MPT practice</Link></li>
          <li><Link href="/blog">Exam prep blog</Link></li>
        </ul>
      </nav>

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
          <li><Link href="/exams/fia-assistant">FIA Assistant</Link></li>
          <li><Link href="/exams/fia-staff-car-driver">FIA Staff Car Driver</Link></li>
          <li><Link href="/mdcat/biology">MDCAT Biology</Link></li>
          <li><Link href="/exams/ppsc-assistant/general-knowledge/past-papers/set/1">PPSC GK Past Papers Set 1</Link></li>
        </ul>
      </nav>
    </section>
  )
}
