import { ExamsBrowseShell } from '@/components/seo/ExamsBrowseSeoSection'
import { ExamsPageClient } from './ExamsPageClient'

export default function ExamsPage() {
  return (
    <ExamsBrowseShell>
      <ExamsPageClient />
    </ExamsBrowseShell>
  )
}
