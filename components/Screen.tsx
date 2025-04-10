import { InitialUpload } from "@/components/Upload/InitialUpload";
import { FileForm } from "@/components/FileForm/FileForm";
import { useFileContext } from "@/context/FileContext";

export const Screen = () => {
  const { files } = useFileContext();

  return files.length === 0 ? <InitialUpload /> : <FileForm />;
}