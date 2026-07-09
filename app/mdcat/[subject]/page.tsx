import { MdcatSubjectShell } from '@/components/seo/MdcatSubjectSeoSection'
import { MDCATSubjectClient } from './MDCATSubjectClient'

export default async function MDCATSubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>
}) {
  const { subject } = await params
  return (
    <MdcatSubjectShell subject={subject}>
      <MDCATSubjectClient />
    </MdcatSubjectShell>
  )
}
