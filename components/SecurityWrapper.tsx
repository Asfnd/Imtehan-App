'use client'

import { useEffect } from 'react'

/**
 * Security wrapper component to prevent content scraping and unauthorized copying
 * Applies to premium content like solved papers and quiz questions
 */
export function SecurityWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Disable common keyboard shortcuts for copying/saving
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+C, Ctrl+X, Ctrl+S, Ctrl+P, F12 (DevTools)
      if (
        (e.ctrlKey || e.metaKey) &&
        ['c', 'x', 's', 'p', 'a', 'u'].includes(e.key.toLowerCase())
      ) {
        // Allow Ctrl+A for selecting text for reading, but prevent copy
        if (e.key.toLowerCase() === 'a') {
          return // Allow text selection
        }
        e.preventDefault()
        return false
      }

      // Disable F12 (DevTools), Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault()
        return false
      }
    }

    // Disable text selection via CSS (applied via data attribute)
    document.body.setAttribute('data-no-select', 'true')

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    // Prevent drag and drop of images/content
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }
    document.addEventListener('dragstart', handleDragStart)

    // Watermark detection (optional - prevents screenshot sharing)
    const addWatermark = () => {
      const existingWatermark = document.getElementById('security-watermark')
      if (!existingWatermark) {
        const watermark = document.createElement('div')
        watermark.id = 'security-watermark'
        watermark.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 120px;
          color: rgba(0, 0, 0, 0.03);
          pointer-events: none;
          user-select: none;
          z-index: 9999;
          font-weight: bold;
          white-space: nowrap;
        `
        watermark.textContent = 'PREMIUM CONTENT'
        document.body.appendChild(watermark)
      }
    }
    addWatermark()

    // Cleanup
    return () => {
      document.body.removeAttribute('data-no-select')
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('dragstart', handleDragStart)
      const watermark = document.getElementById('security-watermark')
      if (watermark) {
        watermark.remove()
      }
    }
  }, [])

  return <>{children}</>
}

// Add global styles for text selection prevention
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    [data-no-select="true"] {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    /* Prevent text selection on PDF and quiz content */
    [data-no-select="true"] .pdf-content,
    [data-no-select="true"] .quiz-content,
    [data-no-select="true"] .premium-content {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
    }

    /* Prevent image dragging */
    [data-no-select="true"] img {
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
      pointer-events: none;
    }
  `
  if (!document.head.querySelector('#security-styles')) {
    style.id = 'security-styles'
    document.head.appendChild(style)
  }
}
