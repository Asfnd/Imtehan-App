'use client'

import { useState, useEffect, useRef } from 'react'
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'

interface CleanPDFViewerProps {
  pdfUrl: string
  title?: string
  className?: string
  onLoad?: () => void
  onError?: (error: string) => void
}

export default function CleanPDFViewer({
  pdfUrl,
  className = '',
  onLoad,
  onError
}: CleanPDFViewerProps) {
  const [error, setError] = useState<string | null>(null)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Convert R2 URL to proxy URL
  const getProxyUrl = (url: string): string => {
    const encodedUrl = encodeURIComponent(url)
    // Add cache buster for retries
    const cacheBuster = retryCount > 0 ? `&retry=${retryCount}` : ''
    return `/api/pdf/proxy?url=${encodedUrl}${cacheBuster}`
  }

  const proxiedPdfUrl = getProxyUrl(pdfUrl)

  // Retry loading the PDF
  const handleRetry = () => {
    setError(null)
    setIsLoading(true)
    setRetryCount(prev => prev + 1)
  }

  // Monitor iframe loading with error handling
  useEffect(() => {
    if (!iframeRef.current) return

    const iframe = iframeRef.current
    setError(null)
    setIsLoading(true)

    const loadTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn('⚠️  PDF loading timeout')
        setIsLoading(false)
        const errorMsg = 'PDF is taking longer than expected to load'
        setError(errorMsg)
        if (onError) onError(errorMsg)
      }
    }, 30000) // 30 second timeout

    const handleLoad = () => {
      console.log('✅ PDF loaded successfully')
      setIsLoading(false)
      clearTimeout(loadTimeout)
      if (onLoad) onLoad()
    }

    const handleError = () => {
      console.error('❌ Failed to load PDF iframe')
      setIsLoading(false)
      clearTimeout(loadTimeout)
      const errorMsg = 'Failed to load PDF. The file may be temporarily unavailable.'
      setError(errorMsg)
      if (onError) onError(errorMsg)
    }

    iframe.addEventListener('load', handleLoad)
    iframe.addEventListener('error', handleError)

    return () => {
      clearTimeout(loadTimeout)
      iframe.removeEventListener('load', handleLoad)
      iframe.removeEventListener('error', handleError)
    }
  }, [pdfUrl, retryCount, onLoad, onError])

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

  if (error) {
    return (
      <div className={`relative bg-gray-50 flex items-center justify-center ${className}`}>
        <div className="text-center p-8 max-w-md">
          <div className="text-red-600 mb-4 text-6xl">⚠️</div>
          <h3 className="text-xl font-bold text-red-800 mb-3">Failed to Load PDF</h3>
          <p className="text-sm text-red-600 mb-2">{error}</p>
          {retryCount > 0 && (
            <p className="text-xs text-gray-500 mb-4">Retry attempt: {retryCount}</p>
          )}
          <p className="text-xs text-gray-600 mb-6">
            If the problem persists, the PDF may be temporarily unavailable.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
            >
              🔄 Try Again
            </button>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
            >
              📥 Direct Download
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative bg-gray-900 ${className}`}>
      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-gray-900/95 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-white text-lg font-semibold">Loading PDF...</p>
            <p className="text-gray-400 text-sm mt-2">This may take a moment</p>
          </div>
        </div>
      )}

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

      <div className="w-full h-full bg-gray-800 flex items-start justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-auto" style={{ padding: '1rem', zIndex: 10 }}>
          <div
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center top',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              width: '100%',
              minHeight: '100vh',
            }}
          >
            <iframe
              ref={iframeRef}
              src={`${proxiedPdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              className="w-full border-0 bg-white shadow-2xl"
              style={{
                display: 'block',
                height: '100vh',
              }}
              title="PDF Viewer"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
