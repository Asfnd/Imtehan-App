# Premium Management via Supabase SQL

**How to activate premium for users using SQL Editor**

---

## ⚠️ Fix Your Script

Your current script has a **mismatch**:
```sql
'plan', '3_months',  -- Says 3 months
'expires_at', (CURRENT_DATE + interval '6 months')::text  -- But adds 6 months!
```

---

## ✅ Correct Scripts

### 1. Activate 3-Month Premium

```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data ||
  jsonb_build_object(
    'is_premium', true,
    'plan', '3_months',
    'activated_at', CURRENT_TIMESTAMP::text,
    'expires_at', (CURRENT_TIMESTAMP + interval '3 months')::text
  )
WHERE email = 'user@example.com';
```

**Changes:**
- `CURRENT_TIMESTAMP` instead of `CURRENT_DATE` (includes time)
- `interval '3 months'` matches the `'3_months'` plan

---

### 2. Activate 1-Month Premium

```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data ||
  jsonb_build_object(
    'is_premium', true,
    'plan', '1_month',
    'activated_at', CURRENT_TIMESTAMP::text,
    'expires_at', (CURRENT_TIMESTAMP + interval '1 month')::text
  )
WHERE email = 'user@example.com';
```

---

### 3. Activate 6-Month Premium

```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data ||
  jsonb_build_object(
    'is_premium', true,
    'plan', '6_months',
    'activated_at', CURRENT_TIMESTAMP::text,
    'expires_at', (CURRENT_TIMESTAMP + interval '6 months')::text
  )
WHERE email = 'user@example.com';
```

---

### 4. Activate 1-Year Premium

```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data ||
  jsonb_build_object(
    'is_premium', true,
    'plan', '1_year',
    'activated_at', CURRENT_TIMESTAMP::text,
    'expires_at', (CURRENT_TIMESTAMP + interval '1 year')::text
  )
WHERE email = 'user@example.com';
```

---

### 5. Activate Permanent/Lifetime Premium

```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data ||
  jsonb_build_object(
    'is_premium', true,
    'plan', 'lifetime',
    'activated_at', CURRENT_TIMESTAMP::text,
    'expires_at', null
  )
WHERE email = 'user@example.com';
```

**Note:** `expires_at: null` means never expires

---

## Check User's Premium Status

```sql
SELECT
  email,
  raw_user_meta_data->>'is_premium' as is_premium,
  raw_user_meta_data->>'plan' as plan,
  raw_user_meta_data->>'activated_at' as activated_at,
  raw_user_meta_data->>'expires_at' as expires_at
FROM auth.users
WHERE email = 'user@example.com';
```

---

## Deactivate Premium

```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data ||
  jsonb_build_object(
    'is_premium', false,
    'deactivated_at', CURRENT_TIMESTAMP::text
  )
WHERE email = 'user@example.com';
```

---

## List All Premium Users

```sql
SELECT
  email,
  raw_user_meta_data->>'is_premium' as is_premium,
  raw_user_meta_data->>'plan' as plan,
  raw_user_meta_data->>'activated_at' as activated_at,
  raw_user_meta_data->>'expires_at' as expires_at,
  CASE
    WHEN (raw_user_meta_data->>'expires_at')::timestamp > CURRENT_TIMESTAMP
    THEN 'Active'
    WHEN raw_user_meta_data->>'expires_at' IS NULL
    THEN 'Permanent'
    ELSE 'Expired'
  END as status
FROM auth.users
WHERE (raw_user_meta_data->>'is_premium')::boolean = true
ORDER BY email;
```

---

## Find Expired Premium Users

```sql
SELECT
  email,
  raw_user_meta_data->>'plan' as plan,
  raw_user_meta_data->>'expires_at' as expired_on
FROM auth.users
WHERE (raw_user_meta_data->>'is_premium')::boolean = true
  AND (raw_user_meta_data->>'expires_at')::timestamp < CURRENT_TIMESTAMP
  AND raw_user_meta_data->>'expires_at' IS NOT NULL;
```

---

## Auto-Deactivate Expired Users

