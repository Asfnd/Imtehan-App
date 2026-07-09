import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CSS 2026 Guess Papers - Expert Predictions',
  description: 'Download CSS 2026 guess papers for Current Affairs, Essay, Pakistan Affairs, General Science & Ability, and Precis. Expert predictions based on past paper trends.',
  keywords: [
    'CSS 2026 guess papers', 'CSS guess papers', 'CSS predictions 2026',
    'CSS Current Affairs guess paper', 'CSS Essay guess paper',
    'CSS Pakistan Affairs guess paper', 'CSS exam predictions'
  ],
  alternates: {
    canonical: 'https://imtehan.com/css/guess-papers',
  },
  openGraph: {
    title: 'CSS 2026 Guess Papers - Expert Predictions',
    description: 'Download CSS 2026 guess papers for all compulsory subjects. Expert predictions based on past paper analysis.',
    url: 'https://imtehan.com/css/guess-papers',
    type: 'website',
  },
}

export default function GuessPapersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
