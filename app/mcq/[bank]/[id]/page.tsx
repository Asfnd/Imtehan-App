import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { fetchMcqById } from '@/lib/seo/fetch-mcq-by-id'
import { mcqPageIndexingMeta, MCQ_INDEXABLE_BANKS } from '@/lib/seo/topic-indexing'
import { McqCrawlBlock } from '@/components/seo/McqCrawlBlock'
import { SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'
import { buildQuizJsonLd } from '@/lib/seo/quiz-jsonld'
import { jsonLdString } from '@/lib/seo/jsonld'

const BANK_LABELS: Record<string, string> = {
  english: 'English',
  general_knowledge: 'General Knowledge',
  pakistan_studies: 'Pakistan Studies',
  islamiat: 'Islamiat',
  mdcat_biology: 'MDCAT Biology',
  mdcat_chemistry: 'MDCAT Chemistry',
  mdcat_physics: 'MDCAT Physics',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bank: string; id: string }>
}): Promise<Metadata> {
  const { bank, id: idStr } = await params
  const id = parseInt(idStr, 10)
  const selfCanonical = `https://imtehan.com/mcq/${bank}/${id}`
  const indexing = mcqPageIndexingMeta(bank, id, selfCanonical)
  const label = BANK_LABELS[bank] ?? bank.replace(/_/g, ' ')

  const title = `${label} MCQ #${id} with Answer`
  const description = `Solved ${label} multiple choice question #${id} with answer and explanation — Pakistan competitive exam MCQ practice on Imtehan.`

  return {
    title,
    description,
    robots: indexing.robots,
    alternates: { canonical: indexing.canonical },
    openGraph: { title, description, url: selfCanonical, type: 'article' },
  }
}

export default async function McqPage({
  params,
}: {
  params: Promise<{ bank: string; id: string }>
}) {
  const { bank, id: idStr } = await params
  const id = parseInt(idStr, 10)
  if (!MCQ_INDEXABLE_BANKS.has(bank)) notFound()

  const mcq = await fetchMcqById(bank, id)
  if (!mcq) notFound()

  const label = BANK_LABELS[bank] ?? bank.replace(/_/g, ' ')
  const h1 = `${label} MCQ #${id}`
  const canonical = `https://imtehan.com/mcq/${bank}/${id}`

  const quizJsonLd = buildQuizJsonLd({
    name: h1,
    description: mcq.question,
    url: canonical,
    mcqs: [mcq],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(quizJsonLd) }} />
      <SeoPageHeader title={h1} subtitle={mcq.question} />
      <McqCrawlBlock mcqs={[mcq]} heading={h1} dbTable={bank} />

      {/* Minimal practice entry — not an SEO wall */}
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="mb-4 text-sm text-gray-500">
          <Link href="/exams" className="text-blue-600 hover:underline">
            ← Browse exams
          </Link>
        </p>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-900">{mcq.question}</p>
          <ul className="mt-3 space-y-1 text-sm text-gray-600">
            <li>A) {mcq.option_a}</li>
            <li>B) {mcq.option_b}</li>
            <li>C) {mcq.option_c}</li>
            <li>D) {mcq.option_d}</li>
          </ul>
          <p className="mt-4 text-sm">
            <Link href="/exams" className="font-medium text-blue-600 hover:underline">
              Practice full sets on Imtehan →
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
