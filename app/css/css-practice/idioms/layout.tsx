import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CSS English Idioms & Phrases Practice | Imtehan',
  description: 'Learn and practice English idioms and phrases commonly asked in CSS exams. Comprehensive collection with meanings and usage examples.',
  alternates: {
    canonical: 'https://imtehan.com/css/css-practice/idioms',
  },
  keywords: [
    'CSS idioms', 'CSS phrases', 'English idioms CSS',
    'CSS English paper', 'idioms and phrases', 'CSS vocabulary',
  ],
  openGraph: {
    title: 'CSS English Idioms & Phrases | Imtehan',
    description: 'Learn English idioms commonly asked in CSS exams.',
    url: 'https://imtehan.com/css/css-practice/idioms',
    type: 'website',
  },
}

export default function IdiomsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
