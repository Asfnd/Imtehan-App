import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (standard one-paper basic computer / IT teaching):
 * - Malware types: virus, worm, trojan, ransomware, spyware, adware (classic distinctions)
 * - Phishing: social engineering via fake messages to steal credentials
 * - Encryption: plaintext to ciphertext; symmetric vs asymmetric at concept level
 * - Firewall: filters traffic by rules between networks/hosts
 * Defensive awareness only; no attack how-tos or exploit steps
 */
export const CYBER_SECURITY_BASICS_EXAM_KIT: NoteKitData = {
  id: 'cyber-security-basics-exam',
  title: 'Cyber Security Basics for Computer Papers',
  subtitle:
    'Malware types, phishing, encryption, and firewalls for one-paper IT and basic computer MCQs.',
  syllabusTags: [
    'Basic computer',
    'Cyber security',
    'IT awareness',
    'One-paper exams',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Virus vs worm vs trojan',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Phishing and social engineering',
      frequency: 'high',
    },
    {
      year: 'FPSC / CSS MPT pattern',
      directive: 'MCQ fact',
      angle: 'Encryption and firewall purpose',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Ransomware and spyware definitions',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Cyber security protects confidentiality, integrity, and availability of data and systems (CIA triad teaching).',
    'Malware: malicious software. Virus attaches to files and needs a host/user action in classic teaching. Worm spreads across networks more autonomously. Trojan disguises as useful software.',
    'Ransomware locks or encrypts data and demands payment. Spyware secretly gathers information. Adware pushes unwanted ads (often less severe but still unwanted).',
    'Phishing: fraudulent messages (email/SMS/web) that trick users into revealing passwords or installing malware. Spear phishing targets specific people/orgs in advanced notes.',
    'Encryption: converts readable plaintext into ciphertext. Decryption reverses with the correct key. Symmetric: same key. Asymmetric: public/private key pair (concept level).',
    'HTTPS uses encryption for web traffic in everyday teaching. Passwords should be strong and not reused; multi-factor authentication adds a second check.',
    'Firewall: hardware or software that allows or blocks traffic based on rules. It is a filter, not a complete security solution alone.',
    'Safe habits for exams: update software, avoid unknown links/attachments, use antivirus, backup data, verify URLs before login.',
  ],
  answerSteps: [
    'If malware type is asked, use the classic distinction (virus/worm/trojan/ransomware).',
    'For phishing, stress deception and credential theft, not technical exploit steps.',
    'For encryption, state plaintext/ciphertext and key idea; add symmetric vs asymmetric only if needed.',
    'For firewall, say rule-based traffic filtering between networks.',
    'Close MCQs by eliminating options that confuse antivirus with firewall or phishing with spam only.',
  ],
  questionVariants: [
    'Differentiate virus, worm, and trojan.',
    'What is phishing? How can users reduce risk?',
    'Explain encryption and the difference between symmetric and asymmetric keys at basic level.',
    'What is the function of a firewall?',
  ],
  citations: [
    {
      label: 'CIA triad',
      text: 'Confidentiality, integrity, and availability are core security goals in teaching.',
    },
    {
      label: 'Malware map',
      text: 'Virus needs host/action; worm spreads on networks; trojan pretends to be useful.',
    },
    {
      label: 'Phishing',
      text: 'Fraudulent messages trick users into giving credentials or installing malware.',
    },
    {
      label: 'Firewall',
      text: 'Filters network traffic according to configured rules.',
    },
  ],
  flashcards: [
    {
      prompt: 'What does CIA stand for in security teaching?',
      answer: 'Confidentiality, Integrity, Availability',
    },
    {
      prompt: 'Virus vs worm (classic exam contrast)?',
      answer: 'Virus needs a host/user action; worm spreads more autonomously on networks',
    },
    {
      prompt: 'What is a trojan?',
      answer: 'Malware disguised as legitimate useful software',
    },
    {
      prompt: 'What does ransomware do?',
      answer: 'Locks or encrypts data and demands payment',
    },
    {
      prompt: 'Define phishing.',
      answer: 'Deceptive messages to steal credentials or deliver malware',
    },
    {
      prompt: 'Plaintext vs ciphertext?',
      answer: 'Readable data vs encrypted unreadable form',
    },
    {
      prompt: 'Symmetric vs asymmetric encryption?',
      answer: 'Same key vs public/private key pair',
    },
    {
      prompt: 'What does a firewall do?',
      answer: 'Allows or blocks traffic based on rules',
    },
    {
      prompt: 'Is a firewall enough alone?',
      answer: 'No; it is one layer among many controls',
    },
    {
      prompt: 'Name three user-level defences.',
      answer: 'Updates, caution with links, backups (plus antivirus/MFA themes)',
    },
  ],
  mistakes: [
    {
      trap: 'Calling every malware a virus.',
      correct: 'Use the specific type asked (worm, trojan, ransomware).',
    },
    {
      trap: 'Equating phishing with ordinary spam.',
      correct: 'Phishing aims to deceive and steal or infect.',
    },
    {
      trap: 'Saying firewall encrypts data.',
      correct: 'Firewall filters traffic; encryption transforms data.',
    },
    {
      trap: 'Writing attack recipes.',
      correct: 'Stay with defensive definitions for exams.',
    },
    {
      trap: 'Forgetting CIA triad when asked broadly.',
      correct: 'Open with confidentiality, integrity, availability.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'CIA + malware type table.' },
    { day: 'Day 2', task: 'Phishing and safe habits.' },
    { day: 'Day 3', task: 'Encryption and HTTPS one-liners.' },
    { day: 'Day 4', task: 'Firewall vs antivirus contrast.' },
    { day: 'Day 5', task: 'Flashcards.' },
    { day: 'Day 6', task: '20 mixed MCQs from past one-papers.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard basic computer and IT awareness syllabi on malware, phishing, encryption, and firewalls. Defensive definitions only; no attack procedures.',
}
