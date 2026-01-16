# Vercel Deployment Checklist - R2 Migration

## ✅ Code Deployed

**Commit:** `6e23de4` - "Update premium pricing and remove Easypaisa payment"

**What was deployed:**
- ✅ New pricing: Rs. 999 / Rs. 1,499 / Rs. 1,999
- ✅ Easypaisa payment removed (UBL only)
- ✅ R2 PDF proxy route (`/api/pdf/proxy`)
- ✅ Idioms category removed from past papers
- ✅ Mobile-friendly category layout

**Deployment:** Vercel will auto-deploy in 1-2 minutes

---

## 🔧 Vercel Environment Variables - ACTION REQUIRED

Since you migrated from Supabase Storage to Cloudflare R2, you need to verify one environment variable in Vercel:

### **Required Environment Variable:**

**Variable:** `NEXT_PUBLIC_R2_CUSTOM_DOMAIN`
**Value:** `www.imtehan.com`
**Type:** Plain Text
**Scope:** Production, Preview, Development

---

## 📋 How to Check/Add in Vercel Dashboard

### **Step 1: Go to Vercel Dashboard**
```
1. Visit: https://vercel.com
2. Select your project: "quiz-app" (or whatever you named it)
3. Go to: Settings → Environment Variables
```

### **Step 2: Verify R2 Environment Variable**

Look for:
```
NEXT_PUBLIC_R2_CUSTOM_DOMAIN = www.imtehan.com
```

**If it exists:** ✅ You're good to go!

**If it doesn't exist:** Add it:
1. Click "Add New"
2. Key: `NEXT_PUBLIC_R2_CUSTOM_DOMAIN`
3. Value: `www.imtehan.com`
4. Check: Production, Preview, Development
5. Click "Save"
6. **Redeploy** (Vercel → Deployments → Click "..." → Redeploy)

---

## 🔍 All Environment Variables You Should Have

Here's what should be in your Vercel dashboard:

### **1. Supabase (Required - for auth/database)**
```
NEXT_PUBLIC_SUPABASE_URL = https://qsrkkvrrxorbgvbgekew.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJI... (your anon key)
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJI... (your service key)
```

### **2. R2 Storage (Required - for PDFs)**
```
NEXT_PUBLIC_R2_CUSTOM_DOMAIN = www.imtehan.com
```

### **3. App Configuration (Required)**
```
NEXT_PUBLIC_APP_URL = https://imtehan.com
JWT_SECRET = your-jwt-secret-here
```

### **4. Email Service (Optional - for notifications)**
```
RESEND_API_KEY = re_DQL2yzHW_... (your Resend key)
```

### **5. Google Analytics (Optional)**
```
NEXT_PUBLIC_GA_ID = G-HSB62WEM06
```

### **6. AI Service (Optional - if using)**
```
HUGGINGFACE_API_KEY = hf_HxKfKhzL... (your HF key)
```

---

## ⚠️ Important: What You DON'T Need

Since R2 is accessed via **public custom domain** (`www.imtehan.com`), you do NOT need:

- ❌ `R2_ACCESS_KEY_ID` (not needed)
- ❌ `R2_SECRET_ACCESS_KEY` (not needed)
- ❌ `R2_BUCKET_NAME` (hardcoded in code)
- ❌ `R2_ACCOUNT_ID` (hardcoded in code)

**Why?** Your PDFs are publicly accessible via `www.imtehan.com`, no authentication required.

---

## 🚀 Deployment Status Check

### **Monitor Deployment:**
```
1. Go to: Vercel Dashboard → Your Project → Deployments
2. Look for latest commit: "Update premium pricing and remove Easypaisa payment"
3. Wait for status: "Ready" (usually 1-2 minutes)
```

### **Expected Status:**
```
✅ Building... (30 seconds)
✅ Deploying... (30 seconds)
✅ Ready (green checkmark)
```

**If deployment fails:**
- Check the build logs
- Verify environment variables
- Most common issue: Missing `NEXT_PUBLIC_R2_CUSTOM_DOMAIN`

---

## 🧪 Post-Deployment Testing

After Vercel deployment completes, test these:

### **1. Test Pricing Page**
```
Visit: https://imtehan.com/css/premium

✅ Check: 3 Months = Rs. 999
✅ Check: 6 Months = Rs. 1,499
✅ Check: 12 Months = Rs. 1,999
✅ Check: Only UBL payment method (no Easypaisa)
```

### **2. Test PDF Loading**
```
Visit: https://imtehan.com/css/past-papers

✅ Click any PDF
✅ Should load in iframe
✅ Check browser console for errors (F12)
✅ Verify URL is: /api/pdf/proxy?url=...
```

### **3. Test Past Papers Categories**
```
Visit: https://imtehan.com/css/past-papers

✅ Check: Only 3 categories (All, Compulsory, Optional)
✅ Check: No "Idioms" category
✅ Check: Horizontal layout (single line)
✅ Test on mobile: Should be responsive
```

### **4. Test FAQ**
```
Visit: https://imtehan.com/faq

✅ Check: "What payment methods do you accept?"
✅ Should say: "UBL Bank transfer only"
✅ No mention of Easypaisa
```

---

## 🔥 Common Deployment Issues & Fixes

### **Issue 1: PDFs Not Loading**

**Symptom:** PDFs show 404 or don't load

