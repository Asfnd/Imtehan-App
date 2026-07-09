import Link from 'next/link'
import type { ReactNode } from 'react'
import { CATEGORY_SLUGS, getCategorySeoContent } from '@/lib/seo/categoryContent'
import { getFeaturedExams } from '@/lib/seo/related-exams'
import { SeoDiscoverDetails, SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'

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

export function ExamsBrowseShell({ children }: { children: ReactNode }) {
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

  const catalogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Competitive Exams on Imtehan',
    description: 'Catalog of Pakistani competitive exams available for MCQ practice on Imtehan.',
    numberOfItems: featured.length,
    url: 'https://imtehan.com/exams',
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://imtehan.com' },
      { '@type': 'ListItem', position: 2, name: 'Exams', item: 'https://imtehan.com/exams' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <SeoPageHeader
        title="200+ Competitive Exams — MCQs, Past Papers & Mock Tests"
        subtitle="CSS, PMS, MDCAT, PPSC, FIA, NTS, police, military & engineering entry tests."
      />

      <nav aria-label="Exam categories" className="border-b border-gray-100 bg-white">
        <ul className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-2.5 sm:px-6">
          {CATEGORY_SLUGS.map((slug) => (
            <li key={slug}>
              <Link
                href={`/exams/category/${slug}`}
                className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 hover:border-blue-300 hover:bg-blue-50"
              >
                {CATEGORY_LABELS[slug] ?? slug.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {children}

      <SeoDiscoverDetails label="Exam preparation guide" hint="Categories, popular exams & FAQs">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_SLUGS.map((slug) => {
            const content = getCategorySeoContent(slug)
            if (!content) return null
            return (
              <Link
                key={slug}
                href={`/exams/category/${slug}`}
                className="block rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm hover:border-blue-300"
              >
                <span className="font-semibold text-blue-700">{CATEGORY_LABELS[slug] ?? content.label}</span>
                <span className="mt-0.5 block text-xs text-gray-500">{content.exams.length} exams</span>
              </Link>
            )
          })}
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {featured.map((exam) => (
            <li key={exam.slug}>
              <Link
                href={`/exams/${exam.slug}`}
                className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
              >
                {exam.name}
              </Link>
            </li>
          ))}
        </ul>
      </SeoDiscoverDetails>
    </>
  )
}

export default function ExamsBrowseSeoSection() {
  return <ExamsBrowseShell>{null}</ExamsBrowseShell>
}
