'use client'

import { useEffect, useState } from 'react'

export function GADebug() {
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    const checkGA = () => {
      const info = {
        gaId: process.env.NEXT_PUBLIC_GA_ID,
        gtagExists: typeof window !== 'undefined' && !!window.gtag,
        dataLayerExists: typeof window !== 'undefined' && !!window.dataLayer,
        gaScriptLoaded: typeof document !== 'undefined' && !!document.querySelector('script[src*="googletagmanager.com/gtag/js"]'),
        timestamp: new Date().toISOString()
      }
      setDebugInfo(info)
    }

    // Check immediately
    checkGA()
    
    // Check again after a delay to see if scripts loaded
    setTimeout(checkGA, 2000)
  }, [])

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed top-4 right-4 bg-black text-white p-4 rounded-lg text-xs font-mono z-50 max-w-sm">
      <h3 className="font-bold mb-2">GA Debug Info</h3>
      <div className="space-y-1">
        <div>GA ID: {debugInfo.gaId || 'Not set'}</div>
        <div>gtag: {debugInfo.gtagExists ? '✅' : '❌'}</div>
        <div>dataLayer: {debugInfo.dataLayerExists ? '✅' : '❌'}</div>
        <div>Script: {debugInfo.gaScriptLoaded ? '✅' : '❌'}</div>
        <div>Time: {debugInfo.timestamp}</div>
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