import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CSS General Science & Ability MCQs (1973-2025) | Imtehan',
  description: 'Practice CSS General Science & Ability past paper MCQs from 1973 to 2025. Comprehensive question bank with detailed explanations for CSS exam preparation.',
  alternates: {
    canonical: 'https://imtehan.com/css/css-gsa',
  },
  keywords: [
    'CSS GSA MCQs', 'CSS General Science MCQs', 'CSS Ability MCQs',
    'CSS past papers GSA', 'CSS GSA preparation', 'CSS Science questions',
    'CSS exam GSA', 'General Science CSS', 'CSS ability questions',
  ],
  openGraph: {
    title: 'CSS General Science & Ability MCQs | Imtehan',
    description: 'Practice CSS GSA past paper MCQs from 1973-2025 with detailed solutions.',
    url: 'https://imtehan.com/css/css-gsa',
    type: 'website',
  },
}

export default function CSSGSALayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
