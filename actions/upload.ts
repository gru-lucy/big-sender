'use server';

import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Resend } from 'resend';

// Initialize the S3 client for Cloudflare R2
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.NEXT_PUBLIC_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_R2_SECRET_ACCESS_KEY!
  },
  forcePathStyle: true  // required for R2 compatibility
});

/**
 * Uploads multiple files using S3.send.
 * The client passes in an array of File objects.
 */
export async function uploadFiles(files: File[]): Promise<Array<{ fileName: string; fileSize: number; objectKey: string }>> {
  const uploadedFiles: Array<{ fileName: string; fileSize: number; objectKey: string }> = [];

  for (const file of files) {
    // Sanitize file name and create a unique key
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const timestamp = Date.now();
    const objectKey = `uploads/${timestamp}_${safeName}`;

    // Read the file into a Buffer (using the File API available in modern Next.js server actions)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create the PutObjectCommand for uploading
    const putCommand = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_R2_BUCKET_NAME,
      Key: objectKey,
      Body: buffer,
      ContentType: file.type,
      ContentLength: file.size
    });
    // Upload the file using S3.send
    await r2Client.send(putCommand);

    // Save metadata for later use (e.g. for generating download links)
    uploadedFiles.push({
      fileName: file.name,
      fileSize: file.size,
      objectKey
    });
  }
  return uploadedFiles;
}

/**
 * Generates presigned download URLs for an array of files and sends an email with these links.
 */
export async function sendDownloadEmail({
  senderEmail,
  receiverEmail,
  message,
  files
}: {
  senderEmail?: string;
  receiverEmail: string;
  message?: string;
  files: Array<{ fileName: string; fileSize: number; objectKey: string }>;
}) {
  // Generate a presigned download URL for each file (valid for 24 hours)
  const downloadLinksPromises = files.map(async (file) => {
    const getCommand = new GetObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_R2_BUCKET_NAME,
      Key: file.objectKey
    });
    const downloadUrl = await getSignedUrl(r2Client, getCommand, { expiresIn: 24 * 3600 });
    const fileSizeKB = (file.fileSize / 1024).toFixed(2);
    return `<li>${file.fileName} (${fileSizeKB} KB): <a href="${downloadUrl}">Download</a></li>`;
  });

  const downloadLinksList = await Promise.all(downloadLinksPromises);

  // Build the email HTML content
  const htmlContent = `
    <div style="background-color: #1c1c1c; color: #f0f0f0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);">
      <h1 style="color: #ffffff; font-size: 28px; margin-bottom: 20px; border-bottom: 2px solid #444; padding-bottom: 10px;">Hi,</h1>
      <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
        We are delighted to inform you that a new file has been sent your way.
      </p>
      ${senderEmail ? `
        <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
          <strong>${senderEmail}</strong> sent you a file. Please use the link below to securely download it:
        </p>
      ` : ''}
      <ul style="list-style-type: none; padding: 0; margin: 20px 0;">
        ${downloadLinksList.join('')}
      </ul>
      ${message ? `
        <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
          Message from sender: ${message}
        </p>
      ` : ''}
      <p style="font-size: 14px; line-height: 1.6; color: #bbb; margin: 20px 0;">
        Please note: The download link(s) provided above are only valid for 24 hours from the time of sending. After this period, the links will expire and the file(s) will become inaccessible.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #aaa; margin: 20px 0;">
        If you experience any issues or need further assistance with the download process, feel free to contact our support team anytime at <a href="mailto:support@example.com" style="color: #4aa8d8; text-decoration: none;">support@example.com</a>.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #bbb; margin-top: 30px;">
        Thank you for choosing our service. We are committed to providing you with a smooth and secure experience at every step.
      </p>
      <div style="border-top: 1px solid #444; margin-top: 30px; padding-top: 10px; font-size: 12px; color: #777;">
        <p style="margin: 0;">Best regards,</p>
        <p style="margin: 0;">Giga Send Team</p>
      </div>
    </div>
  `;


  // Initialize Resend client
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

  // Send the email with the download links
  await resend.emails.send({
    from: "GigaSend <no-reply@transfer.gigasend.us>",
    to: [receiverEmail],
    subject: 'Your Files Are Ready for Download',
    html: htmlContent
  });
}
