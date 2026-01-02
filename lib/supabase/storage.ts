import { createClient } from './client'
import { useCustomStorageUrl } from '../storage-config'

export const STORAGE_BUCKETS = {
  QUIZ_ASSETS: 'quiz-assets',
  USER_AVATARS: 'user-avatars',
  PDF_FILES: 'pdf-files',
} as const

/**
 * Upload a file to Supabase Storage
 * Files will be automatically cached by Cloudflare CDN
 */
export async function uploadFile(
  bucket: string,
  path: string,
  file: File | Blob,
  options?: {
    cacheControl?: string
    contentType?: string
    upsert?: boolean
  }
) {
  const supabase = createClient()

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: options?.cacheControl || '2592000', // 30 days default (Cloudflare edge optimized)
      contentType: options?.contentType,
      upsert: options?.upsert ?? false,
    })

  if (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }

  return data
}

/**
 * Get public URL for a file (cached by Cloudflare via storage.imtehan.com)
 */
export function getPublicUrl(bucket: string, path: string): string {
  const supabase = createClient()

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  // Use custom storage domain if configured
  return useCustomStorageUrl(data.publicUrl)
}

/**
 * Delete a file from storage
 */
export async function deleteFile(bucket: string, path: string) {
  const supabase = createClient()

  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  if (error) {
    throw new Error(`Delete failed: ${error.message}`)
  }
}

/**
 * List files in a bucket path
 */
export async function listFiles(bucket: string, path: string = '') {
  const supabase = createClient()

  const { data, error } = await supabase.storage
    .from(bucket)
    .list(path)

  if (error) {
    throw new Error(`List failed: ${error.message}`)
  }

  return data
}

/**
 * Upload PDF with optimized caching for Cloudflare
 */
export async function uploadPDF(file: File, filename?: string) {
  const path = `pdfs/${filename || file.name}`

  const data = await uploadFile(
    STORAGE_BUCKETS.PDF_FILES,
    path,
    file,
    {
      contentType: 'application/pdf',
      cacheControl: '2592000', // 30 days for PDFs
    }
  )

  return {
    path: data.path,
    url: getPublicUrl(STORAGE_BUCKETS.PDF_FILES, data.path),
  }
}

/**
 * Upload image with optimized caching
 */
export async function uploadImage(file: File, folder: string = 'images') {
  const ext = file.name.split('.').pop()
  const timestamp = Date.now()
  const path = `${folder}/${timestamp}.${ext}`

  const data = await uploadFile(
    STORAGE_BUCKETS.QUIZ_ASSETS,
    path,
    file,
    {
      contentType: file.type,
      cacheControl: '31536000', // 1 year for images
    }
  )

  return {
    path: data.path,
    url: getPublicUrl(STORAGE_BUCKETS.QUIZ_ASSETS, data.path),
  }
}
