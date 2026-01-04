import { MetadataRoute } from 'next'

/**
 * Dynamic Sitemap for SEO - CLEAN VERSION
 * Includes only canonical static URLs (no query parameters)
 * Query parameters are discovered through crawling and internal links
 */

// HARDCODED to prevent environment variable issues
const BASE_URL = 'https://imtehan.com'

export default function sitemap(): MetadataRoute.Sitemap {
  // All static pages - NO query parameters to avoid XML parsing errors
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    // Main sections
    {
      url: `${BASE_URL}/css`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/css/css-practice/subjects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/css/past-papers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/css/solved-papers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Utility pages
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ]

  // Blog articles - canonical URLs only
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog/css-english-essay-structure-examples`,
      lastModified: new Date('2026-01-03'),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/blog/css-time-management-3-hour-mcq-exam`,
      lastModified: new Date('2026-01-03'),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/blog/css-english-precis-composition-tips`,
      lastModified: new Date('2026-01-03'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/css-past-papers-analysis-trends`,
      lastModified: new Date('2026-01-03'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/pakistan-affairs-important-facts-by-year`,
      lastModified: new Date('2026-01-03'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/css-exam-preparation-guide-2025`,
      lastModified: new Date('2026-01-02'),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/blog/css-compulsory-subjects-overview`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/best-css-preparation-books-resources`,
      lastModified: new Date('2024-12-29'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/how-to-crack-css-first-attempt`,
      lastModified: new Date('2024-12-29'),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/blog/pakistan-affairs-mcqs-top-100-questions`,
      lastModified: new Date('2024-12-28'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/css-interview-preparation`,
      lastModified: new Date('2024-12-26'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/css-english-essay-preparation`,
      lastModified: new Date('2024-12-25'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/current-affairs-css-how-to-prepare`,
      lastModified: new Date('2024-12-24'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/css-eligibility-criteria-registration`,
      lastModified: new Date('2024-12-23'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/islamic-studies-css-complete-syllabus`,
      lastModified: new Date('2024-12-22'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/css-optional-subjects-guide`,
      lastModified: new Date('2024-12-21'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/css-past-papers-analysis-what-to-expect`,
      lastModified: new Date('2024-12-20'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/time-management-css-exam`,
      lastModified: new Date('2024-12-19'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/css-mock-test-strategy`,
      lastModified: new Date('2024-12-17'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/general-knowledge-css-exam`,
      lastModified: new Date('2024-12-16'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Other pages with practice routes (static paths only)
  const practicePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/css/css-practice/quiz`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/css/css-practice/idioms`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/mpt-practice`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/css/css-gsa`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  return [...staticPages, ...blogPages, ...practicePages]
}
