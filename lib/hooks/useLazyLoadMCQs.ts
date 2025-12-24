'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

/**
 * SECURITY: Whitelist of valid subjects to prevent SQL injection and invalid queries
 */
const VALID_SUBJECTS = [
  'pakistan-affairs',
  'islamic-studies',
  'english-essay',
  'english-precis-and-composition',
  'general-science-and-ability',
  'current-affairs',
  'international-relations',
  'political-science',
  'public-administration',
  'accounting-and-auditing',
  'banking-and-finance',
  'business-administration',
  'environmental-sciences',
  'computer-science',
  'information-technology',
  'journalism-and-mass-communication',
  'law',
  'sociology',
  'psychology',
  'philosophy',
  'education',
  'economics',
  'geography',
  'history',
  'literature',
  'chemistry',
  'physics',
  'biology',
  'mathematics'
]

/**
 * Validate subject against whitelist
 */
function isValidSubject(subject: string): boolean {
  if (!subject) return false
  const normalized = subject.toLowerCase().trim()
  return VALID_SUBJECTS.includes(normalized)
}

export interface MCQ {
  id: number
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  subject: string
  year: number
  topic?: string
  difficulty?: string
  // Optional fields loaded on-demand
  explanation_detailed?: string
  explanation_a?: string
  explanation_b?: string
  explanation_c?: string
  explanation_d?: string
  hint_1?: string
  hint_2?: string
  hint_3?: string
}

interface UseLazyLoadMCQsOptions {
  subject?: string
  year?: string
  enableLazyLoad?: boolean // True for subject+year, False for random/MPT
}

interface LoadedMCQ extends MCQ {
  _explanationCached?: boolean
  _hintsLoaded?: boolean
}

