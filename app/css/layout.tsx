import { Metadata } from 'next'
import { SchemaRenderer } from '@/components/seo/SchemaRenderer'

export const metadata: Metadata = {
  title: 'CSS Exam Preparation: MCQs, Past Papers & More | Imtehan',
  description: 'Complete CSS exam preparation platform with 10,000+ MCQs, past papers from 2015-2023, solved papers, and guess papers. Practice for Pakistan\'s Central Superior Services exam.',
  keywords: [
    'CSS exam', 'CSS preparation', 'CSS MCQs', 'CSS past papers',
    'Central Superior Services', 'FPSC CSS', 'CSS Pakistan',
    'CSS 2026', 'CSS exam preparation', 'CSS online test'
  ],
  alternates: {
    canonical: 'https://imtehan.com/css',
  },
  openGraph: {
    title: 'CSS Exam Preparation | Imtehan',
    description: 'Complete CSS exam preparation with 10,000+ MCQs, past papers, and expert resources.',
    url: 'https://imtehan.com/css',
    type: 'website',
  },
}

export default function CSSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SchemaRenderer pageType="css-hub" breadcrumbs={[
        { name: 'Home', url: 'https://imtehan.com' },
        { name: 'CSS Preparation', url: 'https://imtehan.com/css' },
      ]} />
      {children}
    </>
  )
}
