import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { fetchSampleMcqs } from '@/lib/seo/fetch-sample-mcqs'
import { ModeSeoShell } from '@/components/seo/ModeSeoSection'
import { ModeSetPicker } from './ModeSetPicker'

export default async function ExamModePage({
  params,
}: {
  params: Promise<{ examSlug: string; subjectSlug: string; mode: string }>
}) {
  const { examSlug, subjectSlug, mode } = await params
  const config = getExamConfig(examSlug)
  const section = config?.sections.find((s) => s.slug === subjectSlug)
  if (!config || !section) notFound()

  const sampleMcqs = section.dbTable
    ? await fetchSampleMcqs(section.dbTable, mode, 5)
    : []

  return (
    <ModeSeoShell
      examSlug={examSlug}
      subjectSlug={subjectSlug}
      mode={mode}
      sampleMcqs={sampleMcqs}
    >
      <ModeSetPicker />
    </ModeSeoShell>
  )
}
