import type { Metadata } from 'next'
import { Libre_Baskerville } from 'next/font/google'
import { BreadcrumbListSchema } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'Exam Notes | Imtehan',
  description:
    'Syllabus-mapped notes for CSS, PMS, PPSC and more. Built for analysis, revision, and practice.',
  alternates: { canonical: 'https://imtehan.com/notes' },
}

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-libre-baskerville',
  preload: false,
})

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={libreBaskerville.variable}>
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: 'https://imtehan.com' },
          { name: 'Notes', url: 'https://imtehan.com/notes' },
        ]}
      />
      {children}
    </div>
  )
}
