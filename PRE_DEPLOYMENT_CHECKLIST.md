# Pre-Deployment Checklist

## 🔒 Security

### Database Security
- [ ] Run `supabase/MINIMAL_RLS.sql` in Supabase SQL Editor
- [ ] Verify RLS is enabled on all tables (see verification query in SQL file)
- [ ] Test that guests can read quiz content
- [ ] Test that users can only see their own reports/feedback
- [ ] Confirm Supabase anon key is in environment variables
- [ ] Confirm Supabase service_role key is NOT in frontend code

### Authentication
- [ ] Google OAuth is configured in Supabase Auth settings
- [ ] Redirect URLs are whitelisted in Supabase (production domain)
- [ ] Auth callback route works (`/auth/callback`)
- [ ] Sign-in popup appears for locked content
- [ ] Users are redirected back to the same page after sign-in
- [ ] Sign-out works correctly

### Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- [ ] No sensitive keys in client-side code
- [ ] `.env.local` is in `.gitignore`

## ⚡ Performance

### Build & Bundle
- [ ] Run `npm run build` successfully
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Bundle size is reasonable (<500KB for main bundle)
- [ ] Check build output for warnings

### Loading Speed
- [ ] Test quiz loading time (<2 seconds)
- [ ] Test dashboard loading time (<1 second)
- [ ] Images are optimized
- [ ] Fonts are preloaded
- [ ] No console errors in production build

### Database Queries
- [ ] Quiz queries return in <100ms
- [ ] No N+1 query problems
- [ ] Indexes are created (from MINIMAL_RLS.sql)
- [ ] RLS policies don't slow down queries

## 🎯 Functionality

### Guest Experience (Trial)
- [ ] Guests can access dashboard
- [ ] Guests can take 3 CSS quizzes
- [ ] Guests can take 1 MPT test
- [ ] Guests can view 5 past papers
- [ ] Sign-in popup appears when limits are reached
- [ ] Usage counter shows remaining attempts

### Authenticated Experience
- [ ] Users can sign in with Google
- [ ] Users have unlimited access to all content
- [ ] No usage limits for authenticated users
- [ ] User profile shows in dashboard
- [ ] Sign-out works correctly
- [ ] User data persists across sessions

### Quiz Functionality
- [ ] CSS practice quiz loads questions
- [ ] MPT practice quiz loads questions
- [ ] Past papers load correctly
- [ ] Question navigation works
- [ ] Answer selection works
- [ ] Results screen displays correctly
- [ ] Sound effects work (if enabled)
- [ ] Gamification features work (points, streaks, confetti)

### Mobile Responsiveness
- [ ] Dashboard looks good on mobile
- [ ] Quiz pages work on mobile
- [ ] Sign-in popup works on mobile
- [ ] Touch interactions work smoothly
- [ ] No horizontal scrolling issues

## 🚀 Deployment

### Vercel/Netlify Setup
- [ ] Project is connected to Git repository
- [ ] Environment variables are set in deployment platform
- [ ] Build command is correct (`npm run build`)
- [ ] Output directory is correct (`.next` for Next.js)
- [ ] Node version is specified (18.x or higher)

### Domain & SSL
- [ ] Custom domain is configured (if applicable)
- [ ] SSL certificate is active
- [ ] HTTPS redirect is enabled
- [ ] www redirect is configured (if needed)

### Post-Deployment
- [ ] Test production URL loads correctly
- [ ] Test sign-in flow on production
- [ ] Test quiz functionality on production
- [ ] Check browser console for errors
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices

## 📊 Monitoring

### Analytics (Optional)
- [ ] Google Analytics is set up (if using)
- [ ] Error tracking is configured (Sentry, etc.)
- [ ] Performance monitoring is active

### Database
- [ ] Supabase project is on a paid plan (if needed)
- [ ] Database backups are enabled
- [ ] Monitor database usage in Supabase dashboard

## 🐛 Testing

### Manual Testing
- [ ] Test complete user journey (guest → sign-in → quiz)
- [ ] Test all quiz types (CSS, MPT, Past Papers)
- [ ] Test error scenarios (network errors, etc.)
- [ ] Test with different user accounts
- [ ] Test sign-out and sign-in again

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

## 📝 Documentation

- [ ] README.md is up to date
- [ ] Environment variables are documented
- [ ] Deployment instructions are clear
- [ ] API endpoints are documented (if any)

## ⚠️ Known Issues

Document any known issues or limitations:

- [ ] None currently

## 🎉 Ready to Deploy!

Once all items are checked, you're ready to deploy to production!

### Quick Deploy Commands:

**Vercel:**
```bash
npm run build  # Test build locally first
vercel --prod  # Deploy to production
```

**Netlify:**
```bash
npm run build  # Test build locally first
netlify deploy --prod  # Deploy to production
```

### Post-Deployment Verification:

1. Visit your production URL
2. Test guest experience (take a quiz without signing in)
3. Test sign-in flow
4. Test authenticated experience (unlimited access)
5. Check browser console for errors
6. Monitor Supabase dashboard for any issues

---

## 🆘 Troubleshooting

### If RLS causes issues:

1. Check Supabase logs in dashboard
2. Verify policies with: `SELECT * FROM pg_policies WHERE schemaname = 'public';`
3. Test queries in Supabase SQL Editor
4. Temporarily disable RLS on a table to isolate issue: `ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;`

### If auth doesn't work:

1. Check redirect URLs in Supabase Auth settings
2. Verify environment variables are set correctly
3. Check browser console for auth errors
4. Test with incognito/private browsing mode

### If queries are slow:

1. Check if indexes are created (from MINIMAL_RLS.sql)
2. Monitor query performance in Supabase dashboard
3. Use `EXPLAIN ANALYZE` in SQL Editor to debug slow queries

---

**Last Updated:** $(date)
**Deployment Status:** ⏳ Pending
