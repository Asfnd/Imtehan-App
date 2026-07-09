import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { PMS_WRITING_COACH_PATH } from '@/lib/routes'

const title = 'PMS Writing Coach: Essay, Précis & Long Answer'
const description =
  'AI-powered PMS English practice: get examiner-style feedback on essays (~1,400-1,600 words), précis, and optional-paper long answers. Provincial competitive exam tuning to complement your MCQ prep on Imtehan.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'PMS essay',
    'PMS English essay',
    'PMS précis',
    'PPSC writing',
    'provincial management service English',
    'PMS preparation Pakistan',
    'PMS long answer practice',
  ],
  alternates: {
    canonical: `https://imtehan.com${PMS_WRITING_COACH_PATH}`,
  },
  openGraph: {
    title,
    description,
    url: `https://imtehan.com${PMS_WRITING_COACH_PATH}`,
    type: 'website',
    siteName: 'Imtehan',
  },
}

export default function PmsEssayGraderLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
