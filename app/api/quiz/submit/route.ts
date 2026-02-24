import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getAuthenticatedUser, verifyUserOwnership, validateInput } from '@/lib/security/request-verification'
import { csrfProtection } from '@/lib/security/csrf'
import type { Answer } from '@/lib/supabase/types'

/**
 * SECURITY: Quiz Submission Endpoint
 * - Verifies user is authenticated
 * - Validates user owns the submission
 * - Validates all input parameters
 */
export async function POST(request: NextRequest) {
  try {
    // SECURITY: Verify user is authenticated
    const authUser = await getAuthenticatedUser()
    if (!authUser) {
      return NextResponse.json(
        { error: 'Unauthorized - please sign in' },
        { status: 401 }
      )
    }

    // SECURITY: CSRF protection
    const csrfError = csrfProtection(request)
    if (csrfError) return csrfError

    const body = await request.json()
    const { userId, quizId, topic, answers, timeTaken } = body as {
      userId: string
      quizId: string
      topic: string
      answers: Answer[]
      timeTaken: number
    }

    // SECURITY: Verify all required fields
    if (!userId || !quizId || !topic || !answers || typeof timeTaken !== 'number') {
      return NextResponse.json(
        { error: 'Missing or invalid required fields' },
        { status: 400 }
      )
    }

    // SECURITY: Verify user owns this submission (prevent submitting as another user)
    if (!verifyUserOwnership(authUser.id, userId)) {
      return NextResponse.json(
        { error: 'Unauthorized - cannot submit quiz for another user' },
        { status: 403 }
      )
    }

    // SECURITY: Validate topic parameter (prevent injection)
    const topicValidation = validateInput(topic, {
      minLength: 1,
      maxLength: 100,
      pattern: /^[a-zA-Z0-9\s\-&(),']+$/,
    }, 'topic')

    if (!topicValidation.valid) {
      return NextResponse.json(
        { error: topicValidation.error },
        { status: 400 }
      )
    }

    // SECURITY: Validate quizId (prevent injection)
    const quizIdValidation = validateInput(quizId, {
      minLength: 1,
      maxLength: 100,
    }, 'quizId')

    if (!quizIdValidation.valid) {
      return NextResponse.json(
        { error: quizIdValidation.error },
        { status: 400 }
      )
    }

    // SECURITY: Validate timeTaken is reasonable (0 - 1 hour in milliseconds)
    if (timeTaken < 0 || timeTaken > 3600000) {
      return NextResponse.json(
        { error: 'Invalid time taken' },
        { status: 400 }
      )
    }

    // SECURITY: Validate answers array
    if (!Array.isArray(answers) || answers.length === 0 || answers.length > 500) {
      return NextResponse.json(
        { error: 'Invalid answers array' },
        { status: 400 }
      )
    }

    // SECURITY: Validate answer structure
    for (const answer of answers) {
      if (
        typeof answer.question_id !== 'string' ||
        typeof answer.selected_answer !== 'string' ||
        typeof answer.is_correct !== 'boolean' ||
        typeof answer.time_spent !== 'number'
      ) {
        return NextResponse.json(
          { error: 'Invalid answer structure' },
          { status: 400 }
        )
      }

      // SECURITY: Validate answer data ranges
      if (answer.time_spent < 0 || answer.time_spent > 3600000) {
        return NextResponse.json(
          { error: 'Invalid time spent on question' },
          { status: 400 }
        )
      }

      if (answer.selected_answer.length > 500) {
        return NextResponse.json(
          { error: 'Answer text too long' },
          { status: 400 }
        )
      }
    }

    // Calculate score
    const score = answers.filter(a => a.is_correct).length
    const totalQuestions = answers.length

    // Get server-side Supabase client
    const supabase = await createServerSupabaseClient()

    // SECURITY: Save quiz history with user_id from authenticated session (not from client)
    const { data: history, error: historyError } = await supabase
      .from('quiz_history')
      .insert({
        user_id: authUser.id,
        quiz_id: quizId,
        topic,
        score,
        total_questions: totalQuestions,
        time_taken: timeTaken,
        answers,
      })
      .select()
      .single()

    if (historyError && process.env.NODE_ENV === 'development') {
      console.error('Quiz history save error:', historyError)
    }

    // Calculate XP (10 per correct answer + bonus based on score)
    const baseXP = score * 10
    const bonusXP = score === totalQuestions ? 50 : score >= totalQuestions * 0.8 ? 25 : 0
    const totalXP = baseXP + bonusXP

    // SECURITY: Get user data with user_id from authenticated session
    const { data: currentUser } = await supabase
      .from('users')
      .select('total_xp, level, current_streak, longest_streak, total_quizzes, last_quiz_date')
      .eq('id', authUser.id)
      .single()

    let newXP = totalXP
    let newLevel = 1
    let leveledUp = false
    let newStreak = 1
    let newLongest = 1

    if (currentUser) {
      // Update XP and level
      newXP = currentUser.total_xp + totalXP
      newLevel = Math.floor(Math.sqrt(newXP / 100)) + 1
      leveledUp = newLevel > currentUser.level

      // Calculate streak based on last quiz date
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      let lastQuizDate: Date | null = null
      if (currentUser.last_quiz_date) {
        lastQuizDate = new Date(currentUser.last_quiz_date)
        lastQuizDate.setHours(0, 0, 0, 0)
      }

      if (!lastQuizDate) {
        // First quiz ever
        newStreak = 1
        newLongest = 1
      } else {
        const daysDiff = Math.floor((today.getTime() - lastQuizDate.getTime()) / (1000 * 60 * 60 * 24))
        
        if (daysDiff === 0) {
          // Same day - maintain streak
          newStreak = currentUser.current_streak
          newLongest = currentUser.longest_streak
        } else if (daysDiff === 1) {
          // Next day - increment streak
          newStreak = currentUser.current_streak + 1
          newLongest = Math.max(newStreak, currentUser.longest_streak)
        } else {
          // Streak broken - reset to 1
          newStreak = 1
          newLongest = currentUser.longest_streak
        }
      }

      // SECURITY: Update user profile with user_id from authenticated session
      const { error: updateError } = await supabase
        .from('users')
        .update({
          total_xp: newXP,
          level: newLevel,
          current_streak: newStreak,
          longest_streak: newLongest,
          total_quizzes: (currentUser.total_quizzes || 0) + 1,
          last_quiz_date: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', authUser.id)

      if (updateError && process.env.NODE_ENV === 'development') {
        console.error('User update error:', updateError)
      }
    }

    return NextResponse.json({
      success: true,
      result: {
        quiz_id: quizId,
        topic,
        score,
        total_questions: totalQuestions,
        time_taken: timeTaken,
        answers,
        xp_earned: totalXP,
        level_up: leveledUp,
        new_level: newLevel,
        current_streak: newStreak,
        longest_streak: newLongest,
        completed_at: history?.completed_at || new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Quiz submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    )
  }
}
