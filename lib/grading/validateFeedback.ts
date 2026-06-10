/** Shape checks for `/api/grade` JSON: mirrors prompts in `writingCoachPrompts.ts`. */

const GRADES = new Set(['A', 'B', 'C', 'D', 'F'])
const ANNOTATION_TYPES = new Set(['strength', 'weakness', 'suggestion'])

function parseJsonObject(raw: string): Record<string, unknown> {
  try {
    return JSON.parse(raw) as Record<string, unknown>
  } catch {
    const m = raw.match(/\{[\s\S]*\}/)
    if (!m) throw new Error('No JSON object in model response')
    return JSON.parse(m[0]) as Record<string, unknown>
  }
}

function assertGrade(g: unknown): asserts g is string {
  if (typeof g !== 'string' || !GRADES.has(g)) {
    throw new Error(`Invalid grade: ${String(g)}`)
  }
}

function assertBreakdownSlice(
  b: unknown,
  keys: { content: number; analysis: number; structure: number; language: number }
): void {
  if (!b || typeof b !== 'object') throw new Error('breakdown missing')
  const o = b as Record<string, unknown>
  for (const k of ['content', 'analysis', 'structure', 'language'] as const) {
    const slice = o[k]
    if (!slice || typeof slice !== 'object') throw new Error(`breakdown.${k} missing`)
    const s = slice as Record<string, unknown>
    if (typeof s.score !== 'number') throw new Error(`breakdown.${k}.score not a number`)
    if (typeof s.max !== 'number') throw new Error(`breakdown.${k}.max not a number`)
    if (typeof s.comment !== 'string') throw new Error(`breakdown.${k}.comment not a string`)
    const max = keys[k]
    if (s.max !== max) throw new Error(`breakdown.${k}.max expected ${max}, got ${s.max}`)
  }
}

/** CSS/PMS essay (100 marks): breakdown 40 / 25 / 20 / 15. */
export function validateCssEssayFeedback(raw: string): void {
  const f = parseJsonObject(raw)
  if (typeof f.score !== 'number' || f.score < 0 || f.score > 100) {
    throw new Error(`score must be 0-100, got ${String(f.score)}`)
  }
  assertGrade(f.grade)
  assertBreakdownSlice(f.breakdown, {
    content: 40,
    analysis: 25,
    structure: 20,
    language: 15,
  })
  if (!Array.isArray(f.annotations) || f.annotations.length < 1) {
    throw new Error('annotations must be a non-empty array')
  }
  for (const a of f.annotations) {
    if (!a || typeof a !== 'object') throw new Error('invalid annotation')
    const an = a as Record<string, unknown>
    if (typeof an.quote !== 'string') throw new Error('annotation.quote')
    if (!ANNOTATION_TYPES.has(an.type as string)) throw new Error('annotation.type')
    if (typeof an.comment !== 'string') throw new Error('annotation.comment')
  }
  if (!Array.isArray(f.missingPoints)) throw new Error('missingPoints must be an array')
  if (typeof f.overallFeedback !== 'string') throw new Error('overallFeedback missing')
}

/** Long-answer: breakdown 40% / 30% / 20% / 10% of question marks. */
export function validateLongAnswerFeedback(raw: string, marks: number): void {
  const f = parseJsonObject(raw)
  if (typeof f.score !== 'number' || f.score < 0 || f.score > marks) {
    throw new Error(`score must be 0-${marks}, got ${String(f.score)}`)
  }
  assertGrade(f.grade)
  const contentMax = Math.round(marks * 0.4)
  const analysisMax = Math.round(marks * 0.3)
  const structureMax = Math.round(marks * 0.2)
  const languageMax = Math.round(marks * 0.1)
  assertBreakdownSlice(f.breakdown, {
    content: contentMax,
    analysis: analysisMax,
    structure: structureMax,
    language: languageMax,
  })
  if (!Array.isArray(f.annotations) || f.annotations.length < 1) {
    throw new Error('annotations must be a non-empty array')
  }
  for (const a of f.annotations) {
    if (!a || typeof a !== 'object') throw new Error('invalid annotation')
    const an = a as Record<string, unknown>
    if (typeof an.quote !== 'string') throw new Error('annotation.quote')
    if (!ANNOTATION_TYPES.has(an.type as string)) throw new Error('annotation.type')
    if (typeof an.comment !== 'string') throw new Error('annotation.comment')
  }
  if (!Array.isArray(f.missingPoints)) throw new Error('missingPoints must be an array')
  if (typeof f.overallFeedback !== 'string') throw new Error('overallFeedback missing')
}

export function validatePrecisFeedback(raw: string): void {
  const f = parseJsonObject(raw)
  if (typeof f.score !== 'number' || f.score < 0 || f.score > 100) {
    throw new Error(`score must be 0-100, got ${String(f.score)}`)
  }
  assertGrade(f.grade)
  const wc = f.wordCount
  if (!wc || typeof wc !== 'object') throw new Error('wordCount missing')
  const w = wc as Record<string, unknown>
  for (const k of ['submitted', 'original', 'target']) {
    if (typeof w[k] !== 'number') throw new Error(`wordCount.${k} not a number`)
  }
  if (typeof w.passed !== 'boolean') throw new Error('wordCount.passed not boolean')
  if (!Array.isArray(f.rules) || f.rules.length !== 6) {
    throw new Error('rules must be an array of length 6')
  }
  for (const r of f.rules) {
    if (!r || typeof r !== 'object') throw new Error('invalid rule')
    const rule = r as Record<string, unknown>
    if (typeof rule.rule !== 'string') throw new Error('rule.rule')
    if (typeof rule.passed !== 'boolean') throw new Error('rule.passed')
    if (typeof rule.comment !== 'string') throw new Error('rule.comment')
  }
  if (!Array.isArray(f.missedKeyPoints)) throw new Error('missedKeyPoints must be an array')
  if (typeof f.overallFeedback !== 'string') throw new Error('overallFeedback missing')
}
