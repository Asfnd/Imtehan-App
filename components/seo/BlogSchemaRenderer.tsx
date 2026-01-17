/**
 * Blog Schema Renderer (Server Component)
 * Generates BlogPosting schemas for blog collection and breadcrumbs
 */

import { SchemaInjector } from './SchemaInjector'
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  SchemaMarkup
} from '@/lib/seo/schemaGenerator'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  readTime: string
  category: string
}

interface BlogSchemaRendererProps {
  blogPosts?: BlogPost[]
  pageType?: 'blog-list' | 'blog-post'
}

export async function BlogSchemaRenderer({
  blogPosts = [],
  pageType = 'blog-list',
}: BlogSchemaRendererProps) {
  try {
    const schemas: SchemaMarkup[] = []

    // Add breadcrumb schema for blog pages
    schemas.push(generateBreadcrumbSchema([
      { name: 'Home', url: 'https://imtehan.com' },
      { name: 'Blog', url: 'https://imtehan.com/blog' },
    ]))

    // Generate BlogPosting schemas for each blog post
    if (blogPosts && blogPosts.length > 0) {
      blogPosts.forEach((post) => {
        try {
          const schema = generateBlogPostingSchema({
            title: post.title,
            description: post.excerpt,
            slug: post.slug,
            date: post.date,
            author: post.author,
            readTime: post.readTime,
            category: post.category,
          })
          schemas.push(schema)
        } catch (err) {
          console.error(`Error generating schema for blog post ${post.slug}:`, err)
        }
      })
    }

    return <SchemaInjector schemas={schemas} />
  } catch (error) {
    console.error('Error rendering blog schemas:', error)
    return null
  }
}
