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

const downloadedCount = 1;
const downloadedAmount = "200KB";
const expiryDate = "4/11/2025";

type UploadFormData = z.infer<typeof UploadFormSchema>;

export const FileForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UploadFormData>({
    resolver: zodResolver(UploadFormSchema)
  });
  
  return (
    <Card sx={{ maxWidth: "768px" }}>
      <form
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
                    name="receiverEmail"
                    placeholder="e.g., receiver@example.com"
                  />
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <FormLabel>Sender's email</FormLabel>
                  <TextField
                    name="senderEmail"
                    placeholder="e.g., yourmail@example.com"
                  />
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <FormLabel>Your message</FormLabel>
                  <TextField
                    name="message"
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
