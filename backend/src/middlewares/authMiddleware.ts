// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import { findUserById } from "../models/userModel.js";

export interface AuthRequest extends Request {
  user?: { id: string; role?: string; email?: string };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token" });
  const token = auth.split(" ")[1];
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Invalid token" });
  const user = await findUserById(payload.id);
  if (!user) return res.status(401).json({ error: "User not found" });
  req.user = { id: user.id, role: user.role, email: user.email };
  next();
};

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  if (req.user.role !== "admin") return res.status(403).json({ error: "Admin only" });
  next();
};