**Fix:**
1. Check Vercel environment variable: `NEXT_PUBLIC_R2_CUSTOM_DOMAIN`
2. Should be: `www.imtehan.com` (no https://, no trailing slash)
3. Redeploy after adding variable

**Test:**
```bash
curl -I https://imtehan.com/api/pdf/proxy?url=https://www.imtehan.com/geology/2022/geology_2022.pdf
# Should return: HTTP/2 200
```

---

### **Issue 2: Pricing Not Updated**

**Symptom:** Still showing old prices (Rs. 499/999/1,499)

**Fix:**
1. Clear browser cache (Ctrl+Shift+R)
2. Check Vercel deployment status (should be "Ready")
3. Verify commit was deployed (check deployment logs)

---

### **Issue 3: Build Errors**

**Symptom:** Vercel deployment shows "Failed"

**Common causes:**
- Missing environment variables
- TypeScript errors
- Import errors

**Fix:**
1. Check Vercel build logs
2. Ensure all env vars are set
3. Run locally first: `npm run build`

---

## 📊 Expected Performance

After deployment, your app should have:

### **PDF Loading:**
- First load: 500ms - 2 seconds
- Cached load: Instant (browser cache)
- Cloudflare edge cache: 50-200ms (if configured)

### **Pricing Page:**
- Load time: < 1 second
- Mobile responsive: ✅
- Payment flow: Simplified (UBL only)

### **Past Papers:**
- Category filter: 3 options (horizontal layout)
- Mobile friendly: ✅
- PDF viewing: Smooth iframe loading

---

## ✅ Final Checklist

Before announcing new pricing to influencer:

- [ ] Vercel deployment status: "Ready"
- [ ] Visit https://imtehan.com/css/premium - verify new pricing
- [ ] Test PDF loading on production
- [ ] Check mobile responsiveness
- [ ] Verify UBL payment details are correct
- [ ] Test WhatsApp link works
- [ ] Verify past papers categories (no idioms)
- [ ] Check FAQ mentions UBL only
- [ ] Environment variables verified in Vercel
- [ ] No console errors (F12 → Console)

---

## 🎯 What's Changed in Production

### **User-Facing Changes:**

1. **Pricing Increase:**
   - 3 months: Rs. 499 → Rs. 999 (+100%)
   - 6 months: Rs. 999 → Rs. 1,499 (+50%)
   - 12 months: Rs. 1,499 → Rs. 1,999 (+33%)

2. **Payment Simplified:**
   - Removed: Easypaisa (03044244421)
   - Kept: UBL Bank Transfer only
   - Reduced user confusion

3. **Past Papers UI:**
   - Removed: "Idioms" category
   - Layout: Horizontal single-line (mobile-friendly)
   - Cleaner, simpler interface

4. **PDF System:**
   - Backend: Migrated to Cloudflare R2
   - Frontend: Same user experience
   - Performance: 1-year browser caching
   - Loading: Improved with proxy route

### **Backend Changes:**

1. **Storage Migration:**
   - From: Supabase Storage
   - To: Cloudflare R2 (via custom domain)
   - PDFs: Publicly accessible at www.imtehan.com

2. **Rate Limiting:**
   - Limit: 10 requests per 10 seconds
   - Applies to: PDF proxy and all API routes
   - Protection: Bot detection and IP tracking

3. **Security:**
   - PDF caching: 1 year (immutable)
   - Headers: X-Frame-Options removed for PDF proxy
   - CSP: Updated for R2 domain

---

## 🚀 Next Steps After Deployment

1. **Monitor Vercel Dashboard** (first 30 minutes)
   - Check for errors
   - Verify traffic flows normally
   - Watch for 500 errors

2. **Test from Multiple Devices**
   - Desktop browser
   - Mobile browser
   - Different networks (WiFi, mobile data)

3. **Prepare Influencer Launch**
   - Premium page URL: https://imtehan.com/css/premium
   - Pricing: Rs. 999 / Rs. 1,499 / Rs. 1,999
   - Payment: UBL Bank Transfer only
   - WhatsApp: +92 326 7426824

4. **Optional: Notify Existing Users**
   - Email your 2 premium users about price change
   - Offer to grandfather them at old price (loyalty)

---

## 📞 Need Help?

If something goes wrong:

1. **Check Vercel Logs:**
   - Dashboard → Deployments → Click on deployment → View Function Logs

2. **Check Browser Console:**
   - F12 → Console tab
   - Look for red errors

3. **Test API Route:**
   ```bash
   curl https://imtehan.com/api/pdf/proxy?url=https://www.imtehan.com/geology/2022/geology_2022.pdf
   ```

4. **Rollback if Needed:**
   - Vercel → Deployments → Previous deployment → Click "..." → Promote to Production

---

## ✨ Summary

**Deployment Status:** ✅ Pushed to GitHub (Vercel auto-deploying)

**Environment Variables Needed:**
- ✅ `NEXT_PUBLIC_R2_CUSTOM_DOMAIN = www.imtehan.com`
- ✅ All existing Supabase variables (keep them)

**What Changed:**
- 🔥 Pricing: Rs. 999 / Rs. 1,499 / Rs. 1,999
- 💳 Payment: UBL only (Easypaisa removed)
- 📱 UI: Cleaner past papers layout
- 📄 Backend: R2 storage with PDF proxy

**Ready for influencer marketing campaign!** 🚀
