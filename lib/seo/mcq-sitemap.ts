import { createServerSupabaseClient } from '@/lib/supabase/server'
import { MCQ_INDEXABLE_BANKS } from '@/lib/seo/topic-indexing'
import { BASE_URL, EXAM_SITEMAP_LASTMOD } from '@/lib/seo/sitemap-builders'
import type { MetadataRoute } from 'next'

/** Google sitemap limit is 50k URLs per file — stay under with margin. */
export const MCQ_URLS_PER_SITEMAP = 40_000

export type McqSitemapPart = { bank: string; page: number }

export async function countMcqsInBank(bank: string): Promise<number> {
  try {
    const supabase = await createServerSupabaseClient()
    const { count, error } = await supabase
      .from(bank)
      .select('id', { count: 'exact', head: true })
    if (error) return 0
    return count ?? 0
  } catch {
    return 0
  }
}

export async function listMcqSitemapParts(): Promise<McqSitemapPart[]> {
  const parts: McqSitemapPart[] = []
  for (const bank of MCQ_INDEXABLE_BANKS) {
    const count = await countMcqsInBank(bank)
    if (count === 0) continue
    const pages = Math.ceil(count / MCQ_URLS_PER_SITEMAP)
    for (let page = 1; page <= pages; page++) {
      parts.push({ bank, page })
    }
  }
  return parts
}

export async function buildMcqSitemapPage(
  bank: string,
  page: number,
): Promise<MetadataRoute.Sitemap> {
  if (!MCQ_INDEXABLE_BANKS.has(bank) || page < 1) return []

  const offset = (page - 1) * MCQ_URLS_PER_SITEMAP
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from(bank)
    .select('id')
    .order('id', { ascending: true })
    .range(offset, offset + MCQ_URLS_PER_SITEMAP - 1)

  if (error || !data) return []

  const lm = EXAM_SITEMAP_LASTMOD
  return data.map((row) => ({
    url: `${BASE_URL}/mcq/${bank}/${row.id}`,
    lastModified: lm,
    changeFrequency: 'monthly' as const,
    priority: 0.55,
  }))
}

export function mcqSitemapLoc(bank: string, page: number): string {
  return `${BASE_URL}/sitemap/mcq/${bank}/${page}.xml`
}
