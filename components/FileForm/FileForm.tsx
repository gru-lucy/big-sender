import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FileUploader } from "../Upload/FileUploader";
import { AdvancedParams } from "./AdvancedParams";
import { TermsConditions } from "../TermsConditions";
import FileList from "../File/FileList";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadFormSchema } from "./schema/uploadSchema";
import { z } from "zod";
import { useFileContext } from "@/context/FileContext";
import { useEffect } from "react";
import { generatePresignedUrl, sendDownloadEmail } from "@/actions/upload";

const downloadedCount = 1;
const downloadedAmount = "200KB";
const expiryDate = "4/11/2025";

type UploadFormData = z.infer<typeof UploadFormSchema>;

export const FileForm = () => {
  const { files } = useFileContext();

  const { register, handleSubmit, getValues, setValue, formState: { errors, isSubmitting } } = useForm<UploadFormData>({
    resolver: zodResolver(UploadFormSchema)
  });

  useEffect(() => {
    setValue("files", files);
  }, [files, setValue]);

  const onSubmit = async (data: UploadFormData) => {
    try {
      // Get the file from the FileList (the file input isn't in our Zod schema directly)
      const fileList = data.files;
      if (!fileList || fileList.length === 0) {
        throw new Error("Please select a file to upload.");
      }
      const file = fileList[0];
      // 1. Request a presigned upload URL from the server action
      const { uploadUrl, objectKey } = await generatePresignedUrl(file.name, file.type, file.size);
      // 2. Upload the file directly to Cloudflare R2 using the URL
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type  // must match the ContentType used in presign&#8203;:contentReference[oaicite:14]{index=14}
        }
      });
      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`);
      }
      // 3. On successful upload, send the download email via server action
      await sendDownloadEmail({
        senderEmail: data.senderEmail,
        receiverEmail: data.receiverEmail,
        message: data.message,
        fileName: file.name,
        fileSize: file.size,
        objectKey: objectKey
      });
    } catch (err: any) {
      console.error("Error during upload:", err);
    }
  };

  return (
    <Card sx={{ maxWidth: "768px" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <CardContent sx={{ flex: "column" }}>
          <Stack sx={{ padding: "24px", justifyContent: "center", alignItems: "center" }}>
            <Image
              src="./logo.svg"
              alt="logo"
              width={140}
              height={30}
            />
          </Stack>

          <Stack
            direction="row"
            sx={{
              padding: "24px",
              borderTop: "1px solid #D5D7DA",
              borderBottom: "1px solid #D5D7DA",
            }}
            gap={2}
            alignItems="stretch"
          >
            <Stack gap={2} width={"50%"}>
              <Stack>
                <Typography variant="body1">
                  {downloadedCount} Downloaded File
                </Typography>
                <Typography variant="body2">
                  {downloadedAmount} of 50GB
                </Typography>
              </Stack>
              <Stack gap={2}>
                <FileUploader />
                <FileList />
              </Stack>
            </Stack>

            <Stack gap={2} width={"50%"}>
              <Stack>
                <Typography variant="body1">Email</Typography>
                <Typography variant="body2">
                  We will let you know when your files get downloaded
                </Typography>
              </Stack>
              <Stack
                borderRadius={2}
                padding={2}
                sx={{ backgroundColor: "#F6F8FB" }}
                flex={1}
                gap={2}
              >
                <FormControl fullWidth variant="outlined">
                  <FormLabel>Receiver's email</FormLabel>
                  <TextField
                    // name="receiverEmail"
                    placeholder="e.g., receiver@example.com"
                    {...register("receiverEmail")}
                    error={!!errors.receiverEmail}
                    helperText={errors.receiverEmail ? errors.receiverEmail.message : ""}
                  />
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <FormLabel>Sender's email</FormLabel>
                  <TextField
                    placeholder="e.g., yourmail@example.com"
                    {...register("senderEmail")}
                    error={!!errors.senderEmail}
                    helperText={errors.senderEmail ? errors.senderEmail.message : ""}
                  />
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <FormLabel>Your message</FormLabel>
                  <TextField
                    placeholder="e.g., hi this is the file."
                    multiline
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "80px",
                        padding: 0,
                        "& textarea": {
                          height: "100% !important",
                          overflowY: "auto",
                          padding: "10px",
                          boxSizing: "border-box",
                        },
                      },
                    }}
                    {...register("message")}
                  />
                </FormControl>

                <AdvancedParams />
              </Stack>
            </Stack>
          </Stack>

          <Stack sx={{ padding: "24px" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack>
                <Typography variant="subtitle1">
                  Expires on {expiryDate}
                </Typography>
                <TermsConditions sx={{ fontSize: "12px" }} />
              </Stack>

              <Stack direction="row" gap={2}>
                <Button variant="outlined" type="button">Cancel</Button>
                <Button variant="contained" color="primary" type="submit">
                  Transfer
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </form>
    </Card>
  );
};
