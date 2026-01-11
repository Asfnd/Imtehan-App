'use client'
// Solved Papers PDF Viewer - Based on past papers viewer
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getSolvedPaperUrl } from '@/lib/simple-pdf-storage'
import { ArrowLeft } from 'lucide-react'
import CleanPDFViewer from '@/components/pdf/CleanPDFViewer'

// Prevent page caching
if (typeof window !== 'undefined') {
  // Disable back-forward cache
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      window.location.reload()
    }
  })
}

function SolvedPaperViewerContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const subject = searchParams.get('subject')

  const paperId = searchParams.get('id')
  
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [useFallback, setUseFallback] = useState(false)
  const [paperInfo, setPaperInfo] = useState<any>(null)
  
  // Detect Safari on iOS
  const isSafariMobile = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)
  
  // Prevent browser from caching this page
  useEffect(() => {
    // Set cache control meta tags dynamically
    const metaCache = document.createElement('meta')
    metaCache.httpEquiv = 'Cache-Control'
    metaCache.content = 'no-cache, no-store, must-revalidate'
    document.head.appendChild(metaCache)
    
    const metaPragma = document.createElement('meta')
    metaPragma.httpEquiv = 'Pragma'
    metaPragma.content = 'no-cache'
    document.head.appendChild(metaPragma)
    
    const metaExpires = document.createElement('meta')
    metaExpires.httpEquiv = 'Expires'
    metaExpires.content = '0'
    document.head.appendChild(metaExpires)
    
    return () => {
      document.head.removeChild(metaCache)
      document.head.removeChild(metaPragma)
      document.head.removeChild(metaExpires)
    }
  }, [])

  // Force fresh load on mount and when params change
  useEffect(() => {
    if (paperId || subject) {
      // Clear any previous state
      setPdfUrl(null)
      setError(null)
      setLoading(true)
      
      // Load with slight delay to ensure state is cleared
      const timer = setTimeout(() => {
        loadSolvedPaper()
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [paperId, subject])

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

  async function loadSolvedPaper() {
    try {
      setError(null)
      setPdfUrl(null) // Clear previous URL to force fresh load
      
      // Create paper info
      const mockPaperInfo = {
        id: paperId || '1',
        subject: subject || 'CSS Solved Papers',
        description: 'Comprehensive solved papers for CSS examination (2016-2021)',
        year_range: '2016-2021',
        total_pages: 150
      }
      
      setPaperInfo(mockPaperInfo)
      
      console.log('🔍 Loading solved paper for ID:', paperId)
      console.log('🔄 Force clearing any cached URLs...')
      
      // Use the new getSolvedPaperUrl function with aggressive cache-busting
      const result = await getSolvedPaperUrl(paperId || undefined)
      
      if (result.success && result.url) {
        console.log('✅ Solved paper loaded with fresh URL:', result.foundAt)
        console.log('📄 URL includes cache buster to prevent stale content')
        setPdfUrl(result.url)
        setError(null)
      } else {
        console.log('❌ Solved paper not found:', result.error)
        setError(result.error || 'Solved paper not found in storage')
      }
      
    } catch (error) {
      console.error('❌ Error loading solved paper:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePDFLoad = () => {
    console.log('✅ Solved paper PDF loaded successfully')
    setError(null)
  }



  // Remove unused scroll functionality



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          {/* Animated Document Stack */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto">
              {/* Background layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-red-400 rounded-3xl transform rotate-6 opacity-30 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl transform -rotate-3 opacity-40 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              
              {/* Main document */}
              <div className="relative w-24 h-24 bg-gradient-to-br from-orange-500 via-red-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Elegant Spinner */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-orange-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-t-orange-600 border-r-red-600 border-b-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
          </div>
          
          {/* Professional Message */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Preparing Your Solved Paper
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We're loading comprehensive solutions for CSS examination. This may take a moment.
          </p>
          
          {/* Animated Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 rounded-full animate-loading-progress"></div>
          </div>
          
          {/* Helpful Tip */}
          <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-orange-200">
            <p className="text-xs text-gray-600">
              💡 <span className="font-semibold">Tip:</span> For the best experience, ensure you have a stable internet connection.
            </p>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes loading-progress {
            0% {
              width: 0%;
              transform: translateX(0);
            }
            50% {
              width: 70%;
            }
            100% {
              width: 100%;
              transform: translateX(0);
            }
          }
          .animate-loading-progress {
            animation: loading-progress 2.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    )
  }

  if (error || !pdfUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {error ? 'Error Loading Solved Paper' : 'Solved Paper Not Found'}
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            {error || 'The requested solved paper could not be found.'}
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
            <p className="text-xs text-gray-600 mb-2">Debug Info:</p>
            <p className="text-xs text-gray-800">Paper ID: {paperId}</p>
            <p className="text-xs text-gray-800">Subject: {subject}</p>

            <p className="text-xs text-gray-800">PDF URL: {pdfUrl ? 'Available' : 'Not available'}</p>
            <p className="text-xs text-gray-800">Error: {error || 'None'}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              ← Go Back
            </button>
            <button
              onClick={() => {
                setLoading(true)
                setError(null)
                loadSolvedPaper()
              }}
              className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:shadow-lg transition-all border border-gray-200"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Mobile: Show "Open PDF" button instead of embedded viewer
  if (useFallback || isSafariMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          {/* PDF Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-5xl">📄</span>
          </div>
          
          {/* Title */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {paperInfo?.subject || subject}
          </h1>
          <p className="text-sm text-gray-500 mb-8">{paperInfo?.description}</p>
          
          {/* Info Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-white/60">
            <p className="text-sm text-gray-700 mb-4">
              📱 For the best mobile experience, open this solved paper in your device's native PDF viewer.
            </p>
            <p className="text-xs text-gray-500">
              You'll be able to zoom, annotate, and navigate easily through the solutions.
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <a
              href={pdfUrl || ''}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              📖 Open Solved Paper
            </a>
            
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:shadow-lg transition-all border border-gray-200 active:scale-95"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Modern Premium Header - Mobile Optimized */}
      <div className="bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-2xl shadow-xl border-b border-white/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-4">
          {/* Mobile Layout: Stacked */}
          <div className="md:hidden space-y-2.5">
            {/* Top Row: Back + Title */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.back()}
                className="group p-2.5 hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-500 bg-gray-100 rounded-lg transition-all flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
              </button>
              <div className="flex-1 min-w-0">
                <h1 className="font-bold text-sm bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent truncate">
                  {paperInfo?.subject || subject}
                </h1>
              </div>
            </div>


          </div>

          {/* Desktop Layout: Single Row */}
          <div className="hidden md:flex items-center justify-between gap-4">
            {/* Left: Title & Back Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="group p-3 hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-500 bg-gray-100 rounded-xl transition-all hover:shadow-lg"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
              </button>
              <div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  {paperInfo?.subject || subject}
                </h1>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="w-full relative min-h-screen" style={{ height: 'calc(100vh - 120px)', minHeight: 'calc(100vh - 200px)' }}>
        <CleanPDFViewer
          pdfUrl={pdfUrl}
          title={paperInfo?.subject || subject || 'Solved Paper'}
          className="w-full h-full"
          onLoad={handlePDFLoad}
        />
      </div>

    </div>
  )
}

export default function SolvedPaperViewerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-10 h-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Initializing Viewer</h3>
          <p className="text-gray-600 text-sm">Setting up your document viewer...</p>
        </div>
      </div>
    }>
      <SolvedPaperViewerContent />
    </Suspense>
  )
}