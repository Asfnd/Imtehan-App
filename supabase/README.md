# Supabase Database Setup

## Quick Setup

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project: https://supabase.com/dashboard/project/qsrkkvrrxorbgvbgekew
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy the entire contents of `migrations/001_initial_schema.sql`
5. Paste it into the SQL editor
6. Click "Run" button
7. Wait for success message ✅

### Option 2: Using Supabase CLI

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref qsrkkvrrxorbgvbgekew

# Run migrations
supabase db push
```

## What This Creates

### Tables

1. **users** - User profiles with XP, level, streaks
2. **quizzes** - Generated quizzes with caching
3. **quiz_history** - User quiz completion records
4. **insights_cache** - Cached AI insights
5. **quiz_packs** - Offline quiz packs

### Views

- **user_topic_performance** - Aggregated performance by topic

### Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Public read access for quizzes and quiz packs

## Verify Setup

After running the migration, verify in Supabase Dashboard:

1. Go to "Table Editor"
2. You should see all 5 tables
3. Click on "users" table - should be empty but ready
4. Check "Database" > "Extensions" - UUID extension should be enabled

## Next Steps

After database setup:
1. Configure authentication (Task 3)
2. Seed initial quiz data
3. Test API connections

## Troubleshooting

### Error: "relation already exists"
- Tables already created, you're good to go!

### Error: "permission denied"
- Make sure you're using the service role key for migrations
- Or run via Supabase Dashboard as project owner

### Need to Reset?
```sql
-- Run this in SQL Editor to drop all tables
DROP TABLE IF EXISTS public.quiz_packs CASCADE;
DROP TABLE IF EXISTS public.insights_cache CASCADE;
DROP TABLE IF EXISTS public.quiz_history CASCADE;
DROP TABLE IF EXISTS public.quizzes CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP MATERIALIZED VIEW IF EXISTS public.user_topic_performance CASCADE;
```

Then re-run the migration.
