'use client'

import { useState, useEffect, memo } from 'react'
import { useAnimation } from '@/lib/hooks/useAnimation'

interface StreakCounterProps {
  streak: number
  maxStreak: number
}

/**
 * StreakCounter Component
 * Displays current streak with animations and milestone celebrations
 * Memoized to prevent re-renders when streak hasn't changed
 */
export const StreakCounter = memo(function StreakCounter({ streak, maxStreak }: StreakCounterProps) {
  const [showMilestone, setShowMilestone] = useState(false)
  const [milestoneMessage, setMilestoneMessage] = useState('')

  useEffect(() => {
    // Show milestone celebration for streaks of 5, 10, 15, etc.
    if (streak > 0 && streak % 5 === 0) {
      setMilestoneMessage(getMilestoneMessage(streak))
      setShowMilestone(true)

      // Hide after 3 seconds
      const timer = setTimeout(() => {
        setShowMilestone(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [streak])

  const getMilestoneMessage = (currentStreak: number): string => {
    if (currentStreak >= 20) return '🏆 LEGENDARY!'
    if (currentStreak >= 15) return '⚡ INCREDIBLE!'
    if (currentStreak >= 10) return '🔥 ON FIRE!'
    if (currentStreak >= 5) return '🎯 GREAT STREAK!'
    return '🎉 NICE!'
  }

  const getStreakGradient = (): string => {
    if (streak >= 10) return 'from-orange-500 to-red-500'
    if (streak >= 5) return 'from-orange-400 to-orange-600'
    if (streak >= 3) return 'from-yellow-400 to-orange-400'
    return 'from-gray-400 to-gray-500'
  }

  return (
    <div className="relative">
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r ${getStreakGradient()} shadow-lg border border-white/20 transition-all`}>
        <span className="text-xl">
          {streak >= 5 ? '🔥' : '⚡'}
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-black text-white drop-shadow-lg">
            {streak}
          </span>
          <span className="text-xs text-white/90 font-bold uppercase tracking-wide">x</span>
        </div>
      </div>

      {/* Milestone Celebration Popup */}
      {showMilestone && (
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
            <span className="text-sm font-bold animate-pulse">
              {milestoneMessage}
            </span>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500" />
          </div>
        </div>
      )}

      {/* Max Streak Badge (if current streak equals max) */}
      {streak > 0 && streak === maxStreak && maxStreak >= 5 && (
        <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
          ★
        </div>
      )}
    </div>
  )
})
