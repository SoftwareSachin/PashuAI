import express, { type Request, Response, NextFunction } from "express";
import type { Express } from "express";
import { storage } from "../server/storage";
import { generateAgriculturalAdvice } from "../server/gemini";
import { insertConversationSchema, insertMessageSchema } from "../shared/schema";
import type { WeatherData, MarketPrice, CropRecommendation } from "../shared/schema";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware for API requests
app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

// API Routes - copied from server/routes.ts for Vercel compatibility
// Conversation endpoints
app.post("/api/conversations", async (req, res) => {
  try {
    const data = insertConversationSchema.parse(req.body);
    const conversation = await storage.createConversation(data);
    res.json(conversation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get messages for a conversation
app.get("/api/messages/:conversationId", async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await storage.getMessagesByConversation(conversationId);
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Chat endpoint with Gemini
app.post("/api/chat", async (req, res) => {
  try {
    const { conversationId, message, language = "en" } = req.body;

    if (!conversationId || !message) {
      return res.status(400).json({ error: "conversationId and message are required" });
    }

    // Save user message
    await storage.createMessage({
      conversationId,
      role: "user",
      content: message,
    });

    // Get conversation history
    const history = await storage.getMessagesByConversation(conversationId);
    const conversationHistory = history.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    // Generate AI response
    const aiResponse = await generateAgriculturalAdvice(message, conversationHistory, language);

    // Save AI message
    const assistantMessage = await storage.createMessage({
      conversationId,
      role: "assistant",
      content: aiResponse,
    });

    res.json(assistantMessage);
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Weather endpoint (mock data for now)
app.get("/api/weather/:location", async (req, res) => {
  try {
    const { location } = req.params;
    
    const weatherData: WeatherData = {
      location: location || "Delhi",
      temperature: 28,
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 12,
      forecast: [
        { day: "Mon", high: 30, low: 20, condition: "Sunny" },
        { day: "Tue", high: 29, low: 19, condition: "Partly Cloudy" },
        { day: "Wed", high: 27, low: 18, condition: "Cloudy" },
        { day: "Thu", high: 26, low: 17, condition: "Rain" },
        { day: "Fri", high: 28, low: 19, condition: "Sunny" },
      ],
    };

    res.json(weatherData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Market prices endpoint (mock data)
app.get("/api/market-prices", async (req, res) => {
  try {
    const prices: MarketPrice[] = [
      {
        id: "1",
        commodity: "Wheat",
        price: 2200,
        unit: "quintal",
        market: "Delhi Mandi",
        change: 2.5,
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        commodity: "Rice (Basmati)",
        price: 4500,
        unit: "quintal",
        market: "Karnal Mandi",
        change: -1.2,
        updatedAt: new Date().toISOString(),
      },
      {
        id: "3",
        commodity: "Maize",
        price: 1800,
        unit: "quintal",
        market: "Mumbai Mandi",
        change: 3.8,
        updatedAt: new Date().toISOString(),
      },
      {
        id: "4",
        commodity: "Cotton",
        price: 6200,
        unit: "quintal",
        market: "Gujarat Mandi",
        change: 1.5,
        updatedAt: new Date().toISOString(),
      },
      {
        id: "5",
        commodity: "Mustard",
        price: 5400,
        unit: "quintal",
        market: "Rajasthan Mandi",
        change: -0.8,
        updatedAt: new Date().toISOString(),
      },
    ];

    res.json(prices);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Crop recommendations endpoint (mock data)
app.get("/api/crops", async (req, res) => {
  try {
    const crops: CropRecommendation[] = [
      {
        id: "1",
        name: "Wheat",
        profitPotential: 18,
        marketDemand: "Medium",
        season: "Rabi (November-April)",
        investment: "₹22,000/acre",
        description: "Stable market with consistent demand throughout the year",
      },
      {
        id: "2",
        name: "Mustard",
        profitPotential: 24,
        marketDemand: "Medium",
        season: "Rabi (October-March)",
        investment: "₹18,000/acre",
        description: "Good profit margins with growing demand for mustard oil",
      },
      {
        id: "3",
        name: "Maize",
        profitPotential: 20,
        marketDemand: "High",
        season: "Kharif (June-September)",
        investment: "₹24,000/acre",
        description: "High demand from poultry and food processing industries",
      },
    ];

    res.json(crops);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files in production (for Vercel)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
  const publicPath = path.join(__dirname, "..", "dist", "public");
  app.use(express.static(publicPath));
  
  // Serve index.html for all non-API routes (SPA support)
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(publicPath, "index.html"));
    }
  });
}

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  console.error(err);
});

// Export for Vercel serverless
export default app;
