// ─── Competitive exam tables (tags array) ───────────────────────────────────

export const TABLE_POPULAR_TAGS: Record<string, string[]> = {
  general_knowledge: [
    'world_facts', 'world_geography', 'physical_geography', 'world_affairs',
    'international_organizations', 'world_history', 'world_records', 'superlatives',
    'historical_events', 'world_currencies', 'books_authors', 'world_capitals',
  ],
  pakistan_studies: [
    'pakistan_history', 'political_history', 'governance', 'pakistan_geography',
    'provinces_geography', 'independence_movement', 'founding_fathers',
    'subcontinent_history', 'medieval_history', 'constitutional_amendments',
    'military_history', 'jinnah',
  ],
  english: [
    'vocabulary', 'grammar', 'synonyms_antonyms', 'reading_comprehension',
    'fill_in_blanks', 'prepositions', 'tenses', 'one_word_substitution',
    'idioms_phrases', 'sentence_correction',
  ],
  everyday_science: [
    'biology', 'physical_science', 'life_science', 'chemistry', 'physics',
    'astronomy', 'earth_science', 'nutrition_health',
    'periodic_table', 'electricity', 'optics',
  ],
  current_affairs: [
    'pakistan_economy', 'international_organizations', 'cpec', 'pakistan_politics',
    'foreign_policy', 'sco', 'imf', 'china_pakistan',
    'kashmir', 'climate_change', 'afghanistan',
  ],
  islamiat: [
    'seerah', 'quran', 'islamic_history', 'khulafa_rashideen',
    'pillars_of_islam', 'ghazwat', 'prophet_biography', 'quran_studies',
    'ibadat', 'fiqh', 'hadith', 'companions',
  ],
  general_math: [
    'geometry', 'profit_loss', 'algebra', 'ratio_proportion',
    'percentages', 'time_work', 'ages', 'statistics', 'fractions',
    'time_distance_speed', 'averages', 'simple_compound_interest', 'number_theory',
  ],
  geography: [
    'pakistan_geography', 'physical_geography', 'rivers', 'economic_geography',
    'mountains_peaks', 'rivers_lakes', 'political_geography', 'capitals',
    'south_asia', 'world_oceans_seas', 'middle_east', 'world_geography',
  ],
  ethics_civics: [
    'pakistan_constitution', 'accountability', 'ethics_theory', 'rule_of_law',
    'good_governance', 'fundamental_rights', 'transparency', 'anti_corruption', 'judiciary',
  ],
  urdu: [
    'urdu_poetry', 'urdu_grammar', 'urdu_literature', 'urdu_prose',
    'urdu_novel', 'urdu_history', 'manto',
  ],
  basic_computer: [
    'computer_fundamentals', 'ms_office', 'productivity_tools', 'operating_systems',
    'networking', 'system_software', 'cybersecurity',
  ],
}

// PMS tables share the same tag taxonomy: queries fail silently (no tags col) so counts → 0
const PMS_MAP: [string, string][] = [
  ['pms_general_knowledge', 'general_knowledge'],
  ['pms_pakistan_studies',  'pakistan_studies'],
  ['pms_english',           'english'],
  ['pms_everyday_science',  'everyday_science'],
  ['pms_current_affairs',   'current_affairs'],
  ['pms_islamiat',          'islamiat'],
  ['pms_general_math',      'general_math'],
  ['pms_geography',         'geography'],
]
for (const [pms, base] of PMS_MAP) {
  TABLE_POPULAR_TAGS[pms] = TABLE_POPULAR_TAGS[base]
}

// ─── Engineering tables (topic string column) ────────────────────────────────

TABLE_POPULAR_TAGS['engineering_chemistry'] = [
  'chemical-equilibrium', 'electrochemistry', 'aldehydes-ketones', 'reaction-kinetics',
  'gases', 'environmental-chemistry', 'macromolecules', 'organic-chemistry',
]
TABLE_POPULAR_TAGS['engineering_physics'] = [
  'work-energy', 'electromagnetic-induction', 'physics-of-solids', 'circular-motion',
  'oscillations', 'heat-thermodynamics', 'motion-force', 'electronics',
]
TABLE_POPULAR_TAGS['engineering_mathematics'] = [
  'quadratic-equations', 'partial-fractions', 'trig-functions', 'integration',
  'trig-identities', 'permutation-combination', 'trig-equations', 'analytic-geometry',
]
TABLE_POPULAR_TAGS['engineering_english'] = [
  'vocabulary-synonyms', 'grammar-parts-of-speech', 'sentence-completion',
  'analogies', 'reading-comprehension',
]
TABLE_POPULAR_TAGS['engineering_intelligence'] = [
  'coding-decoding', 'direction-sense', 'odd-one-out',
  'analytical-reasoning', 'series-completion', 'logical-problems',
]
TABLE_POPULAR_TAGS['engineering_computer_science'] = [
  'data-communication', 'programming-c', 'databases', 'it-basics',
  'operating-systems', 'network-security', 'information-networks', 'computer-architecture',
]

