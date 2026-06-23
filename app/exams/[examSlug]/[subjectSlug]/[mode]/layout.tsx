import type { Metadata } from 'next'
import { getExamConfig } from '@/lib/exam-configs'
import ModeSeoSection from '@/components/seo/ModeSeoSection'
import { fetchSampleMcqs } from '@/lib/seo/fetch-sample-mcqs'
import { examIndexingMeta } from '@/lib/seo/sitemap-tiers'

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
  'past-papers':    { label: 'Past Papers',    desc: 'solved past paper' },
  'practice':       { label: 'Practice',       desc: 'mixed practice' },
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

  const selfCanonical = `https://imtehan.com/exams/${examSlug}/${subjectSlug}/${mode}`
  const indexing = examIndexingMeta(examSlug, config?.category, selfCanonical)

  const title = `${examName} ${subjectName} ${modeMeta.label} MCQs Solved Online | Imtehan`
  const description = `Free ${examName} ${subjectName} ${modeMeta.desc} MCQs with solved answers. Practice online in sets of 20 — most repeated & past paper questions for Pakistan competitive exams.`

  return {
    title,
    description,
    keywords: [
      `${examName} ${subjectName} ${modeMeta.label.toLowerCase()} MCQs`,
      `${examName} ${subjectName} past papers solved`,
      `${examName} ${subjectName} MCQs online test`,
      `${subjectName} MCQs Pakistan`,
      'competitive exam MCQ practice',
    ],
    robots: indexing.robots,
    alternates: { canonical: indexing.canonical },
    openGraph: {
      title,
      description,
      url: selfCanonical,
      type: 'website',
    },
  }
}

export default async function ExamModeLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ examSlug: string; subjectSlug: string; mode: string }>
}) {
  const { examSlug, subjectSlug, mode } = await params
  const config = getExamConfig(examSlug)
  const section = config?.sections.find((s) => s.slug === subjectSlug)

  const sampleMcqs = section?.dbTable
    ? await fetchSampleMcqs(section.dbTable, mode, 5)
    : []

  return (
    <>
      {children}
      <ModeSeoSection
        examSlug={examSlug}
        subjectSlug={subjectSlug}
        mode={mode}
        sampleMcqs={sampleMcqs}
      />
    </>
  )
}
