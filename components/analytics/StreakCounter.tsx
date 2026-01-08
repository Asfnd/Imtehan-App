'use client'

import { Flame, Trophy } from 'lucide-react'
import { getStreakMessage } from '@/lib/analytics'

interface StreakCounterProps {
  currentStreak: number
  longestStreak: number
  loading?: boolean
}

export default function StreakCounter({ currentStreak, longestStreak, loading }: StreakCounterProps) {
  if (loading) {
    return (
      <div className="animate-pulse bg-muted/30 rounded-2xl h-48" />
    )
  }

  const streakMessage = getStreakMessage(currentStreak)
  const isNewRecord = currentStreak > 0 && currentStreak === longestStreak
  const daysUntilWeek = Math.max(0, 7 - currentStreak)
  const daysUntilMonth = Math.max(0, 30 - currentStreak)

  return (
    <div className="relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-2xl border border-orange-200 p-6 overflow-hidden">
      {/* Animated background flame - smaller */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-2 animate-pulse">
          <Flame className="w-20 h-20 text-orange-500" />
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {/* Compact Header with Big Number */}
        <div className="flex items-center justify-between mb-4">
          {/* Left: Streak Display */}
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${currentStreak >= 7 ? 'bg-orange-500 animate-bounce' : 'bg-orange-100'}`}>
              <Flame className={`w-7 h-7 ${currentStreak >= 7 ? 'text-white' : 'text-orange-600'}`} />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent ${currentStreak >= 7 ? 'animate-pulse' : ''}`}>
                  {currentStreak}
                </span>
                <span className="text-2xl font-semibold text-gray-600">
                  {currentStreak === 1 ? 'day' : 'days'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{streakMessage}</p>
            </div>
          </div>

          {/* Right: Personal Best */}
          {longestStreak > currentStreak && (
            <div className="text-right">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-0.5">
                <Trophy className="w-3.5 h-3.5 text-yellow-600" />
                <span>Personal Best</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{longestStreak} days</div>
            </div>
          )}

          {/* New Record Badge */}
          {isNewRecord && currentStreak > 0 && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white font-bold text-xs animate-bounce">
              <Trophy className="w-3.5 h-3.5" />
              New Record!
            </div>
          )}
        </div>

        {/* Compact Progress Bars */}
        <div className="space-y-3">
          {/* Weekly Goal */}
          {currentStreak < 7 && (
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                <span>Weekly Goal</span>
                <span className="font-semibold">{currentStreak}/7 days</span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStreak / 7) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Monthly Goal */}
          {currentStreak < 30 && (
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                <span>Monthly Goal</span>
                <span className="font-semibold">{currentStreak}/30 days</span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStreak / 30) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* 30+ Streak Achievement */}
          {currentStreak >= 30 && (
            <div className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-yellow-400 text-center">
              <p className="text-sm font-bold text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text">
                🎉 Legendary Status! 👑
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Top 1% of learners
              </p>
            </div>
          )}
        </div>

        {/* Compact Motivation */}
        <div className="mt-4 p-3 bg-white rounded-xl border border-orange-200">
          <p className="text-xs text-center text-gray-700">
            {currentStreak === 0 ? (
              <>
                <span className="font-semibold">💡 Pro tip:</span> Practice daily to build your streak!
              </>
            ) : (
              <>
                <span className="font-semibold text-orange-600">Don't break the chain!</span> Keep your {currentStreak}-day streak alive 🔥
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
