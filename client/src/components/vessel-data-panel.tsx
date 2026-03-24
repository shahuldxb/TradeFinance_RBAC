import { X, Navigation, Anchor, Clock, MapPin, Ship, Ruler, Weight, ArrowRight, ChevronDown, AlertTriangle, Activity, Building2, User, Mail, Phone, Flag, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { type Vessel, type RoutePoint, type VesselAlert, VesselStatus } from "../../../shared/schema";
import { format, formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { VoyageDetailsDialog } from "./voyage-details-dialog";

interface VesselDataPanelProps {
  vessel: Vessel;
  routeHistory?: RoutePoint[];
  alerts?: VesselAlert[];
  onClose: () => void;
  onTrackOnMap?: () => void;
  isLoading?: boolean;
  embedded?: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case VesselStatus.ACTIVE:
      return "bg-vessel-active";
    case VesselStatus.UNDERWAY:
      return "bg-vessel-underway";
    case VesselStatus.ANCHORED:
      return "bg-vessel-anchored";
    case VesselStatus.IN_PORT:
      return "bg-vessel-inPort";
    case VesselStatus.MOORED:
      return "bg-vessel-moored";
    case VesselStatus.RESTRICTED:
      return "bg-vessel-restricted";
    default:
      return "bg-muted";
  }
};

const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case VesselStatus.RESTRICTED:
      return "destructive";
    case VesselStatus.ACTIVE:
    case VesselStatus.UNDERWAY:
      return "default";
    default:
      return "secondary";
  }
};

const formatCoordinate = (value: number, type: "lat" | "lon") => {
  const direction = type === "lat" 
    ? value >= 0 ? "N" : "S"
    : value >= 0 ? "E" : "W";
  const absValue = Math.abs(value);
  const degrees = Math.floor(absValue);
  const minutes = ((absValue - degrees) * 60).toFixed(3);
  return `${degrees}° ${minutes}' ${direction}`;
};

