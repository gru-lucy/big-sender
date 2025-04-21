/* /app/api/uploads/initiate/route.ts */
import { NextRequest, NextResponse } from "next/server";
import { r2Client, r2BucketName } from "@/lib/r2Client";
import { CreateMultipartUploadCommand } from "@aws-sdk/client-s3";

export async function POST(request: NextRequest) {
  try {
    const { fileName, contentType } = await request.json();
    if (!fileName || !contentType) {
      return NextResponse.json(
        { error: "Missing fileName or contentType" },
        { status: 400 },
      );
    }

    // Generate a unique object key for the file (to avoid collisions in bucket)
    const extIndex = fileName.lastIndexOf(".");
    const baseName = extIndex >= 0 ? fileName.substring(0, extIndex) : fileName;
    const extension = extIndex >= 0 ? fileName.substring(extIndex) : "";
    const uniqueKey = `${baseName}-${Date.now()}-${Math.floor(Math.random() * 1e6)}${extension}`;

    // Initiate multipart upload via AWS SDK
    const command = new CreateMultipartUploadCommand({
      Bucket: r2BucketName,
      Key: uniqueKey,
      ContentType: contentType,
    });
    const createResponse = await r2Client.send(command);

    // Respond with UploadId and the generated file key
    return NextResponse.json({
      uploadId: createResponse.UploadId,
      key: uniqueKey,
    });
  } catch (error) {
    console.error("Error initiating multipart upload:", error);
    return NextResponse.json(
      { error: "Failed to initiate upload" },
      { status: 500 },
    );
  }
}
