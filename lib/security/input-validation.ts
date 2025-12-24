/**
 * SECURITY: Input Validation Utilities
 * Prevents XSS, injection, and other input attacks
 */

/**
 * Validate email format (RFC 5322 simplified)
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return false

  // Additional checks
  const [localPart, domain] = email.split('@')

  // Local part: 1-64 chars, alphanumeric and dots/hyphens/underscores
  if (!localPart || localPart.length > 64) return false
  if (!/^[a-zA-Z0-9._-]+$/.test(localPart)) return false
  if (localPart.startsWith('.') || localPart.endsWith('.')) return false
  if (localPart.includes('..')) return false

  // Domain: must have TLD with at least 2 characters
  if (!domain || domain.length > 255) return false
  const domainParts = domain.split('.')
  if (domainParts.length < 2) return false
  if (domainParts[domainParts.length - 1].length < 2) return false

  return true
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  if (!url || url.length > 2048) return false

  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

/**
 * Sanitize text input (remove suspicious characters)
 */
export function sanitizeText(text: string, maxLength: number = 1000): string {
  if (!text) return ''

  // Truncate to max length
  let sanitized = text.substring(0, maxLength)

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '')

  // Remove control characters except newline and tab
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')

  return sanitized.trim()
}

/**
 * Validate and sanitize message input
 */
export interface MessageValidation {
  valid: boolean
  error?: string
  sanitized?: string
}

export function validateMessage(message: string, options = {
  minLength: 10,
  maxLength: 5000,
}): MessageValidation {
  if (!message) {
    return { valid: false, error: 'Message is required' }
  }

  if (message.length < options.minLength) {
    return { valid: false, error: `Message must be at least ${options.minLength} characters` }
  }

  if (message.length > options.maxLength) {
    return { valid: false, error: `Message must not exceed ${options.maxLength} characters` }
  }

  const sanitized = sanitizeText(message, options.maxLength)

  if (sanitized.length < options.minLength) {
    return { valid: false, error: 'Message contains too many invalid characters' }
  }

  return { valid: true, sanitized }
}

/**
 * Validate name input
 */
export function validateName(name: string, fieldName = 'Name'): MessageValidation {
  if (!name) {
    return { valid: false, error: `${fieldName} is required` }
  }

  if (name.length < 2) {
    return { valid: false, error: `${fieldName} must be at least 2 characters` }
  }

  if (name.length > 100) {
    return { valid: false, error: `${fieldName} must not exceed 100 characters` }
  }

  // Only allow letters, numbers, spaces, and basic punctuation
  if (!/^[a-zA-Z0-9\s\-\'.]+$/i.test(name)) {
    return { valid: false, error: `${fieldName} contains invalid characters` }
  }

  const sanitized = sanitizeText(name, 100)

  return { valid: true, sanitized }
}

/**
 * Validate subject input
 */
export function validateSubject(subject: string): MessageValidation {
  if (!subject) {
    return { valid: false, error: 'Subject is required' }
  }

  if (subject.length < 3) {
    return { valid: false, error: 'Subject must be at least 3 characters' }
  }

  if (subject.length > 200) {
    return { valid: false, error: 'Subject must not exceed 200 characters' }
  }

  // Allow letters, numbers, spaces, and basic punctuation
  if (!/^[a-zA-Z0-9\s\-\':?!&.(),]+$/i.test(subject)) {
    return { valid: false, error: 'Subject contains invalid characters' }
  }

  const sanitized = sanitizeText(subject, 200)

  return { valid: true, sanitized }
}

/**
 * Detect common attack patterns
 */
export function detectSuspiciousPatterns(text: string): string[] {
  const suspiciousPatterns = [
    // SQL injection patterns
    /('|("|`)?.*;.*('|("|`)?|(\w*)(union|select|insert|update|delete|drop|create|alter)(\w*))/gi,
    // XSS patterns
    /<script[^>]*>.*?<\/script>/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /on\w+\s*=/gi, // Event handlers
    // Command injection
    /[;&|`$(){}[\]]/g,
  ]

  const detected: string[] = []

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(text)) {
      detected.push(pattern.source)
    }
  }

  return detected
}

/**
 * Rate limiting check (simple token bucket)
 */
export class RateLimiter {
  private tokens: Map<string, { count: number; reset: number }> = new Map()
  private readonly maxTokens: number
  private readonly resetMs: number

  constructor(maxTokens: number = 10, resetMs: number = 60000) {
    this.maxTokens = maxTokens
    this.resetMs = resetMs
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const record = this.tokens.get(identifier)

    if (!record || record.reset < now) {
      // New token bucket
      this.tokens.set(identifier, {
        count: this.maxTokens - 1,
        reset: now + this.resetMs,
      })
      return true
    }

    // Existing bucket
    if (record.count > 0) {
      record.count--
      return true
    }

    return false
  }

  cleanup(): void {
    const now = Date.now()
    for (const [key, record] of this.tokens.entries()) {
      if (record.reset < now) {
        this.tokens.delete(key)
      }
    }
  }
}
