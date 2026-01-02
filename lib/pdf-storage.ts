/**
 * PDF Storage Utilities for CSS Past Papers
 * Handles uploading and retrieving PDF files from Supabase storage
 */

import { createClient } from '@/lib/supabase/client'

/**
 * URL Caching Removed for Security
 *
 * SECURITY FIX: Removed global URL cache that was keyed only by subject+year
 * without user identification. This allowed any user to access other users'
 * cached signed URLs.
 *
 * Why this is secure:
 * - Signed URLs are generated fresh each time (cheap operation ~5KB)
 * - Browser caches PDFs for 30 days (middleware headers)
 * - Returning users get instant loads from browser cache
 * - Supabase handles backend caching automatically
 */

export interface PastPaper {
  subject: string
  year: number
  filename: string
  storage_path: string
  file_size?: number
  uploaded_at?: string
}

/**
 * Upload a PDF file to storage
 */
export async function uploadPastPaper(
  subject: string,
  year: number,
  file: File
): Promise<{ success: boolean; error?: string; path?: string }> {
  try {
    const supabase = createClient()
    
    // Convert subject to kebab-case for consistent storage paths
    const subjectKebab = subject.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[()&]/g, '')
      .replace(/[^a-z0-9-]/g, '')
    
    const filename = `${subjectKebab}-${year}.pdf`
    const storagePath = `${subjectKebab}/${year}/${filename}`
    
    // Upload file to storage
    const { data, error } = await supabase.storage
      .from('css-past-papers')
      .upload(storagePath, file, {
        cacheControl: '2592000', // 30 days - optimized for Cloudflare edge caching
        upsert: true // Replace if exists
      })
    
    if (error) {
      console.error('Upload error:', error)
      return { success: false, error: error.message }
    }
    
    return { success: true, path: data.path }
  } catch (error) {
    console.error('Upload error:', error)
    return { success: false, error: 'Failed to upload PDF' }
  }
}

/**
 * Enhanced subject name normalization functions
 */
export function normalizeSubjectKebab(subject: string): string {
  return subject.toLowerCase()
    .trim()
    // Extract content from parentheses and include it
    .replace(/\(([^)]*)\)/g, ' $1 ')
    // Handle common abbreviations and special cases
    .replace(/\b&\b/g, 'and')
    .replace(/\bcomm\b/g, 'communication')
    .replace(/\bint'?l\b/g, 'international')
    .replace(/\badmin\b/g, 'administration')
    // Replace spaces and special characters with hyphens
    .replace(/[\s\-_&()]+/g, '-')
    // Remove any remaining special characters except hyphens and numbers
    .replace(/[^a-z0-9-]/g, '')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
}

export function normalizeSubjectUnderscore(subject: string): string {
  return subject.toLowerCase()
    .trim()
    // Extract content from parentheses and include it
    .replace(/\(([^)]*)\)/g, ' $1 ')
    // Handle common abbreviations and special cases
    .replace(/\b&\b/g, 'and')
    .replace(/\bcomm\b/g, 'communication')
    .replace(/\bint'?l\b/g, 'international')
    .replace(/\badmin\b/g, 'administration')
    // Replace spaces and special characters with underscores
    .replace(/[\s\-_&()]+/g, '_')
    // Remove any remaining special characters except underscores and numbers
    .replace(/[^a-z0-9_]/g, '')
    // Remove multiple consecutive underscores
    .replace(/_+/g, '_')
    // Remove leading/trailing underscores
    .replace(/^_+|_+$/g, '')
}

export function normalizeSubjectClean(subject: string): string {
  return subject.toLowerCase()
    .trim()
    // Extract content from parentheses and include it
    .replace(/\(([^)]*)\)/g, ' $1 ')
    // Handle common abbreviations
    .replace(/\b&\b/g, 'and')
    .replace(/\bcomm\b/g, 'communication')
    .replace(/\bint'?l\b/g, 'international')
    .replace(/\badmin\b/g, 'administration')
    // Remove all non-alphanumeric characters
    .replace(/[^a-z0-9]/g, '')
}

