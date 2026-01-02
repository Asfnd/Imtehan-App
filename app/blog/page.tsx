'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import { Breadcrumb, breadcrumbTrails } from '@/components/seo/Breadcrumb'

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
    slug: 'css-exam-preparation-guide-2025',
    title: 'Complete CSS Exam Preparation Guide 2025',
    excerpt: 'Master the CSS examination with our comprehensive guide covering syllabus, study strategies, time management, and success tips from top CSS officers.',
    date: 'January 2, 2025',
    author: 'Imtehan Team',
    readTime: '12 min read',
    category: 'Guide',
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
    slug: 'css-english-essay-preparation',
    title: 'How to Prepare for CSS English Essay: Tips & Strategies',
    excerpt: 'Learn proven techniques to excel in CSS English essay writing. Master structure, argumentation, and writing techniques used by successful candidates.',
    date: 'December 25, 2024',
    author: 'Imtehan Team',
    readTime: '10 min read',
    category: 'Subject Guide',
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
    slug: 'css-past-papers-analysis-what-to-expect',
    title: 'CSS Past Papers Analysis: Patterns & What to Expect',
    excerpt: 'Analyze CSS past papers from 2015-2023. Understand exam patterns, recurring topics, and scoring analysis to better prepare.',
    date: 'December 20, 2024',
    author: 'Imtehan Team',
    readTime: '14 min read',
    category: 'Analysis',
  },
  {
    slug: 'best-css-preparation-books-resources',
    title: 'Best CSS Preparation Books & Online Resources 2025',
    excerpt: 'Comprehensive list of recommended books, websites, and resources for CSS exam preparation covering all subjects.',
    date: 'December 18, 2024',
    author: 'Imtehan Team',
    readTime: '11 min read',
    category: 'Resources',
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
                items={[...breadcrumbTrails.home, { name: 'Blog', url: '/blog' }]}
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
