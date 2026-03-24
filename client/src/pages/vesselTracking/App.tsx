import { Switch, Route, useLocation, Router } from "wouter";
import { queryClient } from "../../lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "../../components/ui/toaster";
import { TooltipProvider } from "../../components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar} from "../../components/app-sidebar";
import { Dashboard } from "./dashboard";
import { FleetPage } from "./fleet";
import { AnalyticsPage } from "./analytics";
import { AlertsPage } from "./alerts";
import { SettingsPage } from "./settings";
import NotFound from "./not-found";
import { useState } from "react";
import { type FleetStats, type VesselFilter, type Vessel } from "../../../../shared/schema";
import { Bell } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Link } from "wouter";
import "leaflet/dist/leaflet.css";

function AppContent() {
  const [filters, setFilters] = useState<VesselFilter>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingVessel, setPendingVessel] = useState<Vessel | null>(null);
  const [, setLocation] = useLocation();

  const { data: fleetStats } = useQuery<FleetStats>({
    queryKey: ["/api/stats/fleet"],
  });

  const handleTrackOnMap = (vessel: Vessel) => {
    setFilters({});
    setSearchQuery("");
    setPendingVessel(vessel);
    setLocation("/");
  };

  const style = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
<SidebarProvider
  defaultOpen={true}
  open={true}
  onOpenChange={() => {}}
  style={style as React.CSSProperties}
>

      <div className="flex h-screen w-full">
        <AppSidebar
          fleetStats={fleetStats}
          filters={filters}
          onFilterChange={setFilters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onVesselSelect={handleTrackOnMap}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* <header className="flex items-center justify-between gap-4 px-4 h-14 border-b border-border bg-background sticky top-0 z-50">
            <div className="flex items-center gap-2">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <span className="text-lg font-semibold hidden md:block">Trade Genie</span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/alerts">
                <Button variant="ghost" size="icon" className="relative" data-testid="button-alerts-header">
                  <Bell className="h-4 w-4" />
                  {(fleetStats?.criticalAlerts || 0) > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 min-w-[20px] flex items-center justify-center text-xs p-0"
                    >
                      {fleetStats?.criticalAlerts}
                    </Badge>
                  )}
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </header> */}

            {/* <AppHeader fleetStats={fleetStats} /> */}

          <main className="flex-1 overflow-hidden">
            <Switch>
              <Route path="/">
                <Dashboard 
                  filters={filters} 
                  searchQuery={searchQuery} 
                  initialVessel={pendingVessel}
                  onInitialVesselConsumed={() => setPendingVessel(null)}
                />
              </Route>
              <Route path="/fleet">
                <FleetPage 
                  filters={filters} 
                  searchQuery={searchQuery} 
                  onTrackOnMap={handleTrackOnMap}
                />
              </Route>
              <Route path="/analytics">
                <AnalyticsPage />
              </Route>
              <Route path="/alerts">
                <AlertsPage />
              </Route>
              <Route path="/settings">
                <SettingsPage />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <Router base="/vessel-tracking-app">
      {/* <ThemeProvider defaultTheme="dark"> */}
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <AppContent />
          </TooltipProvider>
        </QueryClientProvider>
      {/* </ThemeProvider> */}
    </Router>
  );
}


export default App;
