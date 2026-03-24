import sql from "mssql";
import { getPool2 } from "./db2";

export async function getPrompts(query: any) {
  try {
    const pool = await getPool2();

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = query.search || null;

const is_active =
  query.is_active === "active"
    ? 1
    : query.is_active === "inactive"
    ? 0
    : null;

const lifecycle_stage =
  query.lifecycle_stage === "all" ? null : query.lifecycle_stage || null;

const module_name =
  query.module_name === "all" ? null : query.module_name || null;

const instrument_type =
  query.instrument_type === "all" ? null : query.instrument_type || null;

const sortBy = query.sortBy || "created_date";
const sortOrder = query.sortOrder === "asc" ? "ASC" : "DESC";

const request = pool
  .request()
  .input("search", sql.NVarChar, search)
  .input("is_active", sql.Int, is_active)
  .input("lifecycle_stage", sql.NVarChar, lifecycle_stage)
  .input("module_name", sql.NVarChar, module_name)
  .input("instrument_type", sql.NVarChar, instrument_type)
  .input("sortBy", sql.NVarChar, sortBy)
  .input("sortOrder", sql.NVarChar, sortOrder)
  .input("limit", sql.Int, limit)
  .input("offset", sql.Int, offset);

const result = await request.execute("sp_GetPrompts");

    // const search = query.search || null;
    // const is_active =
    //   query.is_active === "active"
    //     ? 1
    //     : query.is_active === "inactive"
    //     ? 0
    //     : null;

    // const lifecycle_stage =
    //   query.lifecycle_stage === "all" ? null : query.lifecycle_stage || null;

    // const module_name =
    //   query.module_name === "all" ? null : query.module_name || null;

    // const sortBy = query.sortBy || "created_date";
    // const sortOrder = query.sortOrder === "asc" ? "ASC" : "DESC";

    // const request = pool
    //   .request()
    //   .input("search", sql.NVarChar, search)
    //   .input("is_active", sql.Int, is_active)
    //   .input("lifecycle_stage", sql.NVarChar, lifecycle_stage)
    //   .input("module_name", sql.NVarChar, module_name)
    //   .input("sortBy", sql.NVarChar, sortBy)
    //   .input("sortOrder", sql.NVarChar, sortOrder)
    //   .input("limit", sql.Int, limit)
    //   .input("offset", sql.Int, offset);

    // const result = await request.execute("sp_GetPrompts");

    const recordsets = Array.isArray(result.recordsets) ? result.recordsets : [];
    const totalCount = recordsets[1]?.[0]?.totalCount || 0;

    const totalPages = Math.ceil(totalCount / limit);

    const activeResult = await pool
      .request()
      .query("SELECT COUNT(*) AS activeCount FROM prompts WHERE is_active = 1");

    const activeCount = activeResult.recordset[0].activeCount;

    return {
      prompts: recordsets[0],
      totalCount,
      activeCount,
      page,
      totalPages,
    };
  } catch (error: any) {
    console.error("getPrompts error →", error);
    throw new Error(error.message || "Failed to fetch prompts");
  }
}



// Get distinct instrument types
export async function getInstrumentTypes(): Promise<string[]> {
    const pool = await getPool2();
    const result = await pool
        .request()
        .query("SELECT DISTINCT instrument_type FROM prompts WHERE instrument_type IS NOT NULL");
    return result.recordset.map(r => r.instrument_type);
}

// Get distinct lifecycle stages
export async function getLifecycleStages(): Promise<string[]> {
    const pool = await getPool2();
    const result = await pool
        .request()
        .query("SELECT DISTINCT lifecycle_stage FROM prompts WHERE lifecycle_stage IS NOT NULL");
    return result.recordset.map(r => r.lifecycle_stage);
}

export async function getPromptById(id: number) {
  try {
    const pool = await getPool2();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .execute("sp_GetPromptById");

    return result.recordset[0];
  } catch (error: any) {
    console.error("getPromptById error →", error);
    throw new Error("Failed to fetch prompt details");
  }
}

function getSubpromptId(version: string) {
  if (!version) return 0;
  const major = parseInt(version.split(".")[0], 10);
  return isNaN(major) ? 0 : major;
}

export async function createPrompt(body: any) {
  try {
    const pool = await getPool2();
    const subpromptId = getSubpromptId(body.version);

    const result = await pool
      .request()
      .input("subprompt_id", sql.Int, subpromptId)
      .input("module_name", sql.NVarChar, body.module_name)
      .input("instrument_type", sql.NVarChar, body.instrument_type)
      .input("lifecycle_stage", sql.NVarChar, body.lifecycle_stage)
      .input("analysis_mode", sql.NVarChar, body.analysis_mode)
      .input("prompt_text", sql.NVarChar, body.prompt_text)
      .input("description", sql.NVarChar, body.description)
      .input("version", sql.NVarChar, body.version)
      .input("version_desc", sql.NVarChar, body.version_desc)
      .input("is_active", sql.Bit, body.is_active)
      .input("UserID", sql.BigInt, body.UserID || body.user_id)
      .execute("sp_CreatePrompt");

    return result.recordset[0];
  } catch (error: any) {
    console.error("createPrompt error →", error);
    throw new Error("Failed to create prompt");
  }
}

