import type { Metadata } from 'next'
import { SchemaRenderer } from '@/components/seo/SchemaRenderer'

export const metadata: Metadata = {
  title: 'CSS Past Papers 2015-2025 with Answers (Free PDF Practice)',
  description: 'Download and practise CSS past papers 2015-2025 with solved MCQs. Year-wise FPSC papers, trend analysis, and free online practice for every compulsory subject.',
  alternates: {
    canonical: 'https://imtehan.com/css/past-papers',
  },
  keywords: [
    'CSS past papers', 'CSS solved papers', 'CSS exam papers PDF',
    'CSS past papers with solutions', 'FPSC CSS papers',
    'CSS papers 2023', 'CSS papers 2022', 'CSS papers 2021',
    'CSS exam pattern', 'CSS question papers', 'CSS paper analysis',
  ],
  openGraph: {
    title: 'CSS Past Papers 2015-2025 with Answers',
    description: 'Free CSS past papers with solved MCQs, year-wise practice and expert analysis for FPSC candidates.',
    url: 'https://imtehan.com/css/past-papers',
    type: 'website',
  },
}

export default function PastPapersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SchemaRenderer pageType="past-papers" breadcrumbs={[
        { name: 'Home', url: 'https://imtehan.com' },
        { name: 'CSS Preparation', url: 'https://imtehan.com/css' },
        { name: 'Past Papers', url: 'https://imtehan.com/css/past-papers' },
      ]} />
      {children}
    </>
  )
}
