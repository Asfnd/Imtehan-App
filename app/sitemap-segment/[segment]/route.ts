import { buildSitemapSegment, type SitemapSegment } from '@/lib/seo/sitemap-builders'
import { SITEMAP_XML_HEADERS, serializeSitemap } from '@/lib/seo/sitemap-xml'

const SEGMENTS = new Set<SitemapSegment>(['core', 'exams', 'modes', 'sets', 'topics', 'notes'])

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ segment: string }> },
) {
  const { segment } = await params
  if (!SEGMENTS.has(segment as SitemapSegment)) {
    return new Response('Not found', { status: 404 })
  }

  const body = serializeSitemap(buildSitemapSegment(segment as SitemapSegment))
  return new Response(body, { headers: SITEMAP_XML_HEADERS })
}
