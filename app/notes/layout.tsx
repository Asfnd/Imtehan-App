import type { Metadata } from 'next'
import { Libre_Baskerville } from 'next/font/google'

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-libre-baskerville',
  preload: false,
})

export const metadata: Metadata = {
  title: 'Exam Notes',
  description:
    'Syllabus-mapped notes for CSS, PMS, PPSC, FPSC and NTS. One-pagers, fact cards, and past-paper angles — organised by exam.',
}

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return <div className={libreBaskerville.variable}>{children}</div>
}
