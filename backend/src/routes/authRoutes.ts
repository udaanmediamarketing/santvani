// src/routes/authRoutes.ts
import express from "express";
import pool from "../config/db"; // ✅ Remove .js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

// 🧠 Sign In Route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ message: "User not found" });

    // Approval check (admin bypass)
    if (user.role !== "admin" && user.status !== "approved") {
      return res.status(403).json({ message: "Account not approved by admin" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET missing in environment!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
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
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
