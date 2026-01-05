// src/routes/adminRoutes.ts
import express from "express";
import { getPendingUsersController, approveUserController, rejectUserController, getPendingPostsController, publishPostController, rejectPostController } from "../controllers/adminController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/pending-users", authenticate, authorizeAdmin, getPendingUsersController);
router.put("/approve-user/:id", authenticate, authorizeAdmin, approveUserController);
router.put("/reject-user/:id", authenticate, authorizeAdmin, rejectUserController);

router.get("/pending-posts", authenticate, authorizeAdmin, getPendingPostsController);
router.put("/publish-post/:id", authenticate, authorizeAdmin, publishPostController);
router.put("/reject-post/:id", authenticate, authorizeAdmin, rejectPostController);

export default router;
