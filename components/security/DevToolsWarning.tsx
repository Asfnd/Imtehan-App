'use client'

import { useState, useEffect } from 'react'

/**
 * Lightweight DevToolsWarning - Event-based detection
 * No performance impact - uses resize events instead of intervals
 */
export default function DevToolsWarning() {
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    // Detect DevTools by checking window size changes
    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160
      const heightThreshold = window.outerHeight - window.innerHeight > 160
      
      if (widthThreshold || heightThreshold) {
        setShowWarning(true)
      }
    }

    // Only check on resize (not on interval)
    window.addEventListener('resize', checkDevTools)
    checkDevTools() // Initial check

    return () => window.removeEventListener('resize', checkDevTools)
  }, [])

  if (!showWarning) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white px-4 py-2 text-center text-sm font-semibold z-[9999] shadow-lg">
      ⚠️ Developer tools detected. Content is protected.
    </div>
  )
}
