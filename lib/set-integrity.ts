/** Stem-deduped set pagination — mirrors quiz-app-mobile/src/lib/set-integrity.ts */

export const SET_SIZE = 20

export function normalizeQuestionStem(q: string): string {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export type QuizMcqRow = {
  id: number
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  explanation?: string
}

export function dedupeMcqsByBankId<T extends { id: number }>(mcqs: T[]): T[] {
  const seen = new Set<number>()
  const out: T[] = []
  for (const m of mcqs) {
    if (seen.has(m.id)) continue
    seen.add(m.id)
    out.push(m)
  }
  return out
}

export function dedupeMcqsByStem<T extends { question: string }>(mcqs: T[]): T[] {
  const seen = new Set<string>()
  const out: T[] = []
  for (const m of mcqs) {
    const stem = normalizeQuestionStem(m.question)
    if (!stem || seen.has(stem)) continue
    seen.add(stem)
    out.push(m)
  }
  return out
}

export function dedupeMcqsForQuiz<T extends { id: number; question: string }>(mcqs: T[]): T[] {
  return dedupeMcqsByStem(dedupeMcqsByBankId(mcqs))
}

export function setCountForPool(totalCount: number, setSize: number): number {
  if (totalCount <= 0 || setSize <= 0) return 0
  return Math.ceil(totalCount / setSize)
}

export function questionsInSet(setNumber: number, totalCount: number, setSize: number): number {
  if (totalCount <= 0 || setNumber < 1 || setSize <= 0) return 0
  const start = (setNumber - 1) * setSize
  if (start >= totalCount) return 0
  return Math.min(setSize, totalCount - start)
}
