'use client'

import { useEffect } from 'react'
import { useAnalytics } from '@/lib/hooks/useAnalytics'

export default function TestGAPage() {
  const analytics = useAnalytics()

  useEffect(() => {
    console.log('Test GA Page loaded')
    console.log('GA ID:', process.env.NEXT_PUBLIC_GA_ID)
    console.log('gtag available:', typeof window !== 'undefined' && !!window.gtag)
    console.log('dataLayer available:', typeof window !== 'undefined' && !!window.dataLayer)
  }, [])

  const testEvent = () => {
    console.log('Sending test event...')
    analytics.trackQuizStart('test-quiz', 'Test Subject')
    alert('Test event sent! Check browser console and GA Real-time reports.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-6">
          Google Analytics Test Page
        </h1>
        
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-bold mb-2">Environment Check:</h2>
            <div className="font-mono text-sm space-y-1">
              <div>GA ID: {process.env.NEXT_PUBLIC_GA_ID || 'Not set'}</div>
              <div>gtag: {typeof window !== 'undefined' && window.gtag ? '✅ Available' : '❌ Not available'}</div>
              <div>dataLayer: {typeof window !== 'undefined' && window.dataLayer ? '✅ Available' : '❌ Not available'}</div>
            </div>
          </div>

          <button
            onClick={testEvent}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
          >
            Send Test Event
          </button>

          <div className="bg-blue-50 p-4 rounded-lg text-sm">
            <h3 className="font-bold mb-2">How to verify:</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>Open browser DevTools (F12)</li>
              <li>Go to Console tab</li>
              <li>Click "Send Test Event" button</li>
              <li>Check for gtag events in console</li>
              <li>Go to Google Analytics → Realtime</li>
              <li>You should see this event appear</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}