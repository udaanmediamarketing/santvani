// // src/controllers/adminController.ts
// import { Request, Response } from "express";

// import {
//   listPendingUsers,
//   approveUserById,
//   rejectUserById,
//   findUserById,
// } from "../models/userModel.js";

// import {
//   getPendingPosts,
//   approvePostById,
//   rejectPostById,
//   getPostById,
// } from "../models/postModel.js";

// import {
//   sendEmailPlaceholder,
//   approvalEmail,
//   rejectionEmail,
//   postApprovedEmail,
// } from "../utils/emailTemplates.js";

// /**
//  * Get all users with status 'pending'
//  */
// export const getPendingUsersController = async (req: Request, res: Response) => {
//   try {
//     const users = await listPendingUsers();
//     res.status(200).json({ users });
//   } catch (err) {
//     console.error("Error fetching pending users:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// /**
//  * Approve a user
//  */
// export const approveUserController = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     if (!id) return res.status(400).json({ error: "User ID is required" });

//     await approveUserById(id);

//     const user = await findUserById(id);
//     if (user) {
//       await sendEmailPlaceholder(user.email, approvalEmail(user.name));
//     }

//     res.status(200).json({ message: "User approved successfully" });
//   } catch (err) {
//     console.error("Error approving user:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// /**
//  * Reject a user
//  */
// export const rejectUserController = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     if (!id) return res.status(400).json({ error: "User ID is required" });

//     await rejectUserById(id);

//     const user = await findUserById(id);
//     if (user) {
//       await sendEmailPlaceholder(user.email, rejectionEmail(user.name));
//     }

//     res.status(200).json({ message: "User rejected successfully" });
//   } catch (err) {
//     console.error("Error rejecting user:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// /**
//  * Get all pending posts
//  */
// export const getPendingPostsController = async (req: Request, res: Response) => {
//   try {
//     const posts = await getPendingPosts();
//     res.status(200).json({ posts });
//   } catch (err) {
//     console.error("Error fetching pending posts:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// /**
//  * Approve a post
//  */
// export const approvePostController = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     if (!id) return res.status(400).json({ error: "Post ID is required" });

//     await approvePostById(id);

//     const post = await getPostById(id);
//     if (post && post.author_id) {
//       const author = await findUserById(post.author_id);

//       if (author) {
//         await sendEmailPlaceholder(
//           author.email,
//           postApprovedEmail(author.name, post.title)
//         );
//       }
//     }

//     res.status(200).json({ message: "Post approved successfully" });
//   } catch (err) {
//     console.error("Error approving post:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// /**
//  * Reject a post
//  */
// export const rejectPostController = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     if (!id) return res.status(400).json({ error: "Post ID is required" });

//     await rejectPostById(id);

//     const post = await getPostById(id);
//     if (post && post.author_id) {
//       const author = await findUserById(post.author_id);

//       if (author) {
//         await sendEmailPlaceholder(
//           author.email,
//           `Subject: Post Rejected\n\nHi ${author.name},\n\nYour post titled "${post.title}" has been rejected by the admin.\n\nRegards,\nAdmin Team`
//         );
//       }
//     }

//     res.status(200).json({ message: "Post rejected successfully" });
//   } catch (err) {
//     console.error("Error rejecting post:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };
// src/controllers/adminController.ts
// src/controllers/adminController.ts
import { Request, Response } from "express";
import {
  listPendingUsers,
  approveUserById,
  rejectUserById,
  findUserById,
} from "../models/userModel"; // ✅ Remove .js

import {
  getPendingPosts,
  approvePostById,
  rejectPostById,
  getPostById,
} from "../models/postModel"; // ✅ Remove .js

import {
  sendEmailPlaceholder,
  approvalEmail,
  rejectionEmail,
  postApprovedEmail,
} from "../utils/emailTemplates"; // ✅ Remove .js

/**
 * Get all pending users
 */
export const getPendingUsersController = async (req: Request, res: Response) => {
  try {
    const users = await listPendingUsers();
    res.status(200).json({ users });
  } catch (err) {
    console.error("❌ Error fetching pending users:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Approve a user
 */
export const approveUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "User ID is required" });

    await approveUserById(id);

    const user = await findUserById(id);
    if (user) await sendEmailPlaceholder(user.email, approvalEmail(user.name));

    res.status(200).json({ message: "✅ User approved successfully" });
  } catch (err) {
    console.error("❌ Error approving user:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Reject a user
 */
export const rejectUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "User ID is required" });

    await rejectUserById(id);

    const user = await findUserById(id);
    if (user) await sendEmailPlaceholder(user.email, rejectionEmail(user.name));

    res.status(200).json({ message: "✅ User rejected successfully" });
  } catch (err) {
    console.error("❌ Error rejecting user:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get all pending posts
 */
export const getPendingPostsController = async (req: Request, res: Response) => {
  try {
    const posts = await getPendingPosts();
    res.status(200).json({ posts });
  } catch (err) {
    console.error("❌ Error fetching pending posts:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Approve a post
 */
export const approvePostController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Post ID is required" });

    await approvePostById(id);

    const post = await getPostById(id);
    if (post?.author_id) {
      const author = await findUserById(post.author_id);
      if (author)
        await sendEmailPlaceholder(
          author.email,
          postApprovedEmail(author.name, post.title)
        );
    }

    res.status(200).json({ message: "✅ Post approved successfully" });
  } catch (err) {
    console.error("❌ Error approving post:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Reject a post
 */
export const rejectPostController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Post ID is required" });

    await rejectPostById(id);

    const post = await getPostById(id);
    if (post?.author_id) {
      const author = await findUserById(post.author_id);
      if (author)
        await sendEmailPlaceholder(
          author.email,
          `Subject: Post Rejected\n\nHi ${author.name},\nYour post titled "${post.title}" was rejected.\nRegards,\nAdmin Team`
        );
    }

    res.status(200).json({ message: "✅ Post rejected successfully" });
  } catch (err) {
    console.error("❌ Error rejecting post:", err);
    res.status(500).json({ error: "Server error" });
  }
};
