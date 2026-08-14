import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Agriculture remains a core pillar of Pakistan's economy: employment, food security, rural livelihoods, and raw material for agro-industry
 * - Major crops commonly tested: wheat, rice, cotton, sugarcane (plus maize and horticulture in broader answers)
 * - Water-agriculture link: Indus basin irrigation, canal system, storage stress, and inefficient water use
 * - Challenges: water scarcity, climate shocks, low productivity, land and tenure issues, input costs, marketing and storage gaps
 * Avoid inventing fake exact GDP shares for the exam year unless citing a named official survey year
 */
export const AGRICULTURE_PAKISTAN_KIT: NoteKitData = {
  id: 'agriculture-pakistan',
  title: 'Agriculture in Pakistan',
  subtitle:
    'Economic importance, major crops, Indus irrigation link, and structural challenges for CSS and PMS answers.',
  syllabusTags: [
    'Pakistan economy',
    'Agriculture',
    'Rural development',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Importance of agriculture in Pakistan\'s economy',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Problems of agriculture and possible reforms',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Water management and agricultural productivity',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Major crops: wheat, rice, cotton, sugarcane',
      frequency: 'high',
    },
  ],
  onePager: [
    'Agriculture is central to food security, rural employment, and agro-based industry in Pakistan. Speak of relative importance carefully; do not invent a precise GDP percentage for the current year without a named source.',
    'Major field crops repeatedly tested: wheat (staple food), rice (food and export crop), cotton (textile raw material), sugarcane (sugar industry). Maize and horticulture strengthen diversification answers.',
    'Irrigation depends heavily on the Indus basin canal system plus groundwater (tube wells). Storage limits and inefficient use raise water stress for crops.',
    'Water-agriculture link is exam gold: scarcity, timing of canal water, floods and droughts, salinity and waterlogging in some zones.',
    'Structural challenges: fragmented holdings, outdated practices in many areas, costly inputs, weak research-extension reach, post-harvest losses, and marketing/storage gaps.',
    'Climate stress (heat, erratic monsoon, floods) hits yields and rural incomes. Link to disaster and climate policy when the question invites it.',
    'Reform angle for essays: water productivity, seed and research, value chains, storage and markets, climate-smart practices, and rural credit without slogan dumping.',
  ],
  answerSteps: [
    'Open with agriculture as a livelihood and food-security pillar, not only a GDP line.',
    'Name major crops and map each to food, export, or industry (especially cotton-textiles).',
    'Explain Indus irrigation and why water timing and efficiency matter.',
    'List 4 to 5 structural challenges with one line of evidence each.',
    'Add climate and flood or drought shocks as a modern pressure layer.',
    'Close with reform priorities that match the question directive (discuss vs critically examine).',
  ],
  questionVariants: [
    'Discuss the importance of agriculture in the economy of Pakistan.',
    'Critically examine the major problems facing Pakistan\'s agriculture sector.',
    'Evaluate the relationship between water resources and agricultural productivity in Pakistan.',
    'How can agricultural productivity be improved in Pakistan? Discuss with reforms.',
  ],
  citations: [
    {
      label: 'Role',
      text: 'Agriculture underpins food security, rural employment, and agro-industry (especially textiles via cotton).',
    },
    {
      label: 'Major crops',
      text: 'Wheat, rice, cotton, and sugarcane are the classic high-yield crop set in one-paper and essay answers.',
    },
    {
      label: 'Irrigation base',
      text: 'Indus basin canal irrigation plus groundwater (tube wells) sustain most irrigated farming.',
    },
    {
      label: 'Water stress',
      text: 'Limited storage, inefficient use, salinity/waterlogging, and climate extremes raise agricultural water risk.',
    },
    {
      label: 'Reform themes',
      text: 'Water productivity, research and seeds, markets and storage, and climate-smart farming are standard reform axes.',
    },
  ],
  flashcards: [
    { prompt: 'Name four major crops of Pakistan.', answer: 'Wheat, rice, cotton, sugarcane' },
    { prompt: 'Which crop is most tightly linked to the textile industry?', answer: 'Cotton' },
    { prompt: 'What basin irrigates most of Pakistan\'s farmland?', answer: 'Indus basin' },
    { prompt: 'Name one groundwater irrigation tool.', answer: 'Tube wells' },
    {
      prompt: 'Name two water-related farm problems.',
      answer: 'Scarcity/inefficient use; salinity or waterlogging (any accurate pair)',
    },
    {
      prompt: 'Why is agriculture exam-important beyond GDP?',
      answer: 'Food security, rural jobs, and agro-industry linkages',
    },
    {
      prompt: 'Name one climate shock that hits crops.',
      answer: 'Floods, drought, heat stress, or erratic monsoon',
    },
    {
      prompt: 'What is a post-harvest problem often cited?',
      answer: 'Storage and marketing losses / weak value chains',
    },
    {
      prompt: 'What reform idea links water and yield?',
      answer: 'Raise water productivity (efficient irrigation and timing)',
    },
    {
      prompt: 'Trap: inventing an exact current GDP share without a source.',
      answer: 'Avoid. Speak relatively or cite a named survey year.',
    },
  ],
  mistakes: [
    {
      trap: 'Writing a fake precise GDP percentage for agriculture as if it never changes.',
      correct: 'Use relative language or cite a named official year/source. Trends matter more than invented decimals.',
    },
    {
      trap: 'Listing crops without linking cotton to textiles or wheat to food security.',
      correct: 'Map crops to economic roles. Linkages score marks.',
    },
    {
      trap: 'Discussing agriculture without the Indus irrigation system.',
      correct: 'Water-agriculture is a core Pakistan Affairs and geography link.',
    },
    {
      trap: 'Dumping only problems with no reform path when the question asks critically examine.',
      correct: 'Balance diagnosis with feasible reforms matching the directive.',
    },
    {
      trap: 'Treating tube wells as unlimited safe water.',
      correct: 'Groundwater helps, but over-extraction and energy cost are real constraints.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read overview: role, crops, irrigation.' },
    { day: 'Day 2', task: 'Memorise major crops and Indus water link.' },
    { day: 'Day 3', task: 'Write a 10-minute outline on agricultural problems.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Attempt water-productivity critically examine outline.' },
    { day: 'Day 6', task: 'One-pager + citations. Practice MCQs.' },
    { day: 'Day 7', task: 'One-pager only. Recite crops and reform axes from memory.' },
  ],
  sourcesLine:
    'Sources: Pakistan Economic Survey agriculture chapters (use named year when quoting shares); Indus basin irrigation basics; FPSC Pakistan Affairs and economy syllabus items. Avoid WhatsApp GDP myths.',
}
