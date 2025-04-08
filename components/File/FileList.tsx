import React from "react";
import { useFileContext } from "@/context/FileContext";
import FileDisplayItem from "./FileIcon";
import { Stack } from "@mui/material";

export const FileList = () => {
  const { files, setFiles } = useFileContext();

  const handleRemoveFile = (id: string) => {
    // setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  return (
    <Stack gap={2} sx={{ height: 220, overflowY: 'auto' }}>
      {files.map((file) => (
        <FileDisplayItem
          key={crypto.randomUUID()}
          file={file}
          onRemove={handleRemoveFile}
        />
      ))}
    </Stack>
  );
};

export default FileList;
