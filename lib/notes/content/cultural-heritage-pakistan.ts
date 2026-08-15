import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - UNESCO World Heritage Sites in Pakistan include: Archaeological Ruins at Moenjodaro; Taxila; Buddhist Ruins of Takht-i-Bahi and neighbouring city remains at Sahr-i-Bahlol; Fort and Shalamar Gardens in Lahore; Historical Monuments at Makli, Thatta; Rohtas Fort
 * - Soft power: culture, tourism, diaspora, cuisine, arts, sports diplomacy as influence tools
 * - Diversity: languages, regions, faith communities, crafts, music, cuisine
 * - Do not invent fake UNESCO list entries or claim every historic fort is a World Heritage Site
 */
export const CULTURAL_HERITAGE_PAKISTAN_KIT: NoteKitData = {
  id: 'cultural-heritage-pakistan',
  title: 'Cultural Heritage of Pakistan',
  subtitle:
    'Heritage sites, cultural diversity, and soft-power angles for CSS, PMS, and one-paper exams.',
  syllabusTags: [
    'Pakistan culture',
    'Heritage and tourism',
    'Soft power',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Cultural diversity of Pakistan as a strength',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Heritage tourism and soft power potential',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'UNESCO World Heritage Sites in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Preservation challenges versus development pressures',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Cultural heritage = tangible (monuments, archaeology, museums, crafts) + intangible (languages, music, festivals, cuisine, oral traditions, knowledge systems).',
    'High-yield UNESCO World Heritage Sites (Pakistan): Moenjodaro; Taxila; Takht-i-Bahi and Sahr-i-Bahlol; Fort and Shalamar Gardens (Lahore); Makli (Thatta); Rohtas Fort.',
    'Civilizational layers in exam answers: Indus Valley, Gandhara Buddhist heritage, Islamic sultanate and Mughal architecture, Sikh and colonial layers, and living regional cultures.',
    'Diversity angles: provinces and regions; languages and dialects; arts and crafts (truck art, embroidery, pottery); music and Sufi traditions; cuisine; minority cultural contributions.',
    'Soft power: attraction through culture, education, sports, diaspora networks, tourism branding, and positive media image rather than coercion.',
    'Problems: underfunded conservation, urban encroachment, illicit trafficking of antiquities, weak site management, security and tourism infrastructure gaps, and limited museum outreach.',
    'Policy line: protect sites under law, fund conservation, link heritage to local livelihoods, teach heritage in schools, and project a plural Pakistani cultural story abroad.',
    'Answer structure: define heritage → name sites carefully → diversity → soft power → challenges → reforms.',
  ],
  answerSteps: [
    'Define tangible and intangible heritage with Pakistan examples.',
    'Name 4 to 6 verified UNESCO sites without inventing extras.',
    'Show diversity as federal and civilizational richness, not only folklore.',
    'Link heritage to soft power and tourism economy.',
    'Close with conservation and governance reforms.',
  ],
  questionVariants: [
    'Discuss the cultural heritage of Pakistan and its importance for national identity.',
    'Evaluate Pakistan’s soft power potential through culture and heritage tourism.',
    'Critically examine challenges in preserving Pakistan’s archaeological and architectural heritage.',
    'Cultural diversity is Pakistan’s strength. Discuss.',
  ],
  citations: [
    {
      label: 'UNESCO sites (core list)',
      text: 'Moenjodaro; Taxila; Takht-i-Bahi and Sahr-i-Bahlol; Fort and Shalamar Gardens in Lahore; Makli (Thatta); Rohtas Fort.',
    },
    {
      label: 'Soft power',
      text: 'Influence through attraction: culture, values, education, sports, and diaspora, not force.',
    },
    {
      label: 'Heritage types',
      text: 'Tangible monuments and archaeology; intangible languages, rituals, crafts, and performing arts.',
    },
    {
      label: 'Exam caution',
      text: 'Do not invent World Heritage Site names. Prefer the standard named set above.',
    },
  ],
  flashcards: [
    {
      prompt: 'Name three UNESCO World Heritage Sites in Pakistan.',
      answer: 'Any three of: Moenjodaro, Taxila, Takht-i-Bahi, Lahore Fort and Shalamar Gardens, Makli, Rohtas',
    },
    {
      prompt: 'Where are the Fort and Shalamar Gardens World Heritage property?',
      answer: 'Lahore',
    },
    {
      prompt: 'Makli necropolis is associated with which city/region?',
      answer: 'Thatta (Sindh)',
    },
    {
      prompt: 'What is soft power in one line?',
      answer: 'Influence through attraction (culture, ideas, image) rather than coercion',
    },
    {
      prompt: 'Give one intangible heritage example from Pakistan.',
      answer: 'Sufi music traditions, languages, festivals, cuisine, or crafts',
    },
    {
      prompt: 'Moenjodaro belongs to which civilization layer?',
      answer: 'Indus Valley Civilization',
    },
    {
      prompt: 'Taxila and Takht-i-Bahi are especially linked to which heritage?',
      answer: 'Gandhara / Buddhist archaeological heritage',
    },
    {
      prompt: 'Name one major threat to heritage sites.',
      answer: 'Encroachment, underfunding, poor management, or illicit antiquities trade',
    },
    {
      prompt: 'Rohtas Fort is associated with which historical builder in standard teaching?',
      answer: 'Sher Shah Suri (exam-standard association)',
    },
    {
      prompt: 'Why does heritage matter for exams beyond tourism?',
      answer: 'Identity, soft power, federal diversity, and development narrative',
    },
  ],
  mistakes: [
    {
      trap: 'Inventing UNESCO sites not on Pakistan’s standard list.',
      correct: 'Stick to the verified named sites: Moenjodaro, Taxila, Takht-i-Bahi, Lahore Fort and Shalamar, Makli, Rohtas.',
    },
    {
      trap: 'Treating culture as only monuments.',
      correct: 'Include intangible heritage: language, music, crafts, cuisine, living traditions.',
    },
    {
      trap: 'Equating soft power with military strength.',
      correct: 'Soft power is attraction and persuasion through culture and reputation.',
    },
    {
      trap: 'Ignoring minority and regional cultural contributions.',
      correct: 'A strong answer shows plural regional and community cultures within one state.',
    },
    {
      trap: 'Saying heritage tourism needs no conservation funding.',
      correct: 'Tourism without conservation damages sites and long-term soft power.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise the six core UNESCO site names.' },
    { day: 'Day 2', task: 'Map tangible vs intangible with examples.' },
    { day: 'Day 3', task: 'Write a soft-power paragraph with tourism link.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Attempt critically examine on preservation challenges.' },
    { day: 'Day 6', task: 'One-pager + diversity section.' },
    { day: 'Day 7', task: 'Recite UNESCO list and reform points from memory.' },
  ],
  sourcesLine:
    'Sources: UNESCO World Heritage list for Pakistan (standard named properties); Pakistan Affairs culture chapters; tourism and soft-power discussion in current affairs essays. Avoid unverified viral heritage lists.',
}
