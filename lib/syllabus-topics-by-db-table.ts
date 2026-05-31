/**
 * Topic buckets for MCQ generation — kept in sync with scripts/exam_mcq_profiles.py
 * (CSS_PPSC_SUBJECT_TOPICS). Keys are Supabase / exam-config dbTable names.
 */
export const TOPICS_BY_DB_TABLE: Record<string, string[]> = {
  english: [
    'Parts of speech',
    'Tenses and agreement',
    'Prepositions and conjunctions',
    'Vocabulary in context',
    'Synonyms and antonyms',
    'Sentence correction',
    'Analogies',
    'Reading comprehension strategy',
  ],
  pakistan_studies: [
    'Constitution of 1973',
    'Parliamentary system and amendments',
    'Freedom movement (1857–1947)',
    'Post-independence leaders and events',
    'Provinces and administrative structure',
    'Foreign policy and neighbours',
    'Natural resources and economy',
    'Culture and demographics',
  ],
  general_knowledge: [
    'World geography landmarks',
    'International organisations',
    'Awards and recognitions',
    'Sports and major events',
    'Books and authors',
    'Inventions and discoveries',
    'Basic astronomy and space',
    'Famous personalities',
  ],
  everyday_science: [
    'Human body systems',
    'Nutrition and health',
    'Light, sound, and waves',
    'Heat and energy',
    'Electricity and magnetism basics',
    'Chemistry in daily life',
    'Ecology and environment',
    'Scientific method and measurements',
  ],
  current_affairs: [
    'National headlines and policy',
    'International relations',
    'Economy and development projects',
    'Climate and summits',
    'Appointments and elections',
  ],
  islamiat: [
    'Quranic themes and surahs',
    'Hadith and seerah',
    'Pillars and ibadat',
    'Islamic history (Khulafa Rashidin onward)',
    'Ethics and social teachings',
  ],
  urdu: [
    'Grammar (صرف و نحو)',
    'ادبی اصطلاحات',
    'مشہور شعرا اور ان کی خصوصیات',
    'نثر اور نثری اصناف',
    'محاورے اور ضرب الامثال',
  ],
  basic_computer: [
    'Hardware and software',
    'OS and file systems',
    'MS Office concepts',
    'Internet, email, and security',
    'Databases and networking basics',
    'Programming logic (not code-heavy)',
  ],
  geography: [
    'Physical geography',
    'Pakistan geography',
    'World capitals and rivers',
    'Climate and vegetation',
    'Maps and projections',
  ],
  ethics_civics: [
    'Ethical theories and civic virtue',
    'Human rights and duties',
    'Governance and accountability',
    'Social justice themes',
  ],
  general_math: [
    'Arithmetic and percentages',
    'Ratios and proportions',
    'Algebraic simplification',
    'Geometry basics',
    'Data interpretation',
  ],
}

export function topicsForDbTable(dbTable: string, sectionLabel: string): { topics: string[]; source: 'shared_bank' | 'label_only' } {
  const t = TOPICS_BY_DB_TABLE[dbTable]
  if (t?.length) return { topics: t, source: 'shared_bank' }
  return { topics: [`${sectionLabel} (general — add official syllabus topics when available)`], source: 'label_only' }
}
