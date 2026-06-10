'use client'

/**
 * Structured Data Components for SEO
 * Implements Schema.org markup for better search engine understanding
 */

interface OrganizationSchemaProps {
  name?: string
  url?: string
  logo?: string
  description?: string
  sameAs?: string[]
}

const DEFAULT_SAME_AS = [
  'https://www.instagram.com/imtehanofficial/',
  'https://www.facebook.com/profile.php?id=61567790634598',
]

export function OrganizationSchema({
  name = 'Imtehan',
  url = 'https://imtehan.com',
  logo = 'https://imtehan.com/logo.png',
  description = 'Pakistan\'s exam preparation platform for CSS, PMS, MDCAT, PPSC, FPSC and 200+ competitive exams. Practice MCQs, past papers, mock tests and AI essay grading.',
  sameAs = DEFAULT_SAME_AS
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${url}/#organization`,
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
      width: 512,
      height: 512,
    },
    image: 'https://imtehan.com/og-image.png',
    description,
    ...(sameAs.length > 0 && { sameAs }),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'info@imtehan.com',
      telephone: '+92-326-7426824',
      url: `${url}/contact`,
      availableLanguage: ['English', 'Urdu'],
    },
    areaServed: {
      '@type': 'Country',
      name: 'Pakistan',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface CourseSchemaProps {
  name: string
  description: string
  provider?: string
  url?: string
}

export function CourseSchema({
  name,
  description,
  provider = 'Imtehan',
  url = 'https://imtehan.com'
}: CourseSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url,
    },
    educationalLevel: 'Professional',
    inLanguage: 'en',
    availableLanguage: ['en', 'ur'],
    isAccessibleForFree: true,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  items: FAQItem[]
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface WebSiteSchemaProps {
  name?: string
  url?: string
  description?: string
}

export function WebSiteSchema({
  name = 'Imtehan',
  url = 'https://imtehan.com',
  description = 'CSS and MPT competitive exam preparation platform'
}: WebSiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    name,
    url,
    description,
    inLanguage: ['en', 'ur'],
    publisher: { '@id': `${url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/exams?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface EducationalOrganizationSchemaProps {
  name?: string
  url?: string
  description?: string
}

export function EducationalOrganizationSchema({
  name = 'Imtehan',
  url = 'https://imtehan.com',
  description = 'Online platform for CSS and MPT competitive exam preparation in Pakistan'
}: EducationalOrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name,
    url,
    description,
    areaServed: 'Pakistan',
    educationalCredentialAwarded: 'Exam Preparation Certificate',
    offers: {
      '@type': 'Offer',
      category: 'Educational Services',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'PKR',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ArticleSchemaProps {
  title: string
  description: string
  content: string
  author?: string
  publishDate: string
  modifiedDate?: string
  imageUrl?: string
  url: string
}

export function ArticleSchema({
  title,
  description,
  content,
  author = 'Imtehan',
  publishDate,
  modifiedDate,
  imageUrl = 'https://imtehan.com/og-image.png',
  url,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    content: {
      '@type': 'Text',
      text: content,
    },
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://imtehan.com',
    },
    datePublished: publishDate,
    ...(modifiedDate && { dateModified: modifiedDate }),
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
    },
    url,
    isPartOf: {
      '@type': 'Blog',
      name: 'Imtehan Blog',
      url: 'https://imtehan.com/blog',
    },
    mainEntity: {
      '@type': 'Article',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbListProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbListSchema({ items }: BreadcrumbListProps) {
  const schema = {
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQPageItem {
  question: string
  answer: string
}

interface FAQPageSchemaProps {
  items: FAQPageItem[]
}

export function FAQPageSchema({ items }: FAQPageSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BlogCollectionProps {
  items: {
    title: string
    description: string
    url: string
    datePublished: string
  }[]
}

export function BlogCollectionSchema({ items }: BlogCollectionProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'CSS & MPT Exam Blog',
    description: 'Expert guides on CSS and MPT exam preparation',
    url: 'https://imtehan.com/blog',
    hasPart: items.map((item) => ({
      '@type': 'BlogPosting',
      headline: item.title,
      description: item.description,
      url: item.url,
      datePublished: item.datePublished,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
