/**
 * SIMPLE PDF Storage - Direct database lookups, no scanning bullshit
 * Each paper is stored in the database with its exact storage path
 */

import { createClient } from '@/lib/supabase/client'
import { getR2PastPaperUrl, getR2SolvedPaperUrl } from '@/lib/r2-storage'

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
    
    // Generate R2 URL using subject, year, and filename
    // R2 structure: {subject}/{year}/{filename}
    const r2Url = getR2PastPaperUrl(data.subject, data.year, data.filename)

    // Increment download count
    await supabase
      .from('past_papers')
      .update({ download_count: data.download_count + 1 })
      .eq('id', data.id)

    console.log(`✅ Found PDF: ${data.filename}`)
    console.log(`📦 Serving from R2: ${r2Url}`)

    return {
      success: true,
      url: r2Url, // Now served from Cloudflare R2
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

/**
 * Get Solved Paper URL from R2
 * Solved papers are stored in R2 under Solved Paper/ folder
 * Example filename: jwt_css_solved_paper_2024.pdf
 */
export async function getSolvedPaperUrl(
  paperId?: string
): Promise<{ success: boolean; url?: string; error?: string; foundAt?: string }> {
  try {
    console.log(`🔍 Looking up solved paper: ${paperId || 'default'}`)

    // Map paper IDs to actual filenames in R2
    const paperFiles: Record<string, string> = {
      '1': 'jwt_css_solved_paper_2024.pdf',
      'jwt_2024': 'jwt_css_solved_paper_2024.pdf',
      'default': 'jwt_css_solved_paper_2024.pdf',
    }

    // Get filename - use paperId if provided, otherwise default
    const filename = paperId ? (paperFiles[paperId] || paperFiles['default']) : paperFiles['default']

    // Generate R2 URL
    const r2Url = getR2SolvedPaperUrl(filename)

    console.log(`✅ Found solved paper: ${filename}`)
    console.log(`📦 Serving from R2: ${r2Url}`)

    return {
      success: true,
      url: r2Url,
      foundAt: `Solved Paper/${filename}`
    }
  } catch (error) {
    console.error('❌ Error:', error)
    return {
      success: false,
      error: `Failed to get solved paper: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}
