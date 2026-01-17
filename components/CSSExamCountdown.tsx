'use client'

import { useState, useEffect } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CSSExamCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      // CSS Exam: February 4, 2025 at 9:00 AM PKT
      const examDate = new Date('2025-02-04T09:00:00+05:00')
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

  return (
    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-purple-200/30 backdrop-blur-sm shadow-sm">
      <span className="text-sm font-medium text-purple-700">
        🎓 CSS 2025
      </span>
      <div className="h-4 w-px bg-purple-300/40"></div>
      <div className="flex items-center gap-1.5">
        <div className="flex items-baseline gap-0.5">
          <span className="text-lg font-bold text-purple-900 tabular-nums">{timeLeft.days}</span>
          <span className="text-[10px] font-medium text-purple-600">d</span>
        </div>
        <span className="text-purple-400">:</span>
        <div className="flex items-baseline gap-0.5">
          <span className="text-lg font-bold text-purple-900 tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-[10px] font-medium text-purple-600">h</span>
        </div>
        <span className="text-purple-400">:</span>
        <div className="flex items-baseline gap-0.5">
          <span className="text-lg font-bold text-purple-900 tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-[10px] font-medium text-purple-600">m</span>
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
      const examDate = new Date('2025-02-04T09:00:00+05:00')
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
      📅 CSS 2025 Exam in <span className="font-semibold text-purple-600">{days} days</span>
    </span>
  )
}
