/**
 * Sanity-check notes SEO: sitemap coverage, one canonical per kit, primary hosts.
 * Run: npx tsx scripts/verify-notes-seo.ts
 */
import {
  buildNotesSitemap,
  NOTES_BASE,
  NOTES_INDEX_EXAMS,
  listPrimaryKitStaticParams,
  primaryNotesLocation,
  primaryNotesPathForSlug,
} from '../lib/seo/notes-seo'
import { listRegisteredTopics, resolveTopicKit } from '../lib/notes/topic-registry'

function assert(cond: unknown, message: string) {
  if (!cond) {
    console.error('FAIL', message)
    process.exitCode = 1
  } else {
    console.log('ok ', message)
  }
}

const sitemap = buildNotesSitemap()
const urls = sitemap.map((e) => e.url)

assert(urls.includes(`${NOTES_BASE}/notes`), 'hub is in sitemap')
assert(urls.includes(`${NOTES_BASE}/notes/css-written`), 'css-written hub is in sitemap')
assert(urls.includes(`${NOTES_BASE}/notes/css-mpt`), 'css-mpt hub is in sitemap')

const kitUrls = urls.filter((u) => u.split('/').length >= 7)
const topics = listRegisteredTopics()
assert(kitUrls.length === topics.length, `one sitemap URL per kit (${kitUrls.length} vs ${topics.length})`)
assert(new Set(kitUrls).size === kitUrls.length, 'kit sitemap URLs are unique')

const staticParams = listPrimaryKitStaticParams()
assert(staticParams.length === topics.length, `SSG only primary kits (${staticParams.length} vs ${topics.length})`)

const constitution = primaryNotesPathForSlug('constitution-1973')
assert(
  constitution === '/notes/css-written/pakistan-affairs/constitution-1973',
  `constitution primary is CSS Written (got ${constitution})`,
)

const pillars = primaryNotesPathForSlug('pillars-of-islam')
assert(
  pillars === '/notes/css-written/islamic-studies/pillars-of-islam',
  `pillars primary is CSS Written (got ${pillars})`,
)

let missingPrimary = 0
for (const meta of topics) {
  const resolved = resolveTopicKit(meta.slug)
  if (!resolved) {
    missingPrimary += 1
    continue
  }
  const loc = primaryNotesLocation(meta)
  if (!(NOTES_INDEX_EXAMS as readonly string[]).includes(loc.examSlug)) missingPrimary += 1
}
assert(missingPrimary === 0, 'every kit has a primary on an index exam')

assert(
  !urls.some((u) => u.includes('/notes/') && u.split('/').length >= 7 && !kitUrls.includes(u)),
  'no stray deep notes URLs',
)

console.log(`\nNotes sitemap: ${urls.length} URLs (${kitUrls.length} kits)`)
if (process.exitCode) {
  console.error('\nNotes SEO verification failed.')
  process.exit(1)
}
console.log('Notes SEO verification passed.')
