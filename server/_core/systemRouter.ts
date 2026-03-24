import { Router, Request, Response } from "express";
import { z } from "zod";
// import { notifyOwner } from "./notification";

export const systemRoutes = Router();

/**
 * GET /api/system/health?timestamp=123456
 */
systemRoutes.get("/health", (req: Request, res: Response) => {
  const schema = z.object({
    timestamp: z.coerce.number().min(0, "timestamp cannot be negative"),
  });

  const parsed = schema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.format());
  }

  res.json({ ok: true });
});

/**
 * POST /api/system/notify-owner
 */
// systemRoutes.post("/notify-owner", async (req: Request, res: Response) => {
//   const schema = z.object({
//     title: z.string().min(1, "title is required"),
//     content: z.string().min(1, "content is required"),
//   });

//   const parsed = schema.safeParse(req.body);
//   if (!parsed.success) {
//     return res.status(400).json(parsed.error.format());
//   }

//   try {
//     const delivered = await notifyOwner(parsed.data);
//     res.json({ success: delivered });
//   } catch (err) {
//     console.error("notifyOwner failed:", err);
//     res.status(500).json({ success: false, error: "Notification failed" });
//   }
// });
