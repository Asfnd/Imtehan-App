import type { Metadata } from 'next'
import { getExamConfig } from '@/lib/exam-configs'
import { getEffectiveExamSettings } from '@/lib/exam-mock-blueprints'
import { examIndexingMeta } from '@/lib/seo/sitemap-tiers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ examSlug: string }>
}): Promise<Metadata> {
  const { examSlug } = await params
  const config = getExamConfig(examSlug)
  if (!config) return { title: 'Mock Tests' }

  const official = getEffectiveExamSettings(examSlug, config)
  const selfCanonical = `https://imtehan.com/exams/${examSlug}/mocks`
  const indexing = examIndexingMeta(examSlug, config.category, selfCanonical)
  const title = `${config.name} Mock Tests — Full-Length Practice Exams`
  const description = `Take ${config.name} mock tests online: ${official.totalMCQs} MCQs in ${official.duration} minutes. Twenty timed simulations with instant scoring and explanations.`

  return {
    title,
    description,
    robots: indexing.robots,
    alternates: { canonical: selfCanonical },
    openGraph: {
      title: `${config.name} Mock Tests`,
      description,
      url: selfCanonical,
      type: 'website',
    },
  }
}

export default function MockLayout({ children }: { children: React.ReactNode }) {
  return children
}
