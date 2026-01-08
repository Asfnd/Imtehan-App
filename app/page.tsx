import type { Metadata } from 'next'
import { HomeClient } from "@/components/HomeClient"

export const metadata: Metadata = {
  title: 'Imtehan - CSS & MPT Exam Preparation | Practice Tests & Study Guides',
  description: 'Master CSS and MPT exams with 10,000+ practice questions, past papers, study guides, and expert strategies. Imtehan helps you prepare smarter and score higher.',
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
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Imtehan',
            url: 'https://imtehan.com',
            description: 'Comprehensive exam preparation platform for CSS, MPT, and competitive exams',
            logo: 'https://imtehan.com/favicon.svg',
            sameAs: [
              'https://www.facebook.com/imtehan',
              'https://www.twitter.com/imtehan',
            ],
          }),
        }}
      />

      <HomeClient />
    </main>
  )
}
