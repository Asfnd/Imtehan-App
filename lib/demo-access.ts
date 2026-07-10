/**
 * Server-side free demo tracking.
 * Guests get exactly ONE interactive practice across Imtehan (cookie + DB).
 * Signed-in free users get zero free practice (premium redirect).
 */

import { cookies } from 'next/headers'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import type { NextResponse } from 'next/server'

export const GUEST_DEMO_COOKIE = 'imtehan_gid'
export const DEMO_PRACTICE_LIMIT = 1

export type PracticeDenyCode = 'REQUIRE_SIGN_IN' | 'PREMIUM_REQUIRED' | 'DEMO_USED'

export type PracticeAccessDecision =
  | { allow: true; consumeDemo: boolean }
  | { allow: false; code: PracticeDenyCode }

function newGuestToken(): string {
  return crypto.randomUUID()
}

/** Read or create stable guest id (httpOnly cookie). */
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
    maxAge: 60 * 60 * 24 * 400, // ~13 months
  })
}

async function getGuestPracticeCount(guestToken: string): Promise<number> {
  const admin = createAdminSupabaseClient()
  const { data } = await admin
    .from('demo_practice_usage')
    .select('practice_count')
    .eq('guest_token', guestToken)
    .maybeSingle()
  return data?.practice_count ?? 0
}

/**
 * Decide whether this request may receive interactive MCQs.
 * @param setOrMockNumber 1 = demo-eligible slot; >=2 needs sign-in then premium
 */
export async function decidePracticeAccess(opts: {
  isSignedIn: boolean
  isPremium: boolean
  guestToken: string
  setOrMockNumber: number
}): Promise<PracticeAccessDecision> {
  const { isSignedIn, isPremium, guestToken, setOrMockNumber } = opts

  if (isPremium) return { allow: true, consumeDemo: false }

  // Signed-in free: no free practice — premium only
  if (isSignedIn) {
    return { allow: false, code: 'PREMIUM_REQUIRED' }
  }

  // Guest: set/mock 2+ → sign in
  if (setOrMockNumber >= 2) {
    return { allow: false, code: 'REQUIRE_SIGN_IN' }
  }

  // Guest set/mock 1: only if demo slot remaining
  const used = await getGuestPracticeCount(guestToken)
  if (used >= DEMO_PRACTICE_LIMIT) {
    return { allow: false, code: 'DEMO_USED' }
  }

  return { allow: true, consumeDemo: true }
}

/** CSS/MPT-style practice with no set number — same global demo slot. */
export async function decideCreditPracticeAccess(opts: {
  isSignedIn: boolean
  isPremium: boolean
  guestToken: string
}): Promise<PracticeAccessDecision> {
  return decidePracticeAccess({
    ...opts,
    setOrMockNumber: 1,
  })
}

export async function consumeGuestDemo(guestToken: string, kind: string): Promise<void> {
  const admin = createAdminSupabaseClient()
  const { data: existing } = await admin
    .from('demo_practice_usage')
    .select('id, practice_count')
    .eq('guest_token', guestToken)
    .maybeSingle()

  const now = new Date().toISOString()
  if (existing?.id) {
    await admin
      .from('demo_practice_usage')
      .update({
        practice_count: (existing.practice_count ?? 0) + 1,
        last_kind: kind,
        last_practice_at: now,
        updated_at: now,
      })
      .eq('id', existing.id)
    return
  }

  await admin.from('demo_practice_usage').insert({
    guest_token: guestToken,
    practice_count: 1,
    last_kind: kind,
    last_practice_at: now,
  })
}

export async function getDemoStatus(guestToken: string): Promise<{
  demoUsed: boolean
  practiceCount: number
}> {
  const practiceCount = await getGuestPracticeCount(guestToken)
  return {
    demoUsed: practiceCount >= DEMO_PRACTICE_LIMIT,
    practiceCount,
  }
}
