'use client'

import { TrendingUp, Target, Award, Flame } from 'lucide-react'
import type { UserStats } from '@/lib/analytics/types'
import { formatStudyTime } from '@/lib/analytics'

interface StatsCardsProps {
  stats: UserStats
  loading?: boolean
}

export default function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-muted/30 rounded-xl h-32"
          />
        ))}
      </div>
    )
  }

  const cards = [
    {
      icon: Target,
      label: 'Questions Solved',
      value: stats.total_questions_solved.toLocaleString(),
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      achievement: stats.total_questions_solved >= 100 ? '🎯 Century!' : ''
    },
    {
      icon: Award,
      label: 'Tests Completed',
      value: stats.total_tests_completed.toLocaleString(),
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      achievement: stats.total_tests_completed >= 10 ? '⭐ Pro!' : ''
    },
    {
      icon: TrendingUp,
      label: 'Average Score',
      value: `${stats.average_score.toFixed(0)}%`,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      achievement: stats.average_score >= 80 ? '🏆 Ace!' : stats.average_score >= 70 ? '💪 Strong!' : ''
    },
    {
      icon: Flame,
      label: 'Day Streak',
      value: stats.current_streak.toString(),
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      achievement: stats.current_streak >= 7 ? '🔥 On Fire!' : stats.current_streak >= 3 ? '⚡ Hot!' : '',
      extraInfo: stats.longest_streak > stats.current_streak
        ? `Best: ${stats.longest_streak}`
        : undefined
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="group relative bg-background rounded-xl border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
        >
          {/* Gradient background on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

          {/* Icon */}
          <div className={`inline-flex p-3 ${card.bgColor} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <card.icon className={`w-5 h-5 ${card.iconColor}`} />
          </div>

          {/* Value - Big and bold */}
          <div className="space-y-1">
            <div className="text-3xl font-bold tracking-tight">
              {card.value}
            </div>

            {/* Label */}
            <p className="text-sm text-muted-foreground">
              {card.label}
            </p>

            {/* Achievement badge */}
            {card.achievement && (
              <div className="text-xs font-semibold text-primary animate-bounce">
                {card.achievement}
              </div>
            )}

            {/* Extra info */}
            {card.extraInfo && (
              <div className="text-xs text-muted-foreground">
                {card.extraInfo}
              </div>
            )}
          </div>

          {/* Shine effect on hover */}
          <div className="absolute top-0 -left-full h-full w-1/2 transform rotate-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:left-full transition-all duration-700" />
        </div>
      ))}
    </div>
  )
}
