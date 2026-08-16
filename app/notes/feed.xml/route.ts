import { SITEMAP_XML_HEADERS } from '@/lib/seo/sitemap-xml'
import {
  NOTES_BASE,
  NOTES_SITEMAP_LASTMOD,
  kitDateIso,
  notesPath,
  primaryNotesLocation,
} from '@/lib/seo/notes-seo'
import { listRegisteredTopics, resolveTopicKit } from '@/lib/notes/topic-registry'

export const revalidate = 86400

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function GET() {
  const items = listRegisteredTopics()
    .map((meta) => {
      const resolved = resolveTopicKit(meta.slug)
      if (!resolved) return null
      const loc = primaryNotesLocation(meta)
      const href = `${NOTES_BASE}${notesPath([loc.examSlug, loc.subjectSlug, loc.topicSlug])}`
      return `    <item>
      <title>${xmlEscape(resolved.kit.title)}</title>
      <link>${href}</link>
      <guid>${href}</guid>
      <pubDate>${new Date(kitDateIso(resolved.kit.updated)).toUTCString()}</pubDate>
      <description>${xmlEscape(resolved.kit.subtitle)}</description>
    </item>`
    })
    .filter(Boolean)
    .join('\n')

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Imtehan Exam Notes</title>
    <link>${NOTES_BASE}/notes</link>
    <description>Syllabus-mapped revision kits for CSS, PMS, PPSC, FPSC and NTS.</description>
    <language>en-PK</language>
    <lastBuildDate>${new Date(NOTES_SITEMAP_LASTMOD).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(body, {
    headers: {
      ...SITEMAP_XML_HEADERS,
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
