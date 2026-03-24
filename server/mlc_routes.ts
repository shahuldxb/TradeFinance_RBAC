import { Router, Request, Response } from "express";
import { z } from "zod";
import { COOKIE_NAME } from "../shared/const";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string | number;[key: string]: any };
    }
  }
}
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRoutes } from "./_core/systemRouter";
import { invokeAzureOpenAI, getAzureModelName } from "./azureOpenAI";
import {
  createInstrument, getInstrumentById, updateInstrumentEnrichedContent, getInstrumentsByUser,
  createAmendment, getAmendmentById, getAmendmentsByInstrument,
  createLlmLog, getLlmLogs, getLlmLogsByUser, getLlmLogById
} from "./db3";
import {
  INSTRUMENT_TYPES, MT_MESSAGES, MT_CATEGORIES
} from "../shared/mtMessages";
import { parseMTMessage, getEligibleTransformations } from "../shared/mtEligibilityRules";

export const apiRouter = Router();

/* ---------------- SYSTEM ---------------- */
apiRouter.use("/system", systemRoutes);

/* ---------------- AUTH ---------------- */
apiRouter.get("/auth/me", (req: Request, res: Response) => {
  res.json(req.user || null);
});

apiRouter.post("/auth/logout", (req: Request, res: Response) => {
  const cookieOptions = getSessionCookieOptions(req);
  res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
  res.json({ success: true });
});

/* ---------------- MT ---------------- */
apiRouter.get("/mt/instrument-types", (req, res) => {
  const data = Object.entries(INSTRUMENT_TYPES).map(([code, data]) => ({
    code,
    name: data.name,
    description: data.description,
    primaryMT: data.primaryMT,
    variations: data.variations,
    transformations: data.transformations.map(mt => ({
      mtCode: mt,
      name: MT_MESSAGES[mt].name,
      category: MT_MESSAGES[mt].category,
      description: MT_MESSAGES[mt].description,
      categoryInfo: MT_CATEGORIES[MT_MESSAGES[mt].category],
    })),
  }));
  res.json(data);
});

apiRouter.get("/mt/messages", (req, res) => {
  res.json(Object.entries(MT_MESSAGES).map(([mtCode, data]) => ({
    mtCode,
    name: data.name,
    category: data.category,
    description: data.description,
    categoryInfo: MT_CATEGORIES[data.category],
  })));
});

apiRouter.get("/mt/categories", (req, res) => {
  res.json(MT_CATEGORIES);
});

