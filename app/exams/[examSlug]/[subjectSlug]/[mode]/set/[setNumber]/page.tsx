import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { fetchMCQsBySet } from '@/lib/quiz-fetcher'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { examIndexingMeta } from '@/lib/seo/sitemap-tiers'
import { SetSeoShell } from '@/components/seo/SetSeoShell'
import QuizInterface from '@/components/QuizInterface'

const MODE_CONFIG = {
  'most-repeated': { label: 'Most Repeated', icon: '🔥', type: 'most_repeated' },
  'most-important': { label: 'Most Important', icon: '⭐', type: 'most_important' },
  'past-papers': { label: 'Past MCQs', icon: '📄', type: 'practice' },
  practice: { label: 'Practice Mode', icon: '📚', type: 'mixed' },
} as const

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
  params: Promise<{
    examSlug: string
    subjectSlug: string
    mode: string
    setNumber: string
  }>
}): Promise<Metadata> {
  const { examSlug, subjectSlug, mode, setNumber: setNumberStr } = await params
  const config = getExamConfig(examSlug)
  const setNumber = parseInt(setNumberStr, 10)
  const subjectName = SUBJECT_LABELS[subjectSlug] ?? subjectSlug.replace(/-/g, ' ')
  const examName = config?.name ?? examSlug.replace(/-/g, ' ').toUpperCase()
  const modeLabel = MODE_CONFIG[mode as keyof typeof MODE_CONFIG]?.label ?? mode

  const selfCanonical = `https://imtehan.com/exams/${examSlug}/${subjectSlug}/${mode}/set/${setNumber}`
  const indexing = examIndexingMeta(examSlug, config?.category, selfCanonical, { mode, setNumber })

  const title = `${examName} ${subjectName} ${modeLabel} Set ${setNumber} — 20 MCQs Solved`
  const description = `${examName} ${subjectName} ${modeLabel.toLowerCase()} MCQs set ${setNumber}: 20 solved multiple choice questions with answers for Pakistan competitive exam preparation.`

  return {
    title,
    description,
    robots: indexing.robots,
    alternates: { canonical: indexing.canonical },
    openGraph: { title, description, url: selfCanonical, type: 'website' },
  }
}

export default async function QuizSetPage({
  params,
}: {
  params: Promise<{
    examSlug: string
    subjectSlug: string
    mode: string
    setNumber: string
  }>
}) {
  const { examSlug, subjectSlug, mode, setNumber: setNumberStr } = await params
  const config = getExamConfig(examSlug)

  if (!config) notFound()

  const section = config.sections.find((s) => s.slug === subjectSlug)
  if (!section) notFound()

  const modeConfig = MODE_CONFIG[mode as keyof typeof MODE_CONFIG]
  if (!modeConfig) notFound()

  const setNumber = parseInt(setNumberStr, 10)
  if (isNaN(setNumber) || setNumber < 1) notFound()

  const supabase = await createServerSupabaseClient()

  const mcqs = await fetchMCQsBySet(supabase, {
    dbTable: section.dbTable,
    setNumber,
    mode: modeConfig.type === 'mixed' ? 'mixed' : modeConfig.type,
    noTypeFilter: section.noTypeFilter,
    subjectField: section.subjectField,
    targetExam:
      mode === 'past-papers' && config.pastPapersExam ? config.pastPapersExam : undefined,
  }).catch(() => null)

  if (!mcqs || mcqs.length === 0) notFound()

  const subjectName = SUBJECT_LABELS[subjectSlug] ?? subjectSlug.replace(/-/g, ' ')

  return (
    <SetSeoShell
      examSlug={examSlug}
      examName={config.name}
      subjectSlug={subjectSlug}
      subjectName={subjectName}
      mode={mode}
      setNumber={setNumber}
      mcqs={mcqs}
    >
      <QuizInterface
        mcqs={mcqs}
        examSlug={examSlug}
        subjectSlug={subjectSlug}
        mode={mode}
        setNumber={setNumber}
      />
    </SetSeoShell>
  )
}
