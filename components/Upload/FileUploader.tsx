"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Box, Button, Typography, Menu, MenuItem } from "@mui/material";
import { useFileContext } from "@/context/FileContext";

export function FileUploader() {
  const { setFiles } = useFileContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const triggerFile = () => {
    fileInputRef.current?.click();
    handleMenuClose();
  };
  const triggerFolder = () => {
    folderInputRef.current?.click();
    handleMenuClose();
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
        <Button variant="contained" color="primary" onClick={handleMenuOpen}>
          Browse File
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              minWidth: anchorEl?.clientWidth || 0,
            },
          }}
        >
          <MenuItem onClick={triggerFile} sx={{ typography: 'body2', color: 'text.secondary' }}>
            Files
          </MenuItem>
          <MenuItem onClick={triggerFolder} sx={{ typography: 'body2', color: 'text.secondary' }}>
            Folder
          </MenuItem>
        </Menu>
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <input
        ref={folderInputRef}
        type="file"
        multiple
        directory="true"
        webkitdirectory="true"
        mozdirectory="true"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Box>
  );
}
