import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { HomeHeroShell } from '@/components/HomeHeroShell'
import { HomeNavStrip } from '@/components/HomeNavStrip'
import { HomeIndexingRelay } from '@/components/seo/HomeIndexingRelay'
import { buildCorpusDatasetJsonLd } from '@/lib/seo/quiz-jsonld'
import { jsonLdString } from '@/lib/seo/jsonld'

const HomeClient = dynamic(
  () => import('@/components/HomeClient').then((m) => ({ default: m.HomeClient })),
  { loading: () => null },
)

export const metadata: Metadata = {
  title: 'CSS, PMS & MDCAT Exam Preparation with 150,000+ MCQs',
  description: 'Prepare for CSS, PMS, MDCAT, PPSC, FPSC and 200+ competitive exams in Pakistan with 150,000+ MCQs, real mock tests, past papers and AI scan-to-solve. Free to start.',
  keywords: 'CSS exam preparation, MPT practice, past papers, study guides, competitive exams',
  alternates: { canonical: 'https://imtehan.com' },
  openGraph: {
    title: 'Imtehan - Learn Smarter, Practice Better, Compete with Confidence',
    description: 'Comprehensive exam preparation platform for CSS, MPT, and competitive exams with practice tests, past papers, and expert guides.',
    url: 'https://imtehan.com',
    type: 'website',
    siteName: 'Imtehan',
    images: [
      {
        url: 'https://imtehan.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Imtehan - CSS & MPT Exam Preparation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imtehan - CSS & MPT Exam Preparation',
    description: 'Practice smarter, score higher on CSS and MPT exams',
  },
}

export default function Home() {
  const corpusJsonLd = buildCorpusDatasetJsonLd()

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(corpusJsonLd) }} />
      <HomeNavStrip />
      <HomeHeroShell />
      <HomeClient />
      <HomeIndexingRelay />
    </main>
  )
}
