import type { Metadata } from 'next'
import { getExamConfig } from '@/lib/exam-configs'
import { difficultyIndexingMeta } from '@/lib/seo/topic-indexing'

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

const LEVEL_LABELS: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ examSlug: string; subjectSlug: string; level: string }>
}): Promise<Metadata> {
  const { examSlug, subjectSlug, level } = await params
  const config = getExamConfig(examSlug)
  const section = config?.sections.find((s) => s.slug === subjectSlug)
  const subjectName = SUBJECT_LABELS[subjectSlug] ?? subjectSlug.replace(/-/g, ' ')
  const examName = config?.name ?? examSlug.replace(/-/g, ' ').toUpperCase()
  const levelLabel = LEVEL_LABELS[level] ?? level

  const selfCanonical = `https://imtehan.com/exams/${examSlug}/${subjectSlug}/difficulty/${level}`
  const indexing = difficultyIndexingMeta(examSlug, section?.dbTable ?? '', selfCanonical)

  const title = `${examName} ${subjectName} ${levelLabel} MCQs with Answers`
  const description = `Practice ${levelLabel.toLowerCase()} ${examName} ${subjectName} MCQs online — topic-wise sets of 20 with solved answers.`

  return {
    title,
    description,
    robots: indexing.robots,
    alternates: { canonical: indexing.canonical },
    openGraph: { title, description, url: selfCanonical, type: 'website' },
  }
}

export default function DifficultyLevelLayout({ children }: { children: React.ReactNode }) {
  return children
}
