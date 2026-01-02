import { MetadataRoute } from 'next'

/**
 * Dynamic Sitemap for SEO
 * Generates sitemap entries for all public pages
 * Updates automatically as content changes
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://imtehan.com'

// All CSS subjects for dynamic URL generation
const SUBJECTS = [
  'pakistan-affairs',
  'islamic-studies',
  'english-essay',
  'english-precis-and-composition',
  'general-science-and-ability',
  'current-affairs',
  'international-relations',
  'political-science',
  'public-administration',
  'accounting-and-auditing',
  'banking-and-finance',
  'business-administration',
  'environmental-sciences',
  'computer-science',
  'information-technology',
  'journalism-and-mass-communication',
  'law',
  'sociology',
  'psychology',
  'philosophy',
  'economics',
  'history',
  'geography',
  'literature',
  'chemistry',
  'physics',
  'biology',
  'mathematics',
]

// Available years for practice (adjust based on actual data)
const YEARS = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/css`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/css/css-practice/subjects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/css/past-papers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/css/solved-papers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Subject pages with all years
  const subjectPages: MetadataRoute.Sitemap = SUBJECTS.flatMap(subject =>
    YEARS.map(year => ({
      url: `${BASE_URL}/css/css-practice/subjects?subject=${subject}&year=${year}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  )

  // Subject pages without year filter
  const subjectOnlyPages: MetadataRoute.Sitemap = SUBJECTS.map(subject => ({
    url: `${BASE_URL}/css/css-practice/subjects?subject=${subject}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Year-specific pages
  const yearPages: MetadataRoute.Sitemap = YEARS.map(year => ({
    url: `${BASE_URL}/css/past-papers?year=${year}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...subjectPages,
    ...subjectOnlyPages,
    ...yearPages,
  ]
}
