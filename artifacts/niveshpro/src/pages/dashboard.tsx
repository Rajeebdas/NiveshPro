import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area
} from 'recharts';
import { 
  ArrowRightLeft, Target, 
  ArrowUpRight, ArrowDownRight, Wallet, Building2, 
  TrendingUp, CreditCard, ChevronRight, Plus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/hooks/use-data';
import { Header } from '@/components/layout/header';
import { formatCurrency, formatDate } from '@/lib/format';
import { Link } from 'wouter';

const CHART_COLORS = {
  equities: 'hsl(var(--chart-1))',
  mutual_funds: 'hsl(var(--chart-3))',
  fixed_deposit: 'hsl(var(--chart-5))',
  gold: 'hsl(var(--chart-2))',
  cash: 'hsl(var(--chart-4))',
  real_estate: 'hsl(var(--chart-1))', // reuse
};

export function Dashboard() {
  const { data } = useData();
  const { investments, transactions, goals, bills } = data;

  // Calculate Net Worth
  const totalInvestments = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalCash = investments.filter(i => i.assetClass === 'cash').reduce((sum, inv) => sum + inv.currentValue, 0);
  const realEstate = investments.filter(i => i.assetClass === 'real_estate').reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalLiabilities = 1490000; // Hardcoded for demo, could be from loans
  const netWorth = totalInvestments + totalCash + realEstate - totalLiabilities;

  // Asset Allocation Data
  const assetAllocation = investments.map(inv => ({
    name: inv.name,
    value: inv.currentValue,
    color: CHART_COLORS[inv.assetClass as keyof typeof CHART_COLORS] || 'hsl(var(--chart-1))'
  }));

  // Cashflow Data (mocked based on transactions for demo, ideally calculated per month)
  const cashflowData = [
    { name: 'Jan', income: 420000, expense: 280000 },
    { name: 'Feb', income: 420000, expense: 310000 },
    { name: 'Mar', income: 480000, expense: 250000 },
    { name: 'Apr', income: 420000, expense: 290000 },
    { name: 'May', income: 550000, expense: 340000 },
    { name: 'Jun', income: 420000, expense: 270000 },
  ];

  const recentTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);

  const getIconForCategory = (category: string) => {
    if (category === 'Investment') return TrendingUp;
    if (category === 'Salary') return Wallet;
    if (category === 'Credit Card') return CreditCard;
    if (category === 'Dining') return Building2;
    return ArrowRightLeft;
  };

  return (
    <>
      <Header 
        title="Overview" 
        description="Here's how your wealth is growing." 
        action={
          <Button className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all gap-2 px-5" asChild>
            <Link href="/transactions">
              <Plus size={18} />
              <span className="hidden sm:inline">Add Transaction</span>
            </Link>
          </Button>
        }
      />

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
                    <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight" data-testid="text-networth">{formatCurrency(netWorth)}</h2>
                  </div>
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1 text-sm font-medium backdrop-blur-md">
                    <TrendingUp size={14} className="mr-1" /> +12.4% YTD
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
                  <div>
                    <p className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-1">Investments</p>
                    <p className="font-medium text-lg">{formatCurrency(totalInvestments)}</p>
                  </div>
                  <div>
                    <p className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-1">Cash & Bank</p>
                    <p className="font-medium text-lg">{formatCurrency(totalCash)}</p>
                  </div>
                  <div>
                    <p className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-1">Real Estate</p>
                    <p className="font-medium text-lg">{formatCurrency(realEstate)}</p>
                  </div>
                  <div>
                    <p className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-1">Liabilities</p>
                    <p className="font-medium text-lg text-accent-foreground">-{formatCurrency(totalLiabilities)}</p>
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
                    <CardDescription>Income vs Expenses</CardDescription>
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
                    <span className="font-semibold text-lg">{formatCurrency(totalInvestments + totalCash + realEstate)}</span>
                  </div>
                </div>
                <div className="w-1/2 space-y-4 pl-4 overflow-y-auto max-h-[250px]">
                  {assetAllocation.map((item, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer pr-2">
                      <div className="flex items-center gap-2 truncate pr-2">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm font-medium group-hover:text-primary transition-colors truncate">{item.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {totalInvestments > 0 ? ((item.value / (totalInvestments + totalCash + realEstate)) * 100).toFixed(0) : 0}%
                      </span>
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
                <Button variant="ghost" className="text-primary hover:text-primary/80 group" asChild>
                  <Link href="/transactions">
                    View All <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {recentTransactions.map((tx) => {
                    const Icon = getIconForCategory(tx.category);
                    const isPositive = tx.type === 'income';
                    return (
                      <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer group" data-testid={`row-tx-${tx.id}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${isPositive ? 'bg-primary/10 text-primary' : 'bg-secondary text-foreground/70'}`}>
                            <Icon size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-base">{tx.title}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                              <span>{tx.category}</span>
                              <span>•</span>
                              <span>{formatDate(tx.date)}</span>
                            </div>
                          </div>
                        </div>
                        <div className={`font-semibold text-base ${isPositive ? 'text-primary' : 'text-foreground'}`}>
                          {isPositive ? '+' : '-'} {formatCurrency(Math.abs(tx.amount))}
                        </div>
                      </div>
                    )
                  })}
                  {recentTransactions.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No recent transactions
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Financial Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {goals.slice(0, 3).map((goal, idx) => {
                    const colors = ['bg-[hsl(var(--chart-1))]', 'bg-[hsl(var(--chart-2))]', 'bg-[hsl(var(--chart-3))]'];
                    const color = colors[idx % colors.length];
                    const percent = Math.min(100, Math.round((goal.currentAmount/goal.targetAmount)*100));
                    
                    return (
                      <div key={goal.id} className="space-y-2 group cursor-pointer" data-testid={`row-goal-${goal.id}`}>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium group-hover:text-primary transition-colors">{goal.title}</span>
                          <span className="text-muted-foreground">{percent}%</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                        </p>
                      </div>
                    );
                  })}
                  {goals.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      No goals set
                    </div>
                  )}
                  <Button variant="outline" className="w-full mt-4 border-dashed rounded-xl py-6 hover:bg-secondary/50 text-muted-foreground hover:text-foreground" asChild>
                    <Link href="/goals">
                      <Plus size={16} className="mr-2" /> Manage Goals
                    </Link>
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
