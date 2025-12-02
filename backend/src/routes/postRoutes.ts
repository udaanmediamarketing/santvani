// src/routes/postRoutes.ts
import express from "express";
import { submitPost, listApprovedPosts } from "../controllers/postController"; // ✅ Remove .js
import { authenticate } from "../middlewares/authMiddleware"; // ✅ Remove .js

const router = express.Router();

router.post("/", authenticate, submitPost); // create post (user must be authenticated)
router.get("/approved", listApprovedPosts); // show approved posts

export default router;
