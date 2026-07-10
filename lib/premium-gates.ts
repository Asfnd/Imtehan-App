/**
 * Pure rules for premium vs free sets/mocks. Used by MDCAT, exam, FSC pages and quiz UIs
 * so logic stays consistent and is easy to test.
 *
 * Funnel across Imtehan:
 *   Set/mock 1 → free demo (guest OK)
 *   Set/mock 2 → sign-in required for guests; premium for signed-in free
 *   Set/mock 3+ → premium
 */

export type SetQuizPageAccess = 'allow' | 'require_sign_in' | 'require_premium'

/**
 * When the user is already on a set-quiz page (incl. deep link): allow / ask sign-in / send to paywall.
 */
export function tieredSetQuizPageAccess(
  setNumber: number,
  isSignedIn: boolean,
  isActivePremium: boolean
): SetQuizPageAccess {
  if (isActivePremium) return 'allow'
  if (setNumber <= 1) return 'allow'
  if (!isSignedIn) return 'require_sign_in'
  return 'require_premium'
}

/**
 * MDCAT mock: mock 1 free, mock 2 = sign-in (then premium if signed-in free), mock 3+ = premium.
 */
export function mdcatMockPageAccess(
  mockNumber: number,
  isSignedIn: boolean,
  isActivePremium: boolean
): SetQuizPageAccess {
  if (isActivePremium) return 'allow'
  if (mockNumber < 2) return 'allow'
  if (!isSignedIn) return 'require_sign_in'
  return 'require_premium'
}

export type SetTableNavigation = 'navigate' | 'require_sign_in' | 'require_premium'

/**
 * FSC / MDCAT topic / exam mode batch: tap on a set in the table.
 * Set 1 free; set 2+ guest → sign-in; set 2+ signed-in free → premium.
 */
export function tieredSetTableNavigation(
  setNum: number,
  isSignedIn: boolean,
  isActivePremium: boolean
): SetTableNavigation {
  if (isActivePremium) return 'navigate'
  if (setNum <= 1) return 'navigate'
  if (!isSignedIn) return 'require_sign_in'
  return 'require_premium'
}

export type ExamMockClick = 'open' | 'require_sign_in' | 'show_premium'

/**
 * Exam dashboard: mock 1 free; else guest → sign-in, signed-in free → paywall.
 */
export function examDashboardMockClick(
  mockId: number,
  isSignedIn: boolean,
  isActivePremium: boolean
): ExamMockClick {
  if (mockId === 1 || isActivePremium) return 'open'
  if (!isSignedIn) return 'require_sign_in'
  return 'show_premium'
}

/**
 * Card grid: after first mock, non-premium users only see mock 1; rest locked.
 */
export function isExamMockCardLocked(
  lockedAfterFirst: boolean,
  mockId: number,
  isActivePremium: boolean
): boolean {
  return lockedAfterFirst && !isActivePremium && mockId > 1
}

/** UI helper: set 2 is the sign-in gate for guests; set 2+ is premium for free signed-in. */
export function isSignInSet(setNum: number): boolean {
  return setNum === 2
}

export function isPremiumSet(setNum: number): boolean {
  return setNum >= 2
}
