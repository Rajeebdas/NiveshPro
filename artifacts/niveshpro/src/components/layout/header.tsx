import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function Header({ title, description, action }: HeaderProps) {
  return (
    <header className="px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between z-10 backdrop-blur-sm sticky top-0 gap-4">
      <div>
        <h1 className="text-3xl font-serif font-medium tracking-tight text-foreground">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2.5 rounded-full bg-secondary/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all w-64 text-sm"
          />
        </div>
        <Button variant="outline" size="icon" className="rounded-full relative bg-background/50 backdrop-blur-sm border-border/50 hover:bg-secondary shrink-0">
          <Bell size={18} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-background"></span>
        </Button>
        {action}
      </div>
    </header>
  );
}
