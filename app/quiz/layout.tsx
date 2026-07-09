import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quiz Practice',
  description: 'Practice CSS and MPT exam questions with our interactive quiz system. Get instant feedback and detailed explanations.',
  alternates: {
    canonical: 'https://imtehan.com/quiz',
  },
  robots: {
    index: false, // Quiz sessions shouldn't be indexed
    follow: true,
  },
  openGraph: {
    title: 'Quiz Practice',
    description: 'Interactive CSS and MPT quiz practice with instant feedback.',
    url: 'https://imtehan.com/quiz',
    type: 'website',
  },
}

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
