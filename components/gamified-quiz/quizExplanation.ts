/** Short explanation text for the feedback dock (correct or incorrect). */
export function quizFeedbackExplanation(
  explanation: string | undefined | null,
  isCorrect: boolean,
  maxLen = 280
): string | undefined {
  const text = (explanation || '').trim()
  if (text) {
    return text.length > maxLen ? `${text.slice(0, maxLen - 1)}…` : text
  }
  return isCorrect ? 'Great job, keep going!' : 'Read the explanation, then continue.'
}