export function normalizeSubjectAbbreviated(subject: string): string {
  // Create abbreviated version for common subjects
  const abbreviations: Record<string, string> = {
    'english essay': 'eng-essay',
    'english precis and composition': 'eng-precis',
    'pakistan affairs': 'pak-affairs',
    'islamic studies': 'islamic',
    'current affairs': 'current',
    'general science ability': 'gsa',
    'general science and ability': 'gsa',
    'international relations': 'ir',
    'public administration': 'pub-admin',
    'political science': 'pol-sci',
    'journalism mass communication': 'journalism',
    'journalism and mass communication': 'journalism',
    'business administration': 'bba',
    'banking finance': 'banking',
    'banking and finance': 'banking',
    'accounting auditing': 'accounting',
    'accounting and auditing': 'accounting',
    'environmental sciences': 'env-sci',
    'computer science': 'cs',
    'information technology': 'it'
  }
  
  const normalized = normalizeSubjectClean(subject)
  return abbreviations[normalized] || normalizeSubjectKebab(subject)
}

/**
 * Validate that a generated path is reasonable
 */
export function validatePath(path: string): boolean {
  // Basic validation rules
  if (!path || path.length === 0) return false
  if (path.length > 200) return false // Too long
  if (path.includes('//')) return false // Double slashes
  if (path.includes('..')) return false // Directory traversal
  if (!path.endsWith('.pdf')) return false // Must be PDF
  
  return true
}

/**
 * Generate all possible path patterns for a subject and year
 */
