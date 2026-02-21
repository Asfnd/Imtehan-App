'use client'

import { useState } from 'react'
import Link from 'next/link'
import NavigationBar from '@/components/NavigationBar'

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
    date: 'Jan 3, 2026',
    author: 'Imtehan Team',
    readTime: '12 min read',
    category: 'Writing Guide',
  },
  {
    slug: 'css-time-management-3-hour-mcq-exam',
    title: 'CSS MCQ Exam: Managing Three Hours Without Running Out of Time',
    excerpt: 'The CSS MCQ paper gives you three hours for one hundred questions. The three hours is always enough — the pacing is the problem.',
    date: 'Feb 19, 2025',
    author: 'Imtehan Team',
    readTime: '5 min read',
    category: 'Strategy',
  },
  {
    slug: 'css-english-precis-composition-tips',
    title: 'CSS English Précis and Composition: Tips with Practice',
    excerpt: 'Master CSS English Précis & Composition section. Grammar rules, writing techniques, and practice questions to score 80+ marks.',
    date: 'Jan 3, 2026',
    author: 'Imtehan Team',
    readTime: '10 min read',
    category: 'Writing Guide',
  },
  {
    slug: 'css-past-papers-analysis-trends',
    title: 'What CSS Past Papers Actually Reveal',
    excerpt: 'Analyze CSS past papers 2015–2023. Identify recurring topics, question patterns, scoring trends. Essential strategy for exam preparation.',
    date: 'Feb 11, 2025',
    author: 'Imtehan Team',
    readTime: '6 min read',
    category: 'Analysis',
  },
  {
    slug: 'pakistan-affairs-important-facts-by-year',
    title: 'Pakistan Affairs: Important Facts by Year (1947–2025)',
    excerpt: 'Essential Pakistan Affairs facts organized by year. Partition, wars, constitutions, key figures, and important events for CSS exam.',
    date: 'Jan 3, 2026',
    author: 'Imtehan Team',
    readTime: '14 min read',
    category: 'Subject Guide',
  },
  {
    slug: 'css-exam-preparation-guide-2025',
    title: 'Complete CSS Exam Preparation Guide 2025',
    excerpt: 'Master the CSS examination with our comprehensive guide covering syllabus, study strategies, time management, and success tips from top CSS officers.',
    date: 'Jan 2, 2025',
    author: 'Imtehan Team',
    readTime: '12 min read',
    category: 'Guide',
  },
  {
    slug: 'css-compulsory-subjects-overview',
    title: 'CSS Compulsory Subjects: Complete Overview & Study Tips',
    excerpt: 'Master all 7 CSS compulsory subjects including English, Urdu, Islamic Studies, Pakistan Affairs, Current Affairs, General Knowledge, and Everyday Science.',
    date: 'Jan 1, 2025',
    author: 'Imtehan Team',
    readTime: '13 min read',
    category: 'Subject Guide',
  },
  {
    slug: 'best-css-preparation-books-resources',
    title: 'Best CSS Preparation Books & Online Resources 2025',
    excerpt: 'Comprehensive list of recommended books, websites, and resources for CSS exam preparation covering all subjects.',
    date: 'Dec 29, 2024',
    author: 'Imtehan Team',
    readTime: '11 min read',
    category: 'Resources',
  },
  {
    slug: 'how-to-crack-css-first-attempt',
    title: 'How to Crack CSS in First Attempt: Insider Tips',
    excerpt: 'Proven strategies from top CSS officers on how to successfully pass CSS exam in your first attempt with smart preparation.',
    date: 'Feb 14, 2025',
    author: 'Imtehan Team',
    readTime: '6 min read',
    category: 'Strategy',
  },
  {
    slug: 'pakistan-affairs-mcqs-top-100-questions',
    title: 'Pakistan Affairs MCQs: Top 100 Questions with Answers',
    excerpt: 'Practice essential Pakistan Affairs MCQs that frequently appear in CSS exams. Includes detailed explanations and topic-wise categorization.',
    date: 'Dec 28, 2024',
    author: 'Imtehan Team',
    readTime: '15 min read',
    category: 'Practice',
  },
  {
    slug: 'css-interview-preparation',
    title: 'CSS Interview Preparation: Tips & Strategies',
    excerpt: 'Comprehensive guide for CSS viva voce interview preparation with insider tips and success strategies from CSS officers.',
    date: 'Dec 26, 2024',
    author: 'Imtehan Team',
    readTime: '10 min read',
    category: 'Strategy',
  },
  {
    slug: 'css-english-essay-preparation',
    title: 'How to Prepare for CSS English Essay: Tips & Strategies',
    excerpt: 'Learn proven techniques to excel in CSS English essay writing. Master structure, argumentation, and writing techniques used by successful candidates.',
    date: 'Dec 25, 2024',
    author: 'Imtehan Team',
    readTime: '10 min read',
    category: 'Writing Guide',
  },
  {
    slug: 'current-affairs-css-how-to-prepare',
    title: 'Current Affairs for CSS: How to Prepare Effectively',
    excerpt: 'Master current affairs for CSS exam with proven study strategies, newspaper reading tips, and MCQ practice methods.',
    date: 'Dec 24, 2024',
    author: 'Imtehan Team',
    readTime: '9 min read',
    category: 'Subject Guide',
  },
  {
    slug: 'css-eligibility-criteria-registration',
    title: 'CSS Eligibility Criteria & Registration: Complete Guide',
    excerpt: 'Complete guide to CSS eligibility criteria, registration process, deadlines, and requirements for 2025 examination.',
    date: 'Dec 23, 2024',
    author: 'Imtehan Team',
    readTime: '8 min read',
    category: 'Guide',
  },
  {
    slug: 'islamic-studies-css-complete-syllabus',
    title: 'Islamic Studies for CSS: Complete Syllabus & Topics',
    excerpt: 'Detailed breakdown of Islamic Studies syllabus for CSS exam. Understand key topics, important themes, and effective study approach.',
    date: 'Dec 22, 2024',
    author: 'Imtehan Team',
    readTime: '13 min read',
    category: 'Subject Guide',
  },
  {
    slug: 'css-optional-subjects-guide',
    title: 'CSS Optional Subjects Guide: Choose Smart',
    excerpt: 'Complete guide to choosing and preparing for CSS optional subjects. Compare history, geography, economics, and more.',
    date: 'Dec 21, 2024',
    author: 'Imtehan Team',
    readTime: '11 min read',
    category: 'Subject Guide',
  },
  {
    slug: 'css-past-papers-analysis-what-to-expect',
    title: 'CSS Past Papers Analysis: Patterns & What to Expect',
    excerpt: 'Analyze CSS past papers from 2015–2023. Understand exam patterns, recurring topics, and scoring analysis to better prepare.',
    date: 'Dec 20, 2024',
    author: 'Imtehan Team',
    readTime: '14 min read',
    category: 'Analysis',
  },
  {
    slug: 'time-management-css-exam',
    title: 'Time Management During the CSS Exam',
    excerpt: 'Master time management for CSS exam. Learn how to allocate time wisely, manage essays, and maximize MCQ attempts.',
    date: 'Feb 9, 2025',
    author: 'Imtehan Team',
    readTime: '5 min read',
    category: 'Strategy',
  },
  {
    slug: 'css-mock-test-strategy',
    title: 'CSS Mock Tests: How to Use Them Properly',
    excerpt: 'Maximize your CSS preparation with effective mock test strategies. Learn how to analyze results and identify improvements.',
    date: 'Feb 8, 2025',
    author: 'Imtehan Team',
    readTime: '5 min read',
    category: 'Practice',
  },
  {
    slug: 'general-knowledge-css-exam',
    title: 'General Knowledge for CSS Exam: Topics & Preparation',
    excerpt: 'Master General Knowledge for CSS exam with comprehensive topic coverage and effective study strategies.',
    date: 'Dec 16, 2024',
    author: 'Imtehan Team',
    readTime: '10 min read',
    category: 'Subject Guide',
  },
]

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Strategy:      { bg: '#DBEAFE', text: '#1D4ED8' },
  'Subject Guide': { bg: '#D1FAE5', text: '#047857' },
  'Writing Guide': { bg: '#EDE9FE', text: '#6D28D9' },
  Analysis:      { bg: '#FEF3C7', text: '#B45309' },
  Practice:      { bg: '#CCFBF1', text: '#0F766E' },
  Resources:     { bg: '#FEF9C3', text: '#A16207' },
  Guide:         { bg: '#E0F2FE', text: '#0369A1' },
}

