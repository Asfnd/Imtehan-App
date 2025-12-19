'use client'

import { useAnalytics } from '@/lib/hooks/useAnalytics'
import { useState } from 'react'

/**
 * Analytics Test Component
 * Use this to verify Google Analytics is working
 * Remove this component in production
 */
export function AnalyticsTest() {
  const analytics = useAnalytics()
  const [testResults, setTestResults] = useState<string[]>([])

  const runTests = () => {
    const results: string[] = []
    
    // Test 1: Check if GA ID is configured
    const gaId = process.env.NEXT_PUBLIC_GA_ID
    if (gaId && gaId !== 'G-XXXXXXXXXX') {
      results.push(`✅ GA ID configured: ${gaId}`)
    } else {
      results.push('❌ GA ID not configured')
    }

    // Test 2: Check if gtag is available
    if (typeof window !== 'undefined' && window.gtag) {
      results.push('✅ gtag function available')
    } else {
      results.push('❌ gtag function not available')
    }

    // Test 3: Send test events
    try {
      analytics.trackQuizStart('test-quiz', 'Analytics Test')
      results.push('✅ Quiz start event sent')
      
      analytics.trackQuizComplete('test-quiz', 85, 100, 'Analytics Test')
      results.push('✅ Quiz complete event sent')
      
      analytics.trackSearch('test search', 'test')
      results.push('✅ Search event sent')
      
    } catch (error) {
      results.push(`❌ Error sending events: ${error}`)
    }

    setTestResults(results)
  }

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-purple-200 rounded-lg p-4 shadow-lg max-w-sm z-50">
      <h3 className="font-bold text-purple-800 mb-2">Analytics Test</h3>
      
      <button
        onClick={runTests}
        className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 mb-3"
      >
        Test Analytics
      </button>

      {testResults.length > 0 && (
        <div className="space-y-1">
          {testResults.map((result, index) => (
            <div key={index} className="text-sm font-mono">
              {result}
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 text-xs text-gray-600">
        Check browser console for gtag events
      </div>
    </div>
  )
}