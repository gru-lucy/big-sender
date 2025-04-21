/* /app/api/uploads/presign/route.ts */
import { NextRequest, NextResponse } from "next/server";
import { r2Client, r2BucketName } from "@/lib/r2Client";
import { UploadPartCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(request: NextRequest) {
  try {
    const { uploadId, key, partNumber } = await request.json();
    if (!uploadId || !key || partNumber == null) {
      return NextResponse.json(
        { error: "Missing uploadId, key, or partNumber" },
        { status: 400 },
      );
    }

    const partNo = Number(partNumber);
    if (isNaN(partNo)) {
      return NextResponse.json(
        { error: "Invalid partNumber" },
        { status: 400 },
      );
    }

    // Create command for this part upload and get a presigned URL (valid for 1 hour)
    const command = new UploadPartCommand({
      Bucket: r2BucketName,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNo,
    });
    const presignedUrl = await getSignedUrl(r2Client, command, {
      expiresIn: 3600,
    }); // 3600s = 1 hour

    return NextResponse.json({ url: presignedUrl });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: "Failed to generate presigned URL" },
      { status: 500 },
    );
  }
}
