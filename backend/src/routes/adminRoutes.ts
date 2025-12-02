// src/routes/adminRoutes.ts
import express from "express";

import {
  getPendingUsersController,
  approveUserController,
  rejectUserController,
  getPendingPostsController,
  approvePostController,
  rejectPostController,
} from "../controllers/adminController"; // ✅ Remove .js

import {
  authenticate,
  authorizeAdmin
} from "../middlewares/authMiddleware"; // ✅ Remove .js

const router = express.Router();

/**
 * User Approval Routes
 */
router.get(
  "/pending-users",
  authenticate,
  authorizeAdmin,
  getPendingUsersController
);

router.put(
  "/approve-user/:id",
  authenticate,
  authorizeAdmin,
  approveUserController
);

router.put(
  "/reject-user/:id",
  authenticate,
  authorizeAdmin,
  rejectUserController
);

/**
 * Post Approval Routes
 */
router.get(
  "/pending-posts",
  authenticate,
  authorizeAdmin,
  getPendingPostsController
);

router.put(
  "/approve-post/:id",
  authenticate,
  authorizeAdmin,
  approvePostController
);

router.put(
  "/reject-post/:id",
  authenticate,
  authorizeAdmin,
  rejectPostController
);

export default router;
