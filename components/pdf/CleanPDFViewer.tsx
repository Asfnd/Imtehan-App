'use client'

import { useState, useEffect, useRef } from 'react'
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'

interface CleanPDFViewerProps {
  pdfUrl: string
  title?: string
  className?: string
  onLoad?: () => void
}

export default function CleanPDFViewer({ 
  pdfUrl, 
  className = '',
  onLoad
}: CleanPDFViewerProps) {
  const [error, setError] = useState<string | null>(null)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (onLoad) {
      onLoad()
    }
  }, [pdfUrl, onLoad])

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (err) {
      console.error('Fullscreen error:', err)
    }
  }

  const zoomIn = () => setZoom(prev => Math.min(200, prev + 10))
  const zoomOut = () => setZoom(prev => Math.max(50, prev - 10))
  const rotate = () => setRotation(prev => (prev + 90) % 360)
  const resetZoom = () => setZoom(100)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Comprehensive protection against downloads and printing
  useEffect(() => {
    const blockRightClick = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    const blockKeyboardShortcuts = (e: KeyboardEvent) => {
      // Block Ctrl+S, Cmd+S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      // Block Ctrl+P, Cmd+P (Print)
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      // Block F12, Ctrl+Shift+I, Cmd+Option+I (DevTools)
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'i')
      ) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      // Block Ctrl+U, Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      // Block Ctrl+Shift+C, Cmd+Option+C (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'c') {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    const blockDragStart = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    const blockCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('contextmenu', blockRightClick)
      container.addEventListener('keydown', blockKeyboardShortcuts)
      container.addEventListener('dragstart', blockDragStart)
      container.addEventListener('copy', blockCopy)
      container.addEventListener('cut', blockCopy)
    }

    // Global print blocking
    const beforePrint = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    window.addEventListener('beforeprint', beforePrint)

    return () => {
      if (container) {
        container.removeEventListener('contextmenu', blockRightClick)
        container.removeEventListener('keydown', blockKeyboardShortcuts)
        container.removeEventListener('dragstart', blockDragStart)
        container.removeEventListener('copy', blockCopy)
        container.removeEventListener('cut', blockCopy)
      }
      window.removeEventListener('beforeprint', beforePrint)
    }
  }, [])

  if (error) {
    return (
      <div className={`relative bg-gray-50 flex items-center justify-center ${className}`}>
        <div className="text-center p-8 max-w-md">
          <div className="text-red-600 mb-4 text-6xl">⚠️</div>
          <h3 className="text-xl font-bold text-red-800 mb-3">Failed to Load PDF</h3>
          <p className="text-sm text-red-600 mb-6">{error}</p>
          <button
            onClick={() => {
              setError(null)
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`relative bg-gray-900 ${className}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="absolute top-4 right-4 z-40 flex gap-2">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl flex items-center gap-1 p-1 border border-gray-200">
          <button
            onClick={zoomOut}
            className="p-2 hover:bg-blue-50 rounded transition-all duration-200 active:scale-95"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={resetZoom}
            className="text-sm font-semibold text-gray-700 min-w-[60px] text-center px-2 hover:bg-blue-50 rounded transition-all duration-200 active:scale-95"
            title="Reset Zoom"
          >
            {zoom}%
          </button>
          <button
            onClick={zoomIn}
            className="p-2 hover:bg-blue-50 rounded transition-all duration-200 active:scale-95"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <button
          onClick={rotate}
          className="bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-xl hover:bg-blue-50 transition-all duration-200 border border-gray-200 active:scale-95"
          title="Rotate 90°"
        >
          <RotateCw 
            className="w-5 h-5 text-gray-700" 
            style={{ 
              transform: `rotate(${rotation}deg)`, 
              transition: 'transform 0.3s ease' 
            }} 
          />
        </button>

        <button
          onClick={toggleFullscreen}
          className="bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-xl hover:bg-blue-50 transition-all duration-200 border border-gray-200 active:scale-95"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 text-gray-700" />
          ) : (
            <Maximize2 className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      <div 
        className="w-full h-full bg-gray-800 flex items-start justify-center p-4 relative"
        style={{ overflow: 'hidden' }}
        onContextMenu={(e) => {
          e.preventDefault()
          e.stopPropagation()
          return false
        }}
      >
          {/* Scrollable container */}
          <div 
            className="absolute inset-0 overflow-auto"
            style={{ padding: '1rem', zIndex: 10 }}
            onContextMenu={(e) => {
              e.preventDefault()
              e.stopPropagation()
              return false
            }}
            onMouseDown={(e) => {
              if (e.button === 2) {
                e.preventDefault()
                e.stopPropagation()
                return false
              }
            }}
            onDragStart={(e) => {
              e.preventDefault()
              e.stopPropagation()
              return false
            }}
          >
          <div
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center top',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              width: '100%',
              minHeight: '100vh',
              position: 'relative'
            }}
            onContextMenu={(e) => {
              e.preventDefault()
              e.stopPropagation()
              return false
            }}
          >
            <iframe
              ref={iframeRef}
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              className="w-full border-0 bg-white shadow-2xl"
              style={{ 
                display: 'block',
                height: '100vh',
                pointerEvents: 'auto',
                touchAction: 'pan-x pan-y pinch-zoom'
              }}
              title="PDF Viewer"
              onContextMenu={(e) => {
                e.preventDefault()
                e.stopPropagation()
                return false
              }}
            />
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        iframe::-webkit-pdf-viewer-toolbar {
          display: none !important;
        }
        iframe {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        @media print {
          body * {
            visibility: hidden !important;
          }
          body::before {
            content: "Printing is disabled for this content" !important;
            visibility: visible !important;
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            font-size: 24px !important;
            color: #000 !important;
          }
        }
      `}</style>
    </div>
  )
}
