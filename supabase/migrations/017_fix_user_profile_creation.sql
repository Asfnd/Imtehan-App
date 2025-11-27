-- Fix user profile creation - ensure trigger and policies work correctly

-- Recreate the function to handle profile creation
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, is_verified, created_at, updated_at)
  VALUES (
    NEW.id, 
    NEW.email_confirmed_at IS NOT NULL,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the user creation
    RAISE WARNING 'Failed to create user profile for %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- Add policy to allow service role to insert profiles
DROP POLICY IF EXISTS "Service role can insert profiles" ON user_profiles;
CREATE POLICY "Service role can insert profiles"
  ON user_profiles
  FOR INSERT
  WITH CHECK (true);

-- Add policy to allow users to insert their own profile (fallback)
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Backfill: Create profiles for existing users who don't have one
INSERT INTO user_profiles (id, is_verified, created_at, updated_at)
SELECT 
  au.id,
  au.email_confirmed_at IS NOT NULL,
  COALESCE(au.created_at, NOW()),
  NOW()
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
WHERE up.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Verify the setup
DO $$
DECLARE
  trigger_count INTEGER;
  policy_count INTEGER;
BEGIN
  -- Check trigger
  SELECT COUNT(*) INTO trigger_count
  FROM pg_trigger
  WHERE tgname = 'on_auth_user_created';
  
  IF trigger_count > 0 THEN
    RAISE NOTICE '✅ Trigger on_auth_user_created exists';
  ELSE
    RAISE WARNING '❌ Trigger on_auth_user_created not found';
  END IF;
  
  -- Check policies
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies
  WHERE tablename = 'user_profiles';
  
  RAISE NOTICE '✅ Found % policies on user_profiles table', policy_count;
END $$;

