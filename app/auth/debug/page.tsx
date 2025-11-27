'use client'

import { useEffect, useState } from 'react'

export default function AuthDebugPage() {
  const [info, setInfo] = useState<any>({})

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const debugInfo = {
      currentUrl: window.location.href,
      origin: window.location.origin,
      searchParams: Object.fromEntries(urlParams.entries()),
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasCode: urlParams.has('code'),
      hasError: urlParams.has('error'),
      error: urlParams.get('error'),
      errorDescription: urlParams.get('error_description'),
    }
    setInfo(debugInfo)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">OAuth Debug Info</h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Current URL:</h2>
            <code className="block bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm break-all">
              {info.currentUrl}
            </code>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Origin:</h2>
            <code className="block bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm">
              {info.origin}
            </code>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Supabase URL:</h2>
            <code className="block bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm break-all">
              {info.supabaseUrl}
            </code>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Has Code:</h2>
            <code className="block bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm">
              {info.hasCode ? '✅ YES' : '❌ NO'}
            </code>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Has Error:</h2>
            <code className="block bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm">
              {info.hasError ? '❌ YES' : '✅ NO'}
            </code>
          </div>

          {info.error && (
            <div>
              <h2 className="text-xl font-semibold mb-2 text-red-500">Error:</h2>
              <code className="block bg-red-100 dark:bg-red-900 p-3 rounded text-sm">
                {info.error}
              </code>
            </div>
          )}

          {info.errorDescription && (
            <div>
              <h2 className="text-xl font-semibold mb-2 text-red-500">Error Description:</h2>
              <code className="block bg-red-100 dark:bg-red-900 p-3 rounded text-sm break-all">
                {decodeURIComponent(info.errorDescription)}
              </code>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-2">All URL Parameters:</h2>
            <pre className="block bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-auto">
              {JSON.stringify(info.searchParams, null, 2)}
            </pre>
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded">
            <h2 className="text-xl font-semibold mb-2">Expected Redirect URI:</h2>
            <p className="mb-2">Your Google Cloud Console should have this exact URI:</p>
            <code className="block bg-white dark:bg-gray-800 p-3 rounded text-sm font-bold">
              {info.supabaseUrl}/auth/v1/callback
            </code>
            <p className="mt-4 text-sm">
              Go to Google Cloud Console → Credentials → Your OAuth Client → Authorized redirect URIs
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
