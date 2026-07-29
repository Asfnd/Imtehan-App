import { plainText } from './plain-text'

export interface ExamSection {
  slug: string
  label: string
  dbTable: string
  count: number
  /** Tables without a `type` column (MDCAT, css_mcqs_enhanced slices, etc.) */
  noTypeFilter?: boolean
  /** Filter shared banks (e.g. css_mcqs_enhanced) by `subject` column */
  subjectField?: string
  /** Filter MDCAT banks by `subtopic` (e.g. generated USAT Quantitative) */
  subtopicField?: string
  /**
   * Prefer questions whose stem matches any of these needles (ILIKE).
   * Used for specialist slices (e.g. FIA Act) sitting inside a shared bank.
   */
  questionNeedles?: string[]
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
  // MEDICAL: MDCAT (Medical & Dental College Admission Test)
  // ============================================================

  /** Shared MDCAT section list  -  banks have no `type` column; use mixed/practice fetch. */
  ...(() => {
    const MDCAT_SECTIONS: ExamSection[] = [
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 68, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 54, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 54, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 18, noTypeFilter: true },
      { slug: 'logical-reasoning', label: 'Logical Reasoning', dbTable: 'mdcat_logical_reasoning', count: 16, noTypeFilter: true },
    ]
    const MDCAT_ETEA_SECTIONS: ExamSection[] = [
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 60, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 60, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 60, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 20, noTypeFilter: true },
    ]
    const MDCAT_NUMS_SECTIONS: ExamSection[] = [
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 60, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 38, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 37, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 15, noTypeFilter: true },
    ]
    const MDCAT_AKU_SECTIONS: ExamSection[] = [
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 20, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 20, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 20, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 20, noTypeFilter: true },
      { slug: 'logical-reasoning', label: 'Logical Reasoning', dbTable: 'mdcat_logical_reasoning', count: 20, noTypeFilter: true },
    ]
    return {
  'mdcat': {
    name: 'MDCAT (Medical & Dental)',
    category: 'medical',
    totalMCQs: 18962,
    duration: 180,
    passingPercentage: 65,
    negativeMarking: false,
    sections: MDCAT_SECTIONS,
    guide: {
      authority: 'Pakistan Medical Commission (PMC)',
      officialLink: 'https://pmc.gov.pk/',
      eligibility: ['FSc Pre-Medical or equivalent with minimum 60% marks (varies by province).'],
      important: ['National MDCAT is the gateway to MBBS/BDS in public and private medical colleges across Pakistan.'],
      helpful: ['Practice Biology and Chemistry heavily  -  together they carry ~65% of the paper.'],
    },
  },

  'mdcat-pmc': {
    name: 'PMC National MDCAT',
    category: 'medical',
    totalMCQs: 180,
    duration: 180,
    passingPercentage: 65,
    negativeMarking: false,
    sections: MDCAT_SECTIONS,
    guide: {
      authority: 'Pakistan Medical Commission (PMC)',
      officialLink: 'https://pmc.gov.pk/',
      eligibility: ['Open to all provinces  -  UHS, SZABMU, SIBA, BUMHS and other provincial bodies use PMC pattern.'],
      important: ['180 MCQs: Biology 81, Chemistry 45, Physics 36, English 9, Logical Reasoning 9.'],
      helpful: ['Use full mocks under /mdcat/mock/pmc for timed simulation.'],
    },
  },

  'mdcat-uhs': {
    name: 'UHS Punjab MDCAT',
    category: 'medical',
    totalMCQs: 180,
    duration: 180,
    passingPercentage: 65,
    negativeMarking: false,
    sections: MDCAT_SECTIONS,
    guide: {
      authority: 'University of Health Sciences (UHS), Lahore',
      officialLink: 'https://www.uhs.edu.pk/',
      eligibility: ['Punjab domicile or as per latest UHS admission policy.'],
      important: ['Follows PMC national pattern with provincial merit aggregation.'],
      helpful: ['Largest pre-med cohort in Pakistan  -  start early with Biology high-yield topics.'],
    },
  },

  'mdcat-etea': {
    name: 'ETEA / KMU MDCAT (KPK)',
    category: 'medical',
    totalMCQs: 200,
    duration: 150,
    passingPercentage: 60,
    negativeMarking: true,
    sections: MDCAT_ETEA_SECTIONS,
    guide: {
      authority: 'Educational Testing & Evaluation Agency (ETEA), KPK',
      officialLink: 'https://www.etea.edu.pk/',
      eligibility: ['KPK domicile or as per KMU/ETEA advertisement.'],
      important: ['200 MCQs with negative marking  -  accuracy matters more than speed.'],
      helpful: ['Equal weight on Bio, Chem, Physics (60 each)  -  no logical reasoning section.'],
    },
  },

  'mdcat-nums': {
    name: 'NUMS MDCAT (Military Medical)',
    category: 'medical',
    totalMCQs: 150,
    duration: 165,
    passingPercentage: 55,
    negativeMarking: false,
    sections: MDCAT_NUMS_SECTIONS,
    guide: {
      authority: 'National University of Medical Sciences (NUMS)',
      officialLink: 'https://www.numspak.edu.pk/',
      eligibility: ['FSc Pre-Medical; separate criteria for Army Medical College and affiliated institutes.'],
      important: ['150 MCQs focused on core sciences  -  competitive cutoff for military medical colleges.'],
      helpful: ['Strong Chemistry and Biology performance is essential for NUMS merit.'],
    },
  },

  'mdcat-aku': {
    name: 'AKU Entry Test',
    category: 'medical',
    totalMCQs: 100,
    duration: 135,
    passingPercentage: 70,
    negativeMarking: false,
    sections: MDCAT_AKU_SECTIONS,
    guide: {
      authority: 'Aga Khan University (AKU), Karachi',
      officialLink: 'https://www.aku.edu/',
      eligibility: ['FSc Pre-Medical with high academic standing; AKU-specific admission criteria.'],
      important: ['Balanced 20 MCQs per section including Logical Reasoning  -  highly competitive private medical entry.'],
      helpful: ['English and LR sections distinguish top AKU candidates  -  do not neglect them.'],
    },
  },
    } as Record<string, ExamConfig>
  })(),

  'fsc-pre-medical': {
    name: 'FSc Pre-Medical',
    category: 'medical',
    totalMCQs: 18962,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 68, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 54, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 54, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 18, noTypeFilter: true },
    ],
    guide: {
      authority: 'Board of Intermediate & Secondary Education (BISE)',
      officialLink: 'https://www.fbiise.edu.pk/',
      eligibility: ['Matric Science or equivalent; first year of the two-year FSc Pre-Medical programme.'],
      important: ['Board exams and MDCAT prep both draw from the same FSc syllabus. Build chapter-wise strength in Bio and Chem early.'],
      helpful: ['Use this module for inter-year revision before PMC MDCAT or NUMS entry tests.'],
    },
  },

  'fsc-pre-engineering': {
    name: 'FSc Pre-Engineering',
    category: 'engineering',
    totalMCQs: 5109,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'physics', label: 'Physics', dbTable: 'engineering_physics', count: 30 },
      { slug: 'mathematics', label: 'Mathematics', dbTable: 'engineering_mathematics', count: 30 },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'engineering_chemistry', count: 30 },
      { slug: 'english', label: 'English', dbTable: 'engineering_english', count: 10 },
    ],
    guide: {
      authority: 'Board of Intermediate & Secondary Education (BISE)',
      eligibility: ['Matric Science; first or second year FSc Pre-Engineering.'],
      important: ['Physics and Mathematics carry the most weight in ECAT, NET, and NED entry tests.'],
      helpful: ['Pair this with NAT-IE practice when applying to NTS-affiliated engineering universities.'],
    },
  },

  'hec-lat': {
    name: 'HEC Law Admission Test (LAT)',
    category: 'hec',
    totalMCQs: 10000,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english', label: 'English', dbTable: 'english', count: 40 },
      { slug: 'general-knowledge', label: 'General Knowledge', dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs', label: 'Pakistan Studies', dbTable: 'pakistan_studies', count: 20 },
      { slug: 'mathematics', label: 'Mathematics', dbTable: 'general_math', count: 20 },
      { slug: 'islamic-studies', label: 'Islamic Studies', dbTable: 'islamiat', count: 20 },
    ],
    guide: {
      authority: 'Higher Education Commission (HEC), Pakistan',
      officialLink: 'https://etc.hec.gov.pk/',
      eligibility: ['Intermediate or equivalent for admission to 5-year LLB programmes at HEC-recognised law colleges.'],
      important: ['LAT is mandatory for most public and private law schools. English and GK sections decide merit at top colleges.'],
      helpful: ['Read newspaper editorials daily. LAT essay and personal statement come after the MCQ test.'],
    },
  },

  'hec-usat-e': {
    name: 'HEC USAT-E (Pre-Engineering)',
    category: 'hec',
    totalMCQs: 5109,
    duration: 100,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'verbal-reasoning', label: 'Verbal Reasoning', dbTable: 'mdcat_english', count: 20, noTypeFilter: true },
      { slug: 'quantitative-reasoning', label: 'Quantitative Reasoning', dbTable: 'mdcat_logical_reasoning', count: 25, noTypeFilter: true, subtopicField: 'USAT Quantitative' },
      { slug: 'physics', label: 'Physics', dbTable: 'engineering_physics', count: 10 },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'engineering_chemistry', count: 10 },
      { slug: 'mathematics', label: 'Mathematics', dbTable: 'engineering_mathematics', count: 10 },
    ],
    guide: {
      authority: 'HEC Education Testing Council (ETC)',
      officialLink: 'https://etc.hec.gov.pk/',
      eligibility: ['FSc Pre-Engineering or equivalent for BS engineering and technology programmes.'],
      important: ['Part 1 has 75 MCQs in 100 minutes. Part 2 is a 25-mark essay (not covered in MCQ practice).'],
      helpful: ['Master mental math and algebra speed. Verbal analogies and sentence completion appear every paper.'],
    },
  },

  'hec-usat-m': {
    name: 'HEC USAT-M (Pre-Medical)',
    category: 'hec',
    totalMCQs: 18962,
    duration: 100,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'verbal-reasoning', label: 'Verbal Reasoning', dbTable: 'mdcat_english', count: 20, noTypeFilter: true },
      { slug: 'quantitative-reasoning', label: 'Quantitative Reasoning', dbTable: 'mdcat_logical_reasoning', count: 25, noTypeFilter: true, subtopicField: 'USAT Quantitative' },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 8, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 8, noTypeFilter: true },
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 14, noTypeFilter: true },
    ],
    guide: {
      authority: 'HEC Education Testing Council (ETC)',
      officialLink: 'https://etc.hec.gov.pk/',
      eligibility: ['FSc Pre-Medical or equivalent for BS medical and allied health programmes.'],
      important: ['Biology carries the highest subject weight in USAT-M alongside shared verbal and quant sections.'],
      helpful: ['Pair with MDCAT biology drills. Quantitative section rewards quick arithmetic and basic statistics.'],
    },
  },

  'hec-usat-cs': {
    name: 'HEC USAT-CS (Computer Science)',
    category: 'hec',
    totalMCQs: 5109,
    duration: 100,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'verbal-reasoning', label: 'Verbal Reasoning', dbTable: 'mdcat_english', count: 20, noTypeFilter: true },
      { slug: 'quantitative-reasoning', label: 'Quantitative Reasoning', dbTable: 'mdcat_logical_reasoning', count: 25, noTypeFilter: true, subtopicField: 'USAT Quantitative' },
      { slug: 'computer-science', label: 'Computer Science', dbTable: 'engineering_computer_science', count: 15 },
      { slug: 'mathematics', label: 'Mathematics', dbTable: 'engineering_mathematics', count: 10 },
      { slug: 'physics', label: 'Physics', dbTable: 'engineering_physics', count: 5 },
    ],
    guide: {
      authority: 'HEC Education Testing Council (ETC)',
      officialLink: 'https://etc.hec.gov.pk/',
      eligibility: ['FSc Pre-Engineering / ICS or equivalent for BS Computer Science and IT programmes.'],
      important: ['CS and mathematics together form the core subject block after shared reasoning sections.'],
      helpful: ['Review logic gates, number systems, and basic programming concepts alongside NET CS practice.'],
    },
  },

  'hec-usat-gs': {
    name: 'HEC USAT-GS (General Science)',
    category: 'hec',
    totalMCQs: 10000,
    duration: 100,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'verbal-reasoning', label: 'Verbal Reasoning', dbTable: 'mdcat_english', count: 20, noTypeFilter: true },
      { slug: 'quantitative-reasoning', label: 'Quantitative Reasoning', dbTable: 'mdcat_logical_reasoning', count: 25, noTypeFilter: true, subtopicField: 'USAT Quantitative' },
      { slug: 'everyday-science', label: 'Everyday Science', dbTable: 'everyday_science', count: 15 },
      { slug: 'general-knowledge', label: 'General Knowledge', dbTable: 'general_knowledge', count: 10 },
      { slug: 'english', label: 'English', dbTable: 'english', count: 5 },
    ],
    guide: {
      authority: 'HEC Education Testing Council (ETC)',
      officialLink: 'https://etc.hec.gov.pk/',
      eligibility: ['Intermediate General Science or equivalent for broad BS science programmes.'],
      important: ['Shared USAT verbal and quant sections apply to all categories. Science GK bridges FSc concepts.'],
      helpful: ['Use everyday science and general knowledge banks for the subject-specific block.'],
    },
  },

  'hec-usat-a': {
    name: 'HEC USAT-A (Arts & Humanities)',
    category: 'hec',
    totalMCQs: 10000,
    duration: 100,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'verbal-reasoning', label: 'Verbal Reasoning', dbTable: 'mdcat_english', count: 20, noTypeFilter: true },
      { slug: 'quantitative-reasoning', label: 'Quantitative Reasoning', dbTable: 'mdcat_logical_reasoning', count: 25, noTypeFilter: true, subtopicField: 'USAT Quantitative' },
      { slug: 'english', label: 'English', dbTable: 'english', count: 15 },
      { slug: 'general-knowledge', label: 'General Knowledge', dbTable: 'general_knowledge', count: 10 },
      { slug: 'pakistan-affairs', label: 'Pakistan Studies', dbTable: 'pakistan_studies', count: 5 },
    ],
    guide: {
      authority: 'HEC Education Testing Council (ETC)',
      officialLink: 'https://etc.hec.gov.pk/',
      eligibility: ['Intermediate Arts / Humanities or equivalent for BA, BCom, and social science programmes.'],
      important: ['English vocabulary and Pakistan Studies facts appear alongside standard USAT reasoning sections.'],
      helpful: ['Build reading comprehension speed. Essay practice in Part 2 is separate from MCQ prep here.'],
    },
  },

  'hec-usat-com': {
    name: 'HEC USAT-COM (Commerce)',
    category: 'hec',
    totalMCQs: 10000,
    duration: 100,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'verbal-reasoning', label: 'Verbal Reasoning', dbTable: 'mdcat_english', count: 20, noTypeFilter: true },
      { slug: 'quantitative-reasoning', label: 'Quantitative Reasoning', dbTable: 'mdcat_logical_reasoning', count: 25, noTypeFilter: true, subtopicField: 'USAT Quantitative' },
      { slug: 'mathematics', label: 'Mathematics', dbTable: 'general_math', count: 15 },
      { slug: 'english', label: 'English', dbTable: 'english', count: 10 },
      { slug: 'general-knowledge', label: 'General Knowledge', dbTable: 'general_knowledge', count: 5 },
    ],
    guide: {
      authority: 'HEC Education Testing Council (ETC)',
      officialLink: 'https://etc.hec.gov.pk/',
      eligibility: ['Intermediate Commerce or equivalent for BCom, BBA, and related programmes.'],
      important: ['Quantitative reasoning is heavily weighted. Mental math and percentages are high-yield topics.'],
      helpful: ['Practice arithmetic, ratios, and basic statistics under timed conditions.'],
    },
  },

  'hec-hat-1': {
    name: 'HEC HAT-1 (Engineering / IT / Math / Physics)',
    category: 'hec',
    totalMCQs: 2344,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english', label: 'English / Verbal', dbTable: 'engineering_english', count: 30 },
      { slug: 'analytical-reasoning', label: 'Analytical Reasoning', dbTable: 'mdcat_logical_reasoning', count: 30, noTypeFilter: true, subtopicField: 'HAT Analytical' },
      { slug: 'quantitative-reasoning', label: 'Quantitative Reasoning', dbTable: 'engineering_mathematics', count: 40 },
    ],
    guide: {
      authority: 'HEC Education Testing Council (ETC)',
      officialLink: 'https://etc.hec.gov.pk/',
      eligibility: ['16 years education in Engineering, IT, Mathematics, Statistics, or Physics for MS/MPhil/PhD and scholarships.'],
      important: ['100 MCQs in 120 minutes. Quantitative section carries 40% for HAT-1 applicants.'],
      helpful: ['Score valid for two years for HEC scholarships and postgraduate admissions.'],
    },
  },

  'hec-hat-2': {
    name: 'HEC HAT-2 (Management / Business)',
    category: 'hec',
    totalMCQs: 2344,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english', label: 'English / Verbal', dbTable: 'engineering_english', count: 30 },
      { slug: 'analytical-reasoning', label: 'Analytical Reasoning', dbTable: 'mdcat_logical_reasoning', count: 40, noTypeFilter: true, subtopicField: 'HAT Analytical' },
      { slug: 'quantitative-reasoning', label: 'Quantitative Reasoning', dbTable: 'mdcat_logical_reasoning', count: 30, noTypeFilter: true, subtopicField: 'USAT Quantitative' },
    ],
    guide: {
      authority: 'HEC Education Testing Council (ETC)',
      officialLink: 'https://etc.hec.gov.pk/',
      eligibility: ['16 years in Management Sciences or Business Education for MS/MPhil/PhD programmes.'],
      important: ['Analytical reasoning is the highest-weight section at 40% for HAT-2.'],
      helpful: ['Practice syllogisms, data interpretation, and business arithmetic scenarios.'],
    },
  },

  'hec-hat-3': {
    name: 'HEC HAT-3 (Arts / Social Sciences / Law / Psychology)',
    category: 'hec',
    totalMCQs: 10000,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english', label: 'English / Verbal', dbTable: 'english', count: 40 },
      { slug: 'analytical-reasoning', label: 'Analytical Reasoning', dbTable: 'mdcat_logical_reasoning', count: 35, noTypeFilter: true, subtopicField: 'HAT Analytical' },
      { slug: 'quantitative-reasoning', label: 'Quantitative Reasoning', dbTable: 'mdcat_logical_reasoning', count: 25, noTypeFilter: true, subtopicField: 'USAT Quantitative' },
    ],
    guide: {
      authority: 'HEC Education Testing Council (ETC)',
      officialLink: 'https://etc.hec.gov.pk/',
      eligibility: ['16 years in Arts, Humanities, Social Sciences, Psychology, or Law for postgraduate study.'],
      important: ['English carries 40% weight. Strong vocabulary and reading comprehension are essential.'],
      helpful: ['Select HAT-3 when applying for humanities, social science, or psychology scholarships.'],
    },
  },

  'hec-hat-4': {
    name: 'HEC HAT-4 (Biological / Medical / Physical Sciences)',
    category: 'hec',
    totalMCQs: 18962,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english', label: 'English / Verbal', dbTable: 'mdcat_english', count: 40, noTypeFilter: true },
      { slug: 'analytical-reasoning', label: 'Analytical Reasoning', dbTable: 'mdcat_logical_reasoning', count: 30, noTypeFilter: true, subtopicField: 'HAT Analytical' },
      { slug: 'quantitative-reasoning', label: 'Quantitative Reasoning', dbTable: 'mdcat_logical_reasoning', count: 30, noTypeFilter: true, subtopicField: 'USAT Quantitative' },
    ],
    guide: {
      authority: 'HEC Education Testing Council (ETC)',
      officialLink: 'https://etc.hec.gov.pk/',
      eligibility: ['16 years in Agriculture, Veterinary, Biological, Medical, Physical Sciences, Education, or Media for MS/MPhil/PhD.'],
      important: ['Balanced split across English, analytical, and quantitative sections for science graduates.'],
      helpful: ['Also used for education and media studies postgraduate admissions under ETC.'],
    },
  },

  'hec-hat-general': {
    name: 'HEC HAT-General (Religious Studies)',
    category: 'hec',
    totalMCQs: 10000,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english', label: 'English / Verbal', dbTable: 'english', count: 40 },
      { slug: 'analytical-reasoning', label: 'Analytical Reasoning', dbTable: 'mdcat_logical_reasoning', count: 30, noTypeFilter: true, subtopicField: 'HAT Analytical' },
      { slug: 'islamic-studies', label: 'Islamic Studies', dbTable: 'islamiat', count: 15 },
      { slug: 'quantitative-reasoning', label: 'Quantitative Reasoning', dbTable: 'mdcat_logical_reasoning', count: 15, noTypeFilter: true, subtopicField: 'USAT Quantitative' },
    ],
    guide: {
      authority: 'HEC Education Testing Council (ETC)',
      officialLink: 'https://etc.hec.gov.pk/',
      eligibility: ['Madrasa graduates and religious studies degree holders seeking equivalence and postgraduate admission.'],
      important: ['Designed for SEE-LAW and religious education streams requiring standardized aptitude testing.'],
      helpful: ['Islamic studies knowledge supplements the shared HAT verbal and analytical sections.'],
    },
  },

  'hec-law-gat': {
    name: 'HEC Law Graduate Assessment Test (Law-GAT)',
    category: 'hec',
    totalMCQs: 800,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    // Official HEC/PBC Law-GAT: 100 MCQs, 50% pass, six syllabus divisions.
    sections: [
      {
        slug: 'constitution',
        label: 'Constitution',
        dbTable: 'css_mcqs_enhanced',
        subjectField: 'Constitutional Law',
        count: 20,
        noTypeFilter: true,
      },
      {
        slug: 'jurisprudence',
        label: 'Jurisprudence',
        dbTable: 'css_mcqs_enhanced',
        subjectField: 'Muslim Law and Jurisprudence',
        count: 10,
        noTypeFilter: true,
      },
      {
        slug: 'civil-procedure',
        label: 'Civil Procedure Code',
        dbTable: 'css_mcqs_enhanced',
        subjectField: 'Law',
        count: 20,
        noTypeFilter: true,
        questionNeedles: [
          'Civil Procedure',
          'CPC',
          'Code of Civil Procedure',
          'plaint',
          'written statement',
          'res judicata',
          'Order VII',
          'Order IX',
          'temporary injunction',
          'first appeal',
          'revision under',
          'Section 115',
          'Section 151',
        ],
      },
      {
        slug: 'criminal-law',
        label: 'Criminal Law',
        dbTable: 'css_mcqs_enhanced',
        subjectField: 'Law',
        count: 20,
        noTypeFilter: true,
        questionNeedles: [
          'PPC',
          'Penal Code',
          'Cr.P.C',
          'CrPC',
          'Criminal Procedure',
          'culpable homicide',
          'kidnapping',
          'cognizable',
          'FIR',
          'bail',
          'arrest',
          'mens rea',
          'actus reus',
          'wrongful confinement',
          'theft under',
          'extortion',
        ],
      },
      {
        slug: 'law-of-evidence',
        label: 'Law of Evidence',
        dbTable: 'css_mcqs_enhanced',
        subjectField: 'Law',
        count: 20,
        noTypeFilter: true,
        questionNeedles: [
          'Qanun-e-Shahadat',
          'Qanoon-e-Shahadat',
          'Qanun e Shahadat',
          'law of evidence',
          'Law of Evidence',
          'hearsay',
          'competent to testify',
          'Evidence recorded',
          'primary evidence',
          'secondary evidence',
          'burden of proof',
          'estoppel',
          'confession',
          'dying declaration',
        ],
      },
      {
        slug: 'professional-ethics',
        label: 'Professional Ethics',
        dbTable: 'css_mcqs_enhanced',
        subjectField: 'Law',
        count: 10,
        noTypeFilter: true,
        questionNeedles: [
          'Professional Ethics',
          'professional conduct',
          'Bar Council',
          'advocate',
          'canons of',
          'Legal Practitioners',
          'client confidentiality',
          'conflict of interest',
          'vakalatnama',
          'tout',
        ],
      },
    ],
    guide: {
      authority: 'Higher Education Commission (HEC) / Pakistan Bar Council',
      officialLink: 'https://etc.hec.gov.pk/',
      eligibility: ['LLB graduates seeking enrollment with a Provincial/Pakistan Bar Council as advocates.'],
      important: [
        'Official Law-GAT: 100 MCQs — Constitution 20, Jurisprudence 10, CPC 20, Criminal Law 20, Law of Evidence 20, Professional Ethics 10.',
        'Passing mark is 50%. No negative marking. Mandatory for bar enrollment after LLB.',
      ],
      helpful: [
        'Drill each official division separately, then attempt full 100-question mocks under 120 minutes.',
        'Focus constitutional landmark cases, Qanun-e-Shahadat, CPC Orders 1/6–9/39/41/43, and PPC/CrPC chapters listed in the HEC curriculum.',
      ],
    },
  },

  'hec-see-law': {
    name: 'HEC Special Equivalence Examination (SEE-LAW)',
    category: 'hec',
    totalMCQs: 10000,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english', label: 'English', dbTable: 'english', count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge', dbTable: 'general_knowledge', count: 25 },
      { slug: 'islamic-studies', label: 'Islamic Studies', dbTable: 'islamiat', count: 25 },
      { slug: 'law', label: 'Law Basics', dbTable: 'css_mcqs_enhanced', subjectField: 'Law', count: 20 },
    ],
    guide: {
      authority: 'Higher Education Commission (HEC), Pakistan',
      officialLink: 'https://etc.hec.gov.pk/',
      eligibility: ['Candidates with foreign law degrees or non-standard qualifications seeking equivalence in Pakistan.'],
      important: ['Required for recognition of certain foreign LLB qualifications before bar enrollment.'],
      helpful: ['Combine with Law-GAT prep if you plan to practice law in Pakistan after equivalence.'],
    },
  },

  'uet-lahore': {
    name: 'UET Lahore ECAT',
    category: 'engineering',
    totalMCQs: 5109,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    pastPapersExam: 'ECAT',
    sections: [
      { slug: 'physics', label: 'Physics', dbTable: 'engineering_physics', count: 30 },
      { slug: 'mathematics', label: 'Mathematics', dbTable: 'engineering_mathematics', count: 30 },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'engineering_chemistry', count: 30 },
      { slug: 'english', label: 'English', dbTable: 'engineering_english', count: 10 },
    ],
    guide: {
      authority: 'University of Engineering & Technology (UET), Lahore',
      officialLink: 'https://www.uet.edu.pk/admission/admission.aspx',
      eligibility: ['FSc Pre-Engineering or equivalent with Mathematics, Physics, and Chemistry.'],
      important: ['UET Lahore conducts the Punjab ECAT used by most public engineering colleges in Punjab.'],
      helpful: ['Same syllabus as generic ECAT practice. Math and physics merit cutoffs are highest at UET Lahore.'],
    },
  },

  'bahria-university': {
    name: 'Bahria University Entry Test',
    category: 'engineering',
    totalMCQs: 5109,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'mathematics', label: 'Mathematics', dbTable: 'engineering_mathematics', count: 30 },
      { slug: 'physics', label: 'Physics', dbTable: 'engineering_physics', count: 25 },
      { slug: 'english', label: 'English', dbTable: 'engineering_english', count: 20 },
      { slug: 'intelligence', label: 'Intelligence', dbTable: 'engineering_intelligence', count: 15 },
      { slug: 'computer-science', label: 'Computer Science', dbTable: 'engineering_computer_science', count: 10 },
    ],
    guide: {
      authority: 'Bahria University, Islamabad / Karachi / Lahore',
      officialLink: 'https://www.bahria.edu.pk/',
      eligibility: ['FSc Pre-Engineering / ICS for BS Engineering and CS programmes at Bahria campuses.'],
      important: ['Bahria entry tests combine FSc science with analytical and English sections.'],
      helpful: ['Practice NET and ECAT timed sets first, then Bahria-specific mock papers.'],
    },
  },

  'king-edward-medical': {
    name: 'King Edward Medical University Entry Test',
    category: 'medical',
    totalMCQs: 18962,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 40, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 30, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 20, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 10, noTypeFilter: true },
    ],
    guide: {
      authority: 'King Edward Medical University (KEMU), Lahore',
      officialLink: 'https://www.kemu.edu.pk/',
      eligibility: ['FSc Pre-Medical or equivalent. MBBS merit combines provincial MDCAT with institutional criteria.'],
      important: ['One of Pakistan\'s oldest medical universities. Biology and chemistry weightage is highest.'],
      helpful: ['Practice national MDCAT and UHS Punjab papers before KEMU-specific mocks.'],
    },
  },

  'jsmu-karachi': {
    name: 'JSMU Karachi Entry Test',
    category: 'medical',
    totalMCQs: 18962,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 40, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 35, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 15, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 10, noTypeFilter: true },
    ],
    guide: {
      authority: 'Jinnah Sindh Medical University (JSMU), Karachi',
      officialLink: 'https://www.jsmu.edu.pk/',
      eligibility: ['FSc Pre-Medical or equivalent for MBBS/BDS at JSMU and affiliated medical colleges.'],
      important: ['Sindh provincial medical admissions often require institutional entry tests alongside MDCAT scores.'],
      helpful: ['Combine with Dow and Sindh MDCAT practice for Karachi medical college prep.'],
    },
  },

  'amc-entry': {
    name: 'Army Medical College (AMC) Entry Test',
    category: 'medical',
    totalMCQs: 18962,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 40, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 35, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 15, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 10, noTypeFilter: true },
    ],
    guide: {
      authority: 'Army Medical College / NUMS, Rawalpindi',
      officialLink: 'https://www.numspak.edu.pk/',
      eligibility: ['FSc Pre-Medical. AMC admits on NUMS merit and institutional criteria for military medical training.'],
      important: ['AMC follows NUMS-style weightage with strong biology and chemistry emphasis.'],
      helpful: ['Practice NUMS MDCAT and ISSB academic sections alongside AMC-specific mocks.'],
    },
  },

  'riphah-medical': {
    name: 'Riphah International University Medical Entry',
    category: 'medical',
    totalMCQs: 18962,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 40, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 30, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 20, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 10, noTypeFilter: true },
    ],
    guide: {
      authority: 'Riphah International University, Islamabad',
      officialLink: 'https://www.riphah.edu.pk/',
      eligibility: ['FSc Pre-Medical or equivalent for MBBS/BDS at Riphah medical colleges.'],
      important: ['Private medical university with MDCAT-style entry test pattern.'],
      helpful: ['Use national MDCAT timed practice before Riphah-specific mock exams.'],
    },
  },

  'ziauddin-medical': {
    name: 'Ziauddin University Medical Entry Test',
    category: 'medical',
    totalMCQs: 18962,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 40, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 30, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 20, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 10, noTypeFilter: true },
    ],
    guide: {
      authority: 'Ziauddin University, Karachi',
      officialLink: 'https://www.zu.edu.pk/',
      eligibility: ['FSc Pre-Medical or equivalent for MBBS/BDS at Ziauddin medical and dental colleges.'],
      important: ['Karachi private medical admissions combine MDCAT merit with university entry test scores.'],
      helpful: ['Practice alongside Dow and JSMU entry test prep for Sindh medical college applications.'],
    },
  },

  'qau-entry': {
    name: 'Quaid-i-Azam University Entry Test',
    category: 'nts',
    totalMCQs: 10000,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english', label: 'English', dbTable: 'english', count: 30 },
      { slug: 'general-knowledge', label: 'General Knowledge', dbTable: 'general_knowledge', count: 25 },
      { slug: 'mathematics', label: 'Mathematics', dbTable: 'general_math', count: 25 },
      { slug: 'pakistan-affairs', label: 'Pakistan Studies', dbTable: 'pakistan_studies', count: 10 },
      { slug: 'everyday-science', label: 'Everyday Science', dbTable: 'everyday_science', count: 10 },
    ],
    guide: {
      authority: 'Quaid-i-Azam University (QAU), Islamabad',
      officialLink: 'https://qau.edu.pk/',
      eligibility: ['Intermediate or equivalent for BS programmes at QAU faculties including natural and social sciences.'],
      important: ['QAU conducts faculty-specific entry tests for competitive undergraduate programmes.'],
      helpful: ['Strong GK and English sections mirror NAT-IGS style papers.'],
    },
  },

  'iba-karachi': {
    name: 'IBA Karachi Aptitude Test',
    category: 'banks',
    totalMCQs: 2344,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english', label: 'English', dbTable: 'engineering_english', count: 35 },
      { slug: 'mathematics', label: 'Mathematics', dbTable: 'general_math', count: 35 },
      { slug: 'analytical-reasoning', label: 'Analytical Reasoning', dbTable: 'mdcat_logical_reasoning', count: 30, noTypeFilter: true },
    ],
    guide: {
      authority: 'Institute of Business Administration (IBA), Karachi',
      officialLink: 'https://www.iba.edu.pk/',
      eligibility: ['Intermediate or A-Levels for BBA, BS Economics, and CS programmes at IBA Karachi.'],
      important: ['Highly competitive aptitude test with strong English and quantitative reasoning emphasis.'],
      helpful: ['Practice analytical reasoning and mental math daily. IBA cutoffs are among the highest in Pakistan.'],
    },
  },

  'pharm-d-entry': {
    name: 'Pharm-D Entry Test (D Pharmacy)',
    category: 'medical',
    totalMCQs: 18962,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 50, noTypeFilter: true },
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 40, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 30, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 20, noTypeFilter: true },
    ],
    guide: {
      authority: 'Pharmacy Council of Pakistan / university admission cells',
      officialLink: 'https://www.pharmacycouncil.org.pk/',
      eligibility: ['FSc Pre-Medical or equivalent with Chemistry and Biology. Some universities accept Pre-Engineering with biology as additional subject.'],
      important: ['Chemistry carries the highest weight in most Pharm-D entry tests. Organic and biochemistry chapters appear repeatedly.'],
      helpful: ['Pair this with FSc Pre-Medical revision before university-specific entry tests.'],
    },
  },

  'bsn-nursing-entry': {
    name: 'BSN Nursing Entry Test',
    category: 'medical',
    totalMCQs: 18962,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'biology', label: 'Biology & Anatomy Basics', dbTable: 'mdcat_biology', count: 45, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 25, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 15, noTypeFilter: true },
      { slug: 'nursing-science', label: 'Health & Nursing Science', dbTable: 'everyday_science', count: 15 },
    ],
    guide: {
      authority: 'College of Nursing / university admission authority',
      eligibility: ['FSc Pre-Medical or nursing diploma as per institution advertisement. Age and domicile rules vary by province.'],
      important: ['Biology and basic health sciences dominate BSN entry papers at public colleges in Punjab, Sindh, and KPK.'],
      helpful: ['Revise human physiology and microbiology from FSc Biology before timed practice sets.'],
    },
  },

  'dpt-entry': {
    name: 'DPT Entry Test (Physiotherapy)',
    category: 'medical',
    totalMCQs: 18962,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'biology', label: 'Biology & Human Anatomy', dbTable: 'mdcat_biology', count: 45, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 30, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 25, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 15, noTypeFilter: true },
    ],
    guide: {
      authority: 'University / college of physiotherapy admission cell',
      officialLink: 'https://www.hpec.org.pk/',
      eligibility: ['FSc Pre-Medical or equivalent with Biology, Chemistry, and Physics. Some institutes accept A-level science combinations.'],
      important: ['Biology and anatomy basics carry the highest weight in most DPT entry tests across Punjab and Sindh universities.'],
      helpful: ['Pair with MDCAT biology revision. Focus on muscles, joints, and nervous system chapters.'],
    },
  },

  'bds-entry': {
    name: 'BDS Dental Entry Test',
    category: 'medical',
    totalMCQs: 18962,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 45, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 40, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 25, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 15, noTypeFilter: true },
    ],
    guide: {
      authority: 'Pakistan Medical Commission / dental college admission authority',
      officialLink: 'https://pmc.gov.pk/',
      eligibility: ['FSc Pre-Medical or equivalent. BDS admissions follow MDCAT merit at most public dental colleges.'],
      important: ['Biology and Chemistry together form most of the paper. Organic chemistry and cell biology repeat often.'],
      helpful: ['Use national MDCAT practice sets first, then drill university-specific dental college mock tests.'],
    },
  },

  'dow-entry': {
    name: 'Dow University MDCAT / Entry Test',
    category: 'medical',
    totalMCQs: 18962,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 45, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 35, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 25, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 15, noTypeFilter: true },
    ],
    guide: {
      authority: 'Dow University of Health Sciences (DUHS), Karachi',
      officialLink: 'https://www.duhs.edu.pk/',
      eligibility: ['FSc Pre-Medical or equivalent. Sindh domicile and provincial quota rules apply to public seats.'],
      important: ['DUHS MBBS/BDS merit combines provincial MDCAT scores with institutional criteria. Biology weightage is highest.'],
      helpful: ['Practice alongside Sindh MDCAT and national PMC paper patterns before Dow-specific timed mocks.'],
    },
  },

  'nust-net-medical': {
    name: 'NUST NET Medical / Biological Sciences',
    category: 'medical',
    totalMCQs: 18962,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 40, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 35, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 25, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 10, noTypeFilter: true },
    ],
    guide: {
      authority: 'National University of Sciences & Technology (NUST)',
      officialLink: 'https://www.nust.edu.pk/admissions',
      eligibility: ['FSc Pre-Medical or equivalent for BS Biological Sciences, Biotechnology, and allied programmes at NUST.'],
      important: ['NUST NET for medical-science tracks tests Biology and Chemistry heavily with analytical Physics questions.'],
      helpful: ['Combine with NET engineering practice only for shared English and analytical sections.'],
    },
  },

  'shifa-entry': {
    name: 'Shifa International Entry Test',
    category: 'medical',
    totalMCQs: 18962,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 45, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 35, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 25, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 15, noTypeFilter: true },
    ],
    guide: {
      authority: 'Shifa International Hospitals / Shifa Tameer-e-Millat University',
      officialLink: 'https://www.shifa.com.pk/',
      eligibility: ['FSc Pre-Medical or equivalent for MBBS/BDS programmes at Shifa-associated medical colleges.'],
      important: ['Shifa entry tests follow national MDCAT-style weightage with strong Biology and Chemistry emphasis.'],
      helpful: ['Practice national MDCAT timed sets first, then drill Shifa-specific mock papers.'],
    },
  },

  'cmh-lahore-entry': {
    name: 'CMH Lahore Medical & Dental Entry',
    category: 'medical',
    totalMCQs: 18962,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'biology', label: 'Biology', dbTable: 'mdcat_biology', count: 45, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 35, noTypeFilter: true },
      { slug: 'physics', label: 'Physics', dbTable: 'mdcat_physics', count: 25, noTypeFilter: true },
      { slug: 'english', label: 'English', dbTable: 'mdcat_english', count: 15, noTypeFilter: true },
    ],
    guide: {
      authority: 'Combined Military Hospital (CMH) Lahore Medical & Dental College',
      officialLink: 'https://www.cmh.edu.pk/',
      eligibility: ['FSc Pre-Medical or equivalent. CMH Lahore admits on merit via institutional entry test and MDCAT scores.'],
      important: ['Biology and Chemistry together form the bulk of CMH Lahore entry papers. Physics and English carry steady weight.'],
      helpful: ['Revise FSc Pre-Medical core chapters before attempting full-length CMH practice mocks.'],
    },
  },

  'ajk-educators': {
    name: 'AJK Educators Recruitment',
    category: 'provincial',
    totalMCQs: 10000,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge', dbTable: 'general_knowledge', count: 25 },
      { slug: 'english', label: 'English', dbTable: 'english', count: 25 },
      { slug: 'urdu', label: 'Urdu', dbTable: 'urdu', count: 20 },
      { slug: 'pakistan-affairs', label: 'Pakistan Affairs', dbTable: 'pakistan_studies', count: 15 },
      { slug: 'islamic-studies', label: 'Islamic Studies', dbTable: 'islamiat', count: 15 },
    ],
    guide: {
      authority: 'AJK Public Service Commission / School Education Department AJK',
      officialLink: 'https://www.ajkpsc.gov.pk/',
      eligibility: ['BA/B.Ed or MA as per PST, CT, and SST advertisements. AJK domicile required for most educator posts.'],
      important: ['AJK educator MCQs mirror Punjab/Sindh teacher tests with added focus on Kashmir and AJK geography.'],
      helpful: ['Pair with AJKPSC general recruitment practice for shared English and GK patterns.'],
    },
  },

  'tevta-skills-test': {
    name: 'TEVTA Punjab Skills Assessment',
    category: 'ots',
    totalMCQs: 10000,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge', dbTable: 'general_knowledge', count: 25 },
      { slug: 'english', label: 'English', dbTable: 'english', count: 25 },
      { slug: 'mathematics', label: 'Mathematics', dbTable: 'general_math', count: 20 },
      { slug: 'basic-computer', label: 'Basic Computer', dbTable: 'basic_computer', count: 15 },
      { slug: 'urdu', label: 'Urdu', dbTable: 'urdu', count: 15 },
    ],
    guide: {
      authority: 'Technical Education & Vocational Training Authority (TEVTA), Punjab',
      officialLink: 'https://www.tevta.gop.pk/',
      eligibility: ['Matric or intermediate as per trade/course advertisement. Domicile rules follow each batch.'],
      important: ['TEVTA assessments gate admission to diploma and certificate trades across Punjab.'],
      helpful: ['Revise basic arithmetic and computer literacy alongside trade theory from your FSc or matric syllabus.'],
    },
  },

  'icap-ca-foundation': {
    name: 'ICAP CA Foundation Entry',
    category: 'banks',
    totalMCQs: 10000,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english', label: 'English', dbTable: 'english', count: 30 },
      { slug: 'mathematics', label: 'Quantitative Techniques', dbTable: 'general_math', count: 30 },
      { slug: 'basic-computer', label: 'Business & IT Basics', dbTable: 'basic_computer', count: 20 },
      { slug: 'general-knowledge', label: 'Business Awareness', dbTable: 'general_knowledge', count: 20 },
    ],
    guide: {
      authority: 'Institute of Chartered Accountants of Pakistan (ICAP)',
      officialLink: 'https://www.icap.org.pk/',
      eligibility: ['Intermediate or A-Level with required marks as per ICAP registration rules.'],
      important: ['Foundation module MCQs test English, maths, and business awareness before CA professional stages.'],
      helpful: ['Pair with Accountancy optional CSS MCQs for overlapping commercial law and finance concepts.'],
    },
  },

  'kpk-educators-etea': {
    name: 'KPK Educators (ETEA)',
    category: 'etea',
    totalMCQs: 10000,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge', dbTable: 'general_knowledge', count: 25 },
      { slug: 'english', label: 'English', dbTable: 'english', count: 25 },
      { slug: 'pakistan-affairs', label: 'Pakistan Studies', dbTable: 'pakistan_studies', count: 20 },
      { slug: 'islamic-studies', label: 'Islamic Studies', dbTable: 'islamiat', count: 15 },
      { slug: 'mathematics', label: 'Mathematics', dbTable: 'general_math', count: 15 },
    ],
    guide: {
      authority: 'Educational Testing & Evaluation Agency (ETEA), KPK',
      officialLink: 'https://www.etea.edu.pk/',
      eligibility: ['BA/BSc or B.Ed as per KPK School Education Department advertisement.'],
      important: ['ETEA conducts primary and secondary teacher recruitment for KPK government schools.'],
      helpful: ['Compare with Punjab Educators hub but expect more KPK geography and history emphasis.'],
    },
  },

  'sindh-educators': {
    name: 'Sindh Educators Recruitment Hub',
    category: 'provincial',
    totalMCQs: 10000,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge', dbTable: 'general_knowledge', count: 25 },
      { slug: 'english', label: 'English', dbTable: 'english', count: 25 },
      { slug: 'urdu', label: 'Urdu', dbTable: 'urdu', count: 20 },
      { slug: 'pakistan-affairs', label: 'Pakistan Affairs', dbTable: 'pakistan_studies', count: 15 },
      { slug: 'mathematics', label: 'Mathematics', dbTable: 'general_math', count: 15 },
    ],
    guide: {
      authority: 'School Education & Literacy Department, Sindh / STS',
      officialLink: 'https://www.sts.net.pk/',
      eligibility: ['Intermediate or graduation as per JEST/PST/SST advertisement. Sindh domicile usually required.'],
      important: ['Unified practice for STS Sindh teacher posts including JEST, PST, and subject specialist screens.'],
      helpful: ['Also use STS Sindh JEST slug for JEST-specific weightage drills.'],
    },
  },

  'balochistan-educators': {
    name: 'Balochistan Educators Recruitment',
    category: 'provincial',
    totalMCQs: 10000,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge', dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 15 },
    ],
    guide: {
      authority: 'Balochistan Public Service Commission (BPSC) / School Education Department',
      officialLink: 'https://www.bpsc.gob.pk/',
      eligibility: ['BA/B.Ed or MA as per PST, CT, and SST advertisements. Balochistan domicile usually required.'],
      important: ['Balochistan educator tests follow the standard one-paper MCQ format with strong Urdu and Pakistan Studies weight.'],
      helpful: ['Review Balochistan geography, tribes, and provincial education policy for GK sections.'],
    },
  },

  'gb-educators': {
    name: 'Gilgit-Baltistan Educators Recruitment',
    category: 'provincial',
    totalMCQs: 10000,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge', dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ],
    guide: {
      authority: 'Gilgit-Baltistan Public Service Commission (GBPSC) / Education Department GB',
      officialLink: 'https://gbpsc.gob.pk/',
      eligibility: ['BA/B.Ed or equivalent as per GB educator advertisement. GB domicile required for most posts.'],
      important: ['GB educator MCQs mirror other provincial teacher tests with added focus on northern areas geography and CPEC basics.'],
      helpful: ['Combine with GBPSC general recruitment practice for shared English and GK patterns.'],
    },
  },

  // Remove duplicate old mdcat block  -  merged above

  // ============================================================
  // NATIONAL: CSS & PMS (Federal Competitive)
  // ============================================================

  'css-mpt': {
    name: 'CSS Screening Test (MPT)',
    category: 'css',
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

  /** PMS general paper: same subject modules and shared MCQ bank as CSS MPT (`english`, `general_knowledge`, …). */
  'pms-competitive': {
    name: 'PMS Competitive (General)',
    category: 'pms',
    totalMCQs: 200,
    duration: 200,
    passingPercentage: 50,
    negativeMarking: false,
    guide: {
      authority: 'Provincial Public Service Commission (e.g. PPSC, KPPSC, varies by province)',
      officialLink: 'https://www.ppsc.gop.pk/',
      eligibility: [
        'Qualification and age limits follow each commission’s advertisement (often graduate-level for PMS).',
        'Domicile and quota rules apply as per the official notification.',
      ],
      important: [
        'Real exams add compulsory English Essay & Précis/Composition and General Knowledge papers. Use MCQs here for screening-style practice and the PMS Writing Coach for written papers.',
        'Syllabus and marks distribution differ by province; confirm from your commission’s latest syllabus PDF.',
      ],
      helpful: [
        'Use subject-wise practice below, then full mocks when you are comfortable with weak areas.',
        'Open Test Guide for this exam’s MCQ pattern; open PMS Writing Coach from the card above for essays and précis.',
      ],
    },
    sections: [
      { slug: 'english',          label: 'English',                dbTable: 'pms_english',           count: 40 },
      { slug: 'general-knowledge',label: 'General Knowledge',      dbTable: 'pms_general_knowledge', count: 40 },
      { slug: 'pakistan-affairs', label: 'Pakistan Affairs',       dbTable: 'pms_pakistan_studies',  count: 20 },
      { slug: 'islamic-studies',  label: 'Islamic Studies',        dbTable: 'pms_islamiat',          count: 20 },
      { slug: 'current-affairs',  label: 'Current Affairs',        dbTable: 'pms_current_affairs',   count: 20 },
      { slug: 'everyday-science', label: 'Everyday Science',       dbTable: 'pms_everyday_science',  count: 20 },
      { slug: 'mathematics',      label: 'Arithmetic & Mathematics',dbTable: 'pms_general_math',     count: 20 },
      { slug: 'geography',        label: 'Geography',              dbTable: 'pms_geography',         count: 20 },
    ]
  },

  // ============================================================
  // PPSC: Punjab Public Service Commission
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
  // FPSC: Federal Public Service Commission
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
  // PROVINCIAL: PMS & PSC Exams
  // ============================================================

  'pms-punjab': {
    name: 'Punjab PMS Screening Test',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: true,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'pms_general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pms_pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'pms_english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'pms_current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'pms_islamiat',          count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'pms_everyday_science',  count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'pms_general_math',      count: 5  },
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
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'pms_general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pms_pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'pms_english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'pms_current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'pms_islamiat',          count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'pms_everyday_science',  count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'pms_general_math',      count: 5  },
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
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'pms_general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pms_pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'pms_english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'pms_current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'pms_islamiat',          count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'pms_everyday_science',  count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'pms_general_math',      count: 5  },
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
  // ETEA: Educational Testing & Evaluation Agency (KPK)
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
  // NTS: National Testing Service
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
  // OTS: Open Testing Service
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
  // PPSC: Additional Posts
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
  // FPSC: Additional Posts
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
  // FIA: Federal Investigation Agency  -  Written Test 2026
  // Official pattern: 100 MCQs, 90 min, no negative marking, English medium.
  // Subject split: English 20 · Islamic Study 10 · Pakistan Study 10 · GK 20 ·
  // Computer 10 · Math IQ 20 · FIA Act 1974 10.
  // ============================================================

  ...(() => {
    const FIA_WRITTEN_2026_SECTIONS: ExamSection[] = [
      { slug: 'english',           label: 'English',           dbTable: 'english',                  count: 20 },
      { slug: 'islamic-studies',   label: 'Islamic Study',     dbTable: 'islamiat',                 count: 10 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Study',    dbTable: 'pakistan_studies',         count: 10 },
      { slug: 'general-knowledge', label: 'General Knowledge', dbTable: 'general_knowledge',        count: 20 },
      { slug: 'computer',          label: 'Computer',          dbTable: 'basic_computer',           count: 10 },
      // IQ items are transferable; table has no FIA target_exams — leave unscoped by exam
      { slug: 'math-iq',           label: 'Math IQ',           dbTable: 'engineering_intelligence', count: 20, noTypeFilter: true },
      {
        slug: 'fia-act',
        label: 'FIA Act 1974',
        dbTable: 'general_knowledge',
        count: 10,
        // Avoid bare "FIA " — ILIKE '%FIA %' false-matches words like "Sofia".
        questionNeedles: [
          'Federal Investigation Agency',
          'FIA Act',
          'FIA of Pakistan',
          'FIA is the',
          'FIA of Pakistan was',
          '(FIA)',
        ],
      },
    ]
    const fiaPost = (name: string, passingPercentage: number) => ({
      name,
      category: 'fia',
      totalMCQs: 100,
      duration: 90,
      passingPercentage,
      negativeMarking: false,
      sections: FIA_WRITTEN_2026_SECTIONS,
    })
    return {
      'fia-sub-inspector': fiaPost('FIA Sub-Inspector (BS-14)', 50),
      'fia-assistant-sub-inspector': fiaPost('FIA Assistant Sub-Inspector (BS-09)', 45),
      'fia-constable': fiaPost('FIA Constable (BS-05)', 40),
      'fia-constable-driver': fiaPost('FIA Constable Driver (BS-05)', 40),
      'fia-assistant': fiaPost('FIA Assistant (BS-15)', 50),
      'fia-steno-typist': fiaPost('FIA Steno-Typist (BS-14)', 45),
      'fia-technical-assistant': fiaPost('FIA Technical Assistant (BS-14)', 45),
      'fia-data-entry-operator': fiaPost('FIA Data Entry Operator (BS-14)', 45),
      'fia-udc': fiaPost('FIA Upper Division Clerk (BS-13)', 45),
      'fia-ldc': fiaPost('FIA Lower Division Clerk (BS-11)', 40),
      'fia-head-clerk': fiaPost('FIA Head Clerk (BS-10)', 40),
      'fia-telephone-operator': fiaPost('FIA Telephone Operator (BS-07)', 40),
      'fia-staff-car-driver': fiaPost('FIA Staff Car Driver (BS-05)', 40),
    }
  })(),

  // ============================================================
  // PROVINCIAL: KPPSC & SPSC Specific Posts
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
  // NTS: Additional Posts
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
  // MILITARY: Armed Forces Initial Tests
  // ============================================================

  'military-pak-army': {
    name: 'Join Pak Army: Initial Academic Test',
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

  'issb-academic': {
    name: 'ISSB Academic & Intelligence Test',
    category: 'military',
    totalMCQs: 660,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    guide: {
      authority: 'Inter Services Selection Board (ISSB)',
      officialLink: 'https://issb.com.pk/',
      eligibility: [
        'Candidates who clear initial tests of Pak Army, Navy, or PAF (Long Course, SSC, PN Cadet, GD Pilot, etc.).',
        'Minimum FSc/A-Level or graduate qualification as per the service advertisement.',
      ],
      important: [
        'ISSB is a 4-5 day selection process: academic screening, psychological tests, group tasks, and interview.',
        'This module covers the written academic & intelligence MCQ portion  -  English, Maths, GK, Pakistan Affairs, and reasoning.',
        'Every MCQ includes a detailed explanation to build the analytical mindset ISSB expects.',
      ],
      helpful: [
        'Practice daily  -  consistency beats cramming for ISSB academic screening.',
        'Read explanations carefully; ISSB rewards clarity of thought, not guessing.',
        'Combine with physical fitness and current affairs reading for holistic preparation.',
      ],
    },
    sections: [
      { slug: 'english',           label: 'English',              dbTable: 'issb_english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics & IQ',     dbTable: 'issb_mathematics',       count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',    dbTable: 'issb_general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',     dbTable: 'issb_pakistan_affairs',  count: 20 },
      { slug: 'intelligence',      label: 'Intelligence & Reasoning', dbTable: 'issb_intelligence',  count: 10 },
    ],
  },

  'issb-army': {
    name: 'ISSB  -  Pak Army Officer Selection',
    category: 'military',
    totalMCQs: 660,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    sourceExam: 'issb-academic',
    sourceExamLabel: 'ISSB Academic & Intelligence Test',
    sections: [
      { slug: 'english',           label: 'English',              dbTable: 'issb_english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics & IQ',     dbTable: 'issb_mathematics',       count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',    dbTable: 'issb_general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',     dbTable: 'issb_pakistan_affairs',  count: 20 },
      { slug: 'intelligence',      label: 'Intelligence & Reasoning', dbTable: 'issb_intelligence',  count: 10 },
    ],
  },

  'issb-navy': {
    name: 'ISSB  -  Pak Navy Officer Selection',
    category: 'military',
    totalMCQs: 660,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    sourceExam: 'issb-academic',
    sourceExamLabel: 'ISSB Academic & Intelligence Test',
    sections: [
      { slug: 'english',           label: 'English',              dbTable: 'issb_english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics & IQ',     dbTable: 'issb_mathematics',       count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',    dbTable: 'issb_general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',     dbTable: 'issb_pakistan_affairs',  count: 20 },
      { slug: 'intelligence',      label: 'Intelligence & Reasoning', dbTable: 'issb_intelligence',  count: 10 },
    ],
  },

  'issb-paf': {
    name: 'ISSB  -  PAF Officer Selection',
    category: 'military',
    totalMCQs: 660,
    duration: 90,
    passingPercentage: 60,
    negativeMarking: false,
    sourceExam: 'issb-academic',
    sourceExamLabel: 'ISSB Academic & Intelligence Test',
    sections: [
      { slug: 'english',           label: 'English',              dbTable: 'issb_english',           count: 25 },
      { slug: 'mathematics',       label: 'Mathematics & IQ',     dbTable: 'issb_mathematics',       count: 25 },
      { slug: 'general-knowledge', label: 'General Knowledge',    dbTable: 'issb_general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',     dbTable: 'issb_pakistan_affairs',  count: 20 },
      { slug: 'intelligence',      label: 'Intelligence & Reasoning', dbTable: 'issb_intelligence',  count: 10 },
    ],
  },

  'military-pak-navy': {
    name: 'Join Pak Navy: Initial Academic Test',
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
    name: 'Join PAF: Airman Initial Test',
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
    name: 'Pakistan Rangers: Initial Test',
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
    name: 'Frontier Corps (FC): Initial Test',
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
  // BANKS: Banking Sector Tests (NTS / IBA Sukkur)
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
  // PPSC: Additional Posts
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
  // FPSC: Additional Posts
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
  // PROVINCIAL: BPSC (Balochistan)
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
  // PROVINCIAL: AJKPSC Additional
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
  // PROVINCIAL: KPPSC Additional
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
  // PROVINCIAL: SPSC Additional
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

  'sts-sindh-jest': {
    name: 'STS Sindh JEST (Junior Elementary Teacher)',
    category: 'provincial',
    totalMCQs: 10000,
    duration: 90,
    passingPercentage: 45,
    negativeMarking: false,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 25 },
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 15 },
    ],
    guide: {
      authority: 'Sindh Testing Service (STS) / School Education Department Sindh',
      eligibility: ['Intermediate or graduation as per JEST advertisement. Sindh domicile usually required.'],
      important: ['STS conducts JEST and other Sindh educator posts. English and Urdu comprehension appear in almost every paper.'],
      helpful: ['Compare with Punjab educator papers but expect more Sindh-specific GK and current affairs.'],
    },
  },

  // ============================================================
  // POLICE: Provincial & Federal
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
  // JUDICIARY: Court & Tribunal Posts
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
  // PAKISTAN RAILWAYS: Direct Recruitment
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
  // DEVELOPMENT AUTHORITIES: CDA, LDA, KDA, MDA, RDA
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
  // POLICE: More Constable Posts
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
  // JUDICIARY: More Courts
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
  // PPSC: Lady Health & Director Level
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
  // FPSC: Additional Posts
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
  // MILITARY: ANF & PAF Officer
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
    name: 'Pak Army Civilian Posts: GD Clerk / LDC',
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
  // NTS: More Organizations
  // ============================================================

  'nts-hec': {
    name: 'NTS HEC GAT General (MS / PhD Scholarship)',
    category: 'hec',
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
  // OTS: Additional Departments
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
  // ETEA: Additional Posts
  // ============================================================

  'etea-lady-health-visitor': {
    name: 'ETEA Lady Health Visitor (LHV), KPK',
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
    name: 'ETEA Staff Nurse / Midwife, KPK',
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
    name: 'ETEA Junior Clerk / Assistant, KPK Govt',
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
  // BANKS: More Institutions
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
  // NAB: National Accountability Bureau
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
  // GBPSC: Gilgit-Baltistan Additional Posts
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
  // AJKPSC: Additional Posts
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
  // BPSC & SPSC: Additional Posts
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
  // PPSC: Remaining Specialist Posts
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
  // MILITARY: Coast Guard
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
  // NTS: LESCO / DISCO Power Distribution Companies
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
  // OTS: Remaining Departments
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
  // PPSC: Educators (PST / SST / EST)
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

  'punjab-educators': {
    name: 'Punjab Educators (PST / SST / EST Hub)',
    category: 'ppsc',
    totalMCQs: 10000,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'urdu',              label: 'Urdu',               dbTable: 'urdu',              count: 25 },
      { slug: 'english',           label: 'English',            dbTable: 'english',           count: 20 },
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pakistan_studies',  count: 15 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'general_math',      count: 10 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'islamiat',          count: 10 },
    ],
    guide: {
      authority: 'Punjab Public Service Commission (PPSC) / School Education Department',
      officialLink: 'https://www.ppsc.gop.pk/',
      eligibility: ['BA/BSc or B.Ed as per post (PST, SST Biology/Math, EST). Domicile and age limits follow each advertisement.'],
      important: ['One hub for all Punjab educator recruitment MCQs. Urdu and pedagogy-heavy GK decide merit in most batches.'],
      helpful: ['Also drill post-specific papers under PST, SST, and EST slugs for exact weightage.'],
    },
  },

  // ============================================================
  // PROVINCIAL: PMS Balochistan / AJK / GB
  // ============================================================

  'pms-balochistan': {
    name: 'Balochistan PMS Screening Test',
    category: 'provincial',
    totalMCQs: 100,
    duration: 90,
    passingPercentage: 40,
    negativeMarking: true,
    sections: [
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'pms_general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pms_pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'pms_english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'pms_current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'pms_islamiat',          count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'pms_everyday_science',  count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'pms_general_math',      count: 5  },
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
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'pms_general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pms_pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'pms_english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'pms_current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'pms_islamiat',          count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'pms_everyday_science',  count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'pms_general_math',      count: 5  },
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
      { slug: 'general-knowledge', label: 'General Knowledge',  dbTable: 'pms_general_knowledge', count: 20 },
      { slug: 'pakistan-affairs',  label: 'Pakistan Affairs',   dbTable: 'pms_pakistan_studies',  count: 20 },
      { slug: 'english',           label: 'English',            dbTable: 'pms_english',           count: 20 },
      { slug: 'current-affairs',   label: 'Current Affairs',    dbTable: 'pms_current_affairs',   count: 15 },
      { slug: 'islamic-studies',   label: 'Islamic Studies',    dbTable: 'pms_islamiat',          count: 10 },
      { slug: 'everyday-science',  label: 'Everyday Science',   dbTable: 'pms_everyday_science',  count: 10 },
      { slug: 'mathematics',       label: 'Mathematics',        dbTable: 'pms_general_math',      count: 5  },
    ]
  },

  // ============================================================
  // POLICE: Balochistan / AJK / Motorway (NH&MP)
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
  // BANKS: Bank of Punjab / Bank of Khyber
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
  // RESCUE: Punjab Rescue 1122 Emergency Services
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
  // REVENUE: Provincial Tax & Revenue Authorities
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
  // ENGINEERING: Primary Exams (full 4-module practice)
  // ============================================================

  'ecat': {
    name: 'ECAT (Engineering College Admission)',
    category: 'engineering',
    totalMCQs: 5109,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    pastPapersExam: 'ECAT',
    sections: [
      { slug: 'physics',     label: 'Physics',     dbTable: 'engineering_physics',          count: 30 },
      { slug: 'mathematics', label: 'Mathematics',  dbTable: 'engineering_mathematics',      count: 30 },
      { slug: 'chemistry',   label: 'Chemistry',    dbTable: 'engineering_chemistry',        count: 30 },
      { slug: 'english',     label: 'English',      dbTable: 'engineering_english',          count: 10 },
    ]
  },

  'uet-taxila': {
    name: 'UET Taxila Entry Test',
    category: 'engineering',
    totalMCQs: 5109,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    pastPapersExam: 'ECAT',
    sections: [
      { slug: 'physics',     label: 'Physics',     dbTable: 'engineering_physics',     count: 30 },
      { slug: 'mathematics', label: 'Mathematics', dbTable: 'engineering_mathematics', count: 30 },
      { slug: 'chemistry',   label: 'Chemistry',   dbTable: 'engineering_chemistry',   count: 30 },
      { slug: 'english',     label: 'English',     dbTable: 'engineering_english',     count: 10 },
    ],
    guide: {
      authority: 'University of Engineering & Technology (UET), Taxila',
      officialLink: 'https://www.uettaxila.edu.pk/',
      eligibility: ['FSc Pre-Engineering or equivalent with Mathematics, Physics, and Chemistry.'],
      important: ['UET Taxila uses the same ECAT-style pattern as UET Lahore. Math and Physics decide merit at top engineering seats.'],
      helpful: ['Practice ECAT timed sets here. Same syllabus applies to affiliated colleges in Rawalpindi region.'],
    },
  },

  'ned-entry': {
    name: 'NED University Entry Test',
    category: 'engineering',
    totalMCQs: 5109,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'mathematics', label: 'Mathematics', dbTable: 'engineering_mathematics', count: 35 },
      { slug: 'physics', label: 'Physics', dbTable: 'engineering_physics', count: 35 },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'engineering_chemistry', count: 20 },
      { slug: 'english', label: 'English', dbTable: 'engineering_english', count: 10 },
    ],
    guide: {
      authority: 'NED University of Engineering & Technology, Karachi',
      officialLink: 'https://www.neduet.edu.pk/',
      eligibility: ['FSc Pre-Engineering or equivalent with Mathematics, Physics, and Chemistry.'],
      important: ['Karachi\'s flagship public engineering university. Math and physics weightage is high in entry tests.'],
      helpful: ['Practice engineering bank MCQs under timed sets before NED-specific mock exams.'],
    },
  },

  'pu-cet-lahore': {
    name: 'PU CET Lahore (Engineering & CS)',
    category: 'engineering',
    totalMCQs: 5109,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'physics', label: 'Physics', dbTable: 'engineering_physics', count: 30 },
      { slug: 'mathematics', label: 'Mathematics', dbTable: 'engineering_mathematics', count: 30 },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'engineering_chemistry', count: 20 },
      { slug: 'english', label: 'English', dbTable: 'engineering_english', count: 10 },
      { slug: 'computer-science', label: 'Computer Science', dbTable: 'engineering_computer_science', count: 10 },
    ],
    guide: {
      authority: 'University of the Punjab (PU), Lahore',
      officialLink: 'https://pu.edu.pk/',
      eligibility: ['FSc Pre-Engineering / ICS for BS Engineering and CS programmes at PU constituent colleges.'],
      important: ['PU CET covers Punjab\'s largest public university engineering and computer science admissions.'],
      helpful: ['Combine with ECAT practice if you are applying to both UET and PU colleges.'],
    },
  },

  'net-engineering': {
    name: 'NUST NET Engineering Test',
    category: 'engineering',
    totalMCQs: 5647,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    pastPapersExam: 'NET',
    sections: [
      { slug: 'physics',          label: 'Physics',           dbTable: 'engineering_physics',          count: 25 },
      { slug: 'mathematics',      label: 'Mathematics',        dbTable: 'engineering_mathematics',      count: 25 },
      { slug: 'chemistry',        label: 'Chemistry',          dbTable: 'engineering_chemistry',        count: 25 },
      { slug: 'computer-science', label: 'Computer Science',   dbTable: 'engineering_computer_science', count: 25 },
    ]
  },

  'giki-entry': {
    name: 'GIKI Entry Test',
    category: 'engineering',
    totalMCQs: 5001,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    pastPapersExam: 'GIKI_PIEAS',
    sections: [
      { slug: 'physics',       label: 'Physics',       dbTable: 'engineering_physics',       count: 30 },
      { slug: 'mathematics',   label: 'Mathematics',    dbTable: 'engineering_mathematics',   count: 30 },
      { slug: 'chemistry',     label: 'Chemistry',      dbTable: 'engineering_chemistry',     count: 30 },
      { slug: 'intelligence',  label: 'Intelligence',   dbTable: 'engineering_intelligence',  count: 10 },
    ]
  },

  'pieas-entry': {
    name: 'PIEAS Entry Test',
    category: 'engineering',
    totalMCQs: 5001,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    pastPapersExam: 'GIKI_PIEAS',
    sections: [
      { slug: 'physics',       label: 'Physics',       dbTable: 'engineering_physics',       count: 30 },
      { slug: 'mathematics',   label: 'Mathematics',    dbTable: 'engineering_mathematics',   count: 30 },
      { slug: 'chemistry',     label: 'Chemistry',      dbTable: 'engineering_chemistry',     count: 30 },
      { slug: 'intelligence',  label: 'Intelligence',   dbTable: 'engineering_intelligence',  count: 10 },
    ]
  },

  'lums-engineering': {
    name: 'LUMS LCAT',
    category: 'engineering',
    totalMCQs: 5215,
    duration: 120,
    passingPercentage: 50,
    negativeMarking: false,
    pastPapersExam: 'LUMS_SAT',
    sections: [
      { slug: 'mathematics',   label: 'Mathematics',    dbTable: 'engineering_mathematics',      count: 40 },
      { slug: 'physics',       label: 'Physics',        dbTable: 'engineering_physics',          count: 30 },
      { slug: 'chemistry',     label: 'Chemistry',      dbTable: 'engineering_chemistry',        count: 20 },
      { slug: 'english',       label: 'English',        dbTable: 'engineering_english',          count: 15 },
      { slug: 'intelligence',  label: 'Intelligence',   dbTable: 'engineering_intelligence',     count: 15 },
    ]
  },

  // ============================================================
  // ENGINEERING: Secondary Exams (mock tests only)
  // ============================================================

  'comsats-engineering': {
    name: 'COMSATS Entry Test',
    category: 'engineering',
    totalMCQs: 5109,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
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
    sections: [
      { slug: 'physics',     label: 'Physics',     dbTable: 'engineering_physics',     count: 30 },
      { slug: 'mathematics', label: 'Mathematics',  dbTable: 'engineering_mathematics', count: 30 },
      { slug: 'chemistry',   label: 'Chemistry',   dbTable: 'engineering_chemistry',   count: 30 },
      { slug: 'english',     label: 'English',     dbTable: 'engineering_english',     count: 10 },
    ]
  },

  'nts-nat-im': {
    name: 'NTS NAT-IM (Medical / Pre-Medical Track)',
    category: 'medical',
    totalMCQs: 18962,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'biology',   label: 'Biology',   dbTable: 'mdcat_biology',   count: 40, noTypeFilter: true },
      { slug: 'chemistry', label: 'Chemistry', dbTable: 'mdcat_chemistry', count: 35, noTypeFilter: true },
      { slug: 'physics',   label: 'Physics',   dbTable: 'mdcat_physics',   count: 25, noTypeFilter: true },
    ],
    guide: {
      authority: 'National Testing Service (NTS)',
      officialLink: 'https://www.nts.org.pk/products/ntsnat/nat-paper-pattern.php',
      eligibility: ['FSc Pre-Medical or equivalent for medical-degree university admission via NAT.'],
      important: ['NAT-IM is required by many private and public universities for MBBS/BDS/BSc medical programs.'],
      helpful: ['Focus on Biology and Chemistry  -  together ~75% of the paper.'],
    },
  },

  'nts-nat-ics': {
    name: 'NTS NAT-ICS (Computer Science Track)',
    category: 'engineering',
    totalMCQs: 5109,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'computer-science', label: 'Computer Science', dbTable: 'engineering_computer_science', count: 40 },
      { slug: 'mathematics',      label: 'Mathematics',      dbTable: 'engineering_mathematics',      count: 35 },
      { slug: 'physics',          label: 'Physics',          dbTable: 'engineering_physics',          count: 25 },
    ],
    guide: {
      authority: 'National Testing Service (NTS)',
      officialLink: 'https://www.nts.org.pk/products/ntsnat/nat-paper-pattern.php',
      eligibility: ['FSc Pre-Engineering / ICS or equivalent.'],
      important: ['Required for CS/IT degree programs at NTS-affiliated universities.'],
      helpful: ['Computer Science and Mathematics carry the highest weightage.'],
    },
  },

  'nts-nat-igs': {
    name: 'NTS NAT-IGS (General Science Track)',
    category: 'nts',
    totalMCQs: 10000,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',           label: 'English',           dbTable: 'english',           count: 40 },
      { slug: 'general-knowledge', label: 'General Knowledge', dbTable: 'general_knowledge', count: 35 },
      { slug: 'mathematics',       label: 'Mathematics',       dbTable: 'general_math',      count: 25 },
    ],
    guide: {
      authority: 'National Testing Service (NTS)',
      officialLink: 'https://www.nts.org.pk/products/ntsnat/nat-paper-pattern.php',
      eligibility: ['Intermediate or equivalent for general science / arts-science degree programs.'],
      important: ['NAT-IGS covers English, analytical math, and general knowledge for broad undergraduate admission.'],
      helpful: ['Strong English vocabulary and basic arithmetic speed up this paper significantly.'],
    },
  },

  'nts-nat-ia': {
    name: 'NTS NAT-IA (Arts / Humanities Track)',
    category: 'nts',
    totalMCQs: 10000,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english', label: 'English', dbTable: 'english', count: 40 },
      { slug: 'general-knowledge', label: 'General Knowledge', dbTable: 'general_knowledge', count: 30 },
      { slug: 'pakistan-affairs', label: 'Pakistan Studies', dbTable: 'pakistan_studies', count: 15 },
      { slug: 'islamic-studies', label: 'Islamic Studies', dbTable: 'islamiat', count: 15 },
    ],
    guide: {
      authority: 'National Testing Service (NTS)',
      officialLink: 'https://www.nts.org.pk/products/ntsnat/nat-paper-pattern.php',
      eligibility: ['Intermediate Arts / Humanities or equivalent for BA, BCom, and social science degree programmes.'],
      important: ['NAT-IA is required by many private universities for arts, law, and social science admissions.'],
      helpful: ['English and Pakistan Studies carry steady weight. Build vocabulary from past NAT papers.'],
    },
  },

  'muet': {
    name: 'MUET / Sukkur IBA Engineering',
    category: 'engineering',
    totalMCQs: 5109,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
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
    category: 'nts',
    totalMCQs: 2344,
    duration: 90,
    passingPercentage: 50,
    negativeMarking: false,
    sections: [
      { slug: 'english',       label: 'English',      dbTable: 'engineering_english',      count: 40 },
      { slug: 'mathematics',   label: 'Mathematics',  dbTable: 'engineering_mathematics',  count: 40 },
      { slug: 'intelligence',  label: 'Intelligence', dbTable: 'engineering_intelligence', count: 20 },
    ]
  },

}

