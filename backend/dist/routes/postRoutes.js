// src/routes/postRoutes.ts
import express from "express";
import { createPostController, listPosts, listAllPosts, listPostsBySantName, getPostBySlugController, listByCategoryController, listPostsByCategoryController, listGalleryPosts, listPostsByCategory, } from "../controllers/postController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { parseFormData } from "../utils/formidableParser.js";
const router = express.Router();
//router.get("/search", searchPostsController); ---------------- searchPostsController
router.get("/gallery", listGalleryPosts);
router.get("/list-by-category", listByCategoryController);
router.get("/list-by-category/:category", listPostsByCategoryController);
router.get("/list-posts-by-sant/:name", listPostsBySantName);
router.get("/list-all-posts", listAllPosts);
router.get("/list-posts/:id", listPosts);
router.get('/list-posts-by-category/:category', listPostsByCategory);
router.get('/get-by-slug/:slug', getPostBySlugController);
router.post("/create-post", authenticate, async (req, res) => {
    const userId = req?.user?.id;
    if (!userId) {
        return res.status(400).json({ error: "User id is not present" });
    }
    const parsedData = await parseFormData(req, res, userId);
    if (!parsedData) {
        return;
    }
    const fakeReq = { body: parsedData, user: req.user };
    await createPostController(fakeReq, res);
});
export default router;
//# sourceMappingURL=postRoutes.js.map