// ─── MDCAT tables (topic string column) ──────────────────────────────────────

TABLE_POPULAR_TAGS['mdcat_biology'] = [
  'biotechnology', 'coordination-control', 'cell-structure', 'inheritance',
  'reproduction', 'digestion', 'support-movement', 'circulation', 'evolution', 'enzymes',
]
TABLE_POPULAR_TAGS['mdcat_chemistry'] = [
  'fundamental-concepts', 'chemical-bonding', 'atomic-structure', 'chemical-equilibrium',
  'organic-fundamentals', 's-p-block', 'reaction-kinetics', 'macromolecules', 'gases', 'hydrocarbons',
]
TABLE_POPULAR_TAGS['mdcat_physics'] = [
  'waves', 'force-motion', 'electrostatics', 'work-energy',
  'vectors-equilibrium', 'nuclear-physics', 'thermodynamics', 'fluid-dynamics', 'modern-physics', 'electronics',
]
TABLE_POPULAR_TAGS['mdcat_english'] = [
  'vocabulary', 'indirect-speech', 'active-passive',
  'transitional-devices', 'sentence-inversion', 'reading-skills',
]
TABLE_POPULAR_TAGS['mdcat_logical_reasoning'] = [
  'critical-thinking', 'letter-series', 'cause-effect',
  'course-of-action', 'logical-problems', 'logical-deductions',
]

TABLE_POPULAR_TAGS['issb_english'] = [
  'synonyms', 'antonyms', 'fill_in_blanks', 'prepositions', 'idioms',
  'sentence_correction', 'one_word_substitution', 'spelling',
]
TABLE_POPULAR_TAGS['issb_mathematics'] = [
  'percentages', 'ratios', 'number_series', 'algebra', 'geometry',
  'speed_distance', 'averages', 'profit_loss',
]
TABLE_POPULAR_TAGS['issb_general_knowledge'] = [
  'science', 'geography', 'international_organizations', 'awards', 'computer_basics',
]
TABLE_POPULAR_TAGS['issb_pakistan_affairs'] = [
  'pakistan_history', 'constitution', 'geography', 'modern_history', 'culture',
]
TABLE_POPULAR_TAGS['issb_intelligence'] = [
  'analogies', 'odd_one_out', 'letter_coding', 'letter_series', 'blood_relations',
  'number_series', 'syllogisms', 'pattern_recognition',
]

// ─── Slug → actual DB topic value ────────────────────────────────────────────

