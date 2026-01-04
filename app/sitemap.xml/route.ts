import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  // Read the static sitemap.xml from public folder
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml')
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8')

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  })
}
