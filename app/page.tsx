"use client";

import { MediaBackground } from "@/components/MediaBackground";
import { Screen } from "@/components/Screen";
import { FileProvider } from "@/context/FileContext";

export default function Home() {
  return (
    <div>
      <MediaBackground>
        <FileProvider>
          <Screen />
        </FileProvider>
      </MediaBackground>
    </div>
  );
}