export function VesselDataPanel({ vessel, routeHistory, alerts, onClose, onTrackOnMap, isLoading, embedded }: VesselDataPanelProps) {
  const [positionOpen, setPositionOpen] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [voyageOwnerOpen, setVoyageOwnerOpen] = useState(true);
  const [routeOpen, setRouteOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [voyageDialogOpen, setVoyageDialogOpen] = useState(false);

  const vesselAlerts = alerts?.filter((a) => a.vesselId === vessel.id) || [];

  const panelClass = embedded
    ? "h-full bg-card border-card-border overflow-hidden"
    : "absolute top-4 right-4 z-[1000] w-96 max-h-[calc(100vh-8rem)] bg-card/95 backdrop-blur-md border border-card-border rounded-lg shadow-lg overflow-hidden";

  return (
    <div 
      className={panelClass}
      data-testid="vessel-data-panel"
    >
      <div className="flex items-center justify-between p-4 border-b border-card-border bg-card">
        <div className="flex items-center gap-3">
          <div className={`h-3 w-3 rounded-full ${getStatusColor(vessel.status)}`} />
          <div>
            <h2 className="font-semibold text-foreground" data-testid="text-vessel-name">
              {vessel.name}
            </h2>
            <p className="text-xs font-mono text-muted-foreground" data-testid="text-vessel-imo">
              IMO: {vessel.imo}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(vessel.status)} className="capitalize text-xs">
            {vessel.status.replace("_", " ")}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-panel"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {embedded && onTrackOnMap && (
        <div className="px-4 py-3 border-b border-card-border">
          <Button
            onClick={onTrackOnMap}
            className="btn btn-outline btn-primary w-full"
            data-testid="button-track-on-map"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Track on Map
          </Button>
        </div>
      )}

      <ScrollArea className={embedded ? "h-[calc(100%-4rem)]" : "max-h-[calc(100vh-14rem)]"}>
        <div className="p-4 space-y-4">
          <Collapsible open={positionOpen} onOpenChange={setPositionOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Current Position</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${positionOpen ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="text-xs text-muted-foreground mb-1">Latitude</div>
                  <div className="font-mono text-sm" data-testid="text-vessel-lat">
                    {formatCoordinate(vessel.latitude, "lat")}
                  </div>
                </div>
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="text-xs text-muted-foreground mb-1">Longitude</div>
                  <div className="font-mono text-sm" data-testid="text-vessel-lon">
                    {formatCoordinate(vessel.longitude, "lon")}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Activity className="h-3 w-3" />
                    Speed
                  </div>
                  <div className="font-mono text-sm" data-testid="text-vessel-speed">
                    {vessel.speed.toFixed(1)} kn
                  </div>
                </div>
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Navigation className="h-3 w-3" />
                    Heading
                  </div>
                  <div className="font-mono text-sm" data-testid="text-vessel-heading">
                    {vessel.heading}°
                  </div>
                </div>
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <ArrowRight className="h-3 w-3" />
                    Course
                  </div>
                  <div className="font-mono text-sm" data-testid="text-vessel-course">
                    {vessel.course}°
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Destination</div>
                    <div className="text-sm font-medium" data-testid="text-vessel-destination">
                      {vessel.destination || "Not specified"}
                    </div>
                  </div>
                  {vessel.eta && (
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground mb-1">ETA</div>
                      <div className="text-sm font-mono" data-testid="text-vessel-eta">
                        {format(new Date(vessel.eta), "MMM d, HH:mm")}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Last update: {formatDistanceToNow(new Date(vessel.lastUpdate), { addSuffix: true })}</span>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Ship className="h-4 w-4 text-muted-foreground" />
                <span>Vessel Details</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${detailsOpen ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="text-xs text-muted-foreground mb-1">IMO Number</div>
                  <div className="text-sm font-mono" data-testid="text-vessel-imo-detail">{vessel.imo}</div>
                </div>
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="text-xs text-muted-foreground mb-1">Voyage ID</div>
                  <button
                    onClick={() => setVoyageDialogOpen(true)}
                    className="text-sm font-mono text-primary hover:underline flex items-center gap-1"
                    data-testid="button-voyage-details"
                  >
                    {vessel.voyageId}
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="text-xs text-muted-foreground mb-1">Type</div>
                  <div className="text-sm capitalize">{vessel.type}</div>
                </div>
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Flag className="h-3 w-3" />
                    Registered Country
                  </div>
                  <div className="text-sm uppercase" data-testid="text-vessel-flag">{vessel.flag}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="text-xs text-muted-foreground mb-1">MMSI</div>
                  <div className="text-sm font-mono">{vessel.mmsi}</div>
                </div>
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="text-xs text-muted-foreground mb-1">Call Sign</div>
                  <div className="text-sm font-mono">{vessel.callSign}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Ruler className="h-3 w-3" />
                    Length
                  </div>
                  <div className="text-sm font-mono">{vessel.length}m</div>
                </div>
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Ruler className="h-3 w-3" />
                    Width
                  </div>
                  <div className="text-sm font-mono">{vessel.width}m</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Anchor className="h-3 w-3" />
                    Draft
                  </div>
                  <div className="text-sm font-mono">{vessel.draft}m</div>
                </div>
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Weight className="h-3 w-3" />
                    DWT
                  </div>
                  <div className="text-sm font-mono">{vessel.deadweight.toLocaleString()}t</div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {vessel.owner && (
            <>
              <Separator />
              <Collapsible open={voyageOwnerOpen} onOpenChange={setVoyageOwnerOpen}>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>Owner Details</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${voyageOwnerOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 pt-2">
                  <div className="bg-muted/50 rounded-md p-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Building2 className="h-3 w-3" />
                      Company
                    </div>
                    <div className="text-sm font-medium" data-testid="text-owner-company">{vessel.owner.company}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/50 rounded-md p-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <User className="h-3 w-3" />
                        Contact
                      </div>
                      <div className="text-sm" data-testid="text-owner-contact">{vessel.owner.contactName}</div>
                    </div>
                    <div className="bg-muted/50 rounded-md p-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <Phone className="h-3 w-3" />
                        Phone
                      </div>
                      <div className="text-sm font-mono" data-testid="text-owner-phone">{vessel.owner.phone}</div>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-md p-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Mail className="h-3 w-3" />
                      Email
                    </div>
                    <div className="text-sm font-mono" data-testid="text-owner-email">{vessel.owner.contactEmail}</div>
                  </div>

                  <div className="bg-muted/50 rounded-md p-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Anchor className="h-3 w-3" />
                      Headquarters Port
                    </div>
                    <div className="text-sm" data-testid="text-owner-hq">{vessel.owner.headquartersPort}</div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </>
          )}

          {routeHistory && routeHistory.length > 0 && (
            <>
              <Separator />
              <Collapsible open={routeOpen} onOpenChange={setRouteOpen}>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-muted-foreground" />
                    <span>Route History</span>
                    <Badge variant="secondary">{routeHistory.length}</Badge>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${routeOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {routeHistory.slice(0, 10).map((point, index) => (
                      <div
                        key={point.id}
                        className="flex items-center gap-3 text-xs p-2 bg-muted/50 rounded-md"
                      >
                        <div className="flex flex-col items-center">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          {index < routeHistory.length - 1 && (
                            <div className="h-4 w-px bg-border" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-mono">
                            {formatCoordinate(point.latitude, "lat")}, {formatCoordinate(point.longitude, "lon")}
                          </div>
                          <div className="text-muted-foreground">
                            {point.speed.toFixed(1)} kn @ {point.heading}° • {format(new Date(point.timestamp), "HH:mm:ss")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </>
          )}

          {vesselAlerts.length > 0 && (
            <>
              <Separator />
              <Collapsible open={alertsOpen} onOpenChange={setAlertsOpen}>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <span>Alerts</span>
                    <Badge variant="destructive">{vesselAlerts.length}</Badge>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${alertsOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="space-y-2">
                    {vesselAlerts.slice(0, 5).map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-3 rounded-md border-l-4 ${
                          alert.severity === "critical"
                            ? "bg-destructive/10 border-l-destructive"
                            : alert.severity === "warning"
                            ? "bg-yellow-500/10 border-l-yellow-500"
                            : "bg-blue-500/10 border-l-blue-500"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">
                            {alert.type.replace("_", " ")}
                          </span>
                          <Badge
                            variant={alert.severity === "critical" ? "destructive" : "secondary"}
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </>
          )}
        </div>
      </ScrollArea>

      <VoyageDetailsDialog
        vessel={vessel}
        routeHistory={routeHistory}
        open={voyageDialogOpen}
        onOpenChange={setVoyageDialogOpen}
      />
    </div>
  );
}
