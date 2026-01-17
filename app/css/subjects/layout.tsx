import { Metadata } from 'next'
import { SchemaRenderer } from '@/components/seo/SchemaRenderer'

export const metadata: Metadata = {
  title: 'CSS MCQs Practice - 40+ Subjects | Imtehan',
  description: 'Practice CSS exam MCQs from 40+ subjects including Pakistan Affairs, Islamic Studies, Current Affairs, English, and all optional subjects. 10,000+ questions with answers.',
  keywords: [
    'CSS MCQs', 'CSS practice questions', 'CSS subjects', 'Pakistan Affairs MCQs',
    'Islamic Studies MCQs', 'Current Affairs MCQs', 'CSS English MCQs',
    'CSS exam preparation', 'FPSC MCQs', 'CSS optional subjects'
  ],
  alternates: {
    canonical: 'https://imtehan.com/css/subjects',
  },
  openGraph: {
    title: 'CSS MCQs Practice - 40+ Subjects | Imtehan',
    description: 'Practice CSS exam MCQs from 40+ subjects. 10,000+ questions with detailed answers.',
    url: 'https://imtehan.com/css/subjects',
    type: 'website',
  },
}

export default function SubjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SchemaRenderer pageType="subjects" breadcrumbs={[
        { name: 'Home', url: 'https://imtehan.com' },
        { name: 'CSS Preparation', url: 'https://imtehan.com/css' },
        { name: 'Subjects MCQs', url: 'https://imtehan.com/css/subjects' },
      ]} />
      {children}
    </>
  )
}
