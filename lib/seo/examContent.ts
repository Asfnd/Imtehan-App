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
  /** Hand-written key facts for top exams (eligibility, pattern, scope). */
  highlights?: string[]
  /** Hand-written preparation strategy for top exams. */
  prep?: string[]
}

interface ExamOverride {
  intro?: string
  highlights?: string[]
  prep?: string[]
  faqs?: ExamFaq[]
}

/**
 * Hand-crafted, evergreen content for the highest-search-volume exams.
 * These pages compete for real queries (e.g. "css screening test", "ppsc
 * assistant past papers", "patwari test preparation"), so generic templated
 * text is not enough — they get genuinely unique, useful copy here.
 */
const TOP_EXAM_OVERRIDES: Record<string, ExamOverride> = {
  'css-mpt': {
    intro:
      'The CSS Screening Test, also called the MPT (MCQ-based Preliminary Test), is the first stage of Pakistan\'s CSS examination, conducted by the Federal Public Service Commission (FPSC). It is a 200-MCQ qualifying test that decides who is eligible to sit the CSS written papers. On Imtehan you can practice CSS screening MCQs subject by subject, attempt full timed mock tests, and review answers with explanations to clear the test on your first attempt.',
    highlights: [
      'Conducted by FPSC as the screening stage before the CSS written exam',
      '200 MCQs spanning English, General Knowledge, Pakistan Affairs, Islamic Studies, Current Affairs, Everyday Science, Mathematics and Geography',
      'A qualifying test: clearing it makes you eligible for the CSS compulsory and optional written papers',
      'Rewards breadth and speed across general knowledge and current affairs',
    ],
    prep: [
      'Lock down high-frequency Pakistan Affairs, Islamic Studies and Current Affairs facts first',
      'Practice English vocabulary, grammar and comprehension every day',
      'Attempt full 200-question timed mocks to build stamina and pacing',
      'Re-practice your two weakest subjects until they stop costing you marks',
    ],
    faqs: [
      {
        question: 'What is the CSS screening test (MPT)?',
        answer:
          'The CSS screening test, or MPT, is an FPSC-administered MCQ test that candidates must clear before they are allowed to sit the CSS written examination. It has 200 multiple-choice questions covering general subjects, and Imtehan provides subject-wise practice plus full mock tests for it.',
      },
      {
        question: 'How many MCQs are in the CSS screening test?',
        answer:
          'The CSS screening test has 200 MCQs drawn from English, General Knowledge, Pakistan Affairs, Islamic Studies, Current Affairs, Everyday Science, Mathematics and Geography. You can practice each of these subjects on Imtehan.',
      },
    ],
  },
  'pms-competitive': {
    intro:
      'PMS (Provincial Management Services) is the provincial counterpart of CSS, conducted by the relevant Provincial Public Service Commission to recruit officers for provincial management cadres. Its general paper draws on the same broad knowledge base as the CSS MPT. On Imtehan you can practice PMS MCQs subject by subject and use the PMS Writing Coach for essay, précis and long-answer feedback tuned to provincial marking.',
    highlights: [
      'Provincial equivalent of CSS, conducted by the Provincial Public Service Commission',
      'General paper covers English, GK, Pakistan Affairs, Islamiat, Current Affairs, Everyday Science, Maths and Geography',
      'Same core MCQ knowledge base as the CSS screening test',
      'Includes essay and précis writing practice through the PMS Writing Coach',
    ],
    prep: [
      'Build a strong base in Pakistan Affairs, Current Affairs and Islamiat',
      'Practice MCQs subject-wise, then attempt full mocks under time',
      'Use the PMS Writing Coach to sharpen essay and précis answers',
      'Track weak areas and revisit them weekly',
    ],
  },
  'ppsc-assistant': {
    intro:
      'The PPSC Assistant (BS-16) test is conducted by the Punjab Public Service Commission to recruit Assistants across Punjab government departments. It is a one-paper MCQ test covering general subjects. On Imtehan you can practice PPSC Assistant MCQs subject by subject, work through past-paper style questions, and take full mock tests with answers and explanations.',
    highlights: [
      'Conducted by PPSC for Assistant (BS-16) posts in Punjab departments',
      'Single MCQ paper covering General Knowledge, Pakistan Studies, Islamic Studies, English, Mathematics, Computer and Current Affairs',
      'Highly competitive, so accuracy on general subjects is decisive',
    ],
    prep: [
      'Focus on General Knowledge, Pakistan Studies and Current Affairs, which carry the most weight',
      'Practice English grammar and basic mathematics for quick, reliable marks',
      'Attempt full mock tests to manage time across the whole paper',
    ],
  },
  'ppsc-sub-inspector': {
    intro:
      'The PPSC Sub Inspector test recruits Sub Inspectors for the Punjab Police through the Punjab Public Service Commission. It is an MCQ test of general subjects and reasoning. On Imtehan you can practice PPSC Sub Inspector MCQs subject by subject and attempt full mock tests with answers.',
    highlights: [
      'Conducted by PPSC for Punjab Police Sub Inspector recruitment',
      'MCQ paper covering General Knowledge, Pakistan Affairs, English, Current Affairs and more',
      'Followed by physical and other selection stages',
    ],
    prep: [
      'Prioritise General Knowledge, Pakistan Affairs and Current Affairs',
      'Practice English and everyday science for steady marks',
      'Use timed mocks to build speed and accuracy together',
    ],
  },
  'ppsc-patwari': {
    intro:
      'The PPSC Patwari test recruits revenue Patwaris in Punjab through the Punjab Public Service Commission. The paper is MCQ-based and leans heavily on mathematics, general knowledge and Pakistan studies. On Imtehan you can practice PPSC Patwari MCQs subject by subject and take full mock tests with answers and explanations.',
    highlights: [
      'Conducted by PPSC for revenue Patwari posts in Punjab',
      'MCQ paper with a strong weighting toward Mathematics and General Knowledge',
      'Also covers Pakistan Affairs, English and basic computer knowledge',
    ],
    prep: [
      'Drill arithmetic and basic mathematics until they are fast and accurate',
      'Revise General Knowledge and Pakistan Studies thoroughly',
      'Attempt full mock tests to lock in timing',
    ],
  },
  'ppsc-tehsildar': {
    intro:
      'The PPSC Tehsildar test recruits Tehsildars in Punjab\'s revenue administration through the Punjab Public Service Commission. It is an MCQ test of general subjects. On Imtehan you can practice PPSC Tehsildar MCQs subject by subject and attempt full mock tests with answers.',
    highlights: [
      'Conducted by PPSC for Tehsildar posts in Punjab revenue administration',
      'MCQ paper covering General Knowledge, Pakistan Affairs, Current Affairs, Islamic Studies and more',
    ],
    prep: [
      'Build a strong base in General Knowledge, Pakistan Affairs and Current Affairs',
      'Practice English and Islamic Studies for reliable marks',
      'Use full mocks to rehearse the real paper',
    ],
  },
  'fpsc-assistant': {
    intro:
      'The FPSC Assistant test is conducted by the Federal Public Service Commission to recruit Assistants in federal government departments. It is an MCQ test covering general subjects. On Imtehan you can practice FPSC Assistant MCQs subject by subject and take full mock tests with answers and explanations.',
    highlights: [
      'Conducted by FPSC for Assistant posts in federal departments',
      'MCQ paper covering English, General Knowledge, Pakistan Affairs, Islamic Studies, Mathematics and Computer',
    ],
    prep: [
      'Prioritise English, General Knowledge and Current Affairs',
      'Practice basic mathematics and computer MCQs for quick marks',
      'Take full timed mocks before the real test',
    ],
  },
  'kppsc-assistant': {
    intro:
      'The KPPSC Assistant test is conducted by the Khyber Pakhtunkhwa Public Service Commission to recruit Assistants in KP government departments. It is an MCQ test of general subjects. On Imtehan you can practice KPPSC Assistant MCQs subject by subject and attempt full mock tests with answers.',
    highlights: [
      'Conducted by KPPSC for Assistant posts in Khyber Pakhtunkhwa departments',
      'MCQ paper covering General Knowledge, Pakistan Affairs, English, Islamic Studies and more',
    ],
  },
  'spsc-assistant': {
    intro:
      'The SPSC Assistant test is conducted by the Sindh Public Service Commission to recruit Assistants in Sindh government departments. It is an MCQ test of general subjects. On Imtehan you can practice SPSC Assistant MCQs subject by subject and attempt full mock tests with answers.',
    highlights: [
      'Conducted by SPSC for Assistant posts in Sindh departments',
      'MCQ paper covering General Knowledge, Pakistan Affairs, English, Islamic Studies and more',
    ],
  },
  'nts-general': {
    intro:
      'NTS (National Testing Service) tests, including the GAT and NAT, are standardized tests used across Pakistan for jobs and admissions. They reward speed, accuracy and pattern recognition rather than rote knowledge. On Imtehan you can practice NTS-style MCQs subject by subject and attempt full mock tests with answers and explanations.',
    highlights: [
      'Standardized testing used for recruitment and admissions across Pakistan',
      'Covers verbal, quantitative and analytical reasoning plus general knowledge',
      'Speed and accuracy matter as much as knowledge',
    ],
    prep: [
      'Practice quantitative and analytical reasoning under time pressure',
      'Build English vocabulary and grammar for the verbal section',
      'Attempt full mocks to learn the NTS pacing',
    ],
  },
}

