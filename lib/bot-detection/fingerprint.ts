'use client'

import FingerprintJS from '@fingerprintjs/fingerprintjs'

let fpPromise: Promise<any> | null = null

export async function generateFingerprint() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    // Initialize FingerprintJS once
    if (!fpPromise) {
      fpPromise = FingerprintJS.load()
    }

    const fp = await fpPromise
    const result = await fp.get()

    return {
      visitorId: result.visitorId,
      confidence: result.confidence.score,
      components: {
        canvas: result.components.canvas?.value,
        webgl: result.components.webgl?.value,
        audio: result.components.audio?.value,
        fonts: result.components.fonts?.value,
        plugins: result.components.plugins?.value,
        timezone: result.components.timezone?.value,
        language: result.components.languages?.value,
        platform: result.components.platform?.value,
        screenResolution: result.components.screenResolution?.value,
        colorDepth: result.components.colorDepth?.value,
        deviceMemory: result.components.deviceMemory?.value,
        hardwareConcurrency: result.components.hardwareConcurrency?.value,
      },
    }
  } catch (error) {
    console.error('Fingerprint generation error:', error)
    return null
  }
}

export async function getFingerprint(): Promise<string | null> {
  const result = await generateFingerprint()
  return result?.visitorId || null
}

// Store fingerprint in localStorage
export async function storeFingerprint() {
  const fingerprint = await getFingerprint()
  if (fingerprint) {
    localStorage.setItem('device_fingerprint', fingerprint)
    return fingerprint
  }
  return null
}

// Get stored fingerprint
export function getStoredFingerprint(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('device_fingerprint')
}

// Get or generate fingerprint
export async function getOrCreateFingerprint(): Promise<string | null> {
  const stored = getStoredFingerprint()
  if (stored) return stored
  
  return await storeFingerprint()
}
