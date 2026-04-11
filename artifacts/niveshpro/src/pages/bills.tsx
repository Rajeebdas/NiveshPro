import React, { useState } from 'react';
import { useData, Bill, Budget } from '@/hooks/use-data';
import { Header } from '@/components/layout/header';
import { formatCurrency, formatDate } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal, Pencil, Trash2, Receipt, CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Bills() {
  const { data, addBill, updateBill, deleteBill, markBillPaid, addBudget, updateBudget, deleteBudget } = useData();
  
  const [isBillDialogOpen, setIsBillDialogOpen] = useState(false);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);
  
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  
  // Bill Form state
  const [billTitle, setBillTitle] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [billCategory, setBillCategory] = useState('');
  const [billDate, setBillDate] = useState('');

  // Budget Form state
  const [budgetCat, setBudgetCat] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');
  const [budgetSpent, setBudgetSpent] = useState('');

  const handleOpenBillDialog = (bill?: Bill) => {
    if (bill) {
      setEditingBill(bill);
      setBillTitle(bill.title);
      setBillAmount(bill.amount.toString());
      setBillCategory(bill.category);
      setBillDate(bill.dueDate.split('T')[0]);
    } else {
      setEditingBill(null);
      setBillTitle('');
      setBillAmount('');
      setBillCategory('');
      setBillDate(new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]);
    }
    setIsBillDialogOpen(true);
  };

  const handleSaveBill = () => {
    if (!billTitle || !billAmount) return;
    
    const billData = {
      title: billTitle,
      amount: Number(billAmount),
      dueDate: new Date(billDate).toISOString(),
      category: billCategory || 'General',
      paid: editingBill ? editingBill.paid : false
    };

    if (editingBill) {
      updateBill(editingBill.id, billData);
    } else {
      addBill(billData);
    }
    setIsBillDialogOpen(false);
  };

  const handleOpenBudgetDialog = (budget?: Budget) => {
    if (budget) {
      setEditingBudget(budget);
      setBudgetCat(budget.category);
      setBudgetLimit(budget.limit.toString());
      setBudgetSpent(budget.spent.toString());
    } else {
      setEditingBudget(null);
      setBudgetCat('');
      setBudgetLimit('');
      setBudgetSpent('0');
    }
    setIsBudgetDialogOpen(true);
  };

  const handleSaveBudget = () => {
    if (!budgetCat || !budgetLimit) return;
    
    const budgetData = {
      category: budgetCat,
      limit: Number(budgetLimit),
      spent: Number(budgetSpent) || 0,
    };

    if (editingBudget) {
      updateBudget(editingBudget.id, budgetData);
    } else {
      addBudget(budgetData);
    }
    setIsBudgetDialogOpen(false);
  };

  const sortedBills = [...data.bills].sort((a, b) => {
    if (a.paid !== b.paid) return a.paid ? 1 : -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <>
      <Header 
        title="Bills & Budgets" 
        description="Manage your monthly commitments." 
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleOpenBudgetDialog()} className="rounded-full bg-background/50 border-border/50 shadow-sm" data-testid="button-add-budget">
              New Budget
            </Button>
            <Button onClick={() => handleOpenBillDialog()} className="rounded-full shadow-lg shadow-primary/20 gap-2 px-5" data-testid="button-add-bill">
              <Plus size={18} />
              <span className="hidden sm:inline">Add Bill</span>
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto px-8 pb-12 z-10">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Bills */}
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-medium text-foreground px-2">Upcoming Bills</h2>
              
              <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  {sortedBills.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <Receipt size={24} className="mx-auto mb-2 opacity-50" />
                      <p>No bills tracked</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border/50">
                      {sortedBills.map(bill => {
                        const isOverdue = !bill.paid && new Date(bill.dueDate) < new Date();
                        const isDueSoon = !bill.paid && !isOverdue && new Date(bill.dueDate).getTime() - Date.now() < 86400000 * 3;
                        
                        return (
                          <div key={bill.id} className={`flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors ${bill.paid ? 'opacity-60' : ''}`} data-testid={`row-bill-${bill.id}`}>
                            <div className="flex items-center gap-4">
                              <button 
                                onClick={() => markBillPaid(bill.id, !bill.paid)}
                                className="text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                                data-testid={`check-bill-${bill.id}`}
                              >
                                {bill.paid ? <CheckCircle2 size={24} className="text-primary" /> : <Circle size={24} />}
                              </button>
                              <div>
                                <p className={`font-medium text-base ${bill.paid ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                  {bill.title}
                                </p>
                                <div className="flex items-center gap-2 text-xs mt-0.5">
                                  <span className={`font-medium ${isOverdue ? 'text-destructive' : isDueSoon ? 'text-accent' : 'text-muted-foreground'}`}>
                                    {isOverdue ? 'Overdue: ' : 'Due: '}{formatDate(bill.dueDate)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="font-semibold text-foreground">
                                {formatCurrency(bill.amount)}
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                    <MoreHorizontal size={16} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleOpenBillDialog(bill)} data-testid={`edit-bill-${bill.id}`}>
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => deleteBill(bill.id)} className="text-destructive focus:bg-destructive/10" data-testid={`delete-bill-${bill.id}`}>
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

            {/* Monthly Budgets */}
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-medium text-foreground px-2">Monthly Budgets</h2>
              
              <div className="space-y-4">
                {data.budgets.length === 0 ? (
                  <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm border-dashed">
                    <CardContent className="p-8 text-center text-muted-foreground">
                      <p>No active budgets</p>
                    </CardContent>
                  </Card>
                ) : (
                  data.budgets.map(budget => {
                    const percent = Math.min(100, Math.round((budget.spent / budget.limit) * 100));
                    const isOver = budget.spent > budget.limit;
                    const isWarning = percent > 85 && !isOver;
                    
                    let progressColor = 'bg-primary';
                    if (isOver) progressColor = 'bg-destructive';
                    else if (isWarning) progressColor = 'bg-accent';

                    return (
                      <Card key={budget.id} className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm" data-testid={`card-budget-${budget.id}`}>
                        <CardContent className="p-5">
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-foreground">{budget.category}</h3>
                              {isOver && <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-destructive/10 text-destructive">Over</span>}
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 text-muted-foreground">
                                  <MoreHorizontal size={14} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleOpenBudgetDialog(budget)} data-testid={`edit-budget-${budget.id}`}>
                                  <Pencil className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => deleteBudget(budget.id)} className="text-destructive focus:bg-destructive/10" data-testid={`delete-budget-${budget.id}`}>
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-foreground/80 font-medium">{formatCurrency(budget.spent)} spent</span>
                            <span className="text-muted-foreground">{formatCurrency(budget.limit)} limit</span>
                          </div>
                          
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ease-out ${progressColor}`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          
                          {isOver && (
                            <p className="text-xs text-destructive mt-2 text-right font-medium">
                              {formatCurrency(budget.spent - budget.limit)} over limit
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bill Dialog */}
      <Dialog open={isBillDialogOpen} onOpenChange={setIsBillDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingBill ? 'Edit Bill' : 'Add Bill'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="billTitle">Title</Label>
              <Input id="billTitle" value={billTitle} onChange={e => setBillTitle(e.target.value)} placeholder="e.g. Electricity" data-testid="input-bill-title" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="billAmount">Amount</Label>
                <Input id="billAmount" type="number" value={billAmount} onChange={e => setBillAmount(e.target.value)} placeholder="0.00" data-testid="input-bill-amount" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="billCategory">Category</Label>
                <Input id="billCategory" value={billCategory} onChange={e => setBillCategory(e.target.value)} placeholder="e.g. Utilities" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="billDate">Due Date</Label>
              <Input id="billDate" type="date" value={billDate} onChange={e => setBillDate(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBillDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveBill} data-testid="save-bill">{editingBill ? 'Update' : 'Add'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Budget Dialog */}
      <Dialog open={isBudgetDialogOpen} onOpenChange={setIsBudgetDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingBudget ? 'Edit Budget' : 'New Budget'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="budgetCat">Category</Label>
              <Input id="budgetCat" value={budgetCat} onChange={e => setBudgetCat(e.target.value)} placeholder="e.g. Dining out" data-testid="input-budget-cat" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="budgetLimit">Monthly Limit</Label>
                <Input id="budgetLimit" type="number" value={budgetLimit} onChange={e => setBudgetLimit(e.target.value)} placeholder="0.00" data-testid="input-budget-limit" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budgetSpent">Already Spent</Label>
                <Input id="budgetSpent" type="number" value={budgetSpent} onChange={e => setBudgetSpent(e.target.value)} placeholder="0.00" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBudgetDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveBudget} data-testid="save-budget">{editingBudget ? 'Update' : 'Create'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
