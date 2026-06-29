/**
 * Demo: show expansion results + sample MCQs with explanations.
 * Run: npx tsx scripts/demo-mcq-expansion.ts
 */
import { createClient } from '@supabase/supabase-js'

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY
  if (!url || !key) {
    console.error('Missing Supabase credentials')
    process.exit(1)
  }
  const supabase = createClient(url, key)

  console.log('\n═══════════════════════════════════════════════════════════')
  console.log('  IMTEHAN MCQ EXPANSION DEMO')
  console.log('═══════════════════════════════════════════════════════════\n')

  // Year integrity
  const { count: withYear } = await supabase
    .from('css_mcqs_enhanced')
    .select('*', { count: 'exact', head: true })
    .not('year', 'is', null)
  const { count: noYear } = await supabase
    .from('css_mcqs_enhanced')
    .select('*', { count: 'exact', head: true })
    .is('year', null)

  console.log('📅 CSS YEAR-WISE INTEGRITY')
  console.log(`   Past-paper rows (year set):     ${withYear?.toLocaleString()}`)
  console.log(`   Practice-only rows (year NULL): ${noYear?.toLocaleString()}`)
  console.log('   → New practice MCQs use year=NULL so year picker is untouched.\n')

  // Top subjects by year count (unchanged structure)
  const { data: topSubjects } = await supabase.rpc('get_enhanced_css_subject_stats')
  if (topSubjects && Array.isArray(topSubjects)) {
    console.log('📚 TOP CSS SUBJECTS (year-wise past papers intact):')
    for (const s of (topSubjects as { subject: string; question_count: number }[]).slice(0, 5)) {
      console.log(`   • ${s.subject}: ${s.question_count} MCQs`)
    }
    console.log()
  }

  // ISSB counts
  console.log('🎯 ISSB MODULE (dedicated banks, mandatory explanations)')
  for (const t of [
    'issb_english',
    'issb_mathematics',
    'issb_general_knowledge',
    'issb_pakistan_affairs',
    'issb_intelligence',
  ]) {
    const { count } = await supabase.from(t).select('*', { count: 'exact', head: true })
    console.log(`   ${t.replace('issb_', '').padEnd(22)} ${count} MCQs`)
  }

  // Sample ISSB MCQ
  const { data: sample } = await supabase
    .from('issb_intelligence')
    .select('question, option_a, option_b, option_c, option_d, correct_answer, explanation, topic')
    .limit(1)
    .order('id', { ascending: false })

  if (sample?.[0]) {
    const m = sample[0]
    console.log('\n─── SAMPLE ISSB MCQ (with explanation) ───')
    console.log(`Q: ${m.question}`)
    console.log(`A) ${m.option_a}`)
    console.log(`B) ${m.option_b}`)
    console.log(`C) ${m.option_c}`)
    console.log(`D) ${m.option_d}`)
    console.log(`✓ Answer: ${m.correct_answer}  |  Topic: ${m.topic}`)
    console.log(`💡 ${m.explanation}`)
  }

  // Sample CSS practice (year null)
  const { data: cssSample } = await supabase
    .from('css_mcqs_enhanced')
    .select('subject, question_text, correct_answer, explanation_detailed, year')
    .is('year', null)
    .eq('subject', 'Economics')
    .limit(1)
    .order('id', { ascending: false })

  if (cssSample?.[0]) {
    const c = cssSample[0]
    console.log('\n─── SAMPLE CSS PRACTICE MCQ (year=NULL, safe) ───')
    console.log(`Subject: ${c.subject}  |  year: ${c.year ?? 'NULL ✓'}`)
    console.log(`Q: ${c.question_text.slice(0, 120)}...`)
    console.log(`✓ Answer: ${c.correct_answer}`)
    console.log(`💡 ${c.explanation_detailed?.slice(0, 200)}...`)
  }

  // Sample year-wise (unchanged)
  const { data: yearSample } = await supabase
    .from('css_mcqs_enhanced')
    .select('subject, year, question_text, paper_type')
    .eq('subject', 'Political Science')
    .eq('year', 2024)
    .limit(1)

  if (yearSample?.[0]) {
    const y = yearSample[0]
    console.log('\n─── SAMPLE YEAR-WISE PAST PAPER (untouched) ───')
    console.log(`Subject: ${y.subject}  |  Year: ${y.year}  |  Paper: ${y.paper_type ?? 'single'}`)
    console.log(`Q: ${y.question_text.slice(0, 120)}...`)
  }

  console.log('\n─── WHERE TO TRY IN APP ───')
  console.log('   Web ISSB:     /exams/issb-academic')
  console.log('   Web CSS yrs:  /css/subjects → pick subject → pick year')
  console.log('   Web MDCAT:    /exams/mdcat-pmc')
  console.log('   Mobile:       Military → ISSB Academic\n')
}

main()
