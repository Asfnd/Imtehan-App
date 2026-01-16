# Free Trial Limits - imtehan.com

## 📊 Current Free Trial Configuration

Your app has a **tiered trial system** with different limits for guest users, signed-in users, and premium users.

---

## 🎯 Trial Limits Breakdown

### 1. **Guest Users** (Not Signed In)

Users can try your platform WITHOUT creating an account:

| Feature | Free Limit | Premium |
|---------|-----------|---------|
| **CSS Subject Quizzes** | 3 quizzes | ♾️ Unlimited |
| **CSS Idioms Quizzes** | 1 quiz | ♾️ Unlimited |
| **CSS Idioms Random** | 1 random set | ♾️ Unlimited |
| **MPT Mock Tests** | 1 test | ♾️ Unlimited |
| **MPT Past Papers** | 1 paper | ♾️ Unlimited |
| **Official CSS Past Papers** | 3 papers | ♾️ Unlimited |
| **Solved Papers** | 0 (Premium only) | ♾️ Unlimited |
| **Guess Papers** | 0 (Premium only) | ♾️ Unlimited |

**Total free usage for guests:** 10 quiz/test attempts

**Storage:** Browser localStorage (can be cleared, but tracked persistently)

---

### 2. **Signed-In Free Users** (After Creating Account)

After signing up with Google, users get these limits:

| Feature | Free Limit | Premium |
|---------|-----------|---------|
| **CSS Subject Quizzes** | 2 quizzes | ♾️ Unlimited |
| **CSS Idioms Quizzes** | 1 quiz | ♾️ Unlimited |
| **CSS Idioms Random** | 1 random set | ♾️ Unlimited |
| **MPT Mock Tests** | 1 test | ♾️ Unlimited |
| **MPT Past Papers** | 1 paper | ♾️ Unlimited |
| **Official CSS Past Papers** | 2 papers | ♾️ Unlimited |
| **Solved Papers** | 0 (Premium only) | ♾️ Unlimited |
| **Guess Papers** | 0 (Premium only) | ♾️ Unlimited |

**Total free usage for signed-in users:** 8 quiz/test attempts

**Storage:** Supabase database (cannot be bypassed)

**Why fewer than guests?**
- Guest limits are generous to encourage sign-up
- Signed-in limits prevent abuse (tracked per account)
- Creates incentive to upgrade to premium

---

### 3. **Premium Users** (Paid Subscribers)

| Feature | Limit |
|---------|-------|
| **Everything** | ♾️ Unlimited |

**Pricing:** Rs. 999/6 months (shown in PremiumPopup.tsx:93)

---

## 🔒 How Limits Are Enforced

### For Guest Users:
```typescript
// Stored in: browser localStorage
// Key: 'quiz_usage'
// Can be cleared: Yes (but tracking persists across sessions)
// Bypassed by: Clearing browser data (acceptable trade-off)
```

**Code location:** `lib/usageTracker.ts`

### For Signed-In Users:
```typescript
// Stored in: Supabase database (user_usage table)
// Key: User ID
// Can be bypassed: NO (server-side enforcement)
// Tracked permanently per account
```

**Code location:** `lib/hooks/useFreeTrial.ts`

---

## 📈 User Journey Example

### Scenario: Student Preparing for CSS

**Day 1 - Guest User:**
- Opens Pakistan Affairs quiz → 1/3 CSS Subject Quizzes used
- Opens History quiz → 2/3 CSS Subject Quizzes used
- Opens Geology quiz → 3/3 CSS Subject Quizzes used ✅
- Opens Essay quiz → ❌ BLOCKED → **Popup: "Sign in to continue"**

**Day 2 - Signs In:**
- Guest usage resets to signed-in limits (2 more CSS Subject Quizzes)
- Opens Essay quiz → 1/2 CSS Subject Quizzes used
- Opens Current Affairs quiz → 2/2 CSS Subject Quizzes used ✅
- Opens International Relations quiz → ❌ BLOCKED → **Redirect to /css/premium**

**Day 3 - Upgrades to Premium:**
- Takes unlimited quizzes ♾️
- Accesses solved papers ✅
- Accesses guess papers ✅

---

## 🎭 What Each Limit Type Covers

### CSS Subject Quizzes (3 guest / 2 signed-in)
- All 25 CSS compulsory + optional subjects
- Each subject quiz = 1 credit
- Examples: Pakistan Affairs, Essay, English, History, etc.

### CSS Idioms Quizzes (1 free)
- Idioms & phrases practice
- Multiple choice format

### CSS Idioms Random (1 free)
- Random idiom sets
- Different from regular idioms quiz

### MPT Mock Tests (1 free)
- Full MPT simulation
- 100 questions, timed

### MPT Past Papers (1 free)
- Previous year MPT papers
- Practice mode

### Official CSS Past Papers (3 guest / 2 signed-in)
- PDF viewing of past CSS papers
- All years and subjects
- Each PDF view = 1 credit

### Solved Papers (0 free - Premium only)
- Step-by-step solutions
- Requires premium subscription

