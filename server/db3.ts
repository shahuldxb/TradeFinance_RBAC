import sql from "mssql";
import { ENV } from "./_core/env";
import type { User } from "./types";

export type InsertUser = {
  openId: string;
  name?: string | null;
  email?: string | null;
  loginMethod?: string | null;
  role?: "user" | "admin" | null;
  lastSignedIn?: Date;
};

export type InsertMlcInstrument = {
  instrumentType: string;
  variation?: string | null;
  primaryMT: string;
  referenceNumber?: string | null;
  rawMTContent?: string | null;
  userId?: number | null;
  transactionId?: string | null;
  customerId?: string | null;
};

export type InsertMlcAmendment = {
  instrumentId: number;
  transformationMT: string;
  transformationCategory?: string | null;
  rawAmendmentContent?: string | null;
  userId?: number | null;
  transactionId?: string | null;
};

export type InsertMlcLlmLog = {
  operationType: string;
  instrumentId?: number | null;
  amendmentId?: number | null;
  requestPayload?: string | null;
  responsePayload?: string | null;
  promptTokens?: number | null;
  completionTokens?: number | null;
  totalTokens?: number | null;
  modelUsed?: string | null;
  processingTimeMs?: number | null;
  status?: string | null;
  errorMessage?: string | null;
  userId?: number | null;
  transactionId?: string | null;
};

const hasOwn = (obj: object, key: string) =>
  Object.prototype.hasOwnProperty.call(obj, key);

const parseBool = (value: string | undefined, fallback: boolean) => {
  if (value === undefined) return fallback;
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "y"].includes(normalized)) return true;
  if (["0", "false", "no", "n"].includes(normalized)) return false;
  return fallback;
};

const toNullable = (value: string | null | undefined) =>
  value === undefined ? null : value;

const toJson = (value: unknown) => {
  if (value === undefined || value === null) return null;
  return typeof value === "string" ? value : JSON.stringify(value);
};

let pool: sql.ConnectionPool | null = null;
let poolPromise: Promise<sql.ConnectionPool | null> | null = null;

function getSqlConfig(): sql.config | null {
  const { mssql } = ENV;

    if (!mssql.server || !mssql.database || !mssql.username || !mssql.password) {
    console.error("[Database] MSSQL configuration is incomplete.", {
      server: mssql.server,
      database: mssql.database,
      username: mssql.username ? "***" : undefined, // hide password
      password: mssql.password ? "***" : undefined,
    });
    return null;
  }


  if (!mssql.server || !mssql.database || !mssql.username || !mssql.password) {
    console.warn("[Database] MSSQL configuration is incomplete.");
    return null;
  }

  const port = parseInt(mssql.port, 10);

  return {
    user: mssql.username,
    password: mssql.password,
    server: mssql.server,
    database: mssql.database,
    port: Number.isNaN(port) ? undefined : port,
    options: {
      encrypt: parseBool(mssql.encrypt, true),
      trustServerCertificate: parseBool(mssql.trustServerCertificate, true),
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  };
}

async function getPool(): Promise<sql.ConnectionPool | null> {
  const config = getSqlConfig();
  if (!config) return null;

  if (pool) return pool;

  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(config)
      .connect()
      .then(connected => {
        pool = connected;
        return connected;
      })
      .catch(error => {
        console.warn("[Database] Failed to connect:", error);
        poolPromise = null;
        return null;
      });
  }

  return poolPromise;
}

async function getRequest(): Promise<sql.Request | null> {
  const activePool = await getPool();
  if (!activePool) return null;
  return activePool.request();
}

