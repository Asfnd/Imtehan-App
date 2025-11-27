import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

export async function GET() {
  try {
    const supabase = createClient()
    // Test Supabase connection
    const { data: tables, error: dbError } = await supabase
      .from('users')
      .select('count')
      .limit(1)

    const supabaseStatus = dbError ? 'error' : 'connected'

    // Test Hugging Face (just check if key exists)
    const hfStatus = process.env.HUGGINGFACE_API_KEY ? 'configured' : 'missing'

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        supabase: {
          status: supabaseStatus,
          url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing',
          error: dbError?.message,
        },
        huggingface: {
          status: hfStatus,
        },
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        nextVersion: '16.0.1',
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
