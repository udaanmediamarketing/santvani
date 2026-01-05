// src/routes/postRoutes.ts
import express from "express";
import { createPostController, listPosts, listPostsBySantName } from "../controllers/postController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { parseFormData } from "../utils/formidableParser.js";

const router = express.Router();

router.get("/list-posts-by-sant/:name", listPostsBySantName);
router.get("/list-posts/:id", listPosts); 
router.post("/create-post", authenticate, async (req, res) => {
  const parsedData = await parseFormData(req, res);
  
  if (!parsedData) {
    return;
  }
  const fakeReq = { body: parsedData, user: (req as any).user } as any;
  
  await createPostController(fakeReq, res);
}); 
export default router;