apiRouter.post("/mt/check-eligibility", (req, res) => {
  const schema = z.object({ mtContent: z.string(), instrumentType: z.string() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const parsedMT = parseMTMessage(parsed.data.mtContent);
  const instrumentInfo = INSTRUMENT_TYPES[parsed.data.instrumentType as keyof typeof INSTRUMENT_TYPES];
  const eligibility = instrumentInfo
    ? getEligibleTransformations(parsedMT, [...instrumentInfo.transformations])
    : [];

  res.json({ parsed: parsedMT, eligibility });
});

apiRouter.post("/mt/generate-sample", async (req, res) => {
  const schema = z.object({ instrumentType: z.string(), variation: z.string().optional() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const startTime = Date.now();
  const instrumentInfo = INSTRUMENT_TYPES[parsed.data.instrumentType as keyof typeof INSTRUMENT_TYPES];
  if (!instrumentInfo) return res.status(404).json({ error: "Invalid instrument type" });

  const primaryMT = instrumentInfo.primaryMT;
  const mtInfo = MT_MESSAGES[primaryMT];

  const today = new Date();
  const issueDate = today.toISOString().slice(2, 10).replace(/-/g, '');
  const expiryDate = new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().slice(2, 10).replace(/-/g, '');
  const shipmentDate = new Date(today.getTime() + 150 * 24 * 60 * 60 * 1000).toISOString().slice(2, 10).replace(/-/g, '');

  const systemPrompt = `You are an expert trade finance document generator. Generate a complete, realistic SWIFT MT ${primaryMT} message.`;

  const response = await invokeAzureOpenAI({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Generate MT ${primaryMT} for ${instrumentInfo.name}` },
    ],
  });

  const sampleMessage = response.choices[0]?.message?.content || "";
  const usage = response.usage || {};

  await createLlmLog({
    operationType: "generate_sample",
    requestPayload: JSON.stringify(parsed.data),
    responsePayload: sampleMessage.substring(0, 2000),
    promptTokens: usage.prompt_tokens || 0,
    completionTokens: usage.completion_tokens || 0,
    totalTokens: usage.total_tokens || 0,
    modelUsed: getAzureModelName(),
    processingTimeMs: Date.now() - startTime,
    status: "success",
    userId: null,
  });

  res.json({ sampleMessage, tokenStats: usage });
});

/* ---------------- INSTRUMENTS ---------------- */


apiRouter.post("/instruments", async (req, res) => {
  const userId = req.user?.id ?? null;

  const result = await createInstrument({
    ...req.body,
    userId, // will be null if no user
  });

  res.json(result);
});

apiRouter.get("/instruments/:id", async (req, res) => {
  res.json(await getInstrumentById(Number(req.params.id)));
});

apiRouter.get("/instruments", async (req, res) => {
  const userId = typeof req.user?.id === "number" ? req.user.id : null;

  if (!userId) {
    return res.json([]); // no user → no instruments
  }

  res.json(await getInstrumentsByUser(userId));
});


apiRouter.post("/instruments/enrich", async (req, res) => {
  try {
    const startTime = Date.now();
    const { rawMTContent, userId } = req.body; // userId must come from auth middleware

    if (!rawMTContent) {
      return res.status(400).json({ error: "rawMTContent and userId are required" });
    }

    const systemPrompt = `You are an expert trade finance analyst specializing in SWIFT MT messages and Letters of Credit. Analyze the provided MT message and extract all key information in a structured, comprehensive format. Include:
1. Document Overview (Type, Issuing Bank, Beneficiary, Applicant)
2. Financial Details (Amount, Currency, Tolerance, Payment Terms)
3. Shipment Details (Ports, Dates, Partial/Transshipment)
4. Document Requirements
5. Key Dates and Deadlines
6. Special Conditions
7. Potential Risk Areas or Discrepancies`;

    const response = await invokeAzureOpenAI({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Analyze this MT message:\n\n${rawMTContent}` },
      ],
    });

    const rawEnriched = response.choices[0]?.message?.content;
    const enrichedContent = typeof rawEnriched === "string" ? rawEnriched : "";
    const usage = response.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };

    // await updateInstrumentEnrichedContent(id, enrichedContent);

    await createLlmLog({
      operationType: "enrich_instrument",
      instrumentId: null,
      requestPayload: JSON.stringify({
        systemPrompt,
        userContent: rawMTContent.substring(0, 500) + "...",
      }),
      responsePayload: enrichedContent.substring(0, 2000),
      promptTokens: usage.prompt_tokens,
      completionTokens: usage.completion_tokens,
      totalTokens: usage.total_tokens,
      modelUsed: getAzureModelName(),
      processingTimeMs: Date.now() - startTime,
      status: "success",
      userId,
    });

    return res.json({ enrichedContent, tokenStats: usage });
  } catch (err) {
    console.error("❌ Enrich error:", err);
    return res.status(500).json({ error: "Failed to enrich instrument" });
  }
});

