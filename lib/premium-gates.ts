/**
 * Pure rules for premium vs free sets/mocks. Used by MDCAT, exam, FSC pages and quiz UIs
 * so logic stays consistent and is easy to test.
 */

export type SetQuizPageAccess = 'allow' | 'require_sign_in' | 'require_premium'

/**
 * When the user is already on a set-quiz page (incl. deep link): allow / ask sign-in / send to paywall.
 * Matches MDCATSetQuiz + QuizInterface effects.
 */
export function tieredSetQuizPageAccess(
  setNumber: number,
  isSignedIn: boolean,
  isActivePremium: boolean
): SetQuizPageAccess {
  if (setNumber >= 4 && !isActivePremium) return 'require_premium'
  if (setNumber === 3 && !isSignedIn) return 'require_sign_in'
  return 'allow'
}

/**
 * MDCAT mock: mock 1 free, mock 2 = sign-in, mock 3+ = active premium.
 * mockNumber 0/undefined: caller should skip (no gate).
 */
export function mdcatMockPageAccess(
  mockNumber: number,
  isSignedIn: boolean,
  isActivePremium: boolean
): SetQuizPageAccess {
  if (mockNumber < 2) return 'allow'
  if (mockNumber >= 3 && !isActivePremium) return 'require_premium'
  if (mockNumber === 2 && !isSignedIn) return 'require_sign_in'
  return 'allow'
}

export type SetTableNavigation = 'navigate' | 'require_sign_in' | 'require_premium'

/**
 * FSC / MDCAT topic / exam mode batch: tap on a set in the table.
 * Sets 1–2 or active premium: go; set 3+ not signed in: sign in;
 * set 4+ signed in not premium: paywall; set 3 signed in not premium: go.
 */
export function tieredSetTableNavigation(
  setNum: number,
  isSignedIn: boolean,
  isActivePremium: boolean
): SetTableNavigation {
  if (setNum <= 2 || isActivePremium) return 'navigate'
  if (!isSignedIn) return 'require_sign_in'
  if (setNum >= 4) return 'require_premium'
  return 'navigate'
}

export type ExamMockClick = 'open' | 'require_sign_in' | 'show_premium'

/**
 * Exam dashboard: mock 1 (or any mock if premium) always openable; else guest → sign-in, user → paywall.
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
