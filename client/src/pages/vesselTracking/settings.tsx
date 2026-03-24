import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Save, RotateCcw, MapPin, Bell, Gauge, Clock } from "lucide-react";

export function SettingsPage() {
  const { toast } = useToast();
  const [mapRefreshRate, setMapRefreshRate] = useState("30");
  const [showInactiveVessels, setShowInactiveVessels] = useState(true);
  const [enableAlertNotifications, setEnableAlertNotifications] = useState(true);
  const [criticalAlertsOnly, setCriticalAlertsOnly] = useState(false);
  const [defaultMapZoom, setDefaultMapZoom] = useState("5");
  const [speedUnit, setSpeedUnit] = useState("knots");
  const [distanceUnit, setDistanceUnit] = useState("nm");

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleReset = () => {
    setMapRefreshRate("30");
    setShowInactiveVessels(true);
    setEnableAlertNotifications(true);
    setCriticalAlertsOnly(false);
    setDefaultMapZoom("5");
    setSpeedUnit("knots");
    setDistanceUnit("nm");
    toast({
      title: "Settings reset",
      description: "All settings have been restored to defaults.",
    });
  };

  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-settings-title">Settings</h1>
          <p className="text-muted-foreground">Configure your VesselTrack preferences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Map Settings
            </CardTitle>
            <CardDescription>Configure map display and behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label htmlFor="refresh-rate">Refresh Rate</Label>
                <p className="text-sm text-muted-foreground">How often to update vessel positions</p>
              </div>
              <Select value={mapRefreshRate} onValueChange={setMapRefreshRate}>
                <SelectTrigger className="w-32" data-testid="select-refresh-rate">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label htmlFor="default-zoom">Default Zoom Level</Label>
                <p className="text-sm text-muted-foreground">Initial map zoom when loading</p>
              </div>
              <Select value={defaultMapZoom} onValueChange={setDefaultMapZoom}>
                <SelectTrigger className="w-32" data-testid="select-default-zoom">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">World</SelectItem>
                  <SelectItem value="5">Region</SelectItem>
                  <SelectItem value="8">Port</SelectItem>
                  <SelectItem value="12">Harbor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label htmlFor="show-inactive">Show Inactive Vessels</Label>
                <p className="text-sm text-muted-foreground">Display vessels with inactive status</p>
              </div>
              <Switch
                id="show-inactive"
                checked={showInactiveVessels}
                onCheckedChange={setShowInactiveVessels}
                data-testid="switch-show-inactive"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure alert notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label htmlFor="enable-alerts">Enable Alert Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications for vessel alerts</p>
              </div>
              <Switch
                id="enable-alerts"
                checked={enableAlertNotifications}
                onCheckedChange={setEnableAlertNotifications}
                data-testid="switch-enable-alerts"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label htmlFor="critical-only">Critical Alerts Only</Label>
                <p className="text-sm text-muted-foreground">Only notify for critical severity alerts</p>
              </div>
              <Switch
                id="critical-only"
                checked={criticalAlertsOnly}
                onCheckedChange={setCriticalAlertsOnly}
                disabled={!enableAlertNotifications}
                data-testid="switch-critical-only"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Units
            </CardTitle>
            <CardDescription>Set preferred measurement units</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label>Speed Unit</Label>
                <p className="text-sm text-muted-foreground">Unit for vessel speed display</p>
              </div>
              <Select value={speedUnit} onValueChange={setSpeedUnit}>
                <SelectTrigger className="w-32" data-testid="select-speed-unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="knots">Knots</SelectItem>
                  <SelectItem value="kmh">km/h</SelectItem>
                  <SelectItem value="mph">mph</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label>Distance Unit</Label>
                <p className="text-sm text-muted-foreground">Unit for distance measurements</p>
              </div>
              <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                <SelectTrigger className="w-32" data-testid="select-distance-unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nm">Nautical Miles</SelectItem>
                  <SelectItem value="km">Kilometers</SelectItem>
                  <SelectItem value="mi">Miles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button variant="outline" onClick={handleReset} data-testid="button-reset-settings">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} data-testid="button-save-settings">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
