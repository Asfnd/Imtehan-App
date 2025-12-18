/**
 * Image caching utilities for instant profile picture loading
 * Uses browser cache and localStorage for maximum performance
 */

interface CachedImage {
  url: string
  timestamp: number
  blob?: string
}

const CACHE_KEY = 'profile_image_cache'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

class ImageCache {
  private cache = new Map<string, CachedImage>()
  private initialized = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage()
    }
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(CACHE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        Object.entries(data).forEach(([url, cached]) => {
          this.cache.set(url, cached as CachedImage)
        })
      }
    } catch (error) {
      // Silently handle storage errors
    }
    this.initialized = true
  }

  private saveToStorage() {
    if (!this.initialized) return
    
    try {
      const data: Record<string, CachedImage> = {}
      this.cache.forEach((cached, url) => {
        // Only save recent entries
        if (Date.now() - cached.timestamp < CACHE_DURATION) {
          data[url] = cached
        }
      })
      localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    } catch (error) {
      // Silently handle storage errors
    }
  }

  async preloadImage(url: string): Promise<void> {
    if (!url) return

    // Check if already cached and recent
    const cached = this.cache.get(url)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return
    }

    return new Promise((resolve) => {
      const img = new Image()
      
      img.onload = () => {
        // Cache the successful load
        this.cache.set(url, {
          url,
          timestamp: Date.now()
        })
        this.saveToStorage()
        resolve()
      }
      
      img.onerror = () => {
        // Still resolve to not block the UI
        resolve()
      }
      
      // Set crossOrigin for Google profile images
      if (url.includes('googleusercontent.com')) {
        img.crossOrigin = 'anonymous'
      }
      
      img.src = url
    })
  }

  isCached(url: string): boolean {
    const cached = this.cache.get(url)
    return cached ? Date.now() - cached.timestamp < CACHE_DURATION : false
  }

  clearExpired() {
    const now = Date.now()
    for (const [url, cached] of this.cache.entries()) {
      if (now - cached.timestamp >= CACHE_DURATION) {
        this.cache.delete(url)
      }
    }
    this.saveToStorage()
  }
}

// Singleton instance
export const imageCache = new ImageCache()

// Utility function for components
export async function preloadProfileImage(url: string | null | undefined): Promise<void> {
  if (!url) return
  return imageCache.preloadImage(url)
}

// Clean up expired cache entries on app start
if (typeof window !== 'undefined') {
  // Clean up after a short delay to not block initial render
  setTimeout(() => {
    imageCache.clearExpired()
  }, 1000)
}