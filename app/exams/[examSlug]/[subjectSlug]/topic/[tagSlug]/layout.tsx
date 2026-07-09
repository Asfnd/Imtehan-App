import type { Metadata } from 'next'
import { getExamConfig } from '@/lib/exam-configs'
import { tagSlugToLabel } from '@/lib/topic-tags'
import { topicIndexingMeta } from '@/lib/seo/topic-indexing'

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
  params: Promise<{ examSlug: string; subjectSlug: string; tagSlug: string }>
}): Promise<Metadata> {
  const { examSlug, subjectSlug, tagSlug } = await params
  const config = getExamConfig(examSlug)
  const section = config?.sections.find((s) => s.slug === subjectSlug)
  const subjectName = SUBJECT_LABELS[subjectSlug] ?? subjectSlug.replace(/-/g, ' ')
  const examName = config?.name ?? examSlug.replace(/-/g, ' ').toUpperCase()
  const topicLabel = tagSlugToLabel(tagSlug)

  const selfCanonical = `https://imtehan.com/exams/${examSlug}/${subjectSlug}/topic/${tagSlug}`
  const indexing = topicIndexingMeta(
    examSlug,
    config?.category,
    section?.dbTable ?? '',
    tagSlug,
    selfCanonical,
  )

  const title = `${examName} ${subjectName} ${topicLabel} MCQs with Answers`
  const description = `Practice ${examName} ${subjectName} ${topicLabel} MCQs online. Topic-wise sets of 20 with solved answers for Pakistan competitive exams.`

  return {
    title,
    description,
    robots: indexing.robots,
    alternates: { canonical: indexing.canonical },
    openGraph: { title, description, url: selfCanonical, type: 'website' },
  }
}

export default function ExamTopicTagLayout({ children }: { children: React.ReactNode }) {
  return children
}
