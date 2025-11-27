import { NextRequest, NextResponse } from 'next/server'
import { validateInput, captchaVerificationSchema } from '@/lib/validation/schemas'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const result = validateInput(captchaVerificationSchema, body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      )
    }

    const { token } = result.data

    // Verify with hCaptcha
    const secretKey = process.env.HCAPTCHA_SECRET_KEY

    if (!secretKey) {
      console.error('hCaptcha secret key not configured')
      // Fail open in development
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({ success: true, verified: true })
      }
      return NextResponse.json(
        { error: 'CAPTCHA not configured' },
        { status: 500 }
      )
    }

    // Verify token with hCaptcha API
    const verifyResponse = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    const verifyData = await verifyResponse.json()

    if (verifyData.success) {
      return NextResponse.json({ 
        success: true, 
        verified: true 
      })
    } else {
      return NextResponse.json(
        { 
          success: false, 
          verified: false,
          error: 'CAPTCHA verification failed',
          'error-codes': verifyData['error-codes'],
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('CAPTCHA verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
