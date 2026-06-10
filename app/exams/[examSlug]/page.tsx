import { getExamConfig } from '@/lib/exam-configs'
import { ExamHubClient } from './ExamHubClient'
import ExamSeoSection from '@/components/seo/ExamSeoSection'

// Server component wrapper: renders the interactive client hub plus a
// server-rendered, exam-specific SEO content section (unique <h1>, intro,
// paper pattern, subject links and FAQ) so each exam page is crawlable and
// indexable rather than a thin client-only shell.
export default async function ExamHubPage({
  params,
}: {
  params: Promise<{ examSlug: string }>
}) {
  const { examSlug } = await params
  const config = getExamConfig(examSlug)

  return (
    <>
      <ExamHubClient />
      {config && <ExamSeoSection slug={examSlug} config={config} />}
    </>
  )
}
