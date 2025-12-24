/**
 * SECURITY: PDF Storage Security
 * Prevents path traversal and unauthorized file access
 */

/**
 * Validate PDF storage path (prevent directory traversal attacks)
 * SECURITY: Ensures paths cannot escape intended directory
 */
export function validatePdfPath(path: string): { valid: boolean; error?: string } {
  if (!path) {
    return { valid: false, error: 'Path is required' }
  }

  // SECURITY: Check for directory traversal attempts
  if (path.includes('..') || path.includes('\\')) {
    return { valid: false, error: 'Invalid path format' }
  }

  // SECURITY: Only allow lowercase alphanumeric, hyphens, underscores, forward slashes
  if (!/^[a-z0-9\-_/]+\.pdf$/i.test(path)) {
    return { valid: false, error: 'Path contains invalid characters' }
  }

  // SECURITY: Limit path length
  if (path.length > 255) {
    return { valid: false, error: 'Path is too long' }
  }

  // SECURITY: Block access to system directories
  const blockedPrefixes = [
    '..',
    '/',
    'etc/',
    'sys/',
    'proc/',
    'var/',
    'dev/',
  ]

  if (blockedPrefixes.some(prefix => path.startsWith(prefix))) {
    return { valid: false, error: 'Access to this directory is not allowed' }
  }

  return { valid: true }
}

/**
 * Validate subject for PDF lookup
 * SECURITY: Prevents parameter injection
 */
export function validateSubjectForPdf(subject: string): { valid: boolean; error?: string } {
  if (!subject) {
    return { valid: false, error: 'Subject is required' }
  }

  // SECURITY: Only allow letters, spaces, and hyphens
  if (!/^[a-zA-Z\s\-&()]+$/i.test(subject)) {
    return { valid: false, error: 'Subject contains invalid characters' }
  }

  // SECURITY: Limit length
  if (subject.length > 100) {
    return { valid: false, error: 'Subject is too long' }
  }

  return { valid: true }
}

/**
 * Validate year for PDF lookup
 * SECURITY: Ensures year is reasonable (1950-2100)
 */
export function validateYearForPdf(year: number | string): { valid: boolean; error?: string } {
  let yearNum = typeof year === 'string' ? parseInt(year, 10) : year

  if (isNaN(yearNum)) {
    return { valid: false, error: 'Year must be a number' }
  }

  // SECURITY: Only allow years in reasonable range
  if (yearNum < 1950 || yearNum > 2100) {
    return { valid: false, error: 'Year must be between 1950 and 2100' }
  }

  return { valid: true }
}

/**
 * Validate PDF file metadata
 * SECURITY: Ensures file is actually a PDF
 */
export function validatePdfMetadata(file: {
  name?: string
  size?: number
  type?: string
}): { valid: boolean; error?: string } {
  // SECURITY: Verify file extension
  if (file.name && !file.name.toLowerCase().endsWith('.pdf')) {
    return { valid: false, error: 'File must be a PDF' }
  }

  // SECURITY: Verify MIME type
  if (file.type && file.type !== 'application/pdf') {
    return { valid: false, error: 'File type must be PDF' }
  }

  // SECURITY: Check file size (max 50MB for PDFs)
  if (file.size && file.size > 50 * 1024 * 1024) {
    return { valid: false, error: 'File is too large (max 50MB)' }
  }

  // SECURITY: Check minimum file size (PDF header is at least 4 bytes)
  if (file.size && file.size < 4) {
    return { valid: false, error: 'File is too small to be a valid PDF' }
  }

  return { valid: true }
}

/**
 * Sanitize subject name for storage path
 * SECURITY: Creates safe filesystem-compatible path
 */
export function sanitizeSubjectForPath(subject: string): string {
  return subject
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove special characters except hyphens and parentheses
    .replace(/[^a-z0-9\-&()]/g, '')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
}

/**
 * Check if signed URL is expired
 */
export function isSignedUrlExpired(expiresAt: number): boolean {
  return Date.now() > expiresAt
}

/**
 * Generate safe cache key for PDF
 * SECURITY: Prevents cache key manipulation
 */
export function generatePdfCacheKey(subject: string, year: number): string {
  const sanitized = sanitizeSubjectForPath(subject)
  return `pdf:${sanitized}:${year}`
}

/**
 * Validate cache key format
 */
export function isValidCacheKey(key: string): boolean {
  // SECURITY: Cache keys must match exact format
  return /^pdf:[a-z0-9\-&():]+:\d{4}$/.test(key)
}
