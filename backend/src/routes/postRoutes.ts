// src/routes/postRoutes.ts
import express from "express";
import { createPostController, listPosts, listAllPosts, listPostsBySantName, getPostBySlugController, listPostsByCategory } from "../controllers/postController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { parseFormData } from "../utils/formidableParser.js";
import { Request, Response } from "express";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

const router = express.Router();

router.get("/list-posts-by-sant/:name", listPostsBySantName);
router.get("/list-all-posts", listAllPosts);
router.get("/list-posts/:id", listPosts); 
router.get('/list-posts-by-category/:category', listPostsByCategory);
router.get('/get-by-slug/:slug', getPostBySlugController);
router.post("/create-post", authenticate, async (req: Request, res: Response) => {
  const userId = (req as AuthRequest)?.user?.id;
  if(!userId) {
    return res.status(400).json({ error: "User id is not present" });
  }
  const parsedData = await parseFormData(req, res, userId);

  if (!parsedData) {
    return;
  }
  const fakeReq = { body: parsedData, user: (req as AuthRequest).user } as AuthRequest;
  
  await createPostController(fakeReq, res);
}); 
export default router;