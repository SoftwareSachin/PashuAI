// Referenced from javascript_gemini blueprint
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeAgriculturalImage(
  imageBase64: string,
  mimeType: string,
  userMessage: string,
  language: string
): Promise<string> {
  const systemPrompt = `You are PashuAI, an expert agricultural AI assistant specializing in visual analysis of:
- Crop diseases, pests, and nutrient deficiencies
- Livestock health issues (cattle, buffalo, goats, sheep)
- Animal diseases and conditions
- Soil quality and conditions
- Plant growth stages and health
- Equipment and farming practices

Provide detailed analysis in ${language === "en" ? "English" : getLanguageName(language)}:
1. Identify what you see in the image
2. Diagnose any issues, diseases, or problems
3. Explain the severity and potential impact
4. Provide specific treatment recommendations
5. Suggest preventive measures

Be specific, practical, and use simple language farmers can understand. If discussing costs, use Indian Rupees (₹).`;

  const contents = [
    {
      role: "user",
      parts: [
        {
          inlineData: {
            data: imageBase64,
            mimeType: mimeType,
          },
        },
        {
          text: userMessage || "Please analyze this image and provide detailed agricultural insights.",
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp",
    config: {
      systemInstruction: systemPrompt,
    },
    contents: contents,
  });

  return response.text || "I apologize, I couldn't analyze the image. Please try again with a clearer image.";
}

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
    bn: "Bengali (বাংলা)",
    te: "Telugu (తెలుగు)",
    mr: "Marathi (मराठी)",
    ta: "Tamil (தமிழ்)",
    ur: "Urdu (اردو)",
    gu: "Gujarati (ગુજરાતી)",
    kn: "Kannada (ಕನ್ನಡ)",
    ml: "Malayalam (മലയാളം)",
    or: "Odia (ଓଡ଼ିଆ)",
    pa: "Punjabi (ਪੰਜਾਬੀ)",
    as: "Assamese (অসমীয়া)",
    bho: "Bhojpuri (भोजपुरी)",
    mag: "Magahi (मगही)",
    mai: "Maithili (मैथिली)",
    raj: "Rajasthani (राजस्थानी)",
    chhg: "Chhattisgarhi (छत्तीसगढ़ी)",
    sd: "Sindhi (سنڌي)",
    ks: "Kashmiri (كٲشُر)",
    ne: "Nepali (नेपाली)",
    sa: "Sanskrit (संस्कृतम्)",
    kok: "Konkani (कोंकणी)",
    mni: "Manipuri (ꯃꯩꯇꯩꯂꯣꯟ)",
    sat: "Santali (ᱥᱟᱱᱛᱟᱲᱤ)",
  };
  return languages[code] || "English";
}
