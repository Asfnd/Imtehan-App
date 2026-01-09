# Cloudflare Cache Rule for Guess Papers

## Quick Start (Recommended)

**If you already have a cache rule for past papers:**

1. Go to your existing past papers cache rule in Cloudflare
2. **Duplicate it** (or create a new one with same settings)
3. Change the URI Path from:
   - `/storage/v1/object/public/css-past-papers/*`
   - TO: `/storage/v1/object/public/css-guess-papers-2026/*`
4. Done! ✅

**That's it!** Use the exact same hostname and settings as your past papers rule.

---

## Why This Is Needed

Guess papers PDFs are stored in Supabase storage. To ensure fast loading and reduce bandwidth costs, we need to cache these PDFs on Cloudflare's edge network.

## Detailed Setup (If Creating from Scratch)

### 1. Go to Cloudflare Dashboard

Navigate to: **https://dash.cloudflare.com**
- Select your domain: **imtehan.com**
- Go to **Caching** → **Cache Rules**

### 2. Create New Cache Rule

Click **"Create Cache Rule"** and use these settings:

#### Rule Name
```
Cache Guess Papers PDFs
```

#### When incoming requests match...

**Use Simple mode:**

- Field: `Hostname`
- Operator: `equals`
- Value: `qsrkkvrrxorbgvbgekew.supabase.co`

**AND**

- Field: `URI Path`
- Operator: `starts with`
- Value: `/storage/v1/object/public/css-guess-papers-2026/`

#### Then...

**Cache eligibility:**
- ✅ Enable: **Eligible for cache**

**Cache TTL:**
- ✅ Enable: **Edge TTL**
  - Set to: **1 month** (2592000 seconds)

- ✅ Enable: **Browser TTL**
  - Set to: **4 hours** (14400 seconds)

**Cache Key:**
- Leave default (uses full URL including query string)

**Origin Cache Control:**
- ✅ Enable: **Respect origin cache headers** (optional, but recommended)

### 3. Deploy the Rule

Click **"Deploy"** to activate the cache rule.

## What This Does

1. **Caches guess papers PDFs on Cloudflare edge servers** for 1 month
2. **Tells browsers to cache PDFs** for 4 hours
3. **Reduces load on Supabase** storage
4. **Speeds up PDF loading** for users worldwide

## Files Cached

This rule will cache all PDFs in the `css-guess-papers-2026` bucket:
- `/storage/v1/object/public/css-guess-papers-2026/Current Affairs.pdf`
- `/storage/v1/object/public/css-guess-papers-2026/Essay.pdf`
- `/storage/v1/object/public/css-guess-papers-2026/General Science & Ability.pdf`
- `/storage/v1/object/public/css-guess-papers-2026/Pakistan Affairs.pdf`
- `/storage/v1/object/public/css-guess-papers-2026/Precis.pdf`

## Important Note About Cloudflare Caching

**For Cloudflare to cache the Supabase storage URLs, one of these must be true:**

1. ✅ Your Supabase storage domain (`qsrkkvrrxorbgvbgekew.supabase.co`) is proxied through Cloudflare
2. ✅ You have a Cloudflare Worker proxying storage requests
3. ✅ OR the PDFs are served through your domain (`imtehan.com`)

**If your Supabase storage is NOT behind Cloudflare:**
- The cache rule won't work
- PDFs will load directly from Supabase (slower, no caching)
- You'll need to set up a Cloudflare Worker or proxy

**If you already have past papers caching working:**
- Use the SAME setup pattern for guess papers
- Just change the bucket name from `css-past-papers` to `css-guess-papers-2026`

## Testing the Cache

After setting up the rule:

1. Open a guess paper in your browser
2. Open Developer Tools → Network tab
3. Refresh the page
4. Look for the PDF request
5. Check response headers:
   - `cf-cache-status: HIT` ✅ (cached by Cloudflare)
   - `cf-cache-status: MISS` ⚠️ (not cached yet, will be on next request)
   - If no `cf-cache-status` header: Cloudflare isn't proxying these requests

## Similar Rules

You should have similar cache rules for:
- ✅ Past Papers: Same hostname + `/storage/v1/object/public/css-past-papers/*`
- ✅ Solved Papers: Same hostname + `/storage/v1/object/public/css-solved-papers/*`
- ✅ Guess Papers: Same hostname + `/storage/v1/object/public/css-guess-papers-2026/*` (this rule)

**Copy your existing past papers cache rule and just change the path!**

## Benefits

- 🚀 **Faster loading**: PDFs served from edge locations near users
- 💰 **Lower costs**: Reduced Supabase storage bandwidth usage
- 📈 **Better UX**: Instant PDF viewing after first load
- 🌍 **Global performance**: Edge caching in 200+ cities worldwide
