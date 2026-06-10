/**
 * Writing-coach grading: **OpenRouter only**, using **free** models (zero $ prompt/completion).
 * Chain = most capable free models first; first success wins.
 *
 * Override (comma-separated model IDs):
 * - `OPENROUTER_MODEL_CHAIN_CSS`: CSS Writing Coach (`/css/essay-grader`, examType css)
 * - `OPENROUTER_MODEL_CHAIN_PMS`: PMS variant (examType pms)
 * - `OPENROUTER_MODEL_CHAIN`: fallback when the exam-specific override is unset
 * Catalog: https://openrouter.ai/models (filter free); verify IDs with GET https://openrouter.ai/api/v1/models
 */

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

export type GradingExamType = 'css' | 'pms'

/**
 * Default free chain (verified: pricing prompt=0 completion=0 on OpenRouter).
 * Ordered for: instruction-following + long JSON examiner feedback.
 * Excludes non-chat models (e.g. Lyria audio).
 */
export const DEFAULT_FREE_MODEL_CHAIN = [
  'nousresearch/hermes-3-llama-3.1-405b:free', // 405B instruction-tuned: strongest free tier for JSON
  'qwen/qwen3.6-plus:free', // 1M context, very strong general
  'nvidia/nemotron-3-super-120b-a12b:free', // large MoE
  'openai/gpt-oss-120b:free', // OpenAI open-weight 120B
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'meta-llama/llama-3.3-70b-instruct:free', // reliable instruct fallback
  'minimax/minimax-m2.5:free',
  'z-ai/glm-4.5-air:free',
  'google/gemma-3-27b-it:free',
  'qwen/qwen3-coder:free', // strong; name says coder but follows instructions well
  'openrouter/free', // last-resort router (variable quality)
] as const

const SYSTEM_JSON = `You are an official competitive examination examiner. Your entire reply MUST be a single valid JSON object matching the user's schema. No markdown code fences. No commentary before or after the JSON.`

function splitChain(raw: string): string[] {
  return raw.split(',').map((s) => s.trim()).filter(Boolean)
}

/** Resolves model list: exam-specific override → global OPENROUTER_MODEL_CHAIN → built-in free defaults. */
export function resolveModelChain(examType?: GradingExamType): string[] {
  const css = process.env.OPENROUTER_MODEL_CHAIN_CSS?.trim()
  const pms = process.env.OPENROUTER_MODEL_CHAIN_PMS?.trim()
  const global = process.env.OPENROUTER_MODEL_CHAIN?.trim()

  if (examType === 'css' && css) return splitChain(css)
  if (examType === 'pms' && pms) return splitChain(pms)
  if (global) return splitChain(global)
  return [...DEFAULT_FREE_MODEL_CHAIN]
}

async function fetchOpenRouter(
  model: string,
  userPrompt: string,
  apiKey: string,
  signal: AbortSignal
): Promise<{ ok: boolean; text?: string; status: number; errBody?: string }> {
  const referer =
    process.env.OPENROUTER_HTTP_REFERER?.trim() ||
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    'https://imtehan.com'

  const maxTokens = Math.min(
    8192,
    Math.max(512, Number.parseInt(process.env.OPENROUTER_MAX_TOKENS ?? '4096', 10) || 4096)
  )

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    signal,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': referer,
      'X-Title': 'Imtehan Writing Coach',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_JSON },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.22,
      max_tokens: maxTokens,
    }),
  })

  const status = res.status
  if (!res.ok) {
    const errBody = await res.text().catch(() => '')
    return { ok: false, status, errBody }
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const text = data?.choices?.[0]?.message?.content?.trim()
  if (!text) {
    return { ok: false, status, errBody: 'empty choices[0].message.content' }
  }
  return { ok: true, status, text }
}

export type GradingRunResult = {
  rawText: string
  /** e.g. openrouter:qwen/qwen3.6-plus:free */
  provider: string
}

export type RunGradingOptions = {
  /** When set, uses OPENROUTER_MODEL_CHAIN_CSS or OPENROUTER_MODEL_CHAIN_PMS if defined; else falls back to OPENROUTER_MODEL_CHAIN then defaults. */
  examType?: GradingExamType
}

/**
 * Runs the grading prompt through the OpenRouter free-model chain.
 * Requires OPENROUTER_API_KEY. No Google Gemini fallback.
 */
export async function runGradingJsonPrompt(
  userPrompt: string,
  signal: AbortSignal,
  options?: RunGradingOptions
): Promise<GradingRunResult> {
  const openrouterKey = process.env.OPENROUTER_API_KEY?.trim()
  const logGrading =
    process.env.NODE_ENV !== 'production' || process.env.LOG_GRADING === '1'

  if (!openrouterKey) {
    throw new Error('OPENROUTER_API_KEY is required for grading (free models via OpenRouter only).')
  }

  const errors: string[] = []
  const models = resolveModelChain(options?.examType)

  for (const model of models) {
    try {
      const r = await fetchOpenRouter(model, userPrompt, openrouterKey, signal)
      if (r.ok && r.text) {
        if (logGrading) console.info(`[grading] provider=openrouter model=${model}`)
        return { rawText: r.text, provider: `openrouter:${model}` }
      }
      const msg = `openrouter ${model}: ${r.status} ${r.errBody?.slice(0, 200) ?? ''}`
      errors.push(msg)
      if (logGrading) console.warn(`[grading] ${msg}`)
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e)
      errors.push(`openrouter ${model}: ${m}`)
      if (logGrading) console.warn(`[grading] openrouter ${model} threw`, e)
    }
  }

  throw new Error(`All OpenRouter models failed: ${errors.join(' | ')}`)
}
