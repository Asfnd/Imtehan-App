/**
 * Points Calculator for Quiz Gamification
 * Calculates points based on correctness, streak, and attempts
 */

export interface PointsConfig {
  basePoints: number
  streakMultiplier: number
  firstAttemptBonus: number
}

const DEFAULT_CONFIG: PointsConfig = {
  basePoints: 10,
  streakMultiplier: 1.5,
  firstAttemptBonus: 5,
}

/**
 * Calculate points earned for answering a question
 * @param isCorrect - Whether the answer was correct
 * @param streak - Current streak of consecutive correct answers
 * @param attempts - Number of attempts on this question (0 = first attempt)
 * @param config - Optional configuration for point values
 * @returns Points earned (0 if incorrect)
 */
export function calculatePoints(
  isCorrect: boolean,
  streak: number,
  attempts: number = 0,
  config: PointsConfig = DEFAULT_CONFIG
): number {
  // No points for incorrect answers
  if (!isCorrect) {
    return 0
  }

  let points = config.basePoints

  // First attempt bonus
  if (attempts === 0) {
    points += config.firstAttemptBonus
  }

  // Streak multiplier (kicks in at streak >= 3)
  if (streak >= 3) {
    const multiplier = 1 + Math.floor(streak / 3) * 0.5
    points = Math.floor(points * multiplier)
  }

  return points
}

/**
 * Get a descriptive message for the points earned
 * @param points - Points earned
 * @param streak - Current streak
 * @returns Descriptive message
 */
export function getPointsMessage(points: number, streak: number): string {
  if (points === 0) {
    return 'Try again!'
  }

  if (streak >= 10) {
    return `🔥 ${points} pts - Unstoppable!`
  }

  if (streak >= 5) {
    return `🔥 ${points} pts - On fire!`
  }

  if (points > 15) {
    return `⭐ ${points} pts - Bonus!`
  }

  return `+${points} pts`
}

/**
 * Calculate total possible points for a quiz
 * @param questionCount - Number of questions
 * @param config - Optional configuration
 * @returns Maximum possible points
 */
export function calculateMaxPoints(
  questionCount: number,
  config: PointsConfig = DEFAULT_CONFIG
): number {
  // Assume perfect score: all first attempts with maximum streak
  let totalPoints = 0
  const pointsPerQuestion = config.basePoints + config.firstAttemptBonus

  for (let i = 0; i < questionCount; i++) {
    const streak = i
    let points = pointsPerQuestion

    // Apply streak multiplier
    if (streak >= 3) {
      const multiplier = 1 + Math.floor(streak / 3) * 0.5
      points = Math.floor(points * multiplier)
    }

    totalPoints += points
  }

  return totalPoints
}
