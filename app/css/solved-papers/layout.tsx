import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CSS Solved Papers with Expert Explanations',
  description: 'Access CSS solved papers with detailed expert explanations. Learn from comprehensive solutions for past CSS exams and improve your understanding of exam patterns.',
  alternates: {
    canonical: 'https://imtehan.com/css/solved-papers',
  },
  keywords: [
    'CSS solved papers', 'CSS paper solutions', 'CSS exam solutions',
    'CSS answer keys', 'CSS paper analysis', 'CSS solved questions',
    'CSS explained answers', 'CSS solved MCQs', 'CSS essay solutions',
  ],
  openGraph: {
    title: 'CSS Solved Papers with Solutions',
    description: 'Detailed solutions and expert explanations for CSS past papers.',
    url: 'https://imtehan.com/css/solved-papers',
    type: 'website',
  },
}

export default function SolvedPapersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
