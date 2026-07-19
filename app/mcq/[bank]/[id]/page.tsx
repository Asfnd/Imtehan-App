import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchMcqById } from '@/lib/seo/fetch-mcq-by-id'
import { mcqPageIndexingMeta, MCQ_INDEXABLE_BANKS } from '@/lib/seo/topic-indexing'
import { McqCrawlBlock } from '@/components/seo/McqCrawlBlock'
import { McqHumanRedirect } from '@/components/seo/McqHumanRedirect'
import { SeoCrawlOnly, SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'
import { buildQuizJsonLd } from '@/lib/seo/quiz-jsonld'
import { jsonLdString } from '@/lib/seo/jsonld'

/**
 * force-static + revalidate: first crawl builds HTML, later Googlebot hits
 * are CDN/ISR — cuts Fluid Active CPU. Public MCQ content only (no cookies).
 */
export const dynamic = 'force-static'
export const revalidate = 604800
export const dynamicParams = true

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
      <SeoCrawlOnly>
        <SeoPageHeader title={h1} subtitle={mcq.question} />
        <McqCrawlBlock mcqs={[mcq]} heading={h1} dbTable={bank} />
      </SeoCrawlOnly>
      <McqHumanRedirect />
    </>
  )
}
