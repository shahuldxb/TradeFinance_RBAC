import { useQuery, useMutation } from "@tanstack/react-query";
import { AlertsStream } from "@/components/alerts-stream";
import { type VesselAlert } from "../../../../shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function AlertsPage() {
  const { toast } = useToast();

  const { data: alerts = [], isLoading } = useQuery<VesselAlert[]>({
    queryKey: ["/api/alerts"],
  });

  const acknowledgeMutation = useMutation({
    mutationFn: async (alertId: string) => {
      return apiRequest("PATCH", `/api/alerts/${alertId}/acknowledge`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats/fleet"] });
      toast({
        title: "Alert acknowledged",
        description: "The alert has been marked as acknowledged.",
      });
    },
  });

  const resolveMutation = useMutation({
    mutationFn: async (alertId: string) => {
      return apiRequest("PATCH", `/api/alerts/${alertId}/resolve`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats/fleet"] });
      toast({
        title: "Alert resolved",
        description: "The alert has been resolved and removed from active alerts.",
      });
    },
  });

  const handleAcknowledge = (alertId: string) => {
    acknowledgeMutation.mutate(alertId);
  };

  const handleResolve = (alertId: string) => {
    resolveMutation.mutate(alertId);
  };

  return (
    <div className="h-full" data-testid="alerts-page">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Alerts Center</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor and manage fleet notifications
          </p>
        </div>

        <div className="">
          <AlertsStream
            alerts={alerts}
            onAcknowledge={handleAcknowledge}
            onResolve={handleResolve}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
