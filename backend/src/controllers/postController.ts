// src/controllers/postController.ts
import { Request, Response } from "express";
import { createPost, getApprovedPosts } from "../models/postModel.js";

export const submitPost = async (req: Request, res: Response) => {
  try {
    const { title, category, content, pdf_url } = req.body;
    const author_id = (req as any).user?.id || null; 
    const post = await createPost(title, category, content || null, pdf_url || null, author_id);
    res.status(201).json({ message: "Post submitted for review", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const listApprovedPosts = async (req: Request, res: Response) => {
  const posts = await getApprovedPosts();
  res.json({ posts });
};
