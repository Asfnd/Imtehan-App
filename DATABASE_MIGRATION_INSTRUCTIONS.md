# Database Migration Instructions - Server-Side Usage Tracking

## Overview
This migration implements server-side usage tracking that **cannot be bypassed** by clearing browser data, changing browsers, or using VPN. All usage limits are now stored in the database for signed-in users.

## Migration File
`/supabase/migrations/020_user_usage_tracking.sql`

## How to Apply the Migration

### Method 1: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `/supabase/migrations/020_user_usage_tracking.sql`
5. Paste into the SQL editor
6. Click **Run** to execute the migration
7. Verify the table was created by going to **Table Editor** → Look for `user_usage_tracking`

### Method 2: Using Supabase CLI
```bash
# If you have Supabase CLI installed
supabase db push

# Or run the migration directly
supabase db execute -f supabase/migrations/020_user_usage_tracking.sql
```

## What This Migration Creates

### 1. Table: `user_usage_tracking`
Stores usage counts for each user with the following fields:
- `user_id` (UUID) - Links to auth.users
- `css_subject_quizzes` (INTEGER) - Count of CSS subject quizzes taken
- `css_idioms_quizzes` (INTEGER) - Count of CSS idioms (by year) quizzes taken
- `css_idioms_random` (INTEGER) - Count of random idioms quizzes taken
- `mpt_mock_tests` (INTEGER) - Count of MPT mock tests taken
- `mpt_past_papers` (INTEGER) - Count of MPT past papers quizzes taken
- `official_past_papers` (INTEGER) - Count of official past papers viewed
- `solved_papers` (INTEGER) - Count of solved papers viewed
- `created_at`, `updated_at` (TIMESTAMPTZ) - Timestamps

### 2. RLS (Row Level Security) Policies
- **Read Policy**: Users can only read their own usage data
- **Insert Policy**: Users can only create their own usage record
- **Update Policy**: Users can only update their own usage record
- **Delete Policy**: Users can only delete their own usage record

### 3. Database Function: `get_or_create_user_usage`
Automatically creates a usage record if it doesn't exist, or returns the existing one.

### 4. Trigger: Auto-update `updated_at`
Automatically updates the `updated_at` timestamp whenever a record is modified.

## Security Features

✅ **Cannot be bypassed by**:
- Clearing browser data (cookies, localStorage, cache)
- Using incognito/private mode
- Switching browsers
- Using VPN or changing IP address
- Clearing site data

✅ **Server-side validation**: All checks happen on the server via API routes

✅ **Database-enforced limits**: Limits are stored in PostgreSQL with RLS policies

✅ **User-specific tracking**: Each user has their own usage record in the database

## How It Works

### For Guest Users (Not Signed In)
- Uses localStorage (temporary, can be cleared)
- Limits reset when browser data is cleared
- Purpose: Allow limited trial before requiring sign-in

### For Signed-In Users
- Uses database tracking (permanent, cannot be bypassed)
- Limits persist across all devices and browsers
- Tracked via `user_usage_tracking` table

### Flow:
1. User signs in
2. System fetches usage from database via `/api/usage` (GET)
3. User attempts to access content
4. System checks database usage vs limits (server-side)
5. If allowed, usage is incremented in database via `/api/usage` (POST)
6. Database updates persist forever (or until manually reset)

## Verification Steps

After running the migration, verify it works:

1. **Check Table Creation**:
   - Go to Supabase Dashboard → Table Editor
   - Verify `user_usage_tracking` table exists

2. **Test RLS Policies**:
   - Sign in to your app
   - Take a quiz or access content
   - Go to Supabase → Table Editor → `user_usage_tracking`
   - You should see a record for your user with incremented counts

3. **Test Bypass Prevention**:
   - Note your current usage count
   - Clear browser data / use different browser
   - Sign in again
   - Your usage count should be the same (not reset)

## API Endpoints

### GET `/api/usage`
Fetches current usage for signed-in user
```typescript
Response: {
  usage: {
    cssSubjectQuizzes: 2,
    cssIdiomsQuizzes: 1,
    // ... other fields
  },
  limits: { ... },
  isPremium: false
}
```

### POST `/api/usage`
Increments usage count for a specific type
```typescript
Request: { type: 'cssSubject' | 'cssIdioms' | ... }
Response: { success: true, newValue: 3 }
```

## Files Modified

1. `/supabase/migrations/020_user_usage_tracking.sql` - Migration file ✅
2. `/app/api/usage/route.ts` - API endpoint for usage tracking ✅
3. `/lib/hooks/useFreeTrial.ts` - Updated hook to use database ✅
4. All quiz/content pages - Updated to use async `requestAccess()` ✅

## Production Deployment Checklist

- [ ] Run migration in production Supabase project
- [ ] Verify table creation via dashboard
- [ ] Test with a real user account
- [ ] Verify limits persist across browsers
- [ ] Monitor API endpoint for errors
- [ ] Test premium users bypass limits correctly

## Troubleshooting

**Issue**: Migration fails with "relation already exists"
**Solution**: Table already created. Skip migration or drop table first.

**Issue**: RLS policies deny access
**Solution**: Ensure user is authenticated. Check `auth.uid()` matches `user_id`.

**Issue**: Usage not incrementing
**Solution**: Check browser console for API errors. Verify `/api/usage` returns 200.

**Issue**: Limits still reset after clearing browser
**Solution**: User might not be signed in. Database tracking only works for authenticated users.

## Next Steps

After migration is complete:
1. Deploy to production
2. Test with real users
3. Monitor database usage
4. Consider adding analytics for usage patterns
5. Optional: Add admin dashboard to view/reset user limits
