/**
 * Handwriting / printed-page OCR for the Writing Coach.
 * Same technique as the mobile app (ScanSolve / grade-essay):
 * - Client downscales to 1536px JPEG q0.85 (Gemini 768px tile sweet spot)
 * - Server tries Gemini 2.5 Flash, then OpenRouter vision fallback
 * - Azure East Asia cannot call Gemini (location blocked) — OpenRouter VL is the live path
 * - Verbatim transcript so spelling mistakes survive for the examiner
 */

const GEMINI_URL = (model: string, key: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

export const ALLOWED_OCR_MIME = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif'] as const
export const MAX_IMAGE_B64 = 10_800_000 // ~8MB raw, same as mobile validateImage

/** Free OpenRouter vision models verified from the Azure origin (2026-08). Skip Google VL that inherit Gemini geo-blocks. */
export const DEFAULT_OPENROUTER_OCR_MODELS = [
  'nvidia/nemotron-nano-12b-v2-vl:free',
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
  'openrouter/free',
] as const

const OCR_PROMPT = `You are a professional OCR engine for photographed exam scripts (handwritten or typed CSS/PMS essays, precis, and long answers).

Read EVERY visible word in the image. Pages of lined notebooks, ruled paper, and phone photos are expected.

Rules:
- Transcribe verbatim. Keep the student's spelling, grammar, punctuation, capitalisation, and mistakes. Do not correct them.
- Preserve paragraph breaks. Join a word split only by a line wrap into one word. Keep a hyphen only if the original used one.
- Ignore: printed notebook lines, hole punches, fingers, page numbers, watermarks, and doodles in the margin.
- If a word is truly unreadable, write [illegible] in its place. Do not invent words.
- If the image has no readable writing, return empty text and a low confidence.
- English is expected. If Urdu or another script appears, transcribe it as written.
- Output ONLY JSON, no markdown: {"text":"full transcript","confidence":0-100}`

export function sanitizeOcrError(err: unknown): string {
  let s = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
  s = s.replace(/[?&]key=[^&\s"']+/gi, '')
  s = s.replace(/Bearer\s+\S+/gi, 'Bearer [redacted]')
  s = s.replace(/AIza[0-9A-Za-z_-]{10,}/g, '[redacted]')
  s = s.replace(/sk-or-v1-[A-Za-z0-9]+/g, '[redacted]')
  s = s.replace(/AQ\.[A-Za-z0-9._-]{10,}/g, '[redacted]')
  return s.replace(/\s+/g, ' ').trim().slice(0, 400)
}

function isGeminiUnusable(message: string): boolean {
  const m = message.toLowerCase()
  return (
    m.includes('user location is not supported') ||
    m.includes('failed_precondition') ||
    m.includes('api key not valid') ||
    m.includes('api_key_invalid')
  )
}

function geminiKeys(): string[] {
  const keys = [
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
    process.env.GEMINI_API_KEY_4,
    process.env.GEMINI_API_KEY_5,
    process.env.GEMINI_API_KEY_6,
  ].filter((k): k is string => !!k?.trim())
  return [...new Set(keys)]
}

function stripDataUrl(raw: string): { data: string; mime?: string } {
  const m = raw.trim().match(/^data:([^;]+);base64,(.+)$/i)
  if (m) return { mime: m[1].toLowerCase(), data: m[2].replace(/\s/g, '') }
  return { data: raw.replace(/\s/g, '') }
}

export function validateOcrImage(
  image: unknown,
  mimeType: unknown
): { ok: true; image: string; mime: string } | { ok: false; error: string } {
  if (!image || typeof image !== 'string') return { ok: false, error: 'No image provided.' }
  const stripped = stripDataUrl(image)
  const mimeRaw = (typeof mimeType === 'string' && mimeType ? mimeType : stripped.mime || 'image/jpeg').toLowerCase()
  const mime = mimeRaw === 'image/jpg' ? 'image/jpeg' : mimeRaw
  if (!ALLOWED_OCR_MIME.includes(mime as (typeof ALLOWED_OCR_MIME)[number])) {
    return { ok: false, error: 'Unsupported image format. Use a JPEG, PNG, or WebP photo.' }
  }
  if (stripped.data.length > MAX_IMAGE_B64) {
    return { ok: false, error: 'Image too large. Take a closer, clearer shot of one page.' }
  }
  if (stripped.data.length < 80) return { ok: false, error: 'Image data is empty.' }
  return { ok: true, image: stripped.data, mime }
}

function extractJson(text: string): { text: string; confidence: number } | null {
  const tryParse = (raw: string) => {
    try {
      const p = JSON.parse(raw) as { text?: unknown; transcript?: unknown; confidence?: unknown }
      const t = typeof p.text === 'string' ? p.text : typeof p.transcript === 'string' ? p.transcript : ''
      const c = typeof p.confidence === 'number' ? p.confidence : Number(p.confidence)
      return { text: t.trim(), confidence: Number.isFinite(c) ? Math.max(0, Math.min(100, Math.round(c))) : 70 }
    } catch {
      return null
    }
  }
  const direct = tryParse(text)
  if (direct) return direct
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fenced) {
    const inner = tryParse(fenced[1].trim())
    if (inner) return inner
  }
  const a = text.indexOf('{')
  const b = text.lastIndexOf('}')
  if (a >= 0 && b > a) {
    const inner = tryParse(text.slice(a, b + 1))
    if (inner) return inner
  }
  const plain = text.trim()
  if (plain.length > 20 && !plain.startsWith('{')) {
    return { text: plain.replace(/^["']|["']$/g, ''), confidence: 55 }
  }
  return null
}

function coerceTranscript(parsed: { text: string; confidence: number } | null): string {
  if (!parsed) return ''
  return parsed.text
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const GEMINI_ATTEMPT_MS = 8_000
const OPENROUTER_ATTEMPT_MS = 22_000

function attemptSignal(parent: AbortSignal, ms: number): AbortSignal {
  if (parent.aborted) return parent
  if (typeof AbortSignal.any === 'function' && typeof AbortSignal.timeout === 'function') {
    return AbortSignal.any([parent, AbortSignal.timeout(ms)])
  }
  return parent
}

async function callGemini(
  key: string,
  model: string,
  image: string,
  mime: string,
  signal: AbortSignal
): Promise<string> {
  const body = {
    contents: [
      {
        parts: [{ text: OCR_PROMPT }, { inline_data: { mime_type: mime, data: image } }],
      },
    ],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
  }
  const res = await fetch(GEMINI_URL(model, key), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: attemptSignal(signal, GEMINI_ATTEMPT_MS),
  })
  if (!res.ok) throw new Error(`gemini ${res.status}: ${(await res.text()).slice(0, 220)}`)
  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
  }
  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text ?? '').join('') ?? ''
  const parsed = extractJson(text)
  const out = coerceTranscript(parsed)
  if (!out) throw new Error('gemini returned empty transcript')
  return out
}

async function callOpenRouterVision(
  key: string,
  model: string,
  image: string,
  mime: string,
  signal: AbortSignal
): Promise<string> {
  const referer =
    process.env.OPENROUTER_HTTP_REFERER?.trim() ||
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    'https://imtehan.com'
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    signal: attemptSignal(signal, OPENROUTER_ATTEMPT_MS),
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': referer,
      'X-Title': 'Imtehan Writing Coach OCR',
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      max_tokens: 8192,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: OCR_PROMPT },
            { type: 'image_url', image_url: { url: `data:${mime};base64,${image}` } },
          ],
        },
      ],
    }),
  })
  if (!res.ok) throw new Error(`openrouter ${res.status}: ${(await res.text()).slice(0, 220)}`)
  const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> }
  const text = data?.choices?.[0]?.message?.content?.trim() ?? ''
  const parsed = extractJson(text)
  const out = coerceTranscript(parsed)
  if (!out) throw new Error('openrouter returned empty transcript')
  return out
}

