// src/controllers/authController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../models/userModel"; // ✅ removed .js
import { signToken } from "../utils/jwt"; // ✅ removed .js

/**
 * Register a new user
 * Status will be 'pending' by default
 */
export const register = async (req: Request, res: Response) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    email = email.toLowerCase().trim();

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(name, email, hashedPassword);

    res.status(201).json({
      message: "Registration successful. Wait for admin approval.",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Login user
 * Only allows login if status is 'approved'
 */
export const login = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    email = email.toLowerCase().trim();

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.status !== "approved") {
      return res.status(403).json({ error: "Account pending admin approval" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken({ id: user.id, role: user.role });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
