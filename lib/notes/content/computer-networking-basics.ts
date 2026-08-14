import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - OSI 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application
 * - TCP reliable/connection-oriented; UDP unreliable/connectionless (classic teaching)
 * - Common ports: 80 HTTP, 443 HTTPS, 22 SSH, 25 SMTP, 53 DNS
 * - IP = logical network address; MAC = hardware/data-link address
 * - TCP/IP model often taught as 4 layers vs OSI 7
 */
export const COMPUTER_NETWORKING_BASICS_KIT: NoteKitData = {
  id: 'computer-networking-basics',
  title: 'Computer Networking Basics (OSI and TCP/IP)',
  subtitle:
    'OSI seven layers, TCP vs UDP, common ports, and IP vs MAC for classic one-paper computer MCQs.',
  syllabusTags: [
    'Basic computer',
    'Networking',
    'OSI model',
    'One-paper IT',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'OSI layers order and names',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'TCP vs UDP',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Common ports 80, 443, 22, 25, 53',
      frequency: 'high',
    },
    {
      year: 'FPSC / CSS MPT',
      directive: 'MCQ fact',
      angle: 'IP address vs MAC address',
      frequency: 'high',
    },
  ],
  onePager: [
    'OSI model has 7 layers (bottom to top): Physical, Data Link, Network, Transport, Session, Presentation, Application.',
    'Memory tip: Please Do Not Throw Sausage Pizza Away (Physical to Application).',
    'Network layer deals with logical addressing and routing (IP). Data Link deals with framing and MAC addresses on a local link.',
    'Transport layer: end-to-end delivery. TCP and UDP live here in the usual teaching map.',
    'TCP: connection-oriented, reliable, ordered delivery, heavier overhead. UDP: connectionless, faster, no reliability guarantee.',
    'Common ports: 80 HTTP, 443 HTTPS, 22 SSH, 25 SMTP (email sending), 53 DNS.',
    'IP address: logical address of a host on a network (can change with network). MAC address: hardware address of a network interface (burned-in / link-layer identity teaching).',
    'TCP/IP (Internet model) is often taught as 4 layers: Link, Internet, Transport, Application. Map it to OSI only when asked.',
  ],
  answerSteps: [
    'If OSI is asked, list all 7 layers in order first.',
    'Place the protocol or address type on the correct layer (IP/network, MAC/data link, TCP-UDP/transport).',
    'For TCP vs UDP, use reliable vs fast/unreliable teaching contrast.',
    'For ports, give number and service name together.',
    'Close with one example (web uses 80/443; DNS uses 53).',
  ],
  questionVariants: [
    'List the seven layers of the OSI model in order.',
    'Differentiate TCP and UDP.',
    'Match common port numbers with protocols.',
    'Distinguish IP address from MAC address.',
  ],
  citations: [
    {
      label: 'OSI layers',
      text: 'Physical, Data Link, Network, Transport, Session, Presentation, Application.',
    },
    {
      label: 'TCP vs UDP',
      text: 'TCP is connection-oriented and reliable. UDP is connectionless and does not guarantee delivery.',
    },
    {
      label: 'Ports',
      text: '80 HTTP, 443 HTTPS, 22 SSH, 25 SMTP, 53 DNS.',
    },
    {
      label: 'Addressing',
      text: 'IP is a logical network address. MAC is a link-layer / hardware interface address.',
    },
    {
      label: 'TCP/IP model',
      text: 'Often taught as four layers: Link, Internet, Transport, Application.',
    },
  ],
  flashcards: [
    { prompt: 'How many layers are in the OSI model?', answer: '7' },
    {
      prompt: 'OSI layers bottom to top?',
      answer: 'Physical, Data Link, Network, Transport, Session, Presentation, Application',
    },
    {
      prompt: 'Which OSI layer handles IP addressing/routing in classic teaching?',
      answer: 'Network layer',
    },
    {
      prompt: 'Which OSI layer is associated with MAC addresses?',
      answer: 'Data Link layer',
    },
    {
      prompt: 'TCP is connection-oriented or connectionless?',
      answer: 'Connection-oriented',
    },
    {
      prompt: 'UDP is reliable or unreliable in classic MCQs?',
      answer: 'Unreliable (no delivery guarantee)',
    },
    { prompt: 'Default HTTP port?', answer: '80' },
    { prompt: 'Default HTTPS port?', answer: '443' },
    { prompt: 'Default SSH port?', answer: '22' },
    { prompt: 'Default SMTP port?', answer: '25' },
    { prompt: 'Default DNS port?', answer: '53' },
    {
      prompt: 'Which address can change when you move networks: IP or MAC (classic teaching)?',
      answer: 'IP (logical); MAC is interface hardware/link identity',
    },
    {
      prompt: 'Which protocol suits live video streaming more often in MCQs: TCP or UDP?',
      answer: 'UDP (speed over guaranteed delivery)',
    },
    {
      prompt: 'Which protocol suits file transfer when reliability matters: TCP or UDP?',
      answer: 'TCP',
    },
    {
      prompt: 'How many layers in the common TCP/IP teaching model?',
      answer: '4',
    },
  ],
  mistakes: [
    {
      trap: 'Reversing OSI order (Application at the bottom).',
      correct: 'Physical is layer 1 at the bottom. Application is layer 7 at the top.',
    },
    {
      trap: 'Saying UDP is more reliable than TCP.',
      correct: 'TCP is the reliable, connection-oriented protocol in standard MCQs.',
    },
    {
      trap: 'Mixing port 53 with HTTP.',
      correct: '53 is DNS. 80 is HTTP. 443 is HTTPS.',
    },
    {
      trap: 'Calling MAC a Network-layer address.',
      correct: 'MAC is Data Link / hardware interface addressing. IP is Network-layer logical addressing.',
    },
    {
      trap: 'Putting SMTP on port 22.',
      correct: '22 is SSH. 25 is SMTP.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise OSI 7 layers with mnemonic.' },
    { day: 'Day 2', task: 'TCP vs UDP contrast table.' },
    { day: 'Day 3', task: 'Ports 80, 443, 22, 25, 53.' },
    { day: 'Day 4', task: 'IP vs MAC and layer mapping.' },
    { day: 'Day 5', task: 'TCP/IP 4-layer map vs OSI.' },
    { day: 'Day 6', task: 'Full flashcard drill.' },
    { day: 'Day 7', task: 'One-pager only. Recite layers and ports.' },
  ],
  sourcesLine:
    'Sources: standard computer networks textbooks and one-paper IT MCQ syllabi for OSI, TCP/IP, ports, and addressing. Prefer classic teaching pairs over vendor-specific exceptions.',
}
