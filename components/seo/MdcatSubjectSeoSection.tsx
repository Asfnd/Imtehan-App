import Link from 'next/link'
import { getMdcatSubjectSeoContent } from '@/lib/seo/examContent'

/**
 * Server-rendered SEO content for MDCAT subject pages (Biology, Chemistry,
 * Physics, English, Logical Reasoning), which were client-only and sat in
 * "Crawled - currently not indexed". Adds a crawlable h1, unique intro, topic
 * list, mock-test links and a subject FAQ (FAQPage schema) in the initial HTML.
 */
export default function MdcatSubjectSeoSection({ subject }: { subject: string }) {
  const content = getMdcatSubjectSeoContent(subject)
  if (!content) return null
  const { h1, subjectName, intro, topics, faqs } = content

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
    <section aria-label={`MDCAT ${subjectName} guide`} className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{h1}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-gray-600">{intro}</p>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900">MDCAT {subjectName} topics</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {topics.map((t) => (
              <li
                key={t}
                className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-sm font-medium text-emerald-700"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">MDCAT {subjectName}: frequently asked questions</h2>
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
          Take a full mock test:{' '}
          <Link href="/mdcat/mock/pmc" className="font-medium text-emerald-600 hover:underline">PMC</Link>,{' '}
          <Link href="/mdcat/mock/etea" className="font-medium text-emerald-600 hover:underline">ETEA</Link>,{' '}
          <Link href="/mdcat/mock/nums" className="font-medium text-emerald-600 hover:underline">NUMS</Link>
          {' '}or browse all{' '}
          <Link href="/mdcat" className="font-medium text-emerald-600 hover:underline">MDCAT subjects</Link>.
        </p>
      </div>
    </section>
  )
}
