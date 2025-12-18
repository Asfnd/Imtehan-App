'use client'

import { useEffect } from 'react'

/**
 * Lightweight Content Protection Component
 * Prevents scraping, copying, and unauthorized access without affecting performance
 */
export default function ContentProtection() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Disable keyboard shortcuts for copying, printing, and saving
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Cmd+C (Copy)
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault()
        return false
      }
      // Prevent Ctrl+S, Cmd+S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        return false
      }
      // Prevent Ctrl+P, Cmd+P (Print)
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault()
        return false
      }
      // Prevent Ctrl+U, Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault()
        return false
      }
      // Prevent Ctrl+Shift+I, Cmd+Option+I (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        return false
      }
      // Prevent F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault()
        return false
      }
    }

    // Disable text selection via mouse
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement
      // Allow selection in input fields and textareas
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return true
      }
      e.preventDefault()
      return false
    }

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('dragstart', handleDragStart)

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('dragstart', handleDragStart)
    }
  }, [])

  return null // No UI, just event listeners
}
