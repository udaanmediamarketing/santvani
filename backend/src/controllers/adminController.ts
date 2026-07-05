import { Request, Response } from "express";
import {
  listPendingUsers,
  approveUserById,
  rejectUserById,
  findUserById,
} from "../models/userModel.js";

import {
  getPendingPosts,
  approvePostById,
  getPostById,
  updatePost,
  updatePostStatus,
} from "../models/postModel.js";

import {
  getPendingOrgs,
  updateOrgStatus
} from "../models/orgModel.js";
import {
  sendSignupApprovalEmail,
  sendSignUpRejectionEmail
} from "../utils/emailTemplates.js";
import { parseFormData } from "../utils/formidableParser.js";

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
      await sendSignupApprovalEmail({
      to: updatedUser.email,
      name: updatedUser.name,
    });
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
      await sendSignUpRejectionEmail({
      to: updatedUser.email,
      name: updatedUser.name,
    });
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


export const getPendingOrgsController = async (
  req: Request,
  res: Response
) => {
  try {
    const posts = await getPendingOrgs();
    return res.status(200).json({ posts });
  } catch (error) {
    console.error("❌ Error fetching pending posts:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const publishOrgController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await updateOrgStatus(id, "published");

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

export const rejectOrgController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await updateOrgStatus(id, "rejected");

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

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const getAdminPostController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`[getAdminPost] Fetching post with id: ${id}`);
    const post = await getPostById(id);
    if (!post) {
      console.warn(`[getAdminPost] Post not found for id: ${id}`);
      return res.status(404).json({ error: "Post not found" });
    }
    console.log(`[getAdminPost] Post found: ${post.title} (status: ${post.status})`);
    return res.status(200).json({ post });
  } catch (error) {
    console.error("[getAdminPost] Error fetching post:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const editPostController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as AuthRequest).user?.id;
    if (!userId) {
      return res.status(400).json({ error: "User id is not present" });
    }

    const parsedData = await parseFormData(req, res, userId);
    if (!parsedData) return;

    let image_url = parsedData.image_url;
    if (!image_url) {
      const existing = await getPostById(id);
      image_url = existing?.image_url || null;
    }

    const updated = await updatePost(id, {
      title: parsedData.title,
      category: parsedData.category,
      santname: parsedData.santname,
      content: parsedData.content,
      image_url,
      youtube_url: parsedData.youtube_url,
      slug: parsedData.slug,
    });

    if (!updated) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({
      message: "Post updated successfully",
      post: updated,
    });
  } catch (error) {
    console.error("Error editing post:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

