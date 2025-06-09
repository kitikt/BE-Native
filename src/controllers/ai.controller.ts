import { Request, Response } from "express";
import { askGemini } from "~/services/gemini.service";


export const suggestRecipe = async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ message: "Please provide a valid message." });
  }

  const prompt = `I have the following ingredients: ${message}. Can you suggest some suitable dishes I can cook with them? Please respond in English.`;

  try {
    const reply = await askGemini(prompt);
    res.json({ reply });
  } catch (error) {
    console.error("Error in suggestRecipe:", error);
    res.status(500).json({ message: "Unable to get suggestions from AI." });
  }
};
