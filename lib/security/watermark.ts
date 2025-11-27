'use client'

export function addInvisibleWatermark(userId: string, sessionId: string) {
  if (typeof window === 'undefined') return

  // Remove existing watermark if any
  const existing = document.getElementById('security-watermark')
  if (existing) {
    existing.remove()
  }

  const canvas = document.createElement('canvas')
  canvas.id = 'security-watermark'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Create watermark data
  const timestamp = Date.now()
  const watermarkData = `${userId}-${sessionId}-${timestamp}`
  const encoded = btoa(watermarkData)

  // Add invisible watermark with very low opacity
  ctx.globalAlpha = 0.005 // Nearly invisible
  ctx.font = '10px Arial'
  ctx.fillStyle = '#000000'
  
  // Add watermark in multiple locations
  const positions = [
    { x: 10, y: 20 },
    { x: canvas.width - 200, y: 20 },
    { x: 10, y: canvas.height - 10 },
    { x: canvas.width - 200, y: canvas.height - 10 },
    { x: canvas.width / 2 - 100, y: canvas.height / 2 },
  ]

  positions.forEach(pos => {
    ctx.fillText(encoded, pos.x, pos.y)
  })

  // Style the canvas
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '9998'
  canvas.style.opacity = '0.01'

  document.body.appendChild(canvas)

  // Update watermark on window resize
  const handleResize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    addInvisibleWatermark(userId, sessionId)
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
    canvas.remove()
  }
}

export function addVisibleWatermark(text: string) {
  if (typeof window === 'undefined') return

  const watermark = document.createElement('div')
  watermark.id = 'visible-watermark'
  watermark.textContent = text
  
  watermark.style.position = 'fixed'
  watermark.style.bottom = '20px'
  watermark.style.right = '20px'
  watermark.style.padding = '8px 16px'
  watermark.style.background = 'rgba(0, 0, 0, 0.05)'
  watermark.style.borderRadius = '8px'
  watermark.style.fontSize = '12px'
  watermark.style.color = 'rgba(0, 0, 0, 0.3)'
  watermark.style.pointerEvents = 'none'
  watermark.style.zIndex = '9997'
  watermark.style.userSelect = 'none'

  document.body.appendChild(watermark)

  return () => {
    watermark.remove()
  }
}
