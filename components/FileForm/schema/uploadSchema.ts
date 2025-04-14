import { z } from "zod";

export const UploadFormSchema = z.object({
  receiverEmail: z.string().email({ message: "Invalid email address" }),

  senderEmail: z
    .string()
    .email({ message: "Invalid email address" })
    .optional(),

  message: z.string().optional(),

  files: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size > 0, {
          message: "File is required",
        })
    )
    .min(1, { message: "At least one file is required" }),
});
