import { notFound } from 'next/navigation'
import { FSC_SUBJECT_TABLES } from '@/lib/seo/topic-indexing'
import { FscChapterSeoShell } from '@/components/seo/FscChapterSeoShell'
import { FscChapterClient } from './FscChapterClient'

const SUBJECT_NAMES: Record<string, string> = {
  biology: 'Biology',
  chemistry: 'Chemistry',
  physics: 'Physics',
}

export default async function FscChapterPage({
  params,
}: {
  params: Promise<{ subject: string; chapter: string }>
}) {
  const { subject, chapter } = await params
  if (!FSC_SUBJECT_TABLES[subject]) notFound()

  const subjectName = SUBJECT_NAMES[subject] ?? subject
  const chapterLabel = decodeURIComponent(chapter).replace(/-/g, ' ')

  return (
    <FscChapterSeoShell
      subject={subject}
      subjectName={subjectName}
      chapterSlug={chapter}
      chapterLabel={chapterLabel}
    >
      <FscChapterClient />
    </FscChapterSeoShell>
  )
}
