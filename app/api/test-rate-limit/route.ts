import { NextResponse } from 'next/server'

/**
 * Test endpoint to verify rate limiting
 * Try making 25+ rapid requests to see rate limiting in action
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Rate limit check passed',
    timestamp: new Date().toISOString(),
  })
}
