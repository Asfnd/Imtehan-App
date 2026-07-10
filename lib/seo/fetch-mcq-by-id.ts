import { createPublicSupabaseClient } from '@/lib/supabase/public'
import type { QuizMcqRow } from '@/lib/set-integrity'
import { unstable_cache } from 'next/cache'

async function fetchMcqByIdUncached(
  bank: string,
  id: number,
): Promise<QuizMcqRow | null> {
  if (!Number.isFinite(id) || id < 1) return null
  try {
    const supabase = createPublicSupabaseClient()
    const { data, error } = await supabase
      .from(bank)
      .select('id, question, option_a, option_b, option_c, option_d, correct_answer, explanation')
      .eq('id', id)
      .maybeSingle()

    if (error || !data) return null

    const letter = String(data.correct_answer ?? '')
      .trim()
      .toUpperCase()
      .match(/[A-D]/)?.[0]
    if (!letter) return null

    return {
      id: Number(data.id),
      question: String(data.question),
      option_a: String(data.option_a),
      option_b: String(data.option_b),
      option_c: String(data.option_c),
      option_d: String(data.option_d),
      correct_answer: letter,
      explanation: data.explanation ? String(data.explanation) : undefined,
    }
  } catch {
    return null
  }
}

/** Public MCQ fetch — cached 24h so Googlebot re-hits avoid Supabase + SSR work. */
export async function fetchMcqById(
  bank: string,
  id: number,
): Promise<QuizMcqRow | null> {
  return unstable_cache(
    () => fetchMcqByIdUncached(bank, id),
    [`mcq-${bank}-${id}`],
    { revalidate: 86400, tags: [`mcq-${bank}-${id}`] },
  )()
}
