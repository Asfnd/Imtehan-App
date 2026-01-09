# Cloudflare Cache Rule for Guess Papers

## Why This Is Needed

Guess papers PDFs are stored in Supabase storage and served through `storage.imtehan.com`. To ensure fast loading and reduce bandwidth costs, we need to cache these PDFs on Cloudflare's edge network.

## Cloudflare Cache Rule Setup

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
**Custom filter expression:**

```
(http.host eq "storage.imtehan.com" and http.request.uri.path contains "/storage/v1/object/public/css-guess-papers-2026/")
```

**OR use Simple mode:**
- Field: `Hostname`
- Operator: `equals`
- Value: `storage.imtehan.com`

**AND**
- Field: `URI Path`
- Operator: `contains`
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

## Testing the Cache

After setting up the rule:

1. Open a guess paper in your browser
2. Open Developer Tools → Network tab
3. Refresh the page
4. Look for the PDF request
5. Check response headers:
   - `cf-cache-status: HIT` ✅ (cached)
   - `cf-cache-status: MISS` ⚠️ (not cached yet, will be cached on next request)

## Similar Rules

You should have similar cache rules for:
- ✅ Past Papers: `/storage/v1/object/public/css-past-papers/*`
- ✅ Solved Papers: `/storage/v1/object/public/css-solved-papers/*`
- ✅ Guess Papers: `/storage/v1/object/public/css-guess-papers-2026/*` (this rule)

## Benefits

- 🚀 **Faster loading**: PDFs served from edge locations near users
- 💰 **Lower costs**: Reduced Supabase storage bandwidth usage
- 📈 **Better UX**: Instant PDF viewing after first load
- 🌍 **Global performance**: Edge caching in 200+ cities worldwide
