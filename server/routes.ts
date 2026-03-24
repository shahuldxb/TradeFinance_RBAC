import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { logger } from "./db";
import PromptRouter from "./PromptRouter";
import rateLimit from "express-rate-limit";
import { apiRouter } from "./mlc_routes";
import vesselRoutes from "./vessel_routes";


// export async function registerRoutes(app: Express): Promise<Server> {
// ------------------------------
// LOGIN ROUTE (Production Safe)
// ------------------------------

export async function registerRoutes(app: Express): Promise<Server> {
  const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // max 10 attempts from one IP
    message: {
      success: false,
      message: "Too many login attempts. Try again later.",
    },
  });

  app.post("/api/login", loginLimiter, async (req, res) => {
    const { Identifier, Password } = req.body;

    if (!Identifier || !Password) {
      return res.status(400).json({
        success: false,
        message: "Identifier and password are required",
      });
    }
    try {
      const result = await storage.loginUser({ Identifier, Password });
      if (!result.success) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }
      return res.status(200).json(result);
    } catch (err) {
      logger.error("Login route error", { error: err });
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  // ------------------------------------
  // Register other Framework routes
  // ------------------------------------


  app.use(PromptRouter);
  app.use("/api", apiRouter);
  app.use("/api", vesselRoutes);


  // ------------------------------------
  // Return HTTP server
  // ------------------------------------
  const httpServer = createServer(app);
  return httpServer;
}
