import { Router } from "express";
import { 
  getPrompts,
  getPromptById,
  createPrompt,
  updatePrompt,
  deletePrompt,
  getPromptVersions,
  inheritPrompt,
  getInstrumentTypes,
  getLifecycleStages,
  getPromptDiff
    
} from "./PromptsService";

const router = Router();

// GET all
router.get("/api/prompts", async (req, res) => {
  try {
    const data = await getPrompts(req.query);
    res.json(data);
  } catch (err: any) {
    console.error("GET /api/prompts Error:", err);
    res.status(500).json({ message: err.message || "Server Error" });
  }
});

router.get("/api/prompts/instrument-types", async (req, res) => {
    try {
        const data = await getInstrumentTypes();
        res.json(data);
    } catch (err: any) {
        console.error("GET /instrument-types Error:", err);
        res.status(500).json({ message: err.message || "Server Error" });
    }
});

router.get("/api/prompts/lifecycle-stages", async (req, res) => {
    try {
        const data = await getLifecycleStages();
        res.json(data);
    } catch (err: any) {
        console.error("GET /lifecycle-stages Error:", err);
        res.status(500).json({ message: err.message || "Server Error" });
    }
});

// GET by id
router.get("/api/prompts/:id", async (req, res) => {
  try {
    const data = await getPromptById(Number(req.params.id));
    res.json(data);
  } catch (err: any) {
    console.error("GET /api/prompts/:id Error:", err);
    res.status(500).json({ message: err.message || "Server Error" });
  }
});

// CREATE
router.post("/api/prompts", async (req, res) => {
  try {
    const data = await createPrompt(req.body);
    res.json(data);
  } catch (err: any) {
    console.error("POST /api/prompts Error:", err);
    res.status(500).json({ message: err.message || "Server Error" });
  }
});

// UPDATE
router.put("/api/prompts/:id", async (req, res) => {
  try {
    const data = await updatePrompt(Number(req.params.id), req.body);
    res.json(data);
  } catch (err: any) {
    console.error("PUT /api/prompts/:id Error:", err);
    res.status(500).json({ message: err.message || "Server Error" });
  }
});

// INHERIT
router.post("/api/prompts/inherit/:id", async (req, res) => {
  try {
    const data = await inheritPrompt(Number(req.params.id), req.body);
    res.json({ success: true, new_prompt_id: data.prompt_id });
  } catch (err: any) {
    console.error("POST /api/prompts/inherit/:id Error:", err);
    res.status(500).json({ message: err.message || "Server Error" });
  }
});

// DELETE
router.delete("/api/prompts/:id", async (req, res) => {
  try {
    const data = await deletePrompt(Number(req.params.id));
    res.json(data);
  } catch (err: any) {
    console.error("DELETE /api/prompts/:id Error:", err);
    res.status(500).json({ message: err.message || "Server Error" });
  }
});

// GET versions
router.get("/api/prompt-versions", async (req, res) => {
  try {
    const data = await getPromptVersions(req.query);
    res.json(data);
  } catch (err: any) {
    console.error("GET /api/prompt-versions Error:", err);
    res.status(500).json({ message: err.message || "Server Error" });
  }
});

router.get("/api/prompts/:id/diff", async (req, res) => {
  try {
    const data = await getPromptDiff(Number(req.params.id));
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});


export default router;















// import { Router } from "express";
// import { 
//   getPrompts,
//   getPromptById,
//   createPrompt,
//   updatePrompt,
//   deletePrompt,
//   getPromptVersions,
//   inheritPrompt
// } from "./PromptsService";

// const router = Router();

// // GET all
// router.get("/api/prompts", async (req, res) => {
//   try {
//     const data = await getPrompts(req.query);
//     res.json(data);
//   } catch (err:any) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET by id
// router.get("/api/prompts/:id", async (req, res) => {
//   try {
//     const data = await getPromptById(Number(req.params.id));
//     res.json(data);
//   } catch (err:any) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // POST
// router.post("/api/prompts", async (req, res) => {
//   try {
//     const data = await createPrompt(req.body);
//     res.json(data);
//   } catch (err:any) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // PUT
// router.put("/api/prompts/:id", async (req, res) => {
//   try {
//     const data = await updatePrompt(Number(req.params.id), req.body);
//     res.json(data);
//   } catch (err:any) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.post("/api/prompts/inherit/:id", async (req, res) => {
//   try {
//     const data = await inheritPrompt(Number(req.params.id), req.body);
//     res.json({ success: true, new_prompt_id: data.prompt_id });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// });



// // DELETE
// router.delete("/api/prompts/:id", async (req, res) => {
//   try {
//     const data = await deletePrompt(Number(req.params.id));
//     res.json(data);
//   } catch (err:any) {
//     res.status(500).json({ message: err.message });
//   }
// });


// // get prompt_versions

// router.get("/api/prompt-versions", async (req, res) => {
//   try {
//     const data = await getPromptVersions();
//     res.json(data);
//   } catch (err:any) {
//     res.status(500).json({ message: err.message });
//   }
// });


// export default router;
