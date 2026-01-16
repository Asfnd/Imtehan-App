/**
 * Guess Papers Storage - Simple storage for CSS 2026 Guess Papers
 */

import { createClient } from '@/lib/supabase/client'
import { getR2GuessPaperUrl } from '@/lib/r2-storage'

export interface GuessPaper {
  id: number
  subject: string
  filename: string
  storage_path: string
  file_size?: number
  is_available: boolean
  created_at: string
  updated_at: string
}

/**
 * Get all available guess papers
 */
export async function getAllGuessPapers(): Promise<{ success: boolean; papers?: GuessPaper[]; error?: string }> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('guess_papers_2026')
      .select('*')
      .eq('is_available', true)
      .order('subject')

    if (error) {
      console.error('❌ Database error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, papers: data || [] }
  } catch (error) {
    console.error('❌ Error:', error)
    return { success: false, error: 'Failed to fetch guess papers' }
  }
}

/**
 * Get guess paper PDF URL by subject
 */
export async function getGuessPaperUrl(
  subject: string
): Promise<{ success: boolean; url?: string; error?: string; paper?: GuessPaper }> {
  try {
    const supabase = createClient()

    console.log(`🔍 Looking up guess paper: ${subject}`)

    // Direct database lookup
    const { data, error } = await supabase
      .from('guess_papers_2026')
      .select('*')
      .eq('subject', subject)
      .eq('is_available', true)
      .single()

    if (error) {
      console.error('❌ Database lookup failed:', error)
      return {
        success: false,
        error: `Guess paper not found for ${subject}`
      }
    }

    if (!data) {
      return {
        success: false,
        error: `No guess paper found for ${subject}`
      }
    }

    // Generate R2 URL using the filename from database
    // R2 structure: Guess Papers/{filename}
    const r2Url = getR2GuessPaperUrl(data.filename)

    console.log(`✅ Found guess paper: ${data.filename}`)
    console.log(`📦 Serving from R2: ${r2Url}`)

    return {
      success: true,
      url: r2Url,
      paper: data
    }
  } catch (error) {
    console.error('❌ Error:', error)
    return {
      success: false,
      error: `Failed to get guess paper: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}
