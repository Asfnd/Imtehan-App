/** Reading progress for notes kits. Reuses quiz_completions (local + signed-in sync). */

export const NOTES_READ_SCOPE = 'notes-read'

/** Treat the kit as finished once the student has seen this much of the article. */
export const NOTES_READ_DONE = 92

export function notesReadItem(topicSlug: string): string {
  return topicSlug.trim()
}

export function notesReadLabel(pct: number | undefined, hasKit: boolean): string {
  if (!hasKit) return 'Coming soon'
  const n = pct ?? 0
  if (n >= NOTES_READ_DONE) return 'Read'
  if (n > 0) return `${n}%`
  return 'Kit ready'
}
