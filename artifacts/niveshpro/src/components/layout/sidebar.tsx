import React from 'react';
import { Link, useLocation } from 'wouter';
import { 
  LayoutDashboard, PieChart as PieChartIcon, ArrowRightLeft, 
  Target, Receipt, Settings, Zap, Building2, Wallet,
  TrendingUp, CreditCard
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const [location] = useLocation();

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
          <NavItem href="/" icon={LayoutDashboard} label="Dashboard" active={location === '/'} />
          <NavItem href="/portfolio" icon={PieChartIcon} label="Portfolio" active={location === '/portfolio'} />
          <NavItem href="/transactions" icon={ArrowRightLeft} label="Transactions" active={location === '/transactions'} />
          <NavItem href="/goals" icon={Target} label="Goals" active={location === '/goals'} />
          <NavItem href="/bills" icon={Receipt} label="Bills & Taxes" active={location === '/bills'} />
        </nav>
      </div>

      <div className="p-8">
        <div className="p-5 rounded-2xl bg-secondary/50 border border-border/50 mb-6 relative overflow-hidden group hover:bg-secondary/80 transition-colors duration-500 cursor-pointer">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
          <h4 className="font-medium mb-1">Unlock Premium</h4>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">Get advanced tax-loss harvesting insights.</p>
          <Button variant="link" className="p-0 h-auto text-primary font-medium hover:no-underline flex items-center gap-1 group/btn">
            Upgrade now <ArrowRightLeft size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>

        <nav className="space-y-2">
          <NavItem href="#" icon={Settings} label="Settings" />
        </nav>
        
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
      </div>
    </aside>
  );
}

function NavItem({ icon: Icon, label, active, href }: { icon: any, label: string, active?: boolean, href: string }) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden group ${
      active 
        ? 'text-primary font-medium bg-primary/5' 
        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
    }`}>
      {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />}
      <Icon size={20} className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
      <span>{label}</span>
    </Link>
  );
}
