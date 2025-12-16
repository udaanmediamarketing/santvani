// src/controllers/authController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../models/userModel.js";
import { signToken } from "../utils/jwt.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await findUserByEmail(email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(
      name,
      email.toLowerCase(),
      hashedPassword
    );

    return res.status(201).json({
      message: "Registration successful. Await admin approval.",
      user: {
        id: newUser.id,
        email: newUser.email,
        status: newUser.status,
      },
    });
  } catch (error) {
    console.error("❌ REGISTER ERROR:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await findUserByEmail(email.toLowerCase());

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (!user.password) {
      console.error("❌ User has NULL password:", user.email);
      return res.status(500).json({ error: "User password misconfigured" });
    }

    if (user.status !== "approved") {
      return res.status(403).json({
        error: "Account not approved by admin",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = signToken({
      id: user.id,
      role: user.role,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
