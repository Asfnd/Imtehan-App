import { EXAM_CONFIGS } from '@/lib/exam-configs'

export interface CategorySeoContent {
  slug: string
  label: string
  h1: string
  intro: string
  highlights: string[]
  prep: string[]
  faqs: { question: string; answer: string }[]
  exams: { slug: string; name: string; subjectCount: number }[]
}

const CATEGORY_META: Record<
  string,
  { label: string; h1: string; intro: string; highlights: string[]; prep: string[] }
> = {
  ppsc: {
    label: 'PPSC',
    h1: 'PPSC One Paper MCQs 2026  -  All Posts, Past Papers & Online Tests',
    intro:
      'Practice Punjab Public Service Commission (PPSC) One Paper MCQs for every advertised post  -  Assistant BS-16, Tehsildar, Sub Inspector, Patwari, Clerk and more. ' +
      'Imtehan has subject-wise sets in General Knowledge, Pakistan Affairs, Current Affairs, English, Islamiat and Everyday Science with solved answers and timed mock tests.',
    highlights: [
      'One Paper format: typically 100 MCQs in 90 minutes with negative marking on many posts',
      'General Knowledge and Pakistan Affairs carry the highest weightage',
      'Past paper and most-repeated question sets mirror actual PPSC test patterns',
    ],
    prep: [
      'Start with most-repeated MCQs in General Knowledge and Pakistan Affairs',
      'Attempt full 100-question timed mocks under 90 minutes',
      'Review explanations for every wrong answer before the next set',
    ],
  },
  fpsc: {
    label: 'FPSC',
    h1: 'FPSC MCQs 2026  -  Federal Posts, Past Papers & Solved Online Tests',
    intro:
      'Prepare for Federal Public Service Commission (FPSC) recruitment tests including LDC, UDC, Assistant, Inspector, FIA posts and more. ' +
      'Practice subject-wise MCQs with answers, past paper questions and full mock tests on Imtehan.',
    highlights: [
      'FPSC tests cover General Knowledge, Pakistan Affairs, English, Islamiat and professional subjects',
      'Many federal posts use a single composite paper with negative marking',
      'Past paper MCQs are the fastest way to learn what FPSC actually asks',
    ],
    prep: [
      'Focus on Pakistan Affairs, Current Affairs and General Knowledge first',
      'Practice English grammar and vocabulary with repeated MCQ sets',
      'Take timed mocks matching your target post\'s paper pattern',
    ],
  },
  fia: {
    label: 'FIA',
    h1: 'FIA Test Preparation 2026  -  Constable, Assistant & Inspector MCQs',
    intro:
      'Practice Federal Investigation Agency (FIA) recruitment MCQs for Constable, Assistant BS-15, Sub Inspector, LDC, UDC and Staff Car Driver posts. ' +
      'Subject-wise practice with most repeated questions, past papers and full mock tests.',
    highlights: [
      'FIA tests are conducted through FPSC with One Paper MCQ format',
      'Urdu, English, General Knowledge and Pakistan Studies are core subjects',
      'Constable and Assistant posts are among the highest-volume FIA searches',
    ],
    prep: [
      'Master most-repeated MCQs in General Knowledge and Pakistan Affairs',
      'Practice Urdu grammar and comprehension if your post includes Urdu',
      'Attempt full mocks before applying to build speed and accuracy',
    ],
  },
  css: {
    label: 'CSS',
    h1: 'CSS Exam Preparation 2026  -  MPT MCQs, Past Papers & Mock Tests',
    intro:
      'Complete CSS (Central Superior Services) preparation on Imtehan: MPT screening test MCQs, compulsory subject practice, past papers and full mock exams conducted by FPSC.',
    highlights: [
      'CSS MPT is the mandatory preliminary screening test before the written exam',
      'Compulsory subjects: English, GK, Pakistan Affairs, Islamiat, Current Affairs, Everyday Science',
      'Timed mock tests simulate the real 200-question MPT format',
    ],
    prep: [
      'Pass CSS MPT first with daily subject-wise MCQ practice',
      'Use past paper sets to identify recurring topics',
      'Attempt full MPT mocks weekly in the final month',
    ],
  },
  pms: {
    label: 'PMS',
    h1: 'PMS MCQs 2026  -  Provincial Management Services Practice Tests',
    intro:
      'Practice Provincial Management Services (PMS) MCQs for Punjab, Sindh, KPK and other provinces. Same subject bank as CSS MPT with province-specific mock tests.',
    highlights: [
      'PMS screening uses a similar MCQ format to CSS MPT',
      'Provincial commissions: PPSC, SPSC, KPPSC, BPSC and others',
      'General Knowledge and Pakistan Affairs dominate the paper',
    ],
    prep: [
      'Practice province-specific past papers where available',
      'Build accuracy in Islamiat and Current Affairs early',
      'Use timed mocks to match provincial commission patterns',
    ],
  },
  nts: {
    label: 'NTS',
    h1: 'NTS Test Preparation 2026  -  GAT, NAT & Recruitment MCQs',
    intro:
      'Practice National Testing Service (NTS) MCQs for GAT, NAT, recruitment tests and department-specific exams. Subject-wise sets with answers and explanations.',
    highlights: [
      'NTS tests are used by universities, government departments and corporations',
      'Verbal, analytical and subject sections vary by test type',
      'Past paper practice is essential for NTS pattern familiarity',
    ],
    prep: [
      'Identify your exact NTS test type (GAT, NAT, recruitment)',
      'Practice analytical and quantitative sections daily',
      'Attempt full-length timed practice before the test date',
    ],
  },
  etea: {
    label: 'ETEA',
    h1: 'ETEA Test Preparation 2026  -  PST, SST & KPK Recruitment MCQs',
    intro:
      'Practice Educational Testing & Evaluation Agency (ETEA) KPK MCQs for PST, SST, CT, Lady Health Visitor and general recruitment tests.',
    highlights: [
      'ETEA conducts tests for KPK education and government recruitment',
      'Professional and general knowledge sections vary by post',
      'Past paper MCQs reflect the actual ETEA difficulty level',
    ],
    prep: [
      'Focus on subject-specific MCQs for teaching posts (PST, SST)',
      'Practice General Knowledge and English for general recruitment',
      'Use timed mocks to build exam-day stamina',
    ],
  },
  police: {
    label: 'Police',
    h1: 'Police Test MCQs 2026  -  Constable, ASI & SI Online Practice',
    intro:
      'Prepare for Punjab, Sindh, KPK, Balochistan and Islamabad Police recruitment tests. Constable, ASI and Sub Inspector MCQs with past papers and mock tests.',
    highlights: [
      'Police tests cover General Knowledge, Pakistan Studies, English and Urdu',
      'Physical test follows the written MCQ exam for most posts',
      'Provincial police tests have similar but not identical syllabi',
    ],
    prep: [
      'Practice province-specific past paper MCQs',
      'Master Pakistan Affairs and Islamic Studies basics',
      'Attempt timed mocks matching your province\'s paper length',
    ],
  },
  military: {
    label: 'Military',
    h1: 'Pak Army, Navy & PAF Test MCQs 2026  -  Initial Test Practice',
    intro:
      'Practice Pakistan Armed Forces initial selection test MCQs for Pak Army, Navy, PAF, Rangers, FC and ANF. Intelligence, academic and general knowledge sections.',
    highlights: [
      'Initial tests include intelligence, maths, English and general knowledge',
      'Each service (Army, Navy, PAF) has a slightly different emphasis',
      'Speed and accuracy matter  -  practice under timed conditions',
    ],
    prep: [
      'Practice intelligence and non-verbal reasoning daily',
      'Review maths fundamentals and English vocabulary',
      'Attempt full mocks to build test-day confidence',
    ],
  },
  banks: {
    label: 'Banks',
    h1: 'Bank Officer Test MCQs 2026  -  NBP, SBP, HBL & More',
    intro:
      'Practice banking sector recruitment MCQs for NBP, SBP, HBL, UBL, Meezan Bank and other officer and clerical posts in Pakistan.',
    highlights: [
      'Bank tests cover English, maths, general knowledge and banking awareness',
      'Officer grade tests are more analytical than clerical posts',
      'Past paper MCQs reveal recurring quantitative and GK topics',
    ],
    prep: [
      'Practice maths and analytical reasoning daily',
      'Study basic banking terms and current financial affairs',
      'Attempt timed mocks for your target bank\'s format',
    ],
  },
  engineering: {
    label: 'Engineering',
    h1: 'Engineering Entry Test MCQs 2026  -  NET, ECAT, GIKI & PIEAS',
    intro:
      'Practice engineering university entry test MCQs for NUST NET, UET ECAT, GIKI, PIEAS, COMSATS, LUMS and more. Physics, Maths, Chemistry and English sets.',
    highlights: [
      'Entry tests are the gateway to engineering programs in Pakistan',
      'Mathematics and Physics carry the highest marks',
      'Each university has a slightly different subject weightage',
    ],
    prep: [
      'Build fundamentals in Maths and Physics first',
      'Practice application-style MCQs against the clock',
      'Attempt university-specific full mocks before your test date',
    ],
  },
  medical: {
    label: 'MDCAT',
    h1: 'MDCAT MCQs 2026  -  Biology, Chemistry, Physics & English Practice',
    intro:
      'Practice MDCAT (Medical & Dental College Admission Test) MCQs for PMC, NUMS, ETEA and AKU patterns. Topic-wise Biology, Chemistry, Physics and English sets.',
    highlights: [
      'Biology carries the most marks in MDCAT',
      'Logical reasoning and English are high-yield per hour studied',
      'Full mock tests simulate the real 210-question MDCAT format',
    ],
    prep: [
      'Prioritise high-yield Biology and Chemistry topics',
      'Practice application MCQs under strict time limits',
      'Attempt full PMC-pattern mocks weekly',
    ],
  },
  judiciary: {
    label: 'Judiciary',
    h1: 'Judiciary Clerk & Steno Test MCQs 2026  -  High Court Practice',
    intro:
      'Practice judiciary recruitment MCQs for High Court Clerk, Stenographer, Sessions Court and Supreme Court assistant posts across Pakistan.',
    highlights: [
      'Judiciary tests emphasise English, general knowledge and legal awareness basics',
      'Typing and shorthand skills are tested separately for steno posts',
      'Past paper MCQs help you understand each court\'s pattern',
    ],
    prep: [
      'Practice English grammar and comprehension intensively',
      'Study Pakistan\'s legal system basics and current affairs',
      'Attempt timed MCQ mocks before the written test',
    ],
  },
  provincial: {
    label: 'Provincial',
    h1: 'Provincial Commission MCQs 2026  -  SPSC, KPPSC, BPSC & More',
    intro:
      'Practice provincial public service commission MCQs for Sindh (SPSC), KPK (KPPSC), Balochistan (BPSC), AJK and GB recruitment tests.',
    highlights: [
      'Each province has its own commission and paper pattern',
      'General Knowledge and Pakistan Affairs are common across provinces',
      'One Paper MCQ format is standard for most provincial posts',
    ],
    prep: [
      'Focus on your target province\'s past papers first',
      'Build strong Pakistan Affairs and GK foundations',
      'Practice under timed conditions matching your commission\'s format',
    ],
  },
  ots: {
    label: 'OTS',
    h1: 'OTS Test MCQs 2026  -  Open Testing Service Practice',
    intro:
      'Practice Open Testing Service (OTS) recruitment MCQs for education, health and government department posts across Pakistan.',
    highlights: [
      'OTS conducts standardized tests for multiple departments',
      'General and professional knowledge sections vary by post',
      'Past paper practice builds familiarity with OTS question style',
    ],
    prep: [
      'Identify your post\'s exact syllabus on the OTS website',
      'Practice subject-wise MCQs then full timed mocks',
      'Review wrong answers to close knowledge gaps quickly',
    ],
  },
  railways: {
    label: 'Railways',
    h1: 'Pakistan Railways Test MCQs 2026  -  Recruitment Practice',
    intro:
      'Practice Pakistan Railways recruitment MCQs for Station Master, Guard, TTE, Clerk and other posts with subject-wise sets and mock tests.',
    highlights: [
      'Railways tests cover general knowledge, English and basic maths',
      'Past papers reveal recurring topics in railway recruitment',
      'Timed practice builds the speed needed on exam day',
    ],
    prep: [
      'Practice GK and Pakistan Affairs MCQs daily',
      'Review basic arithmetic and English grammar',
      'Attempt full mocks before your test date',
    ],
  },
  devauth: {
    label: 'Development Authorities',
    h1: 'CDA, LDA & Development Authority Test MCQs 2026',
    intro:
      'Practice development authority recruitment MCQs for CDA, LDA, KDA, MDA and RDA posts including Assistant, Clerk and engineering positions.',
    highlights: [
      'Tests typically cover GK, English, maths and professional subjects',
      'Islamabad CDA and Lahore LDA are the most searched authorities',
      'Past paper MCQs mirror actual test difficulty',
    ],
    prep: [
      'Practice most-repeated MCQs for your target authority',
      'Focus on Pakistan Affairs and English for general posts',
      'Use timed mocks to simulate exam conditions',
    ],
  },
  rescue: {
    label: 'Rescue 1122',
    h1: 'Rescue 1122 Test MCQs 2026  -  Emergency Services Practice',
    intro:
      'Practice Punjab Rescue 1122 recruitment MCQs for Rescuer, Driver, Operator and emergency services posts.',
    highlights: [
      'Rescue 1122 tests cover general knowledge and basic emergency awareness',
      'Physical fitness is tested separately from the written MCQ exam',
      'Past paper sets help you understand the written test pattern',
    ],
    prep: [
      'Practice GK and Pakistan Affairs MCQs consistently',
      'Review basic first aid and emergency response concepts',
      'Attempt timed mocks before the written test',
    ],
  },
  revenue: {
    label: 'Revenue Authorities',
    h1: 'PRA, SRB & Revenue Authority Test MCQs 2026',
    intro:
      'Practice provincial revenue authority recruitment MCQs for PRA, SRB, KPRA and BRA tax authority posts.',
    highlights: [
      'Revenue tests combine general knowledge with basic tax awareness',
      'English and maths sections appear on many revenue posts',
      'Past paper MCQs are the best predictor of actual questions',
    ],
    prep: [
      'Study basic tax concepts for your province\'s revenue authority',
      'Practice GK and English MCQs daily',
      'Attempt full timed mocks before applying',
    ],
  },
}

