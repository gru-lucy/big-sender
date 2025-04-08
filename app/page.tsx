"use client";

// import { InitialUpload } from "@/components/Upload/InitialUpload";
import { MediaBackground } from "@/components/MediaBackground";
import { FileProvider } from "@/context/FileContext";
import { FileForm } from "@/components/FileForm/FileForm";

export default function Home() {
  return (
    <div>
      <MediaBackground>
        <FileProvider>
          {/* <InitialUpload /> */}
          <FileForm />
        </FileProvider>
      </MediaBackground>
    </div>
  );
}
