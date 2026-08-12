/**
 * Deterministic pool IDs for static MCQ banks (web + mobile must match).
 * Banks live at /banks/v1/{poolId}/s/{n}.json + manifest.json
 */

export type BankPoolKey = {
  kind: 'mode' | 'difficulty' | 'topic' | 'mdcat'
  dbTable: string
  mode?: string | null
  noTypeFilter?: boolean
  subjectField?: string
  subjectFields?: string[]
  topicFields?: string[]
  questionNeedles?: string[]
  subtopicField?: string
  examSlug?: string
  targetExam?: string
  difficulty?: string
  tag?: string
  useTagsArray?: boolean
}

/** Stable serialize — key order fixed so web/mobile hash identically. */
export function serializeBankPoolKey(key: BankPoolKey): string {
  const parts = [
    key.kind,
    key.dbTable,
    key.mode ?? '',
    key.noTypeFilter ? '1' : '0',
    key.subjectField ?? '',
    (key.subjectFields ?? []).slice().sort().join('|'),
    (key.topicFields ?? []).slice().sort().join('|'),
    (key.questionNeedles ?? []).slice().sort().join('|'),
    key.subtopicField ?? '',
    key.examSlug ?? '',
    key.targetExam ?? '',
    key.difficulty?.toLowerCase() ?? "",
    key.tag ?? "",
    key.useTagsArray ? "1" : "0",
  ]
  return parts.join('\u001f')
}

/** FNV-1a 64-bit hex — sync, no Node/WebCrypto dependency (Hermes-safe). */
export function bankPoolId(key: BankPoolKey): string {
  const str = serializeBankPoolKey(key)
  let h = BigInt('0xcbf29ce484222325')
  const prime = BigInt('0x100000001b3')
  for (let i = 0; i < str.length; i++) {
    h ^= BigInt(str.charCodeAt(i))
    h = BigInt.asUintN(64, h * prime)
  }
  return h.toString(16).padStart(16, '0')
}

export const BANKS_VERSION = 'v1'

/** Pipeline banks need examSlug in the pool id; MDCAT/enhanced/etc. share one pool. */
const PIPELINE_BANK_TABLES = new Set([
  'english',
  'general_knowledge',
  'pakistan_studies',
  'islamiat',
  'current_affairs',
  'everyday_science',
  'general_math',
  'geography',
  'basic_computer',
  'urdu',
  'ethics',
])

/**
 * Map thin exam posts → one exported CDN hub (keeps Free Nano export tiny).
 * Must match mobile `src/lib/banks-pool.ts` + export `--hubs` set.
 */
const BANK_FAMILY_HUB: Record<string, string> = {
  fia: 'fia-assistant',
  ppsc: 'ppsc-assistant',
  fpsc: 'fpsc-general',
  kppsc: 'kppsc-general',
  spsc: 'spsc-general',
  bpsc: 'bpsc-general',
  ajkpsc: 'ajkpsc-general',
  gbpsc: 'gbpsc-general',
  nts: 'nts-general',
  ots: 'ots-general',
  etea: 'etea-general',
  police: 'police-asi',
  banking: 'banking-general',
  hec: 'nts-general',
  punjab: 'ppsc-assistant',
  kpk: 'etea-general',
  sindh: 'spsc-general',
  sts: 'spsc-general',
  ajk: 'ajkpsc-general',
  gb: 'gbpsc-general',
  balochistan: 'bpsc-general',
}

/** Resolve exam slug used inside static bank pool hashes. */
export function bankHubExamSlug(examSlug: string): string {
  if (examSlug === 'css' || examSlug === 'css-pms') return 'css-mpt'
  if (examSlug.startsWith('mdcat')) return examSlug
  const i = examSlug.indexOf('-')
  const prefix = i > 0 ? examSlug.slice(0, i) : examSlug
  return BANK_FAMILY_HUB[prefix] ?? examSlug
}

/** Only pipeline tables get examSlug in the pool hash (avoids 20k duplicate MDCAT pools). */
export function poolExamSlug(dbTable: string, examSlug?: string | null): string | undefined {
  if (!examSlug) return undefined
  if (!PIPELINE_BANK_TABLES.has(dbTable)) return undefined
  return bankHubExamSlug(examSlug)
}

export function banksBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_BANKS_BASE_URL ||
    process.env.EXPO_PUBLIC_BANKS_BASE_URL ||
    'https://imtehan.com/banks/v1'
  return raw.replace(/\/$/, '')
}

export function bankSetUrl(poolId: string, setNumber: number, base = banksBaseUrl()): string {
  return `${base}/${poolId}/s/${setNumber}.json`
}

export function bankManifestUrl(poolId: string, base = banksBaseUrl()): string {
  return `${base}/${poolId}/manifest.json`
}

export type BankManifest = {
  poolId: string
  total: number
  setCount: number
  setSize: number
  key: BankPoolKey
  generatedAt: string
}

export type BankSetFile = {
  poolId: string
  setNumber: number
  setSize: number
  mcqs: Array<{
    id: number
    question: string
    option_a: string
    option_b: string
    option_c: string
    option_d: string
    correct_answer: string
    explanation?: string
  }>
}
