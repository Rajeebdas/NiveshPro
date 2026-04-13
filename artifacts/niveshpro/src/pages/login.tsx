import { Link, useLocation } from "wouter";
import type { Provider } from "@supabase/supabase-js";
import { Zap } from "lucide-react";
import { SiApple, SiGithub, SiGoogle } from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { extractAuthErrorText, humanizeAuthErrorMessage } from "@/lib/auth-errors";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase";

type SocialProvider = "google" | "apple" | "github" | "microsoft";

const OAUTH_URL: Record<SocialProvider, string | undefined> = {
  google: import.meta.env.VITE_OAUTH_GOOGLE_URL,
  apple: import.meta.env.VITE_OAUTH_APPLE_URL,
  github: import.meta.env.VITE_OAUTH_GITHUB_URL,
  microsoft: import.meta.env.VITE_OAUTH_MICROSOFT_URL,
};

/** Supabase Auth provider id (Microsoft → `azure`). */
const SUPABASE_PROVIDER: Record<SocialProvider, Provider> = {
  google: "google",
  apple: "apple",
  github: "github",
  microsoft: "azure",
};

const providers: {
  id: SocialProvider;
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "google", label: "Continue with Google", icon: <SiGoogle className="size-5" /> },
  { id: "apple", label: "Continue with Apple", icon: <SiApple className="size-5" /> },
  { id: "github", label: "Continue with GitHub", icon: <SiGithub className="size-5" /> },
  {
    id: "microsoft",
    label: "Continue with Microsoft",
    icon: <FaMicrosoft className="size-5" />,
  },
];

function authRedirectUrl(): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${window.location.origin}${base}/`;
}

export function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  async function handleSocial(provider: SocialProvider) {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: SUPABASE_PROVIDER[provider],
        options: {
          redirectTo: authRedirectUrl(),
        },
      });
      if (error) {
        const raw =
          error.message.trim().startsWith("{")
            ? extractAuthErrorText(error.message)
            : error.message;
        toast({
          variant: "destructive",
          title: "Sign-in failed",
          description: humanizeAuthErrorMessage(raw),
        });
      }
      return;
    }

    const url = OAUTH_URL[provider];
    if (url) {
      window.location.assign(url);
      return;
    }
    toast({
      title: "Sign-in not configured",
      description: `Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local (see .env.example), or set VITE_OAUTH_${provider.toUpperCase()}_URL.`,
    });
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col lg:flex-row">
      <div className="relative flex-1 flex flex-col justify-between p-8 lg:p-14 border-b lg:border-b-0 lg:border-r border-border/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <Link
          href="/"
          className="relative z-10 inline-flex items-center gap-3 w-fit rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
            <Zap size={22} className="fill-current" />
          </div>
          <span className="font-serif text-2xl font-semibold tracking-wide">NiveshPro</span>
        </Link>

        <div className="relative z-10 mt-12 lg:mt-0 max-w-md">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight tracking-tight">
            Welcome back
          </h1>
          <p className="mt-4 text-muted-foreground text-base leading-relaxed">
            Sign in with your preferred account to sync portfolios, goals, and tax
            documents securely across devices.
          </p>
        </div>

        <p className="relative z-10 mt-10 text-xs text-muted-foreground max-w-sm leading-relaxed">
          By continuing, you agree to our Terms and acknowledge our Privacy Policy. Social
          sign-in uses your provider&apos;s secure OAuth flow.
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <Card className="w-full max-w-md border-border/60 bg-card/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="font-serif text-2xl">Sign in</CardTitle>
            <CardDescription>
              {isSupabaseConfigured()
                ? "Social buttons use Supabase Auth. Enable each provider under Authentication → Providers in the Supabase dashboard."
                : "Copy .env.example to .env.local and set your Supabase project URL and anon key, then restart the dev server."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              {providers.map(({ id, label, icon }) => (
                <Button
                  key={id}
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full justify-start gap-3 min-h-11 h-auto py-2.5 border-border/80"
                  onClick={() => void handleSocial(id)}
                >
                  {icon}
                  <span>{label}</span>
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <Separator className="flex-1 bg-border/60" />
              or
              <Separator className="flex-1 bg-border/60" />
            </div>

            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => setLocation("/")}
            >
              Continue to dashboard (demo)
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              <Link href="/" className="text-primary underline-offset-4 hover:underline">
                Back to home
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
