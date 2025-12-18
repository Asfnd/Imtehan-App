'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getPDFUrl } from '@/lib/simple-pdf-storage'
import CleanPDFViewer from '@/components/pdf/CleanPDFViewer'
import { ArrowLeft } from 'lucide-react'

// Prevent page caching
if (typeof window !== 'undefined') {
  // Disable back-forward cache
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      window.location.reload()
    }
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
  const [useFallback, setUseFallback] = useState(false)
  
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
    if (subject && year) {
      // Clear any previous state
      setPdfUrl(null)
      setError(null)
      setLoading(true)
      
      // Load with slight delay to ensure state is cleared
      const timer = setTimeout(() => {
        loadPDF()
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [subject, year])

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

  const loadPDF = async () => {
    try {
      setError(null)
      setPdfUrl(null) // Clear previous URL to force fresh load
      
      if (!subject || !year) {
        setError('Missing subject or year parameter')
        setLoading(false)
        return
      }

      console.log('🔍 Loading PDF for:', { subject, year })
      console.log('🔄 Force clearing any cached URLs...')
      
      // Direct database lookup with aggressive cache-busting
      const pdfResult = await getPDFUrl(subject, parseInt(year))
      
      if (pdfResult.success && pdfResult.url) {
        // Add aggressive cache-busting to the URL
        const timestamp = Date.now()
        const random = Math.random().toString(36).substring(7)
        const cacheBuster = `${timestamp}-${random}`
        
        // Add multiple cache-busting parameters
        const separator = pdfResult.url.includes('?') ? '&' : '?'
        const urlWithCacheBuster = `${pdfResult.url}${separator}v=${cacheBuster}&t=${timestamp}&nocache=${random}`
        
        console.log('✅ PDF URL obtained from database with cache buster')
        console.log('📄 URL includes cache buster to prevent stale content')
        setPdfUrl(urlWithCacheBuster)
        setError(null)
      } else {
        console.log('❌ PDF not found in database:', pdfResult.error)
        setError(pdfResult.error || 'PDF not found')
      }
      
    } catch (error) {
      console.error('❌ Error loading PDF:', error)
      setError(`Failed to load PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }
  
  const handlePDFLoad = () => {
    console.log('✅ PDF loaded successfully')
    setError(null)
  }

  const formatSubjectName = (slug: string) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const convertSubjectForStorage = (displayName: string) => {
    return displayName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[()&]/g, '')
      .replace(/[^a-z0-9-]/g, '')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          {/* Animated Document Stack */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto">
              {/* Background layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-blue-400 rounded-3xl transform rotate-6 opacity-30 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl transform -rotate-3 opacity-40 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              
              {/* Main document */}
              <div className="relative w-24 h-24 bg-gradient-to-br from-purple-500 via-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Elegant Spinner */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-t-purple-600 border-r-blue-600 border-b-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
          </div>
          
          {/* Professional Message */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Preparing Your Past Paper
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Loading {subject && formatSubjectName(subject)} ({year})
          </p>
          
          {/* Animated Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-purple-500 via-blue-600 to-cyan-600 rounded-full animate-loading-progress"></div>
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {error ? 'Error Loading Past Paper' : 'Past Paper Not Found'}
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            {error || 'The requested past paper could not be found.'}
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
            <p className="text-xs text-gray-600 mb-2">Debug Info:</p>
            <p className="text-xs text-gray-800">Subject: {subject}</p>
            <p className="text-xs text-gray-800">Year: {year}</p>
            <p className="text-xs text-gray-800">PDF URL: {pdfUrl ? 'Available' : 'Not available'}</p>
            <p className="text-xs text-gray-800">Error: {error || 'None'}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              ← Go Back
            </button>
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
          </div>
        </div>
      </div>
    )
  }

  // Mobile: Show "Open PDF" button instead of embedded viewer
  if (useFallback || isSafariMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          {/* PDF Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-purple-100 via-blue-100 to-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-5xl">📄</span>
          </div>
          
          {/* Title */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            {subject && formatSubjectName(subject)}
          </h1>
          <p className="text-sm text-gray-500 mb-8">Year {year} Past Paper</p>
          
          {/* Info Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-white/60">
            <p className="text-sm text-gray-700 mb-4">
              📱 For the best mobile experience, open this past paper in your device's native PDF viewer.
            </p>
            <p className="text-xs text-gray-500">
              You'll be able to zoom, annotate, and navigate easily.
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <a
              href={pdfUrl || ''}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              📖 Open Past Paper
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Modern Premium Header */}
      <div className="bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-2xl shadow-xl border-b border-white/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-4">
          {/* Mobile Layout: Stacked */}
          <div className="md:hidden space-y-2.5">
            {/* Top Row: Back + Title */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.back()}
                className="group p-2.5 hover:bg-gradient-to-br hover:from-purple-500 hover:to-blue-500 bg-gray-100 rounded-lg transition-all flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
              </button>
              <div className="flex-1 min-w-0">
                <h1 className="font-bold text-sm bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent truncate">
                  {subject && formatSubjectName(subject)}
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
                className="group p-3 hover:bg-gradient-to-br hover:from-purple-500 hover:to-blue-500 bg-gray-100 rounded-xl transition-all hover:shadow-lg"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
              </button>
              <div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {subject && formatSubjectName(subject)}
                </h1>
                <p className="text-sm text-gray-600">Year {year} Past Paper</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="w-full relative" style={{ height: 'calc(100vh - 120px)' }}>
        <CleanPDFViewer
          pdfUrl={pdfUrl}
          title={`${subject && formatSubjectName(subject)} ${year} Past Paper`}
          className="w-full h-full"
          onLoad={handlePDFLoad}
        />
      </div>
    </div>
  )
}

export default function PDFViewerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading PDF viewer...</p>
      </div>
    </div>}>
      <PDFViewerContent />
    </Suspense>
  )
}