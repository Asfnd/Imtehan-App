import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Get Help with CSS & MPT Preparation',
  description: 'Contact Imtehan support team. Get help with CSS and MPT exam preparation, technical support, or feature requests. Quick response guaranteed.',
  alternates: {
    canonical: 'https://imtehan.com/contact',
  },
  openGraph: {
    title: 'Contact Imtehan',
    description: 'Get in touch with our support team for CSS and MPT exam preparation help.',
    url: 'https://imtehan.com/contact',
    type: 'website',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
