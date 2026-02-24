// ==========================================
// ANALYTICS HELPER FUNCTIONS
// ==========================================

import { createClient } from '@/lib/supabase/client'
import type {
  QuizData,
  SaveQuizResponse,
  UserAnalytics,
  UserStats,
  WeakSubject,
  TodaysRecommendation
} from './types'

/**
 * Save quiz results and update all analytics
 * Single efficient function call - all updates happen in one database transaction!
 * Updates: user_stats, quiz_attempts, subject_performance, daily_activity, streak
 */
export async function saveQuizResults(quizData: QuizData): Promise<SaveQuizResponse | null> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return null
  }

  try {
    const { data, error } = await supabase.rpc('save_quiz_and_update_analytics', {
      p_user_id: user.id,
      p_quiz_type: quizData.quizType,
      p_subject: quizData.subject || null,
      p_total_questions: quizData.totalQuestions,
      p_correct: quizData.correctAnswers,
      p_wrong: quizData.wrongAnswers,
      p_skipped: quizData.skippedAnswers,
      p_time_seconds: quizData.timeInSeconds
    })

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Database error while saving quiz:', error)
      }
      throw error
    }

    return data as SaveQuizResponse

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to save quiz results:', error)
    }
    return null
  }
}

/**
 * Get all user analytics in one call
 * Most efficient way to load dashboard!
 * Single RPC call fetches: stats, weak subjects, recommendation, recent scores
 */
export async function getUserAnalytics(): Promise<UserAnalytics | null> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return null
  }

  try {
    const { data, error } = await supabase.rpc('get_user_analytics', {
      p_user_id: user.id
    })

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Database error loading analytics:', error)
      }
      throw error
    }

    return data as UserAnalytics

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to load analytics:', error)
    }
    return null
  }
}

/**
 * Get just user stats (lightweight)
 */
export async function getUserStats(): Promise<UserStats | null> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  try {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error) {
      // No stats yet, return zeros
      if (error.code === 'PGRST116') {
        return {
          total_questions_solved: 0,
          total_tests_completed: 0,
          average_score: 0,
          current_streak: 0,
          longest_streak: 0,
          total_study_time_minutes: 0
        }
      }
      throw error
    }

    return data as UserStats

  } catch (error) {
    console.error('❌ Error loading user stats:', error)
    return null
  }
}

/**
 * Get weak subjects
 */
export async function getWeakSubjects(limit: number = 3): Promise<WeakSubject[]> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  try {
    const { data, error } = await supabase.rpc('get_weak_subjects', {
      p_user_id: user.id,
      p_limit: limit
    })

    if (error) throw error

    return (data || []) as WeakSubject[]

  } catch (error) {
    console.error('❌ Error loading weak subjects:', error)
    return []
  }
}

/**
 * Get today's recommendation
 */
export async function getTodaysRecommendation(): Promise<TodaysRecommendation | null> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  try {
    const { data, error } = await supabase.rpc('get_todays_recommendation', {
      p_user_id: user.id
    })

    if (error) throw error

    return data && data.length > 0 ? data[0] : null

  } catch (error) {
    console.error('❌ Error loading recommendation:', error)
    return null
  }
}

/**
 * Manually recalculate streak (optional - happens automatically)
 */
export async function recalculateStreak(): Promise<number> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return 0

  try {
    const { data, error } = await supabase.rpc('calculate_streak', {
      p_user_id: user.id
    })

    if (error) throw error

    return data as number

  } catch (error) {
    console.error('❌ Error calculating streak:', error)
    return 0
  }
}

/**
 * Format study time for display
 */
export function formatStudyTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
}

/**
 * Get performance status emoji and color
 */
export function getPerformanceStatus(score: number): {
  emoji: string
  color: string
  status: string
} {
  if (score >= 80) {
    return { emoji: '🟢', color: 'text-green-600', status: 'Excellent' }
  } else if (score >= 70) {
    return { emoji: '🟡', color: 'text-yellow-600', status: 'Good' }
  } else if (score >= 60) {
    return { emoji: '🟠', color: 'text-orange-600', status: 'Average' }
  } else {
    return { emoji: '🔴', color: 'text-red-600', status: 'Needs Work' }
  }
}

/**
 * Get streak message
 */
export function getStreakMessage(streak: number): string {
  if (streak === 0) return "Start your streak today! 🚀"
  if (streak === 1) return "Great start! Keep going! 🌟"
  if (streak < 7) return `${streak} days strong! 💪`
  if (streak < 14) return `Amazing! ${streak} day streak! 🔥`
  if (streak < 30) return `Incredible! ${streak} days! 🎯`
  return `Legendary ${streak}-day streak! 👑`
}

/**
 * Get days since last practice
 */
export function getDaysSinceLastPractice(lastPracticeDate: string | null): number {
  if (!lastPracticeDate) return 999
  const last = new Date(lastPracticeDate)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - last.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}
