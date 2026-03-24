import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound";
import { Route, Switch, Link, useLocation } from "wouter";
import Home from "./pages/Home";
import InstrumentScreen from "./pages/InstrumentScreen";
import LLMLogsScreen from "./pages/LLMLogsScreen";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Home as HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";


function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/mlc/home", label: "Home", icon: HomeIcon },
    { path: "/mlc/instrument", label: "Instrument", icon: FileText },
    { path: "/mlc/llm-logs", label: "LLM Logs", icon: MessageSquare },
  ];

  return (
    <header className="sticky  mt-5 top-0 z-50  border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/mlc/home" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg">MLC Validation</span>
          </Link>
          {/* <div className="mt-5"> */}
            <nav className="flex items-center space-x-1 gap-4">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "flex items-center gap-2 btn btn-primary btn-outline flex items-center gap-2 text-xs",
                      location === item.path && "bg-muted"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          {/* </div> */}
        </div>
       
      </div>
    </header>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/mlc/home" component={Home} />
      <Route path="/mlc/instrument" component={InstrumentScreen} />
      <Route path="/mlc/llm-logs" component={LLMLogsScreen} />
      {/* <Route path="/404" component={NotFound} /> */}
      <Route component={NotFound} />
    </Switch>
  );
}

function Mlc_Validation() {
  return (
    // <ErrorBoundary>
    // <ThemeProvider defaultTheme="light">
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen">
        <Navigation />
        <main>
          <Router />
        </main>
        <footer className="card p-5 mt-8">
          <div className="container text-center">
            <p className="text-sm">MLC - Letter of Credit Cycle Validation System</p>
            <p className="text-xs text-slate-400 mt-1">Powered by Azure OpenAI</p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
    // </ThemeProvider>
    // </ErrorBoundary>
  );
}

export default Mlc_Validation;
