/**
 * Smoke test for OpenRouter grading chain (same as /api/grade).
 *
 * Usage (from quiz-app root):
 *   npx tsx scripts/test-grading-provider.ts
 *
 * Requires OPENROUTER_API_KEY in .env.local
 */
import { config } from 'dotenv'
import { resolve } from 'path'
import { runGradingJsonPrompt } from '../lib/ai/runGradingCompletion'

config({ path: resolve(process.cwd(), '.env.local') })
config({ path: resolve(process.cwd(), '.env') })

const miniPrompt = `Return ONLY valid JSON, no markdown:
{"ok":true,"message":"smoke-test","model_probe":"done"}`

async function main() {
  const hasOr = Boolean(process.env.OPENROUTER_API_KEY?.trim())
  console.log('OPENROUTER_API_KEY:', hasOr ? 'set' : 'missing')
  if (!hasOr) {
    console.error('FAIL: Set OPENROUTER_API_KEY in .env.local')
    process.exit(1)
  }

  const ac = new AbortController()
  const t = setTimeout(() => ac.abort(), 60_000)
  try {
    const { rawText, provider } = await runGradingJsonPrompt(miniPrompt, ac.signal, { examType: 'css' })
    clearTimeout(t)
    console.log('Provider:', provider)
    console.log('Raw (first 200 chars):', rawText.slice(0, 200))
    const parsed = JSON.parse(rawText.match(/\{[\s\S]*\}/)?.[0] ?? rawText)
    if (parsed.ok !== true) {
      console.error('FAIL: JSON missing ok:true', parsed)
      process.exit(1)
    }
    console.log('OK: grading provider chain responded with valid JSON')
  } catch (e) {
    clearTimeout(t)
    console.error('FAIL:', e)
    process.exit(1)
  }
}

main()
