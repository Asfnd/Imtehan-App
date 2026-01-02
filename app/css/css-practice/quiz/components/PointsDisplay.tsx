'use client'

import { memo } from 'react'

interface PointsDisplayProps {
  points: number
  recentPoints: number
  showRecent: boolean
}

/**
 * PointsDisplay Component
 * Shows total points (no floating animation)
 * Memoized to prevent re-renders when points haven't changed
 */
export const PointsDisplay = memo(function PointsDisplay({
  points,
}: PointsDisplayProps) {
  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-1.5 rounded-xl shadow-lg border border-white/20">
      <span className="text-xl">⭐</span>
      <span className="text-lg font-black text-white drop-shadow-lg">
        {points}
      </span>
    </div>
  )
})
