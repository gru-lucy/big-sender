import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

export function FileUploader() {
  return (
    <Box
      sx={{
        border: "2px dashed",
        borderRadius: "8px",
        padding: "32px 24px",
        textAlign: "center",
        cursor: "pointer",
        width: "100%",
        maxWidth: "552px",
        borderColor: "primary.main",
        backgroundColor: "background.paper",
      }}
    >
      <Image src={"/upload.svg"} alt="Upload Icon" width={36} height={36} />
      <Typography variant="h6" gutterBottom>
        Click to add your{" "}
        <Typography variant="caption" fontWeight={700}>
          files
        </Typography>{" "}
        or add a{" "}
        <Typography variant="caption" fontWeight={700}>
          folder
        </Typography>
      </Typography>
      <Typography variant="body2">
        Support JPG, PNG, SVG, and zip files, available for 7 days, up to 50GB
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary">
          Browse File
        </Button>
      </Box>
    </Box>
  );
}
