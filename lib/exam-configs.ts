export interface ExamSection {
  slug: string
  label: string
  dbTable: string
  count: number
}

export interface ExamConfig {
  name: string
  category: string
  totalMCQs: number
  duration: number       // minutes
  passingPercentage: number
  negativeMarking: boolean
  sections: ExamSection[]
  pastPapersExam?: string
  targetExam?: string       // DB target_exam value to scope MCQs to this exam only
  mockOnly?: boolean
  sourceExam?: string
  sourceExamLabel?: string
  guide?: {
    authority?: string
    officialLink?: string
    lastUpdated?: string
    eligibility: string[]
    important: string[]
    helpful: string[]
  }
}

export const EXAM_CONFIGS: Record<string, ExamConfig> = {

  // ============================================================
  // MEDICAL — MDCAT (Medical & Dental College Admission Test)
  // ============================================================

  'mdcat': {
    name: 'MDCAT (Medical & Dental)',
    category: 'medical',
    totalMCQs: 18962,
    duration: 180,
    passingPercentage: 65,
    negativeMarking: false,
    sections: [
      { slug: 'biology',    label: 'Biology',    dbTable: 'mdcat_biology',    count: 5944 },
      { slug: 'chemistry',  label: 'Chemistry',  dbTable: 'mdcat_chemistry',  count: 6218 },
      { slug: 'physics',    label: 'Physics',    dbTable: 'mdcat_physics',    count: 4695 },
      { slug: 'english',    label: 'English',    dbTable: 'mdcat_english',    count: 925  },
      { slug: 'logical-reasoning', label: 'Logical Reasoning', dbTable: 'mdcat_logical_reasoning', count: 1180 },
    ]
  },

  // ============================================================
  // NATIONAL — CSS & PMS (Federal Competitive)
  // ============================================================

  'css-mpt': {
    name: 'CSS Screening Test (MPT)',
    category: 'national',
    totalMCQs: 200,
    duration: 200,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',          label: 'English',                dbTable: 'english',           count: 40 },
      { slug: 'general-knowledge',label: 'General Knowledge',      dbTable: 'general_knowledge', count: 40 },
      { slug: 'pakistan-affairs', label: 'Pakistan Affairs',       dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'islamic-studies',  label: 'Islamic Studies',        dbTable: 'islamiat',          count: 20 },
      { slug: 'current-affairs',  label: 'Current Affairs',        dbTable: 'current_affairs',   count: 20 },
      { slug: 'everyday-science', label: 'Everyday Science',       dbTable: 'everyday_science',  count: 20 },
      { slug: 'mathematics',      label: 'Arithmetic & Mathematics',dbTable: 'general_math',     count: 20 },
      { slug: 'geography',        label: 'Geography',              dbTable: 'geography',         count: 20 },
    ]
  },

  // ============================================================
  // PPSC — Punjab Public Service Commission
  // ============================================================

  'ppsc-assistant': {
    name: 'PPSC Assistant (BS-16)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 15 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'ppsc-sub-inspector': {
    name: 'PPSC Sub Inspector Police',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 5  },
    ]
  },

  'ppsc-asi': {
    name: 'PPSC Assistant Sub Inspector (ASI)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 5  },
    ]
  },

  'ppsc-tehsildar': {
    name: 'PPSC Tehsildar (Revenue)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 15 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 10 },
      { slug: 'geography',         label: 'Geography',          dbTable: 'geography',         count: 10 },
    ]
  },

  'ppsc-naib-tehsildar': {
    name: 'PPSC Naib Tehsildar',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 15 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 10 },
      { slug: 'geography',         label: 'Geography',          dbTable: 'geography',         count: 10 },
    ]
  },

  'ppsc-patwari': {
    name: 'PPSC Patwari (Revenue)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 15 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 10 },
      { slug: 'geography',         label: 'Geography',          dbTable: 'geography',         count: 10 },
    ]
  },

  'ppsc-junior-clerk': {
    name: 'PPSC Junior Clerk (BS-11)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 15 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'ppsc-senior-clerk': {
    name: 'PPSC Senior Clerk (BS-14)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 15 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 10 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 10 },
    ]
  },

  'ppsc-deo': {
    name: 'PPSC Data Entry Operator',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 40 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'ppsc-computer-operator': {
    name: 'PPSC Computer Operator (BS-14)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 40 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'ppsc-excise-inspector': {
    name: 'PPSC Inspector Excise & Taxation',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
    ]
  },

  'ppsc-steno-typist': {
    name: 'PPSC Stenotypist (BS-12)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  // ============================================================
  // FPSC — Federal Public Service Commission
  // ============================================================

  'fpsc-assistant': {
    name: 'FPSC Assistant (BS-15)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 100,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'fpsc-udc': {
    name: 'FPSC Upper Division Clerk (UDC)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 100,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 15 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'fpsc-ldc': {
    name: 'FPSC Lower Division Clerk (LDC)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
    ]
  },

  'fpsc-inspector-ir': {
    name: 'FPSC Inspector (Inland Revenue)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 100,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
    ]
  },

  'fpsc-inspector-customs': {
    name: 'FPSC Inspector (Customs & Excise)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 100,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
    ]
  },

  'fpsc-general': {
    name: 'FPSC General Duty (BS-14)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 15 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 5  },
    ]
  },

  // ============================================================
  // PROVINCIAL — PMS & PSC Exams
  // ============================================================

  'pms-punjab': {
    name: 'Punjab PMS Screening Test',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: true,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 5  },
    ]
  },

  'pms-sindh': {
    name: 'Sindh PMS Screening Test',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: true,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 5  },
    ]
  },

  'pms-kpk': {
    name: 'KPK PMS Screening Test',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: true,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 5  },
    ]
  },

  'kppsc-general': {
    name: 'KPPSC General Posts',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 10 },
    ]
  },

  'spsc-general': {
    name: 'SPSC General Posts (Sindh)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 10 },
    ]
  },

  'bpsc-general': {
    name: 'BPSC General Posts (Balochistan)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 10 },
    ]
  },

  'ajkpsc-general': {
    name: 'AJKPSC General Posts (AJK)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 10 },
    ]
  },

  // ============================================================
  // ETEA — Educational Testing & Evaluation Agency (KPK)
  // ============================================================

  'etea-pst': {
    name: 'ETEA Primary School Teacher (PST)',
    category: 'etea',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 15 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'etea-sst': {
    name: 'ETEA Secondary School Teacher (SST)',
    category: 'etea',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 15 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
    ]
  },

  'etea-ct': {
    name: 'ETEA Certificate Teacher (CT)',
    category: 'etea',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 15 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'etea-general': {
    name: 'ETEA General Recruitment',
    category: 'etea',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 15 },
    ]
  },

  // ============================================================
  // NTS — National Testing Service
  // ============================================================

  'nts-general': {
    name: 'NTS General Posts Screening',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  'nts-railway': {
    name: 'NTS Pakistan Railways',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 15 },
    ]
  },

  'nts-wapda': {
    name: 'NTS WAPDA / Power Division',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
    ]
  },

  'nts-fbr': {
    name: 'NTS FBR Tax Facilitation',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  'nts-education': {
    name: 'NTS Education Department',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  // ============================================================
  // OTS — Open Testing Service
  // ============================================================

  'ots-general': {
    name: 'OTS General Posts',
    category: 'ots',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 15 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 15 },
    ]
  },

  'ots-education': {
    name: 'OTS Education Department Posts',
    category: 'ots',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'ots-health': {
    name: 'OTS Health Department Posts',
    category: 'ots',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 20 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
    ]
  },

  'ots-revenue': {
    name: 'OTS Revenue Department Posts',
    category: 'ots',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
    ]
  },

  'ots-police': {
    name: 'OTS Police Department Posts',
    category: 'ots',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  'ots-agriculture': {
    name: 'OTS Agriculture Department Posts',
    category: 'ots',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  'ots-forest': {
    name: 'OTS Forest Department Posts',
    category: 'ots',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'geography',         label: 'Geography',          dbTable: 'geography',         count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  // ============================================================
  // PPSC — Additional Posts
  // ============================================================

  'ppsc-zilladar': {
    name: 'PPSC Zilladar (Revenue)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'geography',         label: 'Geography',          dbTable: 'geography',         count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 10 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 10 },
    ]
  },

  'ppsc-revenue-officer': {
    name: 'PPSC Revenue Officer (BS-16)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
      { slug: 'geography',         label: 'Geography',          dbTable: 'geography',         count: 10 },
    ]
  },

  'ppsc-statistical-officer': {
    name: 'PPSC Statistical Officer (BS-17)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 15 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 10 },
    ]
  },

  'ppsc-auditor': {
    name: 'PPSC Auditor (Finance Dept, BS-14)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 15 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
    ]
  },

  'ppsc-education-officer': {
    name: 'PPSC District Education Officer',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 15 },
    ]
  },

  'ppsc-cooperative-inspector': {
    name: 'PPSC Cooperative Inspector (BS-14)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 15 },
    ]
  },

  'ppsc-sanitary-inspector': {
    name: 'PPSC Sanitary Inspector (BS-11)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 15 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
    ]
  },

  'ppsc-junior-auditor': {
    name: 'PPSC Junior Auditor (BS-11)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 10 },
    ]
  },

  // ============================================================
  // FPSC — Additional Posts
  // ============================================================

  'fpsc-ib-officer': {
    name: 'FPSC Intelligence Bureau (IB) Officer',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 100,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'fpsc-fia-inspector': {
    name: 'FPSC FIA Inspector (BS-14)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 100,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'fpsc-asf-junior-officer': {
    name: 'FPSC ASF Junior Airport Security Officer',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  'fpsc-postal-clerk': {
    name: 'FPSC Postal / Telegraph Clerk (BS-11)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 15 },
    ]
  },

  'fpsc-fia-constable': {
    name: 'FPSC FIA Constable (BS-7)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  // ============================================================
  // FIA — Federal Investigation Agency
  // ============================================================

  'fia-sub-inspector': {
    name: 'FIA Sub-Inspector (BS-14)',
    category: 'fia',
    totalMCQs: 100,
    duration: 100,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 10 },
    ]
  },

  'fia-assistant-sub-inspector': {
    name: 'FIA Assistant Sub-Inspector (BS-09)',
    category: 'fia',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 10 },
    ]
  },

  'fia-constable': {
    name: 'FIA Constable (BS-05)',
    category: 'fia',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'fia-constable-driver': {
    name: 'FIA Constable Driver (BS-05)',
    category: 'fia',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 15 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 5  },
    ]
  },

  'fia-assistant': {
    name: 'FIA Assistant (BS-15)',
    category: 'fia',
    totalMCQs: 100,
    duration: 100,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'fia-steno-typist': {
    name: 'FIA Steno-Typist (BS-14)',
    category: 'fia',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 5  },
    ]
  },

  'fia-technical-assistant': {
    name: 'FIA Technical Assistant (BS-14)',
    category: 'fia',
    totalMCQs: 100,
    duration: 100,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  'fia-data-entry-operator': {
    name: 'FIA Data Entry Operator (BS-14)',
    category: 'fia',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 35 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 15 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  'fia-udc': {
    name: 'FIA Upper Division Clerk (BS-13)',
    category: 'fia',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 5  },
    ]
  },

  'fia-ldc': {
    name: 'FIA Lower Division Clerk (BS-11)',
    category: 'fia',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
    ]
  },

  'fia-head-clerk': {
    name: 'FIA Head Clerk (BS-10)',
    category: 'fia',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 5  },
    ]
  },

  'fia-telephone-operator': {
    name: 'FIA Telephone Operator (BS-07)',
    category: 'fia',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 10 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 10 },
    ]
  },

  'fia-staff-car-driver': {
    name: 'FIA Staff Car Driver (BS-05)',
    category: 'fia',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 15 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 5  },
    ]
  },

  // ============================================================
  // PROVINCIAL — KPPSC & SPSC Specific Posts
  // ============================================================

  'kppsc-assistant': {
    name: 'KPPSC Assistant (BS-16)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
    ]
  },

  'kppsc-sub-inspector': {
    name: 'KPPSC Sub Inspector Police',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 5  },
    ]
  },

  'kppsc-junior-clerk': {
    name: 'KPPSC Junior Clerk (BS-11)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
    ]
  },

  'spsc-assistant': {
    name: 'SPSC Assistant (Sindh, BS-16)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
    ]
  },

  'spsc-sub-inspector': {
    name: 'SPSC Sub Inspector (Sindh Police)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
    ]
  },

  'gbpsc-general': {
    name: 'GBPSC General Posts (Gilgit-Baltistan)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 10 },
    ]
  },

  // ============================================================
  // NTS — Additional Posts
  // ============================================================

  'nts-nadra': {
    name: 'NTS NADRA Positions',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 10 },
    ]
  },

  'nts-ogdcl': {
    name: 'NTS OGDCL (Oil & Gas)',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 10 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 5  },
    ]
  },

  'nts-nbp': {
    name: 'NTS / IBA National Bank of Pakistan',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 15 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
    ]
  },

  'nts-sui-gas': {
    name: 'NTS SNGPL / SSGCL (Gas Utilities)',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 55,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 15 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 15 },
    ]
  },

  'nts-ztbl': {
    name: 'NTS ZTBL (Agricultural Bank)',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 15 },
    ]
  },

  // ============================================================
  // MILITARY — Armed Forces Initial Tests
  // ============================================================

  'military-pak-army': {
    name: 'Join Pak Army — Initial Academic Test',
    category: 'military',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
    ]
  },

  'military-pak-navy': {
    name: 'Join Pak Navy — Initial Academic Test',
    category: 'military',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 20 },
    ]
  },

  'military-paf-airman': {
    name: 'Join PAF — Airman Initial Test',
    category: 'military',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 25 },
    ]
  },

  'military-rangers': {
    name: 'Pakistan Rangers — Initial Test',
    category: 'military',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 35 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 20 },
    ]
  },

  'military-fc': {
    name: 'Frontier Corps (FC) — Initial Test',
    category: 'military',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 35 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 20 },
    ]
  },

  // ============================================================
  // BANKS — Banking Sector Tests (NTS / IBA Sukkur)
  // ============================================================

  'banks-nbp-officer': {
    name: 'NBP Officer Grade (IBA / NTS)',
    category: 'banks',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 15 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 10 },
    ]
  },

  'banks-sbp-junior': {
    name: 'SBP Junior Officer (IBA Sukkur)',
    category: 'banks',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 65,
    negativeMarking: true,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 10 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 10 },
    ]
  },

  'banks-ztbl-officer': {
    name: 'ZTBL Agriculture Bank Officer (NTS)',
    category: 'banks',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 15 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
    ]
  },

  'banks-hbl-officer': {
    name: 'HBL / MCB / ABL Officer (IBA)',
    category: 'banks',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 15 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 10 },
    ]
  },

  'banks-smeda-officer': {
    name: 'SMEDA / SECP / PPIB Officer (NTS)',
    category: 'banks',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 15 },
    ]
  },

  // ============================================================
  // PPSC — Additional Posts
  // ============================================================

  'ppsc-municipal-officer': {
    name: 'PPSC Municipal Officer (BS-14)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
    ]
  },

  'ppsc-welfare-officer': {
    name: 'PPSC Welfare Officer (BS-16)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 20 },
    ]
  },

  'ppsc-labour-inspector': {
    name: 'PPSC Labour Inspector (BS-14)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 15 },
    ]
  },

  'ppsc-sub-registrar': {
    name: 'PPSC Sub Registrar (BS-14)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
    ]
  },

  'ppsc-planning-officer': {
    name: 'PPSC Planning Officer (BS-17)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 20 },
    ]
  },

  'ppsc-research-officer': {
    name: 'PPSC Research Officer (BS-17)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
    ]
  },

  'ppsc-drug-inspector': {
    name: 'PPSC Drug Inspector (BS-16)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'ppsc-food-inspector': {
    name: 'PPSC Food Inspector (BS-14)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
    ]
  },

  'ppsc-agriculture-officer': {
    name: 'PPSC Agriculture Officer (BS-17)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'ppsc-livestock-officer': {
    name: 'PPSC Livestock Officer (BS-17)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
    ]
  },

  'ppsc-accounts-officer': {
    name: 'PPSC Accounts Officer (BS-17)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 30 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 20 },
    ]
  },

  'ppsc-warden': {
    name: 'PPSC Warden / Jail Warden (BS-9)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 35 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
    ]
  },

  // ============================================================
  // FPSC — Additional Posts
  // ============================================================

  'fpsc-stenographer': {
    name: 'FPSC Stenographer / Stenotypist (BS-15)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 40 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'computer',          label: 'Computer Skills',    dbTable: 'basic_computer',    count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  'fpsc-accountant': {
    name: 'FPSC Accountant (BS-16)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'computer',          label: 'Computer Skills',    dbTable: 'basic_computer',    count: 15 },
    ]
  },

  'fpsc-auditor': {
    name: 'FPSC Auditor / Junior Auditor (BS-14)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
    ]
  },

  // ============================================================
  // PROVINCIAL — BPSC (Balochistan)
  // ============================================================

  'bpsc-assistant': {
    name: 'BPSC Assistant (BS-15/16)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 10 },
    ]
  },

  'bpsc-sub-inspector': {
    name: 'BPSC Sub Inspector (BS-14)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'bpsc-junior-clerk': {
    name: 'BPSC Junior Clerk (BS-11)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
      { slug: 'computer',          label: 'Computer Skills',    dbTable: 'basic_computer',    count: 15 },
    ]
  },

  'bpsc-computer-operator': {
    name: 'BPSC Computer Operator (BS-12)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 40 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  // ============================================================
  // PROVINCIAL — AJKPSC Additional
  // ============================================================

  'ajkpsc-assistant': {
    name: 'AJKPSC Assistant (BS-15/16)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'ajkpsc-sub-inspector': {
    name: 'AJKPSC Sub Inspector (BS-14)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 35 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 20 },
    ]
  },

  // ============================================================
  // PROVINCIAL — KPPSC Additional
  // ============================================================

  'kppsc-deo': {
    name: 'KPPSC Data Entry Operator (BS-12)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 40 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  'kppsc-computer-operator': {
    name: 'KPPSC Computer Operator (BS-12)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 45 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'kppsc-patwari': {
    name: 'KPPSC Patwari / Girdawar (BS-7)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
    ]
  },

  // ============================================================
  // PROVINCIAL — SPSC Additional
  // ============================================================

  'spsc-deo': {
    name: 'SPSC Data Entry Operator (BS-12)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 40 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  'spsc-junior-clerk': {
    name: 'SPSC Junior Clerk (BS-11)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 10 },
    ]
  },

  // ============================================================
  // POLICE — Provincial & Federal
  // ============================================================

  'police-punjab-constable': {
    name: 'Punjab Police Constable (BS-5)',
    category: 'police',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'police-punjab-si': {
    name: 'Punjab Police Sub Inspector (BS-14)',
    category: 'police',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  'police-sindh-si': {
    name: 'Sindh Police Sub Inspector (BS-14)',
    category: 'police',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'police-kpk-si': {
    name: 'KPK Police Sub Inspector (BS-14)',
    category: 'police',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
    ]
  },

  'police-islamabad-si': {
    name: 'Islamabad Police Sub Inspector (BS-14)',
    category: 'police',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'police-punjab-asi': {
    name: 'Punjab Police ASI (BS-9)',
    category: 'police',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 35 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  // ============================================================
  // JUDICIARY — Court & Tribunal Posts
  // ============================================================

  'judiciary-high-court-clerk': {
    name: 'High Court Clerk / Reader (Lahore / Peshawar)',
    category: 'judiciary',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'computer',          label: 'Computer Skills',    dbTable: 'basic_computer',    count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'judiciary-district-court-steno': {
    name: 'District Court Stenographer',
    category: 'judiciary',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 40 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'computer',          label: 'Computer Skills',    dbTable: 'basic_computer',    count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  'judiciary-sessions-court-clerk': {
    name: 'Sessions Court Clerk / Process Server',
    category: 'judiciary',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'judiciary-supreme-court-assistant': {
    name: 'Supreme Court of Pakistan Assistant',
    category: 'judiciary',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 55,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'computer',          label: 'Computer Skills',    dbTable: 'basic_computer',    count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
    ]
  },

  'judiciary-islamabad-high-court': {
    name: 'Islamabad High Court Assistant / Clerk',
    category: 'judiciary',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 55,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'computer',          label: 'Computer Skills',    dbTable: 'basic_computer',    count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  // ============================================================
  // PAKISTAN RAILWAYS — Direct Recruitment
  // ============================================================

  'railways-station-master': {
    name: 'Pakistan Railways Station Master (BS-12)',
    category: 'railways',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
    ]
  },

  'railways-traffic-apprentice': {
    name: 'Pakistan Railways Traffic Apprentice (BS-9)',
    category: 'railways',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 20 },
    ]
  },

  'railways-guard': {
    name: 'Pakistan Railways Guard (BS-9)',
    category: 'railways',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 35 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
    ]
  },

  'railways-ticket-examiner': {
    name: 'Pakistan Railways Ticket Examiner / TTE (BS-7)',
    category: 'railways',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
    ]
  },

  'railways-clerk': {
    name: 'Pakistan Railways Clerk / Assistant (BS-11)',
    category: 'railways',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'computer',          label: 'Computer Skills',    dbTable: 'basic_computer',    count: 20 },
    ]
  },

  'railways-junior-clerk': {
    name: 'Pakistan Railways Junior Clerk / Booking Clerk (BS-7)',
    category: 'railways',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
    ]
  },

  // ============================================================
  // DEVELOPMENT AUTHORITIES — CDA, LDA, KDA, MDA, RDA
  // ============================================================

  'cda-assistant': {
    name: 'CDA Assistant / UDC Islamabad (BS-15/16)',
    category: 'devauth',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'computer',          label: 'Computer Skills',    dbTable: 'basic_computer',    count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'cda-junior-clerk': {
    name: 'CDA Junior Clerk / LDC Islamabad (BS-9)',
    category: 'devauth',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
    ]
  },

  'lda-assistant': {
    name: 'LDA Assistant / UDC Lahore (BS-15/16)',
    category: 'devauth',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'computer',          label: 'Computer Skills',    dbTable: 'basic_computer',    count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'lda-junior-clerk': {
    name: 'LDA Junior Clerk / LDC Lahore (BS-9)',
    category: 'devauth',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'kda-mda-assistant': {
    name: 'KDA / MDA / RDA Assistant (BS-15/16)',
    category: 'devauth',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'computer',          label: 'Computer Skills',    dbTable: 'basic_computer',    count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'kda-mda-junior-clerk': {
    name: 'KDA / MDA / RDA Junior Clerk (BS-9)',
    category: 'devauth',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
    ]
  },

  // ============================================================
  // POLICE — More Constable Posts
  // ============================================================

  'police-sindh-constable': {
    name: 'Sindh Police Constable (BS-5)',
    category: 'police',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'police-kpk-constable': {
    name: 'KPK Police Constable (BS-5)',
    category: 'police',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'police-islamabad-constable': {
    name: 'Islamabad Police Constable (BS-5)',
    category: 'police',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  // ============================================================
  // JUDICIARY — More Courts
  // ============================================================

  'judiciary-sindh-high-court': {
    name: 'Sindh High Court Clerk / Stenographer',
    category: 'judiciary',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'computer',          label: 'Computer Skills',    dbTable: 'basic_computer',    count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'judiciary-balochistan-high-court': {
    name: 'Balochistan High Court Clerk / Assistant',
    category: 'judiciary',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
    ]
  },

  'judiciary-federal-shariat-court': {
    name: 'Federal Shariat Court Assistant / Clerk',
    category: 'judiciary',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
    ]
  },

  // ============================================================
  // PPSC — Lady Health & Director Level
  // ============================================================

  'ppsc-lady-health-supervisor': {
    name: 'PPSC Lady Health Supervisor (BS-14)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
    ]
  },

  'ppsc-assistant-director': {
    name: 'PPSC Assistant Director (BS-17)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
    ]
  },

  // ============================================================
  // FPSC — Additional Posts
  // ============================================================

  'fpsc-customs-appraiser': {
    name: 'FPSC Customs Appraiser / Preventive Officer (BS-16)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
    ]
  },

  'fpsc-research-officer': {
    name: 'FPSC Research Officer (BS-17)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 10 },
    ]
  },

  // ============================================================
  // MILITARY — ANF & PAF Officer
  // ============================================================

  'military-anf-inspector': {
    name: 'ANF Inspector / Sub Inspector (BS-14)',
    category: 'military',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 10 },
    ]
  },

  'military-anf-constable': {
    name: 'ANF Constable (BS-5)',
    category: 'military',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 35 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'military-paf-officer': {
    name: 'PAF Officer GDP / GD (Initial Test)',
    category: 'military',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: true,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 35 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
    ]
  },

  'military-army-civilian': {
    name: 'Pak Army Civilian Posts — GD Clerk / LDC',
    category: 'military',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  // ============================================================
  // NTS — More Organizations
  // ============================================================

  'nts-hec': {
    name: 'NTS HEC GAT General (MS / PhD Scholarship)',
    category: 'nts',
    totalMCQs: 100,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: true,
    sections: [
      { slug: 'english',           label: 'English (Verbal)',   dbTable: 'english',           count: 40 },
      { slug: 'general-knowledge', label: 'Analytical',         dbTable: 'general_knowledge', count: 30 },
      { slug: 'mathematics',       label: 'Quantitative',       dbTable: 'general_math',      count: 30 },
    ]
  },

  'nts-pia': {
    name: 'NTS PIA Pakistan International Airlines Test',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 20 },
    ]
  },

  'nts-ptcl': {
    name: 'NTS PTCL Management Trainee / Technician',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 30 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
    ]
  },

  'nts-pemra': {
    name: 'NTS PEMRA Officer / Assistant',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'nts-paec': {
    name: 'NTS PAEC Assistant / Junior Scientific Officer',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 55,
    negativeMarking: true,
    sections: [
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 35 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 15 },
    ]
  },

  'nts-caa': {
    name: 'NTS CAA Junior Executive / Air Traffic Assistant',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 55,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 35 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 15 },
    ]
  },

  // ============================================================
  // OTS — Additional Departments
  // ============================================================

  'ots-water-sanitation': {
    name: 'OTS Water & Sanitation Dept (WSSP / PHED)',
    category: 'ots',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'ots-sports-board': {
    name: 'OTS Sports Board Punjab / KPK',
    category: 'ots',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 35 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'ots-social-welfare': {
    name: 'OTS Social Welfare / Community Development Dept',
    category: 'ots',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
    ]
  },

  // ============================================================
  // ETEA — Additional Posts
  // ============================================================

  'etea-lady-health-visitor': {
    name: 'ETEA Lady Health Visitor (LHV) — KPK',
    category: 'etea',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 40 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 15 },
    ]
  },

  'etea-nurse': {
    name: 'ETEA Staff Nurse / Midwife — KPK',
    category: 'etea',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 40 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
    ]
  },

  'etea-junior-clerk': {
    name: 'ETEA Junior Clerk / Assistant — KPK Govt',
    category: 'etea',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  // ============================================================
  // BANKS — More Institutions
  // ============================================================

  'banks-ubl-officer': {
    name: 'UBL Officer Grade 1 (IBA / NTS)',
    category: 'banks',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: true,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 20 },
    ]
  },

  'banks-alfalah-officer': {
    name: 'Bank Alfalah Officer (OG-II / OG-III)',
    category: 'banks',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 20 },
    ]
  },

  'banks-meezan-officer': {
    name: 'Meezan Bank Officer / Management Trainee',
    category: 'banks',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'islamic-studies',   label: 'Islamic Finance',    dbTable: 'islamiat',          count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
    ]
  },

  'banks-eobi-officer': {
    name: 'EOBI Officer / Assistant (NTS)',
    category: 'banks',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 10 },
    ]
  },

  // ============================================================
  // NAB — National Accountability Bureau
  // ============================================================

  'nab-investigation-officer': {
    name: 'NAB Investigation Officer (BS-17)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 55,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'nab-assistant': {
    name: 'NAB Assistant / Deputy Assistant (BS-14/15)',
    category: 'fpsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
    ]
  },

  // ============================================================
  // GBPSC — Gilgit-Baltistan Additional Posts
  // ============================================================

  'gbpsc-assistant': {
    name: 'GBPSC Assistant (BS-15/16)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'geography',         label: 'Geography',          dbTable: 'geography',         count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'gbpsc-sub-inspector': {
    name: 'GBPSC Sub Inspector (BS-14)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 35 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'geography',         label: 'Geography',          dbTable: 'geography',         count: 20 },
    ]
  },

  'gbpsc-junior-clerk': {
    name: 'GBPSC Junior Clerk (BS-9)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  // ============================================================
  // AJKPSC — Additional Posts
  // ============================================================

  'ajkpsc-junior-clerk': {
    name: 'AJKPSC Junior Clerk (BS-9)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'ajkpsc-computer-operator': {
    name: 'AJKPSC Computer Operator (BS-12)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 40 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  // ============================================================
  // BPSC & SPSC — Additional Posts
  // ============================================================

  'bpsc-patwari': {
    name: 'BPSC Patwari / Girdawar (BS-7)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
    ]
  },

  'spsc-computer-operator': {
    name: 'SPSC Computer Operator (BS-12)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 40 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  'spsc-patwari': {
    name: 'SPSC Patwari / Girdawar Sindh (BS-7)',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
    ]
  },

  // ============================================================
  // PPSC — Remaining Specialist Posts
  // ============================================================

  'ppsc-fisheries-officer': {
    name: 'PPSC Fisheries Officer (BS-17)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'geography',         label: 'Geography',          dbTable: 'geography',         count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
    ]
  },

  'ppsc-forest-officer': {
    name: 'PPSC Forest / Wildlife Officer (BS-17)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 30 },
      { slug: 'geography',         label: 'Geography',          dbTable: 'geography',         count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
    ]
  },

  'ppsc-pharmacist': {
    name: 'PPSC Pharmacist (BS-16)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 40 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ]
  },

  // ============================================================
  // MILITARY — Coast Guard
  // ============================================================

  'military-coast-guard': {
    name: 'Pakistan Coast Guard / Maritime Security',
    category: 'military',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 25 },
      { slug: 'geography',         label: 'Geography',          dbTable: 'geography',         count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  // ============================================================
  // NTS — LESCO / DISCO Power Distribution Companies
  // ============================================================

  'nts-lesco': {
    name: 'NTS LESCO / IESCO / FESCO / GEPCO Clerk',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 30 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
    ]
  },

  'nts-pesco-hesco': {
    name: 'NTS PESCO / HESCO / QESCO / MEPCO Clerk',
    category: 'nts',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 30 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
    ]
  },

  // ============================================================
  // OTS — Remaining Departments
  // ============================================================

  'ots-fisheries': {
    name: 'OTS Fisheries & Livestock Dept',
    category: 'ots',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 35 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'geography',         label: 'Geography',          dbTable: 'geography',         count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  'ots-tourism': {
    name: 'OTS Tourism & Culture Dept',
    category: 'ots',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'geography',         label: 'Geography',          dbTable: 'geography',         count: 25 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
    ]
  },

  'ots-industries': {
    name: 'OTS Industries & Commerce Dept',
    category: 'ots',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 30 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 20 },
    ]
  },

  // ============================================================
  // PPSC — Educators (PST / SST / EST)
  // ============================================================

  'ppsc-pst': {
    name: 'PPSC Primary School Teacher (PST)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 10 },
    ]
  },

  'ppsc-sst': {
    name: 'PPSC Secondary School Teacher (SST)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 15 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'ppsc-est': {
    name: 'PPSC Elementary School Teacher (EST)',
    category: 'ppsc',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 10 },
    ]
  },

  // ============================================================
  // PROVINCIAL — PMS Balochistan / AJK / GB
  // ============================================================

  'pms-balochistan': {
    name: 'Balochistan PMS Screening Test',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: true,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 5  },
    ]
  },

  'pms-ajk': {
    name: 'AJK PMS Screening Test',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: true,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 5  },
    ]
  },

  'pms-gb': {
    name: 'Gilgit-Baltistan PMS Screening Test',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: true,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 5  },
    ]
  },

  // ============================================================
  // POLICE — Balochistan / AJK / Motorway (NH&MP)
  // ============================================================

  'police-balochistan-si': {
    name: 'Balochistan Police Sub Inspector (BS-14)',
    category: 'police',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'police-balochistan-constable': {
    name: 'Balochistan Police Constable (BS-5)',
    category: 'police',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'police-ajk-si': {
    name: 'AJK Police Sub Inspector (BS-14)',
    category: 'police',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'police-ajk-constable': {
    name: 'AJK Police Constable (BS-5)',
    category: 'police',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 20 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
    ]
  },

  'police-motorway-si': {
    name: 'National Highways & Motorway Police (NH&MP) SI / JPO',
    category: 'police',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 15 },
    ]
  },

  'police-motorway-constable': {
    name: 'National Highways & Motorway Police (NH&MP) Constable',
    category: 'police',
    totalMCQs: 100,
    duration: 60,
    passingPercentage: 40,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 25 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 25 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
    ]
  },

  // ============================================================
  // BANKS — Bank of Punjab / Bank of Khyber
  // ============================================================

  'banks-bop-officer': {
    name: 'Bank of Punjab (BoP) Officer / OG-II',
    category: 'banks',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 15 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 10 },
    ]
  },

  'banks-bok-officer': {
    name: 'Bank of Khyber (BoK) Officer',
    category: 'banks',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 30 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'computer',          label: 'Computer Science',   dbTable: 'basic_computer',    count: 15 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'current_affairs',   count: 10 },
    ]
  },

  // ============================================================
  // RESCUE — Punjab Rescue 1122 Emergency Services
  // ============================================================

  'rescue-1122-rescuer': {
    // Official NTS pattern: Fire/Emergency Management 40%, English 20%, GK 20%, Pak Studies 10%, Islamiyat 10%
    name: 'Punjab Rescue 1122 Rescuer / Firefighter',
    category: 'rescue',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'everyday-science',  label: 'Emergency / Science', dbTable: 'everyday_science',  count: 40 },
      { slug: 'english',           label: 'English',             dbTable: 'english',           count: 20 },
      { slug: 'general-knowledge', label: 'General Knowledge',   dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',    dbTable: 'pakistan_studies',  count: 10 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',     dbTable: 'islamiat',          count: 10 },
    ]
  },

  'rescue-1122-driver': {
    // Official NTS pattern: Road Safety / Vehicle Maintenance 40%, GK 20%, Pak Studies 20%, Islamiyat 20%
    name: 'Punjab Rescue 1122 Driver / Operator',
    category: 'rescue',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'everyday-science',  label: 'Road Safety / Tech',  dbTable: 'everyday_science',  count: 40 },
      { slug: 'general-knowledge', label: 'General Knowledge',   dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',    dbTable: 'pakistan_studies',  count: 20 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',     dbTable: 'islamiat',          count: 20 },
    ]
  },

  'rescue-1122-computer-operator': {
    // Official NTS pattern: Computer/IT 40%, English 30%, GK 10%, Pak Studies 10%, Islamiyat 10%
    name: 'Punjab Rescue 1122 Computer Operator',
    category: 'rescue',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'computer',          label: 'Computer Science',    dbTable: 'basic_computer',    count: 40 },
      { slug: 'english',           label: 'English',             dbTable: 'english',           count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge',   dbTable: 'general_knowledge', count: 10 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',    dbTable: 'pakistan_studies',  count: 10 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',     dbTable: 'islamiat',          count: 10 },
    ]
  },

  // ============================================================
  // REVENUE — Provincial Tax & Revenue Authorities
  // ============================================================

  'pra-assistant': {
    name: 'Punjab Revenue Authority (PRA) Assistant / Inspector',
    category: 'revenue',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 10 },
    ]
  },

  'srb-assistant': {
    name: 'Sindh Revenue Board (SRB) Assistant / Inspector',
    category: 'revenue',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 10 },
    ]
  },

  'kpra-assistant': {
    name: 'KP Revenue Authority (KPRA) Assistant / Inspector',
    category: 'revenue',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 10 },
    ]
  },

  'bra-assistant': {
    name: 'Balochistan Revenue Authority (BRA) Assistant / Inspector',
    category: 'revenue',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'everyday_science',  count: 20 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 10 },
    ]
  },

  // ============================================================
  // ENGINEERING — Primary Exams (full 4-module practice)
  // ============================================================

  'ecat': {
    name: 'ECAT (Engineering College Admission)',
    category: 'engineering',
    totalMCQs: 5109,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    pastPapersExam: 'NET',
    sections: [
      { slug: 'physics',     label: 'Physics',     dbTable: 'engineering_physics',          count: 30 },
      { slug: 'mathematics', label: 'Mathematics',  dbTable: 'engineering_mathematics',      count: 30 },
      { slug: 'chemistry',   label: 'Chemistry',    dbTable: 'engineering_chemistry',        count: 30 },
      { slug: 'english',     label: 'English',      dbTable: 'engineering_english',          count: 10 },
    ]
  },

  'net-engineering': {
    name: 'NET (NTS Engineering Test)',
    category: 'engineering',
    totalMCQs: 5647,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    pastPapersExam: 'ECAT',
    sections: [
      { slug: 'physics',          label: 'Physics',           dbTable: 'engineering_physics',          count: 25 },
      { slug: 'mathematics',      label: 'Mathematics',        dbTable: 'engineering_mathematics',      count: 25 },
      { slug: 'chemistry',        label: 'Chemistry',          dbTable: 'engineering_chemistry',        count: 25 },
      { slug: 'computer-science', label: 'Computer Science',   dbTable: 'engineering_computer_science', count: 25 },
    ]
  },

  'giki-pieas': {
    name: 'GIKI / PIEAS Entry Test',
    category: 'engineering',
    totalMCQs: 5001,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    pastPapersExam: 'LUMS_SAT',
    sections: [
      { slug: 'physics',       label: 'Physics',       dbTable: 'engineering_physics',       count: 30 },
      { slug: 'mathematics',   label: 'Mathematics',    dbTable: 'engineering_mathematics',   count: 30 },
      { slug: 'chemistry',     label: 'Chemistry',      dbTable: 'engineering_chemistry',     count: 30 },
      { slug: 'intelligence',  label: 'Intelligence',   dbTable: 'engineering_intelligence',  count: 10 },
    ]
  },

  'lums-engineering': {
    name: 'LUMS LCAT Engineering',
    category: 'engineering',
    totalMCQs: 5215,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    pastPapersExam: 'GIKI_PIEAS',
    sections: [
      { slug: 'mathematics',   label: 'Mathematics',    dbTable: 'engineering_mathematics',      count: 40 },
      { slug: 'physics',       label: 'Physics',        dbTable: 'engineering_physics',          count: 30 },
      { slug: 'chemistry',     label: 'Chemistry',      dbTable: 'engineering_chemistry',        count: 20 },
      { slug: 'english',       label: 'English',        dbTable: 'engineering_english',          count: 15 },
      { slug: 'intelligence',  label: 'Intelligence',   dbTable: 'engineering_intelligence',     count: 15 },
    ]
  },

  // ============================================================
  // ENGINEERING — Secondary Exams (mock tests only)
  // ============================================================

  'nust': {
    name: 'NUST Entry Test',
    category: 'engineering',
    totalMCQs: 5647,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    mockOnly: true,
    sourceExam: 'net-engineering',
    sourceExamLabel: 'NET',
    sections: [
      { slug: 'physics',          label: 'Physics',         dbTable: 'engineering_physics',          count: 30 },
      { slug: 'mathematics',      label: 'Mathematics',      dbTable: 'engineering_mathematics',      count: 30 },
      { slug: 'chemistry',        label: 'Chemistry',        dbTable: 'engineering_chemistry',        count: 30 },
      { slug: 'computer-science', label: 'Computer Science', dbTable: 'engineering_computer_science', count: 10 },
    ]
  },

  'comsats-engineering': {
    name: 'COMSATS Entry Test',
    category: 'engineering',
    totalMCQs: 5109,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    mockOnly: true,
    sourceExam: 'ecat',
    sourceExamLabel: 'ECAT',
    sections: [
      { slug: 'mathematics',   label: 'Mathematics',  dbTable: 'engineering_mathematics',      count: 30 },
      { slug: 'physics',       label: 'Physics',      dbTable: 'engineering_physics',          count: 20 },
      { slug: 'chemistry',     label: 'Chemistry',    dbTable: 'engineering_chemistry',        count: 20 },
      { slug: 'english',       label: 'English',      dbTable: 'engineering_english',          count: 15 },
      { slug: 'intelligence',  label: 'Intelligence', dbTable: 'engineering_intelligence',     count: 15 },
    ]
  },

  'fast-nuces': {
    name: 'FAST-NUCES Entry Test',
    category: 'engineering',
    totalMCQs: 2344,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    mockOnly: true,
    sourceExam: 'lums-engineering',
    sourceExamLabel: 'LUMS LCAT',
    sections: [
      { slug: 'mathematics',   label: 'Mathematics',  dbTable: 'engineering_mathematics',  count: 40 },
      { slug: 'english',       label: 'English',      dbTable: 'engineering_english',      count: 30 },
      { slug: 'intelligence',  label: 'Intelligence', dbTable: 'engineering_intelligence', count: 30 },
    ]
  },

  'paf-initial': {
    name: 'PAF Initial Test',
    category: 'engineering',
    totalMCQs: 4255,
    duration: 60,
    passingPercentage: 50,
    negativeMarking: false,
    mockOnly: true,
    sourceExam: 'net-engineering',
    sourceExamLabel: 'NET',
    sections: [
      { slug: 'physics',       label: 'Physics',      dbTable: 'engineering_physics',      count: 20 },
      { slug: 'mathematics',   label: 'Mathematics',  dbTable: 'engineering_mathematics',  count: 20 },
      { slug: 'english',       label: 'English',      dbTable: 'engineering_english',      count: 20 },
      { slug: 'intelligence',  label: 'Intelligence', dbTable: 'engineering_intelligence', count: 20 },
    ]
  },

  'pma-long-course': {
    name: 'PMA Long Course',
    category: 'engineering',
    totalMCQs: 2344,
    duration: 45,
    passingPercentage: 50,
    negativeMarking: false,
    mockOnly: true,
    sourceExam: 'lums-engineering',
    sourceExamLabel: 'LUMS LCAT',
    sections: [
      { slug: 'mathematics',   label: 'Mathematics',  dbTable: 'engineering_mathematics',  count: 20 },
      { slug: 'english',       label: 'English',      dbTable: 'engineering_english',      count: 20 },
      { slug: 'intelligence',  label: 'Intelligence', dbTable: 'engineering_intelligence', count: 20 },
    ]
  },

  'nts-nat-ie': {
    name: 'NTS NAT-IE (Engineering Track)',
    category: 'engineering',
    totalMCQs: 5109,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    mockOnly: true,
    sourceExam: 'ecat',
    sourceExamLabel: 'ECAT',
    sections: [
      { slug: 'physics',     label: 'Physics',     dbTable: 'engineering_physics',     count: 30 },
      { slug: 'mathematics', label: 'Mathematics',  dbTable: 'engineering_mathematics', count: 30 },
      { slug: 'chemistry',   label: 'Chemistry',   dbTable: 'engineering_chemistry',   count: 30 },
      { slug: 'english',     label: 'English',     dbTable: 'engineering_english',     count: 10 },
    ]
  },

  'muet': {
    name: 'MUET / Sukkur IBA Engineering',
    category: 'engineering',
    totalMCQs: 5109,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    mockOnly: true,
    sourceExam: 'ecat',
    sourceExamLabel: 'ECAT',
    sections: [
      { slug: 'physics',     label: 'Physics',     dbTable: 'engineering_physics',     count: 25 },
      { slug: 'mathematics', label: 'Mathematics',  dbTable: 'engineering_mathematics', count: 25 },
      { slug: 'chemistry',   label: 'Chemistry',   dbTable: 'engineering_chemistry',   count: 25 },
      { slug: 'english',     label: 'English',     dbTable: 'engineering_english',     count: 25 },
    ]
  },

  'air-university': {
    name: 'Air University Entry Test',
    category: 'engineering',
    totalMCQs: 5376,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    mockOnly: true,
    sourceExam: 'giki-pieas',
    sourceExamLabel: 'GIKI / PIEAS',
    sections: [
      { slug: 'mathematics',   label: 'Mathematics',  dbTable: 'engineering_mathematics',  count: 30 },
      { slug: 'physics',       label: 'Physics',      dbTable: 'engineering_physics',      count: 30 },
      { slug: 'chemistry',     label: 'Chemistry',    dbTable: 'engineering_chemistry',    count: 20 },
      { slug: 'english',       label: 'English',      dbTable: 'engineering_english',      count: 10 },
      { slug: 'intelligence',  label: 'Intelligence', dbTable: 'engineering_intelligence', count: 10 },
    ]
  },

  'nts-gat': {
    name: 'NTS GAT General',
    category: 'engineering',
    totalMCQs: 2344,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    mockOnly: true,
    sourceExam: 'lums-engineering',
    sourceExamLabel: 'LUMS LCAT',
    sections: [
      { slug: 'english',       label: 'English',      dbTable: 'engineering_english',      count: 40 },
      { slug: 'mathematics',   label: 'Mathematics',  dbTable: 'engineering_mathematics',  count: 40 },
      { slug: 'intelligence',  label: 'Intelligence', dbTable: 'engineering_intelligence', count: 20 },
    ]
  },

}

export type ExamSlug = keyof typeof EXAM_CONFIGS

export function getExamConfig(slug: string): ExamConfig | null {
  return EXAM_CONFIGS[slug] || null
}

export function getExamsByCategory(category: string): Array<{ slug: string; config: ExamConfig }> {
  return Object.entries(EXAM_CONFIGS)
    .filter(([_, config]) => config.category === category)
    .map(([slug, config]) => ({ slug, config }))
}

export function getAllCategories(): string[] {
  const categories = new Set(Object.values(EXAM_CONFIGS).map((c) => c.category))
  return Array.from(categories)
}
