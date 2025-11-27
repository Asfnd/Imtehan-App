import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import type { Answer } from '@/lib/supabase/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, quizId, topic, answers, timeTaken } = body as {
      userId: string
      quizId: string
      topic: string
      answers: Answer[]
      timeTaken: number
    }

    if (!userId || !quizId || !topic || !answers || !timeTaken) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate score
    const score = answers.filter(a => a.is_correct).length
    const totalQuestions = answers.length

    // Save quiz history using admin client (bypasses RLS)
    const { data: history, error: historyError } = await supabaseAdmin
      .from('quiz_history')
      .insert({
        user_id: userId,
        quiz_id: quizId,
        topic,
        score,
        total_questions: totalQuestions,
        time_taken: timeTaken,
        answers,
      })
      .select()
      .single()

    if (historyError) {
      console.error('Quiz history save error:', historyError)
    }

    // Calculate XP (10 per correct answer + bonus based on score)
    const baseXP = score * 10
    const bonusXP = score === totalQuestions ? 50 : score >= totalQuestions * 0.8 ? 25 : 0
    const totalXP = baseXP + bonusXP

    // Get current user data and last quiz date
    const { data: currentUser } = await supabaseAdmin
      .from('users')
      .select('total_xp, level, current_streak, longest_streak, total_quizzes, last_quiz_date')
      .eq('id', userId)
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

      // Update user profile with all new values
      const { error: updateError } = await supabaseAdmin
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
        .eq('id', userId)

      if (updateError) {
        console.error('User update error:', updateError)
      } else {
        console.log('User profile updated successfully:', {
          newXP,
          newLevel,
          leveledUp,
          newStreak,
          daysSinceLastQuiz: lastQuizDate ? Math.floor((today.getTime() - lastQuizDate.getTime()) / (1000 * 60 * 60 * 24)) : 'first quiz',
        })
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
