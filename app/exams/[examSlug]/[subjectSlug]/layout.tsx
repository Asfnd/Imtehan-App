import type { Metadata } from 'next'
import { getExamConfig } from '@/lib/exam-configs'

const SUBJECT_LABELS: Record<string, string> = {
  'english':           'English',
  'general-knowledge': 'General Knowledge',
  'pakistan-affairs':  'Pakistan Affairs',
  'islamic-studies':   'Islamic Studies',
  'current-affairs':   'Current Affairs',
  'everyday-science':  'Everyday Science',
  'mathematics':       'Mathematics',
  'geography':         'Geography',
  'computer':          'Computer Science',
  'urdu':              'Urdu',
  'biology':           'Biology',
  'chemistry':         'Chemistry',
  'physics':           'Physics',
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

  const title = `${examName} — ${subjectName} MCQs with Answers | Imtehan`
  const description = `Practice ${examName} ${subjectName} MCQs in sets of 20. Includes most repeated, most important, and past paper questions with detailed explanations.`

  return {
    title,
    description,
    keywords: [
      `${examName} ${subjectName} MCQs`,
      `${examName} ${subjectName} preparation`,
      `${subjectName} MCQs Pakistan`,
      `${examName} MCQ practice`,
      'competitive exam MCQs Pakistan',
    ],
    alternates: {
      canonical: `https://imtehan.com/exams/${examSlug}/${subjectSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://imtehan.com/exams/${examSlug}/${subjectSlug}`,
      type: 'website',
    },
  }
}

export default function ExamSubjectLayout({ children }: { children: React.ReactNode }) {
  return children
}
