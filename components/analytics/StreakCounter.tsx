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
    <div className="relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-2xl border border-orange-200 p-8 overflow-hidden">
      {/* Animated background flames */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 animate-pulse">
          <Flame className="w-24 h-24 text-orange-500" />
        </div>
        <div className="absolute bottom-4 right-4 animate-pulse delay-100">
          <Flame className="w-32 h-32 text-red-500" />
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Your Streak</h3>
            <p className="text-sm text-gray-600">{streakMessage}</p>
          </div>
          <div className={`p-4 rounded-2xl ${currentStreak >= 7 ? 'bg-orange-500 animate-bounce' : 'bg-orange-100'}`}>
            <Flame className={`w-8 h-8 ${currentStreak >= 7 ? 'text-white' : 'text-orange-600'}`} />
          </div>
        </div>

        {/* Current Streak - Big Display */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-baseline gap-3 ${currentStreak >= 7 ? 'animate-pulse' : ''}`}>
            <span className="text-7xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              {currentStreak}
            </span>
            <span className="text-3xl font-semibold text-gray-600">
              {currentStreak === 1 ? 'day' : 'days'}
            </span>
          </div>

          {/* New Record Badge */}
          {isNewRecord && currentStreak > 0 && (
            <div className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white font-bold text-sm animate-bounce">
              <Trophy className="w-4 h-4" />
              New Personal Record!
            </div>
          )}
        </div>

        {/* Progress Bars */}
        <div className="space-y-4">
          {/* Weekly Goal */}
          {currentStreak < 7 && (
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>Weekly Goal (7 days)</span>
                <span>{currentStreak}/7 days</span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStreak / 7) * 100}%` }}
                />
              </div>
              {daysUntilWeek > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  {daysUntilWeek} {daysUntilWeek === 1 ? 'day' : 'days'} until weekly goal! 🎯
                </p>
              )}
            </div>
          )}

          {/* Monthly Goal */}
          {currentStreak < 30 && (
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>Monthly Goal (30 days)</span>
                <span>{currentStreak}/30 days</span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStreak / 30) * 100}%` }}
                />
              </div>
              {daysUntilMonth > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  {daysUntilMonth} {daysUntilMonth === 1 ? 'day' : 'days'} until monthly goal! 🏆
                </p>
              )}
            </div>
          )}

          {/* Longest Streak */}
          {longestStreak > currentStreak && (
            <div className="flex items-center justify-between pt-4 border-t border-orange-200">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-gray-700">Personal Best</span>
              </div>
              <span className="text-lg font-bold text-gray-900">{longestStreak} days</span>
            </div>
          )}

          {/* 30+ Streak Achievement */}
          {currentStreak >= 30 && (
            <div className="mt-4 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border-2 border-yellow-400 text-center">
              <p className="text-lg font-bold text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text">
                🎉 Legendary Status Achieved! 👑
              </p>
              <p className="text-sm text-gray-600 mt-1">
                You're in the top 1% of learners!
              </p>
            </div>
          )}
        </div>

        {/* Motivation */}
        {currentStreak === 0 && (
          <div className="mt-6 p-4 bg-white rounded-xl border border-orange-200">
            <p className="text-sm text-center text-gray-700">
              <span className="font-semibold">💡 Pro tip:</span> Practice daily to build your streak and form a winning habit!
            </p>
          </div>
        )}

        {currentStreak > 0 && (
          <div className="mt-6 p-4 bg-white rounded-xl border border-orange-200">
            <p className="text-sm text-center text-gray-700">
              <span className="font-semibold text-orange-600">Don't break the chain!</span> Come back tomorrow to keep your {currentStreak}-day streak alive 🔥
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
