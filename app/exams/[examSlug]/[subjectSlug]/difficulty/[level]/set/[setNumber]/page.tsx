import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { difficultyDbValue } from '@/lib/topic-tags'
import { difficultyIndexingMeta } from '@/lib/seo/topic-indexing'
import { McqCrawlBlock } from '@/components/seo/McqCrawlBlock'
import { SeoPageHeader } from '@/components/seo/SeoDiscoverDetails'
import { SeoSiblingSetLinks } from '@/components/seo/SeoSiblingSetLinks'
import { buildQuizJsonLd } from '@/lib/seo/quiz-jsonld'
import { jsonLdString } from '@/lib/seo/jsonld'
import QuizInterface from '@/components/QuizInterface'
import { cachedFetchMCQsByDifficultySet, seoMcqsForSet } from '@/lib/cached-quiz-fetch'

/** Public SEO page — ISR 24h to cut crawl CPU. */
export const revalidate = 86400

const VALID_LEVELS = ['easy', 'medium', 'hard'] as const
const LEVEL_LABELS: Record<string, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    examSlug: string
    subjectSlug: string
    level: string
    setNumber: string
  }>
}): Promise<Metadata> {
  const { examSlug, subjectSlug, level, setNumber: setStr } = await params
  const config = getExamConfig(examSlug)
  const section = config?.sections.find((s) => s.slug === subjectSlug)
  const setNumber = parseInt(setStr, 10)
  const selfCanonical = `https://imtehan.com/exams/${examSlug}/${subjectSlug}/difficulty/${level}/set/${setNumber}`
  const indexing = difficultyIndexingMeta(examSlug, section?.dbTable ?? '', selfCanonical, setNumber)
  const levelLabel = LEVEL_LABELS[level] ?? level
  const title = `${config?.name ?? examSlug} ${subjectSlug} ${levelLabel} Set ${setNumber} — MCQs Solved`
  const description = `${levelLabel} difficulty MCQs set ${setNumber} with solved answers.`

  return {
    title,
    description,
    robots: indexing.robots,
    alternates: { canonical: indexing.canonical },
    openGraph: { title, description, url: selfCanonical, type: 'website' },
  }
}

export default async function DifficultyQuizSetPage({
  params,
}: {
  params: Promise<{
    examSlug: string
    subjectSlug: string
    level: string
    setNumber: string
  }>
}) {
  const { examSlug, subjectSlug, level, setNumber: setNumberStr } = await params

  if (!VALID_LEVELS.includes(level as (typeof VALID_LEVELS)[number])) notFound()

  const config = getExamConfig(examSlug)
  if (!config) notFound()

  const section = config.sections.find((s) => s.slug === subjectSlug)
  if (!section) notFound()

  const setNumber = parseInt(setNumberStr, 10)
  if (isNaN(setNumber) || setNumber < 1) notFound()

  const mcqs = await cachedFetchMCQsByDifficultySet({
    dbTable: section.dbTable,
    difficulty: difficultyDbValue(level, section.dbTable),
    setNumber,
    subjectField: section.subjectField,
  }).catch(() => null)

  if (!mcqs || mcqs.length === 0) notFound()

  const levelLabel = LEVEL_LABELS[level] ?? level
  const h1 = `${config.name} ${subjectSlug} ${levelLabel} — Set ${setNumber}`
  const canonical = `https://imtehan.com/exams/${examSlug}/${subjectSlug}/difficulty/${level}/set/${setNumber}`
  const seoMcqs = seoMcqsForSet(setNumber, mcqs)
  const quizJsonLd = buildQuizJsonLd({
    name: h1,
    description: `${levelLabel} MCQs set ${setNumber}`,
    url: canonical,
    mcqs: seoMcqs.length ? seoMcqs : mcqs.slice(0, 1),
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(quizJsonLd) }} />
      <SeoPageHeader title={h1} subtitle={`${levelLabel} MCQs with answers`} />
      <McqCrawlBlock mcqs={seoMcqs} heading={h1} dbTable={section.dbTable} />
      <SeoSiblingSetLinks
        basePath={`/exams/${examSlug}/${subjectSlug}/difficulty/${level}`}
        currentSet={setNumber}
      />
      <QuizInterface
        mcqs={[]}
        examSlug={examSlug}
        subjectSlug={subjectSlug}
        mode={`difficulty/${level}`}
        setNumber={setNumber}
        practiceRequest={{
          source: 'difficulty',
          dbTable: section.dbTable,
          difficulty: difficultyDbValue(level, section.dbTable),
          subjectField: section.subjectField,
        }}
      />
    </>
  )
}
