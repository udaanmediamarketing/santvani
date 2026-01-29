import { Request, Response } from "express";
import { createPost, getPosts, getPostsBySantName, getAllPosts, getPostBySlug, getPostsByCategory} from "../models/postModel.js";
import { createOrganization, getOrgsByUserId, getAllOrgs } from "../models/orgModel.js";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const dashboardController = async (req: AuthRequest, res: Response) => {
  try {
    const [
      allPosts,
      kirtanPosts,
      organizations,
    ] = await Promise.all([
      getAllPosts({ limit: 20 }),
      getPostsByCategory('किर्तन', { limit: 6 }),
      getAllOrgs(),
    ]);

    res.json({
      posts: allPosts,
      movingNews: allPosts.slice(0, 5),
      editorPosts: allPosts.slice(0, 6),
      readMorePosts: allPosts.slice(0, 10),
      kirtanPosts,
      organizations,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Dashboard fetch failed' });
  }
};