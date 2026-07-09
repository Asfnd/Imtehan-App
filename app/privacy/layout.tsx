import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Imtehan - CSS and MPT exam preparation platform. Learn how we collect, use, and protect your data.',
  alternates: {
    canonical: 'https://imtehan.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy',
    description: 'Privacy policy for Imtehan exam preparation platform.',
    url: 'https://imtehan.com/privacy',
    type: 'website',
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
