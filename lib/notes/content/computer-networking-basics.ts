import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - OSI 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application
 * - TCP reliable/connection-oriented; UDP unreliable/connectionless (classic teaching)
 * - Common ports: 80 HTTP, 443 HTTPS, 22 SSH, 25 SMTP, 53 DNS (also 21 FTP often tested)
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
    'OSI 7 layers (bottom to top): Physical, Data Link, Network, Transport, Session, Presentation, Application.',
    'Mnemonic: Please Do Not Throw Sausage Pizza Away.',
    'Network layer: logical addressing and routing (IP). Data Link: framing and MAC on a local link.',
    'Transport layer: end-to-end delivery. Classic map places TCP and UDP here.',
    'TCP: connection-oriented, reliable, ordered, heavier. UDP: connectionless, faster, no delivery guarantee.',
    'Ports: 80 HTTP, 443 HTTPS, 22 SSH, 25 SMTP, 53 DNS. Also high-yield: 21 FTP.',
    'IP: logical host address (can change with network). MAC: interface hardware / link-layer identity.',
    'TCP/IP teaching model: often 4 layers (Link, Internet, Transport, Application). Map to OSI only when asked.',
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
      text: '80 HTTP, 443 HTTPS, 22 SSH, 25 SMTP, 53 DNS, 21 FTP.',
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
    { prompt: 'OSI layer count?', answer: '7' },
    {
      prompt: 'OSI bottom to top?',
      answer: 'Physical, Data Link, Network, Transport, Session, Presentation, Application',
    },
    { prompt: 'IP addressing/routing layer?', answer: 'Network layer' },
    { prompt: 'MAC address layer?', answer: 'Data Link layer' },
    { prompt: 'TCP: oriented how?', answer: 'Connection-oriented' },
    { prompt: 'UDP reliability in MCQs?', answer: 'Unreliable (no delivery guarantee)' },
    { prompt: 'HTTP port?', answer: '80' },
    { prompt: 'HTTPS port?', answer: '443' },
    { prompt: 'SSH port?', answer: '22' },
    { prompt: 'SMTP port?', answer: '25' },
    { prompt: 'DNS port?', answer: '53' },
    { prompt: 'FTP port (classic MCQ)?', answer: '21' },
    {
      prompt: 'Which changes when you move networks (classic teaching)?',
      answer: 'IP (logical). MAC is interface/link identity.',
    },
    { prompt: 'Live streaming often mapped to?', answer: 'UDP (speed over guaranteed delivery)' },
    { prompt: 'Reliable file transfer mapped to?', answer: 'TCP' },
    { prompt: 'Common TCP/IP model layer count?', answer: '4' },
  ],
  mistakes: [
    {
      trap: 'Putting Application at the bottom of OSI.',
      correct: 'Physical is layer 1 (bottom). Application is layer 7 (top).',
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
      correct: 'MAC is Data Link / hardware interface. IP is Network-layer logical addressing.',
    },
    {
      trap: 'Putting SMTP on port 22.',
      correct: '22 is SSH. 25 is SMTP.',
    },
    {
      trap: 'Equating OSI 7 layers with TCP/IP 4 layers as identical names.',
      correct: 'They are related maps. Recite each model as taught; map only when asked.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise OSI 7 layers with mnemonic.' },
    { day: 'Day 2', task: 'TCP vs UDP contrast table.' },
    { day: 'Day 3', task: 'Ports 80, 443, 22, 25, 53, 21.' },
    { day: 'Day 4', task: 'IP vs MAC and layer mapping.' },
    { day: 'Day 5', task: 'TCP/IP 4-layer map vs OSI.' },
    { day: 'Day 6', task: 'Full flashcard drill.' },
    { day: 'Day 7', task: 'One-pager only. Recite layers and ports.' },
  ],
  sourcesLine:
    'Sources: standard computer networks textbooks and one-paper IT MCQ syllabi for OSI, TCP/IP, ports, and addressing. Prefer classic teaching pairs over vendor-specific exceptions.',
}
