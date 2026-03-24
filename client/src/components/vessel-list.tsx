import { Ship, Navigation, Anchor, MapPin, ArrowUpDown, MoreHorizontal, Eye, Bell, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { type Vessel, VesselStatus } from "../../../shared/schema";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface VesselListProps {
  vessels: Vessel[];
  onVesselSelect: (vessel: Vessel) => void;
  onTrackOnMap?: (vessel: Vessel) => void;
  selectedVesselId?: string;
  isLoading?: boolean;
}

type SortField = "name" | "status" | "type" | "speed" | "lastUpdate";
type SortDirection = "asc" | "desc";

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
      return "outline";
  }
};

export function VesselList({ vessels, onVesselSelect, onTrackOnMap, selectedVesselId, isLoading }: VesselListProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedVessels = [...vessels].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "status":
        comparison = a.status.localeCompare(b.status);
        break;
      case "type":
        comparison = a.type.localeCompare(b.type);
        break;
      case "speed":
        comparison = a.speed - b.speed;
        break;
      case "lastUpdate":
        comparison = new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime();
        break;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[200px]">Vessel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>MMSI</TableHead>
                <TableHead>Voyage ID</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Speed</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8 rounded" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent"
      onClick={() => handleSort(field)}
    >
      {label}
      <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
    </Button>
  );

  return (
    <div className="w-full" data-testid="vessel-list">
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[200px]">
                  <SortButton field="name" label="Vessel" />
                </TableHead>
                <TableHead>
                  <SortButton field="status" label="Status" />
                </TableHead>
                <TableHead>
                  <SortButton field="type" label="Type" />
                </TableHead>
                <TableHead>MMSI</TableHead>
                <TableHead>Voyage ID</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>
                  <SortButton field="speed" label="Speed" />
                </TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>
                  <SortButton field="lastUpdate" label="Last Update" />
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedVessels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Ship className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No vessels found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                sortedVessels.map((vessel) => (
                  <TableRow
                    key={vessel.id}
                    className={`cursor-pointer hover-elevate ${
                      selectedVesselId === vessel.id ? "bg-sidebar-accent" : ""
                    }`}
                    onClick={() => onVesselSelect(vessel)}
                    data-testid={`row-vessel-${vessel.id}`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(vessel.status)}`} />
                        <div>
                          <div className="font-medium">{vessel.name}</div>
                          <div className="text-xs font-mono text-muted-foreground">
                            IMO: {vessel.imo}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(vessel.status)} className="capitalize text-xs">
                        {vessel.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize text-sm">{vessel.type}</TableCell>
                    <TableCell>
                      <div className="text-xs font-mono" data-testid={`text-mmsi-${vessel.id}`}>
                        {vessel.mmsi}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-mono" data-testid={`text-voyage-${vessel.id}`}>
                        {vessel.voyageId}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm max-w-[120px] truncate" data-testid={`text-owner-${vessel.id}`}>
                        {vessel.owner?.company || "-"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-mono">
                        {vessel.latitude.toFixed(4)}°, {vessel.longitude.toFixed(4)}°
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Navigation className="h-3 w-3 text-muted-foreground" />
                        <span className="font-mono text-sm">{vessel.speed.toFixed(1)} kn</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[150px] truncate text-sm">
                        {vessel.destination || "-"}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(vessel.lastUpdate), { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => e.stopPropagation()}
                            data-testid={`button-vessel-menu-${vessel.id}`}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onVesselSelect(vessel)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onTrackOnMap?.(vessel)}>
                            <MapPin className="mr-2 h-4 w-4" />
                            Track on Map
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onTrackOnMap?.(vessel)}>
                            <History className="mr-2 h-4 w-4" />
                            View Route History
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4" />
                            Set Alert
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
}
