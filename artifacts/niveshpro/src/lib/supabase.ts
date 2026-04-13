import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null | undefined;

/**
 * Browser Supabase client (anon key). Returns null if env is missing.
 * Configure in Supabase: Authentication → URL configuration → Redirect URLs
 * (include e.g. http://localhost:5173/ and production origin + base path).
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (browserClient !== undefined) {
    return browserClient;
  }
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    browserClient = null;
    return null;
  }
  browserClient = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  });
  return browserClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
  );
}
