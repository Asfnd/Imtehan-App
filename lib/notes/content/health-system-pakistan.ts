import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Lady Health Workers (LHW) programme: community outreach for maternal and child health, family planning, immunisation support, and basic preventive care at household level (name-level facts)
 * - Primary health care: BHUs, RHCs as common exam acronyms for basic / rural health facilities
 * - SDG 3: Ensure healthy lives and promote well-being for all at all ages
 * - Do not invent precise 2026 mortality rates; use challenge language and frameworks
 */
export const HEALTH_SYSTEM_PAKISTAN_KIT: NoteKitData = {
  id: 'health-system-pakistan',
  title: 'Health System of Pakistan',
  subtitle:
    'Primary care, Lady Health Workers, provincial delivery, and SDG 3 for CSS/PMS answers.',
  syllabusTags: [
    'Health policy',
    'Social development',
    'SDG 3',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Problems of the health sector in Pakistan and reforms',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Primary health care and Lady Health Workers',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'LHW programme role; SDG 3',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Public vs private health delivery and equity',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Health system layers in exam teaching: primary (BHU/RHC and community outreach), secondary (tehsil/district hospitals), tertiary (teaching hospitals and specialised care).',
    'After the 18th Amendment era teaching frame, health delivery is largely a provincial subject, with federal roles in regulation, coordination, financing instruments, and national programmes.',
    'Lady Health Workers (LHWs): community-based female workers linking households to the formal system for maternal and child health, family planning counselling, nutrition and hygiene messages, and support for immunisation and referrals.',
    'SDG 3: Ensure healthy lives and promote well-being for all at all ages. Pakistan answers should link maternal/child health, communicable and non-communicable disease, and universal health coverage themes to SDG 3.',
    'Persistent challenges: underfunding, uneven rural access, workforce shortages and absenteeism, medicine and equipment gaps, out-of-pocket spending, weak referral chains, and double burden of disease (infectious + NCDs).',
    'Private sector is large in outpatient care; quality and regulation vary. Public sector remains critical for the poor and for preventive programmes.',
    'Reform pillars: strengthen primary care and LHWs; finance and insurance/social protection tools carefully; regulate private quality; digital records and supply chains; focus on women, children, and rural districts; pandemic preparedness lessons.',
    'Do not invent a single national doctor-population or IMR figure for 2026 unless you cite a named source. Prefer problem structure and policy logic.',
  ],
  answerSteps: [
    'Define the three-tier care model and provincial delivery context.',
    'Explain LHWs as the community bridge for primary and preventive care.',
    'Link challenges to equity and SDG 3.',
    'Propose reforms mapped to primary care, workforce, financing, and regulation.',
    'Close with implementation: budgets, governance, and women’s health access.',
  ],
  questionVariants: [
    'Discuss the health system of Pakistan and major challenges to service delivery.',
    'Evaluate the role of Lady Health Workers in primary health care.',
    'Critically examine public and private roles in Pakistan’s health sector.',
    'How can Pakistan progress on SDG 3? Suggest a policy roadmap.',
  ],
  citations: [
    {
      label: 'LHW programme',
      text: 'Community outreach for maternal and child health, family planning, preventive messages, and referral support at household level.',
    },
    {
      label: 'Primary facilities',
      text: 'BHU (Basic Health Unit) and RHC (Rural Health Centre) are standard primary-care acronyms in Pakistan Affairs teaching.',
    },
    {
      label: 'SDG 3',
      text: 'Ensure healthy lives and promote well-being for all at all ages.',
    },
    {
      label: 'Governance note',
      text: 'Health delivery is largely provincial in post-18th Amendment exam framing, with federal coordination and programme roles.',
    },
  ],
  flashcards: [
    {
      prompt: 'What does SDG 3 aim for?',
      answer: 'Healthy lives and well-being for all at all ages',
    },
    {
      prompt: 'What do LHWs mainly do?',
      answer: 'Community maternal/child health, family planning support, preventive messages, and referrals',
    },
    {
      prompt: 'Expand BHU and RHC.',
      answer: 'Basic Health Unit; Rural Health Centre',
    },
    {
      prompt: 'Name the three care levels taught in exams.',
      answer: 'Primary, secondary, tertiary',
    },
    {
      prompt: 'Who mainly delivers health services after devolution teaching?',
      answer: 'Provinces (with federal coordination roles)',
    },
    {
      prompt: 'Name one major financing problem for households.',
      answer: 'High out-of-pocket spending',
    },
    {
      prompt: 'What is the double burden of disease?',
      answer: 'Infectious diseases plus rising non-communicable diseases',
    },
    {
      prompt: 'Why are LHWs exam-high-yield?',
      answer: 'They are the named community workforce for primary and preventive care',
    },
    {
      prompt: 'Name one reform focus for equity.',
      answer: 'Rural access, women’s health, regulation of private quality, or stronger primary care',
    },
    {
      prompt: 'Should you invent exact 2026 IMR figures from memory?',
      answer: 'No; use frameworks unless citing a named source',
    },
  ],
  mistakes: [
    {
      trap: 'Confusing LHWs with doctors in tertiary hospitals.',
      correct: 'LHWs are community outreach workers supporting primary and preventive care, not tertiary specialists.',
    },
    {
      trap: 'Ignoring provincial responsibility after the 18th Amendment teaching frame.',
      correct: 'Delivery is largely provincial; federal roles are coordination, regulation, and national programmes.',
    },
    {
      trap: 'Treating SDG 3 as only hospital construction.',
      correct: 'SDG 3 covers healthy lives broadly: prevention, maternal/child health, UHC themes, and well-being.',
    },
    {
      trap: 'Claiming the private sector needs no regulation.',
      correct: 'Private care is large; quality and price regulation matter for equity.',
    },
    {
      trap: 'Inventing precise mortality statistics without a source.',
      correct: 'Exams reward structure and named programmes more than fake decimals.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Learn tiers: primary, secondary, tertiary + BHU/RHC.' },
    { day: 'Day 2', task: 'Memorise LHW roles and SDG 3 text.' },
    { day: 'Day 3', task: 'List five health-sector problems with reforms.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Write 10-minute answer on LHWs and primary care.' },
    { day: 'Day 6', task: 'One-pager + SDG 3 link.' },
    { day: 'Day 7', task: 'Recite programme names and reform pillars from memory.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan health-system teaching (BHU/RHC/LHW); UN SDG 3 wording; provincial health delivery framing after the 18th Amendment. Avoid unsourced WhatsApp health statistics.',
}
