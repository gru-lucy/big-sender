import { NextRequest, NextResponse } from "next/server";
import { r2Client, r2BucketName } from "@/lib/r2Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { senderEmail, receiverEmail, message, fileKeys } =
      await request.json();
    if (!receiverEmail || !fileKeys || !Array.isArray(fileKeys)) {
      return NextResponse.json(
        { error: "Missing email or fileKeys" },
        { status: 400 },
      );
    }

    // 1. Generate a 24-hour presigned download URL for each uploaded file
    const downloadLinks: string[] = [];
    for (const key of fileKeys) {
      const getCommand = new GetObjectCommand({
        Bucket: r2BucketName,
        Key: key,
      });
      // Each link will expire in 24 hours (86400 seconds)
      const url = await getSignedUrl(r2Client, getCommand, {
        expiresIn: 86400 * 3,
      });
      downloadLinks.push(url);
    }

    let linksHtml =
      '<ul  style="list-style-type: none; padding: 0; margin: 20px 0;">';
    fileKeys.forEach((key, index) => {
      linksHtml += `<li><a href="${downloadLinks[index]}">${key}</a></li>`;
    });
    linksHtml += "</ul>";

    const htmlContent = `
      <div style="background-color: #1c1c1c; color: #f0f0f0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);">
        <h1 style="color: #ffffff; font-size: 28px; margin-bottom: 20px; border-bottom: 2px solid #444; padding-bottom: 10px;">Hi,</h1>
        <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
          We are delighted to inform you that a new file has been sent your way.
        </p>
        ${
          senderEmail
            ? `
          <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
            <strong>${senderEmail}</strong> sent you a file. Please use the link below to securely download it:
          </p>
        `
            : ""
        }
        ${linksHtml}
        ${
          message
            ? `
          <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
            Message from sender: ${message}
          </p>
        `
            : ""
        }
        <p style="font-size: 14px; line-height: 1.6; color: #bbb; margin: 20px 0;">
          Please note: The download link(s) provided above are only valid for 3 days from the time of sending. After this period, the links will expire and the file(s) will become inaccessible.
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

    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY || "");
    const emailData = {
      from: "GigaSend <no-reply@transfer.gigasend.us>",
      to: receiverEmail,
      subject: "Your files are ready for download",
      html: htmlContent,
    };

    // 3. Send the email via Resend API
    const { error } = await resend.emails.send(emailData);
    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }
    return NextResponse.json({ message: "Download links sent to email" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send download links email" },
      { status: 500 },
    );
  }
}