interface CategoryContent {
  highlights: string[]
  prep: string[]
  faq?: ExamFaq
}

/**
 * Category-level content applied to EVERY exam in a category (FIA, police,
 * banks, NTS, etc.). This makes all 200+ exam pages read distinctly for their
 * domain — not just the handful with bespoke overrides — so each is genuinely
 * differentiated for search.
 */
const CATEGORY_CONTENT: Record<string, CategoryContent> = {
  css: {
    highlights: [
      'CSS recruitment to Pakistan\'s Central Superior Services, conducted by FPSC',
      'MCQ screening test followed by written papers and an interview',
      'Rewards broad general knowledge, current affairs and strong English',
    ],
    prep: [
      'Build deep Pakistan Affairs, Current Affairs and Islamic Studies knowledge',
      'Read English daily for vocabulary, grammar and comprehension',
      'Attempt full timed mocks to manage all subjects under pressure',
    ],
  },
  pms: {
    highlights: [
      'Provincial Management Services recruitment by the Provincial Public Service Commission',
      'Provincial equivalent of CSS with a similar general-subject MCQ base',
      'Includes essay and précis writing alongside MCQs',
    ],
    prep: [
      'Master Pakistan Affairs, Current Affairs and Islamiat fundamentals',
      'Practice MCQs subject-wise, then full mocks under time',
      'Sharpen essay and précis writing for the descriptive papers',
    ],
  },
  ppsc: {
    highlights: [
      'Recruitment for posts under the Government of Punjab through PPSC',
      'One-paper MCQ test of General Knowledge, Pakistan Studies, Islamic Studies, English, Maths, Computer and Current Affairs',
      'Highly competitive, so speed and accuracy on general subjects decide the result',
    ],
    prep: [
      'Prioritise General Knowledge, Pakistan Studies and Current Affairs',
      'Practice English and basic mathematics for quick, reliable marks',
      'Attempt full mock tests to manage time across the whole paper',
    ],
    faq: {
      question: 'How are PPSC MCQ tests structured?',
      answer:
        'PPSC posts are filled through a one-paper MCQ test covering General Knowledge, Pakistan Studies, Islamic Studies, English, Mathematics, Computer and Current Affairs. On Imtehan you can practice each subject and take full mock tests with answers and explanations.',
    },
  },
  fpsc: {
    highlights: [
      'Recruitment for federal government posts through the Federal Public Service Commission',
      'MCQ test of English, General Knowledge, Pakistan Affairs, Islamic Studies, Mathematics and Computer',
      'Used for a wide range of federal cadres and departments',
    ],
    prep: [
      'Focus on English, General Knowledge and Current Affairs',
      'Practice basic mathematics and computer MCQs for fast marks',
      'Take full timed mocks before the real test',
    ],
  },
  fia: {
    highlights: [
      'Recruitment for the Federal Investigation Agency, Pakistan\'s premier federal law-enforcement body, through FPSC or an authorised testing agency',
      'Posts span Constable, ASI and Sub-Inspector through Assistant and clerical/technical cadres (BS-05 to BS-16)',
      'MCQ test of General Knowledge, Pakistan Affairs, Current Affairs, English, Islamic Studies and basic mathematics, often followed by physical and medical tests',
    ],
    prep: [
      'Build a strong base in General Knowledge, Pakistan Affairs and Current Affairs',
      'Practice English grammar, vocabulary and basic mathematics for quick marks',
      'Revise current affairs from the last 6-12 months and attempt full mocks',
    ],
    faq: {
      question: 'How do I prepare for FIA recruitment tests?',
      answer:
        'FIA tests are MCQ-based and cover General Knowledge, Pakistan Affairs, Current Affairs, English, Islamic Studies and basic mathematics. On Imtehan you can practice each subject, take full mock tests, and review answers with explanations for FIA posts from Constable and ASI to Sub-Inspector, Assistant and clerical cadres.',
    },
  },
  provincial: {
    highlights: [
      'Recruitment by a Provincial Public Service Commission (PPSC, SPSC, KPPSC, BPSC, AJKPSC or GBPSC)',
      'MCQ test of General Knowledge, Pakistan Affairs, English, Islamic Studies and Current Affairs',
      'Covers a broad range of provincial government posts',
    ],
    prep: [
      'Prioritise General Knowledge, Pakistan Affairs and Current Affairs',
      'Practice English and Islamic Studies for steady marks',
      'Attempt full mocks under timed conditions',
    ],
  },
  police: {
    highlights: [
      'Recruitment for provincial police posts (Constable, ASI, Sub-Inspector) through the police department or its testing agency',
      'MCQ test of General Knowledge, Pakistan Affairs, English, Current Affairs and reasoning',
      'Followed by physical, medical and other selection stages',
    ],
    prep: [
      'Prioritise General Knowledge, Pakistan Affairs and Current Affairs',
      'Practice English and everyday science for reliable marks',
      'Use timed mocks to build speed and accuracy together',
    ],
  },
  military: {
    highlights: [
      'Initial selection test for joining the Pakistan Armed Forces (Army, Navy, PAF) and allied forces',
      'Tests verbal and non-verbal intelligence, academic subjects and general knowledge',
      'Followed by ISSB, physical and medical assessments',
    ],
    prep: [
      'Practice intelligence and reasoning questions until they are fast and intuitive',
      'Revise core academic subjects and general knowledge',
      'Attempt full timed mocks to build test temperament',
    ],
  },
  nts: {
    highlights: [
      'Standardized NTS testing used for recruitment and admissions across Pakistan',
      'Covers verbal, quantitative and analytical reasoning plus subject and general knowledge',
      'Speed and pattern recognition matter as much as knowledge',
    ],
    prep: [
      'Practice quantitative and analytical reasoning under time pressure',
      'Build English vocabulary and grammar for the verbal section',
      'Attempt full mocks to learn the NTS pacing',
    ],
  },
  ots: {
    highlights: [
      'Standardized OTS recruitment testing used by departments across Pakistan',
      'MCQ test of General Knowledge, English, Mathematics, Pakistan Studies and analytical reasoning',
      'Post-specific knowledge is sometimes added to the general paper',
    ],
    prep: [
      'Cover General Knowledge, Pakistan Studies and Current Affairs thoroughly',
      'Practice English and quantitative reasoning for quick marks',
      'Attempt full mocks to manage the paper under time',
    ],
  },
  etea: {
    highlights: [
      'Standardized ETEA testing used for recruitment and admissions in Khyber Pakhtunkhwa',
      'MCQ test of General Knowledge, English, Mathematics and subject-specific topics',
      'Known for a disciplined, well-structured paper pattern',
    ],
    prep: [
      'Practice the relevant subject MCQs alongside General Knowledge',
      'Build English and mathematics fundamentals',
      'Attempt full timed mocks in the ETEA pattern',
    ],
  },
  railways: {
    highlights: [
      'Recruitment for Pakistan Railways posts through its appointed testing agency',
      'MCQ test of General Knowledge, Pakistan Affairs, English, Mathematics and basic technical topics',
      'Covers operational, clerical and technical cadres',
    ],
    prep: [
      'Focus on General Knowledge, Pakistan Affairs and Current Affairs',
      'Practice English and mathematics for reliable marks',
      'Attempt full mocks under timed conditions',
    ],
  },
  banks: {
    highlights: [
      'Recruitment for officer and clerical posts in the banking sector through IBP, NTS or the bank\'s own process',
      'Tests quantitative aptitude, English, general and banking awareness and reasoning',
      'Banking and economic current affairs often carry extra weight',
    ],
    prep: [
      'Practice quantitative aptitude and reasoning until they are fast',
      'Build English and banking/economic awareness',
      'Attempt full timed mocks to handle the pace',
    ],
  },
  judiciary: {
    highlights: [
      'Recruitment for judicial and court-establishment posts through the relevant High Court or testing agency',
      'MCQ test of General Knowledge, English, basic law and current affairs',
      'Accuracy on English and general knowledge is decisive',
    ],
    prep: [
      'Build General Knowledge, Pakistan Affairs and Current Affairs',
      'Practice English grammar and comprehension carefully',
      'Attempt full mocks to rehearse the paper',
    ],
  },
  devauth: {
    highlights: [
      'Recruitment for development-authority posts (such as CDA, LDA, KDA) through a testing agency',
      'MCQ test of General Knowledge, English, Mathematics and post-relevant topics',
      'Covers administrative, clerical and technical cadres',
    ],
    prep: [
      'Cover General Knowledge, Pakistan Studies and Current Affairs',
      'Practice English and mathematics for quick marks',
      'Attempt full timed mocks before the test',
    ],
  },
  revenue: {
    highlights: [
      'Recruitment for provincial revenue and tax authority posts through a testing agency',
      'MCQ test of General Knowledge, Mathematics, English and Pakistan Studies',
      'Numerical accuracy is especially important for revenue roles',
    ],
    prep: [
      'Drill mathematics and General Knowledge until they are reliable',
      'Revise Pakistan Studies and Current Affairs',
      'Attempt full mocks to lock in timing',
    ],
  },
  rescue: {
    highlights: [
      'Recruitment for Rescue 1122 emergency-service posts through the testing agency',
      'MCQ test of General Knowledge, Pakistan Affairs, English and basic science',
      'Followed by physical and skill-based assessments',
    ],
    prep: [
      'Focus on General Knowledge, Pakistan Affairs and everyday science',
      'Practice English for steady marks',
      'Attempt full timed mocks before the test',
    ],
  },
  engineering: {
    highlights: [
      'Entry test for admission to engineering and computing degree programs in Pakistan',
      'Tests Mathematics, Physics, Chemistry or Computer Science and English',
      'Each admitting university weights subjects slightly differently',
    ],
    prep: [
      'Build strong fundamentals in Mathematics and Physics',
      'Practice application-style MCQs against the clock',
      'Attempt full mocks in the format of your target university',
    ],
  },
  medical: {
    highlights: [
      'National admission test for MBBS and BDS programs in Pakistan',
      'Tests Biology, Chemistry, Physics, English and Logical Reasoning',
      'Biology carries the most marks, so it is the biggest lever on your score',
    ],
    prep: [
      'Prioritise high-yield Biology and Chemistry topics',
      'Practice application-style MCQs under time pressure',
      'Attempt full mocks in the PMC, ETEA, NUMS or AKU pattern',
    ],
  },
}

