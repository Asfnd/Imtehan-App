import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { isTagArrayTable, tagSlugToLabel, topicDbValue } from '@/lib/topic-tags'
import { TopicSeoShell } from '@/components/seo/TopicSeoShell'
import { TopicSetPicker } from './TopicSetPicker'
import { cachedFetchMCQsByTopicSet } from '@/lib/cached-quiz-fetch'

/** force-static + ISR — hub HTML CDN-cached. */
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

export default async function TopicHubPage({
  params,
}: {
  params: Promise<{ examSlug: string; subjectSlug: string; tagSlug: string }>
}) {
  const { examSlug, subjectSlug, tagSlug } = await params
  const config = getExamConfig(examSlug)
  const section = config?.sections.find((s) => s.slug === subjectSlug)
  if (!config || !section) notFound()

  const dbVal = topicDbValue(tagSlug, section.dbTable)
  const sampleMcqs = (
    await cachedFetchMCQsByTopicSet({
      dbTable: section.dbTable,
      tag: dbVal,
      useTagsArray: isTagArrayTable(section.dbTable),
      setNumber: 1,
    }).catch(() => [])
  ).slice(0, 5)

  const subjectName = SUBJECT_LABELS[subjectSlug] ?? subjectSlug.replace(/-/g, ' ')
  const topicLabel = tagSlugToLabel(tagSlug)

  return (
    <TopicSeoShell
      examSlug={examSlug}
      examName={config.name}
      subjectSlug={subjectSlug}
      subjectName={subjectName}
      tagSlug={tagSlug}
      topicLabel={topicLabel}
      dbTable={section.dbTable}
      sampleMcqs={sampleMcqs}
    >
      <TopicSetPicker />
    </TopicSeoShell>
  )
}
