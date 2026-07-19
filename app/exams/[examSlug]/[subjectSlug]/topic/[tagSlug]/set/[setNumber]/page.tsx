import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { isTagArrayTable, tagSlugToLabel, topicDbValue } from '@/lib/topic-tags'
import { topicIndexingMeta } from '@/lib/seo/topic-indexing'
import { TopicSetSeoShell } from '@/components/seo/TopicSeoShell'
import QuizInterface from '@/components/QuizInterface'
import { cachedFetchMCQsByTopicSet, seoMcqsForSet } from '@/lib/cached-quiz-fetch'

/** force-static + ISR — CDN after first crawl; interactive via practice API. */
export const dynamic = 'force-static'
export const revalidate = 604800
export const dynamicParams = true

const SUBJECT_LABELS: Record<string, string> = {
  english: 'English',
  'general-knowledge': 'General Knowledge',
  'pakistan-affairs': 'Pakistan Affairs',
  'islamic-studies': 'Islamic Studies',
  'current-affairs': 'Current Affairs',
  'everyday-science': 'Everyday Science',
  mathematics: 'Mathematics',
  geography: 'Geography',
  computer: 'Computer Science',
  urdu: 'Urdu',
  biology: 'Biology',
  chemistry: 'Chemistry',
  physics: 'Physics',
  'logical-reasoning': 'Logical Reasoning',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    examSlug: string
    subjectSlug: string
    tagSlug: string
    setNumber: string
  }>
}): Promise<Metadata> {
  const { examSlug, subjectSlug, tagSlug, setNumber: setStr } = await params
  const config = getExamConfig(examSlug)
  const section = config?.sections.find((s) => s.slug === subjectSlug)
  const setNumber = parseInt(setStr, 10)
  const subjectName = SUBJECT_LABELS[subjectSlug] ?? subjectSlug.replace(/-/g, ' ')
  const examName = config?.name ?? examSlug.replace(/-/g, ' ').toUpperCase()
  const topicLabel = tagSlugToLabel(tagSlug)

  const selfCanonical = `https://imtehan.com/exams/${examSlug}/${subjectSlug}/topic/${tagSlug}/set/${setNumber}`
  const indexing = topicIndexingMeta(
    examSlug,
    config?.category,
    section?.dbTable ?? '',
    tagSlug,
    selfCanonical,
    { setNumber },
  )

  const title = `${examName} ${subjectName} ${topicLabel} Set ${setNumber} — 20 MCQs Solved`
  const description = `${examName} ${subjectName} ${topicLabel} MCQs set ${setNumber} with solved answers — Pakistan competitive exam practice.`

  return {
    title,
    description,
    robots: indexing.robots,
    alternates: { canonical: indexing.canonical },
    openGraph: { title, description, url: selfCanonical, type: 'website' },
  }
}

export default async function TopicQuizSetPage({
  params,
}: {
  params: Promise<{
    examSlug: string
    subjectSlug: string
    tagSlug: string
    setNumber: string
  }>
}) {
  const { examSlug, subjectSlug, tagSlug, setNumber: setNumberStr } = await params

  const config = getExamConfig(examSlug)
  if (!config) notFound()

  const section = config.sections.find((s) => s.slug === subjectSlug)
  if (!section) notFound()

  const setNumber = parseInt(setNumberStr, 10)
  if (isNaN(setNumber) || setNumber < 1) notFound()

  const dbVal = topicDbValue(tagSlug, section.dbTable)
  const mcqs = await cachedFetchMCQsByTopicSet({
    dbTable: section.dbTable,
    tag: dbVal,
    useTagsArray: isTagArrayTable(section.dbTable),
    setNumber,
    examSlug,
  }).catch(() => null)

  if (!mcqs || mcqs.length === 0) notFound()

  const subjectName = SUBJECT_LABELS[subjectSlug] ?? subjectSlug.replace(/-/g, ' ')
  const topicLabel = tagSlugToLabel(tagSlug)
  const seoMcqs = seoMcqsForSet(setNumber, mcqs)

  return (
    <TopicSetSeoShell
      examSlug={examSlug}
      examName={config.name}
      subjectSlug={subjectSlug}
      subjectName={subjectName}
      tagSlug={tagSlug}
      topicLabel={topicLabel}
      setNumber={setNumber}
      dbTable={section.dbTable}
      mcqs={seoMcqs}
    >
      <QuizInterface
        mcqs={[]}
        examSlug={examSlug}
        subjectSlug={subjectSlug}
        mode={`topic/${tagSlug}`}
        setNumber={setNumber}
        practiceRequest={{
          source: 'topic',
          dbTable: section.dbTable,
          tag: dbVal,
          useTagsArray: isTagArrayTable(section.dbTable),
          examSlug,
        }}
      />
    </TopicSetSeoShell>
  )
}
