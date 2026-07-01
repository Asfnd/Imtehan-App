import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CSS MPT Practice Test 2026  -  Free MCQs & Mock Exams | Imtehan',
  description: 'Free CSS MPT (Mandatory Preliminary Test) practice with subject-wise MCQs, timed mock tests and past paper questions. Prepare for the FPSC screening test online.',
  alternates: {
    canonical: 'https://imtehan.com/mpt-practice',
  },
  keywords: [
    'CSS MPT practice', 'CSS MPT mock test', 'CSS screening test',
    'CSS MPT MCQs', 'FPSC MPT preparation', 'CSS mandatory preliminary test',
    'MPT practice test', 'MPT exam preparation', 'Free MPT practice',
  ],
  openGraph: {
    title: 'CSS MPT Practice & Mock Tests 2026 | Imtehan',
    description: 'Free CSS MPT practice tests with subject-wise MCQs and timed mocks for the FPSC screening exam.',
    url: 'https://imtehan.com/mpt-practice',
    type: 'website',
  },
}

export default function MPTPracticeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
