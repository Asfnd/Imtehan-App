import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MPT Practice Tests - Mock Papers & MCQs | Imtehan',
  description: 'Prepare for MPT (Military Personnel Test) with practice mock tests and MCQs. Free MPT practice papers, subject-wise questions, and performance analytics.',
  alternates: {
    canonical: 'https://imtehan.com/mpt-practice',
  },
  keywords: [
    'MPT practice', 'MPT test', 'MPT mock test',
    'MPT exam preparation', 'MPT practice papers',
    'MPT question bank', 'MPT MCQs', 'Military personnel test',
    'MPT online practice', 'Free MPT practice',
  ],
  openGraph: {
    title: 'MPT Practice & Mock Tests | Imtehan',
    description: 'Comprehensive MPT practice tests with detailed solutions and performance tracking.',
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
