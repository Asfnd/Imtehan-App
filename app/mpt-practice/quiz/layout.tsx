import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MPT Quiz Practice',
  description: 'Practice MPT questions with our interactive quiz system. Get instant feedback and track your progress across different topics.',
  alternates: {
    canonical: 'https://imtehan.com/mpt-practice/quiz',
  },
  robots: {
    index: false, // Quiz sessions shouldn't be indexed
    follow: true,
  },
  openGraph: {
    title: 'MPT Quiz Practice',
    description: 'Interactive MPT quiz practice with instant feedback.',
    url: 'https://imtehan.com/mpt-practice/quiz',
    type: 'website',
  },
}

export default function MPTQuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
