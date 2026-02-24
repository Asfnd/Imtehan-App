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
    slug: 'exam-prep-myths-pakistan',
    title: '5 Things Pakistan\'s Exam Prep Culture Gets Completely Wrong',
    excerpt: 'From 18-hour study days to the noble suffering trap — the widely-held preparation beliefs that are actively hurting students across CSS, MDCAT, and PPSC.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '7 min read',
    category: 'Strategy',
  },
  {
    slug: 'why-you-fail-mock-tests',
    title: 'The Real Reason You Keep Failing Mock Tests (It\'s Not What You Think)',
    excerpt: 'Mock scores that refuse to improve despite more studying are almost always one of four specific problems — each with a direct fix that has nothing to do with knowing more.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '6 min read',
    category: 'Practice',
  },
  {
    slug: 'fsc-marks-mdcat-trap',
    title: 'Why Your FSc Percentage Is a Trap for MDCAT Preparation',
    excerpt: 'Students with 95%+ FSc fail MDCAT every year. Students with 80% make the merit list. The gap between board exam skill and MDCAT skill — and how to close it.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '6 min read',
    category: 'MDCAT',
  },
  {
    slug: 'css-preparation-while-working',
    title: 'Preparing for CSS While Working Full-Time: The Honest Guide',
    excerpt: 'Thousands of employed candidates clear CSS every cycle. Here is the actual schedule, the trade-offs, and the adjustments that make it possible without burning out.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '7 min read',
    category: 'Strategy',
  },
  {
    slug: 'what-css-toppers-actually-do',
    title: 'What CSS Toppers Actually Do (That They Don\'t Mention in Interviews)',
    excerpt: 'The advice CSS toppers give in newspaper interviews is polished and safe. The actual preparation habits behind their scores are often different — and more honest.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '6 min read',
    category: 'Strategy',
  },
  {
    slug: 'css-6-month-preparation-plan',
    title: 'CSS Preparation in 6 Months: What a Realistic Plan Actually Looks Like',
    excerpt: 'Six months is not generous time for CSS — it is the minimum. Month-by-month breakdown of what to cover, when to start mocks, and the sequencing most plans get backwards.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '8 min read',
    category: 'Guide',
  },
  {
    slug: 'css-vs-corporate-career',
    title: 'CSS vs a Corporate Career: The Honest Comparison Nobody Makes',
    excerpt: 'CSS is a powerful career. But it deserves an honest comparison — salary timelines, opportunity costs, and the questions worth asking before committing years of your life to it.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '7 min read',
    category: 'Guide',
  },
  {
    slug: 'mdcat-drop-year-decision',
    title: 'The MDCAT Drop Year: What Nobody Tells You Before You Decide',
    excerpt: 'The honest costs, real odds, and alternative paths that nobody discusses fairly before the most consequential decision in Pakistani pre-medical life.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '7 min read',
    category: 'MDCAT',
  },
  {
    slug: 'why-smart-students-fail-exams',
    title: 'Why Smart Students Fail Exams (And Average Ones Make Merit List)',
    excerpt: 'Bright candidates miss cut-offs while less-prepared ones get selected. The reason is almost never knowledge. Here are the structural gaps that actually separate them.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '6 min read',
    category: 'Strategy',
  },
  {
    slug: 'ielts-7-band-without-coaching',
    title: 'How to Score 7 Bands in IELTS Without Spending Rs. 50,000 on Coaching',
    excerpt: 'IELTS is a skills test, not a knowledge test. A module-by-module breakdown of what each section actually measures and a 10-week self-study plan that works.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '7 min read',
    category: 'IELTS',
  },
  {
    slug: 'nts-test-preparation-strategy',
    title: 'NTS Test Preparation: Why Knowledgeable Candidates Keep Failing It',
    excerpt: 'NTS GAT and NAT are speed and pattern recognition tests — not knowledge tests. Here is how to train specifically for what NTS measures and stop plateauing.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '6 min read',
    category: 'Strategy',
  },
  {
    slug: 'negative-marking-exam-strategy',
    title: 'Negative Marking: The Strategy Most Candidates Get Completely Wrong',
    excerpt: 'Negative marking does not mean guess less — it means guess smarter. The actual math behind when to attempt, when to skip, and what to do in the final ten minutes.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '5 min read',
    category: 'Strategy',
  },
  {
    slug: 'how-to-study-with-no-motivation',
    title: 'How to Study When You Have Absolutely Zero Motivation',
    excerpt: 'Motivation disappears during every long exam preparation. The candidates who make it through are not the most motivated — they are the ones who stopped waiting for it.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '6 min read',
    category: 'Strategy',
  },
  {
    slug: 'engineering-entry-test-pakistan',
    title: 'NUST, UET, or GIKI? A Practical Comparison of Engineering Entry Tests',
    excerpt: 'Three tests, the same syllabus — but they reward different things. NUST NET rewards concepts, UET ECAT rewards speed, GIKI rewards analytical depth. Here is what to prepare.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '7 min read',
    category: 'Guide',
  },
  {
    slug: 'is-coaching-academy-worth-it',
    title: 'Is a Coaching Academy (KIPS, AKS) Actually Worth It? An Honest Answer',
    excerpt: 'Half a million students enrol in coaching academies every year. Some get results. Many do not. Here is what actually determines which group you end up in.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '7 min read',
    category: 'Guide',
  },
  {
    slug: 'forgetting-curve-spaced-repetition',
    title: 'Why You Forget Everything You Study (And How to Fix It)',
    excerpt: 'You studied a topic for three hours. A week later, your mind went blank. This is not a memory problem — it is a timing problem. Here is the spaced repetition fix.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '6 min read',
    category: 'Strategy',
  },
  {
    slug: 'mdcat-chemistry-high-yield-topics',
    title: 'MDCAT Chemistry: The 5 Topics That Will Decide Your Score',
    excerpt: 'Chemistry is where MDCAT merit ranks are made and lost. These five chapters — Equilibrium, Periodicity, Organic, Electrochemistry, Thermodynamics — contribute the most marks.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '7 min read',
    category: 'MDCAT',
  },
  {
    slug: 'css-current-affairs-dawn-reading-strategy',
    title: 'How to Actually Read Dawn for CSS Current Affairs',
    excerpt: 'Everyone tells you to read the newspaper. Nobody tells you how to read it so the information sticks. A practical two-column note system that turns 40 minutes into exam-ready knowledge.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '6 min read',
    category: 'Subject Guide',
  },
  {
    slug: 'night-before-exam-strategy',
    title: 'What to Do the Night Before Your Exam (And What to Avoid)',
    excerpt: 'Six months of preparation can unravel in one bad night. The exact routine — what to review, when to stop, and how to sleep — that protects your preparation.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '5 min read',
    category: 'Strategy',
  },
  {
    slug: 'ppsc-paper-pattern-decoded',
    title: 'PPSC Paper Pattern Decoded: What Ten Years of Past Papers Tell You',
    excerpt: 'Most PPSC candidates study everything and focus on nothing. An honest analysis of where the marks actually come from, and the six-week allocation that follows.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '7 min read',
    category: 'Analysis',
  },
  {
    slug: 'fsc-chemistry-organic-tips',
    title: 'FSc Chemistry Organic Section: How to Stop Dreading It and Start Scoring',
    excerpt: 'Most FSc students hate Organic Chemistry because they try to memorise reactions. Understanding functional groups and using board past papers changes everything.',
    date: 'Feb 24, 2026',
    author: 'Imtehan Team',
    readTime: '6 min read',
    category: 'FSc',
  },
  {
    slug: 'mdcat-physics-shortcuts',
    title: 'MDCAT Physics: The Art of Solving Without a Calculator',
    excerpt: 'Most MDCAT Physics questions are designed to be solved without long calculations. Learn the "No-Math" tricks like Dimensional Analysis and Ratio Scaling to save time.',
    date: 'Feb 21, 2025',
    author: 'Imtehan Team',
    readTime: '6 min read',
    category: 'MDCAT',
  },
  {
    slug: 'fsc-board-exam-presentation',
    title: 'FSc Board Exams: The "Examiner Psychology" Hack for Paper Presentation',
    excerpt: 'In FSc, presentation is 50% of your marks. Learn how to structure headings, use blue/black markers, and make your paper "easy to check" for maximum marks.',
    date: 'Feb 21, 2025',
    author: 'Imtehan Team',
    readTime: '7 min read',
    category: 'FSc',
  },
  {
    slug: 'smart-guessing-mcq-strategy',
    title: 'The Smart-Guessing Framework: How to Rule Out Options Like a Pro',
    excerpt: 'Master the art of logical elimination and smart guessing for CSS, MDCAT, and PPSC exams. Learn how to increase your score when you don\'t know the answer.',
    date: 'Feb 21, 2025',
    author: 'Imtehan Team',
    readTime: '6 min read',
    category: 'Strategy',
  },
  {
    slug: '80-20-english-grammar-guide',
    title: 'The 80/20 of English Grammar: What Examiners Actually Care About',
    excerpt: 'Stop studying useless grammar rules. Learn the high-yield topics like Subject-Verb Agreement, Prepositions, and Tenses that actually appear in CSS, PPSC, and FPSC exams.',
    date: 'Feb 21, 2025',
    author: 'Imtehan Team',
    readTime: '5 min read',
    category: 'Strategy',
  },
  {
    slug: 'ppsc-fpsc-general-knowledge-strategy',
    title: 'PPSC and FPSC Preparation: Why Most Candidates Fail the General Knowledge Paper',
    excerpt: 'Master the GK paper for PPSC and FPSC with our data-driven strategy. Learn why passive reading fails and how active testing can score you 80+ marks.',
    date: 'Feb 21, 2025',
    author: 'Imtehan Team',
    readTime: '6 min read',
    category: 'Strategy',
  },
  {
    slug: 'mdcat-biology-mastery-strategy',
    title: 'MDCAT Biology: How to Master the Most Rewarding Section',
    excerpt: 'Biology is the heart of the MDCAT. Learn how to move beyond rote memorization and achieve a top-tier score in the most critical section of the medical entry test.',
    date: 'Feb 21, 2025',
    author: 'Imtehan Team',
    readTime: '7 min read',
    category: 'MDCAT',
  },
  {
    slug: 'social-studying-community-chat-strategy',
    title: 'The Science of Social Studying: How to Use the Community Chat to Boost Your Score',
    excerpt: 'Leverage peer learning and the Protégé Effect to turn your preparation from a lonely struggle into a strategic advantage using the new Imtehan Community Chat.',
    date: 'Feb 21, 2025',
    author: 'Imtehan Team',
    readTime: '5 min read',
    category: 'Community',
  },
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
  MDCAT:         { bg: '#FFEDD5', text: '#EA580C' },
  Community:     { bg: '#FCE7F3', text: '#DB2777' },
  FSc:           { bg: '#CFFAFE', text: '#0891B2' },
  IELTS:         { bg: '#FFF1F2', text: '#BE123C' },
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
