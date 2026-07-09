import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { EXAM_CONFIGS } from '@/lib/exam-configs'
import { PREMIUM_PAGE_PATH } from '@/lib/routes'
import { PRACTICE_MODES, isModeIndexable } from '@/lib/seo/sitemap-tiers'
import { CATEGORY_SLUGS } from '@/lib/seo/categoryContent'

export const BASE_URL = 'https://imtehan.com'

/** Stable date — only bump when exam SEO content or MCQ banks materially change. */
export const EXAM_SITEMAP_LASTMOD = '2026-06-14'
export const STATIC_SITEMAP_LASTMOD = '2026-06-01'

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

function getBlogSlugs(): string[] {
  try {
    const blogDir = path.join(process.cwd(), 'app', 'blog')
    return fs
      .readdirSync(blogDir, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          ['page.tsx', 'page.ts', 'page.jsx', 'page.js'].some((f) =>
            fs.existsSync(path.join(blogDir, entry.name, f)),
          ),
      )
      .map((entry) => entry.name)
      .sort()
  } catch {
    return Object.keys(BLOG_DATES)
  }
}

export type SitemapSegment = 'core' | 'exams' | 'modes'

export function buildCoreSitemap(): MetadataRoute.Sitemap {
  const lm = EXAM_SITEMAP_LASTMOD
  const staticLm = STATIC_SITEMAP_LASTMOD

  return [
    { url: BASE_URL, lastModified: lm, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/css`, lastModified: lm, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/mdcat`, lastModified: lm, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/fsc`, lastModified: lm, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/community`, lastModified: lm, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/css/subjects`, lastModified: lm, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/css/past-papers`, lastModified: lm, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/css/solved-papers`, lastModified: lm, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/css/guess-papers`, lastModified: lm, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/css/essay-grader`, lastModified: lm, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/exams/pms-competitive`, lastModified: lm, changeFrequency: 'weekly', priority: 0.88 },
    { url: `${BASE_URL}/exams/pms-competitive/essay-grader`, lastModified: lm, changeFrequency: 'weekly', priority: 0.87 },
    { url: `${BASE_URL}/css/css-practice`, lastModified: lm, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/css/css-practice/idioms`, lastModified: lm, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/css/css-gsa`, lastModified: lm, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${BASE_URL}${PREMIUM_PAGE_PATH}`, lastModified: staticLm, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/mpt-practice`, lastModified: lm, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/mpt-practice/past-papers`, lastModified: lm, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/mdcat/biology`, lastModified: lm, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/mdcat/chemistry`, lastModified: lm, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/mdcat/physics`, lastModified: lm, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/mdcat/english`, lastModified: lm, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/mdcat/logical-reasoning`, lastModified: lm, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/mdcat/mock/pmc`, lastModified: staticLm, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/mdcat/mock/etea`, lastModified: staticLm, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/mdcat/mock/nums`, lastModified: staticLm, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/mdcat/mock/aku`, lastModified: staticLm, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/fsc/biology`, lastModified: lm, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/fsc/chemistry`, lastModified: lm, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/fsc/physics`, lastModified: lm, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: lm, changeFrequency: 'weekly', priority: 0.85 },
    ...getBlogSlugs().map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: BLOG_DATES[slug] ?? lm,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${BASE_URL}/about`, lastModified: staticLm, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/careers`, lastModified: staticLm, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: staticLm, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: staticLm, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: staticLm, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/terms`, lastModified: staticLm, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/exams`, lastModified: lm, changeFrequency: 'weekly', priority: 0.95 },
    ...CATEGORY_SLUGS.map((category) => ({
      url: `${BASE_URL}/exams/category/${category}`,
      lastModified: lm,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ]
}

export function buildExamsSitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const lm = EXAM_SITEMAP_LASTMOD

  for (const [slug, config] of Object.entries(EXAM_CONFIGS)) {
    const hubPriority = config.category === 'css' || config.category === 'pms' ? 0.9 : 0.85
    entries.push({
      url: `${BASE_URL}/exams/${slug}`,
      lastModified: lm,
      changeFrequency: 'weekly',
      priority: hubPriority,
    })
    for (const section of config.sections) {
      entries.push({
        url: `${BASE_URL}/exams/${slug}/${section.slug}`,
        lastModified: lm,
        changeFrequency: 'weekly',
        priority: hubPriority - 0.05,
      })
    }
  }
  return entries
}

export function buildModesSitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const lm = EXAM_SITEMAP_LASTMOD

  for (const [slug, config] of Object.entries(EXAM_CONFIGS)) {
    for (const section of config.sections) {
      for (const mode of PRACTICE_MODES) {
        if (!isModeIndexable(slug, config.category, mode)) continue
        entries.push({
          url: `${BASE_URL}/exams/${slug}/${section.slug}/${mode}`,
          lastModified: lm,
          changeFrequency: 'weekly',
          priority: mode === 'past-papers' ? 0.75 : 0.72,
        })
      }
    }
  }
  return entries
}

export function buildSitemapSegment(segment: SitemapSegment): MetadataRoute.Sitemap {
  switch (segment) {
    case 'core':
      return buildCoreSitemap()
    case 'exams':
      return buildExamsSitemap()
    case 'modes':
      return buildModesSitemap()
  }
}

/** All indexable URLs — for IndexNow diff scripts. */
export function buildAllIndexableUrls(): string[] {
  return (['core', 'exams', 'modes'] as const).flatMap((seg) =>
    buildSitemapSegment(seg).map((e) => e.url),
  )
}
