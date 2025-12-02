// src/controllers/postController.ts
import { Request, Response } from "express";
import {
  createPost,
  getApprovedPosts,
  getPostById,
} from "../models/postModel"; // ✅ removed .js
import { AuthRequest } from "../middlewares/authMiddleware"; // ✅ removed .js

/**
 * Submit a post (goes to 'pending' state until admin approves)
 */
export const submitPost = async (req: AuthRequest, res: Response) => {
  try {
    const { title, category, content, pdf_url } = req.body;

    const author_id = req.user?.id || null;

    const post = await createPost(
      title,
      category,
      content || null,
      pdf_url || null,
      author_id
    );

    res.status(201).json({
      message: "Post submitted for admin review",
      post,
    });
  } catch (err) {
    console.error("❌ Error submitting post:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get all approved posts (visible to all users)
 */
export const listApprovedPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getApprovedPosts();
    res.status(200).json({ posts });
  } catch (err) {
    console.error("❌ Error listing approved posts:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get a single post by ID (preview for users)
 */
export const getSinglePostController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const post = await getPostById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    res.status(200).json({ post });
  } catch (err) {
    console.error("❌ Error fetching single post:", err);
    res.status(500).json({ error: "Server error" });
  }
};
