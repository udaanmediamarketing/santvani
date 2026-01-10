// cloudStorage.js
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./r2.js";

export async function uploadToCloudStorage(
  buffer: Buffer,
  filename: string,
  userId: string,
  contentType = "application/pdf"
): Promise<string> {
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET;
  const publicBaseUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;

  if (!bucketName || !publicBaseUrl) {
    throw new Error("R2 environment variables not configured");
  }

  const key = `users/${userId}/uploads/article-files/${Date.now()}_${filename}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return `${publicBaseUrl}/${key}`;
}