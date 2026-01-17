/**
 * SEO Schema Injector
 * Injects JSON-LD schemas into page head
 * Invisible to users - only for Google & search engines
 */

import { SchemaMarkup, schemaToJSON } from '@/lib/seo/schemaGenerator'

interface SchemaInjectorProps {
  schemas: SchemaMarkup[]
}

/**
 * Server component - injects schemas into document head
 * Usage: Place at top level of any page
 */
export function SchemaInjector({ schemas }: SchemaInjectorProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: schemaToJSON(schema),
          }}
        />
      ))}
    </>
  )
}

/**
 * Usage example in a page:
 *
 * import { SchemaInjector } from '@/components/seo/SchemaInjector'
 * import { generateBlogPostingSchema, generateBreadcrumbSchema } from '@/lib/seo/schemaGenerator'
 *
 * export default function BlogPage() {
 *   const schemas = [
 *     generateBlogPostingSchema({
 *       title: 'CSS Essay Writing',
 *       description: 'Learn to write perfect CSS essays',
 *       slug: 'css-essay',
 *       date: '2026-01-03',
 *       author: 'Imtehan Team',
 *       readTime: '12 min',
 *       category: 'Writing',
 *     }),
 *     generateBreadcrumbSchema([
 *       { name: 'Home', url: 'https://imtehan.com' },
 *       { name: 'Blog', url: 'https://imtehan.com/blog' },
 *       { name: 'CSS Essay', url: 'https://imtehan.com/blog/css-essay' },
 *     ]),
 *   ]
 *
 *   return (
 *     <>
 *       <SchemaInjector schemas={schemas} />
 *       Page content goes here
 *     </>
 *   )
 * }
 */
