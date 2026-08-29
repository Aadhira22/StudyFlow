import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateStudyMaterial } from "./gemini.js";
import { StudyMaterialSchema } from "./schema.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "StudyFlow server is running",
  });
});

app.post("/api/generate", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({
        error: "Topic is required",
      });
    }

    const result = await generateStudyMaterial(topic);

    const validatedResult = StudyMaterialSchema.parse(result);

    res.json({
      result: validatedResult,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
       error: error.message,
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});