import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { SubjectSeoShell } from '@/components/seo/SubjectSeoSection'
import { SubjectModesClient } from './SubjectModesClient'

export default async function SubjectModesPage({
  params,
}: {
  params: Promise<{ examSlug: string; subjectSlug: string }>
}) {
  const { examSlug, subjectSlug } = await params
  const config = getExamConfig(examSlug)
  if (!config?.sections.some((s) => s.slug === subjectSlug)) notFound()

  return (
    <SubjectSeoShell examSlug={examSlug} subjectSlug={subjectSlug}>
      <SubjectModesClient />
    </SubjectSeoShell>
  )
}
