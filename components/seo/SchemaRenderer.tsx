/**
 * SEO Schema Renderer (Server Component)
 * Fetches real platform data and injects JSON-LD schemas
 */

import { SchemaInjector } from './SchemaInjector'
import {
  generateEducationalPlatformSchema,
  generateCourseSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
  SchemaMarkup
} from '@/lib/seo/schemaGenerator'
import { getPlatformStats } from '@/lib/seo/realDataFetcher'

interface SchemaRendererProps {
  pageType?: 'css-hub' | 'subjects' | 'practice' | 'past-papers' | 'blog'
  breadcrumbs?: Array<{ name: string; url: string }>
}

export async function SchemaRenderer({
  pageType = 'css-hub',
  breadcrumbs = []
}: SchemaRendererProps) {
  try {
    // Fetch real platform statistics
    const platformStats = await getPlatformStats()

    // Generate schemas with real data
    const schemas: SchemaMarkup[] = [
      // Always include these base schemas
      generateWebSiteSchema(),
      generateEducationalPlatformSchema({
        totalMCQs: platformStats.totalMCQs,
        totalSubjects: platformStats.totalSubjects,
        yearsAvailable: platformStats.yearsAvailable,
        blogPostCount: platformStats.blogPostCount,
      }),
      generateCourseSchema(),
    ]

    // Add breadcrumb schema if provided
    if (breadcrumbs.length > 0) {
      schemas.push(generateBreadcrumbSchema(breadcrumbs))
    }

    return <SchemaInjector schemas={schemas} />
  } catch (error) {
    console.error('Error rendering schemas:', error)
    // Graceful fallback - just return null if there's an error
    // Schemas are not critical to page rendering
    return null
  }
}
