"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type FileContextType = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const FileContext = createContext<FileContextType>({
  files: [],
  setFiles: () => [],
});

export function useFileContext() {
  return useContext(FileContext);
}

export function FileProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileContext.Provider value={{ files, setFiles }
    }>
      {children}
    </FileContext.Provider>
  );
}
