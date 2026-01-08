'use client'

import { useEffect, useState } from 'react'
import { getUserAnalytics } from '@/lib/analytics'
import type { UserAnalytics } from '@/lib/analytics/types'
import StatsCards from './StatsCards'
import StreakCounter from './StreakCounter'
import CompactRecommendation from './CompactRecommendation'

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      const data = await getUserAnalytics()
      setAnalytics(data)
    } catch (err) {
      console.error('Error loading analytics:', err)
      setError('Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  // Refresh analytics after quiz completion
  const refreshAnalytics = () => {
    loadAnalytics()
  }

  // Expose refresh function for parent components
  useEffect(() => {
    // @ts-ignore - Add global refresh function
    window.refreshAnalytics = refreshAnalytics
    return () => {
      // @ts-ignore
      delete window.refreshAnalytics
    }
  }, [])

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={loadAnalytics}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    )
  }

  // Default empty stats for first-time users
  const defaultStats = {
    total_questions_solved: 0,
    total_tests_completed: 0,
    average_score: 0,
    current_streak: 0,
    longest_streak: 0,
    total_study_time_minutes: 0
  }

  const stats = analytics?.stats || defaultStats
  const weakSubjects = analytics?.weak_subjects || []
  const recommendation = analytics?.recommendation || null

  return (
    <div className="space-y-6">
      {/* Stats Cards - Always visible */}
      <section>
        <StatsCards stats={stats} loading={loading} />
      </section>

      {/* Compact Recommendation + Weak Subjects Combined */}
      <section>
        <CompactRecommendation
          recommendation={recommendation}
          subjects={weakSubjects}
          loading={loading}
        />
      </section>

      {/* Streak Counter - More compact */}
      <section>
        <StreakCounter
          currentStreak={stats.current_streak}
          longestStreak={stats.longest_streak}
          loading={loading}
        />
      </section>

      {/* Refresh Button (for testing) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-center">
          <button
            onClick={refreshAnalytics}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            🔄 Refresh Analytics
          </button>
        </div>
      )}
    </div>
  )
}
