import { NextResponse } from 'next/server'
import { getAuthenticatedUserForRoute } from '@/lib/security/request-verification'
import { sendMetaCapiEvents } from '@/lib/analytics/metaCapiServer'
import { PREMIUM_SUBSCRIBE_VALUE_PKR } from '@/lib/premium-plans'

const ALLOWED_EVENTS = new Set(['CompleteRegistration', 'Subscribe', 'StartTrial'])

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

/**
 * POST body from client — must match browser fbq `eventID` for deduplication.
 */
export async function POST(request: Request) {
  const user = await getAuthenticatedUserForRoute(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const b = body as Record<string, unknown>
  const event_name = typeof b.event_name === 'string' ? b.event_name : ''
  const event_id = typeof b.event_id === 'string' ? b.event_id : ''

  if (!ALLOWED_EVENTS.has(event_name) || !UUID_RE.test(event_id)) {
    return NextResponse.json({ error: 'Invalid event' }, { status: 400 })
  }

  const rawValue = b.value
  const value =
    typeof rawValue === 'number' && Number.isFinite(rawValue) && rawValue > 0 ? rawValue : undefined
  const currency = typeof b.currency === 'string' && b.currency.length <= 8 ? b.currency : 'PKR'
  const event_source_url = typeof b.event_source_url === 'string' ? b.event_source_url.slice(0, 2048) : undefined
  const fbp = typeof b.fbp === 'string' ? b.fbp.slice(0, 256) : undefined
  const fbc = typeof b.fbc === 'string' ? b.fbc.slice(0, 256) : undefined

  const forwarded = request.headers.get('x-forwarded-for')
  const client_ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || undefined
  const client_user_agent = request.headers.get('user-agent') || undefined

  const event_time = Math.floor(Date.now() / 1000)

  let custom_data: { currency: string; value: number } | undefined
  if (event_name === 'Subscribe') {
    custom_data = {
      currency,
      value: value ?? PREMIUM_SUBSCRIBE_VALUE_PKR,
    }
  }

  const result = await sendMetaCapiEvents([
    {
      event_name,
      event_id,
      event_time,
      event_source_url,
      custom_data,
      user_data: {
        email: user.email,
        client_ip_address: client_ip ?? null,
        client_user_agent: client_user_agent ?? null,
        fbp,
        fbc,
      },
    },
  ])

  if (!result.ok && !result.skipped) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[meta-capi]', result.error)
    }
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true, skipped: result.skipped ?? false })
}
