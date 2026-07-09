import Link from 'next/link'
import type { QuizMcqRow } from '@/lib/set-integrity'
import { correctOptionText, type SampleMcq } from '@/lib/seo/fetch-sample-mcqs'

type McqLike = SampleMcq | QuizMcqRow

function answerText(mcq: McqLike): string {
  if ('id' in mcq && mcq.correct_answer?.length === 1) {
    const letter = mcq.correct_answer.toUpperCase()
    const map: Record<string, string> = {
      A: mcq.option_a,
      B: mcq.option_b,
      C: mcq.option_c,
      D: mcq.option_d,
    }
    return map[letter] ?? mcq.correct_answer
  }
  return correctOptionText(mcq as SampleMcq)
}

/** Full MCQ text in sr-only HTML — crawlable, zero visual footprint. */
export function McqCrawlBlock({
  mcqs,
  heading,
  dbTable,
}: {
  mcqs: McqLike[]
  heading: string
  dbTable?: string
}) {
  if (mcqs.length === 0) return null

  return (
    <section aria-label={heading} className="sr-only">
      <h2>{heading}</h2>
      <ol>
        {mcqs.map((mcq, i) => {
          const id = 'id' in mcq ? mcq.id : undefined
          const key = id ?? i
          return (
            <li key={key}>
              {dbTable && id != null ? (
                <p>
                  <Link href={`/mcq/${dbTable}/${id}`}>Question {i + 1}</Link>
                </p>
              ) : null}
              <p>
                <strong>Q{i + 1}.</strong> {mcq.question}
              </p>
              <ul>
                <li>A) {mcq.option_a}</li>
                <li>B) {mcq.option_b}</li>
                <li>C) {mcq.option_c}</li>
                <li>D) {mcq.option_d}</li>
              </ul>
              <p>
                <strong>Answer:</strong> {answerText(mcq)}
              </p>
              {'explanation' in mcq && mcq.explanation ? (
                <p>
                  <strong>Explanation:</strong> {mcq.explanation}
                </p>
              ) : null}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
