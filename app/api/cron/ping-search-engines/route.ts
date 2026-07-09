import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { buildAllIndexableUrls } from '@/lib/seo/sitemap-builders'
import { pingGoogleSitemap, pingIndexNow } from '@/lib/seo/indexnow'

const SNAPSHOT = path.join(process.cwd(), '.sitemap-url-snapshot.json')

const PRIORITY_URLS = [
  'https://imtehan.com/',
  'https://imtehan.com/exams',
  'https://imtehan.com/sitemap.xml',
  'https://imtehan.com/exams/category/ppsc',
  'https://imtehan.com/exams/category/fpsc',
  'https://imtehan.com/exams/category/fia',
]

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const header = request.headers.get('authorization')
  return header === `Bearer ${secret}`
}

/** Weekly: ping IndexNow with new static URLs + Google sitemap (includes MCQ child sitemaps). */
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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
  const toPing = added.length > 0 ? [...PRIORITY_URLS, ...added.slice(0, 10_000)] : PRIORITY_URLS

  await pingIndexNow(toPing)
  await pingGoogleSitemap()
  fs.writeFileSync(SNAPSHOT, JSON.stringify([...current], null, 0))

  return NextResponse.json({
    ok: true,
    indexable: current.size,
    pinged: toPing.length,
    added: added.length,
  })
}

export const dynamic = 'force-dynamic'
export const maxDuration = 60
