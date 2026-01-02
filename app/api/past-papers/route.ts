import { NextRequest, NextResponse } from 'next/server'
import { getFastSubjects, getFastTotalPapers, getFastTotalSubjects } from '@/lib/fast-subjects-data'
import { rateLimit, getClientIP, RATE_LIMITS } from '@/lib/security/rateLimiter'
import { isLikelyBot } from '@/lib/security/botDetection'

/**
 * Fast API - Get subjects from cached data
 * Returns pre-computed data for instant response
 */
export async function GET(request: NextRequest) {
  try {
    // Bot detection - block scrapers
    if (isLikelyBot(request)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    // Rate limiting - prevent scraping
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`past-papers:${clientIP}`, RATE_LIMITS.PAST_PAPERS)
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMITS.PAST_PAPERS.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
          }
        }
      )
    }

    // Use fast cached data
    const subjects = getFastSubjects()
    const totalPapers = getFastTotalPapers()
    const totalSubjects = getFastTotalSubjects()
    
    return NextResponse.json({
      success: true,
      subjects,
      total_papers: totalPapers,
      total_subjects: totalSubjects,
      source: 'cache',
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'CDN-Cache-Control': 'public, max-age=300',
        'Vercel-CDN-Cache-Control': 'public, max-age=300'
      }
    })
    
  } catch (error) {
    // Silently handle errors in production
    
    return NextResponse.json({
      success: false,
      error: 'Failed to load subjects',
      subjects: [],
      total_papers: 0,
      total_subjects: 0,
      source: 'error'
    }, { status: 500 })
  }
}