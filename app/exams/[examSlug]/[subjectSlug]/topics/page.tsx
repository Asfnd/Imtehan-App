import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { isTopicBankSupported } from '@/lib/seo/topic-indexing'
import { TopicsIndexSeoShell } from '@/components/seo/TopicsIndexSeoShell'
import { TopicsListClient } from './TopicsListClient'

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

export default async function TopicsListPage({
  params,
}: {
  params: Promise<{ examSlug: string; subjectSlug: string }>
}) {
  const { examSlug, subjectSlug } = await params
  const config = getExamConfig(examSlug)
  const section = config?.sections.find((s) => s.slug === subjectSlug)
  if (!config || !section) notFound()
  if (!isTopicBankSupported(section.dbTable)) notFound()

  const subjectName = SUBJECT_LABELS[subjectSlug] ?? subjectSlug.replace(/-/g, ' ')

  return (
    <TopicsIndexSeoShell
      examSlug={examSlug}
      examName={config.name}
      subjectSlug={subjectSlug}
      subjectName={subjectName}
      dbTable={section.dbTable}
    >
      <TopicsListClient />
    </TopicsIndexSeoShell>
  )
}
