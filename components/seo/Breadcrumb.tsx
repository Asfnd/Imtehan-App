'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Breadcrumb Component with Schema.org Markup
 * Improves SEO and user navigation
 * Generates BreadcrumbList schema for search engines
 */
export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // Generate BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visible breadcrumb */}
      <nav
        aria-label="breadcrumb"
        className={`flex items-center gap-2 text-sm text-gray-600 ${className}`}
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Link
              href={item.url}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              {item.name}
            </Link>
            {index < items.length - 1 && (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </div>
        ))}
      </nav>
    </>
  )
}

/**
 * Utility to generate breadcrumb items for common pages
 */
export const breadcrumbPaths = {
  home: { name: 'Home', url: '/' },
  practice: { name: 'CSS Practice', url: '/css-practice/subjects' },
  pastPapers: { name: 'Past Papers', url: '/past-papers' },
  solvedPapers: { name: 'Solved Papers', url: '/solved-papers' },
  contact: { name: 'Contact', url: '/contact' },
  privacy: { name: 'Privacy Policy', url: '/privacy' },
  terms: { name: 'Terms of Service', url: '/terms' },

  getSubjectPath: (subject: string) => ({
    name: `${subject.replace(/-/g, ' ')} Questions`,
    url: `/css-practice/subjects?subject=${subject}`,
  }),

  getYearPath: (year: number) => ({
    name: `${year} Papers`,
    url: `/past-papers?year=${year}`,
  }),
}

/**
 * Pre-built breadcrumb trails for common pages
 */
export const breadcrumbTrails = {
  home: [breadcrumbPaths.home],

  practice: [breadcrumbPaths.home, breadcrumbPaths.practice],

  practiceSubject: (subject: string) => [
    breadcrumbPaths.home,
    breadcrumbPaths.practice,
    breadcrumbPaths.getSubjectPath(subject),
  ],

  pastPapers: [breadcrumbPaths.home, breadcrumbPaths.pastPapers],

  pastPapersYear: (year: number) => [
    breadcrumbPaths.home,
    breadcrumbPaths.pastPapers,
    breadcrumbPaths.getYearPath(year),
  ],

  contact: [breadcrumbPaths.home, breadcrumbPaths.contact],
  privacy: [breadcrumbPaths.home, breadcrumbPaths.privacy],
  terms: [breadcrumbPaths.home, breadcrumbPaths.terms],
}
