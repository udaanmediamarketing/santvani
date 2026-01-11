// src/controllers/postController.ts
import { Request, Response } from "express";
import { createPost, getPosts, getPostsBySantName, getAllPosts, getPostBySlug} from "../models/postModel.js";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const createPostController = async (req: AuthRequest, res: Response) => {
  try {
    const { title, category, santname, content, image_url, youtube_url, slug } = req.body;

    const author_id = (req as AuthRequest).user?.id;
    if (!author_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const post = await createPost(
      title,
      category,
      santname, 
      content || null,
      image_url || null,
      youtube_url || null,
      slug,
      author_id,
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
export const listAllPosts = async (req: Request, res: Response) => {
  try{
    const posts = await getAllPosts();
    res.json({ posts });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
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

export const getPostBySlugController = async (
  req: Request,
  res: Response
) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ message: 'Slug is required' });
    }

    const post = await getPostBySlug(slug);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error('getPostBySlug error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};