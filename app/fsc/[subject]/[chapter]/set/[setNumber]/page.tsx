import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createPublicSupabaseClient } from '@/lib/supabase/public'
import { fscChapterIndexingMeta } from '@/lib/seo/topic-indexing'
import { MdcatSetSeoShell } from '@/components/seo/MdcatTopicSeoShell'
import MDCATSetQuiz from '@/components/MDCATSetQuiz'

/** Public SEO page — ISR 24h to cut crawl CPU. */
export const revalidate = 86400

const SUBJECT_CONFIG: Record<string, { name: string; table: string }> = {
  biology: { name: 'Biology', table: 'mdcat_biology' },
  chemistry: { name: 'Chemistry', table: 'mdcat_chemistry' },
  physics: { name: 'Physics', table: 'mdcat_physics' },
}

const MCQS_PER_SET = 20
const COLS = 'id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, topic, subtopic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; chapter: string; setNumber: string }>
}): Promise<Metadata> {
  const { subject, chapter: rawChapter, setNumber: setStr } = await params
  const subjectCfg = SUBJECT_CONFIG[subject]
  if (!subjectCfg) return { title: 'FSc Practice' }
  const setNumber = parseInt(setStr, 10)
  const chapter = decodeURIComponent(rawChapter)
  const encoded = encodeURIComponent(rawChapter)
  const selfCanonical = `https://imtehan.com/fsc/${subject}/${encoded}/set/${setNumber}`
  const indexing = fscChapterIndexingMeta(selfCanonical, setNumber)
  const title = `FSc ${subjectCfg.name} ${chapter} Set ${setNumber} — 20 MCQs Solved`
  const description = `FSc ${subjectCfg.name} ${chapter} practice set ${setNumber} with solved answers.`

  return {
    title,
    description,
    robots: indexing.robots,
    alternates: { canonical: indexing.canonical },
    openGraph: { title, description, url: selfCanonical, type: 'website' },
  }
}

export default async function FSCSetPage({
  params,
}: {
  params: Promise<{ subject: string; chapter: string; setNumber: string }>
}) {
  const { subject, chapter: rawChapter, setNumber: setNumStr } = await params

  const subjectCfg = SUBJECT_CONFIG[subject]
  if (!subjectCfg) notFound()

  const setNumber = parseInt(setNumStr, 10)
  if (isNaN(setNumber) || setNumber < 1) notFound()

  const chapter = decodeURIComponent(rawChapter)
  const offset = (setNumber - 1) * MCQS_PER_SET

  const supabase = createPublicSupabaseClient()

  const [{ data, error }, { count }] = await Promise.all([
    supabase.from(subjectCfg.table).select(COLS).eq('topic', chapter).order('id').range(offset, offset + MCQS_PER_SET - 1),
    supabase.from(subjectCfg.table).select('*', { count: 'exact', head: true }).eq('topic', chapter),
  ])

  if (error || !data || data.length === 0) notFound()

  const totalSets = count ? Math.ceil(count / MCQS_PER_SET) : undefined

  const seoMcqs =
    setNumber === 1
      ? data.slice(0, 3).map((row) => ({
          id: Number(row.id),
          question: String(row.question),
          option_a: String(row.option_a),
          option_b: String(row.option_b),
          option_c: String(row.option_c),
          option_d: String(row.option_d),
          correct_answer: String(row.correct_answer).charAt(0).toUpperCase(),
          explanation: row.explanation ? String(row.explanation) : undefined,
        }))
      : []

  return (
    <MdcatSetSeoShell
      subject={subject}
      topicLabel={chapter}
      isDifficulty={false}
      setNumber={setNumber}
      dbTable={subjectCfg.table}
      mcqs={seoMcqs}
    >
      <MDCATSetQuiz
        mcqs={[]}
        examSlug="fsc"
        subject={subject}
        subjectName={`FSc ${subjectCfg.name}`}
        subjectGradient="from-emerald-600 to-teal-700"
        difficulty={chapter}
        setNumber={setNumber}
        totalSets={totalSets}
        theme="green"
        backPath={`/fsc/${subject}/${rawChapter}`}
        practiceRequest={{
          source: 'fsc',
          dbTable: subjectCfg.table,
          tag: chapter,
        }}
      />
    </MdcatSetSeoShell>
  )
}
