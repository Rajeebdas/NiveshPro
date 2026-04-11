import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  IndianRupee,
  Landmark,
  LineChart,
  PieChart as PieChartIcon,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import './_group.css';

const summaryCards = [
  {
    label: 'Total Balance',
    value: 10800000,
    change: '+12.4%',
    caption: 'Across bank, funds and equity',
    icon: Wallet,
    tone: 'primary',
  },
  {
    label: 'Investments',
    value: 8550000,
    change: '+8.7%',
    caption: 'Portfolio value this month',
    icon: TrendingUp,
    tone: 'green',
  },
  {
    label: 'Expenses',
    value: 284000,
    change: '-6.2%',
    caption: 'Lower than last month',
    icon: CreditCard,
    tone: 'bronze',
  },
  {
    label: 'Monthly Savings',
    value: 136000,
    change: '+18.1%',
    caption: 'Available to invest',
    icon: Landmark,
    tone: 'blue',
  },
];

const analyticsData = [
  { month: 'Jan', income: 420000, expense: 280000, invested: 95000 },
  { month: 'Feb', income: 420000, expense: 310000, invested: 70000 },
  { month: 'Mar', income: 480000, expense: 250000, invested: 145000 },
  { month: 'Apr', income: 420000, expense: 290000, invested: 90000 },
  { month: 'May', income: 550000, expense: 340000, invested: 160000 },
  { month: 'Jun', income: 420000, expense: 284000, invested: 110000 },
];

const investmentSplit = [
  { name: 'Equity', value: 42, amount: 3600000, color: 'hsl(var(--chart-1))' },
  { name: 'Mutual Funds', value: 31, amount: 2650000, color: 'hsl(var(--chart-3))' },
  { name: 'FD & Bonds', value: 17, amount: 1450000, color: 'hsl(var(--chart-5))' },
  { name: 'Gold', value: 10, amount: 850000, color: 'hsl(var(--chart-2))' },
];

const investments = [
  { name: 'Nifty 50 Index Fund', type: 'Mutual Fund', amount: 1840000, returnValue: '+14.8%', progress: 82 },
  { name: 'Bluechip Equity Basket', type: 'Stocks', amount: 2320000, returnValue: '+11.2%', progress: 74 },
  { name: 'Sovereign Gold Bond', type: 'Gold', amount: 850000, returnValue: '+7.6%', progress: 61 },
];

