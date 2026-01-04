import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import { Breadcrumb, breadcrumbTrails } from '@/components/seo/Breadcrumb'

export const metadata: Metadata = {
  title: 'CSS & MPT Exam Preparation Blog - Study Guides & Tips | Imtehan',
  description: 'Expert guides on CSS and MPT exam preparation. Learn essay writing, time management, subject strategies, and insider tips from successful candidates. 20+ in-depth articles.',
  alternates: { canonical: 'https://imtehan.com/blog' },
  openGraph: {
    title: 'CSS & MPT Exam Blog - Expert Guides & Study Tips',
    description: 'Comprehensive blog covering CSS exam preparation, strategies, and subject guides.',
    url: 'https://imtehan.com/blog',
    type: 'website',
    siteName: 'Imtehan',
  },
}

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  readTime: string
  category: string
}

const blogPosts: BlogPost[] = [
  {
    slug: 'css-english-essay-structure-examples',
    title: 'CSS English Essay Structure and Examples',
    excerpt: 'Master CSS English essay with perfect structure. Real examples, template, and scoring breakdown. Learn the exact formula top scorers use.',
    date: 'January 3, 2026',
    author: 'Imtehan Team',
    readTime: '12 min read',
    category: 'Writing Guide',
  },
  {
    slug: 'css-time-management-3-hour-mcq-exam',
    title: 'CSS Time Management During MCQ Exam: 3 Hours Strategy',
    excerpt: 'Master CSS 3-hour MCQ exam time management. Minute-by-minute breakdown, question strategies, and techniques to maximize your score.',
    date: 'January 3, 2026',
    author: 'Imtehan Team',
    readTime: '11 min read',
    category: 'Strategy',
  },
  {
    slug: 'css-english-precis-composition-tips',
    title: 'CSS English Précis and Composition: Tips with Practice',
    excerpt: 'Master CSS English Précis & Composition section. Grammar rules, writing techniques, and practice questions to score 80+ marks.',
    date: 'January 3, 2026',
    author: 'Imtehan Team',
    readTime: '10 min read',
    category: 'Writing Guide',
  },
  {
    slug: 'css-past-papers-analysis-trends',
    title: 'CSS Past Papers 2015-2023: Important Questions & Trend Analysis',
    excerpt: 'Analyze CSS past papers 2015-2023. Identify recurring topics, question patterns, scoring trends. Essential strategy for exam preparation.',
    date: 'January 3, 2026',
    author: 'Imtehan Team',
    readTime: '13 min read',
    category: 'Analysis',
  },
  {
    slug: 'pakistan-affairs-important-facts-by-year',
    title: 'Pakistan Affairs: Important Facts by Year (1947-2025)',
    excerpt: 'Essential Pakistan Affairs facts organized by year. Partition, wars, constitutions, key figures, and important events for CSS exam.',
    date: 'January 3, 2026',
    author: 'Imtehan Team',
    readTime: '14 min read',
    category: 'Subject Guide',
  },
  {
    slug: 'css-exam-preparation-guide-2025',
    title: 'Complete CSS Exam Preparation Guide 2025',
    excerpt: 'Master the CSS examination with our comprehensive guide covering syllabus, study strategies, time management, and success tips from top CSS officers.',
    date: 'January 2, 2025',
    author: 'Imtehan Team',
    readTime: '12 min read',
    category: 'Guide',
  },
  {
    slug: 'css-compulsory-subjects-overview',
    title: 'CSS Compulsory Subjects: Complete Overview & Study Tips',
    excerpt: 'Master all 7 CSS compulsory subjects including English, Urdu, Islamic Studies, Pakistan Affairs, Current Affairs, General Knowledge, and Everyday Science.',
    date: 'January 1, 2025',
    author: 'Imtehan Team',
    readTime: '13 min read',
    category: 'Subject Guide',
  },
  {
    slug: 'best-css-preparation-books-resources',
    title: 'Best CSS Preparation Books & Online Resources 2025',
    excerpt: 'Comprehensive list of recommended books, websites, and resources for CSS exam preparation covering all subjects.',
    date: 'December 29, 2024',
    author: 'Imtehan Team',
    readTime: '11 min read',
    category: 'Resources',
  },
  {
    slug: 'how-to-crack-css-first-attempt',
    title: 'How to Crack CSS in First Attempt: Insider Tips',
    excerpt: 'Proven strategies from top CSS officers on how to successfully pass CSS exam in your first attempt with smart preparation.',
    date: 'December 29, 2024',
    author: 'Imtehan Team',
    readTime: '12 min read',
    category: 'Strategy',
  },
  {
    slug: 'pakistan-affairs-mcqs-top-100-questions',
    title: 'Pakistan Affairs MCQs: Top 100 Questions with Answers',
    excerpt: 'Practice essential Pakistan Affairs MCQs that frequently appear in CSS exams. Includes detailed explanations and topic-wise categorization.',
    date: 'December 28, 2024',
    author: 'Imtehan Team',
    readTime: '15 min read',
    category: 'Practice',
  },
  {
    slug: 'css-interview-preparation',
    title: 'CSS Interview Preparation: Tips & Strategies',
    excerpt: 'Comprehensive guide for CSS viva voce interview preparation with insider tips and success strategies from CSS officers.',
    date: 'December 26, 2024',
    author: 'Imtehan Team',
    readTime: '10 min read',
    category: 'Interview',
  },
  {
    slug: 'css-english-essay-preparation',
    title: 'How to Prepare for CSS English Essay: Tips & Strategies',
    excerpt: 'Learn proven techniques to excel in CSS English essay writing. Master structure, argumentation, and writing techniques used by successful candidates.',
    date: 'December 25, 2024',
    author: 'Imtehan Team',
    readTime: '10 min read',
    category: 'Subject Guide',
  },
  {
    slug: 'current-affairs-css-how-to-prepare',
    title: 'Current Affairs for CSS: How to Prepare Effectively',
    excerpt: 'Master current affairs for CSS exam with proven study strategies, newspaper reading tips, and MCQ practice methods.',
    date: 'December 24, 2024',
    author: 'Imtehan Team',
    readTime: '9 min read',
    category: 'Subject Guide',
  },
  {
    slug: 'css-eligibility-criteria-registration',
    title: 'CSS Eligibility Criteria & Registration: Complete Guide',
    excerpt: 'Complete guide to CSS eligibility criteria, registration process, deadlines, and requirements for 2025 examination.',
    date: 'December 23, 2024',
    author: 'Imtehan Team',
    readTime: '8 min read',
    category: 'Information',
  },
  {
    slug: 'islamic-studies-css-complete-syllabus',
    title: 'Islamic Studies for CSS: Complete Syllabus & Topics',
    excerpt: 'Detailed breakdown of Islamic Studies syllabus for CSS exam. Understand key topics, important themes, and effective study approach.',
    date: 'December 22, 2024',
    author: 'Imtehan Team',
    readTime: '13 min read',
    category: 'Subject Guide',
  },
  {
    slug: 'css-optional-subjects-guide',
    title: 'CSS Optional Subjects Guide: Choose Smart',
    excerpt: 'Complete guide to choosing and preparing for CSS optional subjects. Compare history, geography, economics, and more.',
    date: 'December 21, 2024',
    author: 'Imtehan Team',
    readTime: '11 min read',
    category: 'Subject Guide',
  },
  {
    slug: 'css-past-papers-analysis-what-to-expect',
    title: 'CSS Past Papers Analysis: Patterns & What to Expect',
    excerpt: 'Analyze CSS past papers from 2015-2023. Understand exam patterns, recurring topics, and scoring analysis to better prepare.',
    date: 'December 20, 2024',
    author: 'Imtehan Team',
    readTime: '14 min read',
    category: 'Analysis',
  },
  {
    slug: 'time-management-css-exam',
    title: 'Time Management During CSS Exam: Strategic Tips',
    excerpt: 'Master time management for CSS exam. Learn how to allocate time wisely, manage essays, and maximize MCQ attempts.',
    date: 'December 19, 2024',
    author: 'Imtehan Team',
    readTime: '10 min read',
    category: 'Strategy',
  },
  {
    slug: 'css-mock-test-strategy',
    title: 'CSS Mock Test Strategy: Practice Like Real Exam',
    excerpt: 'Maximize your CSS preparation with effective mock test strategies. Learn how to analyze results and identify improvements.',
    date: 'December 17, 2024',
    author: 'Imtehan Team',
    readTime: '9 min read',
    category: 'Practice',
  },
  {
    slug: 'general-knowledge-css-exam',
    title: 'General Knowledge for CSS Exam: Topics & Preparation',
    excerpt: 'Master General Knowledge for CSS exam with comprehensive topic coverage and effective study strategies.',
    date: 'December 16, 2024',
    author: 'Imtehan Team',
    readTime: '10 min read',
    category: 'Subject Guide',
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <NavigationBar />

      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-20">
          <div className="flex justify-between items-start gap-8">
            <div className="flex-1">
              <Breadcrumb
                items={[
                  { name: 'Home', url: '/' },
                  { name: 'Blog', url: '/blog' }
                ]}
                className="mb-6"
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                CSS & MPT Exam Blog
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Expert guides, study tips, and in-depth analysis to help you ace your CSS and MPT examinations. Learn from experienced educators and successful candidates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-20 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6 flex flex-col h-full">
                {/* Category Tag */}
                <div className="inline-flex w-fit mb-4">
                  <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {post.readTime}
                  </div>
                </div>

                {/* Read More */}
                <div className="mt-4 flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Study Tips & Updates
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Subscribe to receive new guides, study tips, and exam preparation resources directly in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Have a blog topic suggestion? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link>
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
