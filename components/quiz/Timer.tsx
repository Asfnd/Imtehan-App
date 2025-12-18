'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

interface TimerProps {
  duration: number // in seconds
  onTimeUp: () => void
  isPaused?: boolean
}

export default function Timer({ duration, onTimeUp, isPaused = false }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft, onTimeUp, isPaused])

  const percentage = (timeLeft / duration) * 100
  const isLow = timeLeft <= 5

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock className={`w-5 h-5 ${isLow ? 'text-red-500' : 'text-gray-600'}`} />
          <span className={`font-mono text-lg font-bold ${isLow ? 'text-red-500' : ''}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isLow
              ? 'bg-red-500'
              : percentage > 50
              ? 'bg-green-500'
              : 'bg-yellow-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
