import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the service_role key.
 * Bypasses RLS — use only in Route Handlers and Server Components.
 * NEVER expose this client or key to the browser.
 */
export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

/**
 * Server-side Supabase client using the anon key.
 * Respects RLS — safe for public data queries from the server.
 */
export function getSupabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
