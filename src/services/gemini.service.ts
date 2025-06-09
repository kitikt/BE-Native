import axios from "axios";

export const askGemini = async (prompt: string): Promise<string> => {
  const apiKey = process.env.GEMINI_API_KEY;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`;

  try {
    const response = await axios.post(url, {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || "Không có phản hồi.";
  } catch (error: any) {
    console.error("Gemini API error:", error?.response?.data || error.message);
    return "Google AI không trả lời được lúc này.";
  }
};
