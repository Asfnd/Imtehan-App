/**
 * Meta Pixel helpers — call only after client mount (fbq loaded by MetaPixel script).
 * Pairs with POST /api/analytics/meta-capi using the same event_id for deduplication.
 * @see https://developers.facebook.com/docs/meta-pixel/reference
 */

import { PREMIUM_SUBSCRIBE_VALUE_PKR } from '@/lib/premium-plans'

declare global {
  interface Window {
    /** Meta Pixel — init, track, trackCustom */
    fbq?: (...args: unknown[]) => void
  }
}

export function metaPixelAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function'
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
    await fetch('/api/analytics/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

/** SPA route changes — fire after navigation without full reload */
export function trackMetaPageView(params?: Record<string, unknown>): void {
  if (!metaPixelAvailable()) return
  window.fbq!('track', 'PageView', params ?? {})
}

export function trackCompleteRegistration(): void {
  if (!metaPixelAvailable()) return
  const eventId = crypto.randomUUID()
  window.fbq!('track', 'CompleteRegistration', {}, { eventID: eventId })
  void syncMetaCapiEvent({ event_name: 'CompleteRegistration', event_id: eventId })
}

/** Premium / subscription activated — includes PKR value for ROAS (default = 12-month tier). */
export function trackSubscribe(params?: { value?: number; currency?: string }): void {
  if (!metaPixelAvailable()) return
  const eventId = crypto.randomUUID()
  const value = params?.value ?? PREMIUM_SUBSCRIBE_VALUE_PKR
  const currency = params?.currency ?? 'PKR'
  window.fbq!('track', 'Subscribe', { currency, value }, { eventID: eventId })
  void syncMetaCapiEvent({ event_name: 'Subscribe', event_id: eventId, value, currency })
}

/** Custom — free tier active; same event_id sent to CAPI */
export function trackStartTrial(): void {
  if (!metaPixelAvailable()) return
  const eventId = crypto.randomUUID()
  window.fbq!('trackCustom', 'StartTrial', {}, { eventID: eventId })
  void syncMetaCapiEvent({ event_name: 'StartTrial', event_id: eventId })
}
