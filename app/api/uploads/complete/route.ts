/* /app/api/uploads/complete/route.ts */
import { NextRequest, NextResponse } from "next/server";
import { r2Client, r2BucketName } from "@/lib/r2Client";
import { CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";

export async function POST(request: NextRequest) {
  try {
    const { uploadId, key, parts } = await request.json();
    if (!uploadId || !key || !parts) {
      return NextResponse.json(
        { error: "Missing uploadId, key, or parts" },
        { status: 400 },
      );
    }

    // Complete the multipart upload with all parts and their ETags
    const command = new CompleteMultipartUploadCommand({
      Bucket: r2BucketName,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    });
    await r2Client.send(command);

    return NextResponse.json({ message: "Upload complete", key });
  } catch (error) {
    console.error("Error completing multipart upload:", error);
    return NextResponse.json(
      { error: "Failed to complete upload" },
      { status: 500 },
    );
  }
}
