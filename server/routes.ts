import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { generateAgriculturalAdvice, analyzeAgriculturalImage } from "./gemini.js";
import { insertConversationSchema, insertMessageSchema } from "../shared/schema.js";
import type { WeatherData, MarketPrice, CropRecommendation } from "../shared/schema.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Image analysis endpoint
  app.post("/api/analyze-image", (req, res, next) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: "Image size should be less than 10MB" });
          }
          return res.status(400).json({ error: err.message });
        }
        return res.status(400).json({ error: err.message || "Invalid file upload" });
      }
      next();
    });
  }, async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const { conversationId, message = "", language = "en" } = req.body;

      if (!conversationId) {
        return res.status(400).json({ error: "conversationId is required" });
      }

      // Convert buffer to base64
      const imageBase64 = req.file.buffer.toString('base64');
      const mimeType = req.file.mimetype;

      // Save user message with image indicator
      const userMessage = message || "Uploaded an image for analysis";
      await storage.createMessage({
        conversationId,
        role: "user",
        content: userMessage,
      });

      // Analyze image with Gemini
      const aiResponse = await analyzeAgriculturalImage(imageBase64, mimeType, message, language);

      // Save AI response
      const assistantMessage = await storage.createMessage({
        conversationId,
        role: "assistant",
        content: aiResponse,
      });

      res.json(assistantMessage);
    } catch (error: any) {
      console.error("Image analysis error:", error);
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

  const httpServer = createServer(app);
  return httpServer;
}
