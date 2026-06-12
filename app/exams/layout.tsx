import type { Metadata } from 'next'

const BASE = 'https://imtehan.com'

export const metadata: Metadata = {
  title: 'CSS, PMS, MDCAT, PPSC & 200+ Exams to Practice | Imtehan',
  description:
    'Practice 200+ Pakistani competitive exams in one place: CSS, PMS, MDCAT, PPSC, FPSC, NTS, police, and engineering tests. 150,000+ subject-wise MCQs with answers, past papers and mock tests.',
  keywords: [
    'competitive exams Pakistan', 'CSS MCQs', 'PMS MCQs', 'MDCAT preparation',
    'PPSC past papers', 'FPSC MCQs', 'NTS test preparation', 'online exam practice Pakistan',
    'free MCQ practice', 'mock tests Pakistan',
  ],
  alternates: { canonical: `${BASE}/exams` },
  openGraph: {
    title: 'Browse 200+ Competitive Exams | Imtehan',
    description:
      'CSS, PMS, MDCAT, PPSC, FPSC and 200+ more. 150,000+ MCQs, past papers and mock tests in one platform.',
    url: `${BASE}/exams`,
    type: 'website',
  },
}

// Metadata-only layout. The full exam ItemList JSON-LD is rendered on the
// /exams index page itself so it does not duplicate onto every nested
// /exams/* route.
export default function ExamsBrowseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
