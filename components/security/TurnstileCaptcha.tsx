'use client'

import { useEffect, useRef } from 'react'

interface TurnstileCaptchaProps {
  onVerify: (token: string) => void
  onError?: () => void
}

/**
 * Cloudflare Turnstile CAPTCHA - Free, fast, privacy-friendly
 * Setup: Get site key from https://dash.cloudflare.com/?to=/:account/turnstile
 */
export default function TurnstileCaptcha({ onVerify, onError }: TurnstileCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)

  useEffect(() => {
    // Load Turnstile script
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    script.onload = () => {
      if (containerRef.current && window.turnstile) {
        // Render Turnstile widget
        widgetId.current = window.turnstile.render(containerRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || 'YOUR_SITE_KEY_HERE',
          callback: (token: string) => {
            onVerify(token)
          },
          'error-callback': () => {
            onError?.()
          },
          theme: 'light',
          size: 'normal',
        })
      }
    }

    return () => {
      // Cleanup
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
      }
      document.head.removeChild(script)
    }
  }, [onVerify, onError])

  return <div ref={containerRef} className="flex justify-center my-4" />
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    turnstile: {
      render: (container: HTMLElement, options: any) => string
      remove: (widgetId: string) => void
      reset: (widgetId: string) => void
    }
  }
}
