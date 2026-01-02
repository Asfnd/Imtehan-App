/**
 * PDF Path Caching Utility
 * Caches storage paths (NOT signed URLs) to avoid expensive fuzzy matching
 *
 * SECURITY: Only caches the storage path, not signed URLs
 * - Storage paths are public information (subject + year)
 * - Signed URLs are generated fresh on each request
 * - Browser still caches the actual PDF content
 */

interface PDFPathCacheEntry {
  storagePath: string
  timestamp: number
}

const CACHE_KEY = 'pdf_path_cache_v1'
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000 // 7 days

class PDFPathCache {
  private cache: Map<string, PDFPathCacheEntry> = new Map()
  private isClient: boolean

  constructor() {
    this.isClient = typeof window !== 'undefined'
    if (this.isClient) {
      this.loadFromStorage()
    }
  }

  /**
   * Generate cache key from subject and year
   */
  private getCacheKey(subject: string, year: number): string {
    return `${subject.toLowerCase()}-${year}`
  }

  /**
   * Load cache from localStorage
   */
  private loadFromStorage() {
    if (!this.isClient) return

    try {
      const stored = localStorage.getItem(CACHE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        const now = Date.now()

        Object.entries(data).forEach(([key, entry]) => {
          const { storagePath, timestamp } = entry as PDFPathCacheEntry

          // Only load entries that haven't expired
          if (now - timestamp < CACHE_TTL) {
            this.cache.set(key, { storagePath, timestamp })
          }
        })
      }
    } catch (error) {
      console.warn('[PDFPathCache] Failed to load from storage:', error)
      // Clear corrupted cache
      if (this.isClient) {
        localStorage.removeItem(CACHE_KEY)
      }
    }
  }

  /**
   * Save cache to localStorage
   */
  private saveToStorage() {
    if (!this.isClient) return

    try {
      const data: Record<string, PDFPathCacheEntry> = {}
      this.cache.forEach((entry, key) => {
        data[key] = entry
      })
      localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    } catch (error) {
      console.warn('[PDFPathCache] Failed to save to storage:', error)
    }
  }

  /**
   * Get cached storage path
   * Returns null if not found or expired
   */
  get(subject: string, year: number): string | null {
    const key = this.getCacheKey(subject, year)
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    // Check if entry has expired
    const now = Date.now()
    if (now - entry.timestamp > CACHE_TTL) {
      this.cache.delete(key)
      this.saveToStorage()
      return null
    }

    return entry.storagePath
  }

  /**
   * Set cached storage path
   */
  set(subject: string, year: number, storagePath: string) {
    const key = this.getCacheKey(subject, year)
    this.cache.set(key, {
      storagePath,
      timestamp: Date.now(),
    })
    this.saveToStorage()
  }

  /**
   * Clear all cached paths
   */
  clear() {
    this.cache.clear()
    if (this.isClient) {
      localStorage.removeItem(CACHE_KEY)
    }
  }

  /**
   * Remove a specific cached path
   */
  remove(subject: string, year: number) {
    const key = this.getCacheKey(subject, year)
    this.cache.delete(key)
    this.saveToStorage()
  }

  /**
   * Get cache statistics (for debugging)
   */
  getStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.entries()).map(([key, entry]) => ({
        key,
        storagePath: entry.storagePath,
        age: Date.now() - entry.timestamp,
      })),
    }
  }
}

// Global singleton instance
export const pdfPathCache = new PDFPathCache()
