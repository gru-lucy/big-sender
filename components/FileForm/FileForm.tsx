"use client";

import {
  Button,
  Card,
  CardContent,
  CircularProgress,
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
import { sendDownloadEmail, uploadFiles } from "@/actions/upload";
import { useRouter } from "next/navigation";

const downloadedCount = 1;
const downloadedAmount = "200KB";
const expiryDate = "4/20/2025";

type UploadFormData = z.infer<typeof UploadFormSchema>;

export const FileForm = () => {
  const { files, setFiles } = useFileContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UploadFormData>({
    resolver: zodResolver(UploadFormSchema),
  });

  useEffect(() => {
    setValue("files", files);
  }, [files, setValue]);

  const onSubmit = async (data: UploadFormData) => {
    try {
      // Make sure at least one file was selected
      if (!data.files || data.files.length === 0) {
        throw new Error("Please select file(s) to upload.");
      }

      // Convert FileList to an array of File objects
      const filesArray = Array.from(data.files);

      // Upload the files on the server using S3.send
      const uploadedFiles = await uploadFiles(filesArray);
      // Send an email containing presigned download links for each file
      await sendDownloadEmail({
        senderEmail: data.senderEmail,
        receiverEmail: data.receiverEmail,
        message: data.message,
        files: uploadedFiles,
      });
      router.push("/success");
    } catch (err: any) {
      console.error("Error during upload:", err);
    } finally {
      setFiles([]);
    }
  };

  return (
    <Card sx={{ maxWidth: "768px" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <CardContent sx={{ flex: "column" }}>
          <Stack
            sx={{
              padding: "24px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src="./logo.svg" alt="logo" width={140} height={30} />
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
                    helperText={
                      errors.receiverEmail ? errors.receiverEmail.message : ""
                    }
                  />
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <FormLabel>Sender's email</FormLabel>
                  <TextField
                    placeholder="e.g., yourmail@example.com"
                    {...register("senderEmail")}
                    error={!!errors.senderEmail}
                    helperText={
                      errors.senderEmail ? errors.senderEmail.message : ""
                    }
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
                <Button variant="outlined" type="button">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Transfer
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </form>

      {isSubmitting && (
        <Stack
          gap={2}
          justifyContent="center"
          alignItems="center"
          position="fixed"
          width="100vw"
          top={0}
          left={0}
          height="100vh"
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 9999 }}
        >
          <CircularProgress />
          <Typography variant="body1" color="gray">
            Please wait while we are processing your files.
          </Typography>
        </Stack>
      )}
    </Card>
  );
};
