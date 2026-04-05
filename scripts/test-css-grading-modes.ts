/**
 * Integration test: CSS Writing Coach modes (essay, précis, long answer) via the same
 * OpenRouter free-model chain as production (`OPENROUTER_MODEL_CHAIN_CSS` or defaults).
 *
 *   npm run test-css-grading
 *
 * Requires OPENROUTER_API_KEY in .env.local. Makes 3 API calls (slow; ~2–6 min total).
 */
import { config } from 'dotenv'
import { resolve } from 'path'
import { runGradingJsonPrompt } from '../lib/ai/runGradingCompletion'
import {
  buildCssPrecisPrompt,
  buildEssayPrompt,
  buildLongAnswerPrompt,
} from '../lib/grading/writingCoachPrompts'
import {
  validateCssEssayFeedback,
  validateLongAnswerFeedback,
  validatePrecisFeedback,
} from '../lib/grading/validateFeedback'

config({ path: resolve(process.cwd(), '.env.local') })
config({ path: resolve(process.cwd(), '.env') })

const ESSAY_BODY = `
Thesis: Climate adaptation in South Asia requires institutional coordination, not slogans.

Pakistan faces recurring floods and heat stress; the 2022 floods displaced millions and strained fiscal capacity.
Neighbouring Bangladesh has invested in early warning and embankments with measurable mortality reduction compared with the 1970s.
India's National Disaster Management Authority illustrates how a statutory body can standardise district-level plans.

The way forward must include: (1) hydrological data sharing across provinces, (2) budget lines for maintenance of irrigation and drainage, and (3) transparent post-disaster audits to prevent elite capture of relief.

Steel-manning critics: some argue adaptation diverts funds from growth. Yet without resilient infrastructure, growth itself is periodically erased by shocks.

In conclusion, Pakistan should treat adaptation as core public administration, with cabinet-level accountability and Pakistan-specific metrics tied to the IMF climate dialogue where relevant.
`.trim()

const ORIGINAL_PASSAGE = `
Title: On Public Trust

Governments derive legitimacy not only from elections but from predictable service delivery and perceived fairness.
When citizens believe institutions favour insiders, compliance with tax and regulation weakens, and informal economies expand.
Digital service portals can reduce discretion at the counter, yet technology alone cannot substitute for prosecutorial independence.
The passage argues that rebuilding trust requires both transparency reforms and visible accountability for abuse of office.
Finally, it warns that rhetoric about good governance without measurable outcomes deepens cynicism among younger cohorts who compare their state with regional peers.
Scholars also note that local bodies matter: when municipal services fail, citizens infer national failure even if macro indicators improve.
`.trim()

const PRECIS_BODY = `
Public Legitimacy and Reform

The text states that legitimacy depends on fair service delivery, not elections alone. Perceived unfairness erodes tax compliance.
Digital portals may cut discretion but cannot replace independent prosecution. Trust needs transparency and accountability for abuse.
The author cautions that empty rhetoric on governance, without results, increases cynicism among youth comparing countries.
`.trim()

const LONG_ANSWER = `
Introduction: Realism explains international relations as power and survival; liberalism emphasises institutions and interdependence.

Pakistan's position involves balancing major powers while securing economic stability through IMF programmes and Gulf partnerships.
The Ukraine conflict shifted energy flows; Pakistan navigates sanctions complexity when trading with neighbours.

Conclusion: A mixed IR toolkit — realism for security, liberalism for trade — fits Pakistan's constraints in 2025–2026.
`.trim()

async function runCase(
  name: string,
  prompt: string,
  validate: (raw: string) => void
): Promise<void> {
  const ac = new AbortController()
  const t = setTimeout(() => ac.abort(), 120_000)
  try {
    const { rawText, provider } = await runGradingJsonPrompt(prompt, ac.signal, { examType: 'css' })
    clearTimeout(t)
    console.log(`\n── ${name} ──`)
    console.log('Provider:', provider)
    validate(rawText)
    console.log('Schema: OK')
  } catch (e) {
    clearTimeout(t)
    console.error(`\nFAIL [${name}]:`, e)
    throw e
  }
}

async function main() {
  if (!process.env.OPENROUTER_API_KEY?.trim()) {
    console.error('Set OPENROUTER_API_KEY in .env.local')
    process.exit(1)
  }

  console.log('CSS grading integration test (essay → précis → long answer)')
  console.log('Using examType=css → OPENROUTER_MODEL_CHAIN_CSS or OPENROUTER_MODEL_CHAIN or default free chain\n')

  await runCase(
    'CSS Essay',
    buildEssayPrompt('Climate change and governance in South Asia', ESSAY_BODY),
    validateCssEssayFeedback
  )

  await runCase('CSS Précis', buildCssPrecisPrompt(ORIGINAL_PASSAGE, PRECIS_BODY), validatePrecisFeedback)

  await runCase(
    'CSS Long answer (10 marks)',
    buildLongAnswerPrompt(
      'International Relations',
      'Discuss realism and liberalism in explaining Pakistan foreign policy.',
      10,
      LONG_ANSWER,
      'css'
    ),
    (raw) => validateLongAnswerFeedback(raw, 10)
  )

  console.log('\nAll CSS modes passed schema + OpenRouter checks.')
}

main().catch(() => process.exit(1))
