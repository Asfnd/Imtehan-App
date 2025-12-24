# Security: RLS Policy Fixes

## Overview
This document outlines the Row Level Security (RLS) policy changes needed to fix critical security vulnerabilities in the Supabase database. These policies prevent users from accessing or modifying other users' data.

## Critical Issues Fixed

### 1. User-Owned Data Protection
All user-related tables now include checks to ensure users can only access their own data.

### 2. Admin-Only Operations
Sensitive operations (like inserting quiz questions) now require explicit admin role verification.

### 3. Data Isolation
Users cannot view or modify other users' quiz history, profiles, or submissions.

---

## RLS Policies to Apply

### Table: `users`

**Allow users to read their own profile:**
```sql
CREATE POLICY "Users can read their own profile"
  ON users
  FOR SELECT
  USING (auth.uid() = id);
```

**Allow users to update their own profile:**
```sql
CREATE POLICY "Users can update their own profile"
  ON users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
```

**Allow insert during signup (handled by Supabase Auth):**
```sql
CREATE POLICY "Users can insert their own profile"
  ON users
  FOR INSERT
  WITH CHECK (auth.uid() = id);
```

---

### Table: `quiz_history`

**Allow users to read their own quiz history:**
```sql
CREATE POLICY "Users can read their own quiz history"
  ON quiz_history
  FOR SELECT
  USING (auth.uid() = user_id);
```

**Allow users to insert their own quiz history:**
```sql
CREATE POLICY "Users can insert their own quiz history"
  ON quiz_history
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

**Allow users to update their own quiz history:**
```sql
CREATE POLICY "Users can update their own quiz history"
  ON quiz_history
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

---

### Table: `css_mcqs_enhanced` (Quiz Questions)

**Allow anyone to read quiz questions (public):**
```sql
CREATE POLICY "Anyone can read quiz questions"
  ON css_mcqs_enhanced
  FOR SELECT
  USING (true);
```

**RESTRICT: Only admins can insert quiz questions:**
```sql
CREATE POLICY "Only admins can insert quiz questions"
  ON css_mcqs_enhanced
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );
```

**RESTRICT: Only admins can update quiz questions:**
```sql
CREATE POLICY "Only admins can update quiz questions"
  ON css_mcqs_enhanced
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );
```

**RESTRICT: Only admins can delete quiz questions:**
```sql
CREATE POLICY "Only admins can delete quiz questions"
  ON css_mcqs_enhanced
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );
```

---

### Table: `question_reports`

**Allow users to read their own reports:**
```sql
CREATE POLICY "Users can read their own reports"
  ON question_reports
  FOR SELECT
  USING (auth.uid() = user_id);
```

**Allow users to insert their own reports:**
```sql
CREATE POLICY "Users can insert their own reports"
  ON question_reports
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

**RESTRICT: Only admins can view all reports:**
```sql
CREATE POLICY "Admins can view all reports"
  ON question_reports
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );
```

**RESTRICT: Only admins can update reports:**
```sql
CREATE POLICY "Admins can update reports"
  ON question_reports
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );
```

---

### Table: `feedback`

**Allow users to read all feedback (feedback is public):**
```sql
CREATE POLICY "Anyone can read feedback"
  ON feedback
  FOR SELECT
  USING (true);
```

**Allow authenticated users to insert feedback:**
```sql
CREATE POLICY "Authenticated users can insert feedback"
  ON feedback
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
```

**RESTRICT: Only admins can update feedback:**
```sql
CREATE POLICY "Admins can update feedback"
  ON feedback
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );
```

---

### Table: `admin_users`

**RESTRICT: Only the user themselves can read admin status:**
```sql
CREATE POLICY "Users can read their own admin status"
  ON admin_users
  FOR SELECT
  USING (auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );
```

**RESTRICT: Only super-admins can insert admin users:**
```sql
CREATE POLICY "Only super-admins can manage admin users"
  ON admin_users
  FOR INSERT
  WITH CHECK (false); -- Only use direct database access for this
```

---

## Implementation Steps

1. **Enable RLS on all tables:**
   ```sql
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE quiz_history ENABLE ROW LEVEL SECURITY;
   ALTER TABLE css_mcqs_enhanced ENABLE ROW LEVEL SECURITY;
   ALTER TABLE question_reports ENABLE ROW LEVEL SECURITY;
   ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
   ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
   ```

2. **Create admin_users table (if doesn't exist):**
   ```sql
   CREATE TABLE IF NOT EXISTS admin_users (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(user_id)
   );

   ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
   ```

3. **Apply all policies listed above**

4. **Test policies:**
   - Create test users
   - Verify user A cannot see user B's quiz history
   - Verify non-admins cannot modify quiz questions
   - Verify admins can manage reports and feedback

5. **Monitor for errors:**
   - Check Supabase logs for RLS violations
   - Fix any legitimate application errors

---

## Security Benefits

✅ Users can only access their own data
✅ Quiz questions are read-only for non-admins
✅ Reports are isolated per user (except admins)
✅ Admin operations require explicit verification
✅ Defense against unauthorized data access
✅ Prevents privilege escalation

---

## Breaking Changes

None - existing legitimate queries will work as before. Only unauthorized queries will be blocked.

---

## Testing Checklist

- [ ] User signup creates user record
- [ ] User can read own profile
- [ ] User cannot read other users' profiles
- [ ] User can submit quiz history
- [ ] User cannot access other users' quiz history
- [ ] User can read quiz questions
- [ ] User cannot modify quiz questions (non-admin)
- [ ] Admin can view all reports
- [ ] User can report questions
- [ ] Admin can update report status
- [ ] Feedback submissions work
- [ ] Admin can manage feedback

---

## Troubleshooting

**Issue: "new row violates row-level security policy"**
- Verify RLS is correctly applied
- Check `auth.uid()` is returning correct user ID
- Ensure user_id matches authenticated user

**Issue: "Permission denied" on read operations**
- Check SELECT policy includes the operation
- Verify using correct user ID comparison

**Issue: Admin operations failing**
- Verify user exists in `admin_users` table
- Check admin policies reference correct table

---

## Questions?

For security-related questions, review the comments in each policy and ensure they match your app's logic.
