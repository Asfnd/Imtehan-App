import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium CSS Preparation Plans | Imtehan',
  description: 'Unlock full access to 10,000+ CSS MCQs, past papers, solved papers, and guess papers. Choose from 3, 6, or 12-month premium plans.',
  keywords: [
    'CSS premium', 'CSS preparation subscription', 'CSS MCQs full access',
    'CSS past papers subscription', 'Imtehan premium', 'CSS exam preparation paid'
  ],
  alternates: {
    canonical: 'https://imtehan.com/css/premium',
  },
  openGraph: {
    title: 'Premium CSS Preparation Plans | Imtehan',
    description: 'Unlock full access to all CSS preparation resources. Choose your plan and start preparing today.',
    url: 'https://imtehan.com/css/premium',
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
