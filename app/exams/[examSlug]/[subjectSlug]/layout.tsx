import type { Metadata } from 'next'
import { getExamConfig } from '@/lib/exam-configs'
import { examIndexingMeta } from '@/lib/seo/sitemap-tiers'
import { fetchSampleMcqs } from '@/lib/seo/fetch-sample-mcqs'
import { buildQuizJsonLd } from '@/lib/seo/quiz-jsonld'
import { jsonLdString } from '@/lib/seo/jsonld'

/** Cookie-free + cached samples — keep all child SET pages CDN/ISR eligible. */
export const dynamic = 'force-static'
export const revalidate = 604800

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

  const selfCanonical = `https://imtehan.com/exams/${examSlug}/${subjectSlug}`
  const indexing = examIndexingMeta(examSlug, config?.category, selfCanonical)

  const title = `${examName} ${subjectName} MCQs with Answers — Past Papers & Practice`
  const description = `Practice ${examName} ${subjectName} MCQs online free. Most repeated, past paper and practice sets of 20 with solved answers and explanations.`

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
    robots: indexing.robots,
    alternates: { canonical: indexing.canonical },
    openGraph: {
      title,
      description,
      url: `https://imtehan.com/exams/${examSlug}/${subjectSlug}`,
      type: 'website',
    },
  }
}

export default async function ExamSubjectLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ examSlug: string; subjectSlug: string }>
}) {
  const { examSlug, subjectSlug } = await params
  const config = getExamConfig(examSlug)
  const section = config?.sections.find((s) => s.slug === subjectSlug)
  const subjectName = SUBJECT_LABELS[subjectSlug] ?? subjectSlug.replace(/-/g, ' ')
  const examName = config?.name ?? examSlug.replace(/-/g, ' ').toUpperCase()

  let quizJsonLd: object | null = null

  if (section?.dbTable) {
    // Cached 24h — never uncached Supabase in this layout (poisons child ISR)
    const mcqs = await fetchSampleMcqs(section.dbTable, 'most-repeated', 5)
    if (mcqs.length > 0) {
      quizJsonLd = buildQuizJsonLd({
        name: `${examName}: ${subjectName} MCQs with Answers`,
        description: `Practice ${examName} ${subjectName} MCQs. Most repeated and important questions with explanations for exam preparation in Pakistan.`,
        url: `https://imtehan.com/exams/${examSlug}/${subjectSlug}`,
        mcqs,
      })
    }
  }

  return (
    <>
      {quizJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(quizJsonLd) }}
        />
      )}
      {children}
    </>
  )
}
