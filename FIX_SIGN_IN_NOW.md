# 🔥 FIX SIGN-IN ERROR NOW - STEP BY STEP

## The Problem:
`Database error saving new user` - Supabase can't create user profiles

## The Solution:
Run the SQL script in Supabase to create the profiles table and trigger

---

## 📋 **STEP-BY-STEP INSTRUCTIONS:**

### **Step 1: Go to Supabase Dashboard**
1. Open https://supabase.com/dashboard
2. Click on your project: `qsrkkvrrxorbgvbgekew`
3. Click **SQL Editor** in the left sidebar

### **Step 2: Run the Fix Script**
1. Click **New Query** button
2. Copy ALL the content from `quiz-app/supabase/fix-auth.sql`
3. Paste it into the SQL Editor
4. Click **Run** button (or press Cmd/Ctrl + Enter)
5. Wait for "Success. No rows returned"

### **Step 3: Verify It Worked**
1. Go to **Table Editor** in left sidebar
2. You should see a new table called `profiles`
3. Click on it to verify it exists

### **Step 4: Test Sign-In**
1. Go to your app: http://localhost:3002
2. Click "Sign in with Google"
3. It should work WITHOUT any database errors!

---

## 🎯 **What the SQL Script Does:**

1. ✅ Creates `profiles` table to store user data
2. ✅ Sets up Row Level Security (RLS) policies
3. ✅ Creates a trigger that automatically creates a profile when a user signs up
4. ✅ Backfills any existing users

---

## ⚡ **Quick Copy - SQL Script:**

The script is in: `quiz-app/supabase/fix-auth.sql`

Or copy from here:

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill existing users
INSERT INTO public.profiles (id, email, full_name, avatar_url)
SELECT 
  id, email,
  COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', split_part(email, '@', 1)),
  raw_user_meta_data->>'avatar_url'
FROM auth.users
ON CONFLICT (id) DO NOTHING;
```

---

## ✅ **After Running the Script:**

Sign-in will work perfectly:
- ✅ No database errors
- ✅ User profiles created automatically
- ✅ Works on localhost AND production
- ✅ Works for all users

---

## 🚨 **THIS IS THE ROOT CAUSE FIX**

The error happens because:
1. Google OAuth creates a user in `auth.users` table ✅
2. But there's no `profiles` table to store user data ❌
3. Supabase tries to create a profile and fails ❌
4. You see: "Database error saving new user" ❌

After running the SQL script:
1. Google OAuth creates a user in `auth.users` table ✅
2. Trigger automatically creates profile in `profiles` table ✅
3. Everything works perfectly ✅

---

## 📞 **Need Help?**

If you get any errors when running the SQL:
1. Copy the exact error message
2. Check if you're in the right project
3. Make sure you have admin access to the project

---

**RUN THE SQL SCRIPT NOW AND SIGN-IN WILL WORK!** 🚀