export async function updatePrompt(promptId: number, body: any) {
  try {
    const pool = await getPool2();
    const subpromptId = getSubpromptId(body.version);

    const result = await pool
      .request()
      .input("prompt_id", sql.Int, promptId)
      .input("module_name", sql.NVarChar, body.module_name)
      .input("instrument_type", sql.NVarChar, body.instrument_type)
      .input("lifecycle_stage", sql.NVarChar, body.lifecycle_stage)
      .input("analysis_mode", sql.NVarChar, body.analysis_mode)
      .input("prompt_text", sql.NVarChar, body.prompt_text)
      .input("description", sql.NVarChar, body.description)
      .input("version", sql.NVarChar, body.version)
      .input("version_desc", sql.NVarChar, body.version_desc)
      .input("is_active", sql.Bit, body.is_active)
      .input("subprompt_id", sql.Int, subpromptId)
      .execute("sp_Prompts_Update");

    return result.recordset[0];
  } catch (error: any) {
    console.error("updatePrompt error →", error);
    throw new Error("Failed to update prompt");
  }
}

export async function inheritPrompt(promptId: number, body: any) {
  try {
    const pool = await getPool2();
    const subpromptId = getSubpromptId(body.version);

    const result = await pool
      .request()
      .input("old_prompt_id", sql.Int, promptId)
      .input("module_name", sql.NVarChar, body.module_name)
      .input("instrument_type", sql.NVarChar, body.instrument_type)
      .input("lifecycle_stage", sql.NVarChar, body.lifecycle_stage)
      .input("analysis_mode", sql.NVarChar, body.analysis_mode)
      .input("prompt_text", sql.NVarChar, body.prompt_text)
      .input("description", sql.NVarChar, body.description)
      .input("version", sql.NVarChar, body.version)
      .input("version_desc", sql.NVarChar, body.version_desc)
      .input("subprompt_id", sql.Int, subpromptId)
      .input("UserID", sql.BigInt, body.user_id)
      .execute("sp_InheritPrompt");

    return result.recordset[0];
  } catch (error: any) {
    console.error("inheritPrompt error →", error);
    throw new Error("Failed to inherit prompt");
  }
}

export async function deletePrompt(id: number) {
  try {
    const pool = await getPool2();
    await pool.request().input("id", sql.Int, id).execute("sp_DeletePrompt");
    return { success: true };
  } catch (error: any) {
    console.error("deletePrompt error →", error);
    throw new Error("Failed to delete prompt");
  }
}

export async function getPromptVersions(query: any) {
  try {
    const pool = await getPool2();

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    const search = query.search || null;
    const module_name = query.module_name === "all" ? null : query.module_name || null;
    const instrument_type = query.instrument_type === "all" ? null : query.instrument_type || null;
    const lifecycle_stage = query.lifecycle_stage === "all" ? null : query.lifecycle_stage || null;

    const sortBy = query.sortBy || "created_date";
    const sortOrder = query.sortOrder === "asc" ? "ASC" : "DESC";

    const request = pool
      .request()
      .input("search", sql.NVarChar, search)
      .input("module_name", sql.NVarChar, module_name)
      .input("instrument_type", sql.NVarChar, instrument_type)
      .input("lifecycle_stage", sql.NVarChar, lifecycle_stage)
      .input("sortBy", sql.NVarChar, sortBy)
      .input("sortOrder", sql.NVarChar, sortOrder)
      .input("limit", sql.Int, limit)
      .input("offset", sql.Int, offset);

    const result = await request.execute("sp_GetPromptVersions");

    const recordsets = Array.isArray(result.recordsets) ? result.recordsets : [];
    const rows = recordsets[0] || [];
    const totalCount = recordsets[1]?.[0]?.totalCount || 0;

    return {
      versions: rows,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
    };
  } catch (error: any) {
    console.error("getPromptVersions error →", error);
    throw new Error("Failed to fetch prompt version history");
  }
}
export async function getPromptDiff(id: number) {
  const pool = await getPool2();
  const result = await pool
    .request()
    .input("prompt_id", sql.Int, id)
    .execute("sp_GetPromptDiff");

  const recordsets = Array.isArray(result.recordsets) ? result.recordsets : [];

  return {
    current: recordsets[0]?.[0] || null,
    previous: recordsets[1]?.[0] || null
  };
}






















// import sql from "mssql";
// import { getPool2 } from "./db2";


// export async function getPrompts(query: any) {
//   const pool = await getPool2();

//   // Pagination
//   const page = Number(query.page) || 1;
//   const limit = Number(query.limit) || 10;
//   const offset = (page - 1) * limit;

//   // Filters
//   const search = query.search || null;
//   const is_active =
//     query.is_active === "active"
//       ? 1
//       : query.is_active === "inactive"
//       ? 0
//       : null;

//   const lifecycle_stage =
//     query.lifecycle_stage === "all" ? null : query.lifecycle_stage || null;

//   const module_name =
//     query.module_name === "all" ? null : query.module_name || null;

