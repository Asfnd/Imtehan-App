import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { ExamSeoShell } from '@/components/seo/ExamSeoSection'
import { ExamHubClient } from './ExamHubClient'

export default async function ExamHubPage({
  params,
}: {
  params: Promise<{ examSlug: string }>
}) {
  const { examSlug } = await params
  const config = getExamConfig(examSlug)
  if (!config) notFound()

  return (
    <ExamSeoShell slug={examSlug} config={config}>
      <ExamHubClient />
    </ExamSeoShell>
  )
}
