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

const MODE_LABELS: Record<string, { label: string; desc: string }> = {
  'most-repeated':  { label: 'Most Repeated',  desc: 'high-yield frequently asked' },
  'most-important': { label: 'Most Important', desc: 'critical must-know' },
  'past-papers':    { label: 'Past Papers',    desc: 'actual past paper' },
  'practice':       { label: 'Practice',       desc: 'mixed' },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ examSlug: string; subjectSlug: string; mode: string }>
}): Promise<Metadata> {
  const { examSlug, subjectSlug, mode } = await params
  const config = getExamConfig(examSlug)
  const subjectName = SUBJECT_LABELS[subjectSlug] ?? subjectSlug.replace(/-/g, ' ')
  const examName = config?.name ?? examSlug.replace(/-/g, ' ').toUpperCase()
  const modeMeta = MODE_LABELS[mode] ?? { label: mode, desc: 'practice' }

  const title = `${examName} ${subjectName} — ${modeMeta.label} MCQs | Imtehan`
  const description = `Practice ${examName} ${subjectName} ${modeMeta.desc} MCQs in topic-wise sets of 20. Detailed explanations and answers for every question.`

  return {
    title,
    description,
    keywords: [
      `${examName} ${subjectName} ${modeMeta.label.toLowerCase()} MCQs`,
      `${examName} ${subjectName} MCQs`,
      `${examName} ${modeMeta.label.toLowerCase()} questions`,
      `${subjectName} MCQs Pakistan`,
      'competitive exam MCQ practice',
    ],
    alternates: {
      canonical: `https://imtehan.com/exams/${examSlug}/${subjectSlug}/${mode}`,
    },
    openGraph: {
      title,
      description,
      url: `https://imtehan.com/exams/${examSlug}/${subjectSlug}/${mode}`,
      type: 'website',
    },
  }
}

export default function ExamModeLayout({ children }: { children: React.ReactNode }) {
  return children
}
