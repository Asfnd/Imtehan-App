import type { Metadata } from 'next'
import Link from "next/link"
import { BookOpen } from "lucide-react"
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

      {/* Blog CTA Section - Strategic Placement */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-blue-100 mb-6">
              <BookOpen className="w-7 h-7 text-blue-600" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Learn from Comprehensive Study Guides
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Read expert-written blog articles covering CSS English essay structure, time management strategies, subject guides, interview preparation, and proven tips from top CSS officers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog" className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Browse All Guides
              </Link>

              <Link href="/blog/css-exam-preparation-guide-2025" className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 border border-blue-200 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                Start with Exam Prep Guide
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-8">
              20+ in-depth articles covering every aspect of CSS exam preparation
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
