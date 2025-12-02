// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt"; // ✅ Remove .js
import { findUserById } from "../models/userModel"; // ✅ Remove .js

export interface AuthRequest extends Request {
  user?: { id: string; role?: string; email?: string };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "Authorization header missing" });

    const parts = auth.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid authorization format. Use: Bearer <token>" });
    }

    const token = parts[1];
    let payload;
    try {
      payload = verifyToken(token);
    } catch (e) {
      console.error("Token verification error:", e);
      return res.status(401).json({ error: "Invalid token" });
    }

    if (!payload || !payload.id) return res.status(401).json({ error: "Invalid token payload" });

    const user = await findUserById(payload.id);
    if (!user) return res.status(401).json({ error: "User not found" });

    // Ensure user is approved (admins should also be approved)
    if (user.status !== "approved") {
      return res.status(403).json({ error: "Account not approved by admin" });
    }

    req.user = { id: user.id, role: user.role, email: user.email };
    next();
  } catch (err) {
    console.error("Authentication middleware error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  if (req.user.role !== "admin") return res.status(403).json({ error: "Admin only" });
  next();
};