### Guess Papers (0 free - Premium only)
- Predicted questions for upcoming exams
- Requires premium subscription

---

## 🧪 Testing Your Limits

### Test as Guest:
```bash
# Open browser incognito mode
# Visit: http://localhost:3000
# Try taking 4 CSS subject quizzes
# Should be blocked on 4th attempt
```

### Test as Signed-In User:
```bash
# Sign in with Google
# Try taking 3 CSS subject quizzes
# Should be blocked on 3rd attempt
```

### Test Premium Features:
```bash
# Try accessing: /css/solved-papers/view
# Should redirect to /css/premium (or /signin if not logged in)
```

---

## 💡 Why These Specific Numbers?

### Guest Limits (3/1/1/1/1/3/0/0):

**Purpose:** Allow meaningful trial without overwhelming commitment

**Strategy:**
- Enough to experience value (10 total attempts)
- Not enough to complete full preparation
- Encourages sign-up for more

**Trade-offs:**
- Too low → Users bounce
- Too high → No incentive to sign up
- **Current balance:** 3 CSS quizzes = test 3 subjects, want more

### Signed-In Limits (2/1/1/1/1/2/0/0):

**Purpose:** Prevent abuse while maintaining incentive to upgrade

**Strategy:**
- Lower than guest (encourages early conversion to premium)
- Tracked server-side (cannot bypass)
- Enough for serious trial (8 attempts total)

**Why lower than guest?**
- Guest limits are "bait" (easy to bypass if needed)
- Signed-in limits are "real" (server-enforced)
- Creates urgency: "I'm signed in, serious about this, need more"

---

## 📊 Recommended Changes (Optional)

### If you want MORE trials (more generous):

Change these values in `lib/hooks/useFreeTrial.ts`:

```typescript
// Current:
const SIGNED_IN_LIMITS = {
  cssSubject: 2,  // Change to 5
  cssIdioms: 1,   // Change to 2
  officialPast: 2, // Change to 5
}

const GUEST_LIMITS = {
  cssSubject: 3,  // Change to 5
  cssIdioms: 1,   // Change to 2
  officialPast: 3, // Change to 5
}
```

**Impact:** Users get more free trials before hitting paywall

---

### If you want FEWER trials (more aggressive):

```typescript
// Current:
const SIGNED_IN_LIMITS = {
  cssSubject: 2,  // Change to 1
  cssIdioms: 1,   // Keep at 1
  officialPast: 2, // Change to 1
}

const GUEST_LIMITS = {
  cssSubject: 3,  // Change to 2
  cssIdioms: 1,   // Keep at 1
  officialPast: 3, // Change to 2
}
```

**Impact:** Users hit paywall faster, higher conversion but lower trial satisfaction

---

### If you want TIME-BASED trials (e.g., 7-day free trial):

**Not currently implemented.** Would require:
1. Database schema update (add `trial_started_at` field)
2. Change limit logic from count-based to time-based
3. Track usage within time window

**Example:**
```typescript
// 7-day unlimited trial after sign-up
const TRIAL_DAYS = 7
const trialEnded = Date.now() > user.trial_started_at + (TRIAL_DAYS * 86400000)
```

---

## 🎯 My Recommendation

**Your current limits are well-balanced for an educational platform.**

**Why:**
- ✅ Generous enough to experience value (10 guest attempts)
- ✅ Encourages sign-up (more trials after blocking)
- ✅ Server-side enforcement prevents abuse
- ✅ Clear upgrade path to premium

**Keep current limits unless:**
- Conversion rate < 2% (too generous, users not upgrading)
- Bounce rate > 50% (too restrictive, users leaving)
- Premium subscriptions < 5% of users (paywall too late)

---

## 📈 Analytics to Track

To optimize your limits, track these metrics:

1. **Guest → Sign-Up Conversion Rate**
   - How many guests hit the limit and sign up?
   - Target: 15-25%

2. **Signed-In → Premium Conversion Rate**
   - How many free users upgrade to premium?
   - Target: 5-10%

3. **Average Trials Before Upgrade**
   - How many free quizzes do users take before upgrading?
   - Optimal: 5-8 attempts

4. **Bounce Rate at Paywall**
   - How many users leave when blocked?
   - Target: < 40%

---

## 🚀 Quick Reference

| User Type | Total Free Attempts | Unlimited? |
|-----------|-------------------|------------|
| **Guest** | 10 attempts | ❌ No |
| **Signed-In Free** | 8 attempts | ❌ No |
| **Premium** | All features | ✅ Yes |

**Files to modify limits:**
- `lib/hooks/useFreeTrial.ts` (lines 9-18, 21-30)
- `lib/usageTracker.ts` (lines 21-36)

**Current pricing:** Rs. 999/6 months

---

## ✅ Bottom Line

**Your current free trial limits:**

**Guest users:** 10 total free attempts across all features
**Signed-in users:** 8 total free attempts (server-enforced)
**Premium users:** Unlimited everything

**This is a solid freemium model** that:
- Allows meaningful trial
- Encourages account creation
- Creates urgency to upgrade
- Prevents abuse

Want me to adjust any of these limits?
