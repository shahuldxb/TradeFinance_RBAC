import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const VesselStatus = {
  ACTIVE: "active",
  ANCHORED: "anchored",
  IN_PORT: "in_port",
  UNDERWAY: "underway",
  MOORED: "moored",
  RESTRICTED: "restricted",
} as const;

export type VesselStatusType = typeof VesselStatus[keyof typeof VesselStatus];

export const VesselType = {
  CARGO: "cargo",
  TANKER: "tanker",
  CONTAINER: "container",
  PASSENGER: "passenger",
  FISHING: "fishing",
  TUG: "tug",
  MILITARY: "military",
  SAILING: "sailing",
  PLEASURE: "pleasure",
  OTHER: "other",
} as const;

export type VesselTypeType = typeof VesselType[keyof typeof VesselType];

export const AlertSeverity = {
  INFO: "info",
  WARNING: "warning",
  CRITICAL: "critical",
} as const;

export type AlertSeverityType = typeof AlertSeverity[keyof typeof AlertSeverity];

export const AlertType = {
  STATUS_CHANGE: "status_change",
  SPEED_ANOMALY: "speed_anomaly",
  ROUTE_DEVIATION: "route_deviation",
  GEOFENCE_BREACH: "geofence_breach",
  COMMUNICATION_LOSS: "communication_loss",
  WEATHER_WARNING: "weather_warning",
  PORT_ARRIVAL: "port_arrival",
  PORT_DEPARTURE: "port_departure",
} as const;

export type AlertTypeType = typeof AlertType[keyof typeof AlertType];

export interface VesselOwner {
  company: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  headquartersPort: string;
}

export interface Vessel {
  id: string;
  name: string;
  imo: string;
  mmsi: string;
  callSign: string;
  flag: string;
  type: VesselTypeType;
  status: VesselStatusType;
  latitude: number;
  longitude: number;
  heading: number;
  speed: number;
  course: number;
  destination: string;
  eta: string | null;
  lastUpdate: string;
  length: number;
  width: number;
  draft: number;
  deadweight: number;
  voyageId: string;
  owner: VesselOwner;
}

export interface InsertVessel {
  name: string;
  imo: string;
  mmsi: string;
  callSign: string;
  flag: string;
  type: VesselTypeType;
  status: VesselStatusType;
  latitude: number;
  longitude: number;
  heading: number;
  speed: number;
  course: number;
  destination: string;
  eta?: string | null;
  length: number;
  width: number;
  draft: number;
  deadweight: number;
  voyageId: string;
  owner: VesselOwner;
}

export interface RoutePoint {
  id: string;
  vesselId: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  timestamp: string;
}

export interface InsertRoutePoint {
  vesselId: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
}

export interface VesselAlert {
  id: string;
  vesselId: string;
  vesselName: string;
  type: AlertTypeType;
  severity: AlertSeverityType;
  message: string;
  timestamp: string;
  acknowledged: boolean;
  resolved: boolean;
}

export interface InsertVesselAlert {
  vesselId: string;
  vesselName: string;
  type: AlertTypeType;
  severity: AlertSeverityType;
  message: string;
}

export interface FleetStats {
  totalVessels: number;
  activeVessels: number;
  anchoredVessels: number;
  inPortVessels: number;
  underwayVessels: number;
  averageSpeed: number;
  totalAlerts: number;
  criticalAlerts: number;
}

export const vesselOwnerSchema = z.object({
  company: z.string().min(1),
  contactName: z.string().min(1),
  contactEmail: z.string().email(),
  phone: z.string().min(1),
  headquartersPort: z.string().min(1),
});

export const insertVesselSchema = z.object({
  name: z.string().min(1),
  imo: z.string().min(1),
  mmsi: z.string().min(1),
  callSign: z.string().min(1),
  flag: z.string().min(2).max(2),
  type: z.enum(["cargo", "tanker", "container", "passenger", "fishing", "tug", "military", "sailing", "pleasure", "other"]),
  status: z.enum(["active", "anchored", "in_port", "underway", "moored", "restricted"]),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  heading: z.number().min(0).max(360),
  speed: z.number().min(0),
  course: z.number().min(0).max(360),
  destination: z.string(),
  eta: z.string().nullable().optional(),
  length: z.number().min(0),
  width: z.number().min(0),
  draft: z.number().min(0),
  deadweight: z.number().min(0),
  voyageId: z.string().min(1),
  owner: vesselOwnerSchema,
});

export const insertRoutePointSchema = z.object({
  vesselId: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  speed: z.number().min(0),
  heading: z.number().min(0).max(360),
});

export const insertAlertSchema = z.object({
  vesselId: z.string().min(1),
  vesselName: z.string().min(1),
  type: z.enum(["status_change", "speed_anomaly", "route_deviation", "geofence_breach", "communication_loss", "weather_warning", "port_arrival", "port_departure"]),
  severity: z.enum(["info", "warning", "critical"]),
  message: z.string().min(1),
});

export const vesselFilterSchema = z.object({
  status: z.array(z.string()).optional(),
  type: z.array(z.string()).optional(),
  search: z.string().optional(),
});

export const updateVesselSchema = insertVesselSchema.partial();

export type VesselFilter = z.infer<typeof vesselFilterSchema>;
