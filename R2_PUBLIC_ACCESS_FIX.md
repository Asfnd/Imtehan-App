# R2 Public Access Fix

## Problem

Your PDFs are uploaded to R2, but they're not publicly accessible. All access attempts fail:

- `www.imtehan.com` → 404 (custom domain not configured for public access)
- Direct R2 URL → 400 (direct access not allowed)
- Public dev URL → 401 (public dev URL not enabled)

## Solution

Enable public access via custom domain in Cloudflare.

### Step 1: Enable Public Access via Custom Domain

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com
   - Select your account
   - Go to: **R2** → **Buckets**
   - Click on: **past-papers** bucket

2. **Go to Settings Tab**

3. **Find "Custom Domains" Section**
   - You should see `www.imtehan.com` listed
   - If not, click "Connect Domain" and add it

4. **Enable Public Access**
   - Look for: **"Allow access"** or **"Public access"** toggle
   - OR find: **"R2.dev subdomain"** section
   - Enable public access through the custom domain

5. **Alternative: Enable Public Development URL (Quick Test)**
   - Find: **"Public Development URL"**
   - Click: **"Enable"**
   - This will create: `https://pub-67225b43c28cc0f6b36a9d5c5ad11b31.r2.dev`
   - Use this for testing (has rate limits, not for production)

### Step 2: Verify Access

After enabling, test in browser:

```
https://www.imtehan.com/current-affairs/2025/current-affairs_2025.pdf
```

Should load the PDF (not 404).

### Step 3: Add Environment Variable in Vercel

1. Go to: Vercel Dashboard → Your Project
2. Go to: **Settings** → **Environment Variables**
3. Add:
   ```
   Key: NEXT_PUBLIC_R2_CUSTOM_DOMAIN
   Value: www.imtehan.com
   ```
4. Environments: ✅ Production, ✅ Preview, ✅ Development
5. Click: **Save**
6. Go to: **Deployments** tab
7. Click: **...** → **Redeploy**

## Quick Test Commands

After fixing Cloudflare settings, test:

```bash
# Test custom domain
curl -I https://www.imtehan.com/current-affairs/2025/current-affairs_2025.pdf

# Should return: HTTP/2 200 (not 404)
```

## Common Issues

### Issue 1: Custom Domain Shows 404

**Cause:** Custom domain is connected but public access isn't enabled for it.

**Fix:**
1. Cloudflare Dashboard → R2 → past-papers → Settings
2. Find public access settings for custom domains
3. Enable it

### Issue 2: Can't Find Public Access Setting

**Cause:** Cloudflare UI varies by account type.

**Fix:**
Try enabling "Public Development URL" first as a test:
1. This will make files accessible at `pub-*.r2.dev`
2. If that works, it proves files are there
3. Then work on custom domain

### Issue 3: Still 404 After Enabling

**Cause:** DNS or Cloudflare caching.

**Fix:**
1. Wait 5-10 minutes for changes to propagate
2. Clear browser cache
3. Try incognito window
4. Check Cloudflare Page Rules aren't blocking

## Expected File Structure in R2

Your R2 bucket should have this structure (which it does):

```
past-papers/
├── current-affairs/
│   ├── 2025/
│   │   └── current-affairs_2025.pdf
│   ├── 2024/
│   │   └── current-affairs_2024.pdf
├── english-essay/
│   ├── 2012/
│   │   └── english_essay_2012.pdf
... etc
```

✅ Your structure is correct!

## What's Needed

Just enable public access in Cloudflare:
1. Either via custom domain `www.imtehan.com`
2. OR via public dev URL (for testing)

Once enabled, everything will work instantly.

## Verification Checklist

After making changes:

- [ ] Cloudflare R2 public access enabled
- [ ] Test URL works: `https://www.imtehan.com/current-affairs/2025/current-affairs_2025.pdf`
- [ ] Returns HTTP 200 (not 404)
- [ ] PDF loads in browser
- [ ] Add `NEXT_PUBLIC_R2_CUSTOM_DOMAIN` to Vercel
- [ ] Redeploy from Vercel
- [ ] Test on production: `https://imtehan.com/css/past-papers`

## Help Needed?

If you can't find the public access settings:

1. Take a screenshot of your Cloudflare R2 bucket settings page
2. I'll guide you exactly where to click
