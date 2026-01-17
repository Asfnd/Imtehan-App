import type { Metadata } from 'next'
import { SchemaRenderer } from '@/components/seo/SchemaRenderer'

export const metadata: Metadata = {
  title: 'CSS Past Papers 2015-2023 with Solutions | Imtehan',
  description: 'Download and practice CSS past papers from 2015-2023 with detailed solutions. Access official exam papers, analysis, and expert explanations for all subjects.',
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
    title: 'CSS Past Papers 2015-2023 | Imtehan',
    description: 'Official CSS past papers from 2015-2023 with complete solutions and expert analysis.',
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
