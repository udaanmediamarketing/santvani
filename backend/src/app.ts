// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes";       // ✅ Removed .js
import adminRoutes from "./routes/adminRoutes";     // ✅ Removed .js
import postRoutes from "./routes/postRoutes";       // ✅ Removed .js
import { errorHandler } from "./middlewares/errorHandler"; // ✅ Removed .js

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/posts", postRoutes);

// ✅ Health check endpoint
app.get("/", (req, res) => res.status(200).send({ status: "ok" }));

// ✅ Global error handler
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});

export default app;
