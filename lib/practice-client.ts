'use client'

import { createClient } from '@/lib/supabase/client'
import { PREMIUM_PAGE_PATH } from '@/lib/routes'

export type PracticeFetchResult =
  | { ok: true; mcqs: any[]; demoConsumed?: boolean }
  | { ok: false; code: 'REQUIRE_SIGN_IN' | 'PREMIUM_REQUIRED' | 'DEMO_USED' | 'ERROR' }

async function authHeaders(): Promise<HeadersInit> {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (session?.access_token) {
    headers.Authorization = `Bearer ${session.access_token}`
  }
  return headers
}

export async function fetchPracticeSet(body: Record<string, unknown>): Promise<PracticeFetchResult> {
  try {
    const res = await fetch('/api/practice/set', {
      method: 'POST',
      credentials: 'include',
      headers: await authHeaders(),
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok && Array.isArray(data.mcqs)) {
      return { ok: true, mcqs: data.mcqs, demoConsumed: !!data.demoConsumed }
    }
    const code = data.code as PracticeFetchResult extends { ok: false; code: infer C } ? C : never
    if (code === 'REQUIRE_SIGN_IN' || code === 'DEMO_USED' || code === 'PREMIUM_REQUIRED') {
      return { ok: false, code }
    }
    return { ok: false, code: 'ERROR' }
  } catch {
    return { ok: false, code: 'ERROR' }
  }
}

export async function claimDemoPractice(kind: string): Promise<PracticeFetchResult> {
  try {
    const res = await fetch('/api/practice/status', {
      method: 'POST',
      credentials: 'include',
      headers: await authHeaders(),
      body: JSON.stringify({ kind, consume: true }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok && data.ok) return { ok: true, mcqs: [] }
    const code = data.code
    if (code === 'REQUIRE_SIGN_IN' || code === 'DEMO_USED' || code === 'PREMIUM_REQUIRED') {
      return { ok: false, code }
    }
    return { ok: false, code: 'ERROR' }
  } catch {
    return { ok: false, code: 'ERROR' }
  }
}

export async function loadDemoStatus(): Promise<{
  demoUsed: boolean
  isPremium: boolean
  isSignedIn: boolean
}> {
  try {
    const res = await fetch('/api/practice/status', {
      credentials: 'include',
      headers: await authHeaders(),
    })
    if (!res.ok) return { demoUsed: false, isPremium: false, isSignedIn: false }
    const data = await res.json()
    return {
      demoUsed: !!data.demoUsed,
      isPremium: !!data.isPremium,
      isSignedIn: !!data.isSignedIn,
    }
  } catch {
    return { demoUsed: false, isPremium: false, isSignedIn: false }
  }
}

export function handlePracticeDeny(
  code: 'REQUIRE_SIGN_IN' | 'PREMIUM_REQUIRED' | 'DEMO_USED' | 'ERROR',
  opts: {
    onSignIn: () => void
    router: { replace: (path: string) => void; push: (path: string) => void }
  }
) {
  if (code === 'PREMIUM_REQUIRED') {
    opts.router.replace(PREMIUM_PAGE_PATH)
    return
  }
  if (code === 'REQUIRE_SIGN_IN' || code === 'DEMO_USED') {
    opts.onSignIn()
    return
  }
}
