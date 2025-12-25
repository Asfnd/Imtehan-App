import Link from 'next/link'
import { ArrowRight, BookOpen, Award, TrendingUp, Users, Zap, CheckCircle, Target, Clock, BarChart3 } from 'lucide-react'
import { SmartCTAButton } from '@/components/seo/SmartCTAButton'
import ReviewsCarousel from '@/components/ReviewsCarousel'

export const metadata = {
  title: 'Exam Prep Platform | CSS, FPSC & More',
  description: 'Practice CSS, FPSC, and other competitive exams with comprehensive question banks, past papers, and detailed solutions. Free trial available.',
  keywords: 'exam prep, CSS practice, FPSC preparation, competitive exams, question bank',
  openGraph: {
    title: 'Exam Prep Platform | Practice CSS & FPSC',
    description: 'Prepare for CSS and FPSC exams with thousands of practice questions and past papers.',
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
    q: 'How do I get started?',
    a: 'Sign up with your Google account and you\'ll have instant access to all practice materials. No credit card required.'
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes! You can try the platform with limited access to get a feel for how it works before committing.'
  },
  {
    q: 'What exams can I prepare for?',
    a: 'Currently we offer CSS preparation. FPSC is coming soon. We plan to add more competitive exams based on user demand.'
  },
  {
    q: 'Can I track my progress?',
    a: 'Absolutely. Our analytics show your performance by subject, question type, and time spent. You\'ll see exactly where you need to improve.'
  },
  {
    q: 'Is the content updated regularly?',
    a: 'Yes, we add new questions and past papers regularly to keep the content current and relevant.'
  },
  {
    q: 'Works on mobile?',
    a: 'Yes, fully responsive on all devices - phones, tablets, and desktops. Practice anywhere, anytime.'
  }
]

const REVIEWS = [
  {
    name: 'Ayesha Malik',
    role: 'CSS Student',
    text: 'I was struggling with Pakistan Affairs until I found this platform. The explanations for each question really helped me understand the concepts instead of just memorizing.',
    location: 'Karachi'
  },
  {
    name: 'Hassan Ali',
    role: 'MBA Aspirant',
    text: 'Using this for CSS prep. What I love is how organized everything is - I can practice by subject and see where I\'m weak. Way better than random online resources.',
    location: 'Islamabad'
  },
  {
    name: 'Zara Hussain',
    role: 'Engineering Student',
    text: 'Preparing for CSS while finishing my degree. The past papers section is a game changer - I can actually see the pattern of questions and what to focus on.',
    location: 'Lahore'
  },
  {
    name: 'Muhammad Tariq',
    role: 'First-Time CSS Taker',
    text: 'Started with the free trial just to explore. Within a few questions, I realized I needed this. The solutions explain WHY answers are correct, not just WHAT is correct.',
    location: 'Rawalpindi'
  },
  {
    name: 'Nimra Khan',
    role: 'CSS Preparation',
    text: 'The progress tracking actually motivates me. Seeing improvement in specific topics keeps me going. Also love that I can practice at 2 AM without worrying about schedules.',
    location: 'Peshawar'
  },
  {
    name: 'Bilal Ahmed',
    role: 'Student (Part-time Job)',
    text: 'Perfect for students like me who can\'t attend expensive coaching. I practice during breaks, weekends. The quality is genuinely good - feels like real exam prep.',
    location: 'Multan'
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
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Imtehan
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/css-practice/subjects" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium text-sm transition-colors rounded-lg">
              CSS Practice
            </Link>
            <button className="px-4 py-2 text-gray-400 font-medium text-sm cursor-not-allowed hover:bg-gray-100 rounded-lg transition-colors" disabled>
              FPSC
              <span className="text-xs ml-1 bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Soon</span>
            </button>
            <Link href="/contact" className="px-4 py-2 text-gray-700 hover:bg-gray-100 font-medium text-sm transition-colors rounded-lg">
              Help
            </Link>
            <div className="ml-4 pl-4 border-l border-gray-200">
              <SmartCTAButton variant="primary" showIcon={false} className="!text-sm">
                Sign In
              </SmartCTAButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 sm:py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-950 mb-6 leading-tight">
              Prepare for Competitive Exams
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed">
              Practice with thousands of questions, review official past papers, and track your progress. Everything you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SmartCTAButton variant="primary">
                Start Your Free Trial
              </SmartCTAButton>
              <Link href="#available" className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors">
                Explore Options
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's Available Section */}
      <section className="py-20 sm:py-28 bg-white" id="available">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 mb-4">
              Choose Your Exam Prep
            </h2>
            <p className="text-lg text-gray-600">Available and coming soon options</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-3xl mx-auto">
            <div className="p-8 rounded-2xl border-2 border-blue-400 bg-gradient-to-br from-blue-50 via-white to-blue-50 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-950">CSS Preparation</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Complete exam prep with practice questions, official past papers, and detailed solutions. Start practicing immediately.
              </p>
              <Link href="/css-practice/subjects" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Start Practicing Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="p-8 rounded-2xl border-2 border-gray-300 bg-gray-50 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-400">FPSC Preparation</h3>
              </div>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Coming soon. We're building comprehensive FPSC exam preparation resources to help you succeed.
              </p>
              <button disabled className="text-gray-400 font-semibold cursor-not-allowed">
                Coming in 2025
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simplified */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">Three simple steps to better preparation</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-950 mb-4">Practice Questions</h3>
              <p className="text-gray-600 leading-relaxed">Thousands of organized questions by subject and difficulty. Learn with detailed explanations for each answer.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-950 mb-4">Past Papers</h3>
              <p className="text-gray-600 leading-relaxed">Official exam papers with solutions. Understand question patterns and what to expect in the actual exam.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-950 mb-4">Track Progress</h3>
              <p className="text-gray-600 leading-relaxed">See your improvements over time. Identify weak areas and focus your effort where it matters most.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section - Interactive Carousel */}
      <section className="py-20 sm:py-28 bg-white">
        <ReviewsCarousel reviews={REVIEWS} />
      </section>

      {/* Why Choose Us */}
      <section className="py-20 sm:py-28 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose Imtehan?
            </h2>
            <p className="text-lg text-blue-100">Built for serious exam preparation</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Quality Content</h3>
                <p className="text-blue-100">Verified questions and official past papers. No filler, only what you need.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Detailed Solutions</h3>
                <p className="text-blue-100">Understand WHY answers are correct. Learn concepts, not just memorize.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Real Analytics</h3>
                <p className="text-blue-100">Track which topics you've mastered and where to focus your time.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Practice Anytime</h3>
                <p className="text-blue-100">No schedules, no classes. Learn at your own pace, your own time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 mb-4">
              Common Questions
            </h2>
            <p className="text-lg text-gray-600">Everything you need to know</p>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-gray-950">
                  {item.q}
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Imtehan</h3>
              <p className="text-sm">Prepare for competitive exams with comprehensive question banks and solutions.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Prepare</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/css-practice/subjects" className="hover:text-white">CSS Practice</Link></li>
                <li><Link href="/past-papers" className="hover:text-white">Past Papers</Link></li>
                <li><a href="#" className="hover:text-white">FPSC (Coming Soon)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Help</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 Imtehan. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}
