// cloudStorage.js
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./r2.js";
function getContentType(filename) {
    const ext = filename.split(".").pop()?.toLowerCase();
    const mimeMap = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        webp: "image/webp",
        svg: "image/svg+xml",
        pdf: "application/pdf",
    };
    return mimeMap[ext || ""] || "application/octet-stream";
}
export async function uploadToCloudStorage(buffer, filename, userId, contentType) {
    const bucketName = process.env.CLOUDFLARE_R2_BUCKET;
    const publicBaseUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
    if (!bucketName || !publicBaseUrl) {
        throw new Error("R2 environment variables not configured");
    }
    const key = `users/${userId}/uploads/article-files/${Date.now()}_${filename}`;
    const resolvedContentType = contentType || getContentType(filename);
    await r2.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: resolvedContentType,
    }));
    return `${publicBaseUrl}/${key}`;
}
//# sourceMappingURL=cloudStorage.js.map