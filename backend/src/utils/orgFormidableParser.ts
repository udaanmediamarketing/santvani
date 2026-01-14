import formidable from "formidable";
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import { Request, Response } from "express";
import { uploadToCloudStorage } from "./cloudStorage.js";

export interface ParsedOrganizationFormData {
  orgType: string | null;
  orgName: string;
  address: string | null;
  city: string;
  state: string;
  pincode: string | null;
  headName: string;
  email: string | null;
  imageUrl: string | null;
  userId: string;
}

export async function parseOrganizationFormData(
  req: Request,
  res: Response,
  userId: string
): Promise<ParsedOrganizationFormData | null> {
  return new Promise((resolve) => {
    const uploadDir = path.join(process.cwd(), "uploads/temp");

    if (!fsSync.existsSync(uploadDir)) {
      fsSync.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      multiples: false,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFieldsSize: 10 * 1024 * 1024,
      keepExtensions: true,
      uploadDir,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Formidable parse error:", err);
        res.status(400).json({ error: "Form parse failed" });
        return resolve(null);
      }

      /* ---------------- HELPERS ---------------- */
      const getField = (key: string): string | null => {
        const value = fields[key];
        if (typeof value === "string") return value;
        if (Array.isArray(value)) return value[0] ?? null;
        return null;
      };

      /* ---------------- REQUIRED FIELDS ---------------- */
      const orgName = getField("orgName");
      const city = getField("city");
      const state = getField("state");
      const headName = getField("headName");
      

      if (!orgName || !city || !state || !headName) {
        res.status(400).json({ error: "Required fields missing" });
        return resolve(null);
      }
      /* ---------------- OPTIONAL FIELDS ---------------- */
      const email = getField("email");
      const orgType = getField("orgType");
      const address = getField("address");
      const pincode = getField("pincode");
      /* ---------------- IMAGE UPLOAD ---------------- */
      let imageUrl: string | null = null;

      const fileKey = Object.keys(files)[0];
      const imageFile = fileKey
        ? Array.isArray(files[fileKey])
          ? files[fileKey][0]
          : files[fileKey]
        : null;

      if (imageFile) {
        try {
          const buffer = await fs.readFile(imageFile.filepath);
          imageUrl = await uploadToCloudStorage(
            buffer,
            imageFile.originalFilename || "organization.jpg",
            userId
          );

          // cleanup temp file
          await fs.unlink(imageFile.filepath).catch(console.error);
        } catch (uploadErr) {
          console.error("Image upload failed:", uploadErr);
          res.status(500).json({ error: "Image upload failed" });
          return resolve(null);
        }
      } 

      resolve({
        orgType,
        orgName,
        address,
        city,
        state,
        pincode,
        headName,
        email,
        imageUrl,
        userId,
      });
    });
  });
}