```sql
-- Find and deactivate all expired premium users
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data ||
  jsonb_build_object(
    'is_premium', false,
    'deactivated_at', CURRENT_TIMESTAMP::text,
    'deactivation_reason', 'expired'
  )
WHERE (raw_user_meta_data->>'is_premium')::boolean = true
  AND (raw_user_meta_data->>'expires_at')::timestamp < CURRENT_TIMESTAMP
  AND raw_user_meta_data->>'expires_at' IS NOT NULL;
```

**Run this weekly** to clean up expired subscriptions.

---

## Extend Existing Premium

If user already has premium and you want to extend:

```sql
-- Example: Add 3 more months to current expiry
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data ||
  jsonb_build_object(
    'expires_at', ((raw_user_meta_data->>'expires_at')::timestamp + interval '3 months')::text,
    'extended_at', CURRENT_TIMESTAMP::text
  )
WHERE email = 'user@example.com';
```

---

## Quick Reference

| Duration | Plan Value | Interval |
|----------|-----------|----------|
| 1 Month | `'1_month'` | `interval '1 month'` |
| 3 Months | `'3_months'` | `interval '3 months'` |
| 6 Months | `'6_months'` | `interval '6 months'` |
| 1 Year | `'1_year'` | `interval '1 year'` |
| Lifetime | `'lifetime'` | `null` (no expiry) |

---

## Step-by-Step: Activate 3-Month Premium

1. **Go to Supabase Dashboard** → SQL Editor

2. **Run this query:**
```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data ||
  jsonb_build_object(
    'is_premium', true,
    'plan', '3_months',
    'activated_at', CURRENT_TIMESTAMP::text,
    'expires_at', (CURRENT_TIMESTAMP + interval '3 months')::text
  )
WHERE email = 'ayqureshi1122@gmail.com';
```

3. **Verify it worked:**
```sql
SELECT
  email,
  raw_user_meta_data->>'is_premium' as premium,
  raw_user_meta_data->>'expires_at' as expires
FROM auth.users
WHERE email = 'ayqureshi1122@gmail.com';
```

4. **User can now access premium features immediately!**

---

## Your Code Already Handles This

Your middleware and API routes already check for `is_premium`:

**Middleware (`middleware.ts`):**
```typescript
const isPremium = user.user_metadata?.is_premium === true
```

**API Route (`app/api/solved-papers/get-url/route.ts`):**
```typescript
const isPremium = user.user_metadata?.is_premium === true
```

**No code changes needed!** ✅

---

## Common Mistakes to Avoid

### ❌ Wrong: Mismatch between plan and interval
```sql
'plan', '3_months',  -- Says 3 months
'expires_at', (CURRENT_DATE + interval '6 months')  -- Adds 6 months
```

### ✅ Correct: Plan matches interval
```sql
'plan', '3_months',
'expires_at', (CURRENT_TIMESTAMP + interval '3 months')::text
```

---

### ❌ Wrong: Using CURRENT_DATE (loses time precision)
```sql
'activated_at', CURRENT_DATE::text  -- Only date, no time
```

### ✅ Correct: Using CURRENT_TIMESTAMP (includes time)
```sql
'activated_at', CURRENT_TIMESTAMP::text  -- Full timestamp
```

---

## Save These as SQL Snippets

In Supabase SQL Editor, you can save these queries for quick access:

1. Click "New query" → Name it: "Activate 3m Premium"
2. Paste the 3-month activation SQL
3. Click "Save"
4. Next time: Just update the email and run!

---

## Summary

**To activate 3-month premium for a user:**

1. Go to Supabase SQL Editor
2. Run:
```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data ||
  jsonb_build_object(
    'is_premium', true,
    'plan', '3_months',
    'activated_at', CURRENT_TIMESTAMP::text,
    'expires_at', (CURRENT_TIMESTAMP + interval '3 months')::text
  )
WHERE email = 'USER_EMAIL_HERE';
```
3. Done! ✅

**Your app handles the rest automatically.**

---

Last Updated: January 11, 2026
