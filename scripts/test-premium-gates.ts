/**
 * Run: npx tsx scripts/test-premium-gates.ts
 */
import assert from 'assert/strict'
import {
  tieredSetQuizPageAccess,
  mdcatMockPageAccess,
  tieredSetTableNavigation,
  examDashboardMockClick,
  isExamMockCardLocked,
} from '../lib/premium-gates'

function test(name: string, fn: () => void) {
  try {
    fn()
    console.log(`\u2713 ${name}`)
  } catch (e) {
    console.error(`\u2717 ${name}`)
    throw e
  }
}

// --- In-quiz / deep-link: set 4+ needs premium, set 3 needs sign-in ---
test('set quiz page: 1–2 free', () => {
  assert.equal(tieredSetQuizPageAccess(1, false, false), 'allow')
  assert.equal(tieredSetQuizPageAccess(2, false, false), 'allow')
})
test('set quiz page: 3 needs sign-in when not signed in', () => {
  assert.equal(tieredSetQuizPageAccess(3, false, false), 'require_sign_in')
  assert.equal(tieredSetQuizPageAccess(3, true, false), 'allow')
})
test('set quiz page: 4+ needs active premium', () => {
  assert.equal(tieredSetQuizPageAccess(4, true, false), 'require_premium')
  assert.equal(tieredSetQuizPageAccess(4, true, true), 'allow')
})

// --- MDCAT mock ---
test('mdcat mock: 1 free', () => {
  assert.equal(mdcatMockPageAccess(1, false, false), 'allow')
})
test('mdcat mock: 2 needs sign-in', () => {
  assert.equal(mdcatMockPageAccess(2, false, false), 'require_sign_in')
  assert.equal(mdcatMockPageAccess(2, true, false), 'allow')
})
test('mdcat mock: 3+ needs active premium', () => {
  assert.equal(mdcatMockPageAccess(3, true, false), 'require_premium')
  assert.equal(mdcatMockPageAccess(3, true, true), 'allow')
})

// --- Set table (FSC / MDCAT / exam mode) ---
test('set table: 1–2 or premium navigates', () => {
  assert.equal(tieredSetTableNavigation(1, false, false), 'navigate')
  assert.equal(tieredSetTableNavigation(2, false, true), 'navigate')
  assert.equal(tieredSetTableNavigation(4, true, true), 'navigate')
})
test('set table: 3+ guest needs sign-in', () => {
  assert.equal(tieredSetTableNavigation(3, false, false), 'require_sign_in')
  assert.equal(tieredSetTableNavigation(4, false, false), 'require_sign_in')
})
test('set table: 3 signed-in non-premium can open', () => {
  assert.equal(tieredSetTableNavigation(3, true, false), 'navigate')
})
test('set table: 4+ signed-in non-premium → paywall', () => {
  assert.equal(tieredSetTableNavigation(4, true, false), 'require_premium')
})

// --- Exam dashboard mock list ---
test('exam dashboard mock: mock 1 open for anyone', () => {
  assert.equal(examDashboardMockClick(1, false, false), 'open')
})
test('exam dashboard mock: 2+ needs sign-in or premium', () => {
  assert.equal(examDashboardMockClick(2, false, false), 'require_sign_in')
  assert.equal(examDashboardMockClick(2, true, false), 'show_premium')
  assert.equal(examDashboardMockClick(2, true, true), 'open')
})

// --- Grid lock ---
test('isExamMockCardLocked', () => {
  assert.equal(isExamMockCardLocked(false, 2, false), false)
  assert.equal(isExamMockCardLocked(true, 1, false), false)
  assert.equal(isExamMockCardLocked(true, 2, false), true)
  assert.equal(isExamMockCardLocked(true, 2, true), false)
})

console.log('\nAll premium-gates tests passed.\n')
