import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topic: string }> }
) {
  try {
    const supabase = createClient()
    const { topic } = await params

    // Get a quiz for this topic
    const { data: quiz, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('topic', topic)
      .limit(1)
      .single()

    if (error || !quiz) {
      return NextResponse.json(
        { error: 'Quiz not found for this topic' },
        { status: 404 }
      )
    }

    return NextResponse.json({ quiz })
  } catch (error) {
    console.error('Error fetching quiz:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quiz' },
      { status: 500 }
    )
  }
}
