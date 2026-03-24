import { Router, Request, Response } from "express";
import { storage } from "./storage_vessel";
import {
    insertVesselSchema,
    insertRoutePointSchema,
    insertAlertSchema,
    vesselFilterSchema,
    updateVesselSchema
} from "../shared/schema";

const router = Router();


router.get("/vessels", async (req: Request, res: Response) => {
    try {
        const statusParam = req.query.status;
        const typeParam = req.query.type;
        const searchParam = req.query.search;

        const filter: { status?: string[]; type?: string[]; search?: string } = {};

        if (statusParam) {
            filter.status = Array.isArray(statusParam)
                ? statusParam as string[]
                : [statusParam as string];
        }

        if (typeParam) {
            filter.type = Array.isArray(typeParam)
                ? typeParam as string[]
                : [typeParam as string];
        }

        if (searchParam && typeof searchParam === "string") {
            filter.search = searchParam;
        }

        const vessels = await storage.getVessels(filter);
        res.json(vessels);
    } catch (error) {
        console.error("Error fetching vessels:", error);
        res.status(500).json({ error: "Failed to fetch vessels" });
    }
});

router.get("/vessels/:id", async (req: Request, res: Response) => {
    try {
        const vessel = await storage.getVessel(req.params.id);
        if (!vessel) {
            return res.status(404).json({ error: "Vessel not found" });
        }
        res.json(vessel);
    } catch (error) {
        console.error("Error fetching vessel:", error);
        res.status(500).json({ error: "Failed to fetch vessel" });
    }
});

router.post("/vessels", async (req: Request, res: Response) => {
    try {
        const parsed = insertVesselSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.flatten() });
        }

        const vessel = await storage.createVessel(parsed.data);
        res.status(201).json(vessel);
    } catch (error) {
        console.error("Error creating vessel:", error);
        res.status(500).json({ error: "Failed to create vessel" });
    }
});

router.patch("/vessels/:id", async (req: Request, res: Response) => {
    try {
        const parsed = updateVesselSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.flatten() });
        }

        const vessel = await storage.updateVessel(req.params.id, parsed.data);
        if (!vessel) {
            return res.status(404).json({ error: "Vessel not found" });
        }
        res.json(vessel);
    } catch (error) {
        console.error("Error updating vessel:", error);
        res.status(500).json({ error: "Failed to update vessel" });
    }
});

router.delete("/vessels/:id", async (req: Request, res: Response) => {
    try {
        const deleted = await storage.deleteVessel(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Vessel not found" });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting vessel:", error);
        res.status(500).json({ error: "Failed to delete vessel" });
    }
});

router.get("/vessels/:id/route", async (req: Request, res: Response) => {
    try {
        const routeHistory = await storage.getRouteHistory(req.params.id);
        res.json(routeHistory);
    } catch (error) {
        console.error("Error fetching route history:", error);
        res.status(500).json({ error: "Failed to fetch route history" });
    }
});

router.post("/vessels/:id/route", async (req: Request, res: Response) => {
    try {
        const parsed = insertRoutePointSchema.safeParse({
            ...req.body,
            vesselId: req.params.id,
        });
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.flatten() });
        }

        const point = await storage.addRoutePoint(parsed.data);
        res.status(201).json(point);
    } catch (error) {
        console.error("Error adding route point:", error);
        res.status(500).json({ error: "Failed to add route point" });
    }
});

router.get("/alerts", async (_req: Request, res: Response) => {
    try {
        const alerts = await storage.getAlerts();
        res.json(alerts);
    } catch (error) {
        console.error("Error fetching alerts:", error);
        res.status(500).json({ error: "Failed to fetch alerts" });
    }
});

router.get("/vessels/:id/alerts", async (req: Request, res: Response) => {
    try {
        const alerts = await storage.getVesselAlerts(req.params.id);
        res.json(alerts);
    } catch (error) {
        console.error("Error fetching vessel alerts:", error);
        res.status(500).json({ error: "Failed to fetch vessel alerts" });
    }
});

router.post("/alerts", async (req: Request, res: Response) => {
    try {
        const parsed = insertAlertSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.flatten() });
        }

        const alert = await storage.createAlert(parsed.data);
        res.status(201).json(alert);
    } catch (error) {
        console.error("Error creating alert:", error);
        res.status(500).json({ error: "Failed to create alert" });
    }
});

router.patch("/alerts/:id/acknowledge", async (req: Request, res: Response) => {
    try {
        const alert = await storage.acknowledgeAlert(req.params.id);
        if (!alert) {
            return res.status(404).json({ error: "Alert not found" });
        }
        res.json(alert);
    } catch (error) {
        console.error("Error acknowledging alert:", error);
        res.status(500).json({ error: "Failed to acknowledge alert" });
    }
});

router.patch("/alerts/:id/resolve", async (req: Request, res: Response) => {
    try {
        const alert = await storage.resolveAlert(req.params.id);
        if (!alert) {
            return res.status(404).json({ error: "Alert not found" });
        }
        res.json(alert);
    } catch (error) {
        console.error("Error resolving alert:", error);
        res.status(500).json({ error: "Failed to resolve alert" });
    }
});

router.get("/stats/fleet", async (_req: Request, res: Response) => {
    try {
        const stats = await storage.getFleetStats();
        res.json(stats);
    } catch (error) {
        console.error("Error fetching fleet stats:", error);
        res.status(500).json({ error: "Failed to fetch fleet stats" });
    }
});

export default router;

