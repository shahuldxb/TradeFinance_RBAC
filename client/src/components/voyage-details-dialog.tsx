import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Ship, MapPin, Calendar, Clock, Package, Anchor, ArrowRight, Route, Navigation, Activity } from "lucide-react";
import { type Vessel, type RoutePoint } from "../../../shared/schema";
import { format, addDays } from "date-fns";

interface VoyageDetailsDialogProps {
  vessel: Vessel | null;
  routeHistory?: RoutePoint[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatCoordinate = (value: number, type: "lat" | "lon") => {
  const direction = type === "lat" 
    ? value >= 0 ? "N" : "S"
    : value >= 0 ? "E" : "W";
  const absValue = Math.abs(value);
  const degrees = Math.floor(absValue);
  const minutes = ((absValue - degrees) * 60).toFixed(2);
  return `${degrees}°${minutes}'${direction}`;
};

const generateVoyageDetails = (vessel: Vessel) => {
  const voyageId = vessel.voyageId;
  const prefix = voyageId.substring(0, 4);
  
  const carrierMap: Record<string, string> = {
    "MAEU": "Maersk Line",
    "MSCU": "MSC",
    "CMDU": "CMA CGM",
    "COSU": "COSCO",
    "EGLV": "Evergreen",
    "HLCU": "Hapag-Lloyd",
    "ONEY": "ONE",
    "TRNK": "Teekay Tankers",
    "MELL": "Mell Maritime",
    "CHNP": "China Pacific",
    "NYKL": "NYK Line",
    "MOSK": "Mitsui O.S.K.",
    "PCLF": "Pacific Lines",
    "MEDT": "Mediterranean Shipping",
    "ARAL": "Arab Logistics",
    "STLT": "Stolt Tankers",
    "YANG": "Yang Ming",
    "HULL": "Hull Transport",
    "NORL": "Nordic Lines",
    "PANA": "Panama Maritime",
  };

  const originPorts: Record<string, string> = {
    "MAEU": "Copenhagen, Denmark",
    "MSCU": "Geneva, Switzerland",
    "CMDU": "Marseille, France",
    "COSU": "Shanghai, China",
    "EGLV": "Taipei, Taiwan",
    "HLCU": "Hamburg, Germany",
    "ONEY": "Tokyo, Japan",
    "TRNK": "Vancouver, Canada",
    "MELL": "Melbourne, Australia",
    "CHNP": "Hong Kong, China",
    "NYKL": "Tokyo, Japan",
    "MOSK": "Osaka, Japan",
    "PCLF": "Los Angeles, USA",
    "MEDT": "Genoa, Italy",
    "ARAL": "Dubai, UAE",
    "STLT": "Rotterdam, Netherlands",
    "YANG": "Kaohsiung, Taiwan",
    "HULL": "London, UK",
    "NORL": "Oslo, Norway",
    "PANA": "Panama City, Panama",
  };

  const cargoTypes: Record<string, { type: string; quantity: string; unit: string }> = {
    "container": { type: "TEU Containers", quantity: "4,500", unit: "TEU" },
    "tanker": { type: "Crude Oil", quantity: "280,000", unit: "MT" },
    "bulk_carrier": { type: "Iron Ore", quantity: "180,000", unit: "MT" },
    "cargo": { type: "General Cargo", quantity: "45,000", unit: "MT" },
    "lng_carrier": { type: "LNG", quantity: "175,000", unit: "m3" },
    "roro": { type: "Vehicles", quantity: "6,500", unit: "units" },
    "passenger": { type: "Passengers", quantity: "3,200", unit: "PAX" },
  };

  const carrier = carrierMap[prefix] || vessel.owner.company;
  const originPort = originPorts[prefix] || vessel.owner.headquartersPort;
  const cargo = cargoTypes[vessel.type] || cargoTypes["cargo"];
  
  const departureDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
  const etaDate = vessel.eta ? new Date(vessel.eta) : addDays(new Date(), Math.floor(Math.random() * 14) + 3);
  const totalDays = Math.ceil((etaDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.ceil((Date.now() - departureDate.getTime()) / (1000 * 60 * 60 * 24));
  const progress = Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100));

  return {
    voyageId,
    carrier,
    originPort,
    destinationPort: vessel.destination || "Not specified",
    departureDate,
    eta: etaDate,
    totalDays,
    daysElapsed,
    progress,
    cargo,
    status: vessel.status === "underway" ? "In Transit" : vessel.status === "in_port" ? "At Berth" : "Active",
  };
};

export function VoyageDetailsDialog({ vessel, routeHistory, open, onOpenChange }: VoyageDetailsDialogProps) {
  if (!vessel) return null;

  const voyage = generateVoyageDetails(vessel);
  const waypoints = routeHistory?.slice().reverse() || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Route className="h-5 w-5" />
            Voyage Details
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Voyage ID</div>
                <div className="text-lg font-mono font-semibold" data-testid="text-voyage-id">{voyage.voyageId}</div>
              </div>
              <Badge variant="secondary">{voyage.status}</Badge>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Ship className="h-3 w-3" />
                  Carrier
                </div>
                <div className="text-sm font-medium">{voyage.carrier}</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Anchor className="h-3 w-3" />
                  Vessel
                </div>
                <div className="text-sm font-medium">{vessel.name}</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="text-sm font-medium">Route</div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <MapPin className="h-3 w-3" />
                    Origin
                  </div>
                  <div className="text-sm font-medium">{voyage.originPort}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground mb-1">
                    <MapPin className="h-3 w-3" />
                    Destination
                  </div>
                  <div className="text-sm font-medium">{voyage.destinationPort}</div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-md p-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Progress: Day {voyage.daysElapsed} of {voyage.totalDays}</span>
                  <span>{voyage.progress.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${voyage.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-md p-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <Calendar className="h-3 w-3" />
                  Departure (ETD)
                </div>
                <div className="text-sm font-mono">{format(voyage.departureDate, "MMM d, yyyy")}</div>
                <div className="text-xs text-muted-foreground">{format(voyage.departureDate, "HH:mm")} UTC</div>
              </div>
              <div className="bg-muted/50 rounded-md p-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <Clock className="h-3 w-3" />
                  Arrival (ETA)
                </div>
                <div className="text-sm font-mono">{format(voyage.eta, "MMM d, yyyy")}</div>
                <div className="text-xs text-muted-foreground">{format(voyage.eta, "HH:mm")} UTC</div>
              </div>
            </div>

            <Separator />

            <div className="bg-muted/50 rounded-md p-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <Package className="h-3 w-3" />
                Cargo Information
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{voyage.cargo.type}</div>
                <div className="text-sm font-mono">{voyage.cargo.quantity} {voyage.cargo.unit}</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Route Waypoints</div>
                <Badge variant="outline" className="text-xs">{waypoints.length} points</Badge>
              </div>
              
              {waypoints.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No route waypoints recorded yet
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {waypoints.map((point, index) => (
                    <div 
                      key={point.id} 
                      className="bg-muted/50 rounded-md p-3 relative"
                      data-testid={`waypoint-${index}`}
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/30 rounded-l-md" />
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-xs px-1.5 py-0">
                              #{waypoints.length - index}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(point.timestamp), "MMM d, HH:mm")}
                            </span>
                          </div>
                          <div className="font-mono text-xs">
                            {formatCoordinate(point.latitude, "lat")}, {formatCoordinate(point.longitude, "lon")}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="flex items-center gap-1 text-xs">
                            <Activity className="h-3 w-3 text-muted-foreground" />
                            <span className="font-mono">{point.speed.toFixed(1)} kn</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Navigation className="h-3 w-3 text-muted-foreground" />
                            <span className="font-mono">{point.heading}°</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
