import { Ship, Anchor, Navigation, AlertTriangle, Activity, TrendingUp, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type FleetStats } from "../../../shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface FleetStatsCardsProps {
  stats?: FleetStats;
  isLoading?: boolean;
}

export function FleetStatsCards({ stats, isLoading }: FleetStatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Vessels",
      value: stats?.totalVessels || 0,
      description: "Vessels in fleet",
      icon: Ship,
      color: "text-primary",
      testId: "card-total-vessels",
    },
    {
      title: "Active",
      value: stats?.activeVessels || 0,
      description: "Currently active vessels",
      icon: Activity,
      color: "text-vessel-active",
      testId: "card-active-vessels",
    },
    {
      title: "Underway",
      value: stats?.underwayVessels || 0,
      description: "Vessels in transit",
      icon: Navigation,
      color: "text-vessel-underway",
      testId: "card-underway-vessels",
    },
    {
      title: "Anchored",
      value: stats?.anchoredVessels || 0,
      description: "Vessels at anchor",
      icon: Anchor,
      color: "text-vessel-anchored",
      testId: "card-anchored-vessels",
    },
    {
      title: "In Port",
      value: stats?.inPortVessels || 0,
      description: "Vessels docked",
      icon: MapPin,
      color: "text-vessel-inPort",
      testId: "card-inport-vessels",
    },
    {
      title: "Average Speed",
      value: `${stats?.averageSpeed?.toFixed(1) || 0} kn`,
      description: "Fleet average",
      icon: TrendingUp,
      color: "text-primary",
      testId: "card-avg-speed",
    },
    {
      title: "Total Alerts",
      value: stats?.totalAlerts || 0,
      description: "Active notifications",
      icon: AlertTriangle,
      color: "text-alert-warning",
      testId: "card-total-alerts",
    },
    {
      title: "Critical Alerts",
      value: stats?.criticalAlerts || 0,
      description: "Require attention",
      icon: AlertTriangle,
      color: "text-alert-critical",
      testId: "card-critical-alerts",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {statCards.map((stat) => (
        <Card key={stat.title} data-testid={stat.testId}>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
