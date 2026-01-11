import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MPT Live Mock Tests | Imtehan',
  description: 'Take timed MPT mock tests simulating the real exam environment. Practice with full-length tests and get instant results with detailed analytics.',
  alternates: {
    canonical: 'https://imtehan.com/mpt-practice/live',
  },
  openGraph: {
    title: 'MPT Live Mock Tests | Imtehan',
    description: 'Take timed MPT mock tests with instant results and analytics.',
    url: 'https://imtehan.com/mpt-practice/live',
    type: 'website',
  },
}

export default function MPTLiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
