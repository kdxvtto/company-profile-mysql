-- Migration: refresh token hashing/rotation + audit timestamps
-- Apply manually and skip statements that are not applicable for your DB state.

-- Add new columns (if missing)
ALTER TABLE users
  ADD COLUMN refreshTokenHash VARCHAR(512) NULL,
  ADD COLUMN lastLogoutAt DATETIME NULL,
  ADD COLUMN lastLoginAt DATETIME NULL,
  ADD COLUMN lastRefreshAt DATETIME NULL;

-- Add index for refreshTokenHash
CREATE INDEX users_refreshTokenHash_idx ON users (refreshTokenHash);

-- Update role default to staff
ALTER TABLE users
  MODIFY role ENUM('admin','staff') NOT NULL DEFAULT 'staff';

-- Drop plaintext refresh token column (if still exists)
ALTER TABLE users
  DROP COLUMN refreshToken;

-- Drop old index if it exists
DROP INDEX users_refreshToken_idx ON users;
