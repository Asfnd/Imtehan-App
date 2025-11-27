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

// Configure PDF.js worker - only on client with error handling
if (typeof window !== 'undefined') {
  import('react-pdf').then(mod => {
    mod.pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${mod.pdfjs.version}/pdf.worker.min.js`
  }).catch(err => {
    console.error('Failed to load PDF.js:', err)
  })
}

function PDFViewerContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const subject = searchParams.get('subject')
  const year = searchParams.get('year')
  
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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

  // Calculate page width for optimal display
  const getPageWidth = () => {
    if (typeof window === 'undefined') return undefined
    const isMobile = window.innerWidth < 768
    return isMobile ? window.innerWidth - 32 : Math.min(window.innerWidth - 64, 900)
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
      setError(null)
      
      if (!subject || !year) {
        setError('Missing subject or year parameter')
        setLoading(false)
        return
      }

      // Convert subject to kebab-case for storage path
      const subjectKebab = subject.toLowerCase().replace(/\s+/g, '-')
      
      // Find the PDF file in the subject/year folder
      const { data: files, error: listError } = await supabase.storage
        .from('css-past-papers')
        .list(`${subjectKebab}/${year}`)

      if (listError) {
        console.error('Storage list error:', listError)
        setError('Failed to access storage. Please try again.')
        setLoading(false)
        return
      }

      if (!files || files.length === 0) {
        setError('No files found for this paper')
        setLoading(false)
        return
      }

      const pdfFile = files.find(f => f.name.endsWith('.pdf'))
      
      if (!pdfFile) {
        setError('PDF file not found for this paper')
        setLoading(false)
        return
      }
      
      // Get signed URL for authenticated access
      const { data: signedData, error: signedError } = await supabase.storage
        .from('css-past-papers')
        .createSignedUrl(`${subjectKebab}/${year}/${pdfFile.name}`, 3600) // 1 hour

      if (signedError) {
        console.error('Signed URL error:', signedError)
        setError('Failed to generate secure access link')
        setLoading(false)
        return
      }

      if (!signedData?.signedUrl) {
        setError('Failed to load PDF URL')
        setLoading(false)
        return
      }

      setPdfUrl(signedData.signedUrl)
      setError(null)
    } catch (error) {
      console.error('Error loading PDF:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setError(null)
  }

  function onDocumentLoadError(error: Error) {
    console.error('PDF load error:', error)
    setError('Failed to load PDF document. The file may be corrupted.')
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

  if (error || !pdfUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {error ? 'Error Loading PDF' : 'PDF Not Found'}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'The requested PDF could not be found. It may have been moved or deleted.'}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              ← Go Back
            </button>
            {error && (
              <button
                onClick={() => {
                  setLoading(true)
                  setError(null)
                  loadPDF()
                }}
                className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:shadow-lg transition-all border border-gray-200"
              >
                🔄 Try Again
              </button>
            )}
          </div>
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
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex flex-col items-center justify-center min-h-full py-20">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-600 border-r-indigo-600 absolute top-0 left-0"></div>
                  </div>
                  <p className="mt-4 text-gray-600 font-medium">Loading PDF...</p>
                </div>
              }
              error={
                <div className="text-center p-8 min-h-full flex flex-col items-center justify-center py-20">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-4xl">⚠️</span>
                  </div>
                  <p className="text-red-600 font-bold text-lg mb-2">Failed to load PDF</p>
                  <p className="text-gray-600 text-sm mb-6 max-w-md">
                    The PDF document could not be loaded. This may be due to a corrupted file or network issue.
                  </p>
                  <button
                    onClick={() => {
                      setLoading(true)
                      setError(null)
                      setPdfUrl(null)
                      loadPDF()
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    🔄 Reload PDF
                  </button>
                </div>
              }
              options={pdfOptions}
            >
              <Page
                pageNumber={pageNumber}
                width={getPageWidth()}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="pdf-page-shadow"
                onRenderError={(error) => {
                  console.error('Page render error:', error)
                }}
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
