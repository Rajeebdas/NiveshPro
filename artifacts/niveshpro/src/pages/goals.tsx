import React, { useState } from 'react';
import { useData, Goal } from '@/hooks/use-data';
import { Header } from '@/components/layout/header';
import { formatCurrency, formatDate } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal, Pencil, Trash2, Target, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Goals() {
  const { data, addGoal, updateGoal, deleteGoal } = useData();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleOpenDialog = (goal?: Goal) => {
    if (goal) {
      setEditingGoal(goal);
      setTitle(goal.title);
      setCurrentAmount(goal.currentAmount.toString());
      setTargetAmount(goal.targetAmount.toString());
      setDueDate(goal.dueDate.split('T')[0]);
    } else {
      setEditingGoal(null);
      setTitle('');
      setCurrentAmount('');
      setTargetAmount('');
      setDueDate(new Date(Date.now() + 31536000000).toISOString().split('T')[0]); // 1 year from now
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!title || !targetAmount) return;
    
    const goalData = {
      title,
      currentAmount: Number(currentAmount) || 0,
      targetAmount: Number(targetAmount),
      dueDate: new Date(dueDate).toISOString(),
      priority: 'Medium'
    };

    if (editingGoal) {
      updateGoal(editingGoal.id, goalData);
    } else {
      addGoal(goalData);
    }
    setIsDialogOpen(false);
  };

  const [addFundsOpen, setAddFundsOpen] = useState(false);
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);
  const [fundAmount, setFundAmount] = useState('');

  const handleAddFunds = () => {
    if (!activeGoal || !fundAmount) return;
    updateGoal(activeGoal.id, {
      ...activeGoal,
      currentAmount: activeGoal.currentAmount + Number(fundAmount)
    });
    setAddFundsOpen(false);
    setFundAmount('');
  };

  return (
    <>
      <Header 
        title="Financial Goals" 
        description="Set targets and track your progress." 
        action={
          <Button onClick={() => handleOpenDialog()} className="rounded-full shadow-lg shadow-primary/20 gap-2 px-5" data-testid="button-add-goal">
            <Plus size={18} />
            <span className="hidden sm:inline">New Goal</span>
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto px-8 pb-12 z-10">
        <div className="max-w-5xl mx-auto">
          {data.goals.length === 0 ? (
             <div className="p-12 text-center text-muted-foreground bg-background/60 backdrop-blur-xl border border-border/50 rounded-xl mt-6">
               <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                 <Target size={24} />
               </div>
               <p className="text-lg font-medium text-foreground mb-1">No goals set</p>
               <p className="text-sm">Start tracking what matters to you.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {data.goals.map((goal, idx) => {
                const percent = Math.min(100, Math.round((goal.currentAmount/goal.targetAmount)*100));
                const colors = ['bg-[hsl(var(--chart-1))]', 'bg-[hsl(var(--chart-2))]', 'bg-[hsl(var(--chart-3))]'];
                const color = colors[idx % colors.length];
                
                return (
                  <Card key={goal.id} className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm overflow-hidden flex flex-col group" data-testid={`card-goal-${goal.id}`}>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-primary transition-colors">{goal.title}</h3>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                            <Calendar size={12} /> Target: {formatDate(goal.dueDate)}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => { setActiveGoal(goal); setAddFundsOpen(true); }}>
                              <Plus className="mr-2 h-4 w-4" /> Update Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenDialog(goal)} data-testid={`edit-goal-${goal.id}`}>
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteGoal(goal.id)} className="text-destructive focus:bg-destructive/10" data-testid={`delete-goal-${goal.id}`}>
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="mt-auto space-y-3">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-3xl font-medium text-foreground tracking-tight">{formatCurrency(goal.currentAmount)}</p>
                            <p className="text-sm text-muted-foreground font-medium">of {formatCurrency(goal.targetAmount)}</p>
                          </div>
                          <span className="text-2xl font-serif text-muted-foreground/40">{percent}%</span>
                        </div>
                        
                        <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingGoal ? 'Edit Goal' : 'New Goal'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Goal Name</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. House Downpayment" data-testid="input-goal-title" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="targetAmount">Target Amount</Label>
                <Input id="targetAmount" type="number" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} placeholder="0.00" data-testid="input-goal-target" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currentAmount">Saved So Far</Label>
                <Input id="currentAmount" type="number" value={currentAmount} onChange={e => setCurrentAmount(e.target.value)} placeholder="0.00" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Target Date</Label>
              <Input id="dueDate" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} data-testid="save-goal">{editingGoal ? 'Update' : 'Create'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={addFundsOpen} onOpenChange={setAddFundsOpen}>
        <DialogContent className="sm:max-w-[350px]">
          <DialogHeader>
            <DialogTitle>Update Progress</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Add funds to <span className="font-medium text-foreground">{activeGoal?.title}</span>
            </p>
            <div className="grid gap-2">
              <Label htmlFor="fundAmount">Amount to Add</Label>
              <Input id="fundAmount" type="number" value={fundAmount} onChange={e => setFundAmount(e.target.value)} placeholder="0.00" autoFocus />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddFundsOpen(false)}>Cancel</Button>
            <Button onClick={handleAddFunds}>Add Funds</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
