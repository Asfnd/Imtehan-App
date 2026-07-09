import { Metadata } from 'next'
import { PREMIUM_PAGE_URL } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Imtehan Premium : Full access to all exams & practice',
  description:
    'One subscription for unlimited MCQs, mock tests, solved papers, analytics, and writing tools across CSS, MPT, MDCAT, FSc, PPSC, and more.',
  keywords: [
    'Imtehan premium',
    'competitive exam preparation Pakistan',
    'MCQ practice subscription',
    'MDCAT premium',
    'CSS MPT preparation',
    'online mock tests Pakistan',
  ],
  alternates: {
    canonical: PREMIUM_PAGE_URL,
  },
  openGraph: {
    title: 'Imtehan Premium : Full access to all exams & practice',
    description:
      'Unlimited practice, mocks, and premium materials for every major Pakistani competitive exam:one professional subscription.',
    url: PREMIUM_PAGE_URL,
    type: 'website',
  },
}

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
