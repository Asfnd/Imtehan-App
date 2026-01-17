/**
 * SEO Schema Generator
 * Creates structured data (JSON-LD) for better search visibility
 * - Uses AGGREGATE data only (no raw MCQ exposure)
 * - No individual user/item data
 * - Security: Safe to expose in HTML head
 */

export interface SchemaMarkup {
  '@context': string
  '@type': string
  [key: string]: any
}

/**
 * Generate Organization Schema for homepage
 * Tells Google about your platform
 */
export function generateOrganizationSchema(): SchemaMarkup {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Imtehan',
    url: 'https://imtehan.com',
    logo: 'https://imtehan.com/og-image.svg',
    description: 'CSS and MPT Exam Preparation Platform',
    sameAs: [
      'https://www.instagram.com/imtehanofficial/',
      'https://www.facebook.com/profile.php?id=61567790634598',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92-326-7426824',
      contactType: 'Customer Support',
      email: 'info@imtehan.com',
    },
  }
}

/**
 * Generate Educational Platform Schema
 * Describes the platform capabilities
 * Security: Uses aggregate data only
 */
export function generateEducationalPlatformSchema(stats: {
  totalMCQs: number
  totalSubjects: number
  yearsAvailable: number[]
  blogPostCount: number
}): SchemaMarkup {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Imtehan',
    description: 'Comprehensive CSS and MPT exam preparation platform with practice MCQs, past papers, and expert guidance.',
    url: 'https://imtehan.com',
    logo: 'https://imtehan.com/og-image.svg',
    image: 'https://imtehan.com/og-image.svg',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '5000',
    },
    potentialAction: {
      '@type': 'TradeAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://imtehan.com/css/premium',
        actionPlatform: ['DesktopWebPlatform', 'MobileWebPlatform'],
      },
      name: 'Get Premium Access',
    },
  }
}

/**
 * Generate Course Schema for CSS Preparation
 * Describes the CSS preparation course/program
 */
export function generateCourseSchema(): SchemaMarkup {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'CSS Exam Preparation',
    description: 'Complete CSS competitive exam preparation with MCQ practice, past papers, and expert resources.',
    url: 'https://imtehan.com/css',
    image: 'https://imtehan.com/og-image.svg',
    inLanguage: 'en-US',
    provider: {
      '@type': 'Organization',
      name: 'Imtehan',
      url: 'https://imtehan.com',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '5000',
    },
    educationalLevel: 'Undergraduate',
    learningResourceType: ['Practice Test', 'Study Guide', 'Assessment'],
  }
}

/**
 * Generate FAQ Page Schema
 * Helps Google show FAQ snippets in search results
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): SchemaMarkup {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate BlogPosting Schema
 * Helps Google understand blog articles
 * Security: No individual MCQ data exposed
 */
export function generateBlogPostingSchema(post: {
  title: string
  description: string
  slug: string
  date: string
  author: string
  readTime: string
  category: string
}): SchemaMarkup {
  const url = `https://imtehan.com/blog/${post.slug}`
  const image = 'https://imtehan.com/og-image.svg'

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://imtehan.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Imtehan',
      logo: {
        '@type': 'ImageObject',
        url: 'https://imtehan.com/og-image.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleBody: post.description,
    timeToRead: post.readTime,
    articleSection: post.category,
  }
}

/**
 * Generate BreadcrumbList Schema
 * Helps Google understand page hierarchy
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{
  name: string
  url: string
}>): SchemaMarkup {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate WebSite Schema with SearchAction
 * Enables Google search box feature
 */
export function generateWebSiteSchema(): SchemaMarkup {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Imtehan',
    url: 'https://imtehan.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://imtehan.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate LocalBusiness Schema (Optional for contact info)
 */
export function generateLocalBusinessSchema(): SchemaMarkup {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Imtehan',
    description: 'CSS and MPT Exam Preparation',
    url: 'https://imtehan.com',
    email: 'info@imtehan.com',
    telephone: '+92-326-7426824',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      telephone: '+92-326-7426824',
      email: 'info@imtehan.com',
    },
    sameAs: [
      'https://www.instagram.com/imtehanofficial/',
      'https://www.facebook.com/profile.php?id=61567790634598',
    ],
  }
}

/**
 * Convert schema object to JSON-LD string
 * Safe to add to HTML head
 */
export function schemaToJSON(schema: SchemaMarkup): string {
  return JSON.stringify(schema, null, 2)
}

/**
 * Create HTML script tag for schema
 * Ready to insert in head or body
 */
export function createSchemaScript(schema: SchemaMarkup): string {
  return `<script type="application/ld+json">${schemaToJSON(schema)}</script>`
}
