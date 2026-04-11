import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TransactionType = 'income' | 'expense' | 'investment' | 'bill';
export type AssetClass = 'equities' | 'mutual_funds' | 'fixed_deposit' | 'gold' | 'cash' | 'real_estate';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  account: string;
  date: string;
  note: string;
}

export interface Investment {
  id: string;
  name: string;
  assetClass: AssetClass;
  currentValue: number;
  costBasis: number;
  monthlySip: number;
  risk: string;
}

export interface Goal {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  dueDate: string;
  priority: string;
}

export interface Bill {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  category: string;
  paid: boolean;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
}

interface AppData {
  transactions: Transaction[];
  investments: Investment[];
  goals: Goal[];
  bills: Bill[];
  budgets: Budget[];
}

interface DataContextType {
  data: AppData;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  
  addInvestment: (inv: Omit<Investment, 'id'>) => void;
  updateInvestment: (id: string, inv: Omit<Investment, 'id'>) => void;
  deleteInvestment: (id: string) => void;
  
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, goal: Omit<Goal, 'id'>) => void;
  deleteGoal: (id: string) => void;
  
  addBill: (bill: Omit<Bill, 'id'>) => void;
  updateBill: (id: string, bill: Omit<Bill, 'id'>) => void;
  deleteBill: (id: string) => void;
  markBillPaid: (id: string, paid: boolean) => void;
  
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  updateBudget: (id: string, budget: Omit<Budget, 'id'>) => void;
  deleteBudget: (id: string) => void;
}

const STORAGE_KEY = 'niveshpro_data_v1';

const initialData: AppData = {
  transactions: [
    { id: '1', title: 'TechCorp Salary', amount: 420000, type: 'income', category: 'Salary', account: 'HDFC Bank', date: new Date().toISOString(), note: 'Monthly salary' },
    { id: '2', title: 'Zerodha Broking', amount: 50000, type: 'investment', category: 'Investment', account: 'HDFC Bank', date: new Date(Date.now() - 86400000).toISOString(), note: 'Monthly SIP' },
    { id: '3', title: 'HDFC Credit Card', amount: 34500, type: 'bill', category: 'Credit Card', account: 'SBI Bank', date: new Date(Date.now() - 86400000 * 3).toISOString(), note: 'Bill payment' },
    { id: '4', title: 'Taj Hotels', amount: 12400, type: 'expense', category: 'Dining', account: 'Credit Card', date: new Date(Date.now() - 86400000 * 5).toISOString(), note: 'Anniversary dinner' },
  ],
  investments: [
    { id: '1', name: 'Nifty 50 Index Fund', assetClass: 'mutual_funds', currentValue: 3200000, costBasis: 2500000, monthlySip: 25000, risk: 'Medium' },
    { id: '2', name: 'Direct Equity Portfolio', assetClass: 'equities', currentValue: 4500000, costBasis: 3100000, monthlySip: 0, risk: 'High' },
    { id: '3', name: 'HDFC Bank FD', assetClass: 'fixed_deposit', currentValue: 1800000, costBasis: 1800000, monthlySip: 0, risk: 'Low' },
    { id: '4', name: 'Sovereign Gold Bonds', assetClass: 'gold', currentValue: 850000, costBasis: 700000, monthlySip: 0, risk: 'Low' },
    { id: '5', name: 'Savings Account', assetClass: 'cash', currentValue: 450000, costBasis: 450000, monthlySip: 0, risk: 'Low' }
  ],
  goals: [
    { id: '1', title: 'House Downpayment', currentAmount: 2800000, targetAmount: 5000000, dueDate: '2026-12-31', priority: 'High' },
    { id: '2', title: 'Europe Trip', currentAmount: 350000, targetAmount: 800000, dueDate: '2025-06-15', priority: 'Medium' },
  ],
  bills: [
    { id: '1', title: 'Electricity Bill', amount: 2500, dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), category: 'Utilities', paid: false },
    { id: '2', title: 'Internet', amount: 1200, dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), category: 'Utilities', paid: false },
    { id: '3', title: 'Car Loan EMI', amount: 15000, dueDate: new Date(Date.now() + 86400000 * 10).toISOString(), category: 'Loans', paid: true },
  ],
  budgets: [
    { id: '1', category: 'Dining', limit: 20000, spent: 12400 },
    { id: '2', category: 'Groceries', limit: 15000, spent: 8500 },
    { id: '3', category: 'Shopping', limit: 10000, spent: 2000 },
  ]
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved data', e);
      }
    }
    return initialData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const value: DataContextType = {
    data,
    
    addTransaction: (tx) => setData(d => ({ ...d, transactions: [{ ...tx, id: generateId() }, ...d.transactions] })),
    updateTransaction: (id, tx) => setData(d => ({ ...d, transactions: d.transactions.map(t => t.id === id ? { ...tx, id } : t) })),
    deleteTransaction: (id) => setData(d => ({ ...d, transactions: d.transactions.filter(t => t.id !== id) })),
    
    addInvestment: (inv) => setData(d => ({ ...d, investments: [...d.investments, { ...inv, id: generateId() }] })),
    updateInvestment: (id, inv) => setData(d => ({ ...d, investments: d.investments.map(i => i.id === id ? { ...inv, id } : i) })),
    deleteInvestment: (id) => setData(d => ({ ...d, investments: d.investments.filter(i => i.id !== id) })),
    
    addGoal: (goal) => setData(d => ({ ...d, goals: [...d.goals, { ...goal, id: generateId() }] })),
    updateGoal: (id, goal) => setData(d => ({ ...d, goals: d.goals.map(g => g.id === id ? { ...goal, id } : g) })),
    deleteGoal: (id) => setData(d => ({ ...d, goals: d.goals.filter(g => g.id !== id) })),
    
    addBill: (bill) => setData(d => ({ ...d, bills: [...d.bills, { ...bill, id: generateId() }] })),
    updateBill: (id, bill) => setData(d => ({ ...d, bills: d.bills.map(b => b.id === id ? { ...bill, id } : b) })),
    deleteBill: (id) => setData(d => ({ ...d, bills: d.bills.filter(b => b.id !== id) })),
    markBillPaid: (id, paid) => setData(d => ({ ...d, bills: d.bills.map(b => b.id === id ? { ...b, paid } : b) })),
    
    addBudget: (budget) => setData(d => ({ ...d, budgets: [...d.budgets, { ...budget, id: generateId() }] })),
    updateBudget: (id, budget) => setData(d => ({ ...d, budgets: d.budgets.map(b => b.id === id ? { ...budget, id } : b) })),
    deleteBudget: (id) => setData(d => ({ ...d, budgets: d.budgets.filter(b => b.id !== id) })),
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
