/**
 * Minimum MCQ counts for surfacing subjects in the app and CI quality gates.
 * Keep in sync with quiz-app-mobile/src/lib/bank-quality.ts
 */

/** CSS optional subjects need at least 5 playable sets before listing. */
export const MIN_MCQS_PRACTICE_LIST = 100

/** Warn in CI when a bank cannot support 3 full sets. */
export const MIN_MCQS_THIN_WARNING = 60

/** ISSB tables should support multiple unique mocks. */
export const MIN_MCQS_ISSB_TABLE = 500

/** MDCAT English should be closer to other MDCAT subjects. */
export const MIN_MCQS_MDCAT_ENGLISH = 2400

/** MDCAT logical reasoning was historically thin vs science banks. */
export const MIN_MCQS_MDCAT_LOGICAL_REASONING = 1500

/** Engineering CS — smallest engineering bank. */
export const MIN_MCQS_ENGINEERING_CS = 2000

export type SectionListInput = {
  subjectField?: string
  dbTable?: string
}

/** Whether a subject should appear in module subject lists (practice modes). */
export function meetsPracticeListThreshold(
  count: number,
  section?: SectionListInput
): boolean {
  if (section?.subjectField) {
    return count >= MIN_MCQS_PRACTICE_LIST
  }
  return count > 0
}

export type BankHealthTier = 'ok' | 'thin' | 'critical'

export function bankHealthTier(count: number, minOk: number, minWarn?: number): BankHealthTier {
  const warn = minWarn ?? Math.floor(minOk / 2)
  if (count >= minOk) return 'ok'
  if (count >= warn) return 'thin'
  return 'critical'
}
