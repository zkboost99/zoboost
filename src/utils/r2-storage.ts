import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Ensure environment variables exist
const accountId = process.env.R2_ACCOUNT_ID!;
const accessKeyId = process.env.R2_ACCESS_KEY_ID!;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!;
const region = process.env.R2_REGION || 'auto';
export const bucketName = process.env.R2_BUCKET_NAME!;

if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
  console.error("Cloudflare R2 storage credentials are not properly configured in the environment variables.");
}

// Initialize the S3 Client for Cloudflare R2
export const r2Client = new S3Client({
  region: region,
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

/**
 * Upload a file to Cloudflare R2
 */
export async function uploadFile(
  fileBuffer: Buffer | Uint8Array,
  fileName: string,
  mimeType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType,
  });

  try {
    await r2Client.send(command);
    // Return the public R2 URL
    return `https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev/${fileName}`;
  } catch (error) {
    console.error("Error uploading file to R2:", error);
    throw new Error("Failed to upload file to Cloudflare R2");
  }
}

/**
 * Delete a file from Cloudflare R2
 */
export async function deleteFile(fileName: string): Promise<boolean> {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: fileName,
  });

  try {
    await r2Client.send(command);
    return true;
  } catch (error) {
    console.error("Error deleting file from R2:", error);
    return false;
  }
}
