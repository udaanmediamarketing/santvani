// src/routes/adminRoutes.ts
import express from "express";
import { getPendingUsersController, approveUserController, rejectUserController, getPendingPostsController, publishPostController, rejectPostController, getPendingOrgsController, publishOrgController, rejectOrgController, getAdminPostController, editPostController } from "../controllers/adminController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.get("/pending-users", authenticate, authorizeAdmin, getPendingUsersController);
router.put("/approve-user/:id", authenticate, authorizeAdmin, approveUserController);
router.put("/reject-user/:id", authenticate, authorizeAdmin, rejectUserController);
router.get("/pending-posts", authenticate, authorizeAdmin, getPendingPostsController);
router.put("/publish-post/:id", authenticate, authorizeAdmin, publishPostController);
router.put("/reject-post/:id", authenticate, authorizeAdmin, rejectPostController);
router.get("/get-post/:id", authenticate, authorizeAdmin, getAdminPostController);
router.put("/edit-post/:id", authenticate, authorizeAdmin, async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(400).json({ error: "User id is not present" });
    }
    await editPostController(req, res);
});
router.get("/pending-orgs", authenticate, authorizeAdmin, getPendingOrgsController);
router.put("/publish-org/:id", authenticate, authorizeAdmin, publishOrgController);
router.put("/reject-org/:id", authenticate, authorizeAdmin, rejectOrgController);
export default router;
//# sourceMappingURL=adminRoutes.js.map