import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CSS Practice Tests - 10,000+ MCQs by Subject | Imtehan',
  description: 'Practice CSS exams with 10,000+ MCQs across 50+ subjects including Islamic Studies, Pakistan Affairs, English, Current Affairs, and more. Free practice tests with detailed explanations.',
  alternates: {
    canonical: 'https://imtehan.com/css/subjects',
  },
  keywords: [
    'CSS practice tests', 'CSS MCQs', 'CSS exam practice',
    'Pakistan Affairs MCQs', 'Islamic Studies MCQs', 'CSS English practice',
    'CSS current affairs', 'CSS general knowledge', 'CSS online practice',
    'Free CSS MCQs', 'CSS question bank', 'CSS quiz',
  ],
  openGraph: {
    title: 'CSS Practice Tests - 10,000+ MCQs | Imtehan',
    description: 'Practice CSS exams with 10,000+ subject-wise MCQs, detailed solutions, and performance tracking.',
    url: 'https://imtehan.com/css/subjects',
    type: 'website',
  },
}

export default function CSSPracticeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