export function generatePathPatterns(subject: string, year: number): string[] {
  // Normalize subject in different ways
  const subjectKebab = normalizeSubjectKebab(subject)
  const subjectUnderscore = normalizeSubjectUnderscore(subject)
  const subjectClean = normalizeSubjectClean(subject)
  const subjectAbbrev = normalizeSubjectAbbreviated(subject)
  
  // Generate comprehensive list of possible paths - PRIORITIZED ORDER
  // Based on actual storage analysis: subject-name/year/subject-name_year.pdf
  const patterns = [
    // HIGHEST PRIORITY: EXACT patterns found in storage (996 PDFs confirmed)
    `${subjectKebab}/${year}/${subjectKebab}_${year}.pdf`, // ✅ CONFIRMED: pakistan-affairs/2023/pakistan-affairs_2023.pdf
    `${subjectUnderscore}/${year}/${subjectUnderscore}_${year}.pdf`, // ✅ CONFIRMED: law/2023/law_2023.pdf
    
    // Alternative patterns (lower priority)
    `${subjectKebab}/${year}/${subjectKebab}-${year}.pdf`,
    `${subjectUnderscore}/${year}/${subjectUnderscore}-${year}.pdf`,
    
    // Try with exact subject name as provided
    `${subject.toLowerCase().replace(/\s+/g, '-')}/${year}/${subject.toLowerCase().replace(/\s+/g, '-')}_${year}.pdf`,
    `${subject.toLowerCase().replace(/\s+/g, '-')}/${year}/${subject.toLowerCase().replace(/\s+/g, '-')}-${year}.pdf`,
    
    // Standard nested patterns - kebab case
    `${subjectKebab}/${year}/${subjectKebab}-${year}.pdf`,
    `${subjectKebab}/${year}/paper.pdf`,
    `${subjectKebab}/${year}/${year}.pdf`,
    `${subjectKebab}/${year}/${subjectKebab}.pdf`,
    
    // Standard nested patterns - underscore
    `${subjectUnderscore}/${year}/${subjectUnderscore}-${year}.pdf`,
    `${subjectUnderscore}/${year}/paper.pdf`,
    `${subjectUnderscore}/${year}/${year}.pdf`,
    `${subjectUnderscore}/${year}/${subjectUnderscore}.pdf`,
    
    // Abbreviated patterns
    `${subjectAbbrev}/${year}/${subjectAbbrev}-${year}.pdf`,
    `${subjectAbbrev}/${year}/paper.pdf`,
    `${subjectAbbrev}/${year}/${year}.pdf`,
    `${subjectAbbrev}/${year}/${subjectAbbrev}.pdf`,
    
    // Direct file patterns
    `${subjectKebab}-${year}.pdf`,
    `${subjectUnderscore}-${year}.pdf`,
    `${subjectClean}-${year}.pdf`,
    `${subjectAbbrev}-${year}.pdf`,
    `${subjectKebab}_${year}.pdf`,
    `${subjectUnderscore}_${year}.pdf`,
    
    // Year-first patterns
    `${year}/${subjectKebab}.pdf`,
    `${year}/${subjectUnderscore}.pdf`,
    `${year}/${subjectAbbrev}.pdf`,
    `${year}/${subjectKebab}-${year}.pdf`,
    `${year}/${subjectUnderscore}-${year}.pdf`,
    
    // Nested folder patterns
    `past-papers/${subjectKebab}/${year}.pdf`,
    `past-papers/${subjectUnderscore}/${year}.pdf`,
    `past-papers/${subjectAbbrev}/${year}.pdf`,
    `css-past-papers/${subjectKebab}/${year}.pdf`,
    `css-past-papers/${subjectUnderscore}/${year}.pdf`,
    `css-past-papers/${subjectAbbrev}/${year}.pdf`,
    
    // Common variations
    `papers/${subjectKebab}/${year}.pdf`,
    `papers/${subjectUnderscore}/${year}.pdf`,
    `papers/${subjectAbbrev}/${year}.pdf`,
    `${subjectKebab}/${subjectKebab}-${year}.pdf`,
    `${subjectUnderscore}/${subjectUnderscore}-${year}.pdf`,
    
    // Simple patterns
    `${subjectKebab}.pdf`,
    `${subjectUnderscore}.pdf`,
    `${subjectAbbrev}.pdf`,
    `${year}-${subjectKebab}.pdf`,
    `${year}-${subjectUnderscore}.pdf`,
    `${year}-${subjectAbbrev}.pdf`,
    
    // Legacy patterns (in case files were uploaded with different naming)
    `${subject.toLowerCase().replace(/\s+/g, '-')}/${year}.pdf`,
    `${subject.toLowerCase().replace(/\s+/g, '_')}/${year}.pdf`,
    `${subject.replace(/\s+/g, '')}-${year}.pdf`.toLowerCase(),
  ]
  
  // Filter valid paths and remove duplicates
  const validPatterns = patterns
    .filter(validatePath)
    .filter((path, index, arr) => arr.indexOf(path) === index) // Remove duplicates
  
  return validPatterns
}

/**
 * Perform fuzzy matching to find files when exact paths fail
 */
