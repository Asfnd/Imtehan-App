import { SubjectModesClient } from './SubjectModesClient'
import SubjectSeoSection from '@/components/seo/SubjectSeoSection'

// Server wrapper: renders the interactive mode picker plus a server-rendered,
// exam+subject-specific SEO section (unique h1, intro, mode links and FAQ) so
// each subject page is crawlable and indexable rather than a thin client shell.
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
