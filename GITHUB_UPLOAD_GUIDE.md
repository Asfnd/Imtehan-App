# GitHub Upload Guide

## ✅ What Gets Uploaded (Safe to Push)

Your `.gitignore` is already configured correctly. These will be uploaded:

### Source Code ✅
- `/app` - All your pages and components
- `/components` - Reusable components
- `/lib` - Utility functions and helpers
- `/public` - Static assets (images, sounds, PDFs)
- `/supabase` - Database SQL files

### Config Files ✅
- `package.json` - Dependencies
- `next.config.ts` - Next.js config
- `tsconfig.json` - TypeScript config
- `tailwind.config.ts` - Tailwind config
- `middleware.ts` - Middleware

### Documentation ✅
- All `.md` files (README, guides, etc.)

---

## ❌ What Gets EXCLUDED (Not Uploaded)

These are automatically excluded by `.gitignore`:

### Sensitive Files ❌
- `.env.local` - **NEVER upload this!** (Contains your Supabase keys)
- `.env` - Environment variables
- `*.pem` - SSL certificates

### Build Files ❌
- `/node_modules` - Dependencies (too large, will be installed on deploy)
- `/.next` - Build output (regenerated on deploy)
- `/out` - Export output

### System Files ❌
- `.DS_Store` - Mac system files
- `*.log` - Log files

---

## 🚀 How to Upload to GitHub

### Option 1: Using GitHub Desktop (Easiest)

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Open GitHub Desktop
3. Click **File** → **Add Local Repository**
4. Select your `quiz-app` folder
5. Click **Publish repository**
6. Choose repository name
7. Uncheck "Keep this code private" (or keep it private)
8. Click **Publish repository**
9. Done! ✅

### Option 2: Using Command Line

```bash
# Navigate to quiz-app folder
cd quiz-app

# Initialize git (if not already done)
git init

# Add all files (respects .gitignore)
git add .

# Commit
git commit -m "Initial commit - Quiz app ready for deployment"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option 3: Using VS Code

1. Open `quiz-app` folder in VS Code
2. Click **Source Control** icon (left sidebar)
3. Click **Initialize Repository**
4. Click **+** to stage all files
5. Type commit message: "Initial commit"
6. Click **✓ Commit**
7. Click **Publish Branch**
8. Choose repository name
9. Done! ✅

---

## ⚠️ IMPORTANT: Before Uploading

### 1. Verify .env.local is NOT included

```bash
# Run this in quiz-app folder:
git status

# Make sure .env.local is NOT listed
# If it is, add it to .gitignore:
echo ".env.local" >> .gitignore
```

### 2. Check what will be uploaded

```bash
# See what files will be uploaded:
git status

# Should NOT see:
# - .env.local
# - node_modules/
# - .next/
```

### 3. Remove sensitive data from history (if accidentally committed)

```bash
# If you accidentally committed .env.local:
git rm --cached .env.local
git commit -m "Remove sensitive file"
```

---

## 🔒 Security Checklist

Before pushing to GitHub:

- [ ] `.env.local` is in `.gitignore`
- [ ] No Supabase keys in source code
- [ ] No API keys in source code
- [ ] No passwords in source code
- [ ] `.gitignore` is working correctly

---

## 📦 After Uploading to GitHub

### Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - Framework: **Next.js** (auto-detected)
   - Root Directory: `./` (or `quiz-app` if you uploaded parent folder)
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **Deploy**
7. Done! ✅

### Connect to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub**
4. Select your repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Click **Deploy**
8. Done! ✅

---

## 🔄 Updating Your Code

After making changes:

```bash
# Stage changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push

# Vercel/Netlify will auto-deploy! 🚀
```

---

## 📁 Repository Structure

Your GitHub repo will look like this:

```
quiz-app/
├── app/                    # Next.js pages
├── components/             # React components
├── lib/                    # Utilities
├── public/                 # Static files
├── supabase/              # Database SQL
├── .gitignore             # Excluded files
├── package.json           # Dependencies
├── next.config.ts         # Next.js config
└── README.md              # Documentation
```

**NOT included:**
- ❌ `.env.local`
- ❌ `node_modules/`
- ❌ `.next/`

---

## ✅ Quick Checklist

- [ ] `.gitignore` exists and is correct
- [ ] `.env.local` is NOT in git
- [ ] Code is committed
- [ ] Pushed to GitHub
- [ ] Repository is public or private (your choice)
- [ ] Ready to connect to Vercel/Netlify

---

## 🆘 Troubleshooting

### "Repository too large"
- Make sure `node_modules/` is in `.gitignore`
- Run: `git rm -r --cached node_modules`

### ".env.local was uploaded by mistake"
```bash
git rm --cached .env.local
git commit -m "Remove sensitive file"
git push --force
```

### "Can't push to GitHub"
- Make sure you created the repository on GitHub first
- Check your GitHub credentials
- Try using GitHub Desktop instead

---

**You're ready to upload!** 🚀

Choose your preferred method above and follow the steps.
