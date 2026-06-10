/**
 * Meta Pixel helpers: call only after client mount (fbq loaded by MetaPixel script).
 * Pairs with POST /api/analytics/meta-capi using the same event_id for deduplication.
 * @see https://developers.facebook.com/docs/meta-pixel/reference
 */

import { PREMIUM_SUBSCRIBE_VALUE_PKR } from '@/lib/premium-plans'
import { createClient } from '@/lib/supabase/client'

declare global {
  interface Window {
    /** Meta Pixel: init, track, trackCustom */
    fbq?: (...args: unknown[]) => void
  }
}

export function metaPixelAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function'
}

/** Meta Test Events tab only receives hits when this code is passed into fbq(); URL alone is not enough. */
export function getMetaTestEventCodeFromUrl(): string | undefined {
  if (typeof window === 'undefined') return undefined
  const p = new URLSearchParams(window.location.search)
  const tc = (p.get('test_event_code') || p.get('fb_test_event_code') || '').trim()
  if (!/^[A-Za-z0-9_-]+$/.test(tc)) return undefined
  return tc
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const parts = `; ${document.cookie}`.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return undefined
}

async function syncMetaCapiEvent(payload: {
  event_name: string
  event_id: string
  value?: number
  currency?: string
}): Promise<void> {
  try {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`
    }
    await fetch('/api/analytics/meta-capi', {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({
        ...payload,
        event_source_url: typeof window !== 'undefined' ? window.location.href : undefined,
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc'),
      }),
    })
  } catch {
    /* ignore */
  }
}

/** SPA route changes: fire after navigation without full reload */
export function trackMetaPageView(params?: Record<string, unknown>): void {
  if (!metaPixelAvailable()) return
  const test = getMetaTestEventCodeFromUrl()
  const payload = params ?? {}
  if (test) {
    window.fbq!('track', 'PageView', payload, { test_event_code: test })
  } else {
    window.fbq!('track', 'PageView', payload)
  }
}

export function trackCompleteRegistration(): void {
  if (!metaPixelAvailable()) return
  const eventId = crypto.randomUUID()
  window.fbq!('track', 'CompleteRegistration', {}, { eventID: eventId })
  void syncMetaCapiEvent({ event_name: 'CompleteRegistration', event_id: eventId })
}

/** Premium / subscription activated: includes PKR value for ROAS (default = 12-month tier). */
export function trackSubscribe(params?: { value?: number; currency?: string }): void {
  if (!metaPixelAvailable()) return
  const eventId = crypto.randomUUID()
  const value = params?.value ?? PREMIUM_SUBSCRIBE_VALUE_PKR
  const currency = params?.currency ?? 'PKR'
  window.fbq!('track', 'Subscribe', { currency, value }, { eventID: eventId })
  void syncMetaCapiEvent({ event_name: 'Subscribe', event_id: eventId, value, currency })
}

/** Custom: free tier active; same event_id sent to CAPI */
export function trackStartTrial(): void {
  if (!metaPixelAvailable()) return
  const eventId = crypto.randomUUID()
  window.fbq!('trackCustom', 'StartTrial', {}, { eventID: eventId })
  void syncMetaCapiEvent({ event_name: 'StartTrial', event_id: eventId })
}
