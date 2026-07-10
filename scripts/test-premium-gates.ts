import assert from 'node:assert/strict'
import {
  tieredSetQuizPageAccess,
  mdcatMockPageAccess,
  tieredSetTableNavigation,
  examDashboardMockClick,
  isExamMockCardLocked,
} from '../lib/premium-gates'

function run(name: string, fn: () => void) {
  try {
    fn()
    console.log(`✓ ${name}`)
  } catch (e) {
    console.error(`✗ ${name}`)
    throw e
  }
}

run('tieredSetQuizPageAccess: 1 free, 2 sign-in, 2+ premium when signed in', () => {
  assert.equal(tieredSetQuizPageAccess(1, false, false), 'allow')
  assert.equal(tieredSetQuizPageAccess(2, false, false), 'require_sign_in')
  assert.equal(tieredSetQuizPageAccess(2, true, false), 'require_premium')
  assert.equal(tieredSetQuizPageAccess(3, true, false), 'require_premium')
  assert.equal(tieredSetQuizPageAccess(4, true, true), 'allow')
})

run('mdcatMockPageAccess: 1 free, 2+ sign-in then premium', () => {
  assert.equal(mdcatMockPageAccess(1, false, false), 'allow')
  assert.equal(mdcatMockPageAccess(2, false, false), 'require_sign_in')
  assert.equal(mdcatMockPageAccess(2, true, false), 'require_premium')
  assert.equal(mdcatMockPageAccess(3, true, false), 'require_premium')
  assert.equal(mdcatMockPageAccess(3, true, true), 'allow')
})

run('tieredSetTableNavigation', () => {
  assert.equal(tieredSetTableNavigation(1, false, false), 'navigate')
  assert.equal(tieredSetTableNavigation(2, false, true), 'navigate')
  assert.equal(tieredSetTableNavigation(4, true, true), 'navigate')
  assert.equal(tieredSetTableNavigation(2, false, false), 'require_sign_in')
  assert.equal(tieredSetTableNavigation(4, false, false), 'require_sign_in')
  assert.equal(tieredSetTableNavigation(2, true, false), 'require_premium')
  assert.equal(tieredSetTableNavigation(3, true, false), 'require_premium')
})

run('examDashboardMockClick', () => {
  assert.equal(examDashboardMockClick(1, false, false), 'open')
  assert.equal(examDashboardMockClick(2, false, false), 'require_sign_in')
  assert.equal(examDashboardMockClick(2, true, false), 'show_premium')
  assert.equal(examDashboardMockClick(2, true, true), 'open')
})

run('isExamMockCardLocked', () => {
  assert.equal(isExamMockCardLocked(false, 2, false), false)
  assert.equal(isExamMockCardLocked(true, 1, false), false)
  assert.equal(isExamMockCardLocked(true, 2, false), true)
  assert.equal(isExamMockCardLocked(true, 2, true), false)
})

console.log('\nAll premium-gates tests passed.\n')
