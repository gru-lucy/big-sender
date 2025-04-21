import { S3Client } from "@aws-sdk/client-s3";

// Ensure required env vars are present
const accountId = process.env.NEXT_PUBLIC_R2_ACCOUNT_ID;
const accessKeyId = process.env.NEXT_PUBLIC_R2_ACCESS_KEY_ID;
const secretKey = process.env.NEXT_PUBLIC_R2_SECRET_ACCESS_KEY;
const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;
if (!accountId || !accessKeyId || !secretKey) {
  throw new Error("R2 credentials are not set in environment variables");
}

// Create an S3 client configured for Cloudflare R2
export const r2Client = new S3Client({
  region: "auto", // Cloudflare R2 uses "auto" region
  endpoint: endpoint, // R2 endpoint including account ID
  credentials: { accessKeyId, secretAccessKey: secretKey },
  forcePathStyle: true, // Use path-style URLs (required for R2)
});

// Export the bucket name for reuse
export const r2BucketName = process.env.NEXT_PUBLIC_R2_BUCKET_NAME!;