export function getCategorySeoContent(category: string): CategorySeoContent | null {
  const meta = CATEGORY_META[category]
  if (!meta) return null

  const exams = Object.entries(EXAM_CONFIGS)
    .filter(([, config]) => config.category === category)
    .map(([slug, config]) => ({
      slug,
      name: config.name,
      subjectCount: config.sections.length,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  if (exams.length === 0) return null

  const faqs = [
    {
      question: `How many ${meta.label} exams can I practice on Imtehan?`,
      answer: `Imtehan covers ${exams.length} ${meta.label} recruitment tests with subject-wise MCQs, past paper sets and full mock tests for each post.`,
    },
    {
      question: `Are ${meta.label} MCQs free to practice?`,
      answer: `Yes. You can practise ${meta.label} MCQs for free on Imtehan. Premium unlocks detailed analytics and unlimited mock attempts.`,
    },
    {
      question: `Which subjects are tested in ${meta.label} exams?`,
      answer:
        `Most ${meta.label} tests include General Knowledge, Pakistan Affairs, Current Affairs, English and Islamiat. ` +
        `Professional posts add subject-specific MCQs. Each exam page on Imtehan lists its exact subjects.`,
    },
  ]

  return {
    slug: category,
    label: meta.label,
    h1: meta.h1,
    intro: meta.intro,
    highlights: meta.highlights,
    prep: meta.prep,
    faqs,
    exams,
  }
}

export const CATEGORY_SLUGS = Object.keys(CATEGORY_META)
