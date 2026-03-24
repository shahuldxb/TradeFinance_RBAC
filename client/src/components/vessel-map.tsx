import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, Tooltip, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { type Vessel, type RoutePoint, VesselStatus } from "../../../shared/schema";
import { Button } from "@/components/ui/button";
import { Layers, Minus, Plus, Locate, Maximize2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface VesselMapProps {
  vessels: Vessel[];
  selectedVessel: Vessel | null;
  onVesselSelect: (vessel: Vessel | null) => void;
  routeHistory?: RoutePoint[];
  isLoading?: boolean;
}

const getVesselColor = (status: string) => {
  switch (status) {
    case VesselStatus.ACTIVE:
      return "#22c55e";
    case VesselStatus.UNDERWAY:
      return "#10b981";
    case VesselStatus.ANCHORED:
      return "#f59e0b";
    case VesselStatus.IN_PORT:
      return "#3b82f6";
    case VesselStatus.MOORED:
      return "#8b5cf6";
    case VesselStatus.RESTRICTED:
      return "#ef4444";
    default:
      return "#6b7280";
  }
};

const createVesselIcon = (vessel: Vessel, isSelected: boolean) => {
  const color = getVesselColor(vessel.status);
  const size = isSelected ? 32 : 24;
  const rotation = vessel.heading || 0;
  
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(${rotation}deg)">
      <path d="M12 2L4 19h16L12 2z" fill="${color}" stroke="${isSelected ? '#fff' : color}" stroke-width="${isSelected ? 2 : 1}"/>
      <circle cx="12" cy="12" r="3" fill="white" opacity="0.8"/>
    </svg>
  `;
  
  return L.divIcon({
    html: svg,
    className: "vessel-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

function MapController({ selectedVessel, routeHistory }: { selectedVessel: Vessel | null; routeHistory?: RoutePoint[] }) {
  const map = useMap();
  const lastFitKey = useRef<string | null>(null);
  
  useEffect(() => {
    if (!selectedVessel) {
      lastFitKey.current = null;
      return;
    }
    
    const routeLength = routeHistory?.length || 0;
    const fitKey = `${selectedVessel.id}-${routeLength}`;
    
    if (lastFitKey.current === fitKey) {
      return;
    }
    
    lastFitKey.current = fitKey;
    
    if (routeHistory && routeHistory.length > 1) {
      const allPoints: [number, number][] = [
        [selectedVessel.latitude, selectedVessel.longitude],
        ...routeHistory.map(p => [p.latitude, p.longitude] as [number, number])
      ];
      const bounds = L.latLngBounds(allPoints);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
    } else {
      map.setView([selectedVessel.latitude, selectedVessel.longitude], map.getZoom(), {
        animate: true,
      });
    }
  }, [selectedVessel, routeHistory, map]);
  
  return null;
}

function MapControls() {
  const map = useMap();
  const [layers, setLayers] = useState({
    satellite: false,
    labels: true,
    routes: true,
  });

  const handleZoomIn = () => map.zoomIn();
  const handleZoomOut = () => map.zoomOut();
  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 10 });
  };
  const handleFitBounds = () => {
    map.setView([20, 0], 2);
  };

  return (
    <div className="absolute bottom-4 left-4 z-[1000] flex flex-col gap-2">
      <div className="flex flex-col gap-1 bg-card border border-card-border rounded-md overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomIn}
          className="rounded-none border-b border-card-border"
          data-testid="button-zoom-in"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomOut}
          className="rounded-none"
          data-testid="button-zoom-out"
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>
      
      <Button
        variant="secondary"
        size="icon"
        onClick={handleLocate}
        className="bg-card border border-card-border"
        data-testid="button-locate"
      >
        <Locate className="h-4 w-4" />
      </Button>
      
      <Button
        variant="secondary"
        size="icon"
        onClick={handleFitBounds}
        className="bg-card border border-card-border"
        data-testid="button-fit-bounds"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="bg-card border border-card-border"
            data-testid="button-layers"
          >
            <Layers className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="right">
          <DropdownMenuCheckboxItem
            checked={layers.satellite}
            onCheckedChange={(checked) => setLayers({ ...layers, satellite: checked })}
          >
            Satellite View
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={layers.labels}
            onCheckedChange={(checked) => setLayers({ ...layers, labels: checked })}
          >
            Labels
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={layers.routes}
            onCheckedChange={(checked) => setLayers({ ...layers, routes: checked })}
          >
            Route History
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function VesselMap({ vessels, selectedVessel, onVesselSelect, routeHistory, isLoading }: VesselMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  const routeCoordinates = routeHistory?.map((point) => [point.latitude, point.longitude] as [number, number]) || [];

  return (
    <div className="relative h-full w-full" data-testid="vessel-map-container">
      {isLoading && (
        <div className="absolute inset-0 z-[1001] flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <span className="text-sm text-muted-foreground">Loading vessels...</span>
          </div>
        </div>
      )}
      
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="h-full w-full"
        zoomControl={false}
        ref={mapRef}
        style={{ background: "hsl(var(--background))" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <MapController selectedVessel={selectedVessel} routeHistory={routeHistory} />
        <MapControls />
        
        {selectedVessel && routeCoordinates.length > 1 && (
          <>
            <Polyline
              positions={routeCoordinates}
              color={getVesselColor(selectedVessel.status)}
              weight={3}
              opacity={0.7}
              dashArray="5, 10"
            />
            {routeHistory?.map((point, index) => (
              <CircleMarker
                key={point.id}
                center={[point.latitude, point.longitude]}
                radius={6}
                fillColor={getVesselColor(selectedVessel.status)}
                fillOpacity={0.8}
                stroke={true}
                color="#fff"
                weight={2}
              >
                <Tooltip permanent={false} direction="top" offset={[0, -10]}>
                  <div className="text-xs">
                    <div className="font-semibold">Leg {routeHistory.length - index}</div>
                    <div>{format(new Date(point.timestamp), "MMM d, HH:mm")}</div>
                    <div>Speed: {point.speed.toFixed(1)} kn</div>
                    <div>Heading: {point.heading}°</div>
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </>
        )}
        
        {vessels.map((vessel) => (
          <Marker
            key={vessel.id}
            position={[vessel.latitude, vessel.longitude]}
            icon={createVesselIcon(vessel, selectedVessel?.id === vessel.id)}
            eventHandlers={{
              click: () => onVesselSelect(vessel),
            }}
          >
            <Popup>
              <div className="min-w-[180px] p-1">
                <div className="font-semibold text-foreground">{vessel.name}</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">
                  IMO: {vessel.imo}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: getVesselColor(vessel.status) }}
                  />
                  <span className="text-xs capitalize">{vessel.status.replace("_", " ")}</span>
                </div>
                <div className="text-xs mt-1">
                  <span className="text-muted-foreground">Speed:</span>{" "}
                  <span className="font-mono">{vessel.speed.toFixed(1)} kn</span>
                </div>
                <div className="text-xs">
                  <span className="text-muted-foreground">Heading:</span>{" "}
                  <span className="font-mono">{vessel.heading}°</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <div className="absolute bottom-4 right-4 z-[1000] flex items-center gap-2 bg-card/90 backdrop-blur-sm border border-card-border rounded-md px-3 py-2">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-vessel-active" />
            <span>Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-vessel-underway" />
            <span>Underway</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-vessel-anchored" />
            <span>Anchored</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-vessel-inPort" />
            <span>In Port</span>
          </div>
        </div>
      </div>
    </div>
  );
}