export function getExamSeoContent(slug: string, config: ExamConfig): ExamSeoContent {
  const info = CATEGORY_INFO[config.category] ?? DEFAULT_INFO
  const name = config.name
  const subjects = config.sections.map((s) => ({ label: s.label, slug: s.slug }))
  const subjectNames = subjects.map((s) => s.label)
  const subjectList = listToProse(subjectNames)
  const totalMcqs = config.totalMCQs?.toLocaleString('en-US') ?? 'thousands of'
  const perMock = config.sections.reduce((sum, s) => sum + (s.count ?? 0), 0)

  const override = TOP_EXAM_OVERRIDES[slug]
  const categoryContent = CATEGORY_CONTENT[config.category]
  const h1 = `${name} MCQs, Past Papers & Mock Tests`

  const intro =
    override?.intro ??
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

  // Merge FAQs: per-exam overrides first, then the category FAQ, then generic.
  // Dedupe by question and cap the list.
  const mergedFaqs = [
    ...(override?.faqs ?? []),
    ...(categoryContent?.faq ? [categoryContent.faq] : []),
    ...faqs,
  ]
  const seen = new Set<string>()
  const dedupedFaqs = mergedFaqs.filter((f) => {
    const key = f.question.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  }).slice(0, 6)

  return {
    h1,
    intro,
    facts,
    subjects,
    faqs: dedupedFaqs,
    // Per-exam overrides win; otherwise every exam still gets category content.
    highlights: override?.highlights ?? categoryContent?.highlights,
    prep: override?.prep ?? categoryContent?.prep,
  }
}

