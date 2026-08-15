import { NextRequest, NextResponse } from 'next/server'
import { csrfProtection } from '@/lib/security/csrf'
import { rateLimit, getClientIP } from '@/lib/security/rateLimiter'
import {
  extractHandwritingFromImage,
  sanitizeOcrError,
  validateOcrImage,
} from '@/lib/ai/extractHandwriting'

/** One downscaled JPEG is typically 200KB-1.2MB. Cap the JSON body. */
const MAX_BODY_BYTES = 6 * 1024 * 1024

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    const burst = rateLimit(`essay-ocr:${ip}`, { maxRequests: 8, windowMs: 60_000 })
    if (!burst.success) {
      return NextResponse.json(
        { error: 'Too many scans. Wait a moment and try again.' },
        { status: 429 }
      )
    }
    const hourly = rateLimit(`essay-ocr-hour:${ip}`, { maxRequests: 40, windowMs: 60 * 60 * 1000 })
    if (!hourly.success) {
      return NextResponse.json(
        { error: 'Scan limit reached for now. Type the text or try again later.' },
        { status: 429 }
      )
    }

    const csrfError = csrfProtection(request)
    if (csrfError) return csrfError

    const len = request.headers.get('content-length')
    if (len && Number.parseInt(len, 10) > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Image too large. Photograph one page at a time.' }, { status: 413 })
    }

    let body: Record<string, unknown>
    try {
      const raw = await request.text()
      if (raw.length > MAX_BODY_BYTES) {
        return NextResponse.json({ error: 'Image too large. Photograph one page at a time.' }, { status: 413 })
      }
      body = JSON.parse(raw) as Record<string, unknown>
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const validated = validateOcrImage(body.image, body.mimeType)
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 })
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 70_000)

    try {
      const { text, provider } = await extractHandwritingFromImage(
        validated.image,
        validated.mime,
        controller.signal
      )
      clearTimeout(timeoutId)

      if (!text.trim()) {
        return NextResponse.json(
          {
            error:
              'Could not read any text. Make sure the page is well-lit, in focus, and filling the frame.',
          },
          { status: 422 }
        )
      }

      const isDev = process.env.NODE_ENV === 'development'
      return NextResponse.json({
        text,
        ...(isDev ? { debugProvider: provider } : {}),
      })
    } catch (err: unknown) {
      clearTimeout(timeoutId)
      const isTimeout =
        err instanceof Error &&
        (err.name === 'AbortError' || err.message.toLowerCase().includes('timeout'))
      console.error('[essay-ocr]', sanitizeOcrError(err))
      return NextResponse.json(
        {
          error: isTimeout
            ? 'Reading the page timed out. Try a closer, sharper photo.'
            : 'Could not read this image. Try a clearer photo of one page.',
        },
        { status: 502 }
      )
    }
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
export const maxDuration = 90
