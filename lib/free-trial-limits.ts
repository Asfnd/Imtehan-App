/**
 * Free / demo practice credits across Imtehan.
 * Funnel: 1 demo practice (guest) → sign-in on 2nd → premium for more.
 */

export type FreeTrialUsageType =
  | 'cssSubject'
  | 'cssIdioms'
  | 'cssIdiomsRandom'
  | 'mptMock'
  | 'mptPast'
  | 'officialPast'
  | 'solved'
  | 'guessPapers'

/** Guest (localStorage) — one practice set / credit per category, then sign-in. */
export const GUEST_LIMITS: Record<FreeTrialUsageType, number> = {
  cssSubject: 1,
  cssIdioms: 1,
  cssIdiomsRandom: 1,
  mptMock: 1,
  mptPast: 1,
  officialPast: 1,
  solved: 0,
  guessPapers: 0,
}

/**
 * Signed-in free users — no extra free credits.
 * After demo + sign-in, further practice goes to premium.
 */
export const SIGNED_IN_LIMITS: Record<FreeTrialUsageType, number> = {
  cssSubject: 0,
  cssIdioms: 0,
  cssIdiomsRandom: 0,
  mptMock: 0,
  mptPast: 0,
  officialPast: 0,
  solved: 0,
  guessPapers: 0,
}

export const USAGE_TYPE_TO_DB_COLUMN: Record<Exclude<FreeTrialUsageType, 'guessPapers'>, string> = {
  cssSubject: 'css_subject_quizzes',
  cssIdioms: 'css_idioms_quizzes',
  cssIdiomsRandom: 'css_idioms_random',
  mptMock: 'mpt_mock_tests',
  mptPast: 'mpt_past_papers',
  officialPast: 'official_past_papers',
  solved: 'solved_papers',
}
