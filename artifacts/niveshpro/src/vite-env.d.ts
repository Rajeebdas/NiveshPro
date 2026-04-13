/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_OAUTH_GOOGLE_URL?: string;
  readonly VITE_OAUTH_APPLE_URL?: string;
  readonly VITE_OAUTH_GITHUB_URL?: string;
  readonly VITE_OAUTH_MICROSOFT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
