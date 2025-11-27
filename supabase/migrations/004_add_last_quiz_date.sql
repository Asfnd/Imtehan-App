-- Add last_quiz_date column to users table for streak tracking
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS last_quiz_date TIMESTAMPTZ;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_users_last_quiz_date ON users(last_quiz_date);

-- Add comment
COMMENT ON COLUMN users.last_quiz_date IS 'Timestamp of the last quiz completion for streak calculation';
