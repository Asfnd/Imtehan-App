import { MDCATSubjectClient } from './MDCATSubjectClient'
import MdcatSubjectSeoSection from '@/components/seo/MdcatSubjectSeoSection'

// Server wrapper: interactive MDCAT subject UI + server-rendered SEO content
// (unique h1, intro, topics, mock links and FAQ) so the page is crawlable and
// indexable rather than a thin client shell.
export default async function MDCATSubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>
}) {
  const { subject } = await params

  return (
    <>
      <MDCATSubjectClient />
      <MdcatSubjectSeoSection subject={subject} />
    </>
  )
}
