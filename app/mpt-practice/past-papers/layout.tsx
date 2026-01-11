import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MPT Past Paper MCQs | Imtehan',
  description: 'Practice with MPT past paper MCQs organized by year. Access authentic past paper questions with detailed explanations and solutions.',
  alternates: {
    canonical: 'https://imtehan.com/mpt-practice/past-papers',
  },
  openGraph: {
    title: 'MPT Past Paper MCQs | Imtehan',
    description: 'Practice with authentic MPT past paper questions organized by year.',
    url: 'https://imtehan.com/mpt-practice/past-papers',
    type: 'website',
  },
}

export default function MPTPastPapersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
