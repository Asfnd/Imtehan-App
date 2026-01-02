import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { BookOpen, Target, Users, Award, ArrowRight } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'

export const metadata: Metadata = {
  title: 'About Imtehan - CSS & MPT Exam Preparation Platform',
  description: 'Learn about Imtehan, Pakistan\'s leading online platform for CSS and MPT exam preparation. Discover our mission to help thousands of students excel in competitive exams with expert-curated content.',
  alternates: {
    canonical: 'https://imtehan.com/about',
  },
  openGraph: {
    title: 'About Imtehan - CSS & MPT Exam Preparation Platform',
    description: 'Learn about Imtehan, Pakistan\'s leading online platform for CSS and MPT exam preparation.',
    url: 'https://imtehan.com/about',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <NavigationBar />

      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Imtehan
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pakistan's comprehensive platform for CSS and MPT competitive exam preparation
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#F9FAFB]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Imtehan was founded with a single goal: to democratize access to high-quality competitive exam preparation in Pakistan. We believe that every aspiring CSS and MPT candidate deserves access to expert-curated content, comprehensive practice materials, and intelligent learning tools—regardless of their location or financial background.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">10,000+ Practice Questions</h3>
                <p className="text-gray-600">
                  Comprehensive MCQ bank covering all CSS and MPT subjects, updated regularly with new questions and detailed explanations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Past Papers Archive</h3>
                <p className="text-gray-600">
                  Official CSS and MPT past papers from 2015-2023 with complete solutions and expert analysis.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Performance Analytics</h3>
                <p className="text-gray-600">
                  Track your progress with detailed analytics, identify weak areas, and get personalized study recommendations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert-Curated Content</h3>
                <p className="text-gray-600">
                  All questions and explanations are created by subject matter experts and successful CSS officers.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Why Choose Imtehan?</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <strong className="text-gray-900">Authentic CSS-Style Questions:</strong> Our questions mirror actual CSS and MPT exam patterns and difficulty levels.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <strong className="text-gray-900">Learn Anywhere, Anytime:</strong> Access our platform 24/7 from any device—mobile, tablet, or desktop.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <strong className="text-gray-900">Free Core Features:</strong> Get started with free access to essential practice tests and past papers.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <strong className="text-gray-900">Regular Updates:</strong> New questions, past papers, and features added continuously based on latest exam trends.
                </div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">Our Commitment</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We're committed to continuously improving our platform based on student feedback and exam trends. Our team regularly updates content, adds new features, and ensures that every question meets the highest quality standards.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Whether you're beginning your CSS journey or preparing for MPT, Imtehan provides the tools, resources, and guidance you need to succeed.
            </p>
          </div>

          <div className="text-center mt-12">
            <Link href="/css">
              <Button size="lg" className="h-12 px-8">
                Start Practicing Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Have questions? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link> or read our <Link href="/faq" className="text-blue-600 hover:underline">FAQ</Link>
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
