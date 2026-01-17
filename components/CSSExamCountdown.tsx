'use client'

import { useState, useEffect } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CSSExamCountdownProps {
  variant?: 'home' | 'css'
}

export function CSSExamCountdown({ variant = 'home' }: CSSExamCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      // CSS Exam: February 4, 2026 at 9:00 AM PKT
      const examDate = new Date('2026-02-04T09:00:00+05:00')
      const now = new Date()
      const difference = examDate.getTime() - now.getTime()

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    // Update immediately
    setTimeLeft(calculateTimeLeft())

    // Then update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Don't render on server (prevents hydration mismatch)
  if (!mounted) {
    return null
  }

  // Hide if exam has passed
  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return null
  }

  // Different backgrounds for different pages
  const bgClass = variant === 'css'
    ? 'bg-gradient-to-br from-blue-50 via-white to-blue-50/30'
    : 'bg-white'

  return (
    <div className={`w-full ${bgClass}`}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* CSS Exam label - Before timer */}
        <div className="text-center mb-4">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">CSS 2026</span>
        </div>

        <div className="flex items-center justify-center gap-6 sm:gap-8">
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-black tabular-nums">
              {timeLeft.days}
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-medium mt-1 uppercase tracking-wide">
              DAYS
            </div>
          </div>

          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300">:</div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-black tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-medium mt-1 uppercase tracking-wide">
              HOURS
            </div>
          </div>

          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300">:</div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-black tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-medium mt-1 uppercase tracking-wide">
              MINUTES
            </div>
          </div>

          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300">:</div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-black tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-medium mt-1 uppercase tracking-wide">
              SECONDS
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CSSExamCountdownSimple() {
  const [days, setDays] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateDays = () => {
      // CSS Exam: February 4, 2026 at 9:00 AM PKT
      const examDate = new Date('2026-02-04T09:00:00+05:00')
      const now = new Date()
      const difference = examDate.getTime() - now.getTime()

      if (difference <= 0) return 0
      return Math.ceil(difference / (1000 * 60 * 60 * 24))
    }

    setDays(calculateDays())

    const timer = setInterval(() => {
      setDays(calculateDays())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  if (!mounted || days === 0) {
    return null
  }

  return (
    <span className="text-sm text-gray-600">
      CSS 2026 Exam in <span className="font-semibold text-black">{days} days</span>
    </span>
  )
}
