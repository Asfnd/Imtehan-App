# Google Authentication Setup

## Supabase Configuration

1. Go to your Supabase Dashboard
2. Navigate to **Authentication → URL Configuration**
3. Add redirect URL:
   ```
   http://localhost:3000/auth/callback
   ```
4. Set Site URL:
   ```
   http://localhost:3000
   ```

## Test

Go to: http://localhost:3000/signin

That's it!