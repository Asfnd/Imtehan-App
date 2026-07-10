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

run('tieredSetQuizPageAccess: 1 free once, then sign-in / premium', () => {
  assert.equal(tieredSetQuizPageAccess(1, false, false, false), 'allow')
  assert.equal(tieredSetQuizPageAccess(1, false, false, true), 'require_sign_in')
  assert.equal(tieredSetQuizPageAccess(2, false, false, false), 'require_sign_in')
  assert.equal(tieredSetQuizPageAccess(2, true, false, false), 'require_premium')
  assert.equal(tieredSetQuizPageAccess(1, true, false, false), 'require_premium')
  assert.equal(tieredSetQuizPageAccess(4, true, true, false), 'allow')
})

run('mdcatMockPageAccess', () => {
  assert.equal(mdcatMockPageAccess(1, false, false, false), 'allow')
  assert.equal(mdcatMockPageAccess(1, false, false, true), 'require_sign_in')
  assert.equal(mdcatMockPageAccess(2, false, false, false), 'require_sign_in')
  assert.equal(mdcatMockPageAccess(2, true, false, false), 'require_premium')
  assert.equal(mdcatMockPageAccess(3, true, true, false), 'allow')
})

run('tieredSetTableNavigation', () => {
  assert.equal(tieredSetTableNavigation(1, false, false, false), 'navigate')
  assert.equal(tieredSetTableNavigation(1, false, false, true), 'require_sign_in')
  assert.equal(tieredSetTableNavigation(2, false, true, false), 'navigate')
  assert.equal(tieredSetTableNavigation(2, false, false, false), 'require_sign_in')
  assert.equal(tieredSetTableNavigation(2, true, false, false), 'require_premium')
})

run('examDashboardMockClick', () => {
  assert.equal(examDashboardMockClick(1, false, false, false), 'open')
  assert.equal(examDashboardMockClick(1, false, false, true), 'require_sign_in')
  assert.equal(examDashboardMockClick(2, false, false, false), 'require_sign_in')
  assert.equal(examDashboardMockClick(2, true, false, false), 'show_premium')
  assert.equal(examDashboardMockClick(2, true, true, false), 'open')
})

run('isExamMockCardLocked', () => {
  assert.equal(isExamMockCardLocked(false, 2, false), false)
  assert.equal(isExamMockCardLocked(true, 1, false), false)
  assert.equal(isExamMockCardLocked(true, 2, false), true)
  assert.equal(isExamMockCardLocked(true, 2, true), false)
})

console.log('\nAll premium-gates tests passed.\n')
