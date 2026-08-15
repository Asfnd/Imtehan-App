/**
 * Client-side preprocess matching the mobile ScanSolve / EssayCheck pipeline:
 * resize width to 1536px (Gemini 768px tiles → exactly 2 columns), JPEG quality 0.85.
 * Also strips EXIF by redrawing onto a canvas.
 */

export const OCR_TARGET_WIDTH = 1536
export const OCR_JPEG_QUALITY = 0.85
export const OCR_MAX_SOURCE_BYTES = 15 * 1024 * 1024

function loadBitmap(blob: Blob): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === 'function') {
    return createImageBitmap(blob, { imageOrientation: 'from-image' } as ImageBitmapOptions).catch(
      async () => {
        const url = URL.createObjectURL(blob)
        try {
          return await loadHtmlImage(url)
        } finally {
          URL.revokeObjectURL(url)
        }
      }
    )
  }
  const url = URL.createObjectURL(blob)
  return loadHtmlImage(url).finally(() => URL.revokeObjectURL(url))
}

function loadHtmlImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Could not decode this image. Try JPEG or PNG, or use the camera.'))
    img.src = url
  })
}

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (!blob) reject(new Error('Could not compress the photo.'))
        else resolve(blob)
      },
      'image/jpeg',
      quality
    )
  })
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const s = String(reader.result || '')
      const i = s.indexOf(',')
      resolve(i >= 0 ? s.slice(i + 1) : s)
    }
    reader.onerror = () => reject(new Error('Could not read the photo.'))
    reader.readAsDataURL(blob)
  })
}

/**
 * Downscale a user photo to the OCR sweet spot and return raw base64 (no data: prefix).
 */
export async function downscaleForOcr(file: Blob): Promise<{ base64: string; mimeType: 'image/jpeg' }> {
  if (file.size > OCR_MAX_SOURCE_BYTES) {
    throw new Error('That photo is too large. Photograph one page at a time.')
  }

  const source = await loadBitmap(file)
  const srcW = 'width' in source ? source.width : (source as HTMLImageElement).naturalWidth
  const srcH = 'height' in source ? source.height : (source as HTMLImageElement).naturalHeight
  if (!srcW || !srcH) throw new Error('Could not read this image.')

  const scale = srcW > OCR_TARGET_WIDTH ? OCR_TARGET_WIDTH / srcW : 1
  const w = Math.max(1, Math.round(srcW * scale))
  const h = Math.max(1, Math.round(srcH * scale))

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not process this image.')
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(source as CanvasImageSource, 0, 0, w, h)
  if ('close' in source && typeof source.close === 'function') source.close()

  const jpeg = await canvasToJpeg(canvas, OCR_JPEG_QUALITY)
  const base64 = await blobToBase64(jpeg)
  return { base64, mimeType: 'image/jpeg' }
}
