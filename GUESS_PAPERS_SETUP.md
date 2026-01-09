# Guess Papers Setup Instructions

## Status
✅ **PDFs Uploaded to Supabase Storage**
✅ **Storage Bucket Created**: `css-guess-papers-2026`
✅ **Application Code Updated**
⏳ **Database Table Needs to be Created**

## What's Done

1. All 5 guess paper PDFs have been uploaded to Supabase storage bucket `css-guess-papers-2026`:
   - Current Affairs.pdf (160.13 KB)
   - Essay.pdf (74.72 KB)
   - General Science & Ability.pdf (171.20 KB)
   - Pakistan Affairs.pdf (118.59 KB)
   - Precis.pdf (221.15 KB)

2. Application code has been updated:
   - Created `lib/guess-papers-storage.ts` for fetching PDFs from Supabase
   - Updated guess papers page to use subject-based routing
   - Updated viewer to fetch from Supabase (same as past papers)
   - Removed download button from viewer

## What's Needed

**Run this SQL in Supabase SQL Editor to complete setup:**

https://supabase.com/dashboard/project/qsrkkvrrxorbgvbgekew/sql/new

```sql
-- Create table
CREATE TABLE IF NOT EXISTS guess_papers_2026 (
  id BIGSERIAL PRIMARY KEY,
  subject TEXT NOT NULL UNIQUE,
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_size BIGINT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_guess_papers_subject ON guess_papers_2026(subject);

ALTER TABLE guess_papers_2026 ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists, then create new one
DO $$
BEGIN
  DROP POLICY IF EXISTS "Allow public read access" ON guess_papers_2026;
  CREATE POLICY "Allow public read access" ON guess_papers_2026
    FOR SELECT USING (is_available = true);
END $$;

-- Insert data
INSERT INTO guess_papers_2026 (subject, filename, storage_path, file_size) VALUES ('Current Affairs', 'Current Affairs.pdf', 'Current Affairs.pdf', 163969) ON CONFLICT (subject) DO NOTHING;
INSERT INTO guess_papers_2026 (subject, filename, storage_path, file_size) VALUES ('Essay', 'Essay.pdf', 'Essay.pdf', 76517) ON CONFLICT (subject) DO NOTHING;
INSERT INTO guess_papers_2026 (subject, filename, storage_path, file_size) VALUES ('General Science & Ability', 'General Science & Ability.pdf', 'General Science & Ability.pdf', 175307) ON CONFLICT (subject) DO NOTHING;
INSERT INTO guess_papers_2026 (subject, filename, storage_path, file_size) VALUES ('Pakistan Affairs', 'Pakistan Affairs.pdf', 'Pakistan Affairs.pdf', 121438) ON CONFLICT (subject) DO NOTHING;
INSERT INTO guess_papers_2026 (subject, filename, storage_path, file_size) VALUES ('Precis', 'Precis.pdf', 'Precis.pdf', 226453) ON CONFLICT (subject) DO NOTHING;
```

## After Running the SQL

Once the SQL is executed, the guess papers will be fully functional and will load from Supabase storage, just like past papers.

## ⚠️ Important: Set Up Cloudflare Cache Rule

To ensure fast loading and reduce bandwidth costs, **you MUST set up a Cloudflare cache rule** for guess papers.

👉 **See detailed instructions in:** `CLOUDFLARE_GUESS_PAPERS_CACHE.md`

**Quick summary:**
1. Go to Cloudflare Dashboard → Caching → Cache Rules
2. Create new rule matching: `storage.imtehan.com/storage/v1/object/public/css-guess-papers-2026/*`
3. Set Edge TTL: 1 month
4. Set Browser TTL: 4 hours

Without this cache rule, PDFs will load slowly and increase Supabase bandwidth costs.

## How It Works

1. User clicks a guess paper button on `/css/guess-papers`
2. Route to `/css/guess-papers/view?subject=Current Affairs`
3. `getGuessPaperUrl()` fetches the PDF URL from Supabase
4. PDF loads from `storage.imtehan.com` (custom storage domain)
5. Same clean PDF viewer as past papers (no download button)
