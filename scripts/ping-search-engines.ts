#!/usr/bin/env npx tsx
/**
 * Post-deploy: ping IndexNow (Bing/Yandex) with changed URLs and Google sitemap.
 * Usage: npx tsx scripts/ping-search-engines.ts
 */
import fs from 'fs'
import path from 'path'
import { buildAllIndexableUrls } from '../lib/seo/sitemap-builders'
import { pingGoogleSitemap, pingIndexNow } from '../lib/seo/indexnow'

const SNAPSHOT = path.join(process.cwd(), '.sitemap-url-snapshot.json')

const PRIORITY_URLS = [
  'https://imtehan.com/',
  'https://imtehan.com/exams',
  'https://imtehan.com/exams/category/ppsc',
  'https://imtehan.com/exams/category/fpsc',
  'https://imtehan.com/exams/category/fia',
  'https://imtehan.com/exams/css-mpt',
  'https://imtehan.com/exams/ppsc-assistant',
  'https://imtehan.com/mpt-practice',
  'https://imtehan.com/css/past-papers',
  'https://imtehan.com/notes',
  'https://imtehan.com/notes/css-written',
  'https://imtehan.com/notes/css-mpt',
  'https://imtehan.com/sitemap.xml',
]

async function main() {
  const forcePriority = process.argv.includes('--priority')
  const flushBatches = process.argv.includes('--flush')
  const current = new Set(buildAllIndexableUrls())
  let previous = new Set<string>()

  if (fs.existsSync(SNAPSHOT)) {
    try {
      previous = new Set(JSON.parse(fs.readFileSync(SNAPSHOT, 'utf8')) as string[])
    } catch {
      previous = new Set()
    }
  }

  const added = [...current].filter((u) => !previous.has(u))
  const isFirstRun = previous.size === 0

  console.log(`Indexable URLs: ${current.size} (added since last run: ${added.length})`)

  // First deploy or major expansion: ping representative URLs + sitemap
  const toPing = forcePriority
    ? PRIORITY_URLS
    : flushBatches
      ? [...current]
      : isFirstRun
        ? [...PRIORITY_URLS, ...added.slice(0, 100)]
        : added.slice(0, 10_000)

  if (toPing.length > 0) {
    console.log(`Pinging IndexNow with ${toPing.length} URLs...`)
    await pingIndexNow(toPing)
  }

  console.log('Pinging Google sitemap...')
  await pingGoogleSitemap()

  fs.writeFileSync(SNAPSHOT, JSON.stringify([...current], null, 0))
  console.log('Done. Submit https://imtehan.com/sitemap.xml in Google Search Console if not already.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
