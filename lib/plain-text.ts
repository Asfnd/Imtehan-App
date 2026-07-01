/** Replace typographic dashes with ASCII hyphens for all user-visible copy. */
export function plainText(s: string): string {
  return s.replace(/\u2014/g, ' - ').replace(/\u2013/g, '-')
}

/** Normalize MCQ text fields before render (questions, options, explanations). */
export function plainTextMcqFields<T extends Record<string, unknown>>(row: T): T {
  const out = { ...row }
  for (const key of [
    'question',
    'question_text',
    'option_a',
    'option_b',
    'option_c',
    'option_d',
    'explanation',
    'explanation_detailed',
  ]) {
    const v = out[key]
    if (typeof v === 'string') (out as Record<string, unknown>)[key] = plainText(v)
  }
  return out
}
