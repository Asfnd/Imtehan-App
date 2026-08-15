'use client'

import { useRef, useState } from 'react'
import { Camera, ImagePlus, Loader2, Plus } from 'lucide-react'
import { downscaleForOcr } from '@/lib/essay/downscaleImage'

type Props = {
  csrfToken: string
  disabled?: boolean
  hasExistingText: boolean
  onAppend: (text: string) => void
}

export function ImageTextImport({ csrfToken, disabled, hasExistingText, onAppend }: Props) {
  const cameraRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pages, setPages] = useState(0)

  const extractOne = async (file: File, index: number, total: number): Promise<string> => {
    setProgress(total > 1 ? `Reading page ${index + 1} of ${total}…` : 'Reading the page…')
    const { base64, mimeType } = await downscaleForOcr(file)
    const res = await fetch('/api/extract-essay-text', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
      },
      body: JSON.stringify({ image: base64, mimeType }),
    })
    const data = (await res.json().catch(() => ({}))) as { text?: string; error?: string }
    if (res.status === 403) {
      throw new Error('Security token expired. Refresh the page and try again.')
    }
    if (!res.ok || !data.text?.trim()) {
      throw new Error(data.error || 'Could not read this page.')
    }
    return data.text.trim()
  }

  const handleFiles = async (list: FileList | null) => {
    if (!list?.length || disabled || busy) return
    const files = Array.from(list).filter(f => f.type.startsWith('image/') || !f.type)
    if (!files.length) {
      setError('Please choose a photo of your writing.')
      return
    }
    const batch = files.slice(0, 8)
    setBusy(true)
    setError(null)
    const chunks: string[] = []
    const failures: string[] = []
    try {
      for (let i = 0; i < batch.length; i++) {
        try {
          chunks.push(await extractOne(batch[i], i, batch.length))
        } catch (e) {
          failures.push(e instanceof Error ? e.message : 'Could not read a page.')
        }
      }
      if (chunks.length) {
        onAppend(chunks.join('\n\n'))
        setPages(p => p + chunks.length)
      }
      if (failures.length && !chunks.length) setError(failures[0])
      else if (failures.length) {
        setError(`${chunks.length} page${chunks.length === 1 ? '' : 's'} read. ${failures.length} page${failures.length === 1 ? '' : 's'} failed — retake those shots closer and well-lit.`)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not import from the photo.')
    } finally {
      setBusy(false)
      setProgress('')
      if (cameraRef.current) cameraRef.current.value = ''
      if (galleryRef.current) galleryRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        disabled={disabled || busy}
        onChange={e => void handleFiles(e.target.files)}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif,image/*"
        multiple
        className="hidden"
        disabled={disabled || busy}
        onChange={e => void handleFiles(e.target.files)}
      />

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled={disabled || busy || !csrfToken}
          onClick={() => cameraRef.current?.click()}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-bold text-gray-800">Camera</span>
            <span className="block text-[10px] text-gray-400 leading-tight">Photograph a page</span>
          </span>
        </button>
        <button
          type="button"
          disabled={disabled || busy || !csrfToken}
          onClick={() => galleryRef.current?.click()}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-bold text-gray-800">Gallery</span>
            <span className="block text-[10px] text-gray-400 leading-tight">Import one or more photos</span>
          </span>
        </button>
      </div>

      {busy && (
        <p className="text-[11px] text-blue-700 font-medium flex items-center gap-1.5">
          <Loader2 className="w-3 h-3 animate-spin" />
          {progress || 'Reading handwriting…'}
        </p>
      )}

      {!busy && pages > 0 && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => cameraRef.current?.click()}
          className="text-[11px] text-blue-700 font-semibold hover:text-blue-900 inline-flex items-center gap-1"
        >
          <Plus className="w-3 h-3" />
          Add another page{hasExistingText ? ' (appends)' : ''}
        </button>
      )}

      {error && <p className="text-[11px] text-red-600 leading-snug">{error}</p>}

      <p className="text-[10px] text-gray-400 leading-snug">
        Photograph each page in order. We extract the text the same way as the app (1536px scan, Gemini OCR). You can edit it before grading. Photos are not stored.
      </p>
    </div>
  )
}
