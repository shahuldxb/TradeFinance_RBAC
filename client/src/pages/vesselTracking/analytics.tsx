import { useQuery } from "@tanstack/react-query";
import { FleetStatsCards } from "@/components/fleet-stats-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type FleetStats, type Vessel, VesselStatus, VesselType } from "../../../../shared/schema";
import { Ship, Anchor, Navigation, TrendingUp, BarChart3, PieChart } from "lucide-react";

export function AnalyticsPage() {
  const { data: stats, isLoading: statsLoading } = useQuery<FleetStats>({
    queryKey: ["/api/stats/fleet"],
  });

  const { data: vessels = [] } = useQuery<Vessel[]>({
    queryKey: ["/api/vessels"],
  });

  const statusDistribution = Object.values(VesselStatus).map((status) => ({
    status,
    count: vessels.filter((v) => v.status === status).length,
  })).filter((d) => d.count > 0);

  const typeDistribution = Object.values(VesselType).map((type) => ({
    type,
    count: vessels.filter((v) => v.type === type).length,
  })).filter((d) => d.count > 0);

  const speedRanges = [
    { label: "Stationary (0 kn)", min: 0, max: 0.5 },
    { label: "Slow (0.5-5 kn)", min: 0.5, max: 5 },
    { label: "Medium (5-15 kn)", min: 5, max: 15 },
    { label: "Fast (15+ kn)", min: 15, max: 100 },
  ].map((range) => ({
    ...range,
    count: vessels.filter((v) => v.speed >= range.min && v.speed < range.max).length,
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case VesselStatus.ACTIVE: return "bg-vessel-active";
      case VesselStatus.UNDERWAY: return "bg-vessel-underway";
      case VesselStatus.ANCHORED: return "bg-vessel-anchored";
      case VesselStatus.IN_PORT: return "bg-vessel-inPort";
      case VesselStatus.MOORED: return "bg-vessel-moored";
      case VesselStatus.RESTRICTED: return "bg-vessel-restricted";
      default: return "bg-muted";
    }
  };

  return (
    <div className="h-full" data-testid="analytics-page">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Fleet Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Performance metrics and insights for your fleet
          </p>
        </div>

        <FleetStatsCards stats={stats} isLoading={statsLoading} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card data-testid="card-status-distribution">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <PieChart className="h-4 w-4" />
                Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {statusDistribution.map((item) => (
                  <div key={item.status} className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${getStatusColor(item.status)}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm capitalize">{item.status.replace("_", " ")}</span>
                        <span className="text-sm font-medium">{item.count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getStatusColor(item.status)}`}
                          style={{ width: `${(item.count / vessels.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-type-distribution">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4" />
                Vessel Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {typeDistribution.map((item) => (
                  <div key={item.type} className="flex items-center gap-3">
                    <Ship className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm capitalize">{item.type}</span>
                        <span className="text-sm font-medium">{item.count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${(item.count / vessels.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-speed-distribution">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4" />
                Speed Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {speedRanges.map((range) => (
                  <div key={range.label} className="flex items-center gap-3">
                    <Navigation className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{range.label}</span>
                        <span className="text-sm font-medium">{range.count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-chart-2"
                          style={{ width: `${vessels.length > 0 ? (range.count / vessels.length) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-fleet-metrics">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4" />
                Fleet Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Average Speed</span>
                  <span className="text-sm font-mono font-medium">
                    {stats?.averageSpeed?.toFixed(1) || 0} kn
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Fastest Vessel</span>
                  <span className="text-sm font-mono font-medium">
                    {vessels.length > 0 ? Math.max(...vessels.map((v) => v.speed)).toFixed(1) : 0} kn
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Total Fleet Size</span>
                  <span className="text-sm font-medium">{stats?.totalVessels || 0} vessels</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Active Alerts</span>
                  <span className="text-sm font-medium text-alert-warning">
                    {stats?.totalAlerts || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
