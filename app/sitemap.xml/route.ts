import { buildSitemapIndexXml } from '@/lib/seo/build-sitemap-index'
import { SITEMAP_XML_HEADERS } from '@/lib/seo/sitemap-xml'

export const dynamic = 'force-dynamic'

/** Canonical sitemap index (robots.txt + GSC) — must include MCQ child sitemaps. */
export async function GET() {
  const body = await buildSitemapIndexXml()
  return new Response(body, { headers: SITEMAP_XML_HEADERS })
}
