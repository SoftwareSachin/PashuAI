import express, { type Request, Response, NextFunction } from "express";
import type { Express } from "express";
import { storage } from "../server/storage.js";
import { generateAgriculturalAdvice, analyzeAgriculturalImage } from "../server/gemini.js";
import { insertConversationSchema, insertMessageSchema } from "../shared/schema.js";
import type { WeatherData, MarketPrice, CropRecommendation } from "../shared/schema.js";
import { authMiddleware, adminMiddleware, generateToken, hashPassword, comparePassword } from "../server/auth.js";
import { initializeDefaultAdmin } from "../server/init-admin.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

// Initialize default admin user on cold start
initializeDefaultAdmin().catch(err => console.error('Failed to initialize admin:', err));

// API Routes - copied from server/routes.ts for Vercel compatibility
// Auth endpoints
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, phone, password, name } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ error: "Email or phone number is required" });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const existingUser = await storage.getUserByEmailOrPhone(email || phone);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email or phone number" });
    }

    const passwordHash = await hashPassword(password);

    const user = await storage.createUser({
      email: email || undefined,
      phone: phone || undefined,
      passwordHash,
      name: name || undefined,
    });

    const token = generateToken({
      userId: user.id,
      email: user.email || undefined,
      phone: user.phone || undefined,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ error: "Email/phone and password are required" });
    }

    const user = await storage.getUserByEmailOrPhone(emailOrPhone);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email || undefined,
      phone: user.phone || undefined,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = await storage.getUserById(req.userId!);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error: any) {
    console.error("Get user error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Admin endpoints
app.get("/api/admin/users", adminMiddleware, async (req, res) => {
  try {
    const users = await storage.getAllUsers();
    const usersWithoutPasswords = users.map(({ passwordHash, ...user }) => user);
    res.json(usersWithoutPasswords);
  } catch (error: any) {
    console.error("Get all users error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/admin/conversations", adminMiddleware, async (req, res) => {
  try {
    const conversations = await storage.getAllConversationsWithUser();
    const conversationsWithoutPasswords = conversations.map(conv => ({
      ...conv,
      user: conv.user ? (() => {
        const { passwordHash, ...userWithoutPassword } = conv.user;
        return userWithoutPassword;
      })() : null
    }));
    res.json(conversationsWithoutPasswords);
  } catch (error: any) {
    console.error("Get all conversations error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/admin/messages", adminMiddleware, async (req, res) => {
  try {
    const messages = await storage.getAllMessages();
    res.json(messages);
  } catch (error: any) {
    console.error("Get all messages error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/admin/stats", adminMiddleware, async (req, res) => {
  try {
    const [userStats, messageStats, conversations] = await Promise.all([
      storage.getUserStats(),
      storage.getMessageStats(),
      storage.getAllConversationsWithUser()
    ]);

    res.json({
      users: userStats,
      messages: messageStats,
      totalConversations: conversations.length,
    });
  } catch (error: any) {
    console.error("Get stats error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Conversation endpoints
app.post("/api/conversations", authMiddleware, async (req, res) => {
  try {
    const data = insertConversationSchema.parse(req.body);
    const conversation = await storage.createConversation({
      ...data,
      userId: req.userId,
    });
    res.json(conversation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get messages for a conversation
app.get("/api/messages/:conversationId", authMiddleware, async (req, res) => {
  try {
    const { conversationId } = req.params;
    
    const conversation = await storage.getConversation(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    if (conversation.userId !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const messages = await storage.getMessagesByConversation(conversationId);
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Chat endpoint with Gemini
app.post("/api/chat", authMiddleware, async (req, res) => {
  try {
    const { conversationId, message, language = "en" } = req.body;

    if (!conversationId || !message) {
      return res.status(400).json({ error: "conversationId and message are required" });
    }

    const conversation = await storage.getConversation(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    if (conversation.userId !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Save user message
    await storage.createMessage({
      conversationId,
      userId: req.userId,
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
      userId: req.userId,
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
app.post("/api/analyze-image", authMiddleware, (req, res, next) => {
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

    const conversation = await storage.getConversation(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    if (conversation.userId !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const imageBase64 = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;

    const userMessage = message || "Uploaded an image for analysis";
    await storage.createMessage({
      conversationId,
      userId: req.userId,
      role: "user",
      content: userMessage,
    });

    const aiResponse = await analyzeAgriculturalImage(imageBase64, mimeType, message, language);

    const assistantMessage = await storage.createMessage({
      conversationId,
      userId: req.userId,
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
