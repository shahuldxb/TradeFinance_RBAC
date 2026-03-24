import { Anchor, Navigation, AlertTriangle, Settings, BarChart3, Map, Filter, Search, ChevronDown, X, MapPin, Ship } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VesselStatus, VesselType, type FleetStats, type VesselFilter, type Vessel } from "../../../shared/schema";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface AppSidebarProps {
  fleetStats?: FleetStats;
  filters: VesselFilter;
  onFilterChange: (filters: VesselFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onVesselSelect?: (vessel: Vessel) => void;
}

const statusOptions = [
  { value: VesselStatus.ACTIVE, label: "Active", color: "bg-vessel-active" },
  { value: VesselStatus.UNDERWAY, label: "Underway", color: "bg-vessel-underway" },
  { value: VesselStatus.ANCHORED, label: "Anchored", color: "bg-vessel-anchored" },
  { value: VesselStatus.IN_PORT, label: "In Port", color: "bg-vessel-inPort" },
  { value: VesselStatus.MOORED, label: "Moored", color: "bg-vessel-moored" },
  { value: VesselStatus.RESTRICTED, label: "Restricted", color: "bg-vessel-restricted" },
];

const typeOptions = [
  { value: VesselType.CARGO, label: "Cargo" },
  { value: VesselType.TANKER, label: "Tanker" },
  { value: VesselType.CONTAINER, label: "Container" },
  { value: VesselType.PASSENGER, label: "Passenger" },
  { value: VesselType.FISHING, label: "Fishing" },
  { value: VesselType.TUG, label: "Tug" },
  { value: VesselType.MILITARY, label: "Military" },
  { value: VesselType.SAILING, label: "Sailing" },
  { value: VesselType.PLEASURE, label: "Pleasure" },
  { value: VesselType.OTHER, label: "Other" },
];

const navItems = [
  { title: "Fleet Map", url: "/", icon: Map },
  { title: "Fleet List", url: "/fleet", icon: Ship },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
];

export function AppSidebar({ fleetStats, filters, onFilterChange, searchQuery, onSearchChange, onVesselSelect }: AppSidebarProps) {
  const [location, setLocation] = useLocation();
  const [statusOpen, setStatusOpen] = useState(true);
  const [typeOpen, setTypeOpen] = useState(false);
  const [vesselSearch, setVesselSearch] = useState("");

  const { data: searchResults = [] } = useQuery<Vessel[]>({
    queryKey: ["/api/vessels", { search: vesselSearch }],
    enabled: vesselSearch.length >= 2,
  });

  const handleVesselClick = (vessel: Vessel) => {
    setVesselSearch("");
    if (onVesselSelect) {
      onVesselSelect(vessel);
    }
    if (location !== "/") {
      setLocation("/");
    }
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const currentStatuses = filters.status || [];
    const newStatuses = checked
      ? [...currentStatuses, status]
      : currentStatuses.filter((s) => s !== status);
    onFilterChange({ ...filters, status: newStatuses.length > 0 ? newStatuses : undefined });
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    const currentTypes = filters.type || [];
    const newTypes = checked
      ? [...currentTypes, type]
      : currentTypes.filter((t) => t !== type);
    onFilterChange({ ...filters, type: newTypes.length > 0 ? newTypes : undefined });
  };

  const clearFilters = () => {
    onFilterChange({});
    onSearchChange("");
  };

  const hasActiveFilters = (filters.status?.length || 0) > 0 || (filters.type?.length || 0) > 0 || searchQuery.length > 0;

  return (
    <div className="card w-72 min-h-screen h-screen overflow-y-auto border-r  bg-background">
      <SidebarHeader className="border-b border-sidebar-border p-4 mb-5 ">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-foreground">Vessel Tracking</span>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search IMO, MMSI, or name..."
            value={vesselSearch}
            onChange={(e) => setVesselSearch(e.target.value)}
            className="pl-8 h-9 "
            data-testid="input-vessel-search"
          />
          {vesselSearch && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setVesselSearch("")}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {vesselSearch.length >= 2 && (
          <div className="mt-2 rounded-md border border-sidebar-border bg-sidebar-accent/30 overflow-hidden">
            {searchResults.length === 0 ? (
              <div className="p-3 text-sm text-muted-foreground text-center">
                No vessels found
              </div>
            ) : (
              <ScrollArea className="max-h-48">
                {searchResults.slice(0, 8).map((vessel) => (
                  <button
                    key={vessel.id}
                    onClick={() => handleVesselClick(vessel)}
                    className="w-full flex items-start gap-2 p-2 text-left hover-elevate border-b border-sidebar-border last:border-b-0"
                    data-testid={`search-result-${vessel.id}`}
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{vessel.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">
                        IMO: {vessel.imo} | MMSI: {vessel.mmsi}
                      </div>
                    </div>
                  </button>
                ))}
              </ScrollArea>
            )}
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup className="card">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(" ", "-")}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        < SidebarGroup className="card">
          <SidebarGroupLabel className="flex items-center justify-between text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <span>Fleet Overview</span>
            <Badge variant="default" className="text-xs">
              {fleetStats?.totalVessels || 0}
            </Badge>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="grid grid-cols-2 gap-2 p-2">
              <div className="flex flex-col gap-1 rounded-md bg-sidebar-accent/50 p-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-vessel-active" />
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
                <span className="text-lg font-semibold" data-testid="stat-active-vessels">
                  {fleetStats?.activeVessels || 0}
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-md bg-sidebar-accent/50 p-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-vessel-anchored" />
                  <span className="text-xs text-muted-foreground">Anchored</span>
                </div>
                <span className="text-lg font-semibold" data-testid="stat-anchored-vessels">
                  {fleetStats?.anchoredVessels || 0}
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-md bg-sidebar-accent/50 p-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-vessel-inPort" />
                  <span className="text-xs text-muted-foreground">In Port</span>
                </div>
                <span className="text-lg font-semibold" data-testid="stat-inport-vessels">
                  {fleetStats?.inPortVessels || 0}
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-md bg-sidebar-accent/50 p-2">
                <div className="flex items-center gap-1.5">
                  <Navigation className="h-2 w-2 text-vessel-underway" />
                  <span className="text-xs text-muted-foreground">Underway</span>
                </div>
                <span className="text-lg font-semibold" data-testid="stat-underway-vessels">
                  {fleetStats?.underwayVessels || 0}
                </span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="card">
          <SidebarGroupLabel className="flex items-center justify-between text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <div className="flex items-center gap-1.5">
              <Filter className="h-3 w-3" />
              <span>Filters</span>
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 px-1.5 text-xs"
                onClick={clearFilters}
                data-testid="button-clear-filters"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by IMO or name..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 h-9"
                data-testid="input-search-vessels"
              />
            </div>

            <Collapsible open={statusOpen} onOpenChange={setStatusOpen}>
              <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium hover-elevate rounded-md px-2">
                <span>Status</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${statusOpen ? "rotate-180" : ""}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 px-2 pb-2">
                {statusOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 py-1.5 text-sm cursor-pointer"
                  >
                    <Checkbox
                      checked={filters.status?.includes(option.value) || false}
                      onCheckedChange={(checked) => handleStatusChange(option.value, checked as boolean)}
                      data-testid={`filter-status-${option.value}`}
                    />
                    <div className={`h-2.5 w-2.5 rounded-full ${option.color}`} />
                    <span className="text-sidebar-foreground">{option.label}</span>
                  </label>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={typeOpen} onOpenChange={setTypeOpen}>
              <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium hover-elevate rounded-md px-2">
                <span>Vessel Type</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${typeOpen ? "rotate-180" : ""}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 px-2 pb-2 max-h-48 overflow-y-auto">
                {typeOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 py-1.5 text-sm cursor-pointer"
                  >
                    <Checkbox
                      checked={filters.type?.includes(option.value) || false}
                      onCheckedChange={(checked) => handleTypeChange(option.value, checked as boolean)}
                      data-testid={`filter-type-${option.value}`}
                    />
                    <span className="text-sidebar-foreground">{option.label}</span>
                  </label>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="card">
          <SidebarGroupLabel className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <AlertTriangle className="h-3 w-3" />
            <span>Active Alerts</span>
            {(fleetStats?.criticalAlerts || 0) > 0 && (
              <Badge variant="destructive" className="text-xs ml-auto">
                {fleetStats?.criticalAlerts}
              </Badge>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="rounded-md bg-sidebar-accent/50 p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Alerts</span>
                <span className="font-medium" data-testid="stat-total-alerts">{fleetStats?.totalAlerts || 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Critical</span>
                <span className="font-medium text-destructive" data-testid="stat-critical-alerts">
                  {fleetStats?.criticalAlerts || 0}
                </span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild data-testid="nav-settings">
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </div>
  );
}