export type ExamSlug = keyof typeof EXAM_CONFIGS

const EXAM_ALIASES: Record<string, ExamSlug> = {
  nust: 'net-engineering',
  lat: 'hec-lat',
  usat: 'hec-usat-e',
  'usat-e': 'hec-usat-e',
  'usat-m': 'hec-usat-m',
  'law-gat': 'hec-law-gat',
  uet: 'uet-lahore',
  kemu: 'king-edward-medical',
  amc: 'amc-entry',
}

export function getExamConfig(slug: string): ExamConfig | null {
  const resolvedSlug = (EXAM_ALIASES[slug] ?? slug) as ExamSlug
  return EXAM_CONFIGS[resolvedSlug] || null
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

function sanitizeExamCopy(config: ExamConfig): void {
  config.name = plainText(config.name)
  if (config.sourceExamLabel) config.sourceExamLabel = plainText(config.sourceExamLabel)
  for (const s of config.sections) s.label = plainText(s.label)
  const g = config.guide
  if (g) {
    if (g.authority) g.authority = plainText(g.authority)
    g.eligibility = g.eligibility.map(plainText)
    g.important = g.important.map(plainText)
    g.helpful = g.helpful.map(plainText)
  }
}

for (const cfg of Object.values(EXAM_CONFIGS)) sanitizeExamCopy(cfg)
