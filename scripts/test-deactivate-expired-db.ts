import assert from 'assert/strict'
import {
  shouldDeactivateExpiredPremiumInDb,
  mergedMetadataOnDeactivate,
} from '../lib/deactivate-expired-premium'

const past = '2000-01-01T00:00:00.000Z'
const future = new Date(Date.now() + 86400_000).toISOString()

assert.equal(shouldDeactivateExpiredPremiumInDb(null), false)
assert.equal(shouldDeactivateExpiredPremiumInDb({ is_premium: true, expires_at: past }), true)
assert.equal(shouldDeactivateExpiredPremiumInDb({ is_premium: true, plan: 'lifetime', expires_at: past }), false)
assert.equal(shouldDeactivateExpiredPremiumInDb({ is_premium: true, expires_at: future }), false)
assert.equal(shouldDeactivateExpiredPremiumInDb({ is_premium: true, expires_at: '' }), true)
assert.equal(shouldDeactivateExpiredPremiumInDb({ is_premium: true }), true)
assert.equal(shouldDeactivateExpiredPremiumInDb({ is_premium: 'true', expires_at: past }), true)

const m = mergedMetadataOnDeactivate({ is_premium: true, plan: '3_months', x: 1 })
assert.equal(m.is_premium, false)
assert.equal(m.x, 1)
assert.equal(m.deactivation_reason, 'expired')
assert.ok(typeof m.deactivated_at === 'string')

console.log('✓ deactivate-expired DB logic tests passed.\n')
