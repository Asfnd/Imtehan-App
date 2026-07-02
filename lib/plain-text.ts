/** Replace typographic dashes with ASCII hyphens for all user-visible copy. */
export function plainText(s: string): string {
  return s.replace(/\u2014/g, ' - ').replace(/\u2013/g, '-')
}

const MCQ_TEXT_KEYS = [
  'question',
  'question_text',
  'option_a',
  'option_b',
  'option_c',
  'option_d',
  'explanation',
  'explanation_detailed',
] as const

/** Normalize MCQ text fields before render (questions, options, explanations). */
export function plainTextMcqFields<T extends object>(row: T): T {
  const out: Record<string, unknown> = { ...(row as Record<string, unknown>) }
  for (const key of MCQ_TEXT_KEYS) {
    const v = out[key]
    if (typeof v === 'string') out[key] = plainText(v)
  }
  return out as T
}
