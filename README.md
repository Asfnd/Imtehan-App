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

### keeping the database in sync (auto “downgrade” in Supabase)

The in-app check does **not** by itself set `is_premium` to `false` in the database. For **automatic** DB updates (so reports and SQL no longer show “still premium” after `expires_at`):

1. Set **`CRON_SECRET`** in Vercel (and `SUPABASE_SERVICE_ROLE_KEY` — you already use it for server jobs) to the **same** value in both places.
2. **`vercel.json`** schedules **`GET /api/cron/deactivate-expired-premium`** daily (02:00 UTC). Vercel sends `Authorization: Bearer <CRON_SECRET>`.
3. The route uses the **Supabase service role** to list users, find accounts that are still `is_premium` but have a **past** `expires_at` (and not `plan: 'lifetime'`), and updates **`user_metadata`** to `is_premium: false` plus `deactivated_at` / `deactivation_reason`.

**Manual run (e.g. after deploy):** `curl -H "Authorization: Bearer YOUR_CRON_SECRET" "https://your-domain.com/api/cron/deactivate-expired-premium"`.

**No Vercel:** use the same `curl` from GitHub Actions, an external cron, or the **deactivate** SQL in `PREMIUM_SQL_GUIDE.md` on a schedule in Supabase (e.g. pg_cron) if you prefer SQL-only.

### automated tests (premium; no network)

```bash
npm run test-premium
```

Runs `isActivePremium` (`scripts/test-is-active-premium.ts`), set/mock gate rules (`scripts/test-premium-gates.ts`, see `lib/premium-gates.ts`), and DB deactivate logic (`scripts/test-deactivate-expired-db.ts`).

```bash
npm run test-is-active-premium
npm run test-premium-gates
npm run test-deactivate-db
```

## Other docs

- `supabase/README.md` — database / migrations
- `PREMIUM_SQL_GUIDE.md` — manual premium management in Supabase SQL
