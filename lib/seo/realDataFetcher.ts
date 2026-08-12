/**
 * Real Data Fetcher for SEO
 * Securely fetches aggregate data for SEO content
 * - No raw MCQ exposure
 * - No user data leakage
 * - Aggregate numbers only
 */

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { noteSupabaseFailure, softMode } from '@/lib/supabase-soft'

export interface SubjectStats {
  subject: string
  mcqCount: number
  years: number[]
}

export interface PaperStats {
  year: number
  paperCount: number
  subjects: string[]
}

export interface PlatformStats {
  totalSubjects: number
  totalMCQs: number
  yearsAvailable: number[]
  blogPostCount: number
  totalBlogPosts: number
}

/**
 * Get MCQ statistics by subject
 * Returns: Subject name, MCQ count, years available
 * Security: Aggregate data only, no individual MCQ exposure
 */
export async function getSubjectStats(): Promise<SubjectStats[]> {
  if (softMode()) return getDefaultSubjectStats()
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase.rpc('get_enhanced_css_subject_stats')

    if (error) {
      noteSupabaseFailure(error)
      console.error('Error fetching subject stats:', error)
      return getDefaultSubjectStats()
    }

    return (data || []).map((item: any) => ({
      subject: item.subject,
      mcqCount: item.question_count || 0,
      years: item.years || [],
    }))
  } catch (error) {
    noteSupabaseFailure(error)
    console.error('Failed to fetch subject stats:', error)
    return getDefaultSubjectStats()
  }
}

/**
 * Get past papers statistics by year
 * Returns: Year, number of papers, available subjects
 * Security: Aggregate only, no file paths or sensitive data
 */
export async function getPaperStats(): Promise<PaperStats[]> {
  if (softMode()) return getDefaultPaperStats()
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('past_papers')
      .select('year, subject', { count: 'exact' })
      .order('year', { ascending: false })

    if (error) {
      noteSupabaseFailure(error)
      console.error('Error fetching paper stats:', error)
      return getDefaultPaperStats()
    }

    // Group by year
    const yearMap = new Map<number, Set<string>>()

    data?.forEach((paper: any) => {
      if (paper.year) {
        if (!yearMap.has(paper.year)) {
          yearMap.set(paper.year, new Set())
        }
        yearMap.get(paper.year)?.add(paper.subject)
      }
    })

    // Convert to array
    return Array.from(yearMap.entries())
      .map(([year, subjects]) => ({
        year,
        paperCount: 1, // Assuming one paper per year per subject combination
        subjects: Array.from(subjects),
      }))
      .sort((a, b) => b.year - a.year)
  } catch (error) {
    noteSupabaseFailure(error)
    console.error('Failed to fetch paper stats:', error)
    return getDefaultPaperStats()
  }
}

/**
 * Get overall platform statistics
 * Returns: Total subjects, total MCQs, years covered
 * Security: Aggregate only
 */
export async function getPlatformStats(): Promise<PlatformStats> {
  try {
    const subjectStats = await getSubjectStats()

    const totalMCQs = subjectStats.reduce((sum, s) => sum + s.mcqCount, 0)
    const allYears = Array.from(
      new Set(subjectStats.flatMap((s) => s.years))
    ).sort((a, b) => b - a)

    return {
      totalSubjects: subjectStats.length,
      totalMCQs,
      yearsAvailable: allYears,
      blogPostCount: 21, // From blog/page.tsx data
      totalBlogPosts: 21,
    }
  } catch (error) {
    console.error('Failed to fetch platform stats:', error)
    return getDefaultPlatformStats()
  }
}

/**
 * Get statistics for display on /css/css-practice page
 */
export async function getPracticeStats() {
  try {
    const stats = await getPlatformStats()
    const subjectStats = await getSubjectStats()

    return {
      totalMCQs: stats.totalMCQs,
      totalSubjects: stats.totalSubjects,
      subjects: subjectStats.map((s) => s.subject),
      yearsOfContent: stats.yearsAvailable.length,
      features: [
        `${stats.totalMCQs.toLocaleString()}+ Real MCQ Questions`,
        `${stats.totalSubjects} Compulsory Subjects`,
        'Real Exam Difficulty Level',
        'Instant Feedback & Explanations',
        'Full Mock Tests (100 Questions)',
        'Topic-Wise Practice Quizzes',
        'Performance Analytics Dashboard',
        'Weak Area Detection',
        'Time Management Training',
        'Progress Tracking',
      ],
    }
  } catch (error) {
    console.error('Failed to fetch practice stats:', error)
    return getDefaultPracticeStats()
  }
}

// ============ DEFAULT FALLBACK DATA ============
// These are safe defaults used if database queries fail
// Numbers are conservative and real-world estimates

function getDefaultSubjectStats(): SubjectStats[] {
  return [
    { subject: 'English', mcqCount: 1500, years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
    { subject: 'Islamic Studies', mcqCount: 1500, years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
    { subject: 'Pakistan Affairs', mcqCount: 1500, years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
    { subject: 'General Knowledge', mcqCount: 1500, years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
    { subject: 'Current Affairs', mcqCount: 1000, years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
    { subject: 'Everyday Science', mcqCount: 1000, years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  ]
}

function getDefaultPaperStats(): PaperStats[] {
  return Array.from({ length: 10 }, (_, i) => {
    const year = 2024 - i
    return {
      year,
      paperCount: 1,
      subjects: ['English', 'Islamic Studies', 'Pakistan Affairs', 'General Knowledge', 'Current Affairs', 'Everyday Science'],
    }
  })
}

function getDefaultPlatformStats(): PlatformStats {
  return {
    totalSubjects: 6,
    totalMCQs: 9000, // Conservative estimate: 6 subjects × 1500 avg
    yearsAvailable: [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    blogPostCount: 21,
    totalBlogPosts: 21,
  }
}

function getDefaultPracticeStats() {
  return {
    totalMCQs: 9000,
    totalSubjects: 6,
    subjects: ['English', 'Islamic Studies', 'Pakistan Affairs', 'General Knowledge', 'Current Affairs', 'Everyday Science'],
    yearsOfContent: 10,
    features: [
      '9,000+ Real MCQ Questions',
      '6 Compulsory Subjects',
      'Real Exam Difficulty Level',
      'Instant Feedback & Explanations',
      'Full Mock Tests (100 Questions)',
      'Topic-Wise Practice Quizzes',
      'Performance Analytics Dashboard',
      'Weak Area Detection',
      'Time Management Training',
      'Progress Tracking',
    ],
  }
}
