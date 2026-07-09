import type { MetadataRoute } from 'next'

export function serializeSitemap(entries: MetadataRoute.Sitemap): string {
  const urls = entries
    .map((entry) => {
      const lastmod =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString().slice(0, 10)
          : entry.lastModified
      return `  <url>
    <loc>${entry.url}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}${entry.changeFrequency ? `\n    <changefreq>${entry.changeFrequency}</changefreq>` : ''}${entry.priority != null ? `\n    <priority>${entry.priority}</priority>` : ''}
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

export const SITEMAP_XML_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  // Short TTL — index includes dynamic MCQ bank counts from Supabase
  'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
  'CDN-Cache-Control': 'max-age=300',
} as const
