/**
 * Meta Conversions API (server-only): send events for deduplication with browser pixel.
 * @see https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api
 */

import { createHash } from 'crypto'

const GRAPH_VERSION = 'v21.0'

function sha256Hex(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase(), 'utf8').digest('hex')
}

export type MetaCapiUserData = {
  email?: string | null
  client_ip_address?: string | null
  client_user_agent?: string | null
  fbp?: string | null
  fbc?: string | null
}

export type MetaCapiPayload = {
  event_name: string
  event_id: string
  event_time: number
  event_source_url?: string
  custom_data?: { currency?: string; value?: number }
  user_data: MetaCapiUserData
}

export async function sendMetaCapiEvents(payloads: MetaCapiPayload[]): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? process.env.META_PIXEL_ID
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN

  if (!pixelId || !accessToken || payloads.length === 0) {
    return { ok: true, skipped: true }
  }

  const data = payloads.map((p) => {
    const ud: Record<string, unknown> = {}
    if (p.user_data.email) {
      ud.em = [sha256Hex(p.user_data.email)]
    }
    if (p.user_data.client_ip_address) ud.client_ip_address = p.user_data.client_ip_address
    if (p.user_data.client_user_agent) ud.client_user_agent = p.user_data.client_user_agent
    if (p.user_data.fbp) ud.fbp = p.user_data.fbp
    if (p.user_data.fbc) ud.fbc = p.user_data.fbc

    const row: Record<string, unknown> = {
      event_name: p.event_name,
      event_time: p.event_time,
      event_id: p.event_id,
      action_source: 'website',
      user_data: ud,
    }
    if (p.event_source_url) row.event_source_url = p.event_source_url
    if (p.custom_data && Object.keys(p.custom_data).length > 0) row.custom_data = p.custom_data
    return row
  })

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  })

  if (!res.ok) {
    const text = await res.text()
    return { ok: false, error: text.slice(0, 500) }
  }

  return { ok: true }
}