export const ENGINEERING_TOPIC_VALUES: Record<string, Record<string, string>> = {
  engineering_chemistry: {
    'chemical-equilibrium':   'Chemical Equilibrium',
    'electrochemistry':       'Electrochemistry',
    'aldehydes-ketones':      'Aldehydes and Ketones',
    'reaction-kinetics':      'Reaction Kinetics',
    'gases':                  'Gases',
    'environmental-chemistry':'Environmental Chemistry',
    'macromolecules':         'Macromolecules',
    'organic-chemistry':      'Organic Chemistry Fundamentals',
  },
  engineering_physics: {
    'work-energy':              'Work and Energy',
    'electromagnetic-induction':'Electromagnetic Induction',
    'physics-of-solids':        'Physics of Solids',
    'circular-motion':          'Circular Motion',
    'oscillations':             'Oscillations',
    'heat-thermodynamics':      'Heat and Thermodynamics',
    'motion-force':             'Motion and Force',
    'electronics':              'Electronics',
  },
  engineering_mathematics: {
    'quadratic-equations':    'Quadratic Equations',
    'partial-fractions':      'Partial Fractions',
    'trig-functions':         'Trigonometric Functions and Graphs',
    'integration':            'Integration',
    'trig-identities':        'Trigonometric Identities',
    'permutation-combination':'Permutation Combination and Probability',
    'trig-equations':         'Solutions of Trigonometric Equations',
    'analytic-geometry':      'Introduction to Analytic Geometry',
  },
  engineering_english: {
    'vocabulary-synonyms':    'Vocabulary and Synonyms',
    'grammar-parts-of-speech':'Grammar and Parts of Speech',
    'sentence-completion':    'Sentence Completion',
    'analogies':              'Analogies',
    'reading-comprehension':  'Reading Comprehension',
  },
  engineering_intelligence: {
    'coding-decoding':     'Coding Decoding',
    'direction-sense':     'Direction Sense',
    'odd-one-out':         'Odd One Out',
    'analytical-reasoning':'Analytical Reasoning',
    'series-completion':   'Series Completion',
    'logical-problems':    'Logical Problems',
  },
  engineering_computer_science: {
    'data-communication':   'Data Communication',
    'programming-c':        'Programming in C',
    'databases':            'Databases',
    'it-basics':            'Information Technology Basics',
    'operating-systems':    'Operating Systems',
    'network-security':     'Network Security',
    'information-networks': 'Information Networks',
    'computer-architecture':'Computer Architecture',
  },
}

export const MDCAT_TOPIC_VALUES: Record<string, Record<string, string>> = {
  mdcat_biology: {
    'biotechnology':       'Biotechnology',
    'coordination-control':'Coordination and Control',
    'cell-structure':      'Cell Structure and Function',
    'inheritance':         'Inheritance',
    'reproduction':        'Reproduction',
    'digestion':           'Digestion',
    'support-movement':    'Support and Movement',
    'circulation':         'Circulation',
    'evolution':           'Evolution',
    'enzymes':             'Enzymes',
  },
  mdcat_chemistry: {
    'fundamental-concepts': 'Fundamental Concepts',
    'chemical-bonding':     'Chemical Bonding',
    'atomic-structure':     'Atomic Structure',
    'chemical-equilibrium': 'Chemical Equilibrium',
    'organic-fundamentals': 'Fundamental Principles of Organic Chemistry',
    's-p-block':            'S and P Block Elements',
    'reaction-kinetics':    'Reaction Kinetics',
    'macromolecules':       'Macromolecules',
    'gases':                'Gases',
    'hydrocarbons':         'Hydrocarbons',
  },
  mdcat_physics: {
    'waves':              'Waves',
    'force-motion':       'Force and Motion',
    'electrostatics':     'Electrostatics',
    'work-energy':        'Work and Energy',
    'vectors-equilibrium':'Vectors and Equilibrium',
    'nuclear-physics':    'Nuclear Physics',
    'thermodynamics':     'Thermodynamics',
    'fluid-dynamics':     'Fluid Dynamics',
    'modern-physics':     'Modern Physics',
    'electronics':        'Electronics',
  },
  mdcat_english: {
    'vocabulary':          'Vocabulary and Lexical Aspects',
    'indirect-speech':     'Direct and Indirect Speech',
    'active-passive':      'Active and Passive Voice',
    'transitional-devices':'Transitional Devices',
    'sentence-inversion':  'Sentence Inversion',
    'reading-skills':      'Reading and Thinking Skills',
  },
  mdcat_logical_reasoning: {
    'critical-thinking': 'Critical Thinking',
    'letter-series':     'Letter and Symbol Series',
    'cause-effect':      'Cause and Effect',
    'course-of-action':  'Course of Action',
    'logical-problems':  'Logical Problems',
    'logical-deductions':'Logical Deductions',
  },
}

// ─── Tables that use 'topic' column instead of 'tags' array ──────────────────

export const TOPIC_COL_TABLES = new Set([
  'engineering_chemistry',
  'engineering_computer_science',
  'engineering_english',
  'engineering_intelligence',
  'engineering_mathematics',
  'engineering_physics',
  'mdcat_biology',
  'mdcat_chemistry',
  'mdcat_physics',
  'mdcat_english',
  'mdcat_logical_reasoning',
  'issb_english',
  'issb_mathematics',
  'issb_general_knowledge',
  'issb_pakistan_affairs',
  'issb_intelligence',
])

