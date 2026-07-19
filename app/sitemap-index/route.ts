import { buildSitemapIndexXml } from '@/lib/seo/build-sitemap-index'
import { SITEMAP_XML_HEADERS } from '@/lib/seo/sitemap-xml'

export const revalidate = 604800
export const maxDuration = 60

export async function GET() {
  const body = await buildSitemapIndexXml()
  return new Response(body, { headers: SITEMAP_XML_HEADERS })
}
