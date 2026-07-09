import type { QuizMcqRow } from '@/lib/set-integrity'
import { correctOptionText, type SampleMcq } from '@/lib/seo/fetch-sample-mcqs'

type McqLike = SampleMcq | QuizMcqRow

function mcqToQuestionPart(mcq: McqLike, index: number) {
  const answer =
    'option_a' in mcq && mcq.correct_answer?.length === 1
      ? correctOptionText(mcq as SampleMcq)
      : String(
          (mcq as QuizMcqRow).correct_answer === 'A'
            ? mcq.option_a
            : (mcq as QuizMcqRow).correct_answer === 'B'
              ? mcq.option_b
              : (mcq as QuizMcqRow).correct_answer === 'C'
                ? mcq.option_c
                : (mcq as QuizMcqRow).correct_answer === 'D'
                  ? mcq.option_d
                  : mcq.option_a,
        )

  return {
    '@type': 'Question',
    '@id': `#q${index + 1}`,
    eduQuestionType: 'Multiple choice',
    text: mcq.question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
    suggestedAnswer: [
      { '@type': 'Answer', text: mcq.option_a },
      { '@type': 'Answer', text: mcq.option_b },
      { '@type': 'Answer', text: mcq.option_c },
      { '@type': 'Answer', text: mcq.option_d },
    ],
  }
}

export function buildQuizJsonLd(params: {
  name: string
  description: string
  url: string
  mcqs: McqLike[]
  bare?: boolean
}) {
  const { name, description, url, mcqs, bare } = params
  const quiz = {
    '@type': 'Quiz',
    name,
    description,
    url,
    provider: { '@type': 'Organization', name: 'Imtehan', url: 'https://imtehan.com' },
    educationalUse: 'practice',
    inLanguage: 'en-PK',
    numberOfQuestions: mcqs.length,
    hasPart: mcqs.map((mcq, i) => mcqToQuestionPart(mcq, i)),
  }
  if (bare) return quiz
  return { '@context': 'https://schema.org', ...quiz }
}

export function buildCorpusDatasetJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Imtehan Pakistan Competitive Exam MCQ Bank',
    description:
      '150,000+ multiple choice questions for CSS, PMS, MDCAT, PPSC, FPSC, FIA, NTS, police, military and engineering entry tests in Pakistan.',
    url: 'https://imtehan.com/exams',
    creator: { '@type': 'Organization', name: 'Imtehan', url: 'https://imtehan.com' },
    keywords: [
      'Pakistan competitive exam MCQs',
      'CSS MCQs',
      'PPSC MCQs',
      'FIA MCQs',
      'MDCAT MCQs',
      'past papers solved',
    ],
    spatialCoverage: { '@type': 'Place', name: 'Pakistan' },
    inLanguage: 'en-PK',
  }
}