export type ExtractHandwritingResult = {
  text: string
  provider: string
}

export function resolveOpenRouterOcrModels(): string[] {
  const override = process.env.OPENROUTER_OCR_MODEL?.trim()
  const extra = (process.env.OPENROUTER_OCR_MODEL_CHAIN ?? '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
  const merged = [override, ...extra, ...DEFAULT_OPENROUTER_OCR_MODELS].filter((m): m is string => !!m)
  return [...new Set(merged)]
}

async function tryGeminiChain(
  image: string,
  mime: string,
  signal: AbortSignal,
  errors: string[]
): Promise<ExtractHandwritingResult | null> {
  const keys = geminiKeys()
  if (!keys.length) return null
  const primary = process.env.GEMINI_MODEL?.trim() || 'gemini-2.5-flash'
  const lite = process.env.GEMINI_MODEL_FAST?.trim() || 'gemini-2.5-flash-lite'
  const geminiModels = primary === lite ? [primary] : [primary, lite]
  const start = Math.floor(Math.random() * keys.length)
  const maxKeyTries = Math.min(3, keys.length)

  for (const model of geminiModels) {
    for (let i = 0; i < maxKeyTries; i++) {
      if (signal.aborted) return null
      const key = keys[(start + i) % keys.length]
      try {
        const text = await callGemini(key, model, image, mime, signal)
        return { text, provider: `gemini:${model}` }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        errors.push(msg)
        if (isGeminiUnusable(msg)) return null
      }
    }
  }
  return null
}

async function tryOpenRouterChain(
  image: string,
  mime: string,
  signal: AbortSignal,
  errors: string[]
): Promise<ExtractHandwritingResult | null> {
  const orKey = process.env.OPENROUTER_API_KEY?.trim()
  if (!orKey) return null
  for (const model of resolveOpenRouterOcrModels()) {
    if (signal.aborted) return null
    try {
      const text = await callOpenRouterVision(orKey, model, image, mime, signal)
      return { text, provider: `openrouter:${model}` }
    } catch (e) {
      errors.push(e instanceof Error ? e.message : String(e))
    }
  }
  return null
}

/**
 * OCR one page. OpenRouter VL first (Azure East Asia cannot use Gemini), then Gemini.
 * Each attempt has its own timeout so one hung provider cannot abort the rest.
 */
export async function extractHandwritingFromImage(
  image: string,
  mime: string,
  signal: AbortSignal
): Promise<ExtractHandwritingResult> {
  const errors: string[] = []
  const preferGemini = process.env.OCR_PREFER_GEMINI === '1'

  const first = preferGemini
    ? await tryGeminiChain(image, mime, signal, errors)
    : await tryOpenRouterChain(image, mime, signal, errors)
  if (first) return first

  const second = preferGemini
    ? await tryOpenRouterChain(image, mime, signal, errors)
    : await tryGeminiChain(image, mime, signal, errors)
  if (second) return second

  throw new Error(
    errors.length
      ? `Could not read this page. ${sanitizeOcrError(errors[errors.length - 1] ?? '')}`.trim()
      : 'OCR is not configured. Set GEMINI_API_KEY or OPENROUTER_API_KEY.'
  )
}
