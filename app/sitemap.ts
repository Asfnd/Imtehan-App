import type { MetadataRoute } from 'next'
import { buildSitemapSegment, type SitemapSegment } from '@/lib/seo/sitemap-builders'

const SEGMENTS: SitemapSegment[] = ['core', 'exams', 'modes']

/** Segmented sitemap index: /sitemap.xml → /sitemap/core.xml, exams.xml, modes.xml */
export async function generateSitemaps() {
  return SEGMENTS.map((id) => ({ id }))
}

export default async function sitemap(props: {
  id: Promise<SitemapSegment>
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id
  return buildSitemapSegment(id)
}
