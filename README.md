# Imtehan (CSS App)

Next.js app for exam practice (CSS, MDCAT, PMS, mock exams, writing coach, and more), with Supabase Auth and hosted on Vercel.

## Local development

```bash
npm install
cp .env.example .env.local   # then set Supabase URL/keys and any other secrets
npm run dev
```

- **Node:** 18.17+ (see `package.json` `engines`).
- **Env:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and any other keys your team already uses (S3, AI grading, etc.).

## Premium access and plan expiry

Premium is stored on the Supabase user in **`user_metadata`** (backed by `raw_user_meta_data` in `auth.users` when using SQL).

The app does **not** rely on `is_premium` alone for timed plans. It uses **`isActivePremium()`** in `lib/is-active-premium.ts`, which means:

- `is_premium` must be `true`, and
- if **`expires_at`** is set and valid, the current time must be **before** that instant; otherwise access is treated as **not** premium, and
- **`plan: 'lifetime'`** or a **missing / empty** `expires_at` is treated as **no time limit** (lifetime or legacy rows).

This is wired through middleware, premium-gated API routes, `useFreeTrial`, and the main UI entry points that previously checked `is_premium` only.

**Admin activation (SQL):** see `PREMIUM_SQL_GUIDE.md` for example `UPDATE auth.users` snippets and how to set `plan`, `activated_at`, and `expires_at` consistently.

### automated test for expiry logic

```bash
npm run test-is-active-premium
```

Runs `scripts/test-is-active-premium.ts` (no network; validates `isActivePremium` rules only).

## Other docs

- `supabase/README.md` — database / migrations
- `PREMIUM_SQL_GUIDE.md` — manual premium management in Supabase SQL
