import type { NoteTopicMeta, NoteKitData } from '@/lib/notes/types'
import { OBJECTIVES_RESOLUTION_KIT } from '@/lib/notes/content/objectives-resolution-article-2a'
import { CONSTITUTION_1973_KIT } from '@/lib/notes/content/constitution-1973'
import { EIGHTEENTH_AMENDMENT_KIT } from '@/lib/notes/content/eighteenth-amendment'
import { LAHORE_RESOLUTION_KIT } from '@/lib/notes/content/lahore-resolution-1940'
import { IDEOLOGY_OF_PAKISTAN_KIT } from '@/lib/notes/content/ideology-of-pakistan'
import { CIVIL_MILITARY_RELATIONS_KIT } from '@/lib/notes/content/civil-military-relations'
import { FOREIGN_POLICY_POST_911_KIT } from '@/lib/notes/content/foreign-policy-post-911'
import { PAKISTAN_INDIA_RELATIONS_KIT } from '@/lib/notes/content/pakistan-india-relations'
import { POLITICAL_EVOLUTION_1971_KIT } from '@/lib/notes/content/political-evolution-1971'
import { DEMOCRACY_EVOLUTION_PAKISTAN_KIT } from '@/lib/notes/content/democracy-evolution-pakistan'
import { CONSTITUTIONAL_DEVELOPMENT_PAKISTAN_KIT } from '@/lib/notes/content/constitutional-development-pakistan'
import { LAND_PEOPLE_PAKISTAN_KIT } from '@/lib/notes/content/land-people-pakistan'
import { INDUS_RIVER_SYSTEM_KIT } from '@/lib/notes/content/indus-river-system'
import { PAKISTAN_NUCLEAR_PROGRAM_KIT } from '@/lib/notes/content/pakistan-nuclear-program'
import { CPEC_REGIONAL_CONNECTIVITY_KIT } from '@/lib/notes/content/cpec-and-regional-connectivity'
import { PAKISTAN_ECONOMY_IMF_SBP_KIT } from '@/lib/notes/content/pakistan-economy-imf-sbp'
import { CLIMATE_FLOODS_SMOG_PAKISTAN_KIT } from '@/lib/notes/content/climate-floods-smog-pakistan'
import { PILLARS_OF_ISLAM_KIT } from '@/lib/notes/content/pillars-of-islam'
import { SOURCES_OF_ISLAMIC_LAW_KIT } from '@/lib/notes/content/sources-of-islamic-law'
import { QURAN_REVELATION_COMPILATION_KIT } from '@/lib/notes/content/quran-revelation-compilation'
import { SEERAH_HIGH_YIELD_KIT } from '@/lib/notes/content/seerah-high-yield'
import { HADITH_SCIENCES_BASICS_KIT } from '@/lib/notes/content/hadith-sciences-basics'
import { ENGLISH_ESSAY_CSS_KIT } from '@/lib/notes/content/english-essay-css'
import { PRECIS_COMPOSITION_CSS_KIT } from '@/lib/notes/content/precis-composition-css'
import { ENGLISH_GRAMMAR_HIGH_YIELD_KIT } from '@/lib/notes/content/english-grammar-high-yield'
import { UN_INTERNATIONAL_ORGANIZATIONS_KIT } from '@/lib/notes/content/un-international-organizations'
import { COMPUTER_NETWORKING_BASICS_KIT } from '@/lib/notes/content/computer-networking-basics'
import { VITAMINS_HORMONES_BASICS_KIT } from '@/lib/notes/content/vitamins-hormones-basics'
import { PERCENTAGES_RATIOS_PROFIT_LOSS_KIT } from '@/lib/notes/content/percentages-ratios-profit-loss'
import { ETHICS_THEORIES_BASICS_KIT } from '@/lib/notes/content/ethics-theories-basics'
import { GOOD_GOVERNANCE_UNDP_KIT } from '@/lib/notes/content/good-governance-undp'
import { SDGS_PAKISTAN_KIT } from '@/lib/notes/content/sdgs-pakistan'
import { HUMAN_RIGHTS_UDHR_KIT } from '@/lib/notes/content/human-rights-udhr'

