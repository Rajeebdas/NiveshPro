/** Supabase / GoTrue sometimes return JSON strings in `error` or `error_description`. */
export function extractAuthErrorText(raw: string): string {
  let decoded = raw.replace(/\+/g, " ").trim();
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    /* keep decoded as-is */
  }
  decoded = decoded.trim();
  if (decoded.startsWith("{")) {
    try {
      const j = JSON.parse(decoded) as { msg?: string; message?: string };
      return (j.msg ?? j.message ?? decoded).trim();
    } catch {
      return decoded;
    }
  }
  return decoded;
}

export function humanizeAuthErrorMessage(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("provider is not enabled") || m.includes("unsupported provider")) {
    return "That provider is turned off in Supabase. Open your project → Authentication → Providers, enable the one you’re using (e.g. Google), add the OAuth Client ID and Client Secret, then save.";
  }
  return message;
}
