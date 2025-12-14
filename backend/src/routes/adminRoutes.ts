// src/routes/adminRoutes.ts
import express from "express";
import { getPendingUsersController, approveUserController, getPendingPostsController, approvePostController } from "../controllers/adminController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/pending-users", authenticate, authorizeAdmin, getPendingUsersController);
router.put("/approve-user/:id", authenticate, authorizeAdmin, approveUserController);

router.get("/pending-posts", authenticate, authorizeAdmin, getPendingPostsController);
router.put("/approve-post/:id", authenticate, authorizeAdmin, approvePostController);

export default router;
