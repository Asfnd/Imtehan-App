'use client'

export class DevToolsDetector {
  private isOpen = false
  private callbacks: Array<(isOpen: boolean) => void> = []
  private checkInterval: NodeJS.Timeout | null = null
  private element: HTMLElement | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.init()
    }
  }

  private init() {
    // Method 1: Console detection using getter
    this.element = document.createElement('div')
    Object.defineProperty(this.element, 'id', {
      get: () => {
        this.setOpen(true)
        return ''
      },
    })

    // Method 2: Timing-based detection
    this.checkInterval = setInterval(() => {
      this.checkTiming()
      this.checkWindowSize()
      this.checkConsole()
    }, 1000)
  }

  private checkTiming() {
    const start = performance.now()
    // debugger statement pauses execution if DevTools is open
    // We use a try-catch to prevent actual debugging
    try {
      const check = () => {
        const end = performance.now()
        if (end - start > 100) {
          this.setOpen(true)
        }
      }
      check()
    } catch (e) {
      // Ignore errors
    }
  }

  private checkWindowSize() {
    // DevTools typically takes up space, changing window dimensions
    const widthThreshold = window.outerWidth - window.innerWidth > 160
    const heightThreshold = window.outerHeight - window.innerHeight > 160
    const orientation = widthThreshold ? 'vertical' : 'horizontal'

    if (widthThreshold || heightThreshold) {
      this.setOpen(true)
    }
  }

  private checkConsole() {
    // Try to detect console by logging the element
    if (this.element) {
      console.clear()
      console.log(this.element)
    }
  }

  private setOpen(isOpen: boolean) {
    if (this.isOpen !== isOpen) {
      this.isOpen = isOpen
      this.notify()
    }
  }

  private notify() {
    this.callbacks.forEach(cb => {
      try {
        cb(this.isOpen)
      } catch (e) {
        console.error('DevTools detector callback error:', e)
      }
    })
  }

  public onDetect(callback: (isOpen: boolean) => void) {
    this.callbacks.push(callback)
    // Immediately call with current state
    callback(this.isOpen)
  }

  public destroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval)
      this.checkInterval = null
    }
    this.callbacks = []
    this.element = null
  }

  public getStatus(): boolean {
    return this.isOpen
  }
}

// Singleton instance
let detectorInstance: DevToolsDetector | null = null

export function getDevToolsDetector(): DevToolsDetector {
  if (!detectorInstance && typeof window !== 'undefined') {
    detectorInstance = new DevToolsDetector()
  }
  return detectorInstance!
}

export function useDevToolsDetector(onDetect: (isOpen: boolean) => void) {
  if (typeof window === 'undefined') return

  const detector = getDevToolsDetector()
  detector.onDetect(onDetect)

  return () => {
    // Cleanup handled by detector
  }
}
