'use client'

import { useState, useEffect, Suspense, useMemo, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react'
import dynamic from 'next/dynamic'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import './viewer.css'

// Dynamically import react-pdf to avoid SSR issues
const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), { ssr: false })
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), { ssr: false })

// Configure PDF.js worker - only on client
if (typeof window !== 'undefined') {
  import('react-pdf').then(mod => {
    mod.pdfjs.GlobalWorkerOptions.workerSrc = '/pdf-worker/pdf.worker.min.mjs'
  })
}

function PDFViewerContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const subject = searchParams.get('subject')
  const year = searchParams.get('year')
  
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)
  const [containerHeight, setContainerHeight] = useState<number>(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // Memoize PDF options to prevent unnecessary reloads
  const pdfOptions = useMemo(() => ({
    cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
    cMapPacked: true,
  }), [])

  useEffect(() => {
    if (subject && year) {
      loadPDF()
    }
  }, [subject, year])

  // Calculate container height for fit-to-page
  useEffect(() => {
    const updateDimensions = () => {
      setContainerHeight(window.innerHeight)
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Calculate page height for optimal readable fit
  const getPageHeight = () => {
    if (containerHeight === 0) return undefined
    
    // Optimal calculation: maximize readable space while fitting whole page
    // Mobile gets more space, desktop gets comfortable viewing
    const isMobile = containerHeight < 700
    const spacing = isMobile ? 120 : 145
    
    const availableHeight = containerHeight - spacing
    
    // Return height that's easily readable and nicely fitted
    return availableHeight
  }

  // Prevent keyboard shortcuts for saving and printing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+S (Save) and Ctrl+P (Print)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p')) {
        e.preventDefault()
        return false
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  async function loadPDF() {
    try {
      // Convert subject to kebab-case for storage path
      const subjectKebab = subject?.toLowerCase().replace(/\s+/g, '-')
      
      // Find the PDF file in the subject/year folder
      const { data: files, error } = await supabase.storage
        .from('css-past-papers')
        .list(`${subjectKebab}/${year}`)

      if (error) throw error

      const pdfFile = files?.find(f => f.name.endsWith('.pdf'))
      
      if (pdfFile) {
        // Get signed URL for authenticated access
        const { data: signedData, error: signedError } = await supabase.storage
          .from('css-past-papers')
          .createSignedUrl(`${subjectKebab}/${year}/${pdfFile.name}`, 3600) // 1 hour

        if (signedError) throw signedError

        setPdfUrl(signedData.signedUrl)
      }
    } catch (error) {
      console.error('Error loading PDF:', error)
    } finally {
      setLoading(false)
    }
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const formatSubjectName = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading PDF...</p>
        </div>
      </div>
    )
  }

  if (!pdfUrl) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">PDF not found</p>
          <button
            onClick={() => router.back()}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${isFullscreen ? 'bg-black' : ''}`}
    >
      {/* Modern Premium Header */}
      <div className="bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-2xl shadow-xl border-b border-white/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left: Title & Back Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="group p-3 hover:bg-gradient-to-br hover:from-blue-500 hover:to-indigo-500 bg-gray-100 rounded-xl transition-all hover:shadow-lg"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
              </button>
              <div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {subject && formatSubjectName(subject)}
                </h1>
                <p className="text-sm text-gray-600 font-medium">📄 Year {year} Past Paper</p>
              </div>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Zoom Controls */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                  className="p-2 hover:bg-white rounded-lg transition-all hover:shadow-md"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5 text-gray-700" />
                </button>
                <span className="text-sm font-bold text-gray-700 min-w-[60px] text-center px-2">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={() => setScale(s => Math.min(2.0, s + 0.1))}
                  className="p-2 hover:bg-white rounded-lg transition-all hover:shadow-md"
                  title="Zoom In"
                >
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-3 bg-gray-100 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-xl transition-all hover:shadow-lg group"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
                ) : (
                  <Maximize className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
                )}
              </button>

              {/* Page Navigation */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-1 shadow-lg">
                <button
                  onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                  disabled={pageNumber <= 1}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-bold text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                <span className="text-sm font-bold text-white px-3">
                  {pageNumber} / {numPages}
                </span>
                <button
                  onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                  disabled={pageNumber >= numPages}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-bold text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer - Fully Scrollable */}
      <div 
        className="pdf-viewer-container overflow-auto w-full relative"
        style={{ height: isFullscreen ? '100vh' : 'calc(100vh - 140px)' }}
        onContextMenu={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        <div className="flex justify-center p-4 min-h-full">
          <div className="relative">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex flex-col items-center justify-center min-h-full">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-600 border-r-indigo-600 absolute top-0 left-0"></div>
                  </div>
                  <p className="mt-4 text-gray-600 font-medium">Loading PDF...</p>
                </div>
              }
              error={
                <div className="text-center p-8 min-h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⚠️</span>
                  </div>
                  <p className="text-red-600 font-semibold mb-2">Failed to load PDF</p>
                  <p className="text-gray-600 text-sm">Please try again or contact support</p>
                </div>
              }
              options={pdfOptions}
            >
              <Page
                pageNumber={pageNumber}
                height={getPageHeight()}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="pdf-page-shadow"
              />
            </Document>
          </div>
        </div>
      </div>
      
      {/* Page Info Footer - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 py-2 z-10">
        <p className="text-center text-xs sm:text-sm text-gray-600 font-medium px-2">
          📖 Page {pageNumber} of {numPages} • {subject && formatSubjectName(subject)} ({year})
        </p>
      </div>
    </div>
  )
}

export default function PDFViewerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <PDFViewerContent />
    </Suspense>
  )
}
