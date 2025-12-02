// // src/server.ts
// import express, { Request, Response } from "express";
// import cors from "cors";
// import { Pool } from "pg";
// import bcrypt from "bcryptjs";
// import adminRoutes from "./src/routes/adminRoutes.ts"; // ✅ fixed path


// // ✅ Express app setup
// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use("/api/admin", adminRoutes);

// // ✅ PostgreSQL (Neon) setup
// export const pool = new Pool({
//   connectionString:
//     "postgresql://neondb_owner:npg_bsJD02AXYHkz@ep-plain-sun-a1l6lil5-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
//   ssl: { rejectUnauthorized: false },
// });

// // ✅ Test DB connection
// pool
//   .connect()
//   .then(() => console.log("✅ Connected to Neon PostgreSQL"))
//   .catch((err) => console.error("❌ DB connection error:", err));

// // ✅ Root route
// app.get("/", (req: Request, res: Response) => {
//   res.send("✅ TypeScript + Express + ESM setup working!");
// });

// // ✅ Create ENUM safely (only if not exists)
// const createEnumIfNotExists = async () => {
//   try {
//     const enumExists = await pool.query(
//       `SELECT 1 FROM pg_type WHERE typname = 'user_status';`
//     );

//     if (enumExists.rowCount === 0) {
//       await pool.query(
//         `CREATE TYPE user_status AS ENUM ('pending', 'approved', 'rejected');`
//       );
//       console.log("✅ ENUM 'user_status' created.");
//     } else {
//       console.log("ℹ️ ENUM 'user_status' already exists.");
//     }
//   } catch (error) {
//     console.error("❌ Error creating ENUM:", error);
//   }
// };
// createEnumIfNotExists();

// // ✅ Signup route (hashed password)
// app.post("/api/auth/signup", async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const result = await pool.query(
//       "INSERT INTO users (name, email, password, status) VALUES ($1, $2, $3, 'pending') RETURNING *",
//       [name, email, hashedPassword]
//     );

//     res.status(201).json({
//       message: "✅ User registered successfully!",
//       user: result.rows[0],
//     });
//   } catch (error: any) {
//     console.error("❌ Signup error:", error);
//     res.status(500).json({ error: "Server error during signup." });
//   }
// });

// // ✅ Signin route (bcrypt check)
// app.post("/api/auth/signin", async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const result = await pool.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);

//     if (result.rows.length === 0)
//       return res.status(401).json({ error: "Invalid credentials" });

//     const user = result.rows[0];
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch)
//       return res.status(401).json({ error: "Invalid credentials" });

//     res.status(200).json({
//       message: "✅ Signin successful!",
//       user,
//     });
//   } catch (error: any) {
//     console.error("❌ Signin error:", error);
//     res.status(500).json({ error: "Server error during signin." });
//   }
// });

// // ✅ Start the server
// const PORT = 5000;
// app.listen(PORT, () =>
//   console.log(`🚀 Server running on http://localhost:${PORT}`)
// );
// src/server.ts
// server.ts
import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

import adminRoutes from "./src/routes/adminRoutes.ts";
import pool from "./src/config/db.ts";



const app = express();

// --- Middleware ---
app.use(express.json());
app.use(cors());

// --- Database Setup: Create ENUM Safely ---
const createEnumIfNotExists = async () => {
  try {
    const enumExists = await pool.query(
      `SELECT 1 FROM pg_type WHERE typname = 'user_status';`
    );

    if (enumExists.rowCount === 0) {
      await pool.query(
        `CREATE TYPE user_status AS ENUM ('pending', 'approved', 'rejected');`
      );
      console.log("✅ ENUM 'user_status' created.");
    } else {
      console.log("ℹ️ ENUM 'user_status' already exists.");
    }
  } catch (error) {
    console.error("❌ Error creating ENUM:", error);
  }
};
createEnumIfNotExists();

// --- Routes ---
app.use("/api/admin", adminRoutes);

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send({ status: "ok", message: "TypeScript + Express + PostgreSQL running!" });
});

// --- Auth Routes ---
app.post("/api/auth/signup", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, status)
       VALUES ($1, $2, $3, 'pending')
       RETURNING id, name, email, status`,
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "✅ User registered! Status is pending.",
      user: result.rows[0],
    });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "Email already in use." });
    }
    console.error("❌ Signup error:", error);
    res.status(500).json({ error: "Server error during signup." });
  }
});

app.post("/api/auth/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const { password: _, ...userInfo } = user;
    res.status(200).json({ message: "✅ Signin successful!", user: userInfo });
  } catch (error: any) {
    console.error("❌ Signin error:", error);
    res.status(500).json({ error: "Server error during signin." });
  }
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