/** Returns the correct DB value for a topic slug. */
export function topicDbValue(slug: string, dbTable: string): string {
  return (
    ENGINEERING_TOPIC_VALUES[dbTable]?.[slug] ??
    MDCAT_TOPIC_VALUES[dbTable]?.[slug] ??
    slug
  )
}

/** True when the table uses a tags[] array (use .contains); false = topic string (use .eq). */
export function isTagArrayTable(dbTable: string): boolean {
  return !TOPIC_COL_TABLES.has(dbTable)
}

// ─── Tables that store difficulty as title case ───────────────────────────────

export const TITLE_CASE_DIFFICULTY_TABLES = new Set([
  'engineering_chemistry',
  'engineering_computer_science',
  'engineering_english',
  'engineering_intelligence',
  'engineering_mathematics',
  'engineering_physics',
  'mdcat_biology',
  'mdcat_chemistry',
  'mdcat_physics',
  'mdcat_english',
  'mdcat_logical_reasoning',
  'css_mcqs_enhanced',
])

export function difficultyDbValue(level: string, dbTable: string): string {
  if (TITLE_CASE_DIFFICULTY_TABLES.has(dbTable)) {
    return level.charAt(0).toUpperCase() + level.slice(1)
  }
  return level
}

// ─── Display labels ───────────────────────────────────────────────────────────

