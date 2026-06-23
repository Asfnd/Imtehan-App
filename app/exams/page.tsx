import { Suspense } from 'react'
import { EXAM_CONFIGS } from '@/lib/exam-configs'
import ExamsPageClient from '@/components/ExamsPageClient'
import ExamsBrowseSeoSection from '@/components/seo/ExamsBrowseSeoSection'

const EXAMS_CATALOG_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Competitive Exams on Imtehan',
  description: 'Catalog of Pakistani competitive exams available for MCQ practice on Imtehan.',
  numberOfItems: Object.keys(EXAM_CONFIGS).length,
  itemListElement: Object.entries(EXAM_CONFIGS).map(([slug, config], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: config.name,
    url: `https://imtehan.com/exams/${slug}`,
  })),
})

const EXAMS_BREADCRUMB_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://imtehan.com' },
    { '@type': 'ListItem', position: 2, name: 'Exams', item: 'https://imtehan.com/exams' },
  ],
})

export default function ExamsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: EXAMS_CATALOG_JSONLD }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: EXAMS_BREADCRUMB_JSONLD }} />
      <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
        <ExamsPageClient />
      </Suspense>
      <ExamsBrowseSeoSection />
    </>
  )
}
