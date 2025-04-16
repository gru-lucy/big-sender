import { InitialUpload } from "@/components/Upload/InitialUpload";
import { useFileContext } from "@/context/FileContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const Screen = () => {
  const { files } = useFileContext();
  const router = useRouter();

  useEffect(() => {
    if (files.length) {
      router.push("/transfer");
    }
    // eslint-disable-next-line
  }, [files]);

  return <InitialUpload />;
};
