# 🚀 Deploy Now - Quick Guide

## Step 1: Apply RLS (2 minutes)

1. Open Supabase Dashboard → SQL Editor
2. Copy entire contents of `supabase/MINIMAL_RLS.sql`
3. Paste and click **Run**
4. Done! ✅

## Step 2: Verify RLS (1 minute)

Run this in SQL Editor:
```sql
SELECT tablename, rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('css_mcqs_enhanced', 'mpt_mcqs', 'past_papers', 'question_reports', 'feedback')
ORDER BY tablename;
```

All should show `RLS Enabled = true` ✅

## Step 3: Test Locally (5 minutes)

```bash
npm run build
npm start
```

Test:
- ✅ Guest can access quizzes (limited)
- ✅ Sign-in popup appears when limit reached
- ✅ After sign-in, unlimited access
- ✅ No console errors

## Step 4: Deploy (2 minutes)

### Vercel:
```bash
vercel --prod
```

### Netlify:
```bash
netlify deploy --prod
```

### Environment Variables (Set in deployment platform):
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Step 5: Verify Production (3 minutes)

1. Visit your production URL
2. Test guest experience (take a quiz)
3. Test sign-in flow
4. Test authenticated experience
5. Check browser console (should be clean)

## ✅ Done!

Your app is now live with:
- ✅ Database security (RLS)
- ✅ Guest trial (3 CSS, 1 MPT, 5 papers)
- ✅ Unlimited access for authenticated users
- ✅ Google OAuth sign-in
- ✅ Production-ready performance

---

## 🐛 If Something Goes Wrong:

### RLS Issues:
- Check Supabase logs
- Verify policies exist: `SELECT * FROM pg_policies;`
- Temporarily disable RLS to test: `ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;`

### Auth Issues:
- Check redirect URLs in Supabase Auth settings
- Add production domain to allowed URLs
- Verify environment variables

### Build Issues:
- Run `npm run build` locally first
- Check for TypeScript errors
- Check for missing dependencies

---

## 📊 Monitor After Deployment:

- Supabase Dashboard → Database → Monitor query performance
- Supabase Dashboard → Auth → Monitor sign-ins
- Browser DevTools → Console → Check for errors
- Browser DevTools → Network → Check API response times

---

**Total Time: ~15 minutes** ⏱️

**You're ready to launch!** 🎉