/* ---------------- AMENDMENTS ---------------- */
apiRouter.post("/amendments/generate", async (req, res) => {
  try {
    const startTime = Date.now();
    const { originalMT, transformationMT, instrumentType, userId } = req.body;

    if (!originalMT || !transformationMT || !instrumentType) {
      return res.status(400).json({
        error: "originalMT, transformationMT and instrumentType are required",
      });
    }

    const mtInfo = MT_MESSAGES[transformationMT];

    const systemPrompt = `You are an expert trade finance document processor. Generate a complete SWIFT MT ${transformationMT} (${mtInfo?.name || "transformation"}) message based on the original instrument.

The generated MT message should:
1. Follow proper SWIFT MT ${transformationMT} format with all required fields
2. Reference the original instrument appropriately
3. Include realistic amendments/changes typical for this type of transformation
4. Use proper field tags and formatting

Generate ONLY the raw MT message content, no explanations.`;

    const response = await invokeAzureOpenAI({
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Generate an MT ${transformationMT} message for this ${instrumentType}:\n\n${originalMT}`,
        },
      ],
    });

    const rawContent = response.choices[0]?.message?.content;
    const amendmentMT = typeof rawContent === "string" ? rawContent : "";
    const usage = response.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };

    await createLlmLog({
      operationType: "generate_amendment",
      requestPayload: JSON.stringify({
        transformationMT,
        instrumentType,
        originalPreview: originalMT.substring(0, 300),
      }),
      responsePayload: amendmentMT.substring(0, 2000),
      promptTokens: usage.prompt_tokens,
      completionTokens: usage.completion_tokens,
      totalTokens: usage.total_tokens,
      modelUsed: getAzureModelName(),
      processingTimeMs: Date.now() - startTime,
      status: "success",
      userId,
    });

    return res.json({ amendmentMT, tokenStats: usage });
  } catch (err) {
    console.error("❌ Generate Amendment error:", err);
    return res.status(500).json({ error: "Failed to generate amendment MT" });
  }
});


/* ---------------- APPLY AMENDMENT ---------------- */
apiRouter.post("/amendments/apply", async (req, res) => {
  try {
    const startTime = Date.now();
    const {
      originalMTContent,
      transformationMTContent,
      transformationMT,
      instrumentType,
      userId,
    } = req.body;

    if (!originalMTContent || !transformationMTContent || !transformationMT) {
      return res.status(400).json({
        error: "originalMTContent, transformationMTContent and transformationMT are required",
      });
    }

    const systemPrompt = `
You are a Trade Finance and SWIFT MT700 expert.

Your task:
1. Apply the amendment MT content to the original MT instrument.
2. Output the FULL updated MT message (SWIFT format).
3. Then generate a clear, human-readable summary of ONLY the actual changes made.

Rules for verboseOutput:
• Do NOT repeat the full MT fields.
• Do NOT list field numbers like :32B:, :46A: etc.
• Do NOT hardcode text.
• Compare Original vs Amendment and describe the differences in natural language.
• Use short bullet points.
• If nothing changed, say: "No changes were applied."

Return JSON ONLY in this exact structure:
{
  "mtFormatOutput": "...",
  "verboseOutput": "..."
}
`;


    const response = await invokeAzureOpenAI({
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Original MT:\n${originalMTContent}\n\nAmendment MT:\n${transformationMTContent}`,
        },
      ],
    });

    const raw = response.choices[0]?.message?.content || "";
    const usage = response.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };

    // Try to safely parse JSON from model
    let mtFormatOutput = "";
    let verboseOutput = "";

    // 1. Strip ```json ``` fences if present
    let cleanedRaw = raw.trim();
    if (cleanedRaw.startsWith("```")) {
      cleanedRaw = cleanedRaw.replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
    }

    // 2. Try to parse JSON safely
    try {
      const parsed = JSON.parse(cleanedRaw);
      mtFormatOutput = parsed.mtFormatOutput || "";
      verboseOutput = parsed.verboseOutput || "";
    } catch {
      // Fallback: try to extract fields manually
      const mtMatch = cleanedRaw.match(/"mtFormatOutput"\s*:\s*"([\s\S]*?)"\s*,/);
      const verboseMatch = cleanedRaw.match(/"verboseOutput"\s*:\s*"([\s\S]*?)"\s*}/);

      mtFormatOutput = mtMatch?.[1]?.replace(/\\n/g, "\n") || cleanedRaw;
      verboseOutput = verboseMatch?.[1]?.replace(/\\n/g, "\n") || "No changes were applied.";
    }


    await createLlmLog({
      operationType: "apply_amendment",
      requestPayload: JSON.stringify({
        transformationMT,
        instrumentType,
        originalPreview: originalMTContent.substring(0, 300),
      }),
      responsePayload: raw.substring(0, 2000),
      promptTokens: usage.prompt_tokens,
      completionTokens: usage.completion_tokens,
      totalTokens: usage.total_tokens,
      modelUsed: getAzureModelName(),
      processingTimeMs: Date.now() - startTime,
      status: "success",
      userId,
    });

    return res.json({
      mtFormatOutput,
      verboseOutput,
      tokenStats: usage,
    });
  } catch (err) {
    console.error("❌ Apply Amendment error:", err);
    return res.status(500).json({ error: "Failed to apply amendment" });
  }
});



apiRouter.post("/amendments", async (req, res) => {
  const userId = typeof req.user?.id === "number" ? req.user.id : null;

  const result = await createAmendment({
    ...req.body,
    userId,
  });

  res.json(result);
});


apiRouter.get("/amendments/:id", async (req, res) => {
  res.json(await getAmendmentById(Number(req.params.id)));
});

apiRouter.get("/amendments/instrument/:instrumentId", async (req, res) => {
  res.json(await getAmendmentsByInstrument(Number(req.params.instrumentId)));
});

/* ---------------- LLM LOGS ---------------- */
apiRouter.get("/llm-logs", async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  const limit = Number(req.query.limit) || 50;
  const logs = await getLlmLogs(limit); // return all, ignoring userId
  res.json(logs);
});



apiRouter.get("/llm-logs/:id", async (req, res) => {
  res.json(await getLlmLogById(Number(req.params.id)));
});
