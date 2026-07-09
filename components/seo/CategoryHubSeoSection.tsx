import type { ReactNode } from 'react'
import Link from 'next/link'
import { getCategorySeoContent } from '@/lib/seo/categoryContent'
import { SeoDiscoverDetails, SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'

export function CategoryHubShell({
  category,
  children,
}: {
  category: string
  children: ReactNode
}) {
  const content = getCategorySeoContent(category)
  if (!content) return <>{children}</>

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${content.label} exams on Imtehan`,
    numberOfItems: content.exams.length,
    itemListElement: content.exams.map((exam, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: exam.name,
      url: `https://imtehan.com/exams/${exam.slug}`,
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://imtehan.com' },
      { '@type': 'ListItem', position: 2, name: 'Exams', item: 'https://imtehan.com/exams' },
      { '@type': 'ListItem', position: 3, name: content.label, item: `https://imtehan.com/exams/category/${category}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <SeoPageHeader title={content.h1} subtitle={content.intro} />

      {children}

      <SeoDiscoverDetails label={`${content.label} preparation guide`}>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-800">What you need to know</h3>
          <ul className="space-y-1.5">
            {content.highlights.map((h) => (
              <li key={h} className="text-sm text-gray-600">• {h}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-800">How to prepare</h3>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm text-gray-600">
            {content.prep.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
        </div>
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-800">FAQs</h3>
          {content.faqs.map((f) => (
            <div key={f.question} className="mb-3">
              <p className="text-sm font-medium text-gray-800">{f.question}</p>
              <p className="mt-0.5 text-sm text-gray-600">{f.answer}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link href="/exams" className="font-medium text-blue-600 hover:underline">
            Browse all competitive exams
          </Link>
        </p>
      </SeoDiscoverDetails>
    </>
  )
}

export default function CategoryHubSeoSection({ category }: { category: string }) {
  return <CategoryHubShell category={category}>{null}</CategoryHubShell>
}
