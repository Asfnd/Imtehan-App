'use client'

import { useState, useEffect } from 'react'

/**
 * Lightweight DevToolsWarning - Event-based detection
 * Disabled on mobile devices to prevent false positives
 */
export default function DevToolsWarning() {
  const [showWarning, setShowWarning] = useState(false)
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
    
    // Skip DevTools detection on mobile devices
    if (isMobile) return

    // Detect DevTools by checking window size changes (desktop only)
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
  }, [isMobile])

  // Don't show warning on mobile devices
  if (!showWarning || isMobile) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white px-4 py-2 text-center text-sm font-semibold z-[9999] shadow-lg">
      ⚠️ Developer tools detected. Content is protected.
    </div>
  )
}
