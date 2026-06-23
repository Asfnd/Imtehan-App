import { SubjectModesClient } from './SubjectModesClient'
import SubjectSeoSection from '@/components/seo/SubjectSeoSection'

export default async function SubjectModesPage({
  params,
}: {
  params: Promise<{ examSlug: string; subjectSlug: string }>
}) {
  const { examSlug, subjectSlug } = await params

  return (
    <>
      <SubjectModesClient />
      <SubjectSeoSection examSlug={examSlug} subjectSlug={subjectSlug} />
    </>
  )
}
