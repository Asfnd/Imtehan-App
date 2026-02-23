import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FSc Pre-Medical MCQs — Biology, Chemistry & Physics Practice | Imtehan',
  description: 'Practice FSc Pre-Medical MCQs chapter-wise for Biology, Chemistry and Physics. Sets of 20 questions aligned with Punjab Board curriculum. Best preparation for board exams and MDCAT.',
  keywords: [
    'FSc Pre-Medical MCQs', 'FSc biology MCQs', 'FSc chemistry MCQs',
    'FSc physics MCQs', 'FSc MCQ practice Pakistan', 'FSc part 1 MCQs',
    'FSc part 2 MCQs', 'Punjab Board FSc', 'FSc board exam preparation',
    'FSc online MCQ test', 'pre-medical MCQs', 'FSc chapter wise MCQs',
  ],
  alternates: {
    canonical: 'https://imtehan.com/fsc',
  },
  openGraph: {
    title: 'FSc Pre-Medical MCQs — Biology, Chemistry & Physics | Imtehan',
    description: 'Chapter-wise FSc Pre-Medical MCQs for Biology, Chemistry & Physics. Aligned with Punjab Board curriculum. Practice sets of 20 questions.',
    url: 'https://imtehan.com/fsc',
    type: 'website',
  },
}

export default function FSCLayout({ children }: { children: React.ReactNode }) {
  return children
}
