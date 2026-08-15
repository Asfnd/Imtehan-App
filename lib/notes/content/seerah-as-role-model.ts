import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (standard Islamiat Seerah ethics teaching):
 * - Leadership ethics from Seerah: honesty, justice, consultation, mercy, patience, covenant-keeping
 * - Madinan governance themes at concept level: Charter/Constitution of Madinah as coexistence teaching; shura
 * Avoid inventing weak narrations; keep classical well-known episodes at exam-safe level
 */
export const SEERAH_AS_ROLE_MODEL_KIT: NoteKitData = {
  id: 'seerah-as-role-model',
  title: 'Seerah as a Role Model (Ethics and Leadership)',
  subtitle:
    'Prophetic ethics for leadership: justice, shura, mercy, honesty, and public trust for Islamiat essays.',
  syllabusTags: [
    'Seerah',
    'Islamic ethics',
    'Leadership',
    'Islamiat',
    'Role model',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS Islamiat',
      directive: 'Discuss',
      angle: 'Prophet as a role model for humanity / leadership',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Evaluate',
      angle: 'Justice and mercy in the Seerah',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Explain',
      angle: 'Shura and ethical governance from Seerah',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'Short',
      angle: 'Honesty (Al-Amin) and trustworthiness themes',
      frequency: 'high',
    },
  ],
  onePager: [
    'Seerah as role model means extracting ethical patterns from the life of the Prophet (peace be upon him) for personal conduct and public leadership. Exams reward virtues with brief episode hooks, not long storytelling.',
    'Honesty and trust: pre-Prophethood reputation as Al-Amin (the trustworthy) is a classic opener for integrity in public office.',
    'Justice: fair dealing with friend and foe themes; rule of law over favouritism. Use justice as a governance value, not as a partisan slogan.',
    'Mercy and forbearance: patience under persecution in Makkah; general amnesty spirit at the Conquest of Makkah in standard teaching as mercy over revenge.',
    'Consultation (shura): seeking counsel in community decisions (Madinan period teaching). Link to inclusive decision-making and accountability of leaders.',
    'Covenant-keeping and coexistence: agreements and the Madinan constitutional / charter teaching as a model of plural civic order under clear rights and duties. Keep at concept level.',
    'Servant leadership: humility, accessibility, and care for the weak, orphans, and poor. Leadership is trust (amanah), not privilege.',
    'Answer method: define role-model claim; pick 4-5 virtues; attach one Seerah hook each; apply to modern civil service ethics (integrity, justice, public welfare); close with character as public trust.',
  ],
  answerSteps: [
    'State Seerah as ethical and leadership guidance for humanity.',
    'Develop honesty/trust (Al-Amin) and justice.',
    'Add mercy (including Conquest of Makkah teaching) and patience.',
    'Explain shura and amanah as leadership methods.',
    'Apply to contemporary ethics of public service carefully.',
    'Conclude that character and justice outrank mere power.',
  ],
  questionVariants: [
    'Discuss the Prophet (PBUH) as a role model for ethical leadership.',
    'Evaluate justice and mercy as twin lessons of the Seerah.',
    'How does shura in the Seerah inform good governance?',
    'Explain amanah and integrity for public servants in light of Seerah.',
  ],
  citations: [
    {
      label: 'Integrity',
      text: 'Al-Amin reputation as classic honesty/trust teaching point.',
    },
    {
      label: 'Mercy',
      text: 'Conquest of Makkah amnesty spirit as standard mercy-over-revenge teaching.',
    },
    {
      label: 'Shura',
      text: 'Consultation in community decisions in Madinan governance teaching.',
    },
    {
      label: 'Public trust',
      text: 'Leadership as amanah; care for the vulnerable.',
    },
  ],
  flashcards: [
    {
      prompt: 'What does Al-Amin emphasise?',
      answer: 'Trustworthiness and honesty',
    },
    {
      prompt: 'Name four leadership virtues from Seerah teaching.',
      answer: 'Honesty, justice, mercy, shura (or patience, amanah)',
    },
    {
      prompt: 'What Conquest of Makkah lesson is commonly taught?',
      answer: 'Mercy and general amnesty spirit over revenge',
    },
    {
      prompt: 'What is shura?',
      answer: 'Consultation in decision-making',
    },
    {
      prompt: 'What is amanah in leadership?',
      answer: 'Public office as a trust, not a privilege',
    },
    {
      prompt: 'Madinan charter teaching point?',
      answer: 'Plural coexistence with rights and duties at concept level',
    },
    {
      prompt: 'How should Seerah essays avoid failure?',
      answer: 'Virtues + short hooks + modern application; not endless narrative',
    },
    {
      prompt: 'Name a Makkah-period ethical theme.',
      answer: 'Patience under persecution',
    },
    {
      prompt: 'Civil service bridge?',
      answer: 'Integrity, justice, and welfare of the weak',
    },
    {
      prompt: 'Should weak unverified stories be invented?',
      answer: 'No; use well-known exam-safe episodes',
    },
  ],
  mistakes: [
    {
      trap: 'Writing only biography without ethical extraction.',
      correct: 'Organise by virtues and apply to leadership.',
    },
    {
      trap: 'Inventing detailed weak narrations.',
      correct: 'Use classical well-known teaching points.',
    },
    {
      trap: 'Turning Seerah into partisan politics.',
      correct: 'Keep universal ethics: justice, mercy, honesty, shura.',
    },
    {
      trap: 'Ignoring modern application.',
      correct: 'Close with public trust and civil service ethics.',
    },
    {
      trap: 'Mercy without justice, or justice without mercy.',
      correct: 'Present them as complementary leadership qualities.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Al-Amin, justice, amanah one-liners.' },
    { day: 'Day 2', task: 'Mercy and Conquest of Makkah hook.' },
    { day: 'Day 3', task: 'Shura and Madinan coexistence concepts.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Civil service ethics bridge paragraph.' },
    { day: 'Day 6', task: '10-minute role-model essay outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Islamiat Seerah ethics notes on Al-Amin, justice, mercy, shura, and Madinan governance concepts. Avoid weak invented narrations.',
}
