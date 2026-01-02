/**
 * SIMPLE PDF Storage - Direct database lookups, no scanning bullshit
 * Each paper is stored in the database with its exact storage path
 */

import { createClient } from '@/lib/supabase/client'
import { useCustomStorageUrl } from '@/lib/storage-config'

export interface PastPaper {
  id: number
  subject: string
  year: number
  filename: string
  storage_path: string
  file_size?: number
  is_available: boolean
  download_count: number
  created_at: string
  updated_at: string
}

/**
 * Get all available subjects from the database
 */
export async function getAvailableSubjects(): Promise<{ success: boolean; subjects?: string[]; error?: string }> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('past_papers')
      .select('subject')
      .eq('is_available', true)
      .order('subject')
    
    if (error) {
      console.error('❌ Database error:', error)
      return { success: false, error: error.message }
    }
    
    // Get unique subjects - database already stores them in kebab-case
    const subjects = [...new Set(data?.map(p => p.subject) || [])]
    
    return { success: true, subjects }
  } catch (error) {
    console.error('❌ Error:', error)
    return { success: false, error: 'Failed to fetch subjects' }
  }
}

/**
 * Get available years for a specific subject
 */
export async function getAvailableYears(subject: string): Promise<{ success: boolean; years?: number[]; error?: string }> {
  try {
    const supabase = createClient()
    
    // Database stores subjects in kebab-case, so use directly
    const { data, error } = await supabase
      .from('past_papers')
      .select('year')
      .eq('subject', subject)
      .eq('is_available', true)
      .order('year', { ascending: false })
    
    if (error) {
      console.error('❌ Database error:', error)
      return { success: false, error: error.message }
    }
    
    const years = data?.map(p => p.year).filter(y => y !== null) || []
    
    return { success: true, years }
  } catch (error) {
    console.error('❌ Error:', error)
    return { success: false, error: 'Failed to fetch years' }
  }
}

/**
 * Get PDF URL - Simple database lookup, no scanning
 */
export async function getPDFUrl(
  subject: string,
  year: number
): Promise<{ success: boolean; url?: string; error?: string; paper?: PastPaper }> {
  try {
    const supabase = createClient()
    
    console.log(`🔍 Looking up: ${subject} (${year})`)
    
    // Direct database lookup - database stores subjects in kebab-case
    const { data, error } = await supabase
      .from('past_papers')
      .select('*')
      .eq('subject', subject)
      .eq('year', year)
      .eq('is_available', true)
      .single()
    
    if (error) {
      console.error('❌ Database lookup failed:', error)
      return { 
        success: false, 
        error: `Paper not found for ${subject} (${year})` 
      }
    }
    
    if (!data) {
      return { 
        success: false, 
        error: `No paper found for ${subject} (${year})` 
      }
    }
    
    // Get public URL from storage using the exact path from database
    // Using getPublicUrl instead of createSignedUrl for public bucket access
    const { data: urlData } = supabase.storage
      .from('css-past-papers')
      .getPublicUrl(data.storage_path)

    if (!urlData?.publicUrl) {
      console.error('❌ Failed to get public URL')
      return {
        success: false,
        error: `Failed to generate URL for ${subject} (${year})`
      }
    }

    // Convert to custom storage domain (storage.imtehan.com)
    const finalUrl = useCustomStorageUrl(urlData.publicUrl)

    // Increment download count
    await supabase
      .from('past_papers')
      .update({ download_count: data.download_count + 1 })
      .eq('id', data.id)

    console.log(`✅ Found PDF: ${data.storage_path}`)
    console.log(`📦 Serving from: ${finalUrl}`)

    return {
      success: true,
      url: finalUrl, // Now uses storage.imtehan.com
      paper: data
    }
  } catch (error) {
    console.error('❌ Error:', error)
    return { 
      success: false, 
      error: `Failed to get PDF: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }
  }
}

/**
 * Get all papers from database
 */
export async function getAllPapers(): Promise<{ success: boolean; papers?: PastPaper[]; error?: string }> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('past_papers')
      .select('*')
      .eq('is_available', true)
      .order('subject')
      .order('year', { ascending: false })
    
    if (error) {
      console.error('❌ Database error:', error)
      return { success: false, error: error.message }
    }
    
    return { success: true, papers: data || [] }
  } catch (error) {
    console.error('❌ Error:', error)
    return { success: false, error: 'Failed to fetch papers' }
  }
}

/**
 * Check if database has papers
 */
export async function checkDatabaseStatus(): Promise<{ 
  success: boolean
  hasPapers: boolean
  paperCount: number
  error?: string 
}> {
  try {
    const supabase = createClient()
    
    const { count, error } = await supabase
      .from('past_papers')
      .select('*', { count: 'exact', head: true })
      .eq('is_available', true)
    
    if (error) {
      console.error('❌ Database error:', error)
      return { 
        success: false, 
        hasPapers: false, 
        paperCount: 0, 
        error: error.message 
      }
    }
    
    return { 
      success: true, 
      hasPapers: (count || 0) > 0, 
      paperCount: count || 0 
    }
  } catch (error) {
    console.error('❌ Error:', error)
    return { 
      success: false, 
      hasPapers: false, 
      paperCount: 0, 
      error: 'Failed to check database' 
    }
  }
}
