// src/utils/emailTemplates.ts

// Placeholder email sender (replace with real mailer)
export const sendEmailPlaceholder = async (to: string, message: string) => {
  console.log("Sending email to:", to);
  console.log("Message:", message);
  // Implement real sending with Nodemailer / SendGrid when ready
};

// User approval template
export const approvalEmail = (name: string) => `
Hi ${name},

Your account has been approved by the admin. You can now log in.

Regards,
Admin Team
`;

// User rejection template
export const rejectionEmail = (name: string) => `
Hi ${name},

We are sorry to inform you that your account has been rejected by the admin.

Regards,
Admin Team
`;

// Post approved template
export const postApprovedEmail = (name: string, postTitle: string) => `
Hi ${name},

Your post titled "${postTitle}" has been approved by the admin.

Regards,
Admin Team
`;

// Post rejected template (optional, recommended)
export const postRejectedEmail = (name: string, postTitle: string) => `
Hi ${name},

We're sorry — your post titled "${postTitle}" has been rejected by the admin.

Regards,
Admin Team
`;
