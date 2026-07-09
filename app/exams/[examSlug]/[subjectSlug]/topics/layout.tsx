import type { Metadata } from 'next'
import { getExamConfig } from '@/lib/exam-configs'

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
  params: Promise<{ examSlug: string; subjectSlug: string }>
}): Promise<Metadata> {
  const { examSlug, subjectSlug } = await params
  const config = getExamConfig(examSlug)
  const subjectName = SUBJECT_LABELS[subjectSlug] ?? subjectSlug.replace(/-/g, ' ')
  const examName = config?.name ?? examSlug.replace(/-/g, ' ').toUpperCase()
  const selfCanonical = `https://imtehan.com/exams/${examSlug}/${subjectSlug}/topics`

  const title = `${examName} ${subjectName} Topics — MCQ Practice`
  const description = `Browse all ${examName} ${subjectName} topics for MCQ practice — past papers, most repeated and topic-wise sets.`

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: selfCanonical },
    openGraph: { title, description, url: selfCanonical, type: 'website' },
  }
}

export default function TopicsIndexLayout({ children }: { children: React.ReactNode }) {
  return children
}
