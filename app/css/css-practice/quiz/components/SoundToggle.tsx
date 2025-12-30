'use client'

import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { soundManager } from '@/lib/sounds/soundManager'
import { useHoverAnimation } from '@/lib/hooks/useAnimation'

/**
 * SoundToggle Component
 * Allows users to mute/unmute quiz sounds
 * Persists preference to localStorage
 */
export function SoundToggle() {
  const [enabled, setEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)
  const hoverAnimation = useHoverAnimation('scaleSm')

  // Load saved preference on mount
  useEffect(() => {
    setMounted(true)
    const isEnabled = soundManager.isEnabled()
    setEnabled(isEnabled)
  }, [])

  const toggleSound = () => {
    const newState = !enabled
    setEnabled(newState)
    soundManager.setEnabled(newState)

    // Play a test sound when enabling
    if (newState && soundManager.isReady()) {
      soundManager.play('correct')
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-100 animate-pulse" />
    )
  }

  return (
    <button
      onClick={toggleSound}
      className={`p-2.5 rounded-lg transition-all ${
        enabled
          ? 'bg-purple-100 hover:bg-purple-200 text-purple-700'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-400'
      } ${hoverAnimation}`}
      title={enabled ? 'Mute sounds' : 'Unmute sounds'}
      aria-label={enabled ? 'Mute sounds' : 'Unmute sounds'}
    >
      <div className={`transition-transform duration-300 ${enabled ? '' : 'rotate-180'}`}>
        {enabled ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </div>
    </button>
  )
}