export function useLazyLoadMCQs(options: UseLazyLoadMCQsOptions) {
  const { subject, year, enableLazyLoad = false } = options

  // State management
  const [mcqs, setMcqs] = useState<LoadedMCQ[]>([])
  const [totalCount, setTotalCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Batch loading state
  const [isLoadingNextBatch, setIsLoadingNextBatch] = useState(false)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
  const [nextBatchOffset, setNextBatchOffset] = useState(20) // After initial 20

  // Caching - store explanation data by MCQ ID
  const explanationCacheRef = useRef<Map<number, {
    explanation_detailed?: string
    explanation_a?: string
    explanation_b?: string
    explanation_c?: string
    explanation_d?: string
  }>>(new Map())

  // Track if we've already triggered next batch load to avoid duplicate requests
  const batchLoadTriggeredRef = useRef<Set<number>>(new Set())

  const supabase = createClient()

  /**
   * Get count of MCQs for subject+year combination
   */
  const getCount = useCallback(async () => {
    if (!subject || !year) return null

    // SECURITY: Validate subject against whitelist
    if (!isValidSubject(subject)) {
      console.error('Invalid subject:', subject)
      return null
    }

    try {
      const { count, error: countError } = await supabase
        .from('css_mcqs_enhanced')
        .select('*', { count: 'exact', head: true })
        .eq('subject', subject)
        .eq('year', parseInt(year))

      if (countError) throw countError
      return count || 0
    } catch (err) {
      console.error('Error fetching count:', err)
      return null
    }
  }, [subject, year])

  /**
   * Load initial batch (20 MCQs) or all MCQs if lazy load disabled
   */
  const loadInitialBatch = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // SECURITY: Validate subject against whitelist
      if (subject && !isValidSubject(subject)) {
        setError('Invalid subject specified')
        setLoading(false)
        return
      }

      const columns = 'id, question_text, option_a, option_b, option_c, option_d, correct_answer, subject, year, topic, difficulty'

      let query = supabase
        .from('css_mcqs_enhanced')
        .select(columns)

      if (subject) query = query.eq('subject', subject)
      if (year) query = query.eq('year', parseInt(year))

      // Load 20 for subject+year, 20 for random
      const batchSize = 20
      query = query.limit(batchSize)

      const { data, error: queryError } = await query

      if (queryError) throw queryError
      if (!data || data.length === 0) {
        setMcqs([])
        setLoading(false)
        setError('No MCQs found for this selection')
        return
      }

      // Shuffle data
      const shuffled = [...data].sort(() => Math.random() - 0.5)
      setMcqs(shuffled as LoadedMCQ[])

      // If lazy loading enabled and we have subject+year, get total count
      if (enableLazyLoad && subject && year) {
        const count = await getCount()
        setTotalCount(count)

        // Set up next batch loading
        if (count && count > 20) {
          setHasMoreToLoad(true)
          setNextBatchOffset(20)
        } else {
          setHasMoreToLoad(false)
        }
      } else {
        setHasMoreToLoad(false)
      }

      setLoading(false)
    } catch (err) {
      console.error('Error loading initial batch:', err)
      setError(err instanceof Error ? err.message : 'Failed to load MCQs')
      setLoading(false)
    }
  }, [subject, year, enableLazyLoad, supabase, getCount])

  /**
   * Load next batch in background (15 MCQs)
   */
  const loadNextBatch = useCallback(async () => {
    // Prevent duplicate requests
    if (isLoadingNextBatch || !hasMoreToLoad || !subject || !year) return

    // SECURITY: Validate subject against whitelist
    if (!isValidSubject(subject)) {
      console.error('Invalid subject:', subject)
      setHasMoreToLoad(false)
      return
    }

    try {
      setIsLoadingNextBatch(true)

      const columns = 'id, question_text, option_a, option_b, option_c, option_d, correct_answer, subject, year, topic, difficulty'

      const { data, error: queryError } = await supabase
        .from('css_mcqs_enhanced')
        .select(columns)
        .eq('subject', subject)
        .eq('year', parseInt(year))
        .range(nextBatchOffset, nextBatchOffset + 14) // Next 15

      if (queryError) throw queryError

      if (data && data.length > 0) {
        // Append to existing MCQs
        setMcqs(prev => [...prev, ...(data as LoadedMCQ[])])
        setNextBatchOffset(prev => prev + 15)

        // Check if more batches exist
        if (data.length < 15) {
          setHasMoreToLoad(false)
        }
      } else {
        setHasMoreToLoad(false)
      }

      setIsLoadingNextBatch(false)
    } catch (err) {
      console.error('Error loading next batch:', err)
      setIsLoadingNextBatch(false)
      // Continue gracefully - user can still use loaded MCQs
    }
  }, [subject, year, nextBatchOffset, isLoadingNextBatch, hasMoreToLoad, supabase])

  /**
   * Smart trigger: Load next batch when user reaches Q18 (of 20)
   * Only trigger once per batch to avoid duplicate requests
   */
  const checkAndTriggerNextBatch = useCallback((currentQuestionIndex: number) => {
    if (!enableLazyLoad || !hasMoreToLoad) return

    // Load at Q18, Q33, Q48, Q63... (every 20th - 2)
    const batchTriggerPoint = 18 + Math.floor(currentQuestionIndex / 15) * 15

    if (
      currentQuestionIndex >= batchTriggerPoint &&
      !batchLoadTriggeredRef.current.has(batchTriggerPoint)
    ) {
      batchLoadTriggeredRef.current.add(batchTriggerPoint)
      loadNextBatch()
    }
  }, [enableLazyLoad, hasMoreToLoad, loadNextBatch])

  /**
   * Fetch explanation for a specific MCQ (on-demand)
   * SECURITY: Only allow fetching explanations for MCQs in the current quiz
   */
  const fetchExplanation = useCallback(async (mcqId: number) => {
    // SECURITY: Validate that mcqId belongs to a loaded MCQ
    const mcqExists = mcqs.some(q => q.id === mcqId)
    if (!mcqExists) {
      console.error('Invalid MCQ ID - not in current quiz:', mcqId)
      return null
    }

    // Check cache first
    if (explanationCacheRef.current.has(mcqId)) {
      return explanationCacheRef.current.get(mcqId)
    }

    try {
      const { data, error: queryError } = await supabase
        .from('css_mcqs_enhanced')
        .select('explanation_detailed, explanation_a, explanation_b, explanation_c, explanation_d')
        .eq('id', mcqId)
        .single()

      if (queryError) throw queryError

      // Cache it
      explanationCacheRef.current.set(mcqId, data)

      // Update MCQ with explanation
      setMcqs(prev =>
        prev.map(q =>
          q.id === mcqId
            ? {
                ...q,
                explanation_detailed: data.explanation_detailed,
                explanation_a: data.explanation_a,
                explanation_b: data.explanation_b,
                explanation_c: data.explanation_c,
                explanation_d: data.explanation_d,
                _explanationCached: true,
              }
            : q
        )
      )

      return data
    } catch (err) {
      console.error('Error fetching explanation:', err)
      return null
    }
  }, [supabase, mcqs])

  /**
   * Fetch hints for a specific MCQ (on-demand)
   * SECURITY: Only allow fetching hints for MCQs in the current quiz
   */
  const fetchHints = useCallback(async (mcqId: number) => {
    // SECURITY: Validate that mcqId belongs to a loaded MCQ
    const mcqExists = mcqs.some(q => q.id === mcqId)
    if (!mcqExists) {
      console.error('Invalid MCQ ID - not in current quiz:', mcqId)
      return null
    }

    try {
      const { data, error: queryError } = await supabase
        .from('css_mcqs_enhanced')
        .select('hint_1, hint_2, hint_3')
        .eq('id', mcqId)
        .single()

      if (queryError) throw queryError

      // Update MCQ with hints
      setMcqs(prev =>
        prev.map(q =>
          q.id === mcqId
            ? {
                ...q,
                hint_1: data.hint_1,
                hint_2: data.hint_2,
                hint_3: data.hint_3,
                _hintsLoaded: true,
              }
            : q
        )
      )

      return data
    } catch (err) {
      console.error('Error fetching hints:', err)
      return null
    }
  }, [supabase, mcqs])

  /**
   * Initialize on mount
   */
  useEffect(() => {
    loadInitialBatch()
  }, [loadInitialBatch])

  return {
    mcqs,
    totalCount,
    loading,
    error,
    isLoadingNextBatch,
    hasMoreToLoad,
    checkAndTriggerNextBatch,
    fetchExplanation,
    fetchHints,
  }
}
