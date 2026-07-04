/**
 * Run: npx tsx scripts/test-is-active-premium.ts
 */
import assert from 'assert/strict'
import { isActivePremium } from '../lib/is-active-premium'

function test(name: string, fn: () => void) {
  try {
    fn()
    console.log(`\u2713 ${name}`)
  } catch (e) {
    console.error(`\u2717 ${name}`)
    throw e
  }
}

test('null/undefined user → false', () => {
  assert.equal(isActivePremium(null), false)
  assert.equal(isActivePremium(undefined), false)
  assert.equal(isActivePremium({}), false)
  assert.equal(isActivePremium({ user_metadata: null }), false)
})

test('is_premium not true → false', () => {
  assert.equal(isActivePremium({ user_metadata: { is_premium: false } }), false)
  assert.equal(isActivePremium({ user_metadata: { is_premium: 'true' } }), false)
})

test('is_premium true, no expires_at → true (unlimited/legacy)', () => {
  assert.equal(isActivePremium({ user_metadata: { is_premium: true } }), true)
})

test('plan lifetime → true (ignores expires)', () => {
  assert.equal(
    isActivePremium({
      user_metadata: { is_premium: true, plan: 'lifetime', expires_at: '2000-01-01T00:00:00.000Z' },
    }),
    true
  )
})

test('expires_at in the past → false', () => {
  assert.equal(
    isActivePremium({ user_metadata: { is_premium: true, expires_at: '2000-01-01T00:00:00.000Z' } }),
    false
  )
  const oneMinuteAgo = new Date(Date.now() - 60_000).toISOString()
  assert.equal(isActivePremium({ user_metadata: { is_premium: true, expires_at: oneMinuteAgo } }), false)
})

test('expires_at in the future → true', () => {
  const oneHourAhead = new Date(Date.now() + 3_600_000).toISOString()
  assert.equal(isActivePremium({ user_metadata: { is_premium: true, expires_at: oneHourAhead } }), true)
})

test('numeric expires_at (ms) → true/false by time', () => {
  const pastMs = Date.now() - 1000
  const futureMs = Date.now() + 3_600_000
  assert.equal(isActivePremium({ user_metadata: { is_premium: true, expires_at: pastMs } }), false)
  assert.equal(isActivePremium({ user_metadata: { is_premium: true, expires_at: futureMs } }), true)
})

test('empty expires_at string → true', () => {
  assert.equal(isActivePremium({ user_metadata: { is_premium: true, expires_at: '' } }), true)
})

test('unparseable expires_at → true (fail open for paid users)', () => {
  assert.equal(
    isActivePremium({ user_metadata: { is_premium: true, expires_at: 'definitely-not-a-date' } }),
    true
  )
})

test('Postgres timestamp expires_at in the future → true', () => {
  const future = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .replace('T', ' ')
    .replace('Z', '+00')
  assert.equal(isActivePremium({ user_metadata: { is_premium: true, expires_at: future } }), true)
})

test('at expiry instant: not active (strictly before)', () => {
  const t = Date.now()
  assert.equal(isActivePremium({ user_metadata: { is_premium: true, expires_at: t } }), false, 'at exact ms, should not be active')
  assert.equal(
    isActivePremium({ user_metadata: { is_premium: true, expires_at: t + 1 } }),
    true,
    '1ms after "now" must still be active (race: now may move; we only assert t+1 > typical now)'
  )
})

console.log('\nAll isActivePremium tests passed.\n')
