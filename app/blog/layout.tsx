import type { Metadata } from 'next'
import { BlogSchemaRenderer } from '@/components/seo/BlogSchemaRenderer'

export const metadata: Metadata = {
  title: 'CSS & MPT Exam Blog - Study Tips, Guides & Resources | Imtehan',
  description: 'Read expert guides on CSS and MPT exam preparation. Learn study strategies, access past paper analysis, subject-wise tips, and interview preparation advice.',
  alternates: {
    canonical: 'https://imtehan.com/blog',
  },
  keywords: [
    'CSS exam blog', 'CSS study guide', 'CSS preparation tips',
    'Pakistan Affairs tips', 'CSS essay writing', 'CSS exam strategy',
    'CSS interview preparation', 'CSS past paper analysis',
    'MPT exam blog', 'competitive exam preparation',
  ],
  openGraph: {
    title: 'CSS & MPT Exam Blog | Study Tips & Guides',
    description: 'Expert guides on CSS and MPT exam preparation with study strategies and resources.',
    url: 'https://imtehan.com/blog',
    type: 'website',
  },
}

// Blog posts data for schema generation
const blogPosts = [
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BlogSchemaRenderer blogPosts={blogPosts} pageType="blog-list" />
      {children}
    </>
  )
}
