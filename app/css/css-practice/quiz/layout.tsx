import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CSS Quiz Practice | Imtehan',
  description: 'Practice CSS exam questions with our interactive quiz system. Get instant feedback and track your progress.',
  alternates: {
    canonical: 'https://imtehan.com/css/css-practice/quiz',
  },
  robots: {
    index: false, // Quiz sessions shouldn't be indexed
    follow: true,
  },
  openGraph: {
    title: 'CSS Quiz Practice | Imtehan',
    description: 'Interactive CSS quiz practice with instant feedback.',
    url: 'https://imtehan.com/css/css-practice/quiz',
    type: 'website',
  },
}

export default function CSSQuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
