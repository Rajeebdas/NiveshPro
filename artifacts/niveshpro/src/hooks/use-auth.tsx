import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { extractAuthErrorText, humanizeAuthErrorMessage } from "@/lib/auth-errors";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const client = getSupabaseBrowserClient();
    if (!client) {
      setSession(null);
      setUser(null);
      setLoading(false);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.startsWith("#")
      ? window.location.hash.slice(1)
      : "";
    const hashParams = new URLSearchParams(hash);
    const errMsg =
      params.get("error_description") ??
      params.get("error") ??
      hashParams.get("error_description") ??
      hashParams.get("error");

    if (errMsg) {
      toast({
        variant: "destructive",
        title: "Sign-in error",
        description: humanizeAuthErrorMessage(extractAuthErrorText(errMsg)),
      });
      const base = import.meta.env.BASE_URL.endsWith("/")
        ? import.meta.env.BASE_URL
        : `${import.meta.env.BASE_URL}/`;
      window.history.replaceState({}, "", base);
    }

    void client.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signOut = useCallback(async () => {
    const client = getSupabaseBrowserClient();
    await client?.auth.signOut();
  }, []);

  const value = useMemo(
    () => ({ user, session, loading, signOut }),
    [user, session, loading, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

/** Google / OIDC metadata shape varies; normalize display fields. */
export function getProfileFromUser(user: User | null): {
  name: string;
  email: string;
  avatarUrl: string | null;
  initials: string;
} {
  if (!user) {
    return { name: "", email: "", avatarUrl: null, initials: "?" };
  }
  const meta = user.user_metadata as Record<string, unknown>;
  const name =
    (typeof meta.full_name === "string" && meta.full_name) ||
    (typeof meta.name === "string" && meta.name) ||
    user.email?.split("@")[0] ||
    "Account";
  const email = user.email ?? "";
  const avatarUrl =
    (typeof meta.avatar_url === "string" && meta.avatar_url) ||
    (typeof meta.picture === "string" && meta.picture) ||
    null;
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials =
    parts.length >= 2
      ? `${parts[0]![0]!}${parts[parts.length - 1]![0]!}`.toUpperCase()
      : name.slice(0, 2).toUpperCase() || "?";

  return { name, email, avatarUrl, initials };
}
