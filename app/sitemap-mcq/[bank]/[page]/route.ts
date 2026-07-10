import { buildMcqSitemapPage } from '@/lib/seo/mcq-sitemap'
import { MCQ_INDEXABLE_BANKS } from '@/lib/seo/topic-indexing'
import { SITEMAP_XML_HEADERS, serializeSitemap } from '@/lib/seo/sitemap-xml'

export const revalidate = 86400

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ bank: string; page: string }> },
) {
  const { bank, page: pageStr } = await params
  const page = parseInt(pageStr, 10)

  if (!MCQ_INDEXABLE_BANKS.has(bank) || !Number.isFinite(page) || page < 1) {
    return new Response('Not found', { status: 404 })
  }

  const entries = await buildMcqSitemapPage(bank, page)
  if (entries.length === 0) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(serializeSitemap(entries), { headers: SITEMAP_XML_HEADERS })
}
