import { EXAM_SITEMAP_LASTMOD, BASE_URL } from '@/lib/seo/sitemap-builders'
import { listMcqSitemapParts, mcqSitemapLoc, type McqSitemapPart } from '@/lib/seo/mcq-sitemap'
import { MCQ_INDEXABLE_BANKS } from '@/lib/seo/topic-indexing'
import { softMode } from '@/lib/supabase-soft'

const STATIC_SEGMENTS = ['core', 'exams', 'modes', 'sets', 'topics'] as const

function staticMcqParts(): McqSitemapPart[] {
  return [...MCQ_INDEXABLE_BANKS].map((bank) => ({ bank, page: 1 }))
}

/** Full sitemap index XML — static segments + dynamic MCQ bank parts. */
export async function buildSitemapIndexXml(): Promise<string> {
  let mcqParts: McqSitemapPart[] = []
  // Soft mode / build-time: never wait on Supabase bank counts.
  if (!softMode()) {
    try {
      mcqParts = await listMcqSitemapParts()
    } catch {
      mcqParts = []
    }
  }
  if (mcqParts.length === 0) {
    mcqParts = staticMcqParts()
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
