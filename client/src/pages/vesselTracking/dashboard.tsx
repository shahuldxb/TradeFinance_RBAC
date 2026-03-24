import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { VesselMap } from "@/components/vessel-map";
import { VesselDataPanel } from "@/components/vessel-data-panel";
import { type Vessel, type RoutePoint, type VesselAlert, type VesselFilter } from "../../../../shared/schema";

interface DashboardProps {
  filters: VesselFilter;
  searchQuery: string;
  initialVessel?: Vessel | null;
  onInitialVesselConsumed?: () => void;
}

export function Dashboard({ filters, searchQuery, initialVessel, onInitialVesselConsumed }: DashboardProps) {
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);

  const combinedFilters = {
    ...filters,
    search: searchQuery || undefined,
  };

  const { data: vessels = [], isLoading: vesselsLoading } = useQuery<Vessel[]>({
    queryKey: ["/api/vessels", combinedFilters],
  });

  const { data: routeHistory = [] } = useQuery<RoutePoint[]>({
    queryKey: ["/api/vessels", selectedVessel?.id, "route"],
    enabled: !!selectedVessel,
  });

  const { data: alerts = [] } = useQuery<VesselAlert[]>({
    queryKey: ["/api/alerts"],
  });

  useEffect(() => {
    if (initialVessel) {
      setSelectedVessel(initialVessel);
      onInitialVesselConsumed?.();
    }
  }, [initialVessel, onInitialVesselConsumed]);

  const handleVesselSelect = (vessel: Vessel | null) => {
    setSelectedVessel(vessel);
  };

  const handleClosePanel = () => {
    setSelectedVessel(null);
  };

  return (
    <div className="relative h-full w-full" data-testid="dashboard-page">
      <VesselMap
        vessels={vessels}
        selectedVessel={selectedVessel}
        onVesselSelect={handleVesselSelect}
        routeHistory={selectedVessel ? routeHistory : undefined}
        isLoading={vesselsLoading}
      />
      
      {selectedVessel && (
        <VesselDataPanel
          vessel={selectedVessel}
          routeHistory={routeHistory}
          alerts={alerts}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
}
