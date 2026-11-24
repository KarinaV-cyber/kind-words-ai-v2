

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


app.post("/api/kind-words", async (req, res) => {
  try {
    const { mood, category } = req.body;

    if (!mood || !category) {
      return res.status(400).json({
        error: "Please select a mood and category."
      });
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      instructions:
        "You are Kind Words AI, a warm, thoughtful, and encouraging assistant. Generate a personalized, uplifting message. Be empathetic, natural, and supportive. Avoid generic clichés. Keep your response between 2 and 4 sentences.",
      input: `The user's current mood is ${mood}. Their selected category is ${category}. Write a thoughtful message to encourage them.`
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("OpenAI API error:", error.message);

    res.status(500).json({
      error: "Unable to generate your kind words. Please try again."
    });
  }
});
