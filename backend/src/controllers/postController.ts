// src/controllers/postController.ts
import { Request, Response } from "express";
import { createPost, getPosts, getPostsBySantName } from "../models/postModel.js";

export const createPostController = async (req: Request, res: Response) => {
  try {
    const { title, category, content, image_url } = req.body;

    const author_id = (req as any).user?.id;
    if (!author_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const post = await createPost(
      title,
      category,
      content || null,
      image_url || null,
      author_id
    );

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const listPosts = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
      return res.status(400).json({ error: "User ID is required" });
  }
  const posts = await getPosts(id);
  res.json({ posts });
};

export const listPostsBySantName = async (req: Request, res: Response) => {
  const { name } = req.params;
  if (!name) {
      return res.status(400).json({ error: "Sant name is required" });
  }
  const posts = await getPostsBySantName(name);
  res.json({ posts });
};