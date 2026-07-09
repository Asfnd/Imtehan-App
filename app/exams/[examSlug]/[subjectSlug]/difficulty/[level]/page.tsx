import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { DIFFICULTY_LEVELS } from '@/lib/seo/topic-indexing'
import { DifficultyHubSeoShell } from '@/components/seo/DifficultyHubSeoShell'
import { DifficultyHubClient } from './DifficultyHubClient'

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

export default async function DifficultyLevelPage({
  params,
}: {
  params: Promise<{ examSlug: string; subjectSlug: string; level: string }>
}) {
  const { examSlug, subjectSlug, level } = await params
  if (!DIFFICULTY_LEVELS.includes(level as (typeof DIFFICULTY_LEVELS)[number])) notFound()

  const config = getExamConfig(examSlug)
  const section = config?.sections.find((s) => s.slug === subjectSlug)
  if (!config || !section) notFound()

  const subjectName = SUBJECT_LABELS[subjectSlug] ?? subjectSlug.replace(/-/g, ' ')

  return (
    <DifficultyHubSeoShell
      examSlug={examSlug}
      examName={config.name}
      subjectSlug={subjectSlug}
      subjectName={subjectName}
      level={level}
    >
      <DifficultyHubClient />
    </DifficultyHubSeoShell>
  )
}
