import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
    methods: ["POST", "GET"],
  })
);

const ReqSchema = z.object({
  topic: z.string().min(1, "Topic is required").max(60),
  count: z.number().int().min(1).max(50),
  includeAnswerKey: z.boolean().optional().default(false),
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/generate-exam", async (req, res) => {
  try {
    const parsed = ReqSchema.safeParse({
      topic: req.body?.topic,
      count: Number(req.body?.count),
      includeAnswerKey: Boolean(req.body?.includeAnswerKey),
    });

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const { topic, count, includeAnswerKey } = parsed.data;

    const prompt = `Generate a math exam for a primary school student with ${count} questions on the topic of ${topic}.
${includeAnswerKey ? "Add an 'Answer Key' section at the end." : "Do not include answers."}
Format as a numbered list.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ ok: true, exam: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Failed to generate exam." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running`);
});
