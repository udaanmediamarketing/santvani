import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';
import { Request, Response } from 'express';
import { uploadToCloudStorage } from './cloudStorage.js';
import fsSync from 'fs';

interface ParsedFormData {
  title: string;
  category: string;
  content: string | null;
  image_url: string | null;
  userId: string;
}

export async function parseFormData(req: Request, res: Response, userId: string): Promise<ParsedFormData | null> {
  return new Promise((resolve, reject) => {
    const uploadDir = path.join(process.cwd(), 'uploads/temp');

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
        console.error('Formidable parse error:', err);
        res.status(400).json({ error: 'File upload failed' });
        return resolve(null);
      }

      // Extract fields (handle Formidable's array wrapping)
      const title =
  typeof fields.title === 'string'
    ? fields.title
    : Array.isArray(fields.title)
    ? fields.title[0]
    : '';
const category =
  typeof fields.category === 'string'
    ? fields.category
    : Array.isArray(fields.category)
    ? fields.category[0]
    : '';
      const content = Array.isArray(fields.content) ? fields.content[0] || null : fields.content || null;

      // Handle image file
      let image_url: string | null = null;
      const fileKey = Object.keys(files)[0];
const pdfFile = fileKey
  ? (Array.isArray(files[fileKey]) ? files[fileKey][0] : files[fileKey])
  : null;

      
      if (pdfFile) {
        try {
          const buffer = await fs.readFile(pdfFile.filepath);
          image_url = await uploadToCloudStorage(buffer, pdfFile.originalFilename || 'post.img', userId);
          
          // Clean up temp file
          await fs.unlink(pdfFile.filepath).catch(console.error);
        } catch (uploadErr) {
          console.error('PDF upload failed:', uploadErr);
          res.status(500).json({ error: 'PDF upload failed' });
          return resolve(null);
        }
      }

      resolve({ title, category, content, image_url, userId });
    });
  });
}