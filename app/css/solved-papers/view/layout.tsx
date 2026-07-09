import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'View Solved Paper',
  description: 'View CSS solved paper PDF with our integrated viewer.',
  robots: {
    index: false, // Don't index view pages (dynamic content with query params)
    follow: true,
  },
}

export default function SolvedPaperViewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
