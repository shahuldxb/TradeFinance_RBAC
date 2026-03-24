import sql from "mssql";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import winston from "winston";
import fs from "fs";

// --------------------
// Resolve .env
// --------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

// --------------------
// Logger (Production Safe)
// --------------------

export const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "logs", "db-error.log"),
      level: "error",
    }),
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// --------------------
//  ENV Validations
// --------------------

const requiredEnv = [
  "DB_SERVER",
  "DB_PORT",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(` Missing environment variable: ${key}`);
    throw new Error(`Environment variable ${key} is required`);
  }
});

// --------------------
// DB Config
// --------------------

const config = {
  server: process.env.DB_SERVER!,
  port: Number(process.env.DB_PORT ?? 1433),
  database: process.env.DB_NAME!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_CERT === "true",
    connectTimeout: 30000,
    requestTimeout: 30000,
    enableArithAbort: true,
    multipleActiveResultSets: true,
  },
  pool: {
    max: Number(process.env.DB_POOL_MAX ?? 10),
    min: Number(process.env.DB_POOL_MIN ?? 0),
    idleTimeoutMillis: Number(process.env.DB_POOL_IDLE ?? 30000),
  },
};

// --------------------
// Connection Pool
// --------------------

let pool: sql.ConnectionPool | null = null;

export async function getPool(): Promise<sql.ConnectionPool> {
  if (pool) return pool;

  try {
    pool = new sql.ConnectionPool(config);
    await pool.connect();
    return pool;
  } catch (err) {
    console.error(" DB connection failed:", err);
    throw err;
  }
}

// --------------------
// Safe Query Executor
// --------------------

export async function executeQuery<T>(
  query: string,
  params: any = {}
): Promise<T[]> {
  const azurePool = await getPool();
  const request = azurePool.request();

  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined) request.input(key, params[key]);
  });

  const result = await request.query(query);
  return result.recordset as T[];
}

// --------------------
// Safe Stored Procedure Executor
// --------------------

export async function executeStoredProcedure<T>(
  procedureName: string,
  params: any = {}
): Promise<T[]> {
  const azurePool = await getPool();
  const request = azurePool.request();

  Object.keys(params).forEach((key) => {
    request.input(key, params[key]);
  });

  const result = await request.execute(procedureName);
  return result.recordset as T[];
}
