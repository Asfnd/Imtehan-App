import Link from 'next/link'
import { ArrowRight, BookOpen, Award, TrendingUp, Users, Zap, CheckCircle } from 'lucide-react'
import { SmartCTAButton } from '@/components/seo/SmartCTAButton'

export const metadata = {
  title: 'CSS Exam Preparation Online | 10,000+ Practice Questions & Solutions',
  description: 'Complete CSS exam prep platform with 10,000+ MCQs, past papers, mock tests & expert solutions. Free access to CSS preparation resources.',
  keywords: 'CSS exam, CSS preparation, CSS practice questions, CSS past papers, Central Superior Services',
  openGraph: {
    title: 'CSS Exam Preparation Online | CSS Practice Hub',
    description: 'Master your CSS exam with 10,000+ practice questions, official past papers, and detailed solutions.',
    type: 'website',
  },
}

const SUBJECTS = [
  'Pakistan Affairs', 'Islamic Studies', 'English Essay', 'English Précis & Composition',
  'General Science & Ability', 'Current Affairs', 'International Relations', 'Political Science',
  'Public Administration', 'Accounting & Auditing', 'Banking & Finance', 'Business Administration',
  'Environmental Sciences', 'Computer Science', 'Information Technology', 'Journalism & Mass Communication',
  'Law', 'Sociology', 'Psychology', 'Philosophy'
]

const FAQ_ITEMS = [
  {
    q: 'How many practice questions are available?',
    a: 'We offer 10,000+ comprehensive MCQs covering all CSS subjects with detailed explanations and solutions.'
  },
  {
    q: 'Can I access past papers?',
    a: 'Yes! Our platform includes 1000+ official CSS past papers from previous years with complete solutions.'
  },
  {
    q: 'Are mock tests available?',
    a: 'Absolutely. Take timed mock tests that simulate real CSS exam conditions with instant performance feedback.'
  },
  {
    q: 'How does the progress tracking work?',
    a: 'Track your performance across all subjects, identify weak areas, and monitor improvement with detailed analytics.'
  },
  {
    q: 'What\'s the pass rate of users on this platform?',
    a: 'Our users achieve a 95% pass rate on the CSS exam compared to the national average of 5%.'
  },
  {
    q: 'Can I use the platform on mobile?',
    a: 'Yes, our platform is fully responsive and works seamlessly on all devices - mobile, tablet, and desktop.'
  }
]

export default function Home() {
  // Organization Schema for SEO
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CSS Practice Hub',
    description: 'Complete CSS exam preparation platform with 10,000+ practice questions, past papers, and solutions',
    url: 'https://prepz.vercel.app',
    logo: 'https://prepz.vercel.app/logo.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      url: 'https://prepz.vercel.app/contact'
    },
    sameAs: [
      'https://facebook.com',
      'https://twitter.com',
      'https://linkedin.com'
    ]
  }

  // EducationalWebsite Schema
  const educationalSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalWebsite',
    name: 'CSS Practice Hub',
    url: 'https://prepz.vercel.app',
    description: 'CSS Exam Preparation Platform'
  }

  // FAQPage Schema for featured snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many practice questions are available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer 10,000+ comprehensive MCQs covering all CSS subjects with detailed explanations and solutions.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I access past papers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our platform includes 1000+ official CSS past papers from previous years with complete solutions.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are mock tests available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Take timed mock tests that simulate real CSS exam conditions with instant performance feedback.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does the progress tracking work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Track your performance across all subjects, identify weak areas, and monitor improvement with detailed analytics.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the pass rate of users on this platform?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our users achieve a 95% pass rate on the CSS exam compared to the national average of 5%.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I use the platform on mobile?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our platform is fully responsive and works seamlessly on all devices - mobile, tablet, and desktop.'
        }
      }
    ]
  }

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="w-full">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CSS Practice Hub
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium text-sm">
              Privacy
            </Link>
            <SmartCTAButton variant="primary" showIcon={false}>
              Get Started
            </SmartCTAButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 sm:py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CSS Exam</span> with Confidence
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Complete CSS preparation with 10,000+ practice questions, official past papers, mock tests & expert solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <SmartCTAButton variant="primary">
                Start Free Practice
              </SmartCTAButton>
              <Link href="/privacy" className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors">
                Learn More
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 justify-center text-sm text-gray-600 mt-12">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>2,000+ students prepared</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>95% pass rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Free access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Everything You Need to Succeed
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: '10,000+ Practice Questions', desc: 'Comprehensive MCQs covering all CSS subjects with detailed explanations' },
              { icon: Award, title: 'Official Past Papers', desc: '1000+ solved CSS past papers from previous years with complete solutions' },
              { icon: TrendingUp, title: 'Mock Tests & Quizzes', desc: 'Timed mock exams that simulate real CSS exam conditions' },
              { icon: Users, title: 'Subject-wise Preparation', desc: 'Organize practice by subject to focus on weak areas' },
              { icon: Zap, title: 'Instant Feedback', desc: 'Get immediate results and understand mistakes with detailed explanations' },
              { icon: CheckCircle, title: 'Performance Analytics', desc: 'Track progress across subjects and identify improvement areas' },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all hover:scale-105">
                <feature.icon className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
            Prepare for All CSS Subjects
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Access comprehensive study materials for all 40+ CSS exam subjects
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {SUBJECTS.map((subject, i) => (
              <Link key={i} href={`/css-practice/subjects?subject=${subject.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                className="p-4 bg-white rounded-lg border border-gray-200 text-center hover:border-purple-400 hover:bg-purple-50 transition-colors font-medium text-gray-700 hover:text-purple-600">
                {subject}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/css-practice/subjects" className="inline-flex items-center justify-center px-6 py-2 text-purple-600 font-semibold hover:text-purple-700">
              View All Subjects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="p-6 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors group cursor-pointer">
                <summary className="font-semibold text-gray-900 flex items-center justify-between">
                  {item.q}
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Have more questions?</p>
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-2 text-purple-600 font-semibold hover:text-purple-700">
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Preparing?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful CSS candidates preparing with our platform
          </p>
          <SmartCTAButton variant="primary" className="!px-8 !py-3 !bg-white !from-white !to-white !text-purple-600">
            Start Free Practice Now
          </SmartCTAButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">CSS Practice Hub</h3>
              <p className="text-sm">Comprehensive CSS exam preparation platform with 10,000+ questions</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/css-practice/subjects" className="hover:text-white">Practice Questions</Link></li>
                <li><Link href="/past-papers" className="hover:text-white">Past Papers</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Study Guide</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 CSS Practice Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}
