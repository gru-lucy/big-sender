import React from "react";
import {
  Typography,
  Box,
  Paper,
  LinearProgress,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fileTypeColor } from "./fileTypeColors";
import mime from "mime";
import Image from "next/image";

interface FileProps {
  // id: string;
  name: string;
  size: number;
  type: string;
  // url: string;
}

interface FileDisplayItemProps {
  file: FileProps;   
  onRemove?: (id: string) => void;
}

const progress = 80;

export const FileDisplayItem: React.FC<FileDisplayItemProps> = ({
  file,
  onRemove,
}) => {
  const fileExtension = mime.getExtension(file.type);
  const fileColor = fileExtension
    ? fileTypeColor[fileExtension] || "primary.main"
    : "primary.main";

  const finalExtension = fileExtension === "" ? file.name.split(".").pop() : fileExtension;

  function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        bgcolor: "background.default",
        borderRadius: "12px",
        boxShadow: "none",
        border: "1px solid",
        borderColor: "#E9EAEB",
        width: "100%",
      }}
      elevation={1}
      variant="outlined"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        width="100%"
        alignItems="flex-start"
        gap={2}
      >
        <Stack
          sx={{
            position: "relative",
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src="./file.svg" alt="file icon" width={33} height={33} />
          <Box
            sx={{
              position: "absolute",
              top: 1,
              right: 1,
              height: 16,
              backgroundColor: fileColor,
              borderRadius: "2px",
              pl: "3px",
              pr: "3px",
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 600,
                color: "#FFFFFF",
                lineHeight: "16px",
                textAlign: "center",
              }}
            >
              {finalExtension?.toUpperCase()}
            </Typography>
          </Box>
        </Stack>
        <Stack flex={1}>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography variant="body1" fontWeight={600}>
                {file.name}
              </Typography>
              <Typography variant="body2">
                <span>{formatBytes(file.size)}</span>
              </Typography>
            </Stack>
            <CloseIcon sx={{ width: 17, height: 17, color: "#6D6D6D" }} />
          </Stack>
          <Stack
            direction="row"
            gap={2}
            alignItems="center"
            justifyContent="space-between"
            mt={1}
          >
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ width: `${progress}%`, height: 8 }}
            />
            <Typography
              variant="body1"
              fontWeight={600}
              width={39}
              textAlign="right"
            >
              {progress}%
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default FileDisplayItem;
