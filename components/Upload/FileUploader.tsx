"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import { useFileContext } from "@/context/FileContext";

export function FileUploader() {
  const { setFiles } = useFileContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

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
        <Button variant="contained" color="primary" onClick={handleBrowseFiles}>
          Browse File
        </Button>
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Box>
  );
}
