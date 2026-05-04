/**
 * Verifies question_reports accepts the same payload shape as the quiz UI (anon key + RLS insert),
 * then reads the row back and optionally deletes it with the service role.
 *
 * Run from quiz-app: npx tsx scripts/test-question-reports-e2e.ts
 */
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

function fail(msg: string): never {
  console.error(msg)
  process.exit(1)
}

async function main() {
  if (!url || !anonKey) {
    fail('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY (.env.local).')
  }

  const markerQuestionId = 9_990_000 + Math.floor(Math.random() * 1000)
  const subject = 'e2e-script-report'

  const payload = {
    question_id: markerQuestionId,
    question_type: 'css-e2e-exam-slug',
    subject,
    user_id: null as string | null,
    report_sequence: 3,
    quiz_length: 20,
    mock_number: 1,
  }

  const anon = createClient(url, anonKey)

  console.log('1) Inserting row with anon key (same shape as QuizInterface / mocks)…')
  let inserted: {
    id: number
    question_id: number
    question_type: string
    subject: string | null
    report_sequence: number | null
    quiz_length: number | null
    mock_number: number | null
    reported_at?: string
    status?: string
  } | null = null

  try {
    const { data, error: insertError } = await anon
      .from('question_reports')
      .insert(payload)
      .select(
        'id, question_id, question_type, subject, report_sequence, quiz_length, mock_number, reported_at, status'
      )
      .single()

    if (insertError) {
      const msg = insertError.message ?? String(insertError)
      const code = insertError.code ?? ''
      console.error('Insert failed:', msg, code ? `(code ${code})` : '')
      if (msg.includes('question_type') || code === '23514') {
        console.error(
          '\nHint: If question_type is restricted by an old CHECK, run SQL from:\n  supabase/migrations/038_question_reports_question_type_flex.sql\n'
        )
      }
      if (msg.includes('fetch') || msg.includes('network')) {
        console.error(
          '\nHint: Check internet/VPN and that NEXT_PUBLIC_SUPABASE_URL is reachable from this machine.\n'
        )
      }
      process.exit(1)
    }
    inserted = data
  } catch (e) {
    const err = e as Error
    console.error('Insert threw:', err.message, err.cause != null ? String(err.cause) : '')
    console.error(
      '\nHint: Check NEXT_PUBLIC_SUPABASE_URL, network, and that the Supabase project is not paused.\n'
    )
    process.exit(1)
  }

  if (!inserted?.id) {
    fail('Insert returned no row.')
  }

  console.log('   Insert OK. Row:', JSON.stringify(inserted, null, 2))

  console.log('2) Reading row back with anon key…')
  const { data: readBack, error: readError } = await anon
    .from('question_reports')
    .select('id, question_id, question_type, subject, report_sequence, quiz_length, mock_number')
    .eq('id', inserted.id)
    .single()

  if (readError || !readBack) {
    console.error('Select failed:', readError?.message)
    process.exit(1)
  }

  if (readBack.question_id !== markerQuestionId || readBack.report_sequence !== 3) {
    fail('Read-back data mismatch.')
  }

  console.log('   Read OK:', JSON.stringify(readBack, null, 2))

  if (serviceKey) {
    console.log('3) Deleting test row with service role…')
    const admin = createClient(url, serviceKey, { auth: { persistSession: false } })
    const { error: delError } = await admin.from('question_reports').delete().eq('id', inserted.id)
    if (delError) {
      console.error('Delete failed (safe to remove manually):', delError.message)
      process.exit(1)
    }
    console.log('   Deleted. End-to-end OK.')
  } else {
    console.log(
      '3) No SUPABASE_SERVICE_ROLE_KEY — skipped delete. Remove test row manually if you like:\n' +
        `   id = ${inserted.id}, question_id = ${markerQuestionId}`
    )
    console.log('   Insert + read OK.')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
