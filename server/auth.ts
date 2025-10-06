import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { Request, Response, NextFunction } from "express";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";

export interface JWTPayload {
  userId: string;
  email?: string;
  phone?: string;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const payload = verifyToken(token);
    req.userId = payload.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function optionalAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");

    if (token) {
      const payload = verifyToken(token);
      req.userId = payload.userId;
    }
  } catch (error) {
  }
  next();
}

export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const payload = verifyToken(token);
    req.userId = payload.userId;

    const { storage } = await import("./storage.js");
    const user = await storage.getUserById(payload.userId);

    if (!user || user.isAdmin !== 1) {
      return res.status(403).json({ error: "Admin access required" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
