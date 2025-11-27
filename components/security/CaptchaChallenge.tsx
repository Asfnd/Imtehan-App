'use client'

import { useEffect, useState } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Shield, X } from 'lucide-react'
import { getBehaviorAnalyzer } from '@/lib/bot-detection/behavior'

interface CaptchaChallengeProps {
  onVerify: (token: string) => void
  onClose?: () => void
  autoShow?: boolean
  botScoreThreshold?: number
}

export default function CaptchaChallenge({
  onVerify,
  onClose,
  autoShow = true,
  botScoreThreshold = 0.5,
}: CaptchaChallengeProps) {
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    if (!autoShow) return

    // Check bot score after a delay
    const timer = setTimeout(() => {
      checkBotScore()
    }, 3000) // Wait 3 seconds for user interaction

    return () => clearTimeout(timer)
  }, [autoShow, botScoreThreshold])

  const checkBotScore = () => {
    try {
      const analyzer = getBehaviorAnalyzer()
      const result = analyzer.analyze()

      if (result.score > botScoreThreshold) {
        setShowCaptcha(true)
        
        // Log bot detection
        logBotDetection(result)
      }
    } catch (error) {
      console.error('Bot score check error:', error)
    }
  }

  const logBotDetection = async (result: any) => {
    try {
      await fetch('/api/security/bot-detected', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score: result.score,
          details: result.details,
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (error) {
      console.error('Failed to log bot detection:', error)
    }
  }

  const handleVerify = async (token: string) => {
    setIsVerifying(true)
    
    try {
      // Verify token on server
      const response = await fetch('/api/security/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      if (response.ok) {
        onVerify(token)
        setShowCaptcha(false)
      } else {
        console.error('CAPTCHA verification failed')
      }
    } catch (error) {
      console.error('CAPTCHA verification error:', error)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    setShowCaptcha(false)
  }

  if (!showCaptcha) return null

  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY

  if (!siteKey) {
    console.error('hCaptcha site key not configured')
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        {onClose && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Verify You're Human
            </h3>
            <p className="text-gray-600 text-sm">
              We've detected unusual activity. Please complete this verification to continue.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <HCaptcha
            sitekey={siteKey}
            onVerify={handleVerify}
            onError={(err) => console.error('hCaptcha error:', err)}
            onExpire={() => console.log('hCaptcha expired')}
          />
        </div>

        {isVerifying && (
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <p className="text-sm text-gray-600 mt-2">Verifying...</p>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center mt-4">
          This helps us protect against automated access and ensure a fair experience for all users.
        </p>
      </div>
    </div>
  )
}
