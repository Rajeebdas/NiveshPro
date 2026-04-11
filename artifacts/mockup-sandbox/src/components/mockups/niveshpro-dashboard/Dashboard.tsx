import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area, LineChart, Line
} from 'recharts';
import { 
  LayoutDashboard, PieChart as PieChartIcon, ArrowRightLeft, 
  Target, Receipt, Settings, Bell, Search, Plus, 
  ArrowUpRight, ArrowDownRight, Wallet, Building2, 
  TrendingUp, CreditCard, ChevronRight, Zap, 
  CreditCard as CardIcon, Activity, Sliders, AlertCircle,
  ShieldCheck, Smartphone, Lock, TrendingDown, Landmark,
  Coffee, ShoppingBag
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import './_group.css';

// --- Mock Data ---

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

const recentTransactions = [
  { id: 1, title: 'Amazon', category: 'Shopping', amount: -4500, date: 'Today, 2:30 PM', icon: ShoppingBag, type: 'expense' },
  { id: 2, title: 'Starbucks', category: 'Dining', amount: -450, date: 'Today, 9:15 AM', icon: Coffee, type: 'expense' },
  { id: 3, title: 'TechCorp Salary', category: 'Income', amount: 420000, date: 'Yesterday', icon: Wallet, type: 'income' },
  { id: 4, title: 'HDFC Credit Card', category: 'Bill Payment', amount: -34500, date: '12 Aug', icon: CreditCard, type: 'expense' },
  { id: 5, title: 'Zerodha Broking', category: 'Investment', amount: -50000, date: '10 Aug', icon: TrendingUp, type: 'expense' },
];

const assetAllocation = [
  { name: 'Domestic Equity', value: 4500000, color: 'hsl(var(--chart-1))' },
  { name: 'Mutual Funds', value: 3200000, color: 'hsl(var(--chart-2))' },
  { name: 'Fixed Income', value: 1800000, color: 'hsl(var(--chart-3))' },
  { name: 'US Equity', value: 850000, color: 'hsl(var(--chart-4))' },
  { name: 'Cash', value: 450000, color: 'hsl(var(--chart-5))' },
];

const performanceData = [
  { name: 'Jan', value: 8500000 },
  { name: 'Feb', value: 8800000 },
  { name: 'Mar', value: 8600000 },
  { name: 'Apr', value: 9200000 },
  { name: 'May', value: 9800000 },
  { name: 'Jun', value: 10200000 },
  { name: 'Jul', value: 10800000 },
];

const expensesByCategory = [
  { name: 'Housing', amount: 45000, budget: 50000, color: 'bg-slate-800' },
  { name: 'Food & Dining', amount: 28000, budget: 30000, color: 'bg-emerald-600' },
  { name: 'Transportation', amount: 12000, budget: 15000, color: 'bg-blue-500' },
  { name: 'Shopping', amount: 22000, budget: 20000, color: 'bg-rose-500', overbudget: true },
  { name: 'Entertainment', amount: 8000, budget: 10000, color: 'bg-amber-500' },
];

const cashflowData = [
  { name: 'Jan', income: 420000, expense: 280000 },
  { name: 'Feb', income: 420000, expense: 310000 },
  { name: 'Mar', income: 480000, expense: 250000 },
  { name: 'Apr', income: 420000, expense: 290000 },
  { name: 'May', income: 550000, expense: 340000 },
  { name: 'Jun', income: 420000, expense: 270000 },
];

// --- Components ---

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'expenses': return <ExpensesTab />;
      case 'investments': return <InvestmentsTab />;
      case 'cards': return <CardsTab />;
      case 'analytics': return <AnalyticsTab />;
      case 'preferences': return <PreferencesTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border/40 bg-background/80 backdrop-blur-xl flex flex-col justify-between hidden md:flex z-20">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md">
              <Zap size={20} className="fill-current" />
            </div>
            <span className="font-serif text-2xl font-semibold tracking-tight">NiveshPro</span>
          </div>

          <nav className="space-y-1.5">
            <NavItem icon={LayoutDashboard} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <NavItem icon={Receipt} label="Expenses" active={activeTab === 'expenses'} onClick={() => setActiveTab('expenses')} />
            <NavItem icon={TrendingUp} label="Investments" active={activeTab === 'investments'} onClick={() => setActiveTab('investments')} />
            <NavItem icon={CardIcon} label="Cards" active={activeTab === 'cards'} onClick={() => setActiveTab('cards')} />
            <NavItem icon={Activity} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
            <NavItem icon={Sliders} label="Preferences" active={activeTab === 'preferences'} onClick={() => setActiveTab('preferences')} />
          </nav>
        </div>

        <div className="p-8">
          <div className="p-5 rounded-2xl bg-primary text-primary-foreground mb-6 relative overflow-hidden group shadow-lg">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
            <h4 className="font-medium mb-1 relative z-10">NiveshPro Elite</h4>
            <p className="text-sm text-primary-foreground/80 mb-4 relative z-10">Dedicated wealth manager & tax harvesting.</p>
            <Button variant="secondary" className="w-full text-xs font-medium h-9 relative z-10">
              Upgrade
            </Button>
          </div>
          
          <div className="flex items-center gap-3 pt-6 border-t border-border/40 cursor-pointer hover:opacity-80 transition-opacity">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="User" />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">Arjun Kapoor</p>
              <p className="text-xs text-muted-foreground truncate">arjun@nivesh.pro</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-secondary/20">
        {/* Header */}
        <header className="px-10 py-6 flex items-center justify-between z-10 bg-background/60 backdrop-blur-md border-b border-border/40 sticky top-0">
          <div>
            <h1 className="text-2xl font-serif font-medium tracking-tight capitalize">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 rounded-full bg-background border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64 text-sm"
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-full bg-background border-border/60">
              <Bell size={16} />
            </Button>
            <Button className="rounded-full shadow-sm gap-2 px-5">
              <Plus size={16} />
              <span className="hidden sm:inline text-sm font-medium">New Action</span>
            </Button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-10 z-0">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Tab Components ---

function OverviewTab() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Row: Net Worth */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-primary text-primary-foreground border-none shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <CardContent className="p-8 relative z-10 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-primary-foreground/70 font-medium mb-1 text-sm">Total Net Worth</p>
                <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">₹1,08,00,000</h2>
              </div>
              <Badge className="bg-white/10 hover:bg-white/20 text-white border-none px-3 py-1.5 text-sm font-medium backdrop-blur-md">
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
                <p className="font-medium text-lg text-rose-400">-₹14.9L</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 flex flex-col">
          <Card className="bg-background border-border/50 flex-1 flex flex-col justify-center cursor-pointer group hover:border-primary/30 transition-colors shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Target size={24} />
              </div>
              <div>
                <p className="font-medium text-base group-hover:text-emerald-600 transition-colors">Tax Optimizer</p>
                <p className="text-sm text-muted-foreground mt-0.5">Save up to ₹45k under 80C</p>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-4 flex-1">
            <Button variant="outline" className="h-full flex flex-col items-center justify-center gap-3 bg-background border-border/50 hover:bg-secondary/50 rounded-xl py-6 shadow-sm">
              <ArrowDownRight size={20} className="text-emerald-600" />
              <span className="font-medium text-sm">Receive</span>
            </Button>
            <Button variant="outline" className="h-full flex flex-col items-center justify-center gap-3 bg-background border-border/50 hover:bg-secondary/50 rounded-xl py-6 shadow-sm">
              <ArrowUpRight size={20} className="text-primary" />
              <span className="font-medium text-sm">Send</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-background border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </div>
              <Button variant="link" className="text-primary text-sm h-auto p-0">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 pt-2">
              {recentTransactions.slice(0,4).map((tx) => {
                const Icon = tx.icon;
                const isIncome = tx.type === 'income';
                return (
                  <div key={tx.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isIncome ? 'bg-emerald-500/10 text-emerald-600' : 'bg-secondary text-muted-foreground'}`}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{tx.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{tx.category} • {tx.date}</p>
                      </div>
                    </div>
                    <div className={`font-medium text-sm ${isIncome ? 'text-emerald-600' : 'text-foreground'}`}>
                      {isIncome ? '+' : ''}{formatCurrency(tx.amount)}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background border-border/50 shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg">Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center h-[260px]">
            <div className="w-1/2 h-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={assetAllocation} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                    {assetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="font-semibold text-sm">₹1.08Cr</span>
              </div>
            </div>
            <div className="w-1/2 space-y-3 pl-4">
              {assetAllocation.slice(0,4).map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{item.name}</span>
                  </div>
                  <span className="text-xs font-medium">{((item.value / 10800000) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ExpensesTab() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-background shadow-sm border-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Spent this month</p>
            <h3 className="text-3xl font-serif font-medium mb-4">₹1,15,450</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">vs Budget (₹1.5L)</span>
                <span className="font-medium">76%</span>
              </div>
              <Progress value={76} className="h-1.5" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background shadow-sm border-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Largest Category</p>
            <h3 className="text-3xl font-serif font-medium mb-1">Housing</h3>
            <p className="text-sm text-muted-foreground">₹45,000 (39% of total)</p>
          </CardContent>
        </Card>
        <Card className="bg-background shadow-sm border-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Projected Savings</p>
            <h3 className="text-3xl font-serif font-medium text-emerald-600 mb-1">₹84,550</h3>
            <p className="text-sm text-muted-foreground">Based on current run-rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-background shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Category Budgets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {expensesByCategory.map((cat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{cat.name}</span>
                  <span className="text-muted-foreground">{formatCurrency(cat.amount)} / {formatCurrency(cat.budget)}</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${cat.overbudget ? 'bg-rose-500' : cat.color}`}
                    style={{ width: `${Math.min((cat.amount/cat.budget)*100, 100)}%` }}
                  />
                </div>
                {cat.overbudget && <p className="text-xs text-rose-500 mt-1">Exceeded budget by {formatCurrency(cat.amount - cat.budget)}</p>}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-background shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.filter(tx => tx.type === 'expense').map((tx) => {
                const Icon = tx.icon;
                return (
                  <div key={tx.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-muted-foreground">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{tx.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{tx.category} • {tx.date}</p>
                      </div>
                    </div>
                    <div className="font-medium text-sm text-foreground">
                      {formatCurrency(tx.amount)}
                    </div>
                  </div>
                )
              })}
              <Button variant="outline" className="w-full mt-2">View All Transactions</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InvestmentsTab() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-serif font-medium tracking-tight">₹85,50,000</h2>
            <span className="text-emerald-600 font-medium text-sm mb-1 flex items-center"><TrendingUp size={14} className="mr-1"/> +18.2% (All time)</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">1M</Button>
          <Button variant="outline" size="sm">6M</Button>
          <Button variant="default" size="sm">1Y</Button>
          <Button variant="outline" size="sm">ALL</Button>
        </div>
      </div>

      <Card className="bg-background shadow-sm border-border/50">
        <CardContent className="p-6">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => `₹${val/100000}L`} domain={['dataMin - 1000000', 'dataMax + 1000000']} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '8px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  formatter={(value: number) => [formatCurrency(value), 'Value']}
                />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-background shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Holdings by Asset Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assetAllocation.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                      <Landmark size={14} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{((item.value / 8550000) * 100).toFixed(1)}% of portfolio</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{formatCurrency(item.value)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-background shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'HDFC Bank Ltd.', type: 'Equity', return: 24.5, value: 850000 },
                { name: 'Reliance Industries', type: 'Equity', return: 18.2, value: 620000 },
                { name: 'Parag Parikh Flexi Cap', type: 'Mutual Fund', return: 22.1, value: 1250000 },
                { name: 'S&P 500 Index Fund', type: 'ETF', return: 15.4, value: 850000 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{formatCurrency(item.value)}</p>
                    <p className="text-xs text-emerald-600">+{item.return}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CardsTab() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Card Visuals */}
        <div className="space-y-6">
          <div className="relative w-full h-56 rounded-2xl p-6 text-white overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="font-serif italic text-xl tracking-wider">NiveshPro Signature</span>
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.5"/>
                  <circle cx="28" cy="12" r="12" fill="white" fillOpacity="0.5"/>
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-white/60 text-xs uppercase tracking-widest font-mono">Card Number</p>
                <p className="font-mono text-xl tracking-widest">**** **** **** 4092</p>
              </div>
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-white/60 text-xs uppercase tracking-widest font-mono">Card Holder</p>
                  <p className="font-medium tracking-wide">ARJUN KAPOOR</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-white/60 text-xs uppercase tracking-widest font-mono">Expires</p>
                  <p className="font-medium tracking-wide">12/28</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" variant="default"><Lock size={16} className="mr-2"/> Freeze Card</Button>
            <Button className="flex-1" variant="outline"><Settings size={16} className="mr-2"/> Settings</Button>
          </div>
        </div>

        {/* Card Details */}
        <div className="space-y-6">
          <Card className="bg-background shadow-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Credit Limit Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-serif font-medium">₹1,45,000</p>
                  <p className="text-sm text-muted-foreground mt-1">Used of ₹5,00,000 limit</p>
                </div>
                <p className="font-medium text-lg">29%</p>
              </div>
              <Progress value={29} className="h-2" />
              <div className="pt-4 flex justify-between items-center text-sm border-t border-border/50">
                <span className="text-muted-foreground">Available Credit</span>
                <span className="font-medium">₹3,55,000</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background shadow-sm border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Payment Due</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-2xl font-serif font-medium text-rose-500">₹84,250</p>
                  <p className="text-sm text-muted-foreground mt-0.5">Due by 15 Sep 2023</p>
                </div>
                <Button>Pay Now</Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
                <AlertCircle size={16} className="text-primary"/>
                <span>Minimum due amount: ₹4,212</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="bg-background shadow-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Cashflow Analysis</CardTitle>
          <CardDescription>Income vs Expense trends over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashflowData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => `₹${val/1000}k`} />
                <RechartsTooltip 
                  cursor={{fill: 'hsl(var(--secondary))'}}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '8px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  formatter={(value: number) => [formatCurrency(value), '']}
                />
                <Bar dataKey="income" name="Income" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="expense" name="Expense" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-background shadow-sm border-border/50 bg-primary text-primary-foreground">
          <CardContent className="p-8">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-2xl font-serif mb-2">Savings Rate</h3>
            <p className="text-5xl font-medium tracking-tight mb-4">34%</p>
            <p className="text-primary-foreground/70 text-sm">Your savings rate is 8% higher than last month. You are on track to hit your yearly goal.</p>
          </CardContent>
        </Card>
        
        <Card className="bg-background shadow-sm border-border/50">
          <CardContent className="p-8">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-foreground mb-6">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-2xl font-serif mb-2">Spend Alert</h3>
            <p className="text-xl font-medium mb-4 text-rose-500">Shopping spiked</p>
            <p className="text-muted-foreground text-sm">You spent 40% more on Shopping this month compared to your average. Review your recent Amazon purchases.</p>
            <Button variant="link" className="p-0 h-auto mt-4 text-primary">Review Spends →</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PreferencesTab() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <Card className="bg-background shadow-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Security & Alerts</CardTitle>
          <CardDescription>Control how we notify you about your money</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Large Transaction Alerts</p>
              <p className="text-xs text-muted-foreground mt-1">Get notified for debits above ₹10,000</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">International Usage</p>
              <p className="text-xs text-muted-foreground mt-1">Allow cards for international transactions</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Weekly Summary Email</p>
              <p className="text-xs text-muted-foreground mt-1">Receive a breakdown of your weekly spends</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-background shadow-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Investment Risk Profile</CardTitle>
          <CardDescription>Adjust your risk tolerance to tailor recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">Conservative</span>
              <span className="text-sm font-medium text-primary">Balanced Growth</span>
              <span className="text-sm font-medium text-muted-foreground">Aggressive</span>
            </div>
            <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
          </div>
          
          <div className="bg-secondary/50 p-4 rounded-xl flex items-start gap-4">
            <ShieldCheck className="text-primary mt-0.5" size={20} />
            <div>
              <p className="font-medium text-sm">Current Profile: Balanced Growth</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                You prioritize steady growth while taking moderate risks. Our robo-advisor will allocate ~60% to equities and 40% to fixed income based on this setting.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end pt-4">
        <Button className="px-8">Save Preferences</Button>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 relative group ${
        active 
          ? 'text-primary font-medium bg-primary/5' 
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
      }`}
    >
      <Icon size={18} className={`transition-transform duration-200 ${active ? '' : 'group-hover:scale-110'}`} />
      <span className="text-sm tracking-wide">{label}</span>
    </div>
  );
}
