import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Force load + override existing env
dotenv.config({
  path: path.resolve(__dirname, "..", ".env"),
  override: true,
});


console.log("Loaded ENV path:", process.cwd());
console.log("MSSQL_SERVER =", process.env.MSSQL_SERVER);

import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import cors from "cors";

async function startServer() {
  const app = express();
  const server = createServer(app);

  // -------------------------
  // Add CORS and body parser
  // -------------------------
  app.use(
    cors({
      origin: "http://localhost:5173", // frontend URL
      credentials: true,
    })
  );
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // -------------------------
  // tRPC API
  // -------------------------
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // -------------------------
  // Vite or static files
  // -------------------------
  const shouldUseViteMiddleware =
    process.env.NODE_ENV === "development" &&
    !["1", "true", "yes"].includes(
      (process.env.SKIP_VITE ?? "").toLowerCase()
    );

  if (shouldUseViteMiddleware) {
    await setupVite(app, server);
  } else if (process.env.NODE_ENV === "development") {
    console.log(
      "[Dev] Vite middleware disabled; run the client dev server separately."
    );
  } else {
    serveStatic(app);
  }

  // -------------------------
  // Find available port
  // -------------------------
  const preferredPort = parseInt("3333");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

// Helper functions for checking port availability
function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

// Start the server
startServer().catch(console.error);
