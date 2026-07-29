import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { getEffectiveExamSettings } from '@/lib/exam-mock-blueprints'
import { MockSeoShell } from '@/components/seo/MockSeoShell'
import { MockTestsClient } from './MockTestsClient'

/** Never let Cloudflare keep a week-old listing that links to poisoned /mock/1. */
export const dynamic = 'force-dynamic'

export default async function MockTestsPage({
  params,
}: {
  params: Promise<{ examSlug: string }>
}) {
  const { examSlug } = await params
  const config = getExamConfig(examSlug)
  if (!config) notFound()

  const official = getEffectiveExamSettings(examSlug, config)

  return (
    <MockSeoShell
      examSlug={examSlug}
      examName={config.name}
      config={config}
      totalMcqs={official.totalMCQs}
      durationMinutes={official.duration}
    >
      <MockTestsClient />
    </MockSeoShell>
  )
}
