import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Imtehan - CSS & MPT Exam Preparation Platform',
  description: 'Learn about Imtehan, Pakistan\'s leading CSS and MPT exam preparation platform. Our mission is to help aspirants succeed in competitive exams.',
  alternates: {
    canonical: 'https://imtehan.com/about',
  },
  openGraph: {
    title: 'About Imtehan',
    description: 'Pakistan\'s leading CSS and MPT exam preparation platform.',
    url: 'https://imtehan.com/about',
    type: 'website',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
