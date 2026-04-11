import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area
} from 'recharts';
import { 
  LayoutDashboard, PieChart as PieChartIcon, ArrowRightLeft, 
  Target, Receipt, Settings, Bell, Search, Plus, 
  ArrowUpRight, ArrowDownRight, Wallet, Building2, 
  TrendingUp, CreditCard, ChevronRight, Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import './_group.css';

// Mock Data
const assetAllocation = [
  { name: 'Equities', value: 4500000, color: 'hsl(var(--chart-1))' },
  { name: 'Mutual Funds', value: 3200000, color: 'hsl(var(--chart-3))' },
  { name: 'Fixed Deposits', value: 1800000, color: 'hsl(var(--chart-5))' },
  { name: 'Gold', value: 850000, color: 'hsl(var(--chart-2))' },
  { name: 'Cash', value: 450000, color: 'hsl(var(--chart-4))' },
];

const cashflowData = [
  { name: 'Jan', income: 420000, expense: 280000 },
  { name: 'Feb', income: 420000, expense: 310000 },
  { name: 'Mar', income: 480000, expense: 250000 },
  { name: 'Apr', income: 420000, expense: 290000 },
  { name: 'May', income: 550000, expense: 340000 },
  { name: 'Jun', income: 420000, expense: 270000 },
];

const recentTransactions = [
  { id: 1, title: 'Zerodha Broking', category: 'Investment', amount: -50000, date: 'Today, 10:42 AM', icon: TrendingUp },
  { id: 2, title: 'TechCorp Salary', category: 'Income', amount: 420000, date: 'Yesterday', icon: Wallet },
  { id: 3, title: 'HDFC Credit Card', category: 'Bill Payment', amount: -34500, date: '12 Aug', icon: CreditCard },
  { id: 4, title: 'Taj Hotels', category: 'Dining', amount: -12400, date: '10 Aug', icon: Building2 },
];

const goals = [
  { id: 1, title: 'House Downpayment', current: 2800000, target: 5000000, color: 'bg-[hsl(var(--chart-1))]' },
  { id: 2, title: 'Europe Trip', current: 350000, target: 800000, color: 'bg-[hsl(var(--chart-2))]' },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border/50 bg-background/50 backdrop-blur-xl flex flex-col justify-between hidden md:flex z-10">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
              <Zap size={20} className="fill-current" />
            </div>
            <span className="font-serif text-2xl font-semibold tracking-wide">NiveshPro</span>
          </div>

          <nav className="space-y-2">
            <NavItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <NavItem icon={PieChartIcon} label="Portfolio" active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} />
            <NavItem icon={ArrowRightLeft} label="Transactions" active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')} />
            <NavItem icon={Target} label="Goals" active={activeTab === 'goals'} onClick={() => setActiveTab('goals')} />
            <NavItem icon={Receipt} label="Bills & Taxes" active={activeTab === 'bills'} onClick={() => setActiveTab('bills')} />
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
            <NavItem icon={Settings} label="Settings" />
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Decorative background blurs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <header className="px-8 py-6 flex items-center justify-between z-10 backdrop-blur-sm sticky top-0">
          <div>
            <h1 className="text-3xl font-serif font-medium tracking-tight">Overview</h1>
            <p className="text-muted-foreground mt-1">Here's how your wealth is growing.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="pl-10 pr-4 py-2.5 rounded-full bg-secondary/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all w-64 text-sm"
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-full relative bg-background/50 backdrop-blur-sm border-border/50 hover:bg-secondary">
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-background"></span>
            </Button>
            <Button className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all gap-2 px-5">
              <Plus size={18} />
              <span className="hidden sm:inline">Add Transaction</span>
            </Button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-12 z-10">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Top Row: Net Worth & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-none shadow-xl shadow-primary/10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
                <CardContent className="p-8 relative z-10 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-primary-foreground/80 font-medium mb-1">Total Net Worth</p>
                      <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">₹1,08,00,000</h2>
                    </div>
                    <Badge className="bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1 text-sm font-medium backdrop-blur-md">
                      <TrendingUp size={14} className="mr-1" /> +12.4% YTD
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
                    <div>
                      <p className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-1">Investments</p>
                      <p className="font-medium text-lg">₹85.5L</p>
                    </div>
                    <div>
                      <p className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-1">Cash & Bank</p>
                      <p className="font-medium text-lg">₹12.4L</p>
                    </div>
                    <div>
                      <p className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-1">Real Estate</p>
                      <p className="font-medium text-lg">₹25.0L</p>
                    </div>
                    <div>
                      <p className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-1">Liabilities</p>
                      <p className="font-medium text-lg text-accent-foreground">-₹14.9L</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4 flex flex-col">
                <Card className="bg-background/60 backdrop-blur-xl border-border/50 hover:border-border transition-colors flex-1 flex flex-col justify-center cursor-pointer group">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Target size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-lg group-hover:text-accent transition-colors">Tax Optimizer</p>
                      <p className="text-sm text-muted-foreground">Save up to ₹45k under 80C</p>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <Button variant="outline" className="h-full flex flex-col items-center justify-center gap-3 bg-background/60 backdrop-blur-xl border-border/50 hover:bg-secondary/50 rounded-2xl py-6">
                    <ArrowDownRight size={24} className="text-chart-2" />
                    <span className="font-medium">Receive</span>
                  </Button>
                  <Button variant="outline" className="h-full flex flex-col items-center justify-center gap-3 bg-background/60 backdrop-blur-xl border-border/50 hover:bg-secondary/50 rounded-2xl py-6">
                    <ArrowUpRight size={24} className="text-chart-1" />
                    <span className="font-medium">Send</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Middle Row: Cashflow & Asset Allocation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl font-serif">Cashflow</CardTitle>
                      <CardDescription>Income vs Expenses (Last 6 Months)</CardDescription>
                    </div>
                    <select className="bg-secondary/50 border border-border/50 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary">
                      <option>Last 6 Months</option>
                      <option>This Year</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 pb-2">
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={cashflowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => `₹${val/100000}L`} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '12px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                          formatter={(value: number) => [formatCurrency(value), '']}
                        />
                        <Area type="monotone" dataKey="income" name="Income" stroke="hsl(var(--chart-1))" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                        <Area type="monotone" dataKey="expense" name="Expense" stroke="hsl(var(--chart-2))" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm">
                <CardHeader className="pb-0">
                  <CardTitle className="text-xl font-serif">Asset Allocation</CardTitle>
                  <CardDescription>Your portfolio distribution</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center h-[280px]">
                  <div className="w-1/2 h-full relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={assetAllocation}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={85}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {assetAllocation.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity cursor-pointer focus:outline-none" />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-sm text-muted-foreground">Total</span>
                      <span className="font-semibold text-lg">₹1.08Cr</span>
                    </div>
                  </div>
                  <div className="w-1/2 space-y-4 pl-4">
                    {assetAllocation.map((item, i) => (
                      <div key={i} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">{item.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{((item.value / 10800000) * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Row: Transactions & Goals */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-background/60 backdrop-blur-xl border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-serif">Recent Activity</CardTitle>
                    <CardDescription>Your latest transactions across accounts</CardDescription>
                  </div>
                  <Button variant="ghost" className="text-primary hover:text-primary/80 group">
                    View All <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {recentTransactions.map((tx) => {
                      const Icon = tx.icon;
                      const isPositive = tx.amount > 0;
                      return (
                        <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${isPositive ? 'bg-primary/10 text-primary' : 'bg-secondary text-foreground/70'}`}>
                              <Icon size={20} />
                            </div>
                            <div>
                              <p className="font-medium text-base">{tx.title}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                                <span>{tx.category}</span>
                                <span>•</span>
                                <span>{tx.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className={`font-semibold text-base ${isPositive ? 'text-primary' : 'text-foreground'}`}>
                            {isPositive ? '+' : ''}{formatCurrency(tx.amount)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">Financial Goals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {goals.map(goal => (
                      <div key={goal.id} className="space-y-2 group cursor-pointer">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium group-hover:text-primary transition-colors">{goal.title}</span>
                          <span className="text-muted-foreground">{Math.round((goal.current/goal.target)*100)}%</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${goal.color}`}
                            style={{ width: `${(goal.current/goal.target)*100}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
                        </p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-4 border-dashed rounded-xl py-6 hover:bg-secondary/50 text-muted-foreground hover:text-foreground">
                      <Plus size={16} className="mr-2" /> Create New Goal
                    </Button>
                  </CardContent>
                </Card>

              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden group ${
        active 
          ? 'text-primary font-medium bg-primary/5' 
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
      }`}
    >
      {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />}
      <Icon size={20} className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
      <span>{label}</span>
    </div>
  );
}
