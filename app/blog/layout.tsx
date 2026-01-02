import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CSS & MPT Exam Blog - Study Tips, Guides & Resources | Imtehan',
  description: 'Read expert guides on CSS and MPT exam preparation. Learn study strategies, access past paper analysis, subject-wise tips, and interview preparation advice.',
  alternates: {
    canonical: 'https://imtehan.com/blog',
  },
  keywords: [
    'CSS exam blog', 'CSS study guide', 'CSS preparation tips',
    'Pakistan Affairs tips', 'CSS essay writing', 'CSS exam strategy',
    'CSS interview preparation', 'CSS past paper analysis',
    'MPT exam blog', 'competitive exam preparation',
  ],
  openGraph: {
    title: 'CSS & MPT Exam Blog | Study Tips & Guides',
    description: 'Expert guides on CSS and MPT exam preparation with study strategies and resources.',
    url: 'https://imtehan.com/blog',
    type: 'website',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
