import { EXAM_SITEMAP_LASTMOD, BASE_URL } from '@/lib/seo/sitemap-builders'
import { listMcqSitemapParts, mcqSitemapLoc } from '@/lib/seo/mcq-sitemap'

const STATIC_SEGMENTS = ['core', 'exams', 'modes', 'sets', 'topics'] as const

/** Full sitemap index XML — static segments + dynamic MCQ bank parts. */
export async function buildSitemapIndexXml(): Promise<string> {
  let mcqParts: Awaited<ReturnType<typeof listMcqSitemapParts>> = []
  try {
    mcqParts = await listMcqSitemapParts()
  } catch {
    mcqParts = []
  }

  const staticEntries = STATIC_SEGMENTS.map(
    (id) => `  <sitemap>
    <loc>${BASE_URL}/sitemap/${id}.xml</loc>
    <lastmod>${EXAM_SITEMAP_LASTMOD}</lastmod>
  </sitemap>`,
  )

  const mcqEntries = mcqParts.map(
    ({ bank, page }) => `  <sitemap>
    <loc>${mcqSitemapLoc(bank, page)}</loc>
    <lastmod>${EXAM_SITEMAP_LASTMOD}</lastmod>
  </sitemap>`,
  )

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...mcqEntries].join('\n')}
</sitemapindex>`
}
