import Link from 'next/link'
import { getCategorySeoContent } from '@/lib/seo/categoryContent'

export default function CategoryHubSeoSection({ category }: { category: string }) {
  const content = getCategorySeoContent(category)
  if (!content) return null

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

  return (
    <section
      aria-label={`${content.label} exam preparation guide`}
      className="mx-auto max-w-5xl px-4 py-10 sm:px-6"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{content.h1}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-gray-600">{content.intro}</p>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">{content.label}: what you need to know</h2>
          <ul className="mt-3 space-y-2">
            {content.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm leading-relaxed text-gray-600">
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">How to prepare</h2>
          <ol className="mt-3 space-y-2">
            {content.prep.map((p, i) => (
              <li key={p} className="flex gap-3 text-sm leading-relaxed text-gray-600">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                  {i + 1}
                </span>
                {p}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900">
            All {content.label} exams ({content.exams.length})
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {content.exams.map((exam) => (
              <li key={exam.slug}>
                <Link
                  href={`/exams/${exam.slug}`}
                  className="block rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <span className="text-sm font-semibold text-blue-700">{exam.name}</span>
                  <span className="mt-0.5 block text-xs text-gray-500">
                    {exam.subjectCount} subjects · MCQs + mocks
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 divide-y divide-gray-100">
          {content.faqs.map((f) => (
            <div key={f.question} className="py-4">
              <h3 className="text-[15px] font-semibold text-gray-900">{f.question}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{f.answer}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-500">
          <Link href="/exams" className="font-medium text-blue-600 hover:underline">
            Browse all competitive exams
          </Link>
        </p>
      </div>
    </section>
  )
}
