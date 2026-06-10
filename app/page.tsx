import type { Metadata } from 'next'
import { HomeClient } from "@/components/HomeClient"

export const metadata: Metadata = {
  title: 'CSS, PMS & MDCAT Exam Preparation with 70,000+ MCQs | Imtehan',
  description: 'Prepare for CSS, PMS, MDCAT, PPSC, FPSC and 200+ competitive exams in Pakistan with 70,000+ MCQs, past papers, mock tests and AI essay grading. Free to start.',
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
        url: 'https://imtehan.com/og-image.jpg',
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
  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      {/* Organization + WebSite structured data is rendered once in the root layout
          (components/seo/StructuredData) to avoid duplicate Organization entities. */}
      <HomeClient />
    </main>
  )
}