const TOPICS: NoteTopicMeta[] = [
  // ── Pakistan Affairs / Pakistan Studies ─────────────────────────────
  {
    slug: 'objectives-resolution-article-2a',
    title: 'Objectives Resolution and Article 2A',
    contentId: 'objectives-resolution-article-2a',
    subjectSlugs: ['pakistan-affairs'],
    syllabusHints: [
      'objectives resolution',
      'article 2a',
      'constitutional history',
      'constitutional development',
      'ideology of pakistan',
    ],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'constitution',
  },
  {
    slug: 'constitution-1973',
    title: '1973 Constitution of Pakistan',
    contentId: 'constitution-1973',
    subjectSlugs: ['pakistan-affairs'],
    syllabusHints: [
      '1973 constitution',
      'constitutions of pakistan',
      'parliamentary system',
      'political evolution since 1971',
    ],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'constitution',
  },
  {
    slug: 'eighteenth-amendment',
    title: '18th Amendment (2010)',
    contentId: 'eighteenth-amendment',
    subjectSlugs: ['pakistan-affairs'],
    syllabusHints: [
      '18th amendment',
      'eighteenth amendment',
      'provincial autonomy',
      'federalism',
      'constitutional amendments',
    ],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'constitution',
  },
  {
    slug: 'lahore-resolution-1940',
    title: 'Lahore Resolution (Pakistan Resolution) 1940',
    contentId: 'lahore-resolution-1940',
    subjectSlugs: ['pakistan-affairs'],
    syllabusHints: [
      'lahore resolution',
      'pakistan resolution',
      'freedom movement',
      'ideology of pakistan',
      '1940',
    ],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'pakistan-movement',
  },
  {
    slug: 'ideology-of-pakistan',
    title: 'Ideology of Pakistan (Iqbal and Quaid)',
    contentId: 'ideology-of-pakistan',
    subjectSlugs: ['pakistan-affairs'],
    syllabusHints: [
      'ideology of pakistan',
      'iqbal',
      'quaid',
      'two-nation',
      'two nation',
      'allahabad',
    ],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'ideology',
  },
  {
    slug: 'constitutional-development-pakistan',
    title: 'Constitutional Development (1956, 1962, 1973)',
    contentId: 'constitutional-development-pakistan',
    subjectSlugs: ['pakistan-affairs'],
    syllabusHints: [
      'constitutional development',
      '1956',
      '1962',
      '1973 and amendments',
      'constitutions of pakistan',
    ],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'constitution',
  },
  {
    slug: 'civil-military-relations',
    title: 'Civil-Military Relations in Pakistan',
    contentId: 'civil-military-relations',
    subjectSlugs: ['pakistan-affairs'],
    syllabusHints: ['civil-military', 'civil military', 'martial law', 'military regimes'],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'politics',
  },
  {
    slug: 'foreign-policy-post-911',
    title: 'Foreign Policy of Pakistan after 9/11',
    contentId: 'foreign-policy-post-911',
    subjectSlugs: ['pakistan-affairs', 'current-affairs'],
    syllabusHints: ['foreign policy', '9/11', 'post 9/11', 'afghanistan', 'war on terror'],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'foreign-policy',
  },
  {
    slug: 'pakistan-india-relations',
    title: 'Pakistan-India Relations since 1947',
    contentId: 'pakistan-india-relations',
    subjectSlugs: ['pakistan-affairs', 'current-affairs'],
    syllabusHints: ['pakistan and india', 'india relations', 'kashmir', 'simla', 'indus waters'],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'foreign-policy',
  },
  {
    slug: 'political-evolution-1971',
    title: 'Political Evolution since 1971',
    contentId: 'political-evolution-1971',
    subjectSlugs: ['pakistan-affairs'],
    syllabusHints: ['political evolution since 1971', 'since 1971', 'bhutto', 'zia', 'musharraf'],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'politics',
  },
  {
    slug: 'democracy-evolution-pakistan',
    title: 'Evolution of Democratic System in Pakistan',
    contentId: 'democracy-evolution-pakistan',
    subjectSlugs: ['pakistan-affairs'],
    syllabusHints: ['evolution of democratic', 'democratic system', 'elections', 'parliamentary'],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'politics',
  },
  {
    slug: 'land-people-pakistan',
    title: 'Land and People of Pakistan',
    contentId: 'land-people-pakistan',
    subjectSlugs: ['pakistan-affairs', 'geography'],
    syllabusHints: ['land and people', 'geography', 'society', 'resources', 'provinces'],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'geography',
  },
  {
    slug: 'indus-river-system',
    title: 'Indus River System and Water Resources',
    contentId: 'indus-river-system',
    subjectSlugs: ['pakistan-affairs', 'geography'],
    syllabusHints: ['indus', 'water', 'tarbela', 'mangla', 'indus waters treaty'],
    mcqSubjectSlug: 'geography',
    mcqTagHint: 'rivers',
  },
  {
    slug: 'pakistan-nuclear-program',
    title: 'Pakistan Nuclear Program (Exam Facts)',
    contentId: 'pakistan-nuclear-program',
    subjectSlugs: ['pakistan-affairs', 'current-affairs'],
    syllabusHints: ['nuclear', 'chagai', 'deterrence', '1998'],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'nuclear',
  },

  // ── Current Affairs ─────────────────────────────────────────────────
  {
    slug: 'cpec-and-regional-connectivity',
    title: 'CPEC and Regional Connectivity',
    contentId: 'cpec-and-regional-connectivity',
    subjectSlugs: ['current-affairs', 'pakistan-affairs'],
    syllabusHints: ['cpec', 'belt and road', 'gwadar', 'china', 'connectivity'],
    mcqSubjectSlug: 'current-affairs',
    mcqTagHint: 'cpec',
  },
  {
    slug: 'pakistan-economy-imf-sbp',
    title: 'Pakistan Economy, IMF and SBP Basics',
    contentId: 'pakistan-economy-imf-sbp',
    subjectSlugs: ['current-affairs', 'pakistan-affairs'],
    syllabusHints: ['economy', 'imf', 'sbp', 'inflation', 'economic survey', 'economic conditions'],
    mcqSubjectSlug: 'current-affairs',
    mcqTagHint: 'economy',
  },
  {
    slug: 'climate-floods-smog-pakistan',
    title: 'Climate Change, Floods and Smog in Pakistan',
    contentId: 'climate-floods-smog-pakistan',
    subjectSlugs: ['current-affairs', 'pakistan-affairs', 'everyday-science', 'geography'],
    syllabusHints: ['climate', 'floods', 'smog', 'environment', 'paris agreement', 'social problems'],
    mcqSubjectSlug: 'current-affairs',
    mcqTagHint: 'environment',
  },

  // ── Islamic Studies ─────────────────────────────────────────────────
  {
    slug: 'pillars-of-islam',
    title: 'Five Pillars of Islam',
    contentId: 'pillars-of-islam',
    subjectSlugs: ['islamic-studies'],
    syllabusHints: ['pillars', 'salah', 'zakat', 'hajj', 'sawm', 'ibadat', 'worship'],
    mcqSubjectSlug: 'islamic-studies',
    mcqTagHint: 'ibadat',
  },
  {
    slug: 'sources-of-islamic-law',
    title: 'Sources of Islamic Law (Usul)',
    contentId: 'sources-of-islamic-law',
    subjectSlugs: ['islamic-studies'],
    syllabusHints: ['sources of islamic law', 'usul', 'ijma', 'qiyas', 'fiqh', 'madhab'],
    mcqSubjectSlug: 'islamic-studies',
    mcqTagHint: 'fiqh',
  },
  {
    slug: 'quran-revelation-compilation',
    title: 'Revelation and Compilation of the Quran',
    contentId: 'quran-revelation-compilation',
    subjectSlugs: ['islamic-studies'],
    syllabusHints: ['quran', 'revelation', 'compilation', 'uthman', 'abu bakr', 'makki', 'madani'],
    mcqSubjectSlug: 'islamic-studies',
    mcqTagHint: 'quran',
  },
  {
    slug: 'seerah-high-yield',
    title: 'Seerah High-Yield Facts (Prophet Muhammad PBUH)',
    contentId: 'seerah-high-yield',
    subjectSlugs: ['islamic-studies'],
    syllabusHints: ['seerah', 'prophet', 'hijra', 'badr', 'uhud', 'makkah'],
    mcqSubjectSlug: 'islamic-studies',
    mcqTagHint: 'seerah',
  },
  {
    slug: 'hadith-sciences-basics',
    title: 'Hadith Sciences Basics',
    contentId: 'hadith-sciences-basics',
    subjectSlugs: ['islamic-studies'],
    syllabusHints: ['hadith', 'bukhari', 'muslim', 'sihah', 'isnad'],
    mcqSubjectSlug: 'islamic-studies',
    mcqTagHint: 'hadith',
  },

  // ── English ─────────────────────────────────────────────────────────
  {
    slug: 'english-essay-css',
    title: 'CSS English Essay (Structure and Method)',
    contentId: 'english-essay-css',
    subjectSlugs: ['english-essay', 'english'],
    syllabusHints: ['essay', 'english essay', 'outline', 'thesis'],
    mcqSubjectSlug: 'english',
    mcqTagHint: 'essay',
  },
  {
    slug: 'precis-composition-css',
    title: 'Precis and Composition (CSS Method)',
    contentId: 'precis-composition-css',
    subjectSlugs: ['english-precis', 'english'],
    syllabusHints: ['precis', 'précis', 'composition', 'comprehension'],
    mcqSubjectSlug: 'english',
    mcqTagHint: 'precis',
  },
  {
    slug: 'english-grammar-high-yield',
    title: 'English Grammar High-Yield for One-Paper Exams',
    contentId: 'english-grammar-high-yield',
    subjectSlugs: ['english'],
    syllabusHints: ['grammar', 'tenses', 'articles', 'prepositions', 'subject-verb'],
    mcqSubjectSlug: 'english',
    mcqTagHint: 'grammar',
  },

  // ── GK / Science / Math / Computer ──────────────────────────────────
  {
    slug: 'un-international-organizations',
    title: 'UN and Major International Organizations',
    contentId: 'un-international-organizations',
    subjectSlugs: ['general-knowledge', 'current-affairs'],
    syllabusHints: ['united nations', 'imf', 'world bank', 'oic', 'saarc', 'wto', 'sco'],
    mcqSubjectSlug: 'general-knowledge',
    mcqTagHint: 'organizations',
  },
  {
    slug: 'computer-networking-basics',
    title: 'Computer Networking Basics (OSI and TCP/IP)',
    contentId: 'computer-networking-basics',
    subjectSlugs: ['computer', 'basic-computer', 'computer-science'],
    syllabusHints: ['osi', 'tcp', 'networking', 'ports', 'ip'],
    mcqSubjectSlug: 'computer',
    mcqTagHint: 'networking',
  },
  {
    slug: 'vitamins-hormones-basics',
    title: 'Vitamins, Hormones and Deficiency Diseases',
    contentId: 'vitamins-hormones-basics',
    subjectSlugs: ['everyday-science'],
    syllabusHints: ['vitamin', 'hormone', 'deficiency', 'insulin', 'human body'],
    mcqSubjectSlug: 'everyday-science',
    mcqTagHint: 'biology',
  },
  {
    slug: 'percentages-ratios-profit-loss',
    title: 'Percentages, Ratios and Profit Loss',
    contentId: 'percentages-ratios-profit-loss',
    subjectSlugs: ['mathematics'],
    syllabusHints: ['percentage', 'ratio', 'profit', 'loss', 'arithmetic'],
    mcqSubjectSlug: 'mathematics',
    mcqTagHint: 'arithmetic',
  },

  // ── Ethics / Civics / Governance ────────────────────────────────────
  {
    slug: 'ethics-theories-basics',
    title: 'Ethical Theories for Civil Service Exams',
    contentId: 'ethics-theories-basics',
    subjectSlugs: ['ethics-civics', 'general-knowledge'],
    syllabusHints: ['ethics', 'utilitarianism', 'kant', 'rawls', 'virtue'],
    mcqSubjectSlug: 'ethics-civics',
    mcqTagHint: 'ethics',
  },
  {
    slug: 'good-governance-undp',
    title: 'Good Governance Principles',
    contentId: 'good-governance-undp',
    subjectSlugs: ['ethics-civics', 'pakistan-affairs', 'general-knowledge'],
    syllabusHints: ['good governance', 'transparency', 'accountability', 'rule of law', 'undp'],
    mcqSubjectSlug: 'ethics-civics',
    mcqTagHint: 'governance',
  },
  {
    slug: 'sdgs-pakistan',
    title: 'Sustainable Development Goals (SDGs)',
    contentId: 'sdgs-pakistan',
    subjectSlugs: ['ethics-civics', 'current-affairs', 'general-knowledge'],
    syllabusHints: ['sdg', 'sustainable development', '2030', 'poverty', 'gender'],
    mcqSubjectSlug: 'current-affairs',
    mcqTagHint: 'sdgs',
  },
  {
    slug: 'human-rights-udhr',
    title: 'Human Rights Framework (UDHR and Core Treaties)',
    contentId: 'human-rights-udhr',
    subjectSlugs: ['ethics-civics', 'pakistan-affairs', 'general-knowledge'],
    syllabusHints: [
      'human rights',
      'udhr',
      'iccpr',
      'cedaw',
      'fundamental rights',
      'articles 8-28',
    ],
    mcqSubjectSlug: 'ethics-civics',
    mcqTagHint: 'human-rights',
  },
]