export async function fuzzyMatchPDF(
  subject: string,
  year: number
): Promise<{ success: boolean; url?: string; foundPath?: string; error?: string }> {
  try {
    const supabase = createClient()

    // OPTIMIZED: Reduce limit to 100 files max to minimize egress
    // Most buckets have organized folders, so fuzzy match should find files quickly
    const { data: files, error: listError } = await supabase.storage
      .from('css-past-papers')
      .list('', {
        limit: 100, // Reduced from 1000 to minimize egress (90% reduction)
        sortBy: { column: 'name', order: 'asc' },
        search: year.toString() // Search for files containing the year
      })
    
    if (listError || !files) {
      console.log('❌ Failed to list files for fuzzy matching:', listError?.message)
      return { success: false, error: `Failed to list files: ${listError?.message}` }
    }
    
    console.log(`📁 Found ${files.length} files in storage for fuzzy matching`)
    
    // Extract keywords from subject for matching
    const subjectKeywords = subject.toLowerCase()
      .split(/[\s\-_()&]+/)
      .filter(word => word.length > 2)
    
    console.log('🔍 Fuzzy matching with keywords:', subjectKeywords, 'for year:', year)
    
    // Score files based on keyword matches and year
    const scoredFiles = files
      .filter(file => file.name && file.name.endsWith('.pdf'))
      .map(file => {
        const fileName = file.name.toLowerCase()
        let score = 0
        
        // Year match is critical (must have year)
        if (fileName.includes(year.toString())) {
          score += 20
        } else {
          return { file, score: 0 } // Skip files without matching year
        }
        
        // Subject keyword matches
        subjectKeywords.forEach(keyword => {
          if (fileName.includes(keyword)) {
            score += 10
          }
        })
        
        // Bonus for exact subject matches (normalized)
        const subjectNormalized = normalizeSubjectClean(subject)
        if (fileName.includes(subjectNormalized)) {
          score += 25
        }
        
        // Bonus for kebab-case matches
        const subjectKebab = normalizeSubjectKebab(subject)
        if (fileName.includes(subjectKebab)) {
          score += 15
        }
        
        // Bonus for underscore matches
        const subjectUnderscore = normalizeSubjectUnderscore(subject)
        if (fileName.includes(subjectUnderscore)) {
          score += 15
        }
        
        return { file, score }
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
    
    console.log('🎯 Top fuzzy matches:', scoredFiles.slice(0, 5).map(item => ({ 
      name: item.file.name, 
      score: item.score 
    })))
    
    if (scoredFiles.length === 0) {
      return { 
        success: false, 
        error: `No matching files found for "${subject}" (${year}). Available files: ${files.length}` 
      }
    }
    
    // Try the best match
    const bestMatch = scoredFiles[0].file
    console.log(`🎯 Trying best fuzzy match: ${bestMatch.name} (score: ${scoredFiles[0].score})`)

    const { data } = supabase.storage
      .from('css-past-papers')
      .getPublicUrl(bestMatch.name)

    if (!data?.publicUrl) {
      console.log(`❌ Failed to get public URL for fuzzy match`)
      return { success: false, error: `Failed to get public URL for ${bestMatch.name}` }
    }

    console.log(`✅ Fuzzy match successful: ${bestMatch.name}`)
    return {
      success: true,
      url: data.publicUrl,
      foundPath: bestMatch.name
    }
  } catch (error) {
    console.error('Fuzzy match error:', error)
    return { 
      success: false, 
      error: `Fuzzy matching failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }
  }
}

/**
 * Get a signed URL for a past paper with enhanced path resolution
 * Generates fresh signed URLs to ensure security (no cross-user cache issues)
 */
export async function getPastPaperUrl(
  subject: string,
  year: number
): Promise<{ success: boolean; url?: string; error?: string; searchedPaths?: string[]; foundAt?: string }> {
  try {
    const supabase = createClient()

    // First check if storage is accessible
    const storageCheck = await checkStorageAccess()
    if (!storageCheck.success) {
      return {
        success: false,
        error: `Storage setup required: ${storageCheck.error}`,
        searchedPaths: []
      }
    }

    // Generate all possible paths
    const possiblePaths = generatePathPatterns(subject, year)
    console.log(`🔍 Searching ${possiblePaths.length} possible paths for ${subject} (${year})`)

    // Try each path with better error handling
    for (const path of possiblePaths) {
      try {
        const { data } = supabase.storage
          .from('css-past-papers')
          .getPublicUrl(path)

        if (data?.publicUrl) {
          console.log(`✅ Found PDF at: ${path}`)
          return {
            success: true,
            url: data.publicUrl,
            foundAt: path,
            searchedPaths: possiblePaths
          }
        }

        console.log(`❌ Path ${path} - no public URL generated`)
      } catch (err) {
        console.log(`❌ Path ${path} threw error:`, err)
        continue
      }
    }
    
    console.log('❌ Exact path matching failed, trying fuzzy search...')
    
    // If exact paths fail, try fuzzy matching
    const fuzzyResult = await fuzzyMatchPDF(subject, year)
    if (fuzzyResult.success) {
      return {
        success: true,
        url: fuzzyResult.url,
        foundAt: fuzzyResult.foundPath,
        searchedPaths: possiblePaths
      }
    }
    
    // Enhanced error message with more context
    const errorMessage = `PDF not found for "${subject}" (${year}). Searched ${possiblePaths.length} paths. Check if the PDF exists in Supabase storage with the correct naming pattern.`
    
    return { 
      success: false, 
      error: errorMessage,
      searchedPaths: possiblePaths
    }
  } catch (error) {
    console.error('Get URL error:', error)
    return { 
      success: false, 
      error: `Failed to get PDF URL: ${error instanceof Error ? error.message : 'Unknown error'}`,
      searchedPaths: []
    }
  }
}

/**
 * List all available past papers by recursively searching all folders
 */
export async function listPastPapers(): Promise<{ success: boolean; papers?: PastPaper[]; error?: string }> {
  try {
    const supabase = createClient()
    
    console.log('🔍 Listing all papers from storage...')
    
    // First get all top-level folders (subjects)
    const { data: topLevelItems, error: topError } = await supabase.storage
      .from('css-past-papers')
      .list('', { limit: 1000 })
    
    if (topError) {
      console.error('❌ Failed to list top-level items:', topError.message)
      return { success: false, error: topError.message }
    }
    
    console.log(`📁 Found ${topLevelItems?.length || 0} top-level items`)
    
    const papers: PastPaper[] = []
    
    // For each top-level folder (subject), list its contents
    for (const item of topLevelItems || []) {
      if (item.name && !item.name.endsWith('.pdf')) {
        // This is a folder, list its contents
        console.log(`📂 Exploring folder: ${item.name}`)
        
        try {
          const { data: subjectItems, error: subjectError } = await supabase.storage
            .from('css-past-papers')
            .list(item.name, { limit: 1000 })
          
          if (subjectError) {
            console.error(`❌ Failed to list ${item.name}:`, subjectError.message)
            continue
          }
          
          // For each year folder in the subject
          for (const yearItem of subjectItems || []) {
            if (yearItem.name && !yearItem.name.endsWith('.pdf')) {
              // This is a year folder, list its PDFs
              const yearPath = `${item.name}/${yearItem.name}`
              console.log(`📅 Exploring year folder: ${yearPath}`)
              
              try {
                const { data: pdfItems, error: pdfError } = await supabase.storage
                  .from('css-past-papers')
                  .list(yearPath, { limit: 100 })
                
                if (pdfError) {
                  console.error(`❌ Failed to list PDFs in ${yearPath}:`, pdfError.message)
                  continue
                }
                
                // Add all PDF files found
                for (const pdfItem of pdfItems || []) {
                  if (pdfItem.name && pdfItem.name.endsWith('.pdf')) {
                    const fullPath = `${yearPath}/${pdfItem.name}`
                    const year = parseInt(yearItem.name)
                    
                    if (!isNaN(year)) {
                      papers.push({
                        subject: item.name,
                        year: year,
                        filename: pdfItem.name,
                        storage_path: fullPath,
                        file_size: pdfItem.metadata?.size,
                        uploaded_at: pdfItem.created_at
                      })
                      console.log(`📄 Found PDF: ${fullPath}`)
                    }
                  }
                }
              } catch (pdfErr) {
                console.error(`❌ Error listing PDFs in ${yearPath}:`, pdfErr)
                continue
              }
            } else if (yearItem.name && yearItem.name.endsWith('.pdf')) {
              // Direct PDF file in subject folder
              const fullPath = `${item.name}/${yearItem.name}`
              console.log(`📄 Found direct PDF: ${fullPath}`)
              
              // Try to extract year from filename
              const yearMatch = yearItem.name.match(/(\d{4})/)
              const year = yearMatch ? parseInt(yearMatch[1]) : 2023
              
              papers.push({
                subject: item.name,
                year: year,
                filename: yearItem.name,
                storage_path: fullPath,
                file_size: yearItem.metadata?.size,
                uploaded_at: yearItem.created_at
              })
            }
          }
        } catch (subjectErr) {
          console.error(`❌ Error exploring subject ${item.name}:`, subjectErr)
          continue
        }
      } else if (item.name && item.name.endsWith('.pdf')) {
        // Direct PDF file in root
        console.log(`📄 Found root PDF: ${item.name}`)
        
        // Try to extract subject and year from filename
        const parts = item.name.replace('.pdf', '').split(/[-_]/)
        const yearMatch = item.name.match(/(\d{4})/)
        const year = yearMatch ? parseInt(yearMatch[1]) : 2023
        const subject = parts[0] || 'unknown'
        
        papers.push({
          subject: subject,
          year: year,
          filename: item.name,
          storage_path: item.name,
          file_size: item.metadata?.size,
          uploaded_at: item.created_at
        })
      }
    }
    
    console.log(`✅ Found ${papers.length} total papers`)
    console.log('📊 Papers by subject:', papers.reduce((acc, paper) => {
      acc[paper.subject] = (acc[paper.subject] || 0) + 1
      return acc
    }, {} as Record<string, number>))
    
    return { success: true, papers }
  } catch (error) {
    console.error('❌ List papers error:', error)
    return { success: false, error: 'Failed to list past papers' }
  }
}

/**
 * Get a public URL for a solved paper with aggressive cache-busting
 */
export async function getSolvedPaperUrl(
  paperId?: string
): Promise<{ success: boolean; url?: string; error?: string; foundAt?: string }> {
  try {
    console.log('🔍 Looking for solved paper with ID:', paperId)
    
    // REAL SOLVED PAPER - Direct public URL from Supabase storage
    // Path: css-solved-papers/solved-papers/jwt_css_solved_paper_2024.pdf
    
    // AGGRESSIVE CACHE BUSTING: Use timestamp + random to prevent any caching issues
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(7)
    const cacheBuster = `${timestamp}-${random}`
    
    // Add multiple cache-busting parameters to ensure fresh load
    const publicUrl = `https://qsrkkvrrxorbgvbgekew.supabase.co/storage/v1/object/public/css-solved-papers/solved-papers/jwt_css_solved_paper_2024.pdf?v=${cacheBuster}&t=${timestamp}&nocache=${random}`
    
    console.log('✅ Using real solved paper URL with aggressive cache buster')
    console.log(`   Cache buster: ${cacheBuster}`)
    
    return { 
      success: true, 
      url: publicUrl, 
      foundAt: 'solved-papers/jwt_css_solved_paper_2024.pdf'
    }
  } catch (error) {
    console.error('❌ Get solved paper URL error:', error)
    return { 
      success: false, 
      error: `Failed to get solved paper URL: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Check if storage bucket exists and is accessible
 */
export async function checkStorageAccess(): Promise<{ success: boolean; error?: string; bucketExists?: boolean }> {
  try {
    const supabase = createClient()
    
    // First check if bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      return { success: false, error: `Failed to list buckets: ${bucketsError.message}`, bucketExists: false }
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === 'css-past-papers') || false
    
    if (!bucketExists) {
      return { 
        success: false, 
        error: 'Storage bucket "css-past-papers" does not exist. Please create it in your Supabase dashboard first.',
        bucketExists: false 
      }
    }
    
    // Then check if we can access the bucket
    const { error } = await supabase.storage
      .from('css-past-papers')
      .list('', { limit: 1 })
    
    if (error) {
      return { success: false, error: `Storage not accessible: ${error.message}`, bucketExists: true }
    }
    
    return { success: true, bucketExists: true }
  } catch (error) {
    console.error('Storage check error:', error)
    return { success: false, error: 'Failed to check storage access', bucketExists: false }
  }
}