// User functions
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const request = await getRequest();
  if (!request) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  const role =
    user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : null);
  const lastSignedIn = user.lastSignedIn ?? new Date();

  const nameProvided = hasOwn(user, "name");
  const emailProvided = hasOwn(user, "email");
  const loginMethodProvided = hasOwn(user, "loginMethod");
  const roleProvided = hasOwn(user, "role") || role === "admin";

  request.input("openId", sql.VarChar(64), user.openId);
  request.input(
    "name",
    sql.NVarChar(200),
    nameProvided ? user.name ?? null : null
  );
  request.input("nameProvided", sql.Bit, nameProvided);
  request.input(
    "email",
    sql.VarChar(320),
    emailProvided ? user.email ?? null : null
  );
  request.input("emailProvided", sql.Bit, emailProvided);
  request.input(
    "loginMethod",
    sql.VarChar(64),
    loginMethodProvided ? user.loginMethod ?? null : null
  );
  request.input("loginMethodProvided", sql.Bit, loginMethodProvided);
  request.input("role", sql.VarChar(20), role);
  request.input("roleProvided", sql.Bit, roleProvided);
  request.input("lastSignedIn", sql.DateTime, lastSignedIn);

  const query = `
MERGE [users] AS target
USING (SELECT @openId AS openId) AS source
ON target.openId = source.openId
WHEN MATCHED THEN
  UPDATE SET
    name = CASE WHEN @nameProvided = 1 THEN @name ELSE target.name END,
    email = CASE WHEN @emailProvided = 1 THEN @email ELSE target.email END,
    loginMethod = CASE WHEN @loginMethodProvided = 1 THEN @loginMethod ELSE target.loginMethod END,
    role = CASE WHEN @roleProvided = 1 THEN @role ELSE target.role END,
    lastSignedIn = @lastSignedIn,
    updatedAt = GETDATE()
WHEN NOT MATCHED THEN
  INSERT (openId, name, email, loginMethod, role, createdAt, updatedAt, lastSignedIn)
  VALUES (
    @openId,
    @name,
    @email,
    @loginMethod,
    COALESCE(@role, 'user'),
    GETDATE(),
    GETDATE(),
    @lastSignedIn
  );
`;

  try {
    await request.query(query);
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(
  openId: string
): Promise<User | undefined> {
  const request = await getRequest();
  if (!request) return undefined;

  request.input("openId", sql.VarChar(64), openId);
  const result = await request.query<User>(`
SELECT TOP (1)
  id,
  openId,
  name,
  email,
  loginMethod,
  role,
  createdAt,
  updatedAt,
  lastSignedIn
FROM [users]
WHERE openId = @openId;
`);

  return result.recordset[0];
}

// MFC Instrument functions
export async function createInstrument(data: InsertMlcInstrument) {
  const request = await getRequest();
  if (!request) throw new Error("Database not available");

  request.input("transactionId", sql.VarChar(50), toNullable(data.transactionId));
  request.input("customerId", sql.VarChar(50), toNullable(data.customerId));
  request.input("instrumentType", sql.VarChar(20), data.instrumentType);
  request.input("variation", sql.VarChar(50), toNullable(data.variation));
  request.input("primaryMT", sql.VarChar(10), data.primaryMT);
  request.input("referenceNumber", sql.VarChar(50), toNullable(data.referenceNumber));
  request.input("rawMTContent", sql.NVarChar(sql.MAX), toNullable(data.rawMTContent));
  request.input("userId", sql.Int, data.userId ?? null);

  const result = await request.query<{ id: number }>(`
INSERT INTO MFC_Instruments (
  transactionId,
  customerId,
  instrumentType,
  variation,
  primaryMT,
  referenceNumber,
  rawMTContent,
  userId
)
OUTPUT INSERTED.id
VALUES (
  @transactionId,
  @customerId,
  @instrumentType,
  @variation,
  @primaryMT,
  @referenceNumber,
  @rawMTContent,
  @userId
);
`);

  return { id: result.recordset[0]?.id ?? 0 };
}

export async function getInstrumentById(id: number) {
  const request = await getRequest();
  if (!request) return undefined;

  request.input("id", sql.Int, id);
  const result = await request.query(`
SELECT TOP (1) *
FROM MFC_Instruments
WHERE id = @id;
`);
  return result.recordset[0];
}

export async function updateInstrumentEnrichedContent(
  id: number,
  enrichedContent: string,
  parsedFields?: Record<string, unknown>
) {
  const request = await getRequest();
  if (!request) throw new Error("Database not available");

  request.input("id", sql.Int, id);
  request.input("enrichedContent", sql.NVarChar(sql.MAX), enrichedContent);
  request.input(
    "parsedFields",
    sql.NVarChar(sql.MAX),
    parsedFields ? JSON.stringify(parsedFields) : null
  );

  await request.query(`
UPDATE MFC_Instruments
SET enrichedContent = @enrichedContent,
    parsedFields = @parsedFields,
    updatedAt = GETDATE()
WHERE id = @id;
`);
}

export async function getInstrumentsByUser(userId: number) {
  const request = await getRequest();
  if (!request) return [];

  request.input("userId", sql.Int, userId);
  const result = await request.query(`
SELECT *
FROM MFC_Instruments
WHERE userId = @userId
ORDER BY createdAt DESC;
`);
  return result.recordset;
}

// MFC Amendment functions
export async function createAmendment(data: InsertMlcAmendment) {
  const request = await getRequest();
  if (!request) throw new Error("Database not available");

  request.input("instrumentId", sql.Int, data.instrumentId);
  request.input("transactionId", sql.VarChar(50), toNullable(data.transactionId));
  request.input("transformationMT", sql.VarChar(10), data.transformationMT);
  request.input(
    "transformationCategory",
    sql.VarChar(30),
    toNullable(data.transformationCategory)
  );
  request.input(
    "rawAmendmentContent",
    sql.NVarChar(sql.MAX),
    toNullable(data.rawAmendmentContent)
  );
  request.input("userId", sql.Int, data.userId ?? null);

  const result = await request.query<{ id: number }>(`
INSERT INTO MFC_Amendments (
  instrumentId,
  transactionId,
  transformationMT,
  transformationCategory,
  rawAmendmentContent,
  userId
)
OUTPUT INSERTED.id
VALUES (
  @instrumentId,
  @transactionId,
  @transformationMT,
  @transformationCategory,
  @rawAmendmentContent,
  @userId
);
`);

  return { id: result.recordset[0]?.id ?? 0 };
}

export async function getAmendmentById(id: number) {
  const request = await getRequest();
  if (!request) return undefined;

  request.input("id", sql.Int, id);
  const result = await request.query(`
SELECT TOP (1) *
FROM MFC_Amendments
WHERE id = @id;
`);
  return result.recordset[0];
}

export async function updateAmendmentOutput(
  id: number,
  verboseOutput: string,
  mtFormatOutput: string,
  discrepancies?: unknown[],
  cureSteps?: string
) {
  const request = await getRequest();
  if (!request) throw new Error("Database not available");

  request.input("id", sql.Int, id);
  request.input("verboseOutput", sql.NVarChar(sql.MAX), verboseOutput);
  request.input("mtFormatOutput", sql.NVarChar(sql.MAX), mtFormatOutput);
  request.input(
    "discrepancies",
    sql.NVarChar(sql.MAX),
    toJson(discrepancies)
  );
  request.input("cureSteps", sql.NVarChar(sql.MAX), toNullable(cureSteps));

  await request.query(`
UPDATE MFC_Amendments
SET verboseOutput = @verboseOutput,
    mtFormatOutput = @mtFormatOutput,
    discrepancies = @discrepancies,
    cureSteps = @cureSteps,
    status = 'applied',
    updatedAt = GETDATE()
WHERE id = @id;
`);
}

export async function getAmendmentsByInstrument(instrumentId: number) {
  const request = await getRequest();
  if (!request) return [];

  request.input("instrumentId", sql.Int, instrumentId);
  const result = await request.query(`
SELECT *
FROM MFC_Amendments
WHERE instrumentId = @instrumentId
ORDER BY createdAt DESC;
`);
  return result.recordset;
}

// MFC LLM Log functions
export async function createLlmLog(data: InsertMlcLlmLog) {
  const request = await getRequest();
  if (!request) throw new Error("Database not available");

  request.input("transactionId", sql.VarChar(50), toNullable(data.transactionId));
  request.input("operationType", sql.VarChar(50), data.operationType);
  request.input("instrumentId", sql.Int, data.instrumentId ?? null);
  request.input("amendmentId", sql.Int, data.amendmentId ?? null);
  request.input(
    "requestPayload",
    sql.NVarChar(sql.MAX),
    toNullable(data.requestPayload)
  );
  request.input(
    "responsePayload",
    sql.NVarChar(sql.MAX),
    toNullable(data.responsePayload)
  );
  request.input("promptTokens", sql.Int, data.promptTokens ?? 0);
  request.input("completionTokens", sql.Int, data.completionTokens ?? 0);
  request.input("totalTokens", sql.Int, data.totalTokens ?? 0);
  request.input("modelUsed", sql.VarChar(50), toNullable(data.modelUsed));
  request.input("processingTimeMs", sql.Int, data.processingTimeMs ?? null);
  request.input("status", sql.VarChar(20), toNullable(data.status) ?? "success");
  request.input(
    "errorMessage",
    sql.NVarChar(sql.MAX),
    toNullable(data.errorMessage)
  );
  request.input("userId", sql.Int, data.userId ?? null);

  const result = await request.query<{ id: number }>(`
INSERT INTO MFC_LLM_Logs (
  transactionId,
  operationType,
  instrumentId,
  amendmentId,
  requestPayload,
  responsePayload,
  promptTokens,
  completionTokens,
  totalTokens,
  modelUsed,
  processingTimeMs,
  status,
  errorMessage,
  userId
)
OUTPUT INSERTED.id
VALUES (
  @transactionId,
  @operationType,
  @instrumentId,
  @amendmentId,
  @requestPayload,
  @responsePayload,
  @promptTokens,
  @completionTokens,
  @totalTokens,
  @modelUsed,
  @processingTimeMs,
  @status,
  @errorMessage,
  @userId
);
`);

  return { id: result.recordset[0]?.id ?? 0 };
}

export async function getLlmLogs(limit = 50) {
  const request = await getRequest();
  if (!request) return [];

  // Use string interpolation instead of parameter
  const result = await request.query(`
    SELECT TOP ${limit} *
    FROM MFC_LLM_Logs
    ORDER BY createdAt DESC;
  `);
  return result.recordset;
}

export async function getLlmLogsByUser(userId: number, limit = 50) {
  const request = await getRequest();
  if (!request) return [];

  request.input("userId", sql.Int, userId);
  request.input("limit", sql.Int, limit);
  const result = await request.query(`
SELECT TOP (@limit) *
FROM MFC_LLM_Logs
WHERE userId = @userId
ORDER BY createdAt DESC;
`);
  return result.recordset;
}

export async function getLlmLogById(id: number) {
  const request = await getRequest();
  if (!request) return undefined;

  request.input("id", sql.Int, id);
  const result = await request.query(`
SELECT TOP (1) *
FROM MFC_LLM_Logs
WHERE id = @id;
`);
  return result.recordset[0];
}
