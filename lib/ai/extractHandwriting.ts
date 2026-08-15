/**
 * Handwriting / printed-page OCR for the Writing Coach.
 * Same technique as the mobile app (ScanSolve / grade-essay):
 * - Client downscales to 1536px JPEG q0.85 (Gemini 768px tile sweet spot)
 * - Server sends the image to Gemini 2.5 Flash, then OpenRouter vision fallback
 * - Verbatim transcript so spelling mistakes survive for the examiner
 */

const GEMINI_URL = (model: string, key: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

export const ALLOWED_OCR_MIME = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif'] as const
export const MAX_IMAGE_B64 = 10_800_000 // ~8MB raw, same as mobile validateImage

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
    signal,
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
    signal,
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

/**
 * OCR one page. Tries Gemini keys (Flash then Flash-Lite) then OpenRouter vision.
 */
export async function extractHandwritingFromImage(
  image: string,
  mime: string,
  signal: AbortSignal
): Promise<ExtractHandwritingResult> {
  const errors: string[] = []
  const keys = geminiKeys()
  const primary = process.env.GEMINI_MODEL?.trim() || 'gemini-2.5-flash'
  const lite = process.env.GEMINI_MODEL_FAST?.trim() || 'gemini-2.5-flash-lite'
  const start = keys.length ? Math.floor(Math.random() * keys.length) : 0
  const maxTries = Math.min(3, keys.length)

  for (let i = 0; i < maxTries; i++) {
    const key = keys[(start + i) % keys.length]
    const model = i === maxTries - 1 ? lite : primary
    try {
      const text = await callGemini(key, model, image, mime, signal)
      return { text, provider: `gemini:${model}` }
    } catch (e) {
      errors.push(e instanceof Error ? e.message : String(e))
    }
  }

  const orKey = process.env.OPENROUTER_API_KEY?.trim()
  if (orKey) {
    const visionModels = [
      process.env.OPENROUTER_OCR_MODEL?.trim(),
      'google/gemini-2.5-flash:free',
      'meta-llama/llama-4-maverick:free',
      'google/gemma-3-27b-it:free',
    ].filter((m): m is string => !!m)
    for (const model of visionModels) {
      try {
        const text = await callOpenRouterVision(orKey, model, image, mime, signal)
        return { text, provider: `openrouter:${model}` }
      } catch (e) {
        errors.push(e instanceof Error ? e.message : String(e))
      }
    }
  }

  throw new Error(
    errors.length
      ? `Could not read this page. ${errors[errors.length - 1] ?? ''}`.trim()
      : 'OCR is not configured. Set GEMINI_API_KEY or OPENROUTER_API_KEY.'
  )
}
