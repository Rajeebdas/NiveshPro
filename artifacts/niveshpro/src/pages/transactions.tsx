import React, { useState } from 'react';
import { useData, Transaction, TransactionType } from '@/hooks/use-data';
import { Header } from '@/components/layout/header';
import { formatCurrency, formatDate } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter, MoreHorizontal, Pencil, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function Transactions() {
  const { data, addTransaction, updateTransaction, deleteTransaction } = useData();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredTransactions = data.transactions.filter(tx => {
    const matchesSearch = tx.title.toLowerCase().includes(search.toLowerCase()) || 
                          tx.category.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleOpenDialog = (tx?: Transaction) => {
    if (tx) {
      setEditingTx(tx);
      setTitle(tx.title);
      setAmount(tx.amount.toString());
      setType(tx.type);
      setCategory(tx.category);
      setAccount(tx.account);
      setDate(tx.date.split('T')[0]);
    } else {
      setEditingTx(null);
      setTitle('');
      setAmount('');
      setType('expense');
      setCategory('');
      setAccount('');
      setDate(new Date().toISOString().split('T')[0]);
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!title || !amount || !category) return;
    
    const txData = {
      title,
      amount: Number(amount),
      type,
      category,
      account,
      date: new Date(date).toISOString(),
      note: ''
    };

    if (editingTx) {
      updateTransaction(editingTx.id, txData);
    } else {
      addTransaction(txData);
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <Header 
        title="Transactions" 
        description="Track all your money movements." 
        action={
          <Button onClick={() => handleOpenDialog()} className="rounded-full shadow-lg shadow-primary/20 gap-2 px-5" data-testid="button-add-tx">
            <Plus size={18} />
            <span className="hidden sm:inline">Add Transaction</span>
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto px-8 pb-12 z-10">
        <div className="max-w-5xl mx-auto space-y-6">
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-background/60 backdrop-blur-xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
              <Button 
                variant={filterType === 'all' ? 'default' : 'outline'} 
                onClick={() => setFilterType('all')}
                className="rounded-full shrink-0"
              >
                All
              </Button>
              <Button 
                variant={filterType === 'income' ? 'default' : 'outline'} 
                onClick={() => setFilterType('income')}
                className="rounded-full shrink-0"
              >
                Income
              </Button>
              <Button 
                variant={filterType === 'expense' ? 'default' : 'outline'} 
                onClick={() => setFilterType('expense')}
                className="rounded-full shrink-0"
              >
                Expense
              </Button>
              <Button 
                variant={filterType === 'investment' ? 'default' : 'outline'} 
                onClick={() => setFilterType('investment')}
                className="rounded-full shrink-0"
              >
                Investment
              </Button>
            </div>
          </div>

          <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              {filteredTransactions.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter size={24} />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-1">No transactions found</p>
                  <p className="text-sm">Try adjusting your filters or add a new transaction.</p>
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {filteredTransactions.map(tx => {
                    const isPositive = tx.type === 'income';
                    return (
                      <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors" data-testid={`row-tx-${tx.id}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isPositive ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent-foreground/70'}`}>
                            {isPositive ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                          </div>
                          <div>
                            <p className="font-medium text-base text-foreground">{tx.title}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                              <span>{formatDate(tx.date)}</span>
                              <span>•</span>
                              <span>{tx.category}</span>
                              <span>•</span>
                              <span>{tx.account}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className={`font-semibold text-right ${isPositive ? 'text-primary' : 'text-foreground'}`}>
                            {isPositive ? '+' : '-'}{formatCurrency(tx.amount)}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleOpenDialog(tx)} data-testid={`edit-tx-${tx.id}`}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteTransaction(tx.id)} className="text-destructive focus:bg-destructive/10" data-testid={`delete-tx-${tx.id}`}>
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
            <DialogTitle>{editingTx ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Salary, Groceries" data-testid="input-tx-title" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" data-testid="input-tx-amount" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={(val: any) => setType(val)}>
                  <SelectTrigger data-testid="select-tx-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="bill">Bill</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Dining" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="account">Account</Label>
                <Input id="account" value={account} onChange={e => setAccount(e.target.value)} placeholder="e.g. HDFC Bank" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} data-testid="save-tx">{editingTx ? 'Update' : 'Add'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
