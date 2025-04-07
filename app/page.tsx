import { InitialUpload } from "@/components/Upload/InitialUpload";
import { MediaBackground } from "@/components/MediaBackground";

export default function Home() {
  return (
    <div>
      <MediaBackground>
        <InitialUpload />
      </MediaBackground>
    </div>
  );
}
