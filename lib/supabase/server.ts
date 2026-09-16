import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the SERVICE_ROLE key.
 * This bypasses RLS and must ONLY be imported inside API route handlers.
 * Never import this from a client component.
 */
export function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
