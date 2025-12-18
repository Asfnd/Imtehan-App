/**
 * Bot detection and user agent filtering
 * Prevents automated scraping and unauthorized access
 */

// Known bot user agents (scrapers, crawlers, etc.)
const BOT_USER_AGENTS = [
  'bot', 'crawler', 'spider', 'scraper', 'wget', 'curl', 'python', 'requests',
  'scrapy', 'selenium', 'phantomjs', 'headless', 'automation', 'postman',
  'insomnia', 'httpie', 'axios', 'fetch', 'node-fetch', 'got', 'superagent'
]

// Suspicious patterns in user agents
const SUSPICIOUS_PATTERNS = [
  /python/i,
  /requests/i,
  /scrapy/i,
  /selenium/i,
  /phantomjs/i,
  /headless/i,
  /automation/i,
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /wget/i,
  /curl/i
]

export function isSuspiciousUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return true // No user agent is suspicious
  
  const ua = userAgent.toLowerCase()
  
  // Check against known bot user agents
  for (const botUA of BOT_USER_AGENTS) {
    if (ua.includes(botUA)) {
      return true
    }
  }
  
  // Check against suspicious patterns
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(ua)) {
      return true
    }
  }
  
  return false
}

export function isValidBrowser(userAgent: string | null): boolean {
  if (!userAgent) return false
  
  const ua = userAgent.toLowerCase()
  
  // Check for legitimate browser user agents
  const validBrowsers = [
    'chrome', 'firefox', 'safari', 'edge', 'opera', 'brave'
  ]
  
  return validBrowsers.some(browser => ua.includes(browser))
}

export function detectBot(request: Request): {
  isBot: boolean
  reason?: string
  userAgent: string | null
} {
  const userAgent = request.headers.get('user-agent')
  
  // No user agent
  if (!userAgent) {
    return {
      isBot: true,
      reason: 'No user agent',
      userAgent: null
    }
  }
  
  // Suspicious user agent
  if (isSuspiciousUserAgent(userAgent)) {
    return {
      isBot: true,
      reason: 'Suspicious user agent',
      userAgent
    }
  }
  
  // Not a valid browser
  if (!isValidBrowser(userAgent)) {
    return {
      isBot: true,
      reason: 'Invalid browser',
      userAgent
    }
  }
  
  return {
    isBot: false,
    userAgent
  }
}

// Additional security checks
export function hasValidHeaders(request: Request): boolean {
  const headers = request.headers
  
  // Check for required headers that browsers typically send
  const hasAccept = headers.get('accept')
  const hasAcceptLanguage = headers.get('accept-language')
  const hasAcceptEncoding = headers.get('accept-encoding')
  
  // Browsers typically send these headers
  if (!hasAccept || !hasAcceptLanguage || !hasAcceptEncoding) {
    return false
  }
  
  return true
}

export function isLikelyBot(request: Request): boolean {
  const botDetection = detectBot(request)
  const hasValidHeadersCheck = hasValidHeaders(request)
  
  return botDetection.isBot || !hasValidHeadersCheck
}