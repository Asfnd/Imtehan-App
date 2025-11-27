import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { seedQuestions } from '../lib/seed-data/quiz-questions'
import type { QuizTopic } from '../lib/supabase/types'

// Load environment variables
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedQuizzes() {
  console.log('🌱 Starting quiz seeding...\n')

  // Group questions by topic
  const questionsByTopic: Record<string, typeof seedQuestions> = {}

  seedQuestions.forEach(q => {
    if (!questionsByTopic[q.topic]) {
      questionsByTopic[q.topic] = []
    }
    questionsByTopic[q.topic].push(q)
  })

  // Create quiz packs for each topic
  for (const [topic, questions] of Object.entries(questionsByTopic)) {
    console.log(`📚 Creating quiz pack for: ${topic}`)

    // Determine difficulty based on questions
    const avgDifficulty =
      questions.reduce((sum, q) => sum + q.difficulty, 0) / questions.length
    const difficulty =
      avgDifficulty < 1.5 ? 'easy' : avgDifficulty < 2.5 ? 'medium' : 'hard'

    // Format questions for storage
    const formattedQuestions = questions.map((q, index) => ({
      id: `${topic.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
      question_text: q.question_text,
      options: q.options,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      difficulty: q.difficulty,
    }))

    // Insert quiz
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        topic,
        difficulty,
        questions: formattedQuestions,
        generated_by: 'manual',
      })
      .select()
      .single()

    if (quizError) {
      console.error(`❌ Error creating quiz for ${topic}:`, quizError.message)
      continue
    }

    console.log(`✅ Created quiz for ${topic} (${questions.length} questions)`)

    // Create quiz pack for offline mode
    const { error: packError } = await supabase.from('quiz_packs').insert({
      topic,
      questions: formattedQuestions,
      version: 1,
    })

    if (packError) {
      console.error(
        `❌ Error creating quiz pack for ${topic}:`,
        packError.message
      )
    } else {
      console.log(`✅ Created offline pack for ${topic}\n`)
    }
  }

  console.log('🎉 Quiz seeding complete!')
  console.log(`\nSeeded ${Object.keys(questionsByTopic).length} topics`)
  console.log(`Total questions: ${seedQuestions.length}`)
}

// Run the seed function
seedQuizzes()
  .then(() => {
    console.log('\n✨ All done!')
    process.exit(0)
  })
  .catch(error => {
    console.error('\n❌ Seeding failed:', error)
    process.exit(1)
  })
