'use server';

import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Resend } from 'resend';

// Initialize the S3 client for Cloudflare R2
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,       // from .env
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!, // from .env
  },
  forcePathStyle: true  // ensure path-style URLs (needed for R2 compatibility)
});

// 1. Server Action: Generate a presigned URL for uploading a file
export async function generatePresignedUrl(fileName: string, fileType: string, fileSize: number) {
  // Sanitize and prepare a unique object key for the file in R2
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');  // replace any unsafe characters
  const timestamp = Date.now();
  const objectKey = `uploads/${timestamp}_${safeName}`;

  // Create a command to put an object with specified content type (and size for security)
  const putCommand = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: objectKey,
    ContentType: fileType,
    ContentLength: fileSize       // ensure the signed URL is only valid for this size&#8203;:contentReference[oaicite:8]{index=8}
    // You can add other metadata or ACL here if needed (e.g., ACL: 'public-read' to make public&#8203;:contentReference[oaicite:9]{index=9})
  });
  // Generate a presigned PUT URL valid for e.g. 1 hour (3600 seconds)
  const uploadUrl = await getSignedUrl(r2Client, putCommand, { expiresIn: 3600 });
  return { uploadUrl, objectKey };  // return the URL and object key to the client
}

// 2. Server Action: Send an email with a download link using Resend API
export async function sendDownloadEmail(userEmail: string, fileName: string, fileSize: number, objectKey: string) {
  // Generate a presigned GET URL for downloading the file (valid for 24 hours)
  const getCommand = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: objectKey
  });
  const downloadUrl = await getSignedUrl(r2Client, getCommand, { expiresIn: 24 * 3600 });

  // Initialize Resend client with our API key
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Compose the email content (include file metadata and download link)
  const subject = 'Your file is ready for download';
  const fileSizeKB = (fileSize / 1024).toFixed(2);
  const htmlContent = `
    <p>Hello,</p>
    <p>Your file <strong>${fileName}</strong> (size: ${fileSizeKB} KB) has been uploaded successfully.</p>
    <p>You can download it using this link: <a href="${downloadUrl}">Download ${fileName}</a></p>
    <p>This link will expire in 24 hours for security.</p>
  `;

  // Send the email via Resend
  await resend.emails.send({
    from: process.env.RESEND_FROM_ADDRESS!,       // e.g., "YourApp <no-reply@yourdomain.com>"
    to: [userEmail],                              // recipient's email
    subject: subject,
    html: htmlContent
  });
}
