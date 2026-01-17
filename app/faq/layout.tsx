import { Metadata } from 'next'
import { SchemaRenderer } from '@/components/seo/SchemaRenderer'

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | Imtehan',
  description: 'Find answers to frequently asked questions about Imtehan, CSS exam preparation, premium plans, and how to use our platform effectively.',
  alternates: {
    canonical: 'https://imtehan.com/faq',
  },
  openGraph: {
    title: 'FAQ | Imtehan',
    description: 'Frequently asked questions about CSS exam preparation and Imtehan platform.',
    url: 'https://imtehan.com/faq',
    type: 'website',
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SchemaRenderer breadcrumbs={[
        { name: 'Home', url: 'https://imtehan.com' },
        { name: 'FAQ', url: 'https://imtehan.com/faq' },
      ]} />
      {children}
    </>
  )
}
