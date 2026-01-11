import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'View Guess Paper | Imtehan',
  description: 'View CSS 2026 guess paper PDF with our integrated viewer.',
  robots: {
    index: false, // Don't index view pages (dynamic content with query params)
    follow: true,
  },
}

export default function GuessPaperViewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
