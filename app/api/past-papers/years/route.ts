import { NextRequest, NextResponse } from 'next/server'
import { getFastYearsForSubject } from '@/lib/fast-subjects-data'
import { rateLimit, getClientIP, RATE_LIMITS } from '@/lib/security/rateLimiter'
import { isLikelyBot } from '@/lib/security/botDetection'

/**
 * REAL-TIME API - Get years for subject from actual storage
 * Returns live data from Supabase storage scan
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
    const rateLimitResult = rateLimit(`years:${clientIP}`, RATE_LIMITS.PAST_PAPERS)
    
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

    const { searchParams } = new URL(request.url)
    const subject = searchParams.get('subject')
    
    if (!subject) {
      return NextResponse.json({
        success: false,
        error: 'Subject parameter is required',
        years: []
      }, { status: 400 })
    }
    
    // Use cached data for performance
    const years = getFastYearsForSubject(subject)
    
    return NextResponse.json({
      success: true,
      years,
      subject,
      source: 'fast-cache',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    // API error occurred
    
    return NextResponse.json({
      success: false,
      error: 'Failed to load years',
      years: [],
      source: 'error'
    }, { status: 500 })
  }
}