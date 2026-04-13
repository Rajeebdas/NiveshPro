import React from "react";
import type { User } from "@supabase/supabase-js";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  PieChart as PieChartIcon,
  ArrowRightLeft,
  Target,
  Receipt,
  Settings,
  Zap,
  LogIn,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getProfileFromUser, useAuth } from "@/hooks/use-auth";
import { isSupabaseConfigured } from "@/lib/supabase";

export function Sidebar() {
  const [location] = useLocation();
  const { user, loading, signOut } = useAuth();
  const supabaseOn = isSupabaseConfigured();

  return (
    <aside className="w-72 border-r border-border/50 bg-background/50 backdrop-blur-xl flex flex-col justify-between hidden md:flex z-10 shrink-0">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 mb-12 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
            <Zap size={20} className="fill-current" />
          </div>
          <span className="font-serif text-2xl font-semibold tracking-wide">NiveshPro</span>
        </Link>

        <nav className="space-y-2">
          <NavItem href="/" icon={LayoutDashboard} label="Dashboard" active={location === "/"} />
          <NavItem href="/portfolio" icon={PieChartIcon} label="Portfolio" active={location === "/portfolio"} />
          <NavItem
            href="/transactions"
            icon={ArrowRightLeft}
            label="Transactions"
            active={location === "/transactions"}
          />
          <NavItem href="/goals" icon={Target} label="Goals" active={location === "/goals"} />
          <NavItem href="/bills" icon={Receipt} label="Bills & Taxes" active={location === "/bills"} />
        </nav>
      </div>

      <div className="p-8">
        <div className="p-5 rounded-2xl bg-secondary/50 border border-border/50 mb-6 relative overflow-hidden group hover:bg-secondary/80 transition-colors duration-500 cursor-pointer">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
          <h4 className="font-medium mb-1">Unlock Premium</h4>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Get advanced tax-loss harvesting insights.
          </p>
          <Button
            variant="link"
            className="p-0 h-auto text-primary font-medium hover:no-underline flex items-center gap-1 group/btn"
          >
            Upgrade now <ArrowRightLeft size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>

        <nav className="space-y-2">
          {!user && <NavItem href="/login" icon={LogIn} label="Sign in" />}
          {user && (
            <button
              type="button"
              onClick={() => void signOut()}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            >
              <LogOut size={20} />
              <span>Sign out</span>
            </button>
          )}
          <NavItem href="#" icon={Settings} label="Settings" />
        </nav>

        <SidebarProfile supabaseOn={supabaseOn} loading={loading} user={user} />
      </div>
    </aside>
  );
}

function SidebarProfile({
  supabaseOn,
  loading,
  user,
}: {
  supabaseOn: boolean;
  loading: boolean;
  user: User | null;
}) {
  if (supabaseOn) {
    if (loading) {
      return (
        <div className="mt-8 flex items-center gap-3 pt-6 border-t border-border/50">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
      );
    }

    if (!user) {
      return (
        <Link
          href="/login"
          className="mt-8 flex items-center gap-3 pt-6 border-t border-border/50 rounded-xl px-2 py-2 -mx-2 hover:bg-secondary/50 transition-colors"
        >
          <Avatar className="h-10 w-10 border border-border">
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden text-left">
            <p className="text-sm font-medium truncate">Not signed in</p>
            <p className="text-xs text-muted-foreground truncate">Open Sign in to continue</p>
          </div>
        </Link>
      );
    }

    const { name, email, avatarUrl, initials } = getProfileFromUser(user);
    return (
      <div className="mt-8 flex items-center gap-3 pt-6 border-t border-border/50">
        <Avatar className="h-10 w-10 border border-border shrink-0">
          {avatarUrl ? <AvatarImage src={avatarUrl} alt="" /> : null}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden min-w-0">
          <p className="text-sm font-medium truncate">{name}</p>
          <p className="text-xs text-muted-foreground truncate">{email || "Signed in"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 flex items-center gap-3 pt-6 border-t border-border/50 cursor-pointer hover:opacity-80 transition-opacity">
      <Avatar className="h-10 w-10 border border-border">
        <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="User" />
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-medium truncate">Arjun Kapoor</p>
        <p className="text-xs text-muted-foreground truncate">arjun@example.com</p>
      </div>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active,
  href,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  active?: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden group ${
        active
          ? "text-primary font-medium bg-primary/5"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      }`}
    >
      {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />}
      <Icon size={20} className={`transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`} />
      <span>{label}</span>
    </Link>
  );
}
