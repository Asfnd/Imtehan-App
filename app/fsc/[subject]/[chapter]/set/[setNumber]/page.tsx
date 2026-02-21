import { notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import MDCATSetQuiz from '@/components/MDCATSetQuiz'

const SUBJECT_CONFIG: Record<string, { name: string; table: string }> = {
  biology:   { name: 'Biology',   table: 'mdcat_biology'   },
  chemistry: { name: 'Chemistry', table: 'mdcat_chemistry' },
  physics:   { name: 'Physics',   table: 'mdcat_physics'   },
}

const MCQS_PER_SET = 20
const COLS = 'id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, topic, subtopic'

export default async function FSCSetPage({
  params,
}: {
  params: Promise<{ subject: string; chapter: string; setNumber: string }>
}) {
  const { subject, chapter: rawChapter, setNumber: setNumStr } = await params

  const subjectCfg = SUBJECT_CONFIG[subject]
  if (!subjectCfg) notFound()

  const setNumber = parseInt(setNumStr)
  if (isNaN(setNumber) || setNumber < 1) notFound()

  const chapter = decodeURIComponent(rawChapter)
  const offset  = (setNumber - 1) * MCQS_PER_SET

  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from(subjectCfg.table)
    .select(COLS)
    .eq('topic', chapter)
    .order('id')
    .range(offset, offset + MCQS_PER_SET - 1)

  if (error || !data || data.length === 0) notFound()

  return (
    <MDCATSetQuiz
      mcqs={data}
      subject={subject}
      subjectName={`FSc ${subjectCfg.name}`}
      subjectGradient="from-emerald-600 to-teal-700"
      difficulty={chapter}
      setNumber={setNumber}
      theme="green"
      backPath={`/fsc/${subject}/${rawChapter}`}
    />
  )
}
