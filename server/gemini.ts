// Referenced from javascript_gemini blueprint
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateAgriculturalAdvice(
  userMessage: string,
  conversationHistory: { role: string; content: string }[],
  language: string
): Promise<string> {
  const systemPrompt = `You are PashuAI, an expert agricultural AI assistant with deep knowledge of:
- Crop management (planting, irrigation, fertilization, harvesting)
- Livestock care (cattle, buffalo, goats - health, breeding, nutrition)
- Disease detection and prevention for crops and animals
- Market intelligence and pricing trends
- Weather patterns and their impact on agriculture
- Sustainable farming practices
- Indian agricultural seasons (Kharif, Rabi, Zaid)

Provide practical, actionable advice in ${language === "en" ? "English" : getLanguageName(language)}. 
Be concise but thorough. Use simple language that farmers can understand.
If discussing prices, use Indian Rupees (₹).
Consider Indian agricultural context and practices.`;

  const contents = conversationHistory.map(msg => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.content }],
  }));

  contents.push({
    role: "user",
    parts: [{ text: userMessage }],
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp",
    config: {
      systemInstruction: systemPrompt,
    },
    contents: contents,
  });

  return response.text || "I apologize, I couldn't generate a response. Please try again.";
}

function getLanguageName(code: string): string {
  const languages: Record<string, string> = {
    en: "English",
    hi: "Hindi (हिन्दी)",
    te: "Telugu (తెలుగు)",
    kn: "Kannada (ಕನ್ನಡ)",
    ta: "Tamil (தமிழ்)",
    mr: "Marathi (मराठी)",
  };
  return languages[code] || "English";
}
