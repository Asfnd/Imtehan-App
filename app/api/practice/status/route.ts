import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUserForRoute } from '@/lib/security/request-verification'
import { isActivePremium } from '@/lib/is-active-premium'
import {
  attachGuestCookie,
  consumeDemo,
  decideCreditPracticeAccess,
  decidePracticeAccess,
  getDemoStatus,
  getOrCreateGuestToken,
} from '@/lib/demo-access'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** GET — current demo / premium status for UI. */
export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUserForRoute(request)
  const premium = isActivePremium(user)
  const { token, setCookie } = await getOrCreateGuestToken()
  const demo = await getDemoStatus(token, user?.id)

  const res = NextResponse.json({
    isSignedIn: !!user,
    isPremium: premium,
    demoUsed: demo.demoUsed,
    practiceCount: demo.practiceCount,
  })
  if (setCookie) attachGuestCookie(res, token)
  return res
}

/**
 * POST — claim the single demo slot (CSS/MPT/mocks) or check set/mock access.
 */
export async function POST(request: NextRequest) {
  let body: { kind?: string; setOrMockNumber?: number; consume?: boolean } = {}
  try {
    body = await request.json()
  } catch {
    /* empty */
  }

  const user = await getAuthenticatedUserForRoute(request)
  const premium = isActivePremium(user)
  const { token, setCookie } = await getOrCreateGuestToken()
  const setOrMockNumber = Number(body.setOrMockNumber ?? 1)

  const decision =
    body.setOrMockNumber != null
      ? await decidePracticeAccess({
          isSignedIn: !!user,
          isPremium: premium,
          guestToken: token,
          userId: user?.id,
          setOrMockNumber,
        })
      : await decideCreditPracticeAccess({
          isSignedIn: !!user,
          isPremium: premium,
          guestToken: token,
          userId: user?.id,
        })

  if (!decision.allow) {
    const status = decision.code === 'PREMIUM_REQUIRED' ? 403 : 401
    const res = NextResponse.json({ ok: false, code: decision.code }, { status })
    if (setCookie) attachGuestCookie(res, token)
    return res
  }

  if (body.consume !== false && decision.consumeDemo) {
    await consumeDemo({
      guestToken: token,
      userId: user?.id,
      consumeAs: decision.consumeAs,
      kind: body.kind ?? 'credit-practice',
    })
  }

  const res = NextResponse.json({
    ok: true,
    demoConsumed: decision.consumeDemo && body.consume !== false,
  })
  if (setCookie) attachGuestCookie(res, token)
  return res
}
