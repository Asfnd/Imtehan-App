'use client'

import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

interface ConfettiCelebrationProps {
  trigger: boolean
  intensity?: 'low' | 'medium' | 'high'
}

/**
 * ConfettiCelebration Component
 * Triggers confetti animations for correct answers and milestones
 * Disabled on mobile devices for better performance
 */
export function ConfettiCelebration({
  trigger,
  intensity = 'medium',
}: ConfettiCelebrationProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768
      setIsMobile(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Skip confetti on mobile devices
    if (!trigger || isMobile) return

    try {
      const configs = {
        low: {
          particleCount: 30,
          spread: 50,
          origin: { y: 0.7 },
          colors: ['#9333ea', '#3b82f6', '#10b981'],
        },
        medium: {
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#9333ea', '#3b82f6', '#10b981', '#f59e0b'],
        },
        high: {
          particleCount: 100,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#9333ea', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
          ticks: 200,
        },
      }

      const config = configs[intensity]

      // Fire confetti
      confetti(config)

      // For high intensity, fire one additional burst
      if (intensity === 'high') {
        setTimeout(() => {
          confetti({
            ...config,
            particleCount: 50,
          })
        }, 150)
      }
    } catch (error) {
      console.warn('Confetti animation failed:', error)
    }
  }, [trigger, intensity, isMobile])

  return null
}
