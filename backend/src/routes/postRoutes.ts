// src/routes/postRoutes.ts
import express from "express";
import { submitPost, listApprovedPosts } from "../controllers/postController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, submitPost); 
router.get("/approved", listApprovedPosts); 

export default router;
