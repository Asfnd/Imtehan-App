/**
 * Enhanced fetch wrapper that adds security headers
 */

export async function secureFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // Get fingerprint from session
  const fingerprint = typeof window !== 'undefined' 
    ? sessionStorage.getItem('device_fingerprint')
    : null

  // Get CAPTCHA verification
  const captchaVerified = typeof window !== 'undefined'
    ? sessionStorage.getItem('captcha_verified')
    : null

  // Add security headers
  const headers = new Headers(options.headers)
  
  if (fingerprint) {
    headers.set('X-Fingerprint', fingerprint)
  }

  if (captchaVerified) {
    headers.set('X-Captcha-Verified', captchaVerified)
  }

  // Add timestamp for request signing
  headers.set('X-Request-Time', Date.now().toString())

  return fetch(url, {
    ...options,
    headers,
  })
}

/**
 * Secure POST request
 */
export async function securePost(
  url: string,
  data: any,
  options: RequestInit = {}
): Promise<Response> {
  return secureFetch(url, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(data),
  })
}

/**
 * Secure GET request
 */
export async function secureGet(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  return secureFetch(url, {
    ...options,
    method: 'GET',
  })
}

/**
 * Log security event
 */
export async function logSecurityEvent(
  eventType: string,
  severity: 'low' | 'medium' | 'high' | 'critical',
  details?: Record<string, any>
): Promise<void> {
  try {
    await securePost('/api/security/log', {
      eventType,
      severity,
      details,
    })
  } catch (error) {
    console.error('Failed to log security event:', error)
  }
}
