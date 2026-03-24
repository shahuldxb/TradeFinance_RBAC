import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { VesselList } from "@/components/vessel-list";
import { VesselDataPanel } from "@/components/vessel-data-panel";
import { type Vessel, type RoutePoint, type VesselAlert, type VesselFilter } from "../../../../shared/schema";

interface FleetPageProps {
  filters: VesselFilter;
  searchQuery: string;
  onTrackOnMap?: (vessel: Vessel) => void;
}

export function FleetPage({ filters, searchQuery, onTrackOnMap }: FleetPageProps) {
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

  const handleVesselSelect = (vessel: Vessel) => {
    setSelectedVessel(vessel);
  };

  const handleClosePanel = () => {
    setSelectedVessel(null);
  };

  return (
    <div className="card relative h-full" data-testid="fleet-page">
      <div className="flex h-full">
        <div className={`flex-1 p-6 ${selectedVessel ? "pr-[26rem]" : ""}`}>
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Fleet List</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {vessels.length} vessels in your fleet
            </p>
          </div>
          <VesselList
            vessels={vessels}
            onVesselSelect={handleVesselSelect}
            onTrackOnMap={onTrackOnMap}
            selectedVesselId={selectedVessel?.id}
            isLoading={vesselsLoading}
          />
        </div>
        
        {selectedVessel && (
          <div className="fixed top-14 right-0 h-[calc(100vh-3.5rem)] w-96 border-l border-border bg-background z-40 overflow-auto">
            <div className="relative h-full">
              <VesselDataPanel
                vessel={selectedVessel}
                routeHistory={routeHistory}
                alerts={alerts}
                onClose={handleClosePanel}
                onTrackOnMap={() => onTrackOnMap?.(selectedVessel)}
                embedded
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
