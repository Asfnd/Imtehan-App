/**
 * Shared lists and paths for CSS vs PMS Writing Coach UIs.
 */

export type WritingCoachExamType = 'css' | 'pms'

/** Official exam length bands. CSS is 1,000-1,200 — not the 2,500-3,000 academy myth. */
export const ESSAY_WORD_LIMITS: Record<
  WritingCoachExamType,
  { min: number; lo: number; hi: number; max: number }
> = {
  css: { min: 400, lo: 1000, hi: 1200, max: 1600 },
  pms: { min: 500, lo: 1400, hi: 1600, max: 2000 },
}

export function countEssayWords(text: string): number {
  const t = text.trim()
  return t ? t.split(/\s+/).length : 0
}

export const CSS_LONG_ANSWER_SUBJECTS = [
  'English (Précis & Composition)',
  'General Science & Ability',
  'Current Affairs',
  'Pakistan Affairs',
  'Islamic Studies / Ethics',
  'Political Science',
  'International Relations',
  'Public Administration',
  'Economics',
  'History of Pakistan & India',
  'Geography',
  'Sociology',
  'Psychology',
  'Law',
  'Constitutional Law',
  'Business Administration',
  'Accountancy & Auditing',
  'Computer Science',
  'Environmental Science',
  'Journalism & Mass Communication',
  'Other',
] as const

/** Optional / compulsory papers commonly used for PMS long-form answers (provincial syllabi vary). */
export const PMS_LONG_ANSWER_SUBJECTS = [
  'English Essay (compulsory)',
  'English: Précis & Composition (compulsory)',
  'General Knowledge: Everyday Science',
  'General Knowledge: Current Affairs',
  'General Knowledge: Pakistan Affairs',
  'Islamiat (compulsory)',
  'Accountancy & Auditing',
  'Economics',
  'Business Administration',
  'Public Administration',
  'Political Science',
  'Agriculture',
  'Computer Science',
  'International Relations',
  'Law',
  'Constitutional Law',
  'History of Pakistan & India',
  'British History',
  'Psychology',
  'Sociology',
  'Geography',
  'Physics / Chemistry / Botany / Zoology (sciences)',
  'English Literature',
  'Urdu',
  'Other',
] as const

export const WRITING_COACH_PATHS: Record<
  WritingCoachExamType,
  { backHref: string; pagePath: string }
> = {
  css: { backHref: '/css', pagePath: '/css/essay-grader' },
  pms: {
    backHref: '/exams/pms-competitive',
    pagePath: '/exams/pms-competitive/essay-grader',
  },
}
