// src/routes/authRoutes.ts

import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const router = express.Router();

router.post("/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const { rows, rowCount } = await pool.query(
      `
      SELECT id, name, email, password, role, status
      FROM users
      WHERE LOWER(email) = LOWER($1)
      LIMIT 1
      `,
      [email]
    );

    if (!rowCount) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = rows[0];

    if (user.status !== "approved") {
      return res.status(403).json({
        message: "Account not approved by admin",
      });
    }

    if (!user.password) {
      console.error("❌ Password missing for user:", user.email);
      return res.status(500).json({
        message: "Password not set for user",
      });
    }

    console.log("📧 Email:", email);
    console.log("🔐 Entered Password:", password);
    console.log("🗄️ Stored Hash:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("✅ Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET missing in .env");
      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

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
  } catch (err) {
    console.error("❌ Signin error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;
