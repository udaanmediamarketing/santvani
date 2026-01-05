// import type { NextApiRequest, NextApiResponse } from "next";
// import formidable, { IncomingForm, Files, Fields } from "formidable";
// import fs from "fs";
// import { PutObjectCommand } from "@aws-sdk/client-s3";
// import { db } from "../../../db";
// import { eq } from "drizzle-orm";
// import { articles } from "../../../schema/articles";
// import { r2 } from "../../../backend/src/utils/r2";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const authorId = "00000000-0000-0000-0000-000000000001";

//   // POST — File Upload
//  if (req.method === "POST") {
//   const form = new IncomingForm({ multiples: false });

//   return form.parse(req, async (err, fields, files) => {
//     try {
//       if (err) {
//         console.error("Form parse error:", err);
//         return res.status(500).json({ error: "Form parsing error" });
//       }

//       const fileKey = Object.keys(files)[0];
//   const uploaded = files[fileKey];
//   const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;

//   if (!file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }
//       const bucketName = process.env.CLOUDFLARE_R2_BUCKET!;
//       const fileBuffer = fs.readFileSync(file.filepath);

//       const key = `users/${authorId}/uploads/article-files/${Date.now()}_${file.originalFilename}`;

//       await r2.send(
//         new PutObjectCommand({
//           Bucket: bucketName,
//           Key: key,
//           Body: fileBuffer,
//           ContentType: file.mimetype ?? "application/pdf",
//         })
//       );

//       const publicUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`;

//       const category = Array.isArray(fields.category)
//     ? fields.category[0]
//     : fields.category ?? "";

//   const title = Array.isArray(fields.title)
//     ? fields.title[0]
//     : fields.title ?? "";

//   const content = Array.isArray(fields.content)
//     ? fields.content[0]
//     : fields.content ?? "";

//       // IMPORTANT: Insert in DB
//       await db.insert(articles).values({
//     category,
//     title,
//     content,
//     pdfUrl: publicUrl,
//     authorId,
//     status: "pending",
//   });
//       return res.status(200).json({
//         message: "Article created",
//         pdfUrl: publicUrl,
//       });
//     } catch (error) {
//       console.error("Upload failed:", error);
//       return res.status(500).json({ error: "Upload failed" });
//     }
//   });
// }


//   // GET — Fetch articles
//   if (req.method === "GET") {
//     try {
//       const userArticles = await db
//         .select()
//         .from(articles)
//         .where(eq(articles.authorId, authorId))
//         .orderBy(articles.createdAt);

//       return res.status(200).json(userArticles);
//     } catch (error) {
//       return res.status(500).json({ error: "Failed to fetch articles" });
//     }
//   }

//   return res.status(405).json({ error: "Method not allowed" });
// }