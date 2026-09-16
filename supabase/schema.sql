-- ============================================================
-- Nubpack — Supabase Schema
-- Run this in the Supabase SQL Editor to set up all tables.
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email          TEXT UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,

  -- Step 1
  name           TEXT,
  age            INTEGER,
  pronouns       TEXT,

  -- Step 2
  state          TEXT,
  city           TEXT,
  college        TEXT,

  -- Step 3
  bio            TEXT,
  interests      TEXT[] DEFAULT '{}',

  -- Step 4
  year_of_study   TEXT,
  degree_program  TEXT,
  instagram_url   TEXT,
  linkedin_url    TEXT,

  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles (email);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON profiles;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 2. email_otps
-- ============================================================
CREATE TABLE IF NOT EXISTS email_otps (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT NOT NULL,
  otp_hash   TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  attempts   INTEGER DEFAULT 0,
  verified   BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_email_otps_email ON email_otps (email);
CREATE INDEX IF NOT EXISTS idx_email_otps_expires ON email_otps (expires_at);

-- ============================================================
-- 3. Row Level Security
-- ============================================================

-- Enable RLS on both tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_otps ENABLE ROW LEVEL SECURITY;

-- Profiles: only the service role (used by API routes) can
-- read / write.  The anon key has NO access by default.
-- This means the browser can never directly query profiles.
CREATE POLICY "Service role full access on profiles"
  ON profiles
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- email_otps: same — service role only.
CREATE POLICY "Service role full access on email_otps"
  ON email_otps
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
