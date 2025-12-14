// src/utils/emailTemplates.ts

export const approvalEmail = (name: string) => ({
  subject: "Your SantVani account is approved",
  text: `Hi ${name},\n\nYour SantVani account has been approved by the admin. You can now log in.\n\n— SantVani Team`
});

export const postApprovedEmail = (name: string, title: string) => ({
  subject: "Your post is approved",
  text: `Hi ${name},\n\nYour post "${title}" has been approved and is now visible on the dashboard.\n\n— SantVani Team`
});

export const sendEmailPlaceholder = async (to: string, mail: { subject: string; text: string }) => {
  console.log(`--- pretend-sending email to ${to} ---`);
  console.log("subject:", mail.subject);
  console.log("text:", mail.text);
 
};
