/**
 * Server-side free demo tracking.
 * Guests + signed-in free users share ONE interactive practice across Imtehan.
 * Premium unlimited. Set/mock 2+ always needs premium (after sign-in).
 */

import { cookies } from 'next/headers'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import type { NextResponse } from 'next/server'

export const GUEST_DEMO_COOKIE = 'imtehan_gid'
export const DEMO_PRACTICE_LIMIT = 1

export type PracticeDenyCode = 'REQUIRE_SIGN_IN' | 'PREMIUM_REQUIRED' | 'DEMO_USED'

export type PracticeAccessDecision =
  | { allow: true; consumeDemo: boolean; consumeAs: 'guest' | 'user' }
  | { allow: false; code: PracticeDenyCode }

function newGuestToken(): string {
  return crypto.randomUUID()
}

export async function getOrCreateGuestToken(): Promise<{ token: string; setCookie: boolean }> {
  const jar = await cookies()
  const existing = jar.get(GUEST_DEMO_COOKIE)?.value?.trim()
  if (existing && existing.length >= 16 && existing.length <= 80) {
    return { token: existing, setCookie: false }
  }
  return { token: newGuestToken(), setCookie: true }
}

export function attachGuestCookie(res: NextResponse, token: string): void {
  res.cookies.set(GUEST_DEMO_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 400,
  })
}

async function getCountByGuest(guestToken: string): Promise<number> {
  const admin = createAdminSupabaseClient()
  const { data } = await admin
    .from('demo_practice_usage')
    .select('practice_count')
    .eq('guest_token', guestToken)
    .maybeSingle()
  return data?.practice_count ?? 0
}

async function getCountByUser(userId: string): Promise<number> {
  const admin = createAdminSupabaseClient()
  const { data } = await admin
    .from('demo_practice_usage')
    .select('practice_count')
    .eq('user_id', userId)
    .maybeSingle()
  return data?.practice_count ?? 0
}

/** Combined demo usage for this browser + account (prevents double-dip after sign-in). */
export async function getCombinedDemoCount(guestToken: string, userId?: string | null): Promise<number> {
  const guest = await getCountByGuest(guestToken)
  if (!userId) return guest
  const user = await getCountByUser(userId)
  return Math.max(guest, user)
}

export async function decidePracticeAccess(opts: {
  isSignedIn: boolean
  isPremium: boolean
  guestToken: string
  userId?: string | null
  setOrMockNumber: number
}): Promise<PracticeAccessDecision> {
  const { isSignedIn, isPremium, guestToken, userId, setOrMockNumber } = opts

  if (isPremium) return { allow: true, consumeDemo: false, consumeAs: 'guest' }

  // Set/mock 2+: guest → sign-in, signed-in free → premium
  if (setOrMockNumber >= 2) {
    if (!isSignedIn) return { allow: false, code: 'REQUIRE_SIGN_IN' }
    return { allow: false, code: 'PREMIUM_REQUIRED' }
  }

  // Set/mock 1: one free demo for guest OR signed-in free (shared counter)
  const used = await getCombinedDemoCount(guestToken, userId)
  if (used >= DEMO_PRACTICE_LIMIT) {
    if (!isSignedIn) return { allow: false, code: 'DEMO_USED' }
    return { allow: false, code: 'PREMIUM_REQUIRED' }
  }

  return {
    allow: true,
    consumeDemo: true,
    consumeAs: isSignedIn && userId ? 'user' : 'guest',
  }
}

export async function decideCreditPracticeAccess(opts: {
  isSignedIn: boolean
  isPremium: boolean
  guestToken: string
  userId?: string | null
}): Promise<PracticeAccessDecision> {
  return decidePracticeAccess({
    ...opts,
    setOrMockNumber: 1,
  })
}

export async function consumeDemo(opts: {
  guestToken: string
  userId?: string | null
  consumeAs: 'guest' | 'user'
  kind: string
}): Promise<void> {
  const admin = createAdminSupabaseClient()
  const now = new Date().toISOString()

  if (opts.consumeAs === 'user' && opts.userId) {
    const { data: existing } = await admin
      .from('demo_practice_usage')
      .select('id, practice_count')
      .eq('user_id', opts.userId)
      .maybeSingle()

    if (existing?.id) {
      await admin
        .from('demo_practice_usage')
        .update({
          practice_count: (existing.practice_count ?? 0) + 1,
          last_kind: opts.kind,
          last_practice_at: now,
          updated_at: now,
        })
        .eq('id', existing.id)
      return
    }

    await admin.from('demo_practice_usage').insert({
      user_id: opts.userId,
      practice_count: 1,
      last_kind: opts.kind,
      last_practice_at: now,
    })
    return
  }

  const { data: existing } = await admin
    .from('demo_practice_usage')
    .select('id, practice_count')
    .eq('guest_token', opts.guestToken)
    .maybeSingle()

  if (existing?.id) {
    await admin
      .from('demo_practice_usage')
      .update({
        practice_count: (existing.practice_count ?? 0) + 1,
        last_kind: opts.kind,
        last_practice_at: now,
        updated_at: now,
      })
      .eq('id', existing.id)
    return
  }

  await admin.from('demo_practice_usage').insert({
    guest_token: opts.guestToken,
    practice_count: 1,
    last_kind: opts.kind,
    last_practice_at: now,
  })
}

/** @deprecated use consumeDemo */
export async function consumeGuestDemo(guestToken: string, kind: string): Promise<void> {
  await consumeDemo({ guestToken, consumeAs: 'guest', kind })
}

export async function getDemoStatus(
  guestToken: string,
  userId?: string | null
): Promise<{ demoUsed: boolean; practiceCount: number }> {
  const practiceCount = await getCombinedDemoCount(guestToken, userId)
  return {
    demoUsed: practiceCount >= DEMO_PRACTICE_LIMIT,
    practiceCount,
  }
}
