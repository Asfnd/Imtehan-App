import type { Metadata } from 'next'

const SUBJECT_NAMES: Record<string, string> = {
  biology: 'Biology',
  chemistry: 'Chemistry',
  physics: 'Physics',
  english: 'English',
  'logical-reasoning': 'Logical Reasoning',
}

const DIFFICULTY_NAMES: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; topic: string }>
}): Promise<Metadata> {
  const { subject, topic: rawTopic } = await params
  const subjectName = SUBJECT_NAMES[subject] || subject
  const topic = decodeURIComponent(rawTopic)
  const diffLabel = DIFFICULTY_NAMES[topic]
  const isDifficulty = !!diffLabel

  const title = isDifficulty
    ? `MDCAT ${subjectName} ${diffLabel} Questions: Practice MCQs`
    : `MDCAT ${subjectName}: ${topic} MCQs with Answers`

  const description = isDifficulty
    ? `Practice MDCAT ${subjectName} ${diffLabel.toLowerCase()} difficulty MCQs. Topic-wise sets of 20 questions with detailed explanations. Prepare for PMC, ETEA & NUMS entry tests.`
    : `Practice MDCAT ${subjectName} ${topic} MCQs with detailed explanations. Topic-wise sets of 20 questions to master this chapter for PMC, ETEA & NUMS medical entry tests.`

  const canonicalTopic = encodeURIComponent(topic)

  return {
    title,
    description,
    robots: { index: true, follow: true },
    keywords: [
      `MDCAT ${subjectName.toLowerCase()} ${topic.toLowerCase()} MCQs`,
      `${topic} MCQs MDCAT`,
      `MDCAT ${subjectName.toLowerCase()} MCQs`,
      `PMC MDCAT ${subjectName.toLowerCase()}`,
      'MDCAT MCQ practice',
      'medical entry test Pakistan',
      'MDCAT 2026',
    ],
    alternates: {
      canonical: `https://imtehan.com/mdcat/${subject}/${canonicalTopic}`,
    },
    openGraph: {
      title,
      description,
      url: `https://imtehan.com/mdcat/${subject}/${canonicalTopic}`,
      type: 'website',
    },
  }
}

export default function MDCATTopicLayout({ children }: { children: React.ReactNode }) {
  return children
}
