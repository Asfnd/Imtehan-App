# FIX: www.imtehan.com Not Loading

## Problem
- `www.imtehan.com` points to R2 (PDFs) → Shows 404
- `imtehan.com` points to Vercel (website) → Works fine

## Solution
Change R2 to use `cdn.imtehan.com` and make `www.imtehan.com` point to your site.

---

## Step 1: Add www.imtehan.com to Vercel

1. Go to: **Vercel Dashboard** → Your Project → **Settings** → **Domains**
2. Click: **Add Domain**
3. Enter: `www.imtehan.com`
4. Click: **Add**
5. Vercel will show you DNS records to add

---

## Step 2: Update Cloudflare DNS

### A. Add www → Vercel

1. Go to: **Cloudflare Dashboard** → Your Domain → **DNS**
2. Find the **www** CNAME record (currently points to R2)
3. **Delete it** or **Edit it**:
   - Type: `CNAME`
   - Name: `www`
   - Target: `cname.vercel-dns.com` (or whatever Vercel shows you)
   - Proxy: ✅ Proxied (orange cloud)

### B. Add cdn → R2

1. In Cloudflare DNS, click: **Add Record**
2. Add:
   - Type: `CNAME`
   - Name: `cdn`
   - Target: `past-papers.your-account-id.r2.cloudflarestorage.com` (or keep pointing to R2)
   - Proxy: ✅ Proxied

---

## Step 3: Update R2 Custom Domain in Cloudflare

1. Go to: **Cloudflare Dashboard** → **R2** → **Buckets** → **past-papers**
2. Go to: **Settings** → **Custom Domains**
3. Find: `www.imtehan.com` → Click **Disconnect**
4. Click: **Connect Domain**
5. Enter: `cdn.imtehan.com`
6. Click: **Connect**
7. Follow DNS setup (should auto-detect the CNAME you added)

---

## Step 4: Update Vercel Environment Variable

1. Go to: **Vercel Dashboard** → **Settings** → **Environment Variables**
2. Find: `NEXT_PUBLIC_R2_CUSTOM_DOMAIN`
3. **Edit** and change value:
   - Old: `www.imtehan.com`
   - New: `cdn.imtehan.com`
4. Check: ✅ Production, ✅ Preview, ✅ Development
5. Click: **Save**

---

## Step 5: Redeploy

1. Go to: **Vercel Dashboard** → **Deployments**
2. Click: **...** on latest deployment
3. Click: **Redeploy**
4. Wait 1-2 minutes

---

## Step 6: Test

After redeployment, test:

### Test 1: Website loads on www
```
https://www.imtehan.com/
```
Should show: Your website (not 404)

### Test 2: Website loads on non-www
```
https://imtehan.com/
```
Should show: Your website (as before)

### Test 3: PDFs load from cdn
```
https://cdn.imtehan.com/current-affairs/2025/CSS%20Current%20Affairs%202025.pdf
```
Should show: PDF file

---

## Quick Alternative (If You Want Fast Fix)

**Just add redirect rule in Cloudflare:**

1. Go to: **Cloudflare Dashboard** → **Rules** → **Page Rules**
2. Click: **Create Page Rule**
3. URL: `www.imtehan.com/*`
4. Setting: **Forwarding URL**
   - Status Code: `301 - Permanent Redirect`
   - Destination URL: `https://imtehan.com/$1`
5. Click: **Save**

This redirects all www traffic to non-www (keeps R2 on www for PDFs, but users get redirected to site).

**BUT this is hacky and will cause confusion. Use the cdn.imtehan.com solution above.**

---

## Summary

**Before:**
- `imtehan.com` → Vercel ✅
- `www.imtehan.com` → R2 ❌ (shows 404 for website)

**After:**
- `imtehan.com` → Vercel ✅
- `www.imtehan.com` → Vercel ✅
- `cdn.imtehan.com` → R2 ✅ (for PDFs)

---

## Timeline

- **Step 1-2:** 3 minutes
- **Step 3:** 2 minutes
- **Step 4:** 1 minute
- **Step 5:** 1-2 minutes (wait for deployment)
- **Step 6:** 30 seconds

**Total: ~10 minutes**
