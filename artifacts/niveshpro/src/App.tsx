import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { DataProvider } from "@/hooks/use-data";
import { MainLayout } from "@/components/layout/main-layout";
import { Dashboard } from "@/pages/dashboard";
import { Transactions } from "@/pages/transactions";
import { Portfolio } from "@/pages/portfolio";
import { Goals } from "@/pages/goals";
import { Bills } from "@/pages/bills";

const queryClient = new QueryClient();

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/goals" component={Goals} />
        <Route path="/bills" component={Bills} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DataProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </DataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