//   const sortBy = query.sortBy || "created_date";
//   const sortOrder = query.sortOrder === "asc" ? "ASC" : "DESC";

//   // Prepare procedure call
//   const request = pool
//     .request()
//     .input("search", sql.NVarChar, search)
//     .input("is_active", sql.Int, is_active)
//     .input("lifecycle_stage", sql.NVarChar, lifecycle_stage)
//     .input("module_name", sql.NVarChar, module_name)
//     .input("sortBy", sql.NVarChar, sortBy)
//     .input("sortOrder", sql.NVarChar, sortOrder)
//     .input("limit", sql.Int, limit)
//     .input("offset", sql.Int, offset);

//   // Execute stored procedure
//   const result = await request.execute("sp_GetPrompts");

//   // Recordset structure:
//   // recordsets[0] → paginated prompts
//   // recordsets[1] → totalCount

//   const totalCount = Array.isArray(result.recordsets) ? result.recordsets[1]?.[0]?.totalCount || 0 : 0;
//   const totalPages = Math.ceil(totalCount / limit);

//   // Active count separate query
//   const activeResult = await pool
//     .request()
//     .query("SELECT COUNT(*) AS activeCount FROM prompts WHERE is_active = 1");

//   const activeCount = activeResult.recordset[0].activeCount;

//   return {
//     prompts: (result.recordsets as sql.IRecordSet<any>[])[0], // main data
//     totalCount,
//     activeCount,
//     page,
//     totalPages,
//   };
// }

// export async function getPromptById(id: number) {
//   const pool = await getPool2();
//   const result = await pool.request()
//     .input("id", sql.Int, id)
//     .execute("sp_GetPromptById");

//   return result.recordset[0];
// }

// function getSubpromptId(version: string) {
//   if (!version) return 0;

//   // extract major version before dot
//   const major = parseInt(version.split(".")[0], 10);

//   return isNaN(major) ? 0 : major;
// }

// export async function createPrompt(body: any) {
//   const pool = await getPool2();
//   const subpromptId = getSubpromptId(body.version);

//   const result = await pool.request()
//     .input("subprompt_id", sql.Int, subpromptId)
//     .input("module_name", sql.NVarChar, body.module_name)
//     .input("instrument_type", sql.NVarChar, body.instrument_type)
//     .input("lifecycle_stage", sql.NVarChar, body.lifecycle_stage)
//     .input("analysis_mode", sql.NVarChar, body.analysis_mode)
//     .input("prompt_text", sql.NVarChar, body.prompt_text)
//     .input("description", sql.NVarChar, body.description)
//     .input("version", sql.NVarChar, body.version)
//     .input("version_desc", sql.NVarChar, body.version_desc)
//     .input("is_active", sql.Bit, body.is_active)
//     .execute("sp_CreatePrompt");

//   return result.recordset[0];
// }

// export async function updatePrompt(promptId: number, body: any) {
//   const pool = await getPool2();
//   const subpromptId = getSubpromptId(body.version);

//   const result = await pool.request()
//     .input("prompt_id", sql.Int, promptId)
//     .input("module_name", sql.NVarChar, body.module_name)
//     .input("instrument_type", sql.NVarChar, body.instrument_type)
//     .input("lifecycle_stage", sql.NVarChar, body.lifecycle_stage)
//     .input("analysis_mode", sql.NVarChar, body.analysis_mode)
//     .input("prompt_text", sql.NVarChar, body.prompt_text)
//     .input("description", sql.NVarChar, body.description)
//     .input("version", sql.NVarChar, body.version)
//     .input("version_desc", sql.NVarChar, body.version_desc)
//     .input("is_active", sql.Bit, body.is_active)
//     .input("subprompt_id", sql.Int, subpromptId)
//     .execute("sp_Prompts_Update");

//   return result.recordset[0];
// }

// export async function inheritPrompt(promptId: number, body: any) {
//   const pool = await getPool2();
//   const subpromptId = getSubpromptId(body.version);

//   const result = await pool.request()
//     .input("old_prompt_id", sql.Int, promptId)
//     .input("module_name", sql.NVarChar, body.module_name)
//     .input("instrument_type", sql.NVarChar, body.instrument_type)
//     .input("lifecycle_stage", sql.NVarChar, body.lifecycle_stage)
//     .input("analysis_mode", sql.NVarChar, body.analysis_mode)
//     .input("prompt_text", sql.NVarChar, body.prompt_text)
//     .input("description", sql.NVarChar, body.description)
//     .input("version", sql.NVarChar, body.version)
//     .input("version_desc", sql.NVarChar, body.version_desc)
//     .input("subprompt_id", sql.Int, subpromptId)
//     .execute("sp_InheritPrompt");

//   return result.recordset[0];
// }

// export async function deletePrompt(id: number) {
//   const pool = await getPool2();
//   await pool.request()
//     .input("id", sql.Int, id)
//     .execute("sp_DeletePrompt");

//   return { success: true };
// }

// export async function getPromptVersions() {
//   const pool = await getPool2();

//   const result = await pool.request().execute("sp_GetPromptVersions");

//   return result.recordset;
// }

