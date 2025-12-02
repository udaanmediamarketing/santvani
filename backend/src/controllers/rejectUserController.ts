// src/controllers/rejectUserController.ts
import { Request, Response } from "express";
import { rejectUserById, findUserById } from "../models/userModel"; // ✅ removed .js
import { sendEmailPlaceholder, approvalEmail, rejectionEmail, postApprovedEmail } from "../utils/emailTemplates"; // ✅ removed .js

/**
 * Reject a user account
 * - Sets status to 'rejected'
 * - Sends notification email to the user
 */
export const rejectUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Update user status to 'rejected'
    await rejectUserById(id);

    // Fetch user to send email notification
    const user = await findUserById(id);
    if (user) {
      await sendEmailPlaceholder(user.email, rejectionEmail(user.name));
    }

    res.status(200).json({ message: "User rejected successfully" });
  } catch (err) {
    console.error("Error rejecting user:", err);
    res.status(500).json({ error: "Server error" });
  }
};
