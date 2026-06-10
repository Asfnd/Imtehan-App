import type { ExamConfig } from '@/lib/exam-configs'

/**
 * Generates UNIQUE, server-renderable SEO content per exam.
 *
 * Why this exists: 200+ exams share a small set of MCQ banks, so without
 * distinct on-page text Google treats the exam pages as duplicate/doorway
 * pages and refuses to index most of them. This module derives genuinely
 * exam-specific copy (intro, paper pattern, subject links, FAQ) from each
 * exam's config so every page has substantive, differentiated content.
 */

interface CategoryInfo {
  /** Who conducts / administers the exam. */
  authority: string
  /** One-line description of what the exam is. */
  about: string
}

const CATEGORY_INFO: Record<string, CategoryInfo> = {
  medical: {
    authority: 'the Pakistan Medical & Dental Council (PM&DC) and the provincial admitting universities',
    about: 'the national admission test for MBBS and BDS programs in Pakistan',
  },
  engineering: {
    authority: 'the admitting universities and their testing bodies (such as NUST, UET, GIKI and PIEAS)',
    about: 'an entry test for admission to engineering and computing degree programs in Pakistan',
  },
  css: {
    authority: 'the Federal Public Service Commission (FPSC)',
    about: 'Pakistan\'s premier competitive examination for recruitment to the Central Superior Services',
  },
  pms: {
    authority: 'the relevant Provincial Public Service Commission',
    about: 'the provincial counterpart of CSS for recruitment to the Provincial Management Services',
  },
  ppsc: {
    authority: 'the Punjab Public Service Commission (PPSC)',
    about: 'a recruitment examination for posts under the Government of Punjab',
  },
  fpsc: {
    authority: 'the Federal Public Service Commission (FPSC)',
    about: 'a recruitment examination for federal government posts in Pakistan',
  },
  fia: {
    authority: 'the Federal Public Service Commission (FPSC) for the Federal Investigation Agency',
    about: 'a recruitment examination for posts in the Federal Investigation Agency',
  },
  provincial: {
    authority: 'the relevant Provincial Public Service Commission (PPSC, SPSC, KPPSC, BPSC, AJKPSC or GBPSC)',
    about: 'a provincial public service recruitment examination',
  },
  police: {
    authority: 'the provincial Police department and its testing agency',
    about: 'a recruitment test for police service posts in Pakistan',
  },
  military: {
    authority: 'the Pakistan Armed Forces selection and recruitment centres',
    about: 'an initial selection test for joining the armed forces of Pakistan',
  },
  nts: {
    authority: 'the National Testing Service (NTS)',
    about: 'a standardized test used for recruitment and admissions across Pakistan',
  },
  ots: {
    authority: 'the Open Testing Service (OTS)',
    about: 'a standardized recruitment test used by departments across Pakistan',
  },
  etea: {
    authority: 'the Educational Testing & Evaluation Agency (ETEA), Khyber Pakhtunkhwa',
    about: 'a standardized recruitment and admission test used in Khyber Pakhtunkhwa',
  },
  railways: {
    authority: 'Pakistan Railways through its appointed testing agency',
    about: 'a recruitment test for posts in Pakistan Railways',
  },
  banks: {
    authority: 'the hiring bank through IBP, NTS or its own recruitment process',
    about: 'a recruitment test for officer and clerical posts in the banking sector',
  },
  judiciary: {
    authority: 'the relevant High Court and its appointed testing agency',
    about: 'a recruitment test for judicial and court establishment posts',
  },
  devauth: {
    authority: 'the relevant development authority through its testing agency',
    about: 'a recruitment test for posts in a development authority',
  },
  rescue: {
    authority: 'the Punjab Emergency Service (Rescue 1122) through its testing agency',
    about: 'a recruitment test for posts in Rescue 1122',
  },
  revenue: {
    authority: 'the provincial revenue authority through its testing agency',
    about: 'a recruitment test for posts in a provincial revenue and tax authority',
  },
}