const KITS: Record<string, NoteKitData> = {
  'objectives-resolution-article-2a': OBJECTIVES_RESOLUTION_KIT,
  'constitution-1973': CONSTITUTION_1973_KIT,
  'eighteenth-amendment': EIGHTEENTH_AMENDMENT_KIT,
  'lahore-resolution-1940': LAHORE_RESOLUTION_KIT,
  'ideology-of-pakistan': IDEOLOGY_OF_PAKISTAN_KIT,
  'constitutional-development-pakistan': CONSTITUTIONAL_DEVELOPMENT_PAKISTAN_KIT,
  'civil-military-relations': CIVIL_MILITARY_RELATIONS_KIT,
  'foreign-policy-post-911': FOREIGN_POLICY_POST_911_KIT,
  'pakistan-india-relations': PAKISTAN_INDIA_RELATIONS_KIT,
  'political-evolution-1971': POLITICAL_EVOLUTION_1971_KIT,
  'democracy-evolution-pakistan': DEMOCRACY_EVOLUTION_PAKISTAN_KIT,
  'land-people-pakistan': LAND_PEOPLE_PAKISTAN_KIT,
  'indus-river-system': INDUS_RIVER_SYSTEM_KIT,
  'pakistan-nuclear-program': PAKISTAN_NUCLEAR_PROGRAM_KIT,
  'cpec-and-regional-connectivity': CPEC_REGIONAL_CONNECTIVITY_KIT,
  'pakistan-economy-imf-sbp': PAKISTAN_ECONOMY_IMF_SBP_KIT,
  'climate-floods-smog-pakistan': CLIMATE_FLOODS_SMOG_PAKISTAN_KIT,
  'pillars-of-islam': PILLARS_OF_ISLAM_KIT,
  'sources-of-islamic-law': SOURCES_OF_ISLAMIC_LAW_KIT,
  'quran-revelation-compilation': QURAN_REVELATION_COMPILATION_KIT,
  'seerah-high-yield': SEERAH_HIGH_YIELD_KIT,
  'hadith-sciences-basics': HADITH_SCIENCES_BASICS_KIT,
  'english-essay-css': ENGLISH_ESSAY_CSS_KIT,
  'precis-composition-css': PRECIS_COMPOSITION_CSS_KIT,
  'english-grammar-high-yield': ENGLISH_GRAMMAR_HIGH_YIELD_KIT,
  'un-international-organizations': UN_INTERNATIONAL_ORGANIZATIONS_KIT,
  'computer-networking-basics': COMPUTER_NETWORKING_BASICS_KIT,
  'vitamins-hormones-basics': VITAMINS_HORMONES_BASICS_KIT,
  'percentages-ratios-profit-loss': PERCENTAGES_RATIOS_PROFIT_LOSS_KIT,
  'ethics-theories-basics': ETHICS_THEORIES_BASICS_KIT,
  'good-governance-undp': GOOD_GOVERNANCE_UNDP_KIT,
  'sdgs-pakistan': SDGS_PAKISTAN_KIT,
  'human-rights-udhr': HUMAN_RIGHTS_UDHR_KIT,
}

export function listRegisteredTopics(): NoteTopicMeta[] {
  return TOPICS
}

export function getRegisteredTopic(slug: string): NoteTopicMeta | null {
  return TOPICS.find((t) => t.slug === slug) ?? null
}

export function getRegisteredTopicForSubject(subjectSlug: string): NoteTopicMeta[] {
  return TOPICS.filter((t) => t.subjectSlugs.includes(subjectSlug))
}

export function getNoteKit(contentId: string): NoteKitData | null {
  return KITS[contentId] ?? null
}

export function resolveTopicKit(
  topicSlug: string
): { meta: NoteTopicMeta; kit: NoteKitData } | null {
  const meta = getRegisteredTopic(topicSlug)
  if (!meta) return null
  const kit = getNoteKit(meta.contentId)
  if (!kit) return null
  return { meta, kit }
}
