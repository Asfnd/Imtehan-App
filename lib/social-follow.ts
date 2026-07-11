'use client'

const FOLLOW_PROMPT_KEY = 'imtehan_follow_prompt_v1'

/** True once per browser until the first-quiz follow prompt is shown. */
export function shouldShowFirstQuizFollowPrompt(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(FOLLOW_PROMPT_KEY) !== '1'
  } catch {
    return false
  }
}

export function markFirstQuizFollowPromptSeen(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(FOLLOW_PROMPT_KEY, '1')
  } catch {
    /* ignore quota / private mode */
  }
}
