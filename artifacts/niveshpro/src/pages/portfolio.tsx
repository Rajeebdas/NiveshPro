import React, { useState } from 'react';
import { useData, Investment, AssetClass } from '@/hooks/use-data';
import { Header } from '@/components/layout/header';
import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal, Pencil, Trash2, PieChart as PieChartIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const CHART_COLORS = {
  equities: 'hsl(var(--chart-1))',
  mutual_funds: 'hsl(var(--chart-3))',
  fixed_deposit: 'hsl(var(--chart-5))',
  gold: 'hsl(var(--chart-2))',
  cash: 'hsl(var(--chart-4))',
  real_estate: 'hsl(var(--chart-1))',
};

const ASSET_CLASS_LABELS: Record<AssetClass, string> = {
  equities: 'Equities',
  mutual_funds: 'Mutual Funds',
  fixed_deposit: 'Fixed Deposits',
  gold: 'Gold',
  cash: 'Cash',
  real_estate: 'Real Estate'
};

export function Portfolio() {
  const { data, addInvestment, updateInvestment, deleteInvestment } = useData();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInv, setEditingInv] = useState<Investment | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [assetClass, setAssetClass] = useState<AssetClass>('mutual_funds');
  const [currentValue, setCurrentValue] = useState('');
  const [costBasis, setCostBasis] = useState('');
  const [monthlySip, setMonthlySip] = useState('');

  const totalValue = data.investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalCost = data.investments.reduce((sum, inv) => sum + inv.costBasis, 0);
  const totalReturns = totalValue - totalCost;
  const returnsPercent = totalCost > 0 ? (totalReturns / totalCost) * 100 : 0;

  // Group by asset class for pie chart
  const assetAllocationMap = data.investments.reduce((acc, inv) => {
    acc[inv.assetClass] = (acc[inv.assetClass] || 0) + inv.currentValue;
    return acc;
  }, {} as Record<string, number>);

  const assetAllocation = Object.entries(assetAllocationMap)
    .map(([key, value]) => ({
      name: ASSET_CLASS_LABELS[key as AssetClass] || key,
      value,
      color: CHART_COLORS[key as AssetClass] || 'hsl(var(--chart-1))'
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const handleOpenDialog = (inv?: Investment) => {
    if (inv) {
      setEditingInv(inv);
      setName(inv.name);
      setAssetClass(inv.assetClass);
      setCurrentValue(inv.currentValue.toString());
      setCostBasis(inv.costBasis.toString());
      setMonthlySip(inv.monthlySip.toString());
    } else {
      setEditingInv(null);
      setName('');
      setAssetClass('mutual_funds');
      setCurrentValue('');
      setCostBasis('');
      setMonthlySip('0');
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!name || !currentValue) return;
    
    const invData = {
      name,
      assetClass,
      currentValue: Number(currentValue),
      costBasis: Number(costBasis) || Number(currentValue),
      monthlySip: Number(monthlySip) || 0,
      risk: 'Medium' // Defaulting for now
    };

    if (editingInv) {
      updateInvestment(editingInv.id, invData);
    } else {
      addInvestment(invData);
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <Header 
        title="Portfolio" 
        description="Manage your investments and asset allocation." 
        action={
          <Button onClick={() => handleOpenDialog()} className="rounded-full shadow-lg shadow-primary/20 gap-2 px-5" data-testid="button-add-inv">
            <Plus size={18} />
            <span className="hidden sm:inline">Add Holding</span>
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto px-8 pb-12 z-10">
        <div className="max-w-5xl mx-auto space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 bg-gradient-to-br from-secondary/80 to-background backdrop-blur-xl border-border/50 shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <p className="text-muted-foreground font-medium mb-1">Total Portfolio Value</p>
                    <h2 className="text-4xl font-serif font-medium tracking-tight text-foreground">{formatCurrency(totalValue)}</h2>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium mb-1">Invested Amount</p>
                    <p className="text-2xl font-medium text-foreground/80">{formatCurrency(totalCost)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium mb-1">Overall Returns</p>
                    <div className="flex items-baseline gap-2">
                      <p className={`text-2xl font-medium ${totalReturns >= 0 ? 'text-primary' : 'text-destructive'}`}>
                        {totalReturns >= 0 ? '+' : ''}{formatCurrency(totalReturns)}
                      </p>
                      <span className={`text-sm font-medium ${totalReturns >= 0 ? 'text-primary' : 'text-destructive'}`}>
                        ({returnsPercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full relative">
                {assetAllocation.length > 0 ? (
                  <>
                    <div className="h-[120px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={assetAllocation}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={55}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                          >
                            {assetAllocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <PieChartIcon size={24} className="text-muted-foreground/30" />
                    </div>
                  </>
                ) : (
                  <div className="text-center text-muted-foreground">No assets</div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Your Holdings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {data.investments.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <p className="text-lg font-medium text-foreground mb-1">No holdings yet</p>
                  <p className="text-sm">Add your investments to track your portfolio.</p>
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {data.investments.map(inv => {
                    const returns = inv.currentValue - inv.costBasis;
                    const percent = inv.costBasis > 0 ? (returns / inv.costBasis) * 100 : 0;
                    return (
                      <div key={inv.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-secondary/30 transition-colors gap-4" data-testid={`row-inv-${inv.id}`}>
                        <div>
                          <p className="font-medium text-base text-foreground">{inv.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span className="px-2 py-0.5 rounded-md bg-secondary text-foreground/80 font-medium">
                              {ASSET_CLASS_LABELS[inv.assetClass]}
                            </span>
                            {inv.monthlySip > 0 && <span>• SIP: {formatCurrency(inv.monthlySip)}/mo</span>}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 justify-between sm:justify-end w-full sm:w-auto">
                          <div className="text-right">
                            <p className="font-medium text-foreground">{formatCurrency(inv.currentValue)}</p>
                            <p className={`text-xs mt-1 font-medium ${returns >= 0 ? 'text-primary' : 'text-destructive'}`}>
                              {returns >= 0 ? '+' : ''}{formatCurrency(returns)} ({percent.toFixed(2)}%)
                            </p>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground shrink-0">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleOpenDialog(inv)} data-testid={`edit-inv-${inv.id}`}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteInvestment(inv.id)} className="text-destructive focus:bg-destructive/10" data-testid={`delete-inv-${inv.id}`}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingInv ? 'Edit Holding' : 'Add Holding'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name / Ticker</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Nifty 50 Index Fund" data-testid="input-inv-name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assetClass">Asset Class</Label>
              <Select value={assetClass} onValueChange={(val: any) => setAssetClass(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ASSET_CLASS_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="currentValue">Current Value</Label>
                <Input id="currentValue" type="number" value={currentValue} onChange={e => setCurrentValue(e.target.value)} placeholder="0.00" data-testid="input-inv-current" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="costBasis">Invested Amount</Label>
                <Input id="costBasis" type="number" value={costBasis} onChange={e => setCostBasis(e.target.value)} placeholder="0.00" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="monthlySip">Monthly SIP (Optional)</Label>
              <Input id="monthlySip" type="number" value={monthlySip} onChange={e => setMonthlySip(e.target.value)} placeholder="0.00" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} data-testid="save-inv">{editingInv ? 'Update' : 'Add'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
