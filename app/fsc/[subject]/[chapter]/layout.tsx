import type { Metadata } from 'next'

const SUBJECT_NAMES: Record<string, string> = {
  biology: 'Biology',
  chemistry: 'Chemistry',
  physics: 'Physics',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; chapter: string }>
}): Promise<Metadata> {
  const { subject, chapter: rawChapter } = await params
  const subjectName = SUBJECT_NAMES[subject] || subject
  const chapter = decodeURIComponent(rawChapter)
  const canonicalChapter = encodeURIComponent(chapter)

  const title = `FSc ${subjectName} — ${chapter} MCQs | Imtehan`
  const description = `Practice FSc ${subjectName} ${chapter} MCQs with 20 questions per set. Aligned with Punjab Board curriculum — perfect for board exam and MDCAT preparation.`

  return {
    title,
    description,
    keywords: [
      `FSc ${subjectName.toLowerCase()} ${chapter.toLowerCase()} MCQs`,
      `${chapter} MCQs FSc`,
      `FSc ${subjectName.toLowerCase()} chapter MCQs`,
      `Punjab Board ${subjectName.toLowerCase()} MCQs`,
      `FSc ${subjectName.toLowerCase()} practice test`,
      'FSc Pre-Medical MCQs',
      'board exam MCQ practice Pakistan',
    ],
    alternates: {
      canonical: `https://imtehan.com/fsc/${subject}/${canonicalChapter}`,
    },
    openGraph: {
      title,
      description,
      url: `https://imtehan.com/fsc/${subject}/${canonicalChapter}`,
      type: 'website',
    },
  }
}

export default function FSCChapterLayout({ children }: { children: React.ReactNode }) {
  return children
}
