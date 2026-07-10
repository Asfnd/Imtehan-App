/**
 * Pure client/server UX rules for set pickers.
 * Authoritative enforcement is `/api/practice/*` + demo_practice_usage.
 *
 * Funnel: 1 free demo (set/mock 1, once) → sign-in → premium.
 */

export type SetQuizPageAccess = 'allow' | 'require_sign_in' | 'require_premium'

export function tieredSetQuizPageAccess(
  setNumber: number,
  isSignedIn: boolean,
  isActivePremium: boolean,
  demoUsed = false
): SetQuizPageAccess {
  if (isActivePremium) return 'allow'
  if (isSignedIn) return 'require_premium'
  if (setNumber >= 2) return 'require_sign_in'
  if (demoUsed) return 'require_sign_in'
  return 'allow'
}

export function mdcatMockPageAccess(
  mockNumber: number,
  isSignedIn: boolean,
  isActivePremium: boolean,
  demoUsed = false
): SetQuizPageAccess {
  if (isActivePremium) return 'allow'
  if (isSignedIn) return 'require_premium'
  if (mockNumber >= 2) return 'require_sign_in'
  if (demoUsed) return 'require_sign_in'
  return 'allow'
}

export type SetTableNavigation = 'navigate' | 'require_sign_in' | 'require_premium'

export function tieredSetTableNavigation(
  setNum: number,
  isSignedIn: boolean,
  isActivePremium: boolean,
  demoUsed = false
): SetTableNavigation {
  if (isActivePremium) return 'navigate'
  if (isSignedIn) return 'require_premium'
  if (setNum >= 2) return 'require_sign_in'
  if (demoUsed) return 'require_sign_in'
  return 'navigate'
}

export type ExamMockClick = 'open' | 'require_sign_in' | 'show_premium'

export function examDashboardMockClick(
  mockId: number,
  isSignedIn: boolean,
  isActivePremium: boolean,
  demoUsed = false
): ExamMockClick {
  if (isActivePremium) return 'open'
  if (isSignedIn) return 'show_premium'
  if (mockId >= 2) return 'require_sign_in'
  if (demoUsed) return 'require_sign_in'
  return 'open'
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
