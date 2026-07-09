import { BASE_URL } from '@/lib/seo/sitemap-builders'

/** Public key file: https://imtehan.com/imtehan-indexnow-key.txt */
export const INDEXNOW_KEY = 'imtehan-indexnow-key'

export async function pingIndexNow(urls: string[]): Promise<void> {
  if (urls.length === 0) return

  const batches: string[][] = []
  for (let i = 0; i < urls.length; i += 10_000) {
    batches.push(urls.slice(i, i + 10_000))
  }

  for (const urlList of batches) {
    try {
      await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: 'imtehan.com',
          key: INDEXNOW_KEY,
          keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
          urlList,
        }),
      })
    } catch {
      // Non-fatal — Bing/Yandex discovery aid only
    }
  }
}

/** Legacy Google sitemap ping — weak signal but harmless on deploy. */
export async function pingGoogleSitemap(): Promise<void> {
  const sitemaps = [`${BASE_URL}/sitemap.xml`, `${BASE_URL}/sitemap-index`]
  for (const sitemap of sitemaps) {
    try {
      await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemap)}`, {
        method: 'GET',
      })
    } catch {
      // Google deprecated bulk ping; GSC sitemap submit is the real path
    }
  }
}
