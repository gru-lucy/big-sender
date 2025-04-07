import { Stack } from "@mui/material";
import { FileUploader } from "./FileUploader";
import { TermsConditions } from "../TermsConditions";

export const InitialUpload = () => {
  return (
    <Stack
      padding={4}
      sx={{ backgroundColor: "background.default" }}
      borderRadius={"16px"}
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <FileUploader />
      <TermsConditions />
    </Stack>
  );
};
