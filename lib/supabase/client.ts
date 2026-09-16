import { createClient } from "@supabase/supabase-js";

/**
 * Browser-safe Supabase client using the public anon key.
 * This respects RLS policies — anon has no table access in our schema.
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
