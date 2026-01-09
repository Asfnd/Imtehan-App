'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import CleanPDFViewer from '@/components/pdf/CleanPDFViewer'
import { ArrowLeft, Download } from 'lucide-react'

function GuessPaperViewerContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const filename = searchParams.get('file')
  const title = searchParams.get('title')

  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (filename) {
      // Construct URL to public folder PDF
      const url = `/guess-papers-2026/${filename}`
      setPdfUrl(url)
      setLoading(false)
    } else {
      setError('No file specified')
      setLoading(false)
    }
  }, [filename])

  const handleDownload = () => {
    if (filename) {
      const link = document.createElement('a')
      link.href = `/guess-papers-2026/${filename}`
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading guess paper...</p>
        </div>
      </div>
    )
  }

  if (error || !pdfUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading PDF</h3>
          <p className="text-gray-600 mb-6">{error || 'File not found'}</p>
          <button
            onClick={() => router.push('/css/guess-papers')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
          >
            Back to Guess Papers
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back Button */}
            <button
              onClick={() => router.push('/css/guess-papers')}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium hidden sm:inline">Back</span>
            </button>

            {/* Center: Title */}
            <div className="flex-1 text-center px-4">
              <h1 className="text-lg font-bold text-gray-900 truncate">
                {title ? decodeURIComponent(title) : 'Guess Paper'}
              </h1>
              <p className="text-xs text-gray-500">CSS 2026</p>
            </div>

            {/* Right: Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="h-[calc(100vh-4rem)]">
        <CleanPDFViewer
          pdfUrl={pdfUrl}
          title={title ? decodeURIComponent(title) : 'Guess Paper'}
        />
      </div>
    </div>
  )
}

export default function GuessPaperViewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    }>
      <GuessPaperViewerContent />
    </Suspense>
  )
}
