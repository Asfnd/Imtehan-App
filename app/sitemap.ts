import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { EXAM_CONFIGS } from '@/lib/exam-configs'
import { PREMIUM_PAGE_PATH } from '@/lib/routes'

// Known publish/update dates for blog posts (freshness signal). Any blog post
// directory not listed here still gets indexed; it just falls back to today.
const BLOG_DATES: Record<string, string> = {
  'css-exam-preparation-guide-2025': '2026-01-02',
  'css-english-essay-structure-examples': '2026-01-03',
  'css-time-management-3-hour-mcq-exam': '2026-01-03',
  'css-english-precis-composition-tips': '2026-01-03',
  'css-past-papers-analysis-trends': '2026-01-03',
  'pakistan-affairs-important-facts-by-year': '2026-01-03',
  'css-compulsory-subjects-overview': '2026-01-01',
  'how-to-crack-css-first-attempt': '2024-12-29',
  'best-css-preparation-books-resources': '2024-12-29',
  'pakistan-affairs-mcqs-top-100-questions': '2024-12-28',
  'css-interview-preparation': '2024-12-26',
  'css-english-essay-preparation': '2024-12-25',
  'current-affairs-css-how-to-prepare': '2024-12-24',
  'css-eligibility-criteria-registration': '2024-12-23',
  'islamic-studies-css-complete-syllabus': '2024-12-22',
  'css-optional-subjects-guide': '2024-12-21',
  'css-past-papers-analysis-what-to-expect': '2024-12-20',
  'time-management-css-exam': '2024-12-19',
  'css-mock-test-strategy': '2024-12-17',
  'general-knowledge-css-exam': '2024-12-16',
  '80-20-english-grammar-guide': '2026-02-20',
  'fsc-board-exam-presentation': '2026-02-20',
  'mdcat-biology-mastery-strategy': '2026-02-20',
  'mdcat-physics-shortcuts': '2026-02-20',
  'ppsc-fpsc-general-knowledge-strategy': '2026-02-20',
  'smart-guessing-mcq-strategy': '2026-02-20',
  'social-studying-community-chat-strategy': '2026-02-20',
  'forgetting-curve-spaced-repetition': '2026-02-24',
  'mdcat-chemistry-high-yield-topics': '2026-02-24',
  'css-current-affairs-dawn-reading-strategy': '2026-02-24',
  'night-before-exam-strategy': '2026-02-24',
  'ppsc-paper-pattern-decoded': '2026-02-24',
  'fsc-chemistry-organic-tips': '2026-02-24',
  'why-smart-students-fail-exams': '2026-02-24',
  'ielts-7-band-without-coaching': '2026-02-24',
  'nts-test-preparation-strategy': '2026-02-24',
  'negative-marking-exam-strategy': '2026-02-24',
  'how-to-study-with-no-motivation': '2026-02-24',
  'engineering-entry-test-pakistan': '2026-02-24',
  'is-coaching-academy-worth-it': '2026-02-24',
  'mdcat-drop-year-decision': '2026-02-24',
  'css-vs-corporate-career': '2026-02-24',
  'css-6-month-preparation-plan': '2026-02-24',
  'what-css-toppers-actually-do': '2026-02-24',
  'css-preparation-while-working': '2026-02-24',
  'fsc-marks-mdcat-trap': '2026-02-24',
  'why-you-fail-mock-tests': '2026-02-24',
  'exam-prep-myths-pakistan': '2026-02-24',
}

// Discover every blog post directory that has a page, so new articles are
// indexed automatically without editing this file.
function getBlogSlugs(): string[] {
  try {
    const blogDir = path.join(process.cwd(), 'app', 'blog')
    return fs
      .readdirSync(blogDir, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          ['page.tsx', 'page.ts', 'page.jsx', 'page.js'].some((f) =>
            fs.existsSync(path.join(blogDir, entry.name, f))
          )
      )
      .map((entry) => entry.name)
      .sort()
  } catch {
    return Object.keys(BLOG_DATES)
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://imtehan.com'
  const currentDate = new Date().toISOString().split('T')[0]

  // Main pages (highest priority)
  const mainPages: MetadataRoute.Sitemap = [
    { url: baseUrl,               lastModified: currentDate, changeFrequency: 'weekly',  priority: 1.0  },
    { url: `${baseUrl}/css`,      lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${baseUrl}/mdcat`,    lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${baseUrl}/fsc`,      lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${baseUrl}/community`,lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.8  },
  ]

  // CSS section pages
  const cssPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/css/subjects`,           lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${baseUrl}/css/past-papers`,        lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${baseUrl}/css/solved-papers`,      lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${baseUrl}/css/guess-papers`,       lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${baseUrl}/css/essay-grader`,       lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${baseUrl}/exams/pms-competitive`,  lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.88 },
    { url: `${baseUrl}/exams/pms-competitive/essay-grader`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.87 },
    { url: `${baseUrl}/css/css-practice`,       lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.8  },
    { url: `${baseUrl}/css/css-practice/quiz`,  lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${baseUrl}/css/css-practice/idioms`,lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.7  },
    { url: `${baseUrl}/css/css-gsa`,            lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${baseUrl}${PREMIUM_PAGE_PATH}`,      lastModified: currentDate, changeFrequency: 'monthly', priority: 0.85 },
  ]

  // MPT section
  const mptPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/mpt-practice`,           lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.8  },
    { url: `${baseUrl}/mpt-practice/past-papers`,lastModified: currentDate, changeFrequency: 'weekly', priority: 0.75 },
  ]

  // MDCAT section
  const mdcatPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/mdcat/biology`,            lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/mdcat/chemistry`,          lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/mdcat/physics`,            lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/mdcat/english`,            lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8  },
    { url: `${baseUrl}/mdcat/logical-reasoning`,  lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8  },
    { url: `${baseUrl}/mdcat/mock/pmc`,           lastModified: currentDate, changeFrequency: 'monthly',priority: 0.8  },
    { url: `${baseUrl}/mdcat/mock/etea`,          lastModified: currentDate, changeFrequency: 'monthly',priority: 0.8  },
    { url: `${baseUrl}/mdcat/mock/nums`,          lastModified: currentDate, changeFrequency: 'monthly',priority: 0.8  },
    { url: `${baseUrl}/mdcat/mock/aku`,           lastModified: currentDate, changeFrequency: 'monthly',priority: 0.75 },
  ]

  // FSc section
  const fscPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/fsc/biology`,  lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/fsc/chemistry`,lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/fsc/physics`,  lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
  ]

  // Blog pages, auto-discovered from the filesystem so new posts are indexed automatically.
  const blogPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    ...getBlogSlugs().map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: BLOG_DATES[slug] ?? currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]

  // Info pages
  const infoPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/about`,   lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/careers`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`,     lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: currentDate, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${baseUrl}/terms`,   lastModified: currentDate, changeFrequency: 'yearly',  priority: 0.5 },
  ]

  // Dynamically generated exam + subject pages from all 211 exam configs
  const examPages: MetadataRoute.Sitemap = []

  // /exams browse page
  examPages.push({ url: `${baseUrl}/exams`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 })

  for (const [slug, config] of Object.entries(EXAM_CONFIGS)) {
    // Exam hub page
    examPages.push({
      url: `${baseUrl}/exams/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    })
    // Subject pages
    for (const section of config.sections) {
      examPages.push({
        url: `${baseUrl}/exams/${slug}/${section.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.75,
      })
    }
  }

  return [
    ...mainPages,
    ...cssPages,
    ...mptPages,
    ...mdcatPages,
    ...fscPages,
    ...blogPages,
    ...infoPages,
    ...examPages,
  ]
}
