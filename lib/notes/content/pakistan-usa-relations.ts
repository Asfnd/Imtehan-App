import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Cold War phase: SEATO/CENTO era alignment themes; aid and security cooperation with ups and downs
 * - 1980s: Afghanistan jihad period cooperation against Soviet occupation (high-yield)
 * - 1990s: Pressler-era sanctions / nuclear-related strain themes (name carefully)
 * - Post-9/11: major non-NATO ally period, counterterrorism cooperation, drone/trust deficits, and oscillating aid
 * - Do not invent secret treaty texts; keep phase narrative exam-safe and balanced
 */
export const PAKISTAN_USA_RELATIONS_KIT: NoteKitData = {
  id: 'pakistan-usa-relations',
  title: 'Pakistan-USA Relations',
  subtitle:
    'Cold War alignment, 1980s Afghanistan phase, sanctions decade, and post-9/11 cooperation and mistrust.',
  syllabusTags: [
    'Foreign policy',
    'Pakistan-USA relations',
    'Current affairs',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Evolution of Pakistan-USA relations',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Transactional nature of the relationship',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Cold War pacts; post-9/11 cooperation themes',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Convergence and divergence of interests after 2001',
      frequency: 'high',
    },
  ],
  onePager: [
    'Core pattern taught in exams: a transactional relationship driven by geopolitics, security, and aid, with repeated cycles of engagement and estrangement.',
    'Early Cold War: Pakistan leaned toward Western security arrangements (SEATO/CENTO era themes in syllabi). Cooperation brought military and economic aid; trust remained uneven.',
    '1965 and 1971 wars: US policy choices and arms issues created Pakistani grievances in standard narratives; relationship cooled at key moments.',
    '1980s: Soviet occupation of Afghanistan made Pakistan a frontline partner. Large aid and intelligence cooperation; long-term costs included militarisation and extremism spillover themes.',
    '1990s: nuclear-related sanctions and aid cuts (Pressler Amendment era teaching) strained ties after the Soviet withdrawal reduced Pakistan’s strategic value in US eyes.',
    'Post-9/11 (2001 onward): renewed partnership on counterterrorism and Afghanistan logistics; Pakistan designated a major non-NATO ally in this period’s teaching. Cooperation coexisted with mistrust over safe havens, drones, and sovereignty concerns.',
    'Later years: drawdown in Afghanistan, reduced aid centrality, and competition with China-Pakistan economic ties reshaped the agenda toward selective cooperation (security, economy, people-to-people) rather than a blank cheque alliance.',
    'Answer close: interests converge on counterterrorism and regional stability at times; they diverge on Afghanistan endgames, India factor perceptions, nuclear issues, and Pakistan’s China partnership. Mature policy needs diversification, not dependence.',
  ],
  answerSteps: [
    'Open with the transactional/geopolitical pattern.',
    'Phase the history: Cold War → 1980s Afghanistan → 1990s sanctions → post-9/11.',
    'For each phase, state US interest, Pakistani interest, and one friction point.',
    'Evaluate post-9/11 cooperation and trust deficits.',
    'Close with lessons: diversification, clarity of interests, and reduced aid dependence.',
  ],
  questionVariants: [
    'Discuss the evolution of Pakistan-United States relations since independence.',
    'Critically examine the transactional nature of Pakistan-USA relations.',
    'Evaluate Pakistan-USA relations in the post-9/11 period.',
    'How did the Afghan wars shape Pakistan-USA ties? Discuss.',
  ],
  citations: [
    {
      label: 'Cold War frame',
      text: 'Western alliance era themes (SEATO/CENTO teaching) with aid and security cooperation.',
    },
    {
      label: '1980s',
      text: 'Frontline partnership during Soviet occupation of Afghanistan; major aid and security cooperation.',
    },
    {
      label: '1990s',
      text: 'Nuclear-related sanctions / Pressler-era strain and reduced strategic priority after Soviet withdrawal.',
    },
    {
      label: 'Post-9/11',
      text: 'Counterterrorism partnership, logistics support themes, major non-NATO ally period teaching, and persistent trust deficits.',
    },
  ],
  flashcards: [
    {
      prompt: 'What pattern do exams often use for Pakistan-USA ties?',
      answer: 'Transactional cycles of engagement and estrangement',
    },
    {
      prompt: 'Name the Cold War alliance theme often cited for Pakistan.',
      answer: 'SEATO/CENTO era Western alignment',
    },
    {
      prompt: 'Why were the 1980s a high-cooperation decade?',
      answer: 'Soviet occupation of Afghanistan made Pakistan a frontline partner',
    },
    {
      prompt: 'What strained ties in the 1990s in standard teaching?',
      answer: 'Nuclear-related sanctions / Pressler-era aid cuts after reduced Cold War utility',
    },
    {
      prompt: 'What reopened major cooperation after 2001?',
      answer: 'Post-9/11 counterterrorism and Afghanistan-related partnership',
    },
    {
      prompt: 'What status is often mentioned for Pakistan in the post-9/11 phase?',
      answer: 'Major non-NATO ally (period teaching)',
    },
    {
      prompt: 'Name one post-9/11 friction theme.',
      answer: 'Trust deficits over safe havens, drones, or sovereignty concerns',
    },
    {
      prompt: 'How does China factor into later Pakistan-USA answers?',
      answer: 'Deepening Pakistan-China ties reshape US calculations and Pakistan’s options',
    },
    {
      prompt: 'What lesson closes a strong essay?',
      answer: 'Diversify partnerships; avoid aid dependence; clarify national interests',
    },
    {
      prompt: 'Should you invent secret treaty clauses?',
      answer: 'No; keep to phase interests and named public themes',
    },
  ],
  mistakes: [
    {
      trap: 'Calling the relationship a permanent alliance with no breaks.',
      correct: 'It has repeated engagement and estrangement cycles.',
    },
    {
      trap: 'Skipping the 1990s sanctions phase.',
      correct: 'Nuclear-related strain after the Cold War is a required middle chapter.',
    },
    {
      trap: 'Treating post-9/11 ties as only friendship or only hostility.',
      correct: 'Cooperation and mistrust existed together.',
    },
    {
      trap: 'Blaming only one side for every friction.',
      correct: 'Exam answers score better with interests of both states.',
    },
    {
      trap: 'Ignoring Afghanistan as a structural driver.',
      correct: '1980s and post-2001 phases are both Afghanistan-centred.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise four phases with one line each.' },
    { day: 'Day 2', task: 'Add interests and friction points per phase.' },
    { day: 'Day 3', task: 'Write a 10-minute post-9/11 evaluation.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Attempt transactional-nature critical essay outline.' },
    { day: 'Day 6', task: 'One-pager + China factor sentence.' },
    { day: 'Day 7', task: 'Recite timeline phases from memory.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan foreign-policy histories on US relations; Cold War alliance teaching; Pressler-era sanctions themes; post-9/11 counterterrorism partnership literature. Avoid conspiratorial or unsourced casualty claims.',
}