function listToProse(items: string[]): string {
  if (items.length === 0) return 'multiple subjects'
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

// ---- MDCAT subject content -------------------------------------------------

interface MdcatSubject {
  label: string
  approxMcqs: string
  topics: string[]
  note: string
}

const MDCAT_SUBJECTS: Record<string, MdcatSubject> = {
  biology: {
    label: 'Biology',
    approxMcqs: '5,900+',
    topics: ['Cell Biology', 'Biological Molecules', 'Genetics', 'Evolution', 'Coordination & Control', 'Reproduction'],
    note: 'Biology carries the most marks in MDCAT, so mastering it is the single biggest lever on your score.',
  },
  chemistry: {
    label: 'Chemistry',
    approxMcqs: '6,200+',
    topics: ['Atomic Structure', 'Chemical Bonding', 'Organic Chemistry', 'Physical Chemistry', 'Thermodynamics', 'Electrochemistry'],
    note: 'Chemistry rewards consistent practice across organic, physical and inorganic topics.',
  },
  physics: {
    label: 'Physics',
    approxMcqs: '4,600+',
    topics: ['Mechanics', 'Electricity & Magnetism', 'Waves & Oscillations', 'Thermodynamics', 'Modern Physics'],
    note: 'Physics is concept and formula driven, so practising application-style MCQs matters most.',
  },
  english: {
    label: 'English',
    approxMcqs: '900+',
    topics: ['Grammar', 'Vocabulary', 'Sentence Structure', 'Comprehension'],
    note: 'English is high-yield per hour because the rules are finite and repeat often.',
  },
  'logical-reasoning': {
    label: 'Logical Reasoning',
    approxMcqs: '1,100+',
    topics: ['Critical Thinking', 'Logical Deduction', 'Analytical Reasoning', 'Problem Solving'],
    note: 'Logical Reasoning rewards pattern practice and speed rather than memorisation.',
  },
}

export interface MdcatSubjectSeoContent {
  h1: string
  subjectName: string
  intro: string
  topics: string[]
  faqs: ExamFaq[]
}

export function getMdcatSubjectSeoContent(subjectSlug: string): MdcatSubjectSeoContent | null {
  const s = MDCAT_SUBJECTS[subjectSlug]
  if (!s) return null

  const h1 = `MDCAT ${s.label} MCQs with Answers & Explanations`
  const intro =
    `Practice ${s.approxMcqs} MDCAT ${s.label} MCQs on Imtehan, organised topic by topic with answers and explanations. ` +
    `${s.note} You can practise by topic, ramp up difficulty, and attempt full mock tests built for the PMC, ETEA, NUMS and AKU patterns.`

  const faqs: ExamFaq[] = [
    {
      question: `How many MDCAT ${s.label} MCQs are on Imtehan?`,
      answer:
        `Imtehan has ${s.approxMcqs} MDCAT ${s.label} MCQs covering ${listToProse(s.topics)}, grouped into topic-wise sets ` +
        `with answers and explanations, plus full mock tests.`,
    },
    {
      question: `Which ${s.label} topics does MDCAT cover?`,
      answer: `Key MDCAT ${s.label} topics include ${listToProse(s.topics)}. You can practise each topic separately on Imtehan.`,
    },
    {
      question: `Is MDCAT ${s.label} practice free?`,
      answer: `Yes. You can practise MDCAT ${s.label} MCQs and topic-wise sets for free, with premium adding analytics and unlimited mock attempts.`,
    },
  ]

  return { h1, subjectName: s.label, intro, topics: s.topics, faqs }
}

/** Human-readable subject names shared by metadata and SEO content. */
export const SUBJECT_LABELS: Record<string, string> = {
  english: 'English',
  'general-knowledge': 'General Knowledge',
  'pakistan-affairs': 'Pakistan Affairs',
  'islamic-studies': 'Islamic Studies',
  'current-affairs': 'Current Affairs',
  'everyday-science': 'Everyday Science',
  mathematics: 'Mathematics',
  geography: 'Geography',
  computer: 'Computer Science',
  urdu: 'Urdu',
  biology: 'Biology',
  chemistry: 'Chemistry',
  physics: 'Physics',
  'logical-reasoning': 'Logical Reasoning',
}

export function subjectLabel(slug: string): string {
  return SUBJECT_LABELS[slug] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export interface SubjectSeoContent {
  h1: string
  examName: string
  subjectName: string
  intro: string
  modes: { label: string; slug: string; desc: string }[]
  faqs: ExamFaq[]
}

export function getSubjectSeoContent(
  examSlug: string,
  subjectSlug: string,
  config: ExamConfig,
): SubjectSeoContent {
  const examName = config.name
  const subjectName = subjectLabel(subjectSlug)

  const h1 = `${examName}: ${subjectName} MCQs with Answers`
  const intro =
    `Practice ${examName} ${subjectName} multiple-choice questions with answers and detailed explanations. ` +
    `Imtehan organises ${subjectName} into most-repeated, most-important and past-paper sets of around 20 questions each, ` +
    `plus timed mock tests, so you can build the accuracy and speed the real ${examName} paper demands.`

  const modes = [
    { label: 'Most Repeated', slug: 'most-repeated', desc: `${subjectName} questions that appear most often in ${examName}.` },
    { label: 'Most Important', slug: 'most-important', desc: `High-yield ${subjectName} questions worth prioritising first.` },
    { label: 'Past Papers', slug: 'past-papers', desc: `${subjectName} questions taken from previous ${examName} papers.` },
    { label: 'Practice', slug: 'practice', desc: `Open ${subjectName} practice across the full question bank.` },
  ]

  const faqs: ExamFaq[] = [
    {
      question: `How many ${subjectName} MCQs does ${examName} have on Imtehan?`,
      answer:
        `Imtehan offers a large, regularly updated bank of ${examName} ${subjectName} MCQs, grouped into sets of about 20 questions ` +
        `with answers and explanations. You can practise most-repeated, most-important and past-paper questions separately.`,
    },
    {
      question: `Do the ${examName} ${subjectName} MCQs include answers and explanations?`,
      answer:
        `Yes. Every ${subjectName} MCQ shows the correct answer immediately after you respond, with an explanation where available, ` +
        `so you learn from each question as you practise.`,
    },
    {
      question: `Is ${examName} ${subjectName} practice free on Imtehan?`,
      answer:
        `Yes, you can practise ${examName} ${subjectName} MCQs for free. A premium plan adds detailed analytics and unlimited mock attempts.`,
    },
  ]

  return { h1, examName, subjectName, intro, modes, faqs }
}

const MODE_COPY: Record<string, { label: string; desc: string }> = {
  'most-repeated': {
    label: 'Most Repeated',
    desc: 'high-yield questions that appear most often in the real paper',
  },
  'most-important': {
    label: 'Most Important',
    desc: 'critical must-know MCQs to prioritise before the exam',
  },
  'past-papers': {
    label: 'Past Papers',
    desc: 'questions drawn from previous exam papers and official patterns',
  },
  practice: {
    label: 'Practice',
    desc: 'mixed practice sets across the full question bank',
  },
}

export interface ModeSeoContent {
  h1: string
  examName: string
  subjectName: string
  modeLabel: string
  intro: string
  faqs: ExamFaq[]
}

export function getModeSeoContent(
  _examSlug: string,
  subjectSlug: string,
  mode: string,
  config: ExamConfig,
): ModeSeoContent {
  const examName = config.name
  const subjectName = subjectLabel(subjectSlug)
  const modeMeta = MODE_COPY[mode] ?? { label: mode.replace(/-/g, ' '), desc: 'practice' }

  const h1 = `${examName} ${subjectName}: ${modeMeta.label} MCQs with Answers`
  const intro =
    `Practise ${examName} ${subjectName} ${modeMeta.label.toLowerCase()} MCQs in sets of about 20 questions with instant answers and explanations. ` +
    `This page focuses on ${modeMeta.desc}, helping you build accuracy and speed for the actual ${examName} paper.`

  const faqs: ExamFaq[] = [
    {
      question: `What are ${modeMeta.label.toLowerCase()} ${subjectName} MCQs for ${examName}?`,
      answer:
        `${modeMeta.label} ${subjectName} MCQs are ${modeMeta.desc}. ` +
        `On Imtehan they are grouped into short sets so you can review one topic at a time before moving to timed mocks.`,
    },
    {
      question: `How many ${examName} ${subjectName} ${modeMeta.label.toLowerCase()} questions can I practise?`,
      answer:
        `Imtehan organises ${examName} ${subjectName} questions into multiple sets. ` +
        `Start with the sample questions below, then open a set to practise interactively with scoring and explanations.`,
    },
    {
      question: `Is ${examName} ${subjectName} ${modeMeta.label.toLowerCase()} practice free?`,
      answer:
        `Yes — you can practise ${examName} ${subjectName} MCQs for free on Imtehan. Premium unlocks detailed analytics and unlimited mock attempts.`,
    },
  ]

  return { h1, examName, subjectName, modeLabel: modeMeta.label, intro, faqs }
}
