'use client'

import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'
import { soundManager } from '@/lib/sounds/soundManager'

/**
 * SoundToggle Component
 * Allows users to mute/unmute quiz sounds
 * Persists preference to localStorage
 */
export function SoundToggle() {
  const [enabled, setEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)

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
    <motion.button
      onClick={toggleSound}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-2.5 rounded-lg transition-all ${
        enabled
          ? 'bg-purple-100 hover:bg-purple-200 text-purple-700'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-400'
      }`}
      title={enabled ? 'Mute sounds' : 'Unmute sounds'}
      aria-label={enabled ? 'Mute sounds' : 'Unmute sounds'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: enabled ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {enabled ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  )
}
