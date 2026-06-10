/**
 * Single source for quiz path fill (0-1): top bar + journey path + owl.
 * Only advances after correct answers (full questions completed); wrong picks do not move the trail.
 */
export function getQuizPathProgress(
  totalSteps: number,
  currentIndex: number,
  isQuestionSolved: boolean,
  _wrongPicksLength?: number
): number {
  if (totalSteps <= 0) return 0
  const completed = currentIndex + (isQuestionSolved ? 1 : 0)
  return Math.min(1, completed / totalSteps)
}

export function getQuizProgressPercent(
  totalSteps: number,
  currentIndex: number,
  isQuestionSolved: boolean,
  wrongPicksLength?: number
): number {
  return getQuizPathProgress(totalSteps, currentIndex, isQuestionSolved, wrongPicksLength) * 100
}
