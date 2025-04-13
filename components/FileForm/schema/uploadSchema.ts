import { z } from "zod";

export const UploadFormSchema = z.object({
  email: z
    .array(z.string().email({ message: "Invalid email address" }))
    .min(1, { message: "Email is required" }),

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