const LABEL_OVERRIDES: Record<string, string> = {
  // Acronyms / short-forms
  cpec: 'CPEC', sco: 'SCO', imf: 'IMF', ms_office: 'MS Office',
  // General Knowledge
  books_authors:          'Books & Authors',
  world_capitals:         'World Capitals',
  // Pakistan Studies
  constitutional_amendments: 'Constitutional Amendments',
  military_history:       'Military History',
  jinnah:                 'Quaid-e-Azam Jinnah',
  // English
  idioms_phrases:         'Idioms & Phrases',
  sentence_correction:    'Sentence Correction',
  synonyms_antonyms:      'Synonyms & Antonyms',
  one_word_substitution:  'One-Word Substitution',
  reading_comprehension:  'Reading Comprehension',
  fill_in_blanks:         'Fill in the Blanks',
  // Islamiat
  ibadat:                 'Ibadat',
  fiqh:                   'Fiqh',
  hadith:                 'Hadith',
  companions:             'Companions of the Prophet',
  khulafa_rashideen:      'Khulafa Rashideen',
  pillars_of_islam:       'Pillars of Islam',
  quran_studies:          'Quran Studies',
  prophet_biography:      'Prophet Biography',
  // Everyday Science
  periodic_table:         'Periodic Table',
  electricity:            'Electricity',
  optics:                 'Optics',
  nutrition_health:       'Nutrition & Health',
  physical_science:       'Physical Science',
  life_science:           'Life Science',
  earth_science:          'Earth Science',
  // Current Affairs
  kashmir:                'Kashmir',
  climate_change:         'Climate Change',
  afghanistan:            'Afghanistan',
  pakistan_economy:       'Pakistan Economy',
  international_organizations: 'International Organizations',
  pakistan_politics:      'Pakistan Politics',
  foreign_policy:         'Foreign Policy',
  china_pakistan:         'China-Pakistan Relations',
  // General Math
  time_distance_speed:    'Time, Distance & Speed',
  simple_compound_interest: 'Simple & Compound Interest',
  number_theory:          'Number Theory',
  ratio_proportion:       'Ratio & Proportion',
  time_work:              'Time & Work',
  profit_loss:            'Profit & Loss',
  // Geography
  south_asia:             'South Asia',
  world_oceans_seas:      'Oceans & Seas',
  middle_east:            'Middle East',
  world_geography:        'World Geography',
  mountains_peaks:        'Mountains & Peaks',
  rivers_lakes:           'Rivers & Lakes',
  physical_geography:     'Physical Geography',
  economic_geography:     'Economic Geography',
  political_geography:    'Political Geography',
  pakistan_geography:     'Pakistan Geography',
  // Ethics & Civics
  pakistan_constitution:  'Pakistan Constitution',
  ethics_theory:          'Ethics Theory',
  rule_of_law:            'Rule of Law',
  good_governance:        'Good Governance',
  fundamental_rights:     'Fundamental Rights',
  anti_corruption:        'Anti-Corruption',
  // Pakistan Studies
  pakistan_history:       'Pakistan History',
  political_history:      'Political History',
  provinces_geography:    'Provinces Geography',
  independence_movement:  'Independence Movement',
  founding_fathers:       'Founding Fathers',
  subcontinent_history:   'Subcontinent History',
  medieval_history:       'Medieval History',
  // General Knowledge
  world_facts:            'World Facts',
  world_affairs:          'World Affairs',
  world_history:          'World History',
  world_records:          'World Records',
  historical_events:      'Historical Events',
  world_currencies:       'World Currencies',
  // Urdu
  urdu_poetry:            'Urdu Poetry',
  urdu_grammar:           'Urdu Grammar',
  urdu_literature:        'Urdu Literature',
  urdu_prose:             'Urdu Prose',
  urdu_novel:             'Urdu Novel',
  urdu_history:           'History of Urdu',
  // Basic Computer
  computer_fundamentals:  'Computer Fundamentals',
  productivity_tools:     'Productivity Tools',
  system_software:        'System Software',
  // Engineering chemistry
  'aldehydes-ketones':      'Aldehydes & Ketones',
  'reaction-kinetics':      'Reaction Kinetics',
  'environmental-chemistry':'Environmental Chemistry',
  'organic-chemistry':      'Organic Chemistry',
  'chemical-equilibrium':   'Chemical Equilibrium',
  // Engineering physics
  'work-energy':              'Work & Energy',
  'electromagnetic-induction':'Electromagnetic Induction',
  'physics-of-solids':        'Physics of Solids',
  'circular-motion':          'Circular Motion',
  'heat-thermodynamics':      'Heat & Thermodynamics',
  'motion-force':             'Motion & Force',
  // Engineering math
  'partial-fractions':      'Partial Fractions',
  'trig-functions':         'Trigonometric Functions',
  'trig-identities':        'Trigonometric Identities',
  'permutation-combination':'Permutation & Combination',
  'trig-equations':         'Trigonometric Equations',
  'analytic-geometry':      'Analytic Geometry',
  'quadratic-equations':    'Quadratic Equations',
  // Engineering English
  'vocabulary-synonyms':    'Vocabulary & Synonyms',
  'grammar-parts-of-speech':'Grammar & Parts of Speech',
  'sentence-completion':    'Sentence Completion',
  // Engineering intelligence
  'coding-decoding':     'Coding & Decoding',
  'direction-sense':     'Direction Sense',
  'odd-one-out':         'Odd One Out',
  'analytical-reasoning':'Analytical Reasoning',
  'series-completion':   'Series Completion',
  'logical-problems':    'Logical Problems',
  // Engineering CS
  'data-communication':   'Data Communication',
  'programming-c':        'Programming in C',
  'it-basics':            'IT Basics',
  'network-security':     'Network Security',
  'information-networks': 'Information Networks',
  'computer-architecture':'Computer Architecture',
  'operating-systems':    'Operating Systems',
  // MDCAT Biology
  'coordination-control': 'Coordination & Control',
  'cell-structure':       'Cell Structure & Function',
  'support-movement':     'Support & Movement',
  // MDCAT Chemistry
  'fundamental-concepts': 'Fundamental Concepts',
  'chemical-bonding':     'Chemical Bonding',
  'atomic-structure':     'Atomic Structure',
  'organic-fundamentals': 'Organic Chemistry Basics',
  's-p-block':            'S & P Block Elements',
  // MDCAT Physics
  'force-motion':         'Force & Motion',
  'vectors-equilibrium':  'Vectors & Equilibrium',
  'nuclear-physics':      'Nuclear Physics',
  'fluid-dynamics':       'Fluid Dynamics',
  'modern-physics':       'Modern Physics',
  // MDCAT English
  'indirect-speech':      'Direct & Indirect Speech',
  'active-passive':       'Active & Passive Voice',
  'transitional-devices': 'Transitional Devices',
  'sentence-inversion':   'Sentence Inversion',
  'reading-skills':       'Reading & Thinking Skills',
  // MDCAT Logical Reasoning
  'critical-thinking':  'Critical Thinking',
  'letter-series':      'Letter & Symbol Series',
  'cause-effect':       'Cause & Effect',
  'course-of-action':   'Course of Action',
  'logical-deductions': 'Logical Deductions',
}

export function tagSlugToLabel(slug: string): string {
  return (
    LABEL_OVERRIDES[slug] ??
    slug.split(/[_-]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  )
}