const expenseCategories = [
  { name: 'Housing', amount: 92000, percent: 32, trend: '+2.1%' },
  { name: 'Food & Dining', amount: 46500, percent: 16, trend: '-8.4%' },
  { name: 'Travel', amount: 38000, percent: 13, trend: '-4.6%' },
  { name: 'Shopping', amount: 32500, percent: 11, trend: '+1.8%' },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-hidden">
      <div className="absolute left-[-12rem] top-[-12rem] h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-[-10rem] top-32 h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-3xl" />
      <main className="relative mx-auto max-w-[1380px] px-8 py-8">
        <header className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
              <IndianRupee size={16} className="text-primary" />
              NiveshPro dashboard
            </div>
            <h1 className="font-serif text-5xl font-medium tracking-tight text-foreground">Money, made beautifully simple.</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              A focused view of cards, analytics, investments and expenses so users understand where money lives and where it moves.
            </p>
          </div>
          <div className="rounded-3xl border border-border/70 bg-card/80 p-4 shadow-sm backdrop-blur-xl">
            <p className="text-sm text-muted-foreground">June health score</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-serif text-4xl font-semibold">86</span>
              <span className="text-sm font-medium text-primary">Strong</span>
            </div>
          </div>
        </header>

        <section className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.label} className="group overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                <CardContent className="p-6">
                  <div className="mb-7 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon size={22} />
                    </div>
                    <Badge className="border-0 bg-primary/10 text-primary hover:bg-primary/15">
                      {card.change}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                  <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight">{formatCurrency(card.value)}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{card.caption}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.45fr_1fr]">
          <Card className="border-border/60 bg-card/80 shadow-sm backdrop-blur-xl">
            <CardHeader className="flex flex-row items-start justify-between pb-3">
              <div>
                <CardTitle className="flex items-center gap-2 font-serif text-2xl font-medium">
                  <LineChart size={22} className="text-primary" />
                  Analytics
                </CardTitle>
                <CardDescription>Income, expense and invested amount over the last six months</CardDescription>
              </div>
              <Badge variant="outline" className="rounded-full border-border/70 bg-secondary/40 px-3 py-1">Last 6 months</Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[330px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData} margin={{ top: 18, right: 16, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.28} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(value) => `₹${Number(value) / 100000}L`} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '16px', border: '1px solid hsl(var(--border))', boxShadow: '0 18px 60px rgba(24, 47, 39, 0.12)' }} formatter={(value: number) => formatCurrency(value)} />
                    <Area type="monotone" dataKey="income" stroke="hsl(var(--chart-1))" strokeWidth={3} fill="url(#incomeGradient)" />
                    <Area type="monotone" dataKey="expense" stroke="hsl(var(--chart-2))" strokeWidth={3} fill="url(#expenseGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <Metric label="Income" value="₹4.2L" icon={ArrowUpRight} positive />
                <Metric label="Expenses" value="₹2.84L" icon={ArrowDownRight} />
                <Metric label="Invested" value="₹1.1L" icon={TrendingUp} positive />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/80 shadow-sm backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 font-serif text-2xl font-medium">
                <PieChartIcon size={22} className="text-primary" />
                Investment Mix
              </CardTitle>
              <CardDescription>Current portfolio allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-[230px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={investmentSplit} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={3} dataKey="value" stroke="none">
                      {investmentSplit.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} className="cursor-pointer transition-opacity hover:opacity-80" />
                      ))}
                    </Pie>
                    <Tooltip formatter={(_, name) => [name, 'Asset']} contentStyle={{ borderRadius: '14px', border: '1px solid hsl(var(--border))' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm text-muted-foreground">Portfolio</span>
                  <span className="font-serif text-2xl font-semibold">₹85.5L</span>
                </div>
              </div>
              <div className="mt-3 space-y-3">
                {investmentSplit.map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-2xl bg-secondary/35 px-4 py-3 transition-colors hover:bg-secondary/60">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Card className="border-border/60 bg-card/80 shadow-sm backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif text-2xl font-medium">
                <TrendingUp size={22} className="text-primary" />
                Investments
              </CardTitle>
              <CardDescription>Top holdings and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {investments.map((item) => (
                <div key={item.name} className="rounded-3xl border border-border/60 bg-background/55 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-background/85 hover:shadow-lg hover:shadow-primary/5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(item.amount)}</p>
                      <p className="mt-1 text-sm font-medium text-primary">{item.returnValue}</p>
                    </div>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/80 shadow-sm backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif text-2xl font-medium">
                <TrendingDown size={22} className="text-accent" />
                Expense
              </CardTitle>
              <CardDescription>Category-level monthly spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-5 h-[170px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expenseCategories} margin={{ top: 8, right: 6, left: -24, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(value) => `₹${Number(value) / 1000}k`} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '14px', border: '1px solid hsl(var(--border))' }} formatter={(value: number) => formatCurrency(value)} />
                    <Bar dataKey="amount" radius={[12, 12, 4, 4]} fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {expenseCategories.map((item) => (
                  <div key={item.name} className="rounded-2xl bg-secondary/35 px-4 py-3 transition-colors hover:bg-secondary/60">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">{item.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold">{formatCurrency(item.amount)}</span>
                        <span className={`text-xs font-medium ${item.trend.startsWith('-') ? 'text-primary' : 'text-accent'}`}>{item.trend}</span>
                      </div>
                    </div>
                    <Progress value={item.percent} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

function Metric({ label, value, icon: Icon, positive = false }: { label: string; value: string; icon: React.ElementType; positive?: boolean }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/55 p-4 transition-colors hover:bg-background/85">
      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Icon size={16} className={positive ? 'text-primary' : 'text-accent'} />
        {label}
      </div>
      <p className="font-serif text-2xl font-semibold">{value}</p>
    </div>
  );
}
