// src/controllers/adminController.ts

import { Request, Response } from "express";
import {
  listPendingUsers,
  approveUserById,
  rejectUserById,
  rejectUserById,
  findUserById,
} from "../models/userModel.js";

import {
  getPendingPosts,
  approvePostById,
} from "../models/postModel.js";

import {
  sendEmailPlaceholder,
  approvalEmail,
  postApprovedEmail,
} from "../utils/emailTemplates.js";
import { updatePostStatus } from "../models/postModel.js";

export const getPendingUsersController = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await listPendingUsers();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("❌ Error fetching pending users:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


export const approveUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const updatedUser = await approveUserById(id);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    try {
      await sendEmailPlaceholder(
        updatedUser.email,
        approvalEmail(updatedUser.name)
      );
    } catch (mailErr) {
      console.warn("⚠️ Email sending failed:", mailErr);
    }

    return res.status(200).json({
      message: "User approved successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Approve user error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const rejectUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const updatedUser = await rejectUserById(id);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    try {
      await sendEmailPlaceholder(
        updatedUser.email,
        approvalEmail(updatedUser.name)
      );
    } catch (mailErr) {
      console.warn("⚠️ Email sending failed:", mailErr);
    }

    return res.status(200).json({
      message: "User approved successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Approve user error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getPendingPostsController = async (
  req: Request,
  res: Response
) => {
  try {
    const posts = await getPendingPosts();
    return res.status(200).json({ posts });
  } catch (error) {
    console.error("❌ Error fetching pending posts:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


export const publishPostController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await updatePostStatus(id, "published");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({
      message: "Post published successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const rejectPostController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await updatePostStatus(id, "rejected");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({
      message: "Post rejected successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};