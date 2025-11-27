'use client'

/**
 * Lightweight ProtectedContent - Optimized for performance
 * Only applies CSS-based protection, no heavy event listeners
 */

interface ProtectedContentProps {
  children: React.ReactNode
}

export default function ProtectedContent({ children }: ProtectedContentProps) {
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