const ALL_CATEGORIES = ['All Articles', ...Array.from(new Set(blogPosts.map(p => p.category)))]

function CategoryPill({ category }: { category: string }) {
  const color = CATEGORY_COLORS[category] ?? { bg: '#F3F4F6', text: '#52525B' }
  return (
    <span
      style={{ backgroundColor: color.bg, color: color.text }}
      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
    >
      {category}
    </span>
  )
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All Articles')

  const filtered = activeCategory === 'All Articles'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />

      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '48px 24px 80px',
          display: 'grid',
          gridTemplateColumns: '168px 1fr',
          gap: '48px',
          alignItems: 'start',
        }}
      >
        {/* ── Left sidebar ── */}
        <aside style={{ position: 'sticky', top: '88px' }}>
          <p style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#71717A',
            marginBottom: '16px',
          }}>
            Topics
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {ALL_CATEGORIES.map(cat => (
              <li key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    padding: '6px 0',
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: activeCategory === cat ? 600 : 400,
                    color: activeCategory === cat ? '#111111' : '#52525B',
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* ── Article feed ── */}
        <main>
          {filtered.map((post, idx) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                paddingTop: idx === 0 ? 0 : '32px',
                paddingBottom: '32px',
                borderBottom: idx < filtered.length - 1 ? '1px solid #E4E4E7' : 'none',
              }}
              className="group"
            >
              {/* Category + date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <CategoryPill category={post.category} />
                <span style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '13px',
                  color: '#A1A1AA',
                }}>
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: 'var(--font-libre-baskerville), Georgia, serif',
                fontSize: '22px',
                fontWeight: 700,
                lineHeight: 1.35,
                color: '#111111',
                marginBottom: '8px',
                transition: 'color 0.15s',
              }}
              className="group-hover:text-blue-700"
              >
                {post.title}
              </h2>

              {/* Excerpt */}
              <p style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '15px',
                lineHeight: 1.6,
                color: '#52525B',
                marginBottom: '14px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {post.excerpt}
              </p>

              {/* Author + read time + arrow */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '13px',
                  color: '#A1A1AA',
                }}>
                  By {post.author} · {post.readTime}
                </span>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid #E4E4E7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#A1A1AA',
                  flexShrink: 0,
                  transition: 'border-color 0.15s, color 0.15s',
                }}
                className="group-hover:border-blue-600 group-hover:text-blue-600"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </div>
  )
}
