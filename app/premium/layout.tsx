import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Imtehan Premium — Unlock Full CSS, MDCAT & FSc Practice | Imtehan',
  description: 'Upgrade to Imtehan Premium for unlimited access to all CSS, MDCAT, and FSc MCQ sets, essay grader, mock tests, and advanced analytics. One subscription for complete exam preparation.',
  keywords: [
    'Imtehan premium', 'CSS premium preparation', 'MDCAT premium',
    'CSS MCQ unlimited', 'CSS exam premium access', 'FPSC preparation subscription',
    'CSS all sets unlocked', 'MDCAT full access',
  ],
  alternates: {
    canonical: 'https://imtehan.com/premium',
  },
  openGraph: {
    title: 'Imtehan Premium — Unlimited Exam Prep Access',
    description: 'Unlock all CSS, MDCAT & FSc practice sets, essay grader, and mock tests with Imtehan Premium.',
    url: 'https://imtehan.com/premium',
    type: 'website',
  },
}

export default function PremiumLayout({ children }: { children: React.ReactNode }) {
  return children
}
