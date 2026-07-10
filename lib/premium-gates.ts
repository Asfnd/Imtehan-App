/**
 * Pure client/server UX rules for set pickers.
 * Authoritative enforcement is `/api/practice/*` + demo_practice_usage.
 *
 * Funnel: 1 free demo (set/mock 1) → sign-in on next → premium for more.
 * Signed-in free users still get the one demo if unused.
 */

export type SetQuizPageAccess = 'allow' | 'require_sign_in' | 'require_premium'

export function tieredSetQuizPageAccess(
  setNumber: number,
  isSignedIn: boolean,
  isActivePremium: boolean,
  demoUsed = false
): SetQuizPageAccess {
  if (isActivePremium) return 'allow'
  if (setNumber >= 2) {
    if (!isSignedIn) return 'require_sign_in'
    return 'require_premium'
  }
  // set 1
  if (demoUsed) {
    if (!isSignedIn) return 'require_sign_in'
    return 'require_premium'
  }
  return 'allow'
}

export function mdcatMockPageAccess(
  mockNumber: number,
  isSignedIn: boolean,
  isActivePremium: boolean,
  demoUsed = false
): SetQuizPageAccess {
  return tieredSetQuizPageAccess(mockNumber, isSignedIn, isActivePremium, demoUsed)
}

export type SetTableNavigation = 'navigate' | 'require_sign_in' | 'require_premium'

export function tieredSetTableNavigation(
  setNum: number,
  isSignedIn: boolean,
  isActivePremium: boolean,
  demoUsed = false
): SetTableNavigation {
  const gate = tieredSetQuizPageAccess(setNum, isSignedIn, isActivePremium, demoUsed)
  if (gate === 'allow') return 'navigate'
  if (gate === 'require_sign_in') return 'require_sign_in'
  return 'require_premium'
}

export type ExamMockClick = 'open' | 'require_sign_in' | 'show_premium'

export function examDashboardMockClick(
  mockId: number,
  isSignedIn: boolean,
  isActivePremium: boolean,
  demoUsed = false
): ExamMockClick {
  const gate = tieredSetQuizPageAccess(mockId, isSignedIn, isActivePremium, demoUsed)
  if (gate === 'allow') return 'open'
  if (gate === 'require_sign_in') return 'require_sign_in'
  return 'show_premium'
}

export function isExamMockCardLocked(
  lockedAfterFirst: boolean,
  mockId: number,
  isActivePremium: boolean
): boolean {
  return lockedAfterFirst && !isActivePremium && mockId > 1
}

export function isSignInSet(setNum: number): boolean {
  return setNum === 2
}

export function isPremiumSet(setNum: number): boolean {
  return setNum >= 2
}
