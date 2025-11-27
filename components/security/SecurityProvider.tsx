'use client'

import { useEffect, useState } from 'react'
import { getOrCreateFingerprint } from '@/lib/bot-detection/fingerprint'
import { getBehaviorAnalyzer } from '@/lib/bot-detection/behavior'
import CaptchaChallenge from './CaptchaChallenge'

interface SecurityProviderProps {
  children: React.ReactNode
  enableBotDetection?: boolean
  enableFingerprinting?: boolean
  botScoreThreshold?: number
}

export default function SecurityProvider({
  children,
  enableBotDetection = true,
  enableFingerprinting = true,
  botScoreThreshold = 0.7,
}: SecurityProviderProps) {
  const [fingerprint, setFingerprint] = useState<string | null>(null)
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)

  useEffect(() => {
    initializeSecurity()
  }, [])

  const initializeSecurity = async () => {
    // Initialize fingerprinting
    if (enableFingerprinting) {
      const fp = await getOrCreateFingerprint()
      setFingerprint(fp)

      // Add fingerprint to all API requests
      if (fp) {
        // Store in session for middleware to use
        sessionStorage.setItem('device_fingerprint', fp)
      }
    }

    // Initialize behavior tracking
    if (enableBotDetection) {
      getBehaviorAnalyzer()
    }
  }

  const handleCaptchaVerify = (token: string) => {
    setCaptchaVerified(true)
    setShowCaptcha(false)
    
    // Store verification in session
    sessionStorage.setItem('captcha_verified', 'true')
    sessionStorage.setItem('captcha_verified_at', Date.now().toString())
  }

  return (
    <>
      {children}
      
      {enableBotDetection && !captchaVerified && (
        <CaptchaChallenge
          onVerify={handleCaptchaVerify}
          autoShow={true}
          botScoreThreshold={botScoreThreshold}
        />
      )}
    </>
  )
}

/**
 * Hook to access security context
 */
export function useSecurity() {
  const [fingerprint, setFingerprint] = useState<string | null>(null)
  const [botScore, setBotScore] = useState<number>(0)

  useEffect(() => {
    // Get fingerprint
    const fp = sessionStorage.getItem('device_fingerprint')
    setFingerprint(fp)

    // Get bot score
    const analyzer = getBehaviorAnalyzer()
    const result = analyzer.analyze()
    setBotScore(result.score)
  }, [])

  const isCaptchaVerified = () => {
    const verified = sessionStorage.getItem('captcha_verified')
    const verifiedAt = sessionStorage.getItem('captcha_verified_at')
    
    if (!verified || !verifiedAt) return false

    // Check if verification is still valid (1 hour)
    const age = Date.now() - parseInt(verifiedAt)
    return age < 60 * 60 * 1000
  }

  return {
    fingerprint,
    botScore,
    isCaptchaVerified: isCaptchaVerified(),
  }
}