const DEFAULT_INFO: CategoryInfo = {
  authority: 'the relevant recruitment and testing authority',
  about: 'a competitive examination in Pakistan',
}

export interface ExamFaq {
  question: string
  answer: string
}

export interface ExamSeoContent {
  h1: string
  intro: string
  /** Short labelled facts about the paper pattern. */
  facts: { label: string; value: string }[]
  subjects: { label: string; slug: string }[]
  faqs: ExamFaq[]
}

export function getExamSeoContent(slug: string, config: ExamConfig): ExamSeoContent {
  const info = CATEGORY_INFO[config.category] ?? DEFAULT_INFO
  const name = config.name
  const subjects = config.sections.map((s) => ({ label: s.label, slug: s.slug }))
  const subjectNames = subjects.map((s) => s.label)
  const subjectList = listToProse(subjectNames)
  const totalMcqs = config.totalMCQs?.toLocaleString('en-US') ?? 'thousands of'
  const perMock = config.sections.reduce((sum, s) => sum + (s.count ?? 0), 0)

  const h1 = `${name} MCQs, Past Papers & Mock Tests`

  const intro =
    `${name} is ${info.about}, conducted by ${info.authority}. ` +
    `On Imtehan you can practice ${totalMcqs}+ ${name} MCQs covering ${subjectList}. ` +
    `Every subject has most-repeated, most-important and past-paper question sets with answers and explanations, ` +
    `plus full-length timed mock tests so you can prepare exactly the way the real test feels.`

  const facts: { label: string; value: string }[] = [
    { label: 'Subjects covered', value: String(subjects.length) },
    { label: 'Practice MCQs', value: `${totalMcqs}+` },
  ]
  if (perMock > 0) facts.push({ label: 'Full mock test', value: `${perMock} questions` })
  if (config.duration) facts.push({ label: 'Duration', value: `${config.duration} minutes` })
  if (typeof config.passingPercentage === 'number')
    facts.push({ label: 'Passing marks', value: `${config.passingPercentage}%` })
  if (typeof config.negativeMarking === 'boolean')
    facts.push({ label: 'Negative marking', value: config.negativeMarking ? 'Yes' : 'No' })

  const faqs: ExamFaq[] = [
    {
      question: `How many MCQs are available for ${name} preparation?`,
      answer:
        `Imtehan has ${totalMcqs}+ ${name} practice MCQs spread across ${subjects.length} subjects: ${subjectList}. ` +
        `Questions are organised into most-repeated, most-important and past-paper sets, and new questions are added regularly.`,
    },
    {
      question: `Which subjects are tested in ${name}?`,
      answer: `${name} preparation on Imtehan covers ${subjectList}. You can practice each subject separately or attempt a full mock test.`,
    },
    {
      question: `Is ${name} MCQ practice free on Imtehan?`,
      answer: `Yes. You can practice ${name} MCQs and attempt mock tests for free. A premium plan unlocks extra features such as detailed analytics and unlimited mock attempts.`,
    },
  ]
  if (perMock > 0 && config.duration) {
    const neg =
      config.negativeMarking === true
        ? ' Negative marking applies, so attempt carefully.'
        : config.negativeMarking === false
          ? ' There is no negative marking, so attempt every question.'
          : ''
    faqs.push({
      question: `What is the ${name} paper pattern?`,
      answer:
        `A full ${name} mock test on Imtehan has ${perMock} MCQs to attempt in ${config.duration} minutes` +
        (typeof config.passingPercentage === 'number'
          ? `, and passing requires ${config.passingPercentage}%.`
          : '.') +
        neg,
    })
  } else {
    faqs.push({
      question: `How should I prepare for ${name}?`,
      answer:
        `Start with the most-repeated MCQs for each subject (${subjectList}), then attempt full mock tests under timed conditions. ` +
        `Review your mistakes after every test and re-practice the topics you score lowest on.`,
    })
  }

  return { h1, intro, facts, subjects, faqs }
}

function listToProse(items: string[]): string {
  if (items.length === 0) return 'multiple subjects'
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}
