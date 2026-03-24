import { AlertTriangle, Info, Bell, X, Check, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type VesselAlert } from "../../../shared/schema";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface AlertsStreamProps {
  alerts?: VesselAlert[];
  onAcknowledge?: (alertId: string) => void;
  onResolve?: (alertId: string) => void;
  isLoading?: boolean;
  compact?: boolean;
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "critical":
      return <AlertTriangle className="h-4 w-4 text-alert-critical" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-alert-warning" />;
    default:
      return <Info className="h-4 w-4 text-alert-info" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "border-l-alert-critical bg-alert-critical/10";
    case "warning":
      return "border-l-alert-warning bg-alert-warning/10";
    default:
      return "border-l-alert-info bg-alert-info/10";
  }
};

export function AlertsStream({ alerts, onAcknowledge, onResolve, isLoading, compact }: AlertsStreamProps) {
  if (isLoading) {
    return (
      <Card className={compact ? "" : "h-full"}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-12" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-3 rounded-md border-l-4 border-l-muted bg-muted/50">
                <Skeleton className="h-4 w-48 mb-2" />
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const activeAlerts = alerts?.filter((a) => !a.resolved) || [];
  const criticalCount = activeAlerts.filter((a) => a.severity === "critical").length;

  return (
    <Card className={compact ? "" : "h-full"} data-testid="alerts-stream">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4" />
            <span>Alerts</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            {criticalCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {criticalCount} Critical
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              {activeAlerts.length} Active
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className={compact ? "h-64" : "h-[calc(100vh-16rem)]"}>
          {activeAlerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Check className="h-6 w-6 text-vessel-active" />
              </div>
              <p className="text-sm font-medium text-foreground">All Clear</p>
              <p className="text-xs text-muted-foreground mt-1">No active alerts at this time</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-md border-l-4 transition-colors ${getSeverityColor(alert.severity)}`}
                  data-testid={`alert-item-${alert.id}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      {getSeverityIcon(alert.severity)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium capitalize">
                            {alert.type.replace(/_/g, " ")}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {alert.vesselName}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {alert.message}
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {!alert.acknowledged && onAcknowledge && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onAcknowledge(alert.id)}
                          title="Acknowledge"
                          data-testid={`button-acknowledge-${alert.id}`}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      {onResolve && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onResolve(alert.id)}
                          title="Resolve"
                          data-testid={`button-resolve-${alert.id}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {alert.acknowledged && !alert.resolved && (
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Acknowledged
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
