import { Stack } from "@mui/material";
import { FileUploader } from "./FileUploader";
import { TermsConditions } from "../TermsConditions";
import Image from "next/image";

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
      <Stack sx={{ padding: "24px", justifyContent: "center", alignItems: "center" }}>
        <Image
          src="./logo.svg"
          alt="logo"
          width={140}
          height={30}
        />
      </Stack>
      <FileUploader />
      <TermsConditions />
    </Stack>
  );
};
