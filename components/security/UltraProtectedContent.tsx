'use client'

/**
 * Lightweight UltraProtectedContent - Optimized for performance
 * CSS-only protection without heavy event listeners
 */

interface UltraProtectedContentProps {
  children: React.ReactNode
}

export default function UltraProtectedContent({ children }: UltraProtectedContentProps) {
  return (
    <div
      className="select-none"
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </div>
  )
}
