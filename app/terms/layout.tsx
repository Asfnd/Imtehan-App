import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Imtehan - CSS and MPT exam preparation platform. Read our terms and conditions for using the platform.',
  alternates: {
    canonical: 'https://imtehan.com/terms',
  },
  openGraph: {
    title: 'Terms of Service',
    description: 'Terms of service for Imtehan exam preparation platform.',
    url: 'https://imtehan.com/terms',
    type: 'website',
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
