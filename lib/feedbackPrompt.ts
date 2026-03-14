'use client'

const FEEDBACK_STATE_KEY = 'quiz_feedback_prompt_state'
const LEGACY_COUNT_KEY = 'quiz_complete_count'
const DAY_IN_MS = 24 * 60 * 60 * 1000

export type FeedbackAction = 'submitted' | 'skipped' | 'dismissed'

interface FeedbackPromptState {
  attemptCount: number
  submittedCount: number
  consecutiveSkips: number
  snoozeUntilAttempt: number | null
  lastShownAt: string | null
}

const DEFAULT_STATE: FeedbackPromptState = {
  attemptCount: 0,
  submittedCount: 0,
  consecutiveSkips: 0,
  snoozeUntilAttempt: null,
  lastShownAt: null,
}

function parseNonNegativeInt(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? Math.floor(value) : fallback
}

function readState(): FeedbackPromptState {
  const raw = localStorage.getItem(FEEDBACK_STATE_KEY)
  if (!raw) {
    const legacyCount = parseInt(localStorage.getItem(LEGACY_COUNT_KEY) || '0', 10)
    return { ...DEFAULT_STATE, attemptCount: Number.isFinite(legacyCount) && legacyCount > 0 ? legacyCount : 0 }
  }

  try {
    const parsed = JSON.parse(raw) as Partial<FeedbackPromptState>
    const attemptCount = parseNonNegativeInt(parsed.attemptCount)
    const submittedCount = parseNonNegativeInt(parsed.submittedCount)
    const consecutiveSkips = parseNonNegativeInt(parsed.consecutiveSkips)
    const snoozeUntilAttempt = typeof parsed.snoozeUntilAttempt === 'number' && parsed.snoozeUntilAttempt > 0
      ? Math.floor(parsed.snoozeUntilAttempt)
      : null
    const lastShownAt = typeof parsed.lastShownAt === 'string' ? parsed.lastShownAt : null

    if (attemptCount === 0) {
      const legacyCount = parseInt(localStorage.getItem(LEGACY_COUNT_KEY) || '0', 10)
      return {
        attemptCount: Number.isFinite(legacyCount) && legacyCount > 0 ? legacyCount : 0,
        submittedCount,
        consecutiveSkips,
        snoozeUntilAttempt,
        lastShownAt,
      }
    }

    return { attemptCount, submittedCount, consecutiveSkips, snoozeUntilAttempt, lastShownAt }
  } catch (error) {
    console.error('Failed to parse feedback prompt state:', error)
    return { ...DEFAULT_STATE }
  }
}

function persistState(state: FeedbackPromptState): void {
  localStorage.setItem(FEEDBACK_STATE_KEY, JSON.stringify(state))
  localStorage.setItem(LEGACY_COUNT_KEY, String(state.attemptCount))
}

function shouldShowAtAttempt(attemptCount: number, hasSubmitted: boolean): boolean {
  if (attemptCount === 1 || attemptCount === 4 || attemptCount === 10) return true
  if (attemptCount < 10) return false
  const cadence = hasSubmitted ? 20 : 10
  return attemptCount % cadence === 0
}

function shownWithinLastDay(lastShownAt: string | null): boolean {
  if (!lastShownAt) return false
  const lastShownAtMs = Date.parse(lastShownAt)
  if (Number.isNaN(lastShownAtMs)) return false
  return Date.now() - lastShownAtMs < DAY_IN_MS
}

export function registerQuizCompletion(scorePct: number): boolean {
  if (typeof window === 'undefined') return false

  try {
    const state = readState()
    state.attemptCount += 1

    let shouldShow = false
    if (scorePct >= 40) {
      const isSnoozed = state.snoozeUntilAttempt !== null && state.attemptCount < state.snoozeUntilAttempt
      const blockedByDailyLimit = shownWithinLastDay(state.lastShownAt)
      if (!isSnoozed && !blockedByDailyLimit && shouldShowAtAttempt(state.attemptCount, state.submittedCount > 0)) {
        shouldShow = true
        state.lastShownAt = new Date().toISOString()
      }
    }

    persistState(state)
    return shouldShow
  } catch (error) {
    console.error('Failed to register quiz completion for feedback prompt:', error)
    return false
  }
}

export function recordFeedbackAction(action: FeedbackAction): void {
  if (typeof window === 'undefined') return

  try {
    const state = readState()

    if (action === 'submitted') {
      state.submittedCount += 1
      state.consecutiveSkips = 0
      state.snoozeUntilAttempt = null
    } else {
      state.consecutiveSkips += 1
      if (state.consecutiveSkips >= 2) {
        state.snoozeUntilAttempt = state.attemptCount + 15
        state.consecutiveSkips = 0
      }
    }

    persistState(state)
  } catch (error) {
    console.error('Failed to record feedback popup action:', error)
  }
}
