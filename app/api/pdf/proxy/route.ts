import { NextRequest, NextResponse } from 'next/server'

/**
 * PDF Proxy - Fetch PDFs from R2 and allow iframe embedding
 */

const ALLOWED_DOMAINS = [
  'https://www.imtehan.com/',
  'https://67225b43c28cc0f6b36a9d5c5ad11b31.r2.cloudflarestorage.com/',
  'https://pub-67225b43c28cc0f6b36a9d5c5ad11b31.r2.dev/',
]

function extractPath(url: string): string | null {
  for (const domain of ALLOWED_DOMAINS) {
    if (url.startsWith(domain)) return url.substring(domain.length)
  }
  return null
}

function getFallbackUrls(originalUrl: string): string[] {
  const path = extractPath(originalUrl)
  if (!path) return [originalUrl]
  return ALLOWED_DOMAINS.map(domain => `${domain}${path}`)
}

async function fetchPDFWithFallback(primaryUrl: string): Promise<Response> {
  const urls = getFallbackUrls(primaryUrl)

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'Imtehan PDF Proxy', 'Accept': 'application/pdf' },
        signal: AbortSignal.timeout(15000),
      })
      if (response.ok) return response
    } catch (error) {
      // Try next URL
      continue
    }
  }

  throw new Error('Failed to fetch PDF from all available sources')
}

export async function GET(request: NextRequest) {
  try {
    const pdfUrl = request.nextUrl.searchParams.get('url')

    if (!pdfUrl) {
      return NextResponse.json({ error: 'Missing PDF URL' }, { status: 400 })
    }

    if (!ALLOWED_DOMAINS.some(domain => pdfUrl.startsWith(domain))) {
      return NextResponse.json({ error: 'Invalid PDF source' }, { status: 403 })
    }

    const fetchResponse = await fetchPDFWithFallback(pdfUrl)
    const arrayBuffer = await fetchResponse.arrayBuffer()

    const response = new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="paper.pdf"',
        'Cache-Control': 'public, max-age=31536000, immutable', // 1 year
        'Access-Control-Allow-Origin': '*',
      },
    })

    // Remove X-Frame-Options to allow iframe embedding
    response.headers.delete('X-Frame-Options')

    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch PDF', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
  })
}
