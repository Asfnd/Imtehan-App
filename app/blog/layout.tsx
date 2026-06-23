import type { Metadata } from 'next'
import { Libre_Baskerville } from 'next/font/google'
import { BreadcrumbListSchema } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'CSS & MPT Exam Prep Blog: Syllabus, Books, Past Papers & MCQ Tips | Imtehan',
  description: 'Free CSS 2026 preparation guides — best books, past paper analysis, Pakistan Affairs MCQs, MPT strategy, and PPSC/FPSC tips from Imtehan.',
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
    title: 'CSS 2026 Prep Guides: Books, Syllabus & Free MCQs | Imtehan',
    description: 'Expert CSS, MPT, PPSC and MDCAT preparation guides with past paper analysis and free MCQ practice.',
    url: 'https://imtehan.com/blog',
    type: 'website',
  },
}

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-libre-baskerville',
  preload: false,
})

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={libreBaskerville.variable}>
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: 'https://imtehan.com' },
          { name: 'Blog', url: 'https://imtehan.com/blog' },
        ]}
      />
      {children}
    </div>
  )